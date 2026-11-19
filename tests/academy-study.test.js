// Letter Construction Academy: study A (generated SVG). Layout QA runs in the browser
// (tools/academy/check-letter-study.mjs, part of npm run test:browser); these tests check
// reproducibility, structure and the factual corrections required by the master prompt v1.2.
import { test } from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync, mkdtempSync } from 'node:fs';
import { execFileSync } from 'node:child_process';
import { tmpdir } from 'node:os';
import { join } from 'node:path';

const FULL = 'assets/design/letter-study_A_01.svg', CLEAN = 'assets/design/letter-study_A_01_clean.svg';
const full = readFileSync(FULL, 'utf8'), clean = readFileSync(CLEAN, 'utf8');
const texts = (svg) => [...svg.matchAll(/<text[^>]*>([^<]*)<\/text>/g)].map((m) => m[1].replace(/&amp;/g, '&').replace(/&quot;/g, '"'));
const all = texts(full).join(' ');

test('the committed SVGs are exactly what the generator produces (no hand edits)', () => {
  const out = mkdtempSync(join(tmpdir(), 'academy-'));
  execFileSync(process.execPath, ['tools/academy/build-letter-study-a.mjs'], { env: { ...process.env, ACADEMY_OUT: out } });
  assert.equal(readFileSync(join(out, 'letter-study_A_01.svg'), 'utf8'), full);
  assert.equal(readFileSync(join(out, 'letter-study_A_01_clean.svg'), 'utf8'), clean);
});

test('A4 landscape, nine numbered panels in fixed order, header and footer', () => {
  assert.match(full, /width="297mm" height="210mm" viewBox="0 0 1680 1188"/);
  for (let n = 1; n <= 9; n++) assert.ok(full.includes(`id="panel-${n}-frame"`), `panel ${n}`);
  const order = ['GRUNDFORM', 'BUCHSTABENANATOMIE', 'PROPORTIONEN & RASTER', 'KONSTRUKTIONSANALYSE', 'FORMVARIATIONEN', 'FORMCHARAKTER', 'KALLIGRAFIE & DUKTUS', 'GRAFFITI-TRANSFER', 'LERNKONTROLLE'];
  const pos = order.map((t) => all.indexOf(t));
  assert.ok(pos.every((p) => p >= 0), 'all panel titles present');
  assert.deepEqual([...pos].sort((a, b) => a - b), pos, 'panel titles in master-prompt order');
  for (const t of ['NIGHTSHIFT', 'BUCHSTABENSTUDIE:', 'Ziel:']) assert.ok(all.includes(t), t);
});

test('separate, named layers; the clean print version drops texture, distress and spray only', () => {
  for (const k of ['paper', 'distress', 'spray', 'under', 'frames', 'letters', 'construction', 'labels']) assert.ok(full.includes(`id="layer-${k}"`), k);
  for (const k of ['distress', 'spray']) assert.ok(!clean.includes(`id="layer-${k}"`), `clean has no ${k}`);
  assert.ok(!clean.includes('url(#grain)'));
  assert.deepEqual(texts(clean), texts(full), 'clean version keeps every text');
});

test('every label is real, editable SVG text in embedded fonts; no raster images', () => {
  assert.ok(texts(full).length > 150);
  assert.ok(!/<image\b/.test(full), 'no embedded raster images');
  assert.match(full, /font-family:'NS Marker'/); assert.match(full, /font-family:'NS Hand'/);
});

test('factual corrections of the master prompt v1.2 are in place', () => {
  assert.ok(!/X-Linie|x-Linie|X = Mittellinie/.test(all), 'no generic x-line for capitals');
  assert.ok(/keine x-Höhe/.test(all), 'explains that capitals have no x-height');
  assert.ok(!/drei (Haupt)?bewegungen|drei Striche/i.test(all), 'no universal three-movement claim');
  assert.ok(/Beispielwerte dieser Zeichnung/.test(all) && /Keine festen Regeln/.test(all), 'percentages framed as examples');
  assert.ok(/Annahme/.test(all), 'stroke sequence marked as an assumption');
  assert.ok(/nicht direkt auf die Sprühdose/.test(all), 'no direct transfer of nib/brush mechanics to aerosol');
  assert.ok(!/\bAuge\b/.test(all), 'counter is not called "Auge"');
  assert.ok(!/schnell/i.test(all), 'no speed claims about throw-ups');
  assert.ok(/keine Stufenfolge/.test(all), 'graffiti directions are parallel, not a ladder');
  for (const t of ['THROW-UP', 'BLOCK-STYLE', 'WILDSTYLE']) assert.ok(all.includes(t), t);
});

test('anatomy names only parts of the A and every leader carries a checked target', () => {
  for (const t of ['Scheitel', 'Punze', 'Schenkel', 'Querbalken', 'Fuß']) assert.ok(all.includes(t), t);
  const leaders = [...full.matchAll(/data-target="([^"]+)" data-expect="(fill|counter)"/g)];
  assert.equal(leaders.length, 6);
  assert.equal(leaders.filter((m) => m[2] === 'counter').length, 1);
});

test('the sheet is marked as pending owner review, not approved', () => {
  assert.match(full, /"status":"owner review pending"/);
  assert.ok(!/freigegeben|approved/i.test(all));
});
