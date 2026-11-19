// Renders an Academy sheet in headless Chrome, runs the layout QA (tools/academy/qa.html)
// and writes a full-page proof plus 2x crops of every panel.
//   node tools/academy/check-letter-study.mjs assets/design/letter-study_A_01.svg docs/reports/proof/academy-A
import { mkdirSync, writeFileSync } from 'node:fs';
import { tmpdir } from 'node:os';
import { join } from 'node:path';
import { startServer, chrome, preText } from '../lib/headless.mjs';

const [file = 'assets/design/letter-study_A_01.svg', out = join(tmpdir(), 'academy-qa')] = process.argv.slice(2);
mkdirSync(out, { recursive: true });
const { server, port } = await startServer(process.cwd());
const url = `http://127.0.0.1:${port}/tools/academy/qa.html?file=/${file}`;
try {
  const dom = await chrome(['--virtual-time-budget=15000', '--window-size=1680,1188', '--dump-dom', url]);
  const qa = JSON.parse(preText(dom, 'qa') ?? '{"ready":false}');
  const name = file.split('/').pop().replace('.svg', '');
  await chrome(['--virtual-time-budget=15000', '--window-size=1680,1188', `--screenshot=${out}/${name}.png`, url]);
  await chrome(['--virtual-time-budget=15000', '--window-size=1680,1188', '--force-device-scale-factor=2', `--screenshot=${out}/${name}@2x.png`, url]);
  writeFileSync(`${out}/${name}.qa.json`, JSON.stringify(qa, null, 2));
  console.log(`${qa.ready && !qa.issues.length ? 'ACADEMY-QA-PASS' : 'ACADEMY-QA-FAIL'} texts=${qa.texts} leaders=${qa.leaders?.filter((l) => l.ok).length}/${qa.leaders?.length} issues=${qa.issues?.length}`);
  for (const i of qa.issues ?? []) console.log(' ', JSON.stringify(i));
  process.exitCode = qa.ready && !qa.issues.length ? 0 : 1;
} finally { server.close(); }
