#!/usr/bin/env node
// Style Library proof runs.
//   phase-a-01: frozen (resolver 1.0). Never regenerated; only its checksums are verified.
//   phase-a-02: Bubble counter safety + Bounce collision safety, before/after. Regenerated / checked.
// Usage: node tools/proof-style-plates.mjs [--check]
import { readFileSync, writeFileSync, mkdirSync, existsSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';
import { loadRegistry } from '../src/glyph/load-node.js';
import { buildPhaseA02Run } from '../src/proof/style-run-a02.js';
import { sha256Hex } from '../src/core/sha256.js';

export const RUN_DIR = 'docs/reports/proof/style-library/phase-a-01';
export const RUN_DIR_A02 = 'docs/reports/proof/style-library/phase-a-02';
const readJson = (p) => JSON.parse(readFileSync(p, 'utf8'));

/** Verify a frozen run against its own checksums.json. Returns a list of problems. */
export function verifyFrozenRun(dir) {
  const problems = [];
  const sums = readJson(join(dir, 'checksums.json'));
  for (const [rel, hash] of Object.entries(sums)) {
    if (rel === 'runId') continue;
    const path = join(dir, rel);
    if (!existsSync(path)) problems.push(`missing: ${path}`);
    else if (sha256Hex(readFileSync(path, 'utf8')) !== hash) problems.push(`changed: ${path}`);
  }
  return problems;
}

export const generateA02 = () => buildPhaseA02Run({
  registry: loadRegistry(),
  profile: readJson('data/validator-profiles/legacy-v06.v1.json'),
  styleContract: readJson('contracts/style-resolver.v1.json'),
});

if (process.argv[1] === fileURLToPath(import.meta.url)) {
  const check = process.argv.includes('--check');
  const frozen = verifyFrozenRun(RUN_DIR);
  for (const p of frozen) console.error(`phase-a-01 ${p}`);
  const { manifest, summary, files } = generateA02();
  let stale = 0;
  for (const [rel, text] of Object.entries(files)) {
    const path = join(RUN_DIR_A02, rel);
    if (check) {
      if (!existsSync(path) || readFileSync(path, 'utf8') !== text) { console.error(`stale: ${path}`); stale++; }
    } else {
      mkdirSync(dirname(path), { recursive: true });
      writeFileSync(path, text);
    }
  }
  console.log(`phase-a-01: ${frozen.length ? `${frozen.length} problem(s)` : 'frozen run intact'}`);
  console.log(check ? (stale ? `phase-a-02: ${stale} stale file(s)` : 'phase-a-02: up to date') : `phase-a-02: wrote ${manifest.runId} (${Object.keys(files).length} files)`);
  if (!check) console.log(JSON.stringify(summary));
  process.exit(stale || frozen.length ? 1 : 0);
}
