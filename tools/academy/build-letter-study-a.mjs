// Builds the Letter Construction Academy study for uppercase A.
//   node tools/academy/build-letter-study-a.mjs
// Writes assets/design/letter-study_A_01.svg (full) and assets/design/letter-study_A_01_clean.svg
// (clean print version without paper texture, edge distress and spray).
// Visual target: assets/design/reference/academy-uppercase/A.webp (owner-approved, style only).
// Teaching content follows docs/lettering/MASTER_CONTROL_PROMPT_01.md v1.2 and corrects the reference's errors.
import { readFileSync, writeFileSync } from 'node:fs';
import {
  Sheet, C, FAMILY, LAYER_ORDER, LAYER_TITLES, text, textBlock, textWidth, wrap, roughRectPath, blob, panel, highlight, tag, arrow,
  labelBox, check, crown, splat, ribbon, graffiti, poly, pts, f, esc,
} from './lib.mjs';

const W = 1680, H = 1188;
const sh = new Sheet(1987);

// ---------------- neutral reference A (local units, 128 × 140, y down) ----------------
// Outer contour and triangular counter. All measurements on the sheet are derived from these numbers.
const A_OUT = [[50, 0], [78, 0], [128, 140], [98, 140], [86.57, 108], [41.43, 108], [30, 140], [0, 140]];
const A_CTR = [[64, 44.8], [79.43, 88], [48.57, 88]];
const A_SKEL = { left: [[15, 140], [64, 2]], right: [[64, 2], [113, 140]], bar: [[30, 98], [98, 98]] };
const A_M = { h: 140, w: 128, barTop: 88, barBottom: 108, stroke: 28.25 }; // stroke measured perpendicular to the leg
const tf = (p, x, y, s, skew = 0) => p.map(([a, b]) => [x + (a + (A_M.h - b) * skew) * s, y + b * s]);
const aPath = (x, y, s, skew = 0) => `${poly(tf(A_OUT, x, y, s, skew))} ${poly(tf(A_CTR, x, y, s, skew))}`;
const pct = (v) => Math.round(v * 100);
const EX = { width: pct(A_M.w / A_M.h), barTop: pct((A_M.h - A_M.barTop) / A_M.h), counter: pct((A_M.barTop - A_CTR[0][1]) / A_M.h), stroke: pct(A_M.stroke / A_M.h) };

// ---------------- defs ----------------
sh.defs.push(
  `<filter id="grain" x="0" y="0" width="100%" height="100%"><feTurbulence type="fractalNoise" baseFrequency=".85" numOctaves="3" seed="11"/><feColorMatrix values="0 0 0 0 .16  0 0 0 0 .14  0 0 0 0 .12  0 0 0 -1.7 1.05"/></filter>`,
  `<filter id="scuff" x="0" y="0" width="100%" height="100%"><feTurbulence type="fractalNoise" baseFrequency=".012 .03" numOctaves="4" seed="5"/><feColorMatrix values="0 0 0 0 .35  0 0 0 0 .31  0 0 0 0 .27  0 0 0 -2.6 1.25"/></filter>`,
  `<radialGradient id="vignette" cx=".5" cy=".5" r=".75"><stop offset=".62" stop-color="#3A3836" stop-opacity="0"/><stop offset="1" stop-color="#3A3836" stop-opacity=".28"/></radialGradient>`,
  `<pattern id="stone" width="22" height="22" patternUnits="userSpaceOnUse"><rect width="22" height="22" fill="#D7D2CA"/><circle cx="4" cy="5" r="1.3" fill="#A9A39A"/><circle cx="15" cy="9" r=".9" fill="#B9B3AA"/><circle cx="9" cy="17" r="1.6" fill="#BDB7AE"/><circle cx="19" cy="19" r=".8" fill="#9F998F"/><path d="M2 12 q4 -2 7 1 M13 2 q3 2 6 0" stroke="#EFECE6" stroke-width="1.2" fill="none"/></pattern>`,
  `<pattern id="grid" width="13" height="13" patternUnits="userSpaceOnUse"><path d="M13 0H0V13" fill="none" stroke="${C.violet}" stroke-width=".7" opacity=".35"/></pattern>`,
  `<linearGradient id="wild" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="#F59BE6"/><stop offset=".45" stop-color="${C.pink}"/><stop offset="1" stop-color="${C.violet}"/></linearGradient>`,
  `<linearGradient id="silver" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#FBFAF7"/><stop offset=".55" stop-color="#E4E0D9"/><stop offset="1" stop-color="#C9C3BA"/></linearGradient>`,
  `<linearGradient id="can" x1="0" y1="0" x2="1" y2="0"><stop offset="0" stop-color="#6E6A66"/><stop offset=".35" stop-color="#D8D5D0"/><stop offset="1" stop-color="#55514D"/></linearGradient>`,
);

// ---------------- paper, distress ----------------
sh.add('paper', `<rect width="${W}" height="${H}" fill="${C.paper}"/>`);
sh.add('paper', `<rect width="${W}" height="${H}" filter="url(#grain)" opacity=".32"/>`);
sh.add('distress', `<rect width="${W}" height="${H}" filter="url(#scuff)" opacity=".38"/><rect width="${W}" height="${H}" fill="url(#vignette)"/>`);
for (let i = 0; i < 4; i++) sh.add('distress', `<path d="${roughRectPath(sh, 3 + i * 2.5, 3 + i * 2.5, W - 6 - i * 5, H - 6 - i * 5, 3.5, 24)}" fill="none" stroke="${C.graphite}" stroke-width="${f(2.6 - i * 0.5)}" opacity="${f(0.45 - i * 0.09)}"/>`);
for (const [x, y, r] of [[610, 480, 26], [1200, 770, 22], [1108, 156, 18], [560, 1100, 20]]) sh.add('distress', `<path d="${blob(sh, x, y, r, 0.3, 12)}" fill="#8A7B66" opacity=".12"/>`);

// ---------------- header ----------------
text(sh, 34, 80, 'NIGHTSHIFT', { font: 'pm', size: 66, fill: C.violet, layer: 'under', extra: ' data-qa="shadow" aria-hidden="true"' });
text(sh, 30, 76, 'NIGHTSHIFT', { font: 'pm', size: 66, panel: 'header' });
crown(sh, 382, 14, 40);
highlight(sh, 34, 88, textWidth('LETTER CONSTRUCTION ACADEMY', 'pm', 23) + 8, 32, 'under');
text(sh, 40, 113, 'LETTER CONSTRUCTION ACADEMY', { font: 'pm', size: 23, panel: 'header' });
{
  const s = 'Buchstabenlehre · Konstruktion · Graffiti · Styleentwicklung', w = textWidth(s, 'k7', 15.5);
  sh.add('frames', `<path d="${poly([[30, 124], [44 + w, 122], [48 + w, 146], [33, 148]])}" fill="${C.ink}"/>`);
  text(sh, 40, 141, s, { font: 'k7', size: 15.5, fill: C.white, panel: 'header' });
}
// title box
sh.add('frames', `<path d="${roughRectPath(sh, 510, 12, 610, 130, 1.8)}" fill="${C.white}" stroke="${C.ink}" stroke-width="3.6" stroke-linejoin="round"/>`);
const tW = text(sh, 532, 88, 'BUCHSTABENSTUDIE:', { font: 'pm', size: 50, panel: 'header' });
highlight(sh, 548 + tW, 22, 70, 82, 'frames');
text(sh, 583 + tW, 94, 'A', { font: 'pm', size: 84, anchor: 'middle', panel: 'header' });
text(sh, 815, 128, 'Konstruktion · Anatomie · Proportion · Kalligrafie · Graffiti · Variation', { font: 'k4', size: 16, anchor: 'middle', panel: 'header' });
// reference box
sh.add('frames', `<path d="${roughRectPath(sh, 1150, 22, 514, 92, 1.5)}" fill="${C.white}" stroke="${C.ink}" stroke-width="3" stroke-linejoin="round"/>`);
check(sh, 1166, 84, 38);
text(sh, 1218, 58, 'Referenz: Master Control Prompt 01 (v1.2)', { font: 'k7', size: 17, panel: 'header' });
text(sh, 1218, 86, 'Einheitlicher Standard für A–Z, a–z und 0–9', { font: 'k4', size: 16, panel: 'header' });
text(sh, 1218, 106, 'Visuelle Vorlage: Owner-Referenz A (16.11.2026)', { font: 'k4', size: 13.5, fill: C.graphite, panel: 'header' });

// ---------------- layout ----------------
const R1 = { y: 156, h: 320 }, R2 = { y: 484, h: 280 }, R3 = { y: 772, h: 322 };
const COL1 = [[16, 540], [564, 540], [1112, 552]], COL23 = [[16, 592], [616, 580], [1204, 460]];
const box = (n) => { const r = n <= 3 ? R1 : n <= 6 ? R2 : R3, [x, w] = (n <= 3 ? COL1 : COL23)[(n - 1) % 3]; return { x, y: r.y, w, h: r.h }; };

// ---------------- 1 Grundform ----------------
{
  const c = panel(sh, { n: 1, ...box(1), title: 'GRUNDFORM', sub: 'Das neutrale A' });
  const s = 1.3, ax = c.x + 30, ay = c.y + 24, aw = A_M.w * s, ah = A_M.h * s;
  const k = (d) => `stroke="${C.violet}" stroke-width="${d}" fill="none"`;
  sh.add('under', `<rect x="${f(ax - 14)}" y="${f(ay - 14)}" width="${f(aw + 28)}" height="${f(ah + 28)}" fill="url(#grid)" opacity=".8"/>`);
  sh.add('construction', `<g><path d="M${f(ax - 22)} ${f(ay)} H${f(ax + aw + 22)} M${f(ax - 22)} ${f(ay + ah)} H${f(ax + aw + 22)} M${f(ax)} ${f(ay - 20)} V${f(ay + ah + 20)} M${f(ax + aw)} ${f(ay - 20)} V${f(ay + ah + 20)}" ${k(1.6)}/>`
    + `<path d="M${f(ax + 64 * s)} ${f(ay - 20)} V${f(ay + ah + 20)}" ${k(1.4)} stroke-dasharray="6 5"/>`
    + `<path d="M${f(ax - 22)} ${f(ay + A_M.barTop * s)} H${f(ax + aw + 22)}" ${k(1.4)} stroke-dasharray="3 5"/>`
    + [[ax, ay], [ax + aw, ay], [ax, ay + ah], [ax + aw, ay + ah]].map(([x, y]) => `<path d="M${f(x - 7)} ${f(y - 7)} L${f(x + 7)} ${f(y + 7)} M${f(x + 7)} ${f(y - 7)} L${f(x - 7)} ${f(y + 7)}" ${k(2.2)}/>`).join('') + '</g>');
  sh.add('letters', `<path d="${aPath(ax, ay, s)}" fill="${C.white}" fill-rule="evenodd" stroke="${C.ink}" stroke-width="5" stroke-linejoin="round"/>`);
  const tx = c.x + 236, tw = c.w - 236;
  let y = c.y + 24;
  for (const l of wrap('Neutrale Grundkonstruktion des A: klare Form ohne Stileffekte.', 'k7', 16.5, tw)) { text(sh, tx, y, l, { font: 'k7', size: 16.5, panel: c.id }); y += 21; }
  y += 8;
  for (const item of ['Scheitel (Spitze), hier flach abgeschnitten', 'zwei Schrägschenkel', 'Querbalken verbindet die Schenkel', 'geschlossene Punze über dem Balken', 'offener Raum zwischen den Füßen']) {
    check(sh, tx, y + 1, 18);
    for (const [i, l] of wrap(item, 'k4', 15.5, tw - 28).entries()) text(sh, tx + 28, y + i * 19, l, { size: 15.5, panel: c.id });
    y += wrap(item, 'k4', 15.5, tw - 28).length * 19 + 6;
  }
  text(sh, ax + aw / 2, ay + ah + 36, 'dünne violette Linien: Konstruktion', { size: 14, fill: C.violet, anchor: 'middle', panel: c.id });
}

// ---------------- 2 Buchstabenanatomie ----------------
{
  const c = panel(sh, { n: 2, ...box(2), title: 'BUCHSTABENANATOMIE', sub: 'Die Bauteile' });
  const s = 1.36, aw = A_M.w * s, ah = A_M.h * s, ax = c.x + c.w / 2 - aw / 2, ay = c.y + c.h - ah - 14;
  const P = ([x, y]) => [ax + x * s, ay + y * s];
  // yellow burst
  const cx = ax + aw / 2, cy = ay + ah * 0.58, burst = [];
  for (let i = 0; i < 28; i++) { const a = (i / 28) * Math.PI * 2, r = i % 2 ? 78 + sh.r() * 14 : 112 + sh.r() * 26; burst.push([cx + Math.cos(a) * r * 1.15, cy + Math.sin(a) * r * 0.86]); }
  sh.add('under', `<path d="${poly(burst)}" fill="${C.yellow}"/>`);
  sh.add('letters', `<path id="anatomy-a" d="${aPath(ax, ay, s)}" fill="url(#stone)" fill-rule="evenodd" stroke="${C.ink}" stroke-width="6" stroke-linejoin="round"/>`);
  const L = (lines, [bx, by], target, expect, bend = 0) => {
    const b = labelBox(sh, bx, by, lines, { size: 15.5, panel: c.id });
    // leave the box on the side that faces the target
    const t = P(target);
    const from = t[1] < b.y ? [Math.max(b.x, Math.min(b.x + b.w, t[0])), b.y] : t[1] > b.y + b.h ? [Math.max(b.x, Math.min(b.x + b.w, t[0])), b.y + b.h] : [t[0] < b.x ? b.x : b.x + b.w, by];
    arrow(sh, from, t, { bend, attrs: ` data-target="${f(t[0])},${f(t[1])}" data-expect="${expect}"` });
  };
  const legMid = (y, side) => { const outer = side === 'l' ? 50 - (50 * y) / 140 : 78 + (50 * y) / 140, inner = side === 'l' ? 30 + (50 * (140 - y)) / 140 : 98 - (50 * (140 - y)) / 140; return [(outer + inner) / 2, y]; };
  L(['Scheitel', '(Spitze)'], [c.x + 74, c.y + 26], [64, 1.5], 'fill', -18);
  L(['Punze', '(Innenraum)'], [c.x + c.w - 78, c.y + 26], [64, 74], 'counter', 22);
  L(['Schenkel', 'links'], [c.x + 62, c.y + 118], legMid(78, 'l'), 'fill', 0);
  L(['Schenkel', 'rechts'], [c.x + c.w - 62, c.y + 118], legMid(78, 'r'), 'fill', 0);
  L(['Querbalken'], [c.x + 70, c.y + 206], [52, 98], 'fill', 14);
  L(['Fuß', '(Endung)'], [c.x + c.w - 62, c.y + 206], [113, 136], 'fill', -10);
}

// ---------------- 3 Proportionen & Raster ----------------
{
  const c = panel(sh, { n: 3, ...box(3), title: 'PROPORTIONEN & RASTER' });
  const s = 1.1, aw = A_M.w * s, ah = A_M.h * s, ax = c.x + 60, ay = c.y + 30;
  sh.add('under', `<rect x="${f(ax - 26)}" y="${f(ay - 10)}" width="${f(aw + 52)}" height="${f(ah + 20)}" fill="url(#grid)"/>`);
  sh.add('letters', `<path d="${aPath(ax, ay, s)}" fill="${C.white}" fill-rule="evenodd" stroke="${C.ink}" stroke-width="4.5" stroke-linejoin="round"/>`);
  const v = `stroke="${C.violet}" stroke-width="2" fill="none"`;
  const yBar = ay + A_M.barTop * s, yBase = ay + ah;
  sh.add('construction', `<g><path d="M${f(ax - 34)} ${f(ay)} H${f(ax + aw + 10)} M${f(ax - 34)} ${f(yBase)} H${f(ax + aw + 10)}" ${v}/>`
    + `<path d="M${f(ax - 30)} ${f(yBar)} H${f(ax + aw + 10)}" stroke="${C.ink}" stroke-width="2" stroke-dasharray="7 5"/>`
    + `<path d="M${f(ax - 20)} ${f(ay + 6)} V${f(yBase - 6)}" ${v}/><path d="M${f(ax - 26)} ${f(ay)} h12 M${f(ax - 26)} ${f(yBase)} h12" ${v}/>`
    + `<path d="M${f(ax + 6)} ${f(yBase + 22)} H${f(ax + aw - 6)} M${f(ax)} ${f(yBase + 15)} v14 M${f(ax + aw)} ${f(yBase + 15)} v14" ${v}/></g>`);
  arrow(sh, [ax - 20, ay + ah / 2], [ax - 20, ay + 2], { head: 8, width: 2 }); arrow(sh, [ax - 20, ay + ah / 2], [ax - 20, yBase - 2], { head: 8, width: 2 });
  arrow(sh, [ax + aw / 2, yBase + 22], [ax + 2, yBase + 22], { head: 8, width: 2 }); arrow(sh, [ax + aw / 2, yBase + 22], [ax + aw - 2, yBase + 22], { head: 8, width: 2 });
  text(sh, ax - 50, ay + ah / 2 - 4, 'H', { font: 'pm', size: 20, anchor: 'middle', panel: c.id });
  text(sh, ax - 50, ay + ah / 2 + 16, '100 %', { font: 'k7', size: 14, anchor: 'middle', panel: c.id });
  text(sh, ax + aw / 2, yBase + 44, `B = ca. ${EX.width} % von H`, { font: 'k7', size: 15, anchor: 'middle', panel: c.id });
  text(sh, ax + aw + 14, ay + 5, 'Versalhöhe', { size: 13.5, fill: C.violet, panel: c.id });
  text(sh, ax + aw + 14, yBar + 5, 'Querbalken', { size: 13.5, panel: c.id });
  text(sh, ax + aw + 14, yBase + 5, 'Grundlinie', { size: 13.5, fill: C.violet, panel: c.id });
  const tx = c.x + 296, tw = c.w - 296;
  let y = c.y + 18;
  for (const l of wrap('Beispielwerte dieser Zeichnung:', 'k7', 17, tw)) { text(sh, tx, y, l, { font: 'k7', size: 17, panel: c.id }); y += 22; }
  for (const item of ['Höhe H = 100 %', `Breite B = ca. ${EX.width} %`, `Querbalken: Oberkante ca. ${EX.barTop} % über Grundlinie`, `Punze dreieckig, ca. ${EX.counter} % hoch`, `Schenkelstärke ca. ${EX.stroke} %`]) {
    const ls = wrap(item, 'k4', 15, tw - 16);
    sh.add('labels', `<circle cx="${f(tx + 4)}" cy="${f(y - 5)}" r="3" fill="${C.ink}"/>`);
    ls.forEach((l, i) => text(sh, tx + 14, y + i * 18.5, l, { size: 15, panel: c.id }));
    y += ls.length * 18.5 + 3;
  }
  y += 6;
  for (const l of wrap('Keine festen Regeln: Breite, Querbalken und Punze sind Gestaltungsentscheidungen.', 'k7', 14.5, tw)) { text(sh, tx, y, l, { font: 'k7', size: 14.5, fill: C.violet, panel: c.id }); y += 18; }
  y += 4;
  for (const l of wrap('Versalien haben keine x-Höhe.', 'k4', 14, tw)) { text(sh, tx, y, l, { size: 14, fill: C.graphite, panel: c.id }); y += 17.5; }
}

// ---------------- 4 Konstruktionsanalyse ----------------
{
  const c = panel(sh, { n: 4, ...box(4), title: 'KONSTRUKTIONSANALYSE', sub: 'Schritt für Schritt' });
  const s = 0.74, step = (c.w - 20) / 5;
  const labels = [['Skelett', '(Mittellinien)'], ['Strichkörper', 'anlegen'], ['Querbalken', 'einfügen'], ['Kontur', 'schließen'], ['Grundform', 'füllen']];
  const vio = (o) => `fill="${C.violet}" fill-opacity="${o}" stroke="${C.violet}" stroke-width="1.6" stroke-linejoin="round"`;
  for (let i = 0; i < 5; i++) {
    const ax = c.x + 10 + i * step + (step - A_M.w * s) / 2, ay = c.y + 6;
    const S = (seg) => tf(seg, ax, ay, s);
    const skel = (dash = '') => `<path d="M${pts(S(A_SKEL.left)).replace(' ', ' L')} L${f(S(A_SKEL.right)[1][0])} ${f(S(A_SKEL.right)[1][1])}${i >= 2 || dash ? ` M${pts(S(A_SKEL.bar)).replace(' ', ' L')}` : ''}" fill="none" stroke="${C.violet}" stroke-width="2.4" stroke-linecap="round"${dash}/>`;
    if (i === 0) {
      sh.add('construction', `<g>${skel()}<path d="M${pts(S(A_SKEL.bar)).replace(' ', ' L')}" fill="none" stroke="${C.violet}" stroke-width="2.4" stroke-dasharray="4 4"/>`
        + [...S(A_SKEL.left), S(A_SKEL.right)[1], ...S(A_SKEL.bar)].map(([x, y]) => `<circle cx="${f(x)}" cy="${f(y)}" r="3.4" fill="${C.violet}"/>`).join('') + '</g>');
    } else if (i <= 2) {
      const legs = [ribbon(S(A_SKEL.left), A_M.stroke * s), ribbon(S(A_SKEL.right), A_M.stroke * s)];
      if (i === 2) legs.push(ribbon(S(A_SKEL.bar), 20 * s));
      sh.add('letters', legs.map((p) => `<path d="${poly(p)}" ${vio(0.28)}/>`).join(''));
      sh.add('construction', skel());
    } else if (i === 3) {
      sh.add('letters', `<path d="${aPath(ax, ay, s)}" fill="${C.white}" fill-rule="evenodd" stroke="${C.ink}" stroke-width="3" stroke-linejoin="round"/>`);
      sh.add('construction', skel(' stroke-dasharray="3 4" opacity=".55"'));
    } else sh.add('letters', `<path d="${aPath(ax, ay, s)}" fill="${C.ink}" fill-rule="evenodd"/>`);
    const bx = c.x + 10 + i * step + step / 2;
    sh.add('frames', `<path d="${blob(sh, bx, c.y + 142, 14, 0.06)}" fill="${C.yellow}" stroke="${C.ink}" stroke-width="2"/>`);
    text(sh, bx, c.y + 150, String(i + 1), { font: 'pm', size: 19, anchor: 'middle', panel: c.id });
    labels[i].forEach((l, j) => text(sh, bx, c.y + 178 + j * 18, l, { font: j ? 'k4' : 'k7', size: 15, anchor: 'middle', panel: c.id }));
    if (i < 4) arrow(sh, [c.x + 10 + (i + 1) * step - 13, c.y + 62], [c.x + 10 + (i + 1) * step + 9, c.y + 62], { color: C.ink, width: 2.6, head: 9 });
  }
}

// ---------------- variant letter constructions (shared by panels 5, 6) ----------------
const V = {
  classic: () => ({ parts: [{ poly: A_OUT }], counters: [{ poly: A_CTR }], box: [128, 140] }),
  block: () => ({ parts: [{ poly: [[0, 140], [44, 0], [100, 0], [144, 140], [100, 140], [92, 112], [52, 112], [44, 140]] }], counters: [{ poly: [[63, 80], [81, 80], [72, 44]] }], box: [144, 140] }),
  slant: () => { const k = (p) => p.map(([x, y]) => [x + (140 - y) * 0.2, y]); const o = k(A_OUT); o[2] = [o[2][0] + 16, o[2][1]]; o[3] = [o[3][0] + 6, o[3][1]]; return { parts: [{ poly: o }], counters: [{ poly: k(A_CTR) }], box: [172, 140] }; },
  broken: () => ({ parts: [{ poly: ribbon([[10, 138], [52, 2]], 26, { start: 'cut', end: 'cut' }) }, { poly: ribbon([[64, 20], [120, 138]], 26, { start: 'cutr', end: 'cutr' }) }, { poly: ribbon([[26, 104], [104, 92]], 17, { end: 'cut' }) }], box: [134, 140] }),
  round: () => ({ parts: [{ stroke: 'M18 128 C18 50 40 12 64 12 C88 12 110 50 110 128', w: 28 }, { stroke: 'M36 92 L92 92', w: 18 }], box: [128, 140] }),
  narrow: () => ({ parts: [{ poly: A_OUT.map(([x, y]) => [x * 0.55, y]) }], counters: [{ poly: A_CTR.map(([x, y]) => [x * 0.55, y]) }], box: [70, 140] }),
  wide: () => ({ parts: [{ poly: A_OUT.map(([x, y]) => [x * 1.5, y]) }], counters: [{ poly: A_CTR.map(([x, y]) => [x * 1.5, y]) }], box: [192, 140] }),
};
const placeV = (spec, cx, top, height, opts = {}) => {
  const s = Math.min(height / spec.box[1], (opts.maxW ?? Infinity) / spec.box[0]), x = cx - (spec.box[0] * s) / 2;
  top += height - spec.box[1] * s; // bottom-align on a shared baseline
  const T = (p) => p.map(([a, b]) => [x + a * s, top + b * s]);
  graffiti(sh, {
    parts: spec.parts.map((p) => (p.poly ? { poly: T(p.poly) } : { stroke: p.stroke.replace(/(-?\d+\.?\d*) (-?\d+\.?\d*)/g, (_, a, b) => `${f(x + a * s)} ${f(top + b * s)}`), w: p.w * s })),
    counters: (spec.counters ?? []).map((cc) => ({ poly: T(cc.poly) })), fill: opts.fill ?? C.white, ow: opts.ow ?? 3.2, extrude: opts.extrude ?? { dx: 4, dy: 5, steps: 4, color: C.ink },
  });
};

// ---------------- 5 Formvariationen ----------------
{
  const c = panel(sh, { n: 5, ...box(5), title: 'FORMVARIATIONEN', sub: 'Fünf Konstruktionen' });
  const items = [
    ['classic', ['Klassisch', '(neutral)'], 'gekappter Scheitel, gleiche Schenkel'],
    ['block', ['Blockig', '(massiv)'], 'breiter, flacher Scheitel, kleine Punze'],
    ['slant', ['Geneigt', '(dynamisch)'], 'Schräglage, langer rechter Fuß'],
    ['broken', ['Gebrochen', '(kantig)'], 'versetzter Scheitel, schräger Balken'],
    ['round', ['Rund', '(organisch)'], 'gewölbter Scheitel, runde Enden'],
  ];
  const step = c.w / 5;
  items.forEach(([k, lab, note], i) => {
    const cx = c.x + step * i + step / 2;
    placeV(V[k](), cx, c.y + 8, 96, { ow: 3.4, maxW: step - 16 });
    tag(sh, cx, c.y + 136, lab, { size: 15, panel: c.id });
    wrap(note, 'k4', 13.5, step - 12).forEach((l, j) => text(sh, cx, c.y + 178 + j * 16, l, { size: 13.5, anchor: 'middle', fill: C.graphite, panel: c.id }));
  });
}

// ---------------- 6 Formcharakter ----------------
{
  const c = panel(sh, { n: 6, ...box(6), title: 'FORMCHARAKTER', sub: 'Wirkung' });
  const pairs = [['classic', 'Geometrisch', 'round', 'Organisch'], ['narrow', 'Schmal', 'wide', 'Breit'], ['block', 'Statisch', 'slant', 'Dynamisch']];
  const step = c.w / 3;
  pairs.forEach(([k1, l1, k2, l2], i) => {
    const cx = c.x + step * i + step / 2;
    placeV(V[k1](), cx, c.y + 2, 50, { ow: 2.6, extrude: { dx: 3, dy: 3, steps: 3, color: C.ink } });
    tag(sh, cx, c.y + 74, [l1], { size: 14.5, panel: c.id });
    sh.add('construction', `<g><path d="M${f(cx)} ${f(c.y + 84)} V${f(c.y + 98)}" stroke="${C.violet}" stroke-width="2.2"/><path d="M${f(cx - 5)} ${f(c.y + 88)} L${f(cx)} ${f(c.y + 82)} L${f(cx + 5)} ${f(c.y + 88)} M${f(cx - 5)} ${f(c.y + 94)} L${f(cx)} ${f(c.y + 100)} L${f(cx + 5)} ${f(c.y + 94)}" fill="none" stroke="${C.violet}" stroke-width="2.2" stroke-linejoin="round"/></g>`);
    placeV(V[k2](), cx, c.y + 106, 50, { ow: 2.6, extrude: { dx: 3, dy: 3, steps: 3, color: C.ink } });
    tag(sh, cx, c.y + 178, [l2], { size: 14.5, panel: c.id });
  });
  text(sh, c.x + c.w / 2, c.y + c.h - 4, 'Gegensatzpaare beschreiben Wirkung, keine festen Stilkategorien.', { size: 13.5, anchor: 'middle', fill: C.graphite, panel: c.id });
}

// ---------------- 7 Kalligrafie & Duktus ----------------
{
  const c = panel(sh, { n: 7, ...box(7), title: 'KALLIGRAFIE & DUKTUS', sub: 'Werkzeug und Strich' });
  const SK = { l: [[30, 0], [4, 66]], r: [[30, 0], [56, 66]], b: [[13, 44], [47, 44]] };
  const T = (p, x, y, sk = 0) => p.map(([a, b]) => [x + a + (66 - b) * sk, y + b]);
  const nib = (x, y, sk) => {
    const n = [7.6 / 2, -5.3 / 2];
    return Object.values(SK).map((seg) => { const [p, q] = T(seg, x, y, sk); return `<path d="${poly([[p[0] - n[0], p[1] - n[1]], [q[0] - n[0], q[1] - n[1]], [q[0] + n[0], q[1] + n[1]], [p[0] + n[0], p[1] + n[1]]])}" fill="${C.ink}"/>`; }).join('');
  };
  const brush = (x, y, sk) => Object.values(SK).map((seg) => {
    const [p, q] = T(seg, x, y, sk), d = [q[0] - p[0], q[1] - p[1]], L = Math.hypot(...d), nn = [-d[1] / L, d[0] / L], left = [], right = [];
    for (let i = 0; i <= 14; i++) { const t = i / 14, w = 0.8 + 4.6 * Math.sin(Math.PI * Math.min(1, t * 1.1)) ** 0.7, m = [p[0] + d[0] * t, p[1] + d[1] * t]; left.push([m[0] + nn[0] * w, m[1] + nn[1] * w]); right.push([m[0] - nn[0] * w, m[1] - nn[1] * w]); }
    return `<path d="${poly([...left, ...right.reverse()])}" fill="${C.ink}"/>`;
  }).join('');
  const marker = (x, y, sk) => Object.values(SK).map((seg) => { const [p, q] = T(seg, x, y, sk); return `<path d="M${f(p[0])} ${f(p[1])} L${f(q[0])} ${f(q[1])}" stroke="${C.ink}" stroke-width="5.5" stroke-linecap="round"/>`; }).join('');
  const icons = {
    nib: `<path d="M0 0 L16 0 L19 30 L8 46 L-3 30 Z" fill="#C9C4BB" stroke="${C.ink}" stroke-width="2.4" stroke-linejoin="round"/><path d="M8 46 V22" stroke="${C.ink}" stroke-width="2"/><circle cx="8" cy="20" r="3" fill="${C.ink}"/><rect x="-1" y="-22" width="18" height="22" fill="${C.graphite}" stroke="${C.ink}" stroke-width="2"/>`,
    brush: `<rect x="3" y="-26" width="9" height="34" rx="3" fill="${C.graphite}" stroke="${C.ink}" stroke-width="2"/><rect x="1" y="8" width="13" height="10" fill="#C9C4BB" stroke="${C.ink}" stroke-width="2"/><path d="M1 18 Q-2 34 7.5 48 Q17 34 14 18 Z" fill="${C.ink}"/>`,
    marker: `<rect x="0" y="-22" width="18" height="44" rx="4" fill="#C9C4BB" stroke="${C.ink}" stroke-width="2.4"/><rect x="0" y="-22" width="18" height="12" rx="3" fill="${C.ink}"/><path d="M3 22 L15 22 L13 36 L5 40 Z" fill="${C.graphite}" stroke="${C.ink}" stroke-width="2"/>`,
  };
  const rows = [['nib', ['Breitfeder', '(Bandzug)'], nib], ['brush', ['Pinsel', '(Brush)'], brush], ['marker', ['Marker', '(Filzstift)'], marker]];
  rows.forEach(([ic, lab, draw], i) => {
    const y = c.y + 2 + i * 72;
    sh.add('letters', `<g transform="translate(${f(c.x + 14)} ${f(y + 22)}) rotate(-28)">${icons[ic]}</g>`);
    tag(sh, c.x + 98, y + 30, lab, { size: 14.5, panel: c.id });
    sh.add('letters', draw(c.x + 152, y + 2, 0));
    arrow(sh, [c.x + 222, y + 36], [c.x + 246, y + 36], { color: C.violet, width: 2.4, head: 8 });
    sh.add('letters', draw(c.x + 262, y + 2, i === 2 ? 0 : 0.22));
  });
  // marker row, second A: one possible stroke sequence, marked as an assumption
  {
    const y = c.y + 2 + 2 * 72, x = c.x + 262;
    const seq = [[[26, 2], [4, 60]], [[34, 2], [56, 60]], [[13, 38], [47, 38]]];
    seq.forEach(([p, q], j) => {
      const o = [x + p[0] + (j === 2 ? 0 : (j ? 10 : -10)), y + 2 + p[1] + (j === 2 ? -10 : 0)], e = [x + q[0] + (j === 2 ? 0 : (j ? 10 : -10)), y + 2 + q[1] + (j === 2 ? -10 : 0)];
      arrow(sh, o, e, { color: C.violet, width: 1.8, head: 7, attrs: ' data-qa="sequence"' });
      sh.add('construction', `<circle cx="${f(o[0])}" cy="${f(o[1])}" r="7" fill="${C.white}" stroke="${C.violet}" stroke-width="1.6"/>`);
      text(sh, o[0], o[1] + 4.5, String(j + 1), { font: 'k7', size: 11, anchor: 'middle', fill: C.violet, panel: c.id, layer: 'construction' });
    });
  }
  text(sh, c.x + 4, c.y + c.h - 2, 'Ziffern: eine mögliche Strichfolge (Annahme).', { size: 13.5, fill: C.violet, panel: c.id });
  const tx = c.x + 350, tw = c.w - 350;
  let y = c.y + 14;
  text(sh, tx, y, 'Hinweise zum Duktus:', { font: 'k7', size: 16.5, panel: c.id }); y += 22;
  for (const item of [
    'Breitfeder: Strichstärke wechselt mit der Strichrichtung.',
    'Pinsel: Druck verändert die Breite, Enden laufen spitz aus.',
    'Marker: weitgehend gleiche Strichstärke.',
    'Strichfolge, Druck und Tempo sind am fertigen A nicht ablesbar.',
    'Feder und Pinsel lassen sich nicht direkt auf die Sprühdose übertragen.',
  ]) {
    const ls = wrap(item, 'k4', 14, tw - 14);
    sh.add('labels', `<circle cx="${f(tx + 4)}" cy="${f(y - 5)}" r="2.8" fill="${C.ink}"/>`);
    ls.forEach((l, i) => text(sh, tx + 13, y + i * 17, l, { size: 14, panel: c.id }));
    y += ls.length * 17 + 5;
  }
}

// ---------------- 8 Graffiti-Transfer ----------------
{
  const c = panel(sh, { n: 8, ...box(8), title: 'GRAFFITI-TRANSFER', sub: 'Drei eigene Richtungen' });
  const cols = [c.x + 92, c.x + c.w / 2, c.x + c.w - 96], top = c.y + 8, lh = 156;
  // backgrounds
  splat(sh, cols[0], top + 84, 62, C.violet, { dots: 16, drips: 3, layer: 'under', opacity: 0.55 });
  splat(sh, cols[1], top + 80, 58, C.yellow, { dots: 14, layer: 'under', opacity: 0.9 });
  splat(sh, cols[2], top + 92, 64, C.pink, { dots: 16, layer: 'under', opacity: 0.55 });
  // throw-up direction: inflated, rounded mass (local 200 × 190)
  {
    const s = (lh * 0.92) / 190, x = cols[0] - 100 * s, y = top;
    sh.defs.push(`<linearGradient id="silverU" gradientUnits="userSpaceOnUse" x1="0" y1="${f(y)}" x2="0" y2="${f(y + lh)}"><stop offset="0" stop-color="#FBFAF7"/><stop offset=".55" stop-color="#E4E0D9"/><stop offset="1" stop-color="#C2BCB2"/></linearGradient>`);
    const P = (d) => d.replace(/(-?\d+\.?\d*) (-?\d+\.?\d*)/g, (_, a, b) => `${f(x + a * s)} ${f(y + b * s)}`);
    graffiti(sh, {
      parts: [
        { stroke: P('M42 162 Q50 74 100 40'), w: 56 * s }, { stroke: P('M100 40 Q150 74 158 162'), w: 56 * s }, { stroke: P('M62 122 L138 122'), w: 42 * s },
        { stroke: P('M40 164 L40.1 164'), w: 70 * s }, { stroke: P('M160 164 L160.1 164'), w: 70 * s }, { stroke: P('M100 40 L100.1 40'), w: 74 * s },
      ],
      counters: [{ poly: [[100, 74], [113, 98], [87, 98]].map(([a, b]) => [x + a * s, y + b * s]), fill: C.violetDark }],
      fill: 'url(#silverU)', ow: 6.5, extrude: { dx: 7, dy: 7, steps: 6, color: C.ink },
      shine: [P('M66 120 Q70 82 92 58'), P('M28 156 Q30 146 36 140'), P('M150 150 L152 160')],
    });
  }
  // block-style direction: flat apex, solid strokes, 3D extrusion (local 180 × 180)
  {
    const s = (lh - 8) / 180, x = cols[1] - 90 * s - 6, y = top, T = (p) => p.map(([a, b]) => [x + a * s, y + b * s]);
    graffiti(sh, {
      parts: [{ poly: T([[0, 180], [52, 0], [128, 0], [180, 180], [122, 180], [112, 142], [68, 142], [58, 180]]) }],
      counters: [{ poly: T([[78, 104], [102, 104], [90, 58]]), fill: C.ink }],
      fill: C.white, ow: 5.5, extrude: { dx: 15, dy: 11, steps: 12, color: C.violetDark },
      inline: [`M${pts(T([[10, 170], [56, 12]])).replace(' ', ' L')}`, `M${pts(T([[60, 10], [120, 10]])).replace(' ', ' L')}`],
    });
    sh.add('letters', `<path d="${poly(T([[12, 168], [20, 168], [62, 18], [56, 16]]))}" fill="${C.yellow}"/><path d="${poly(T([[62, 10], [118, 10], [116, 18], [64, 18]]))}" fill="${C.yellow}"/>`);
  }
  // piece / Wildstyle direction: interlocking parts, arrows, split apex (local 240 × 210)
  {
    const s = (lh + 4) / 210, x = cols[2] - 116 * s, y = top - 2, T = (p) => p.map(([a, b]) => [x + a * s, y + b * s]);
    graffiti(sh, {
      parts: [
        { poly: T(ribbon([[24, 200], [70, 98], [104, 28]], 34, { start: 'cut', end: 'flat' })) },
        { poly: T(ribbon([[96, 44], [122, 8]], 26, { end: 'arrow', arrowW: 2, arrowL: 1.3 })) },
        { poly: T(ribbon([[112, 26], [150, 112], [172, 168]], 34, { end: 'flat' })) },
        { poly: T(ribbon([[162, 168], [196, 206]], 30, { end: 'cut' })) },
        { poly: T(ribbon([[52, 140], [146, 132], [222, 120]], 22, { start: 'cut', end: 'arrow', arrowW: 2.2, arrowL: 1.4 })) },
        { poly: T(ribbon([[30, 196], [-6, 184]], 22, { end: 'arrow', arrowW: 2, arrowL: 1.2 })) },
        { poly: T(ribbon([[38, 72], [56, 40]], 16, { end: 'arrow', arrowW: 2.2, arrowL: 1.3 })) },
      ],
      counters: [{ poly: T([[96, 66], [116, 112], [78, 116]]), fill: C.violetDark }],
      fill: 'url(#wild)', ow: 5, extrude: { dx: 5, dy: 6, steps: 5, color: C.ink },
      shine: [`M${pts(T([[34, 186], [72, 104]])).replace(' ', ' L')}`, `M${pts(T([[124, 40], [150, 100]])).replace(' ', ' L')}`],
    });
    sh.add('letters', `<path d="${poly(T([[60, 136], [140, 129], [140, 133], [60, 140]]))}" fill="${C.yellow}"/>`);
    crown(sh, x + 168 * s, y - 2, 38);
  }
  const labels = [['THROW-UP', 'Richtung: kompakt, gerundet'], ['BLOCK-STYLE', 'klar, massiv, gut lesbar'], ['WILDSTYLE', 'verbunden, gerichtet, komplex']];
  labels.forEach(([t, d], i) => {
    highlight(sh, cols[i] - textWidth(t, 'pm', 17) / 2, top + lh + 15, textWidth(t, 'pm', 17), 24);
    text(sh, cols[i], top + lh + 34, t, { font: 'pm', size: 17, anchor: 'middle', panel: c.id });
    text(sh, cols[i], top + lh + 54, d, { size: 14, anchor: 'middle', panel: c.id });
  });
  text(sh, c.x + c.w / 2, c.y + c.h - 2, 'Drei gleichwertige Richtungen, keine Stufenfolge. Erst die Form, dann die Effekte.', { font: 'k7', size: 13.5, anchor: 'middle', fill: C.violet, panel: c.id });
}

// ---------------- 9 Lernkontrolle ----------------
{
  const c = panel(sh, { n: 9, ...box(9), title: 'LERNKONTROLLE', sub: 'Aufgaben' });
  const tasks = [
    ['Konstruktion:', 'Zeichne das neutrale A im Raster nach. Höhe 100 %, Breite frei wählbar.'],
    ['Variation:', 'Entwirf drei eigene A, die sich in Scheitel, Breite oder Querbalken unterscheiden.'],
    ['Werkzeug:', 'Schreibe das A mit Breitfeder, Pinsel und Marker und vergleiche die Striche.'],
    ['Graffiti-Transfer:', 'Entwickle ein eigenes Block-A und ein eigenes Wildstyle-A.'],
    ['Anwendung:', 'Schreibe das Wort „AREA“ in einem einheitlichen, eigenen Style.'],
  ];
  const size = 15, lh = 18.5, tx = c.x + 36, tw = c.w - 44;
  let y = c.y + 14;
  tasks.forEach(([term, rest], i) => {
    sh.add('frames', `<path d="${roughRectPath(sh, c.x, y - 16, 24, 24, 0.8, 12)}" fill="${C.yellow}" stroke="${C.ink}" stroke-width="2"/>`);
    text(sh, c.x + 12, y + 2, String(i + 1), { font: 'pm', size: 16, anchor: 'middle', panel: c.id });
    const termW = text(sh, tx, y, term, { font: 'k7', size, panel: c.id });
    const words = rest.split(' '); let first = '';
    while (words.length && textWidth(`${first} ${words[0]}`.trim(), 'k4', size) <= tw - termW - 6) first = `${first} ${words.shift()}`.trim();
    text(sh, tx + termW + 5, y, first, { size, panel: c.id });
    const more = words.length ? wrap(words.join(' '), 'k4', size, tw) : [];
    more.forEach((l, j) => text(sh, tx, y + (j + 1) * lh, l, { size, panel: c.id }));
    y += (more.length + 1) * lh + 9;
  });
  crown(sh, c.x + c.w - 62, c.y + c.h - 44, 44);
}

// ---------------- footer ----------------
{
  const y = 1104, h = 66;
  sh.add('frames', `<path d="${roughRectPath(sh, 16, y, 1648, h, 1.4)}" fill="${C.white}" stroke="${C.ink}" stroke-width="3.2" stroke-linejoin="round"/>`);
  const can = (x, yy, s, cap) => `<g transform="translate(${f(x)} ${f(yy)}) scale(${s})"><rect x="0" y="16" width="44" height="78" rx="6" fill="url(#can)" stroke="${C.ink}" stroke-width="3"/><path d="M4 16 Q22 0 40 16 Z" fill="${C.graphite}" stroke="${C.ink}" stroke-width="3"/><rect x="16" y="-2" width="12" height="10" fill="${cap}" stroke="${C.ink}" stroke-width="2.5"/><rect x="0" y="40" width="44" height="22" fill="${cap}" stroke="${C.ink}" stroke-width="2"/></g>`;
  splat(sh, 70, 1150, 34, C.violet, { dots: 14, drips: 0 });
  sh.add('letters', can(30, y - 18, 0.8, C.violet) + can(74, y - 6, 0.72, C.yellow));
  const zW = textWidth('Ziel:', 'pm', 26);
  highlight(sh, 150, y + 18, zW + 10, 34);
  text(sh, 156, y + 45, 'Ziel:', { font: 'pm', size: 26, panel: 'footer' });
  text(sh, 176 + zW, y + 43, 'Das A in Aufbau, Proportion, Stil und Wirkung sicher verstehen, variieren und eigenständig anwenden.', { font: 'k7', size: 21, panel: 'footer' });
  arrow(sh, [1500, y + 36], [1640, y + 32], { color: C.ink, width: 4.5, head: 16, bend: -6, layer: 'labels' });
}

// ---------------- edge spray ----------------
splat(sh, 1652, 150, 16, C.violet, { dots: 10, drips: 3 });
splat(sh, 492, 22, 14, C.violet, { dots: 10, drips: 2 });
splat(sh, 1652, 1172, 26, C.violet, { dots: 12 });
splat(sh, 8, 620, 12, C.yellow, { dots: 8 });

// ---------------- assemble ----------------
const font = (name, file, weight) => `@font-face{font-family:'${name}';font-weight:${weight};src:url(data:font/woff2;base64,${readFileSync(new URL(`../../assets/fonts/academy/${file}`, import.meta.url)).toString('base64')}) format('woff2');}`;
const style = `<style>${font('NS Marker', 'permanent-marker-latin-400-normal.woff2', 400)}${font('NS Hand', 'kalam-latin-400-normal.woff2', 400)}${font('NS Hand', 'kalam-latin-700-normal.woff2', 700)}</style>`;
const build = (clean) => {
  const skip = clean ? new Set(['distress', 'spray']) : new Set();
  const body = LAYER_ORDER.filter((k) => !skip.has(k)).map((k) => {
    let content = sh.layers[k].join('\n');
    if (clean && k === 'paper') content = `<rect width="${W}" height="${H}" fill="#FFFFFF"/>`;
    return `<g id="layer-${k}" data-layer="${k}"><title>${esc(LAYER_TITLES[k])}</title>\n${content}\n</g>`;
  }).join('\n');
  return `<svg xmlns="http://www.w3.org/2000/svg" width="297mm" height="210mm" viewBox="0 0 ${W} ${H}" lang="de">
<title>NIGHTSHIFT Letter Construction Academy – Buchstabenstudie A${clean ? ' (Druckversion ohne Textur)' : ''}</title>
<desc>Neunfeldrige Lernstudie zum Großbuchstaben A im Blackbook-Stil. Erzeugt von tools/academy/build-letter-study-a.mjs; nicht von Hand bearbeiten. Alle Letter-Entwürfe sind eigene Konstruktionen. Prozentwerte sind Beispielwerte dieser Zeichnung.</desc>
<metadata>{"study":"A","version":"01","generator":"tools/academy/build-letter-study-a.mjs","visualReference":"assets/design/reference/academy-uppercase/A.webp","masterPrompt":"docs/lettering/MASTER_CONTROL_PROMPT_01.md v1.2","status":"owner review pending","variant":"${clean ? 'clean' : 'full'}"}</metadata>
<defs>${style}\n${sh.defs.join('\n')}</defs>
${body}
</svg>
`;
};
const OUT = process.env.ACADEMY_OUT ?? 'assets/design';
writeFileSync(`${OUT}/letter-study_A_01.svg`, build(false));
writeFileSync(`${OUT}/letter-study_A_01_clean.svg`, build(true));
console.log(`Wrote ${OUT}/letter-study_A_01.svg and ${OUT}/letter-study_A_01_clean.svg`, EX);
