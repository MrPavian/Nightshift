#!/usr/bin/env node
// Runs editor/index.html?selftest in headless Chrome: a scripted edit loop
// through the same handlers as pointer input (preview, commit, reject, cancel,
// stale revision, camera, undo/redo, save/reload, nudge, disabled parameters).
// Optional: --screenshot=<path> [--mobile]
import { startServer, chrome, preText } from './lib/headless.mjs';

const shot = process.argv.find((a) => a.startsWith('--screenshot='))?.split('=')[1];
const size = process.argv.includes('--mobile') ? '412,1500' : '1280,900';
const { server, port } = await startServer();
let code = 1;
try {
  const dom = await chrome(['--virtual-time-budget=20000', `--window-size=${size}`, '--dump-dom', `http://127.0.0.1:${port}/editor/index.html?selftest`]);
  const st = JSON.parse(preText(dom, 'selftest') ?? '{}');
  console.log(`${st.pass ? 'EDITOR-PASS' : 'EDITOR-FAIL'} ${JSON.stringify(st)}`);
  if (shot) await chrome(['--virtual-time-budget=20000', `--window-size=${size}`, `--screenshot=${shot}`, `http://127.0.0.1:${port}/editor/index.html?selftest`]);
  code = st.pass ? 0 : 1;
} catch (e) {
  console.error(e.message);
} finally {
  server.close();
}
process.exit(code);
