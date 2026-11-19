// Smoke test for the Academy gallery (academy/index.html) in headless Chrome:
// overview with 26 cards and the general notes, plus one detail view per letter.
import { readFileSync } from 'node:fs';
import { startServer, chrome } from '../lib/headless.mjs';

const data = JSON.parse(readFileSync('data/academy/uppercase-reference.v1.json', 'utf8'));
const { server, port } = await startServer(process.cwd());
const base = `http://127.0.0.1:${port}/academy/index.html`;
const fails = [];
try {
  const grid = await chrome(['--virtual-time-budget=8000', '--window-size=390,844', '--dump-dom', base]);
  if (!grid.includes('data-ready="true"')) fails.push('overview did not finish rendering');
  const cards = (grid.match(/class="card"/g) ?? []).length;
  if (cards !== 26) fails.push(`overview shows ${cards} cards, expected 26`);
  if ((grid.match(/class="fix"/g) ?? []).length !== data.general.length) fails.push('general notes incomplete');
  for (const c of ['A', 'N', 'Z']) {
    const dom = await chrome(['--virtual-time-budget=8000', '--window-size=1280,900', '--dump-dom', `${base}#${c}`]);
    const issues = dom.split('id="d-issues"')[1]?.split('</ol>')[0] ?? '';
    const n = (issues.match(/<li>/g) ?? []).length;
    if (n !== data.letters[c].issues.length) fails.push(`${c}: ${n} corrections shown, expected ${data.letters[c].issues.length}`);
    if (!dom.includes(`>Lernblatt ${c}<`)) fails.push(`${c}: title missing`);
    if (!dom.includes(`>${data.letters[c].practiceWord}<`)) fails.push(`${c}: practice word missing`);
  }
} finally { server.close(); }
console.log(fails.length ? `ACADEMY-GALLERY-FAIL\n  ${fails.join('\n  ')}` : 'ACADEMY-GALLERY-PASS 26 cards, detail views A/N/Z');
process.exitCode = fails.length ? 1 : 0;
