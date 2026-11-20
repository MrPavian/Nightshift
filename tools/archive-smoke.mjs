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

  // ---- letterform comparison library (Gate 2: object browser; Gate 3: glyph and construction comparison) ----
  const C = JSON.parse(readFileSync('data/archive/comparison.v1.de.json', 'utf8'));
  const inspected = C.specimens.filter((s) => s.visualState === 'hi_fi_image_opened_and_inspected');
  const metaOnly = C.specimens.find((s) => s.visualState === 'catalogue_metadata_only');
  const xs = C.glyphObservations.filter((g) => g.glyph === 'X').map((g) => g.id);
  const emptyLetter = [...'ABCDEFGHIJKLMNOPQRSTUVWXYZ'].find((c) => !C.glyphObservations.some((g) => g.glyph === c));
  const cmpRoutes = ['/vergleich', '/vergleich/fundstuecke', `/vergleich/fundstueck/${inspected[0].id}`, `/vergleich/fundstueck/${metaOnly.id}`, '/vergleich/fundstueck/GIBT-ES-NICHT',
    ...(C.pilotGate.open ? ['/vergleich/buchstabe/X', `/vergleich/buchstabe/X?auswahl=${xs.slice(0, 2).join(',')}`, `/vergleich/buchstabe/${emptyLetter}`, '/vergleich/buchstabe/1', '/vergleich/merkmal/closed-counter', '/vergleich/merkmal/gibt-es-nicht'] : [])];
  const dom = async (url, size = '360,800') => chrome([`--window-size=${size}`, '--virtual-time-budget=6000', '--dump-dom', url], { timeout: 180000 });
  for (const r of cmpRoutes) {
    const d = await dom(`${base}archive/index.html?nosw&selftest#${r}`);
    const st = JSON.parse(preText(d, 'selftest') ?? '{}');
    if (!st.ready || st.errors?.length) fails.push(`${r}: not ready or errors ${JSON.stringify(st.errors)}`);
    if (st.overflow > 0) fails.push(`${r}: horizontal overflow ${st.overflow}px at 360px`);
    if (!st.comparison) fails.push(`${r}: comparison data not loaded`);
    if (/<img\b/i.test(d.split('<main')[1] ?? '')) fails.push(`${r}: an image is embedded`);
    if (!/aria-current="page"[^>]*>Stile/.test(d) && !/data-nav="stile" aria-current="page"/.test(d)) fails.push(`${r}: navigation does not mark „Stile & Buchstaben“`);
    if (r.includes(inspected[0].id) && !d.includes(`href="${inspected[0].itemUrl.replace(/&/g, '&amp;')}"`)) fails.push(`${r}: original source link missing`);
    if (/GIBT-ES-NICHT|buchstabe\/1$|gibt-es-nicht$/.test(r) && !d.includes('Diesen Eintrag gibt es nicht')) fails.push(`${r}: missing record not reported`);
    if (r === '/vergleich/buchstabe/X' && st.results !== xs.length) fails.push(`${r}: ${st.results} cards, expected ${xs.length}`);
    if (r.includes('auswahl=') && st.selected !== 2) fails.push(`${r}: ${st.selected} compared, expected 2`);
    if (r.startsWith('/vergleich/buchstabe/X')) for (const id of xs) { const sp = C.specimens.find((s) => s.glyphObservationIds.includes(id)); if (!d.includes(`href="${sp.itemUrl.replace(/&/g, '&amp;')}"`)) fails.push(`${r}: original source link missing for ${id}`); }
    if (r.endsWith(`/${emptyLetter}`) && !d.includes('noch keine geprüfte Beobachtung')) fails.push(`${r}: empty letter not reported`);
    if (r.endsWith('closed-counter') && st.results !== C.glyphObservations.filter((g) => g.features.includes('closed-counter')).length) fails.push(`${r}: wrong feature result count`);
  }
  const filtered = await state(`${base}archive/index.html?nosw&selftest#/vergleich/fundstuecke?sichtung=hi_fi_image_opened_and_inspected`);
  if (filtered.results !== inspected.length) fails.push(`filter Sichtung returned ${filtered.results}, expected ${inspected.length}`);
  const chalfant = C.specimens.filter((s) => /chalfant/i.test(s.photographerName ?? '')).length;
  const searched = await state(`${base}archive/index.html?nosw&selftest#/vergleich/fundstuecke?q=chalfant`);
  if (searched.results !== chalfant) fails.push(`search „chalfant“ returned ${searched.results}, expected ${chalfant}`);
  const cmpNone = await state(`${base}archive/index.html?nosw&selftest#/vergleich/fundstuecke?q=zzzz`);
  if (cmpNone.results !== 0) fails.push('comparison empty search state');
  const cmpDesk = await state(`${base}archive/index.html?nosw#/vergleich/fundstuecke`, '1280,900');
  if (cmpDesk.overflow > 0 || cmpDesk.errors?.length) fails.push('comparison desktop view');

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
    const cdir = 'docs/reports/proof/comparison';
    mkdirSync(cdir, { recursive: true });
    const cshots = [['landing-phone', '/vergleich', '390,1400'], ['browser-phone', '/vergleich/fundstuecke', '390,2400'], ['browser-tablet', '/vergleich/fundstuecke?sichtung=hi_fi_image_opened_and_inspected', '820,1600'], ['detail-desktop', `/vergleich/fundstueck/${inspected[0].id}`, '1280,1100'], ['detail-phone-catalogue-only', `/vergleich/fundstueck/${metaOnly.id}`, '390,1500'],
      ...(C.pilotGate.open ? [['letter-desktop-compare', `/vergleich/buchstabe/X?auswahl=${xs.slice(0, 3).join(',')}`, '1280,2200'], ['letter-phone', '/vergleich/buchstabe/O', '390,2600'], ['feature-tablet', '/vergleich/merkmal/closed-counter', '820,2200']] : [])];
    const cout = {};
    for (const [name, hash, size] of cshots) {
      await chrome([`--window-size=${size}`, '--virtual-time-budget=6000', `--screenshot=${cdir}/${name}.png`, `${base}archive/index.html?nosw#${hash}`], { timeout: 180000 });
      cout[`${name}.png`] = createHash('sha256').update(rf(`${cdir}/${name}.png`)).digest('hex');
    }
    const cinputs = Object.fromEntries(['data/archive/comparison.v1.de.json', 'archive/comparison.js', 'archive/app.js', 'archive/app.css'].map((f) => [f, createHash('sha256').update(rf(f)).digest('hex')]));
    writeFileSync(`${cdir}/manifest.json`, JSON.stringify({ package: 'letterform-comparison Gates 2 and 3', result: 'pass', routes: cmpRoutes.length, inputs: cinputs, screenshots: cout }, null, 2) + '\n');
    console.log(`Wrote ${dir}/manifest.json and ${shots.length} screenshots`);
  }
  const summary = { routes: routes.length, claimSheets: sheets, bridgeTargets: bridges, fails };
  console.log(`${fails.length ? 'ARCHIVE-FAIL' : 'ARCHIVE-PASS'} ${JSON.stringify(summary)}`);
  process.exitCode = fails.length ? 1 : 0;
} finally { server.close(); }
