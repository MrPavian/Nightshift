// Drawing helpers for the Letter Construction Academy sheets.
// Everything is plain SVG strings; output is sorted into named layers so that
// texture, spray and construction can be switched off for a clean print version.
import { readFileSync } from 'node:fs';

const METRICS = JSON.parse(readFileSync(new URL('./font-metrics.json', import.meta.url), 'utf8'));
export const FONT = { marker: 'pm', hand: 'k4', handBold: 'k7' };
export const FAMILY = { pm: "'NS Marker', 'Permanent Marker', sans-serif", k4: "'NS Hand', 'Kalam', sans-serif", k7: "'NS Hand', 'Kalam', sans-serif" };
export const C = { ink: '#111111', paper: '#F2EEE6', yellow: '#F5D400', violet: '#8756A7', graphite: '#3A3836', white: '#FFFFFF', pink: '#E86BD6', violetDark: '#4A2A63', grey: '#D9D4CC' };

/** Advance width of a string in px (no kerning; good enough for layout, verified in the browser QA). */
export function textWidth(s, font, size) {
  const w = METRICS[font].widths;
  let sum = 0;
  for (const ch of s) {
    if (w[ch] == null) throw new Error(`Glyph ${JSON.stringify(ch)} not in font ${font}`);
    sum += w[ch];
  }
  return (sum / 1000) * size;
}

/** Greedy word wrap. */
export function wrap(s, font, size, maxW) {
  const out = []; let line = '';
  for (const word of s.split(' ')) {
    const t = line ? `${line} ${word}` : word;
    if (line && textWidth(t, font, size) > maxW) { out.push(line); line = word; } else line = t;
  }
  if (line) out.push(line);
  return out;
}

export function rng(seed) {
  let a = seed >>> 0;
  return () => { a = (a + 0x6d2b79f5) >>> 0; let t = a; t = Math.imul(t ^ (t >>> 15), t | 1); t ^= t + Math.imul(t ^ (t >>> 7), t | 61); return ((t ^ (t >>> 14)) >>> 0) / 4294967296; };
}

export const esc = (s) => String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');
export const f = (n) => Math.round(n * 100) / 100;
export const pts = (p) => p.map(([x, y]) => `${f(x)},${f(y)}`).join(' ');
export const poly = (p) => `M${p.map(([x, y]) => `${f(x)} ${f(y)}`).join(' L')} Z`;

/** A sheet collects output in named layers, painted in LAYER_ORDER. */
export const LAYER_ORDER = ['paper', 'distress', 'spray', 'under', 'frames', 'letters', 'construction', 'labels'];
export const LAYER_TITLES = {
  paper: 'Papier und Körnung', distress: 'Kantenabrieb und Flecken', spray: 'Spray, Spritzer und Drips', under: 'Hintergrundflächen und Raster',
  frames: 'Feldrahmen und Titelbalken', letters: 'Buchstaben und Letter-Art', construction: 'Konstruktion, Maße und Pfeile', labels: 'Beschriftungen (Text)',
};
export class Sheet {
  constructor(seed = 7) { this.layers = Object.fromEntries(LAYER_ORDER.map((k) => [k, []])); this.defs = []; this.r = rng(seed); this.uid = 0; }
  add(layer, s) { this.layers[layer].push(s); return this; }
  id(p = 'e') { return `${p}${++this.uid}`; }
  jit(a = 1) { return (this.r() * 2 - 1) * a; }
}

/** Text. `panel` tags it for the layout QA. */
export function text(sh, x, y, s, { font = 'k4', size = 17, fill = C.ink, anchor = 'start', panel = '', layer = 'labels', extra = '' } = {}) {
  const weight = font === 'k7' ? 700 : 400;
  sh.add(layer, `<text x="${f(x)}" y="${f(y)}" font-family="${FAMILY[font]}" font-weight="${weight}" font-size="${size}" fill="${fill}" text-anchor="${anchor}"${panel ? ` data-panel="${panel}"` : ''}${extra}>${esc(s)}</text>`);
  return textWidth(s, font, size);
}

/** Multi-line text block; returns height used. Lines may start with "**" for bold. */
export function textBlock(sh, x, y, lines, { size = 17, lh = 1.28, ...o } = {}) {
  lines.forEach((l, i) => {
    const bold = l.startsWith('**');
    text(sh, x, y + i * size * lh, bold ? l.slice(2) : l, { size, ...o, font: bold ? 'k7' : (o.font ?? 'k4') });
  });
  return lines.length * size * lh;
}

/** Hand-inked closed outline around a rectangle (points every ~step px, jittered). */
export function roughRectPath(sh, x, y, w, h, j = 1.6, step = 34) {
  const p = [];
  const edge = (x1, y1, x2, y2) => { const n = Math.max(2, Math.round(Math.hypot(x2 - x1, y2 - y1) / step)); for (let i = 0; i < n; i++) { const t = i / n; p.push([x1 + (x2 - x1) * t + sh.jit(j), y1 + (y2 - y1) * t + sh.jit(j)]); } };
  edge(x, y, x + w, y); edge(x + w, y, x + w, y + h); edge(x + w, y + h, x, y + h); edge(x, y + h, x, y);
  return poly(p);
}

/** Rough circle/blob. */
export function blob(sh, cx, cy, r, j = 0.08, n = 14) {
  const p = [];
  for (let i = 0; i < n; i++) { const a = (i / n) * Math.PI * 2; const rr = r * (1 + sh.jit(j)); p.push([cx + Math.cos(a) * rr, cy + Math.sin(a) * rr]); }
  // smooth with quadratic midpoints
  const m = p.map((q, i) => { const n2 = p[(i + 1) % p.length]; return [(q[0] + n2[0]) / 2, (q[1] + n2[1]) / 2]; });
  let d = `M${f(m[m.length - 1][0])} ${f(m[m.length - 1][1])}`;
  p.forEach((q, i) => { d += ` Q${f(q[0])} ${f(q[1])} ${f(m[i][0])} ${f(m[i][1])}`; });
  return d + ' Z';
}

/** Panel frame with marker title bar and yellow number badge. Returns the inner content box. */
export function panel(sh, { n, x, y, w, h, title, sub }) {
  const id = `panel-${n}`;
  sh.add('frames', `<g id="${id}-frame" data-box="${x} ${y} ${w} ${h}">`
    + `<path d="${roughRectPath(sh, x, y, w, h, 1.4)}" fill="none" stroke="${C.ink}" stroke-width="3.4" stroke-linejoin="round"/>`
    + `<path d="${roughRectPath(sh, x + 1.5, y + 1, w - 2, h - 1.5, 2.2, 60)}" fill="none" stroke="${C.ink}" stroke-width="1.1" opacity=".55"/>`);
  // title bar
  const tSize = 21, sSize = 16.5;
  const tW = textWidth(title, 'pm', tSize), sW = sub ? textWidth(` – ${sub}`, 'k7', sSize) : 0;
  const bx = x + 46, by = y + 12, bw = Math.min(tW + sW + 36, w - 58), bh = 36;
  const bar = [[bx - 4, by + 3], [bx + bw * 0.5, by + sh.jit(1.5)], [bx + bw + 6, by + 2], [bx + bw + 1, by + bh - 2], [bx + bw * 0.45, by + bh + 2], [bx - 1, by + bh]];
  sh.add('frames', `<path d="${poly(bar)}" fill="${C.ink}"/></g>`);
  text(sh, bx + 12, by + 26, title, { font: 'pm', size: tSize, fill: C.white, panel: id });
  if (sub) text(sh, bx + 18 + tW, by + 25, ` – ${sub}`, { font: 'k7', size: sSize, fill: C.white, panel: id });
  // number badge
  sh.add('frames', `<path d="${blob(sh, x + 24, y + 30, 19, 0.07)}" fill="${C.yellow}" stroke="${C.ink}" stroke-width="2.6"/>`);
  text(sh, x + 24, y + 40, String(n), { font: 'pm', size: 27, anchor: 'middle', panel: id });
  return { id, x: x + 14, y: y + 58, w: w - 28, h: h - 70, x0: x, y0: y, w0: w, h0: h };
}

/** Yellow highlighter swipe behind a text; returns nothing (call before the text). */
export function highlight(sh, x, y, w, h, layer = 'under') {
  const p = [[x - 5, y + 2 + sh.jit(1)], [x + w + 6, y + sh.jit(1)], [x + w + 3, y + h + sh.jit(1)], [x - 3, y + h + 2 + sh.jit(1)]];
  sh.add(layer, `<path d="${poly(p)}" fill="${C.yellow}" opacity=".95"/>`);
}

/** Label in a yellow highlighter swipe, centred at (cx, y-baseline). */
export function tag(sh, cx, y, lines, { size = 16, panel: p = '' } = {}) {
  const lh = size * 1.12;
  const w = Math.max(...lines.map((l) => textWidth(l, 'k7', size)));
  highlight(sh, cx - w / 2, y - size * 0.95, w, lines.length * lh + size * 0.22);
  lines.forEach((l, i) => text(sh, cx, y + i * lh, l, { font: 'k7', size, anchor: 'middle', panel: p }));
  return { w, h: lines.length * lh };
}

/** Hand-drawn arrow from a to b (optional bend), head at b. */
export function arrow(sh, [x1, y1], [x2, y2], { color = C.violet, width = 3, bend = 0, head = 11, layer = 'construction', attrs = '' } = {}) {
  const mx = (x1 + x2) / 2, my = (y1 + y2) / 2, dx = x2 - x1, dy = y2 - y1, L = Math.hypot(dx, dy) || 1;
  const cx = mx - (dy / L) * bend, cy = my + (dx / L) * bend;
  // direction at the end of the quadratic curve
  const ex = x2 - cx, ey = y2 - cy, eL = Math.hypot(ex, ey) || 1, ux = ex / eL, uy = ey / eL;
  const bx = x2 - ux * head * 0.9, by = y2 - uy * head * 0.9;
  const h1 = [x2 - ux * head - uy * head * 0.55, y2 - uy * head + ux * head * 0.55], h2 = [x2 - ux * head + uy * head * 0.55, y2 - uy * head - ux * head * 0.55];
  sh.add(layer, `<g class="arrow"${attrs}><path d="M${f(x1)} ${f(y1)} Q${f(cx)} ${f(cy)} ${f(bx)} ${f(by)}" fill="none" stroke="${color}" stroke-width="${width}" stroke-linecap="round"/>`
    + `<path d="M${f(h1[0])} ${f(h1[1])} L${f(x2)} ${f(y2)} L${f(h2[0])} ${f(h2[1])} Z" fill="${color}" stroke="${color}" stroke-width="1.5" stroke-linejoin="round"/></g>`);
}

/** Label box with violet outline (anatomy). Returns the box. */
export function labelBox(sh, cx, cy, lines, { size = 16, panel: p = '' } = {}) {
  const lh = size * 1.12;
  const w = Math.max(...lines.map((l, i) => textWidth(l, i === 0 ? 'k7' : 'k4', size))) + 22, h = lines.length * lh + 12;
  const x = cx - w / 2, y = cy - h / 2;
  sh.add('labels', `<path d="${roughRectPath(sh, x, y, w, h, 0.9, 30)}" fill="${C.white}" stroke="${C.violet}" stroke-width="2.6" stroke-linejoin="round"/>`);
  lines.forEach((l, i) => text(sh, cx, y + 6 + size * 0.95 + i * lh, l, { font: i === 0 ? 'k7' : 'k4', size, anchor: 'middle', panel: p }));
  return { x, y, w, h };
}

/** Yellow check mark (drawn, not a glyph). */
export function check(sh, x, y, s = 18) {
  sh.add('labels', `<path d="${roughRectPath(sh, x, y - s + 3, s, s, 0.7, 10)}" fill="${C.yellow}" stroke="${C.ink}" stroke-width="1.6"/>`
    + `<path d="M${f(x + s * 0.18)} ${f(y - s * 0.42)} L${f(x + s * 0.42)} ${f(y - s * 0.12)} L${f(x + s * 0.9)} ${f(y - s * 0.95)}" fill="none" stroke="${C.ink}" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"/>`);
}

/** Crown (three points), black outline, yellow fill. */
export function crown(sh, x, y, s, layer = 'letters') {
  const p = [[0, 1], [0.05, 0.25], [0.3, 0.6], [0.5, 0], [0.7, 0.6], [0.95, 0.25], [1, 1]].map(([a, b]) => [x + a * s, y + b * s * 0.8]);
  sh.add(layer, `<g class="crown"><path d="${poly(p)}" fill="${C.yellow}" stroke="${C.ink}" stroke-width="${f(s * 0.07)}" stroke-linejoin="round"/>`
    + [p[1], p[3], p[5]].map(([a, b]) => `<circle cx="${f(a)}" cy="${f(b)}" r="${f(s * 0.07)}" fill="${C.ink}"/>`).join('') + '</g>');
}

/** Spray splash: core blob, satellite dots, optional drips. Tagged class="splat" for the QA. */
export function splat(sh, cx, cy, r, color, { drips = 0, dots = 18, layer = 'spray', opacity = 0.9 } = {}) {
  let s = `<g class="splat" opacity="${opacity}"><path d="${blob(sh, cx, cy, r, 0.22, 18)}" fill="${color}"/>`;
  for (let i = 0; i < dots; i++) {
    const a = sh.r() * Math.PI * 2, d = r * (1.05 + sh.r() * 0.9), rr = 1 + sh.r() * r * 0.13;
    s += `<circle cx="${f(cx + Math.cos(a) * d)}" cy="${f(cy + Math.sin(a) * d)}" r="${f(rr)}" fill="${color}"/>`;
  }
  for (let i = 0; i < drips; i++) {
    const x = cx + (sh.r() * 1.2 - 0.6) * r, len = r * (0.8 + sh.r() * 1.4), w = 2 + sh.r() * 3;
    s += `<path d="M${f(x - w)} ${f(cy)} L${f(x - w * 0.8)} ${f(cy + len)} Q${f(x)} ${f(cy + len + w * 2.4)} ${f(x + w * 0.8)} ${f(cy + len)} L${f(x + w)} ${f(cy)} Z" fill="${color}"/>`;
  }
  sh.add(layer, s + '</g>');
}

// ---------- geometry for constructed letters ----------
const sub = (a, b) => [a[0] - b[0], a[1] - b[1]], add = (a, b) => [a[0] + b[0], a[1] + b[1]], mul = (a, k) => [a[0] * k, a[1] * k];
const norm = (a) => { const l = Math.hypot(a[0], a[1]) || 1; return [a[0] / l, a[1] / l]; };
const perp = (a) => [-a[1], a[0]];

/**
 * Ribbon: polygon around a polyline with constant width and mitred joins.
 * caps: 'flat' | 'arrow' | 'cut' (angled) | 'cutr' (angled the other way).
 */
export function ribbon(points, width, { start = 'flat', end = 'flat', arrowW = 1.9, arrowL = 1.5, cut = 0.6 } = {}) {
  const hw = width / 2, n = points.length, L = [], R = [];
  for (let i = 0; i < n; i++) {
    const p = points[i];
    const dIn = i > 0 ? norm(sub(p, points[i - 1])) : null, dOut = i < n - 1 ? norm(sub(points[i + 1], p)) : null;
    let nrm, k = 1;
    if (dIn && dOut) { const n1 = perp(dIn), n2 = perp(dOut); nrm = norm(add(n1, n2)); k = Math.min(3, 1 / Math.max(0.2, nrm[0] * n1[0] + nrm[1] * n1[1])); } else nrm = perp(dIn ?? dOut);
    L.push(add(p, mul(nrm, hw * k))); R.push(sub(p, mul(nrm, hw * k)));
  }
  const capEnd = (pt, dir, l, r, kind) => {
    if (kind === 'arrow') { const nr = perp(dir); return [l, add(pt, mul(nr, hw * arrowW)), add(pt, mul(dir, width * arrowL)), sub(pt, mul(nr, hw * arrowW)), r]; }
    if (kind === 'cut') return [add(l, mul(dir, width * cut)), r];
    if (kind === 'cutr') return [l, add(r, mul(dir, width * cut))];
    return [l, r];
  };
  const dE = norm(sub(points[n - 1], points[n - 2])), dS = norm(sub(points[0], points[1]));
  const endPts = capEnd(points[n - 1], dE, L[n - 1], R[n - 1], end);
  const startPts = capEnd(points[0], dS, R[0], L[0], start);
  return [...L.slice(0, -1), ...endPts, ...R.slice(1, -1).reverse(), ...startPts];
}

/**
 * Graffiti-style rendering of a set of parts: optional 3D extrusion, black outline
 * (outline-under-fill, so overlapping parts read as one letter), fill, counters, shine.
 * part: { poly:[[x,y]...] } | { stroke:'d', w } ; counter: { poly } ; shine: ['d', ...]
 */
export function graffiti(sh, { parts, counters = [], fill = C.white, ow = 6, ink = C.ink, extrude = null, shine = [], inline = [], id = sh.id('ga'), layer = 'letters', transform = '' }) {
  const shape = (color, grow) => parts.map((p) => p.poly
    ? `<path d="${poly(p.poly)}" fill="${color}" stroke="${color}" stroke-width="${f(grow * 2)}" stroke-linejoin="round"/>`
    : `<path d="${p.stroke}" fill="none" stroke="${color}" stroke-width="${f(p.w + grow * 2)}" stroke-linecap="round" stroke-linejoin="round"/>`).join('');
  let s = `<g id="${id}"${transform ? ` transform="${transform}"` : ''}>`;
  if (extrude) {
    const { dx, dy, steps = 10, color = ink } = extrude;
    sh.defs.push(`<g id="${id}-sil">${shape(color, ow)}</g>`);
    for (let i = steps; i >= 1; i--) s += `<use href="#${id}-sil" transform="translate(${f((dx * i) / steps)} ${f((dy * i) / steps)})"/>`;
    s += `<g transform="translate(${f(dx)} ${f(dy)})">${shape(ink, ow + 1.5)}</g>`;
  }
  s += shape(ink, ow) + shape(fill, 0);
  for (const d of inline) s += `<path d="${d}" fill="none" stroke="${C.white}" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round" opacity=".9"/>`;
  for (const c of counters) s += `<path d="${poly(c.poly)}" fill="${c.fill ?? C.paper}" stroke="${ink}" stroke-width="${f(ow * 1.7)}" stroke-linejoin="round"/>`;
  for (const d of shine) s += `<path d="${d}" fill="none" stroke="${C.white}" stroke-width="3.4" stroke-linecap="round"/>`;
  sh.add(layer, s + '</g>');
}
