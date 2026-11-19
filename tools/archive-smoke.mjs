#!/usr/bin/env node
// C06 browser smoke test: every archive view renders on a 360 px phone without errors or
// horizontal overflow; claim sheets open; alias search works; and every available
// editor-bridge capability opens its real target page with a working way back.
import { readFileSync } from 'node:fs';
import { startServer, chrome, preText } from './lib/headless.mjs';
import { BRIDGE_CAPABILITIES, bridgeHref } from '../src/bridge/editor-bridge.js';

const A = JSON.parse(readFileSync('data/archive/archive.v1.de.json', 'utf8'));
const { server, port } = await startServer(process.cwd());
const base = `http://127.0.0.1:${port}/`;
const fails = [];
const state = async (url, size = '360,800') => JSON.parse(preText(await chrome([`--window-size=${size}`, '--virtual-time-budget=6000', '--dump-dom', url], { timeout: 180000 }), 'selftest') ?? '{}');

try {
  const routes = ['/', '/suche', '/zeitleiste', '/szenen', '/glossar', ...['stile', 'praxis', 'material', 'personen', 'bildarchiv'].map((k) => `/bereich/${k}`), '/pfade', ...A.paths.map((p) => `/pfad/${p.id}`), '/a-z', '/quellen', '/so-liest-du', '/entry/does.not-exist', ...A.entries.map((e) => `/entry/${e.id}`)];
  let sheets = 0;
  for (const r of routes) {
    const st = await state(`${base}archive/index.html?nosw&selftest#${r}`);
    if (!st.ready || st.errors?.length) fails.push(`${r}: not ready or errors ${JSON.stringify(st.errors)}`);
    if (st.overflow > 0) fails.push(`${r}: horizontal overflow ${st.overflow}px at 360px`);
    if (r.startsWith('/entry/') && !r.includes('does.not')) {
      if (!st.claimSheet?.open || !st.claimSheet.hasSource) fails.push(`${r}: claim sheet did not open with a source`);
      else sheets++;
    }
  }
  const desk = await state(`${base}archive/index.html?nosw#/entry/history.nyc-emergence`, '1280,900');
  if (desk.overflow > 0 || desk.errors?.length) fails.push('desktop entry view');
  const alias = await state(`${base}archive/index.html?nosw&selftest#/suche?q=pichacao`);
  if (alias.results !== 1) fails.push(`alias search “pichacao” returned ${alias.results}`);
  const none = await state(`${base}archive/index.html?nosw&selftest#/suche?q=zzzz`);
  if (none.results !== 0 || !none.ready) fails.push('empty search state');

  let bridges = 0;
  for (const [id, cap] of Object.entries(BRIDGE_CAPABILITIES).filter(([, c]) => c.status === 'available')) {
    const params = cap.params.glyph ? { glyph: 'G' } : cap.params.word ? { word: 'GRAB' } : {};
    const from = A.bridge.capabilities[id].linkedFrom[0] ?? 'construction.letter-anatomy';
    const dom = await chrome(['--virtual-time-budget=8000', '--dump-dom', bridgeHref(id, params, { from, base })], { timeout: 180000 });
    const st = JSON.parse(preText(dom, 'selftest') ?? '{}');
    const back = dom.match(/<a class="bridge-return" href="([^"]+)"/)?.[1];
    if (!st.ready || st.errors?.length) fails.push(`${id}: target page not ready`);
    if (st.bridge?.capability !== id) fails.push(`${id}: target did not accept the request`);
    if (back !== `../archive/index.html#/entry/${from}`) fails.push(`${id}: missing return link (${back})`);
    if (cap.page === 'editor' && !dom.includes(`data-id="latin.upper.${params.glyph}" aria-pressed="true"`)) fails.push(`${id}: editor did not open ${params.glyph}`);
    if (cap.fixed.tab && !new RegExp(`data-tab="${cap.fixed.tab}" aria-selected="true"`).test(dom)) fails.push(`${id}: review tab ${cap.fixed.tab} not selected`);
    if (params.word && !dom.includes(`Live: ${params.word}`)) fails.push(`${id}: word not set`);
    bridges++;
  }
  if (process.argv.includes('--capture') && !fails.length) {
    const { mkdirSync, writeFileSync, readFileSync: rf } = await import('node:fs');
    const { createHash } = await import('node:crypto');
    const dir = 'docs/reports/proof/C06';
    mkdirSync(dir, { recursive: true });
    const shots = [['home-phone', '/', '390,1800'], ['entry-phone', '/entry/history.nyc-emergence', '390,2600'], ['entry-desktop', '/entry/construction.letter-anatomy', '1280,1300'],
      ['search-phone', '/suche?q=dortmund', '390,1100'], ['timeline-phone', '/zeitleiste', '390,2200'], ['scenes-desktop', '/szenen', '1280,1500'], ['path-phone', '/pfad/path.how-styles-travel', '390,1500'],
      ['entry-tablet', '/entry/history.modern-name-writing', '820,1700'], ['section-desktop', '/bereich/praxis', '1280,1000'], ['menu-phone', '/glossar', '390,1200']];
    const out = {};
    for (const [name, hash, size] of shots) {
      await chrome([`--window-size=${size}`, '--virtual-time-budget=6000', `--screenshot=${dir}/${name}.png`, `${base}archive/index.html?nosw#${hash}`], { timeout: 180000 });
      out[`${name}.png`] = createHash('sha256').update(rf(`${dir}/${name}.png`)).digest('hex');
    }
    const inputs = Object.fromEntries(['data/archive/archive.v1.de.json', 'archive/index.html', 'archive/app.js', 'archive/app.css', 'src/bridge/editor-bridge.js'].map((f) => [f, createHash('sha256').update(rf(f)).digest('hex')]));
    writeFileSync(`${dir}/manifest.json`, JSON.stringify({ package: 'C06', result: 'pass', routes: routes.length, claimSheets: sheets, bridgeTargets: bridges, inputs, screenshots: out }, null, 2) + '\n');
    console.log(`Wrote ${dir}/manifest.json and ${shots.length} screenshots`);
  }
  const summary = { routes: routes.length, claimSheets: sheets, bridgeTargets: bridges, fails };
  console.log(`${fails.length ? 'ARCHIVE-FAIL' : 'ARCHIVE-PASS'} ${JSON.stringify(summary)}`);
  process.exitCode = fails.length ? 1 : 0;
} finally { server.close(); }
