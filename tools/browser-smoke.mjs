#!/usr/bin/env node
// Runs tests/browser/smoke.html in headless Chrome and checks that the
// canonical model loads in a real browser. Set CHROME=/path/to/chrome if needed.
import { startServer, chrome, preText } from './lib/headless.mjs';

const { server, port } = await startServer();
let code = 1;
try {
  const dom = await chrome(['--virtual-time-budget=5000', '--dump-dom', `http://127.0.0.1:${port}/tests/browser/smoke.html`], { timeout: 60000 });
  const result = preText(dom, 'out') ?? 'no result';
  console.log(result);
  code = result.startsWith('SMOKE-PASS') ? 0 : 1;
} catch (e) {
  console.error(`Could not run Chrome: ${e.message}`);
  code = 2;
} finally {
  server.close();
}
process.exit(code);
