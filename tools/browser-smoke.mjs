#!/usr/bin/env node
// Runs tests/browser/smoke.html in headless Chrome against a temporary static
// server and checks that the canonical model loads in a real browser.
// Usage: node tools/browser-smoke.mjs   (set CHROME=/path/to/chrome if needed)

import { createServer } from 'node:http';
import { readFile } from 'node:fs/promises';
import { execFile } from 'node:child_process';
import { promisify } from 'node:util';
import { extname, join, normalize } from 'node:path';

const ROOT = process.cwd();
const TYPES = { '.html': 'text/html', '.js': 'text/javascript', '.mjs': 'text/javascript', '.json': 'application/json' };

const server = createServer(async (req, res) => {
  const path = normalize(join(ROOT, decodeURIComponent(new URL(req.url, 'http://x').pathname)));
  if (!path.startsWith(ROOT)) { res.writeHead(403).end(); return; }
  let body;
  try { body = await readFile(path); } catch { res.writeHead(404).end(); return; }
  res.writeHead(200, { 'content-type': TYPES[extname(path)] ?? 'application/octet-stream' }).end(body);
});

server.listen(0, '127.0.0.1', async () => {
  const { port } = server.address();
  const chrome = process.env.CHROME ?? 'google-chrome';
  let dom = '';
  try {
    // Must be async: a synchronous child process would block this server.
    ({ stdout: dom } = await promisify(execFile)(chrome, ['--headless=new', '--no-sandbox', '--disable-gpu',
      '--virtual-time-budget=5000', '--dump-dom', `http://127.0.0.1:${port}/tests/browser/smoke.html`], { timeout: 60000 }));
  } catch (e) {
    console.error(`Could not run ${chrome}: ${e.message}`);
    server.close();
    process.exit(2);
  }
  server.close();
  const result = dom.match(/<pre id="out">([^<]*)<\/pre>/)?.[1] ?? 'no result';
  console.log(result);
  process.exit(result.startsWith('SMOKE-PASS') ? 0 : 1);
});
