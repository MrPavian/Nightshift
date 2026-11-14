#!/usr/bin/env node
// Ticket 0.7A-T06 fixture runner: writes the proof run to docs/reports/proof/T06/.
// Usage: node tools/proof-run.mjs [--check]
// review/ratings.json is human-owned: it is created once and never overwritten.
import { readFileSync, writeFileSync, mkdirSync, existsSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';
import { loadRegistry } from '../src/glyph/load-node.js';
import { buildProofRun } from '../src/proof/run.js';

export const RUN_DIR = 'docs/reports/proof/T06';
export const readJson = (p) => JSON.parse(readFileSync(p, 'utf8'));
export const generate = () => buildProofRun({
  registry: loadRegistry(),
  profile: readJson('data/validator-profiles/legacy-v06.v1.json'),
  fixturesContract: readJson('contracts/proof-sheet-fixtures.v1.json'),
});

if (process.argv[1] === fileURLToPath(import.meta.url)) {
  const { manifest, files } = generate();
  const check = process.argv.includes('--check');
  let stale = 0;
  for (const [rel, text] of Object.entries(files)) {
    const path = join(RUN_DIR, rel);
    if (rel === 'review/ratings.json' && existsSync(path)) continue;
    if (check) {
      if (!existsSync(path) || readFileSync(path, 'utf8') !== text) { console.error(`stale: ${path}`); stale++; }
    } else {
      mkdirSync(dirname(path), { recursive: true });
      writeFileSync(path, text);
    }
  }
  console.log(check ? (stale ? `${stale} stale file(s)` : 'Proof run up to date.') : `Wrote ${manifest.runId} (${Object.keys(files).length} files) to ${RUN_DIR}`);
  process.exit(stale ? 1 : 0);
}
