// Browser check for the Creator page: generate for a word in every available style,
// expect four proposal cards with real glyph paths; also check an unsupported input.
import { startServer, chrome } from '../lib/headless.mjs';

const { server, port } = await startServer(process.cwd());
const base = `http://127.0.0.1:${port}/creator/index.html`;
const fails = [];
try {
  for (const style of ['bubble', 'straight', 'blockbuster']) {
    const dom = await chrome(['--virtual-time-budget=20000', '--window-size=1280,1600', '--dump-dom', `${base}?auto=1&word=MR%20PAVIAN&style=${style}`]);
    const cards = (dom.match(/<li class="card/g) ?? []).length;
    const glyphs = (dom.match(/data-glyph-id="latin\.upper\./g) ?? []).length;
    if (cards !== 4) fails.push(`${style}: ${cards} cards`);
    if (glyphs !== 4 * 8) fails.push(`${style}: ${glyphs} glyphs drawn, expected 32`);
    if (!dom.includes('data-generated="1"')) fails.push(`${style}: generation did not finish`);
  }
  const bad = await chrome(['--virtual-time-budget=20000', '--window-size=390,900', '--dump-dom', `${base}?auto=1&word=K%C3%96LN`]);
  if (!bad.includes('Nicht unterstützt: Ö')) fails.push('unsupported letter not reported');
  if (/<li class="card/.test(bad)) fails.push('cards shown despite unsupported input');
} finally { server.close(); }
console.log(fails.length ? `CREATOR-FAIL\n  ${fails.join('\n  ')}` : 'CREATOR-PASS 3 styles × 4 proposals, unsupported input reported');
process.exitCode = fails.length ? 1 : 0;
