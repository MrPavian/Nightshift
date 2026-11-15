#!/usr/bin/env node
// Runs editor/index.html?selftest in headless Chrome: a scripted edit loop
// through the same handlers as pointer input (preview, commit, reject, cancel,
// stale revision, camera, undo/redo, save/reload, nudge, disabled parameters).
// Optional: --screenshot=<path> [--mobile]
import { readFileSync, writeFileSync, mkdirSync } from 'node:fs';
import { createHash } from 'node:crypto';
import { startServer, chrome, preText } from './lib/headless.mjs';

const capture = process.argv.includes('--capture');
const OUT = 'docs/reports/proof/T07';

const shot = process.argv.find((a) => a.startsWith('--screenshot='))?.split('=')[1];
const size = process.argv.includes('--mobile') ? '412,1500' : '1280,900';
const { server, port } = await startServer();
let code = 1;
try {
  const dom = await chrome(['--virtual-time-budget=20000', `--window-size=${size}`, '--dump-dom', `http://127.0.0.1:${port}/editor/index.html?selftest`]);
  const st = JSON.parse(preText(dom, 'selftest') ?? '{}');
  console.log(`${st.pass ? 'EDITOR-PASS' : 'EDITOR-FAIL'} ${JSON.stringify(st)}`);
  if (capture) {
    mkdirSync(OUT, { recursive: true });
    const png = `${OUT}/editor-loop.png`;
    await chrome(['--virtual-time-budget=20000', '--window-size=1280,900', `--screenshot=${png}`, `http://127.0.0.1:${port}/editor/index.html?selftest`]);
    const hash = (p) => createHash('sha256').update(readFileSync(p)).digest('hex');
    const manifest = {
      proofRunId: 'proof.0.7A-T07.editor-loop',
      issue: 'C01 (#4)',
      result: st.pass ? 'pass' : 'fail',
      page: 'editor/index.html?selftest',
      operation: 'contour.move-node (D-013)',
      steps: st.steps,
      scriptErrors: st.errors,
      inputs: Object.fromEntries(['data/legacy/v06-glyph-paths.json', 'data/semantic/abgrs-semantic-overlay.v1.json', 'data/validator-profiles/legacy-v06.v1.json', 'editor/editor.js', 'src/model/editor-store.js', 'src/model/operations.js'].map((p) => [p, hash(p)])),
      artifacts: { 'editor-loop.png': { sha256: hash(png), note: 'Final state after the scripted run. Screenshot bytes may vary across Chrome versions; pass/fail comes from the steps.' } },
      review: { status: 'pending', note: 'Automated evidence only; no maturity change.' },
    };
    writeFileSync(`${OUT}/manifest.json`, JSON.stringify(manifest, null, 2) + '\n');
    console.log(`Wrote ${OUT}/manifest.json and editor-loop.png`);
  }
  if (shot) await chrome(['--virtual-time-budget=20000', `--window-size=${size}`, `--screenshot=${shot}`, `http://127.0.0.1:${port}/editor/index.html?selftest`]);
  code = st.pass ? 0 : 1;
} catch (e) {
  console.error(e.message);
} finally {
  server.close();
}
process.exit(code);
