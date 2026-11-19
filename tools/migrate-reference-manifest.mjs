#!/usr/bin/env node
// One-time migration of the PR #25 research manifest into the typed comparison sidecar.
// Input: research/archive/comparison/legacy/graffiti-reference-manifest-01.json (frozen snapshot).
// Output: research/archive/comparison/{sources,specimens,observations,findings}.v1.json + MIGRATION_REPORT_01.json.
// After the first run the *.v1.json files are the edited sources; this tool refuses to overwrite them
// unless --force is given. Usage: node tools/migrate-reference-manifest.mjs [--force]
import { readFileSync, writeFileSync, existsSync } from 'node:fs';
import { migrateManifest } from '../src/archive/comparison-migrate.js';
import { stableStringify } from '../src/core/stable-json.js';
import { sha256Hex } from '../src/core/sha256.js';

const DIR = 'research/archive/comparison';
const INPUT = `${DIR}/legacy/graffiti-reference-manifest-01.json`;
const text = readFileSync(INPUT, 'utf8');
const out = migrateManifest(JSON.parse(text));
const files = {
  'sources.v1.json': out.sources, 'specimens.v1.json': out.specimens,
  'observations.v1.json': out.observations, 'findings.v1.json': out.findings,
};
const serialised = Object.fromEntries(Object.entries(files).map(([k, v]) => [k, stableStringify(v, 2) + '\n']));
if (!process.argv.includes('--force') && Object.keys(files).some((k) => existsSync(`${DIR}/${k}`))) {
  console.error('Sidecar files already exist; they are edited sources now. Use --force only to redo the initial migration.');
  process.exit(1);
}
for (const [k, t] of Object.entries(serialised)) writeFileSync(`${DIR}/${k}`, t);
const report = { ...out.report, input: { ...out.report.input, path: INPUT, sha256: sha256Hex(text) }, initialOutputSha256: Object.fromEntries(Object.entries(serialised).map(([k, t]) => [k, sha256Hex(t)])) };
writeFileSync(`${DIR}/MIGRATION_REPORT_01.json`, stableStringify(report, 2) + '\n');
console.log(`Migrated ${out.sources.sources.length} sources and ${out.specimens.specimens.length} specimens to ${DIR}.`);
