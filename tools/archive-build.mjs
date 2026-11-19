#!/usr/bin/env node
// Builds data/archive/archive.v1.<lang>.json from the research library (C06).
// Usage: node tools/archive-build.mjs [--check] [--lang de]
// One data file per edition language: data/archive/archive.v1.<lang>.json.
import { readFileSync, writeFileSync, readdirSync, existsSync, mkdirSync } from 'node:fs';
import { dirname } from 'node:path';
import { join } from 'node:path';
import { fileURLToPath } from 'node:url';
import { buildArchive } from '../src/archive/build.js';
import { DIAGRAM_IDS, renderDiagram } from '../src/archive/diagrams.js';
import { loadRegistry } from '../src/glyph/load-node.js';
import { resolveGlyphs } from '../src/proof/specimens.js';
import { stableStringify } from '../src/core/stable-json.js';

export const LANGS = ['de'];
export const outFor = (lang) => `data/archive/archive.v1.${lang}.json`;
export const OUT = outFor('de');

export function readResearch() {
  const files = [];
  for (const name of readdirSync('research').filter((n) => n.endsWith('.md')).sort()) files.push({ path: `research/${name}`, text: readFileSync(join('research', name), 'utf8') });
  for (const lang of LANGS) {
    const base = `research/archive/${lang}`;
    for (const sub of ['', '/entries']) {
      const d = base + sub;
      for (const name of existsSync(d) ? readdirSync(d).filter((n) => n.endsWith('.md')).sort() : []) files.push({ path: `${d}/${name}`, text: readFileSync(join(d, name), 'utf8') });
    }
  }
  // The archive's own editorial framework may back design inferences about how the archive works.
  for (const p of ['docs/BLACKBOOK_ARCHIVE_GLOBAL_EDITORIAL_FRAMEWORK_01.md']) files.push({ path: p, text: readFileSync(p, 'utf8') });
  return files;
}

/** Render every diagram once at build time from NIGHTSHIFT's own canonical geometry (no runtime editor code in the archive). */
export function renderDiagrams(lang = 'de') {
  const profile = JSON.parse(readFileSync('data/validator-profiles/legacy-v06.v1.json', 'utf8'));
  const resolved = resolveGlyphs(loadRegistry(), profile, ['A', 'B', 'G', 'S']);
  const models = Object.fromEntries([...resolved].map(([ch, r]) => [ch, r.model]));
  const out = {};
  for (const id of DIAGRAM_IDS) {
    const svg = renderDiagram(id, { models, lang });
    if (!svg) throw new Error(`Diagram ${id} could not be rendered (missing glyph model)`);
    out[id] = svg;
  }
  return out;
}

export function build(lang = 'de') {
  const result = buildArchive({ files: readResearch(), diagrams: DIAGRAM_IDS, lang });
  result.data.diagrams = renderDiagrams(lang);
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
