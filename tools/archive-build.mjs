#!/usr/bin/env node
// Builds data/archive/archive.v1.json from the research library (C06).
// Usage: node tools/archive-build.mjs [--check]
import { readFileSync, writeFileSync, readdirSync, existsSync, mkdirSync } from 'node:fs';
import { dirname } from 'node:path';
import { join } from 'node:path';
import { fileURLToPath } from 'node:url';
import { buildArchive } from '../src/archive/build.js';
import { DIAGRAM_IDS, renderDiagram } from '../src/archive/diagrams.js';
import { loadRegistry } from '../src/glyph/load-node.js';
import { resolveGlyphs } from '../src/proof/specimens.js';
import { stableStringify } from '../src/core/stable-json.js';

export const OUT = 'data/archive/archive.v1.json';

export function readResearch() {
  const files = [];
  for (const name of readdirSync('research').filter((n) => n.endsWith('.md')).sort()) files.push({ path: `research/${name}`, text: readFileSync(join('research', name), 'utf8') });
  for (const name of existsSync('research/archive') ? readdirSync('research/archive').filter((n) => n.endsWith('.md')).sort() : []) files.push({ path: `research/archive/${name}`, text: readFileSync(join('research/archive', name), 'utf8') });
  const dir = 'research/archive/entries';
  for (const name of existsSync(dir) ? readdirSync(dir).filter((n) => n.endsWith('.md')).sort() : []) files.push({ path: `${dir}/${name}`, text: readFileSync(join(dir, name), 'utf8') });
  // The archive's own editorial framework may back design inferences about how the archive works.
  for (const p of ['docs/BLACKBOOK_ARCHIVE_GLOBAL_EDITORIAL_FRAMEWORK_01.md']) files.push({ path: p, text: readFileSync(p, 'utf8') });
  return files;
}

/** Render every diagram once at build time from NIGHTSHIFT's own canonical geometry (no runtime editor code in the archive). */
export function renderDiagrams() {
  const profile = JSON.parse(readFileSync('data/validator-profiles/legacy-v06.v1.json', 'utf8'));
  const resolved = resolveGlyphs(loadRegistry(), profile, ['A', 'B', 'G', 'S']);
  const models = Object.fromEntries([...resolved].map(([ch, r]) => [ch, r.model]));
  const out = {};
  for (const id of DIAGRAM_IDS) {
    const svg = renderDiagram(id, { models });
    if (!svg) throw new Error(`Diagram ${id} could not be rendered (missing glyph model)`);
    out[id] = svg;
  }
  return out;
}

export function build() {
  const result = buildArchive({ files: readResearch(), diagrams: DIAGRAM_IDS });
  result.data.diagrams = renderDiagrams();
  return result;
}

if (process.argv[1] === fileURLToPath(import.meta.url)) {
  const { data, diagnostics, ok } = build();
  for (const d of diagnostics) console.log(`${d.severity.toUpperCase()} ${d.code} ${d.where}: ${d.message}`);
  const text = stableStringify(data, 2) + '\n';
  if (process.argv.includes('--check')) {
    const same = existsSync(OUT) && readFileSync(OUT, 'utf8') === text;
    console.log(same ? 'Archive data up to date.' : `${OUT} is stale`);
    process.exit(same && ok ? 0 : 1);
  }
  if (!ok) { console.error('Archive build failed; data not written.'); process.exit(1); }
  mkdirSync(dirname(OUT), { recursive: true });
  writeFileSync(OUT, text);
  console.log(`Wrote ${OUT}: ${data.entries.length} entries, ${data.claims.length} claims, ${data.sources.length} sources, ${data.timeline.length} timeline events, ${data.paths.length} paths.`);
}
