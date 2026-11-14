#!/usr/bin/env node
// Loads review/index.html in headless Chrome (local Three.js) and checks the
// page's self-test: registry built, 26 tiles, expected refusals, Three.js viewport,
// no script errors. Optional: --screenshot=<path> [--mobile]
import { startServer, chrome, preText } from './lib/headless.mjs';

const shot = process.argv.find((a) => a.startsWith('--screenshot='))?.split('=')[1];
const size = process.argv.includes('--mobile') ? '412,2400' : '1280,1800';
const { server, port } = await startServer();
const url = `http://127.0.0.1:${port}/review/index.html`;
let code = 1;
try {
  const dom = await chrome(['--virtual-time-budget=15000', `--window-size=${size}`, '--dump-dom', url]);
  const st = JSON.parse(preText(dom, 'selftest') ?? '{}');
  const ok = st.ready && st.tiles === 26 && st.three === 'ok' && st.errors.length === 0 && JSON.stringify(st.missing) === JSON.stringify(['D', 'O', 'P', 'Q']);
  console.log(`${ok ? 'REVIEW-PAGE-PASS' : 'REVIEW-PAGE-FAIL'} ${JSON.stringify(st)}`);
  if (shot) await chrome(['--virtual-time-budget=15000', `--window-size=${size}`, `--screenshot=${shot}`, url]);
  code = ok ? 0 : 1;
} catch (e) {
  console.error(e.message);
} finally {
  server.close();
}
process.exit(code);
