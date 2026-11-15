// Shared helpers: a static file server rooted at the repository and a
// headless-Chrome runner. Used by browser smoke tests and proof generation.
import { createServer } from 'node:http';
import { readFile } from 'node:fs/promises';
import { execFile } from 'node:child_process';
import { promisify } from 'node:util';
import { extname, join, normalize } from 'node:path';

const TYPES = { '.html': 'text/html', '.js': 'text/javascript', '.mjs': 'text/javascript', '.json': 'application/json', '.svg': 'image/svg+xml', '.png': 'image/png', '.css': 'text/css', '.woff2': 'font/woff2', '.txt': 'text/plain' };

export function startServer(root = process.cwd()) {
  const server = createServer(async (req, res) => {
    const path = normalize(join(root, decodeURIComponent(new URL(req.url, 'http://x').pathname)));
    if (!path.startsWith(root)) { res.writeHead(403).end(); return; }
    let body;
    try { body = await readFile(path); } catch { res.writeHead(404).end(); return; }
    res.writeHead(200, { 'content-type': TYPES[extname(path)] ?? 'application/octet-stream' }).end(body);
  });
  return new Promise((resolve) => server.listen(0, '127.0.0.1', () => resolve({ server, port: server.address().port })));
}

const CHROME_FLAGS = ['--headless=new', '--no-sandbox', '--disable-gpu', '--use-angle=swiftshader', '--enable-unsafe-swiftshader',
  '--force-device-scale-factor=1', '--hide-scrollbars'];

/** Run Chrome asynchronously (a sync call would block the in-process server). */
export async function chrome(args, { timeout = 120000 } = {}) {
  const bin = process.env.CHROME ?? 'google-chrome';
  const { stdout } = await promisify(execFile)(bin, [...CHROME_FLAGS, ...args], { timeout, maxBuffer: 64 * 1024 * 1024 });
  return stdout;
}

export const preText = (dom, id) => dom.match(new RegExp(`<pre id="${id}"[^>]*>([^<]*)</pre>`))?.[1]
  ?.replace(/&quot;/g, '"').replace(/&lt;/g, '<').replace(/&gt;/g, '>').replace(/&amp;/g, '&') ?? null;
