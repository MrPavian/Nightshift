// Prints academy/heft.html to academy/heft.pdf (A4 landscape) with headless Chrome.
//   node tools/academy/build-heft.mjs
// Chrome embeds WebP losslessly, which made the PDF about 70 MB. JPEG passes through unchanged, so the
// sheets are first converted to JPEG (quality 75) in academy/.print-cache/ (git-ignored) with Python/Pillow.
import { statSync } from 'node:fs';
import { execFileSync } from 'node:child_process';
import { startServer, chrome } from '../lib/headless.mjs';

execFileSync('python3', ['-c', `
import os
from PIL import Image
os.makedirs('academy/.print-cache', exist_ok=True)
for c in 'ABCDEFGHIJKLMNOPQRSTUVWXYZ':
    Image.open(f'assets/design/reference/academy-uppercase/{c}.webp').convert('RGB').save(f'academy/.print-cache/{c}.jpg', 'JPEG', quality=75, optimize=True)
`], { stdio: 'inherit' });
const { server, port } = await startServer(process.cwd());
try {
  await chrome(['--virtual-time-budget=30000', '--no-pdf-header-footer', `--print-to-pdf=${process.cwd()}/academy/heft.pdf`, `http://127.0.0.1:${port}/academy/heft.html`]);
  console.log(`academy/heft.pdf ${(statSync('academy/heft.pdf').size / 1e6).toFixed(1)} MB`);
} finally { server.close(); }
