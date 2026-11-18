// Graffiti engine: builds styled letters from skeletons (src/style/skeletons.js) the way graffiti
// tutorials describe it: skeleton -> bars around the lines -> style moves at free bar ends -> fill -> 3D.
// A style is a recipe: bar construction (base) plus a small set of moves that recur through the word,
// so the word reads as one hand. Deterministic for a given seed. Pure module (Node and browser).
import { SKELETONS } from './skeletons.js';

export const ENGINE_VERSION = 'graffiti-engine/0.1.0';

/** Bar construction per base style. W = bar width in skeleton units (cap height 140). */
export const BASES = {
  bubble: { labelDe: 'Bubble', W: 58, round: true, scaleX: 0.78, moves: ['drop'] },
  straight: { labelDe: 'Straight', W: 30, round: false, scaleX: 1, moves: ['serif', 'cut', 'kick'] },
  blockbuster: { labelDe: 'Blockbuster', W: 40, round: false, scaleX: 1.08, moves: ['serif', 'cut'] },
  semiwild: { labelDe: 'Semi-Wildstyle', W: 28, round: false, scaleX: 1, moves: ['arrow', 'kick', 'cut', 'split'] },
};
export const MOVE_LABELS = { drop: 'Tropfen-Enden', serif: 'Serifen', cut: 'schräge Cuts', kick: 'Kicks', arrow: 'Pfeile', split: 'geteilte Balken' };

export function rng(seedStr) {
  let h = 2166136261;
  for (const c of String(seedStr)) { h ^= c.charCodeAt(0); h = Math.imul(h, 16777619); }
  let a = h >>> 0;
  return () => { a = (a + 0x6d2b79f5) >>> 0; let t = a; t = Math.imul(t ^ (t >>> 15), t | 1); t ^= t + Math.imul(t ^ (t >>> 7), t | 61); return ((t ^ (t >>> 14)) >>> 0) / 4294967296; };
}

const sub = (a, b) => [a[0] - b[0], a[1] - b[1]], add = (a, b) => [a[0] + b[0], a[1] + b[1]], mul = (a, k) => [a[0] * k, a[1] * k];
const norm = (a) => { const l = Math.hypot(a[0], a[1]) || 1; return [a[0] / l, a[1] / l]; };
const perp = (a) => [-a[1], a[0]];
const r2 = (n) => Math.round(n * 100) / 100;

/** Constant-width ribbon around a polyline with mitred joins and end caps: flat | arrow | cut | cutr. */
export function ribbon(points, width, { start = 'flat', end = 'flat' } = {}) {
  const hw = width / 2, n = points.length, L = [], R = [];
  for (let i = 0; i < n; i++) {
    const p = points[i], dIn = i > 0 ? norm(sub(p, points[i - 1])) : null, dOut = i < n - 1 ? norm(sub(points[i + 1], p)) : null;
    let nrm, k = 1;
    if (dIn && dOut) { const n1 = perp(dIn), n2 = perp(dOut); nrm = norm(add(n1, n2)); k = Math.min(3, 1 / Math.max(0.25, nrm[0] * n1[0] + nrm[1] * n1[1])); } else nrm = perp(dIn ?? dOut);
    L.push(add(p, mul(nrm, hw * k))); R.push(sub(p, mul(nrm, hw * k)));
  }
  const cap = (pt, dir, l, r, kind) => {
    if (kind === 'arrow') { const nr = perp(dir); return [l, add(pt, mul(nr, hw * 1.95)), add(pt, mul(dir, width * 1.35)), sub(pt, mul(nr, hw * 1.95)), r]; }
    if (kind === 'cut') return [add(l, mul(dir, width * 0.7)), r];
    if (kind === 'cutr') return [l, add(r, mul(dir, width * 0.7))];
    return [l, r];
  };
  const dE = norm(sub(points[n - 1], points[n - 2])), dS = norm(sub(points[0], points[1]));
  return [...L.slice(0, -1), ...cap(points[n - 1], dE, L[n - 1], R[n - 1], end), ...R.slice(1, -1).reverse(), ...cap(points[0], dS, R[0], L[0], start)];
}

const center = (strokes) => { const xs = strokes.flat().map((p) => p[0]); return (Math.min(...xs) + Math.max(...xs)) / 2; };

/**
 * Build one letter. recipe: { base, moves: string[], density } -> { char, parts, W, round, box, applied[] }.
 * parts: { poly } (straight bases) or { pts } (round bases, drawn as round-capped strokes).
 */
export function buildLetter(char, recipe, seed) {
  const sk = SKELETONS[char];
  if (!sk) throw new Error(`No skeleton for ${char}`);
  const base = BASES[recipe.base], W = base.W, rand = rng(`${seed}:${char}:${recipe.base}:${recipe.moves.join('+')}`);
  const strokes = sk.strokes.map((s) => s.map((p) => [...p]));
  const caps = strokes.map(() => ({ start: 'flat', end: 'flat' }));
  const extras = [], applied = [];
  const allowed = recipe.moves.filter((m) => base.moves.includes(m));
  const cx = center(strokes);
  const allPts = strokes.flat(), bx = { x0: Math.min(...allPts.map((p) => p[0])), x1: Math.max(...allPts.map((p) => p[0])), y0: Math.min(...allPts.map((p) => p[1])), y1: Math.max(...allPts.map((p) => p[1])) };

  // 1. split crossbars (wildstyle-like offset halves)
  const splitBars = new Set();
  if (allowed.includes('split')) for (const b of sk.bars) if (rand() < 0.75) { splitBars.add(b); applied.push({ move: 'split', stroke: b }); }

  // 2. moves at free bar ends; at most `density` per letter, at least one when the letter has terminals
  const endMoves = allowed.filter((m) => m !== 'split');
  const order = sk.terminals.map((t, i) => ({ t, k: rand() + i * 1e-6 })).sort((a, b) => a.k - b.k).map((x) => x.t);
  const density = recipe.density ?? 2;
  let used = 0;
  for (const t of order) {
    if (!endMoves.length || used >= density) break;
    if (used > 0 && rand() > 0.55) continue;
    const move = endMoves[Math.floor(rand() * endMoves.length)];
    const s = strokes[t.s], atEnd = t.e === 'end';
    const pt = atEnd ? s[s.length - 1] : s[0], prev = atEnd ? s[s.length - 2] : s[1];
    const dir = norm(sub(pt, prev));
    // Kicks and arrows only on outer ends (on the letter's outline box); arrows never point down.
    const outer = pt[0] <= bx.x0 + 10 || pt[0] >= bx.x1 - 10 || pt[1] <= bx.y0 + 10 || pt[1] >= bx.y1 - 10;
    if ((move === 'kick' || move === 'arrow') && !outer) continue;
    if (move === 'arrow' && dir[1] > 0.35) continue;
    if (move === 'drop') {
      // bubble: the end swells into a rounder drop
      extras.push({ pts: [pt, add(pt, mul(dir, W * 0.12))], w: W * 1.22 });
    } else if (move === 'kick') {
      // feet kick sideways along the baseline; other ends bend outward and up
      const out = Math.sign(pt[0] - cx) || 1;
      const d2 = dir[1] > 0.5 ? norm([out, 0.12]) : norm(add(dir, [out * 0.9, 0]));
      const len = W * (dir[1] > 0.5 ? 1.15 : 1.5);
      const np = add(pt, mul(d2, len));
      if (atEnd) s.push(np); else s.unshift(np);
      if (!base.round) caps[t.s][t.e] = out * (atEnd ? 1 : -1) > 0 ? 'cut' : 'cutr';
    } else if (move === 'arrow') {
      const np = add(pt, mul(dir, W * 1.1));
      if (atEnd) s[s.length - 1] = np; else s[0] = np;
      caps[t.s][t.e] = 'arrow';
    } else if (move === 'cut') {
      caps[t.s][t.e] = rand() < 0.5 ? 'cut' : 'cutr';
    } else if (move === 'serif') {
      const p = perp(dir), a = add(pt, mul(dir, -W * 0.2)), b = add(pt, mul(dir, W * 0.42));
      extras.push({ poly: [add(a, mul(p, W * 0.95)), add(b, mul(p, W * 0.95)), sub(b, mul(p, W * 0.95)), sub(a, mul(p, W * 0.95))] });
    }
    applied.push({ move, stroke: t.s, end: t.e });
    used++;
  }

  // 3. bars -> parts
  const parts = [];
  strokes.forEach((s, i) => {
    if (splitBars.has(i)) {
      const [p, q] = [s[0], s[s.length - 1]], m = mul(add(p, q), 0.5), off = [0, W * 0.32], ov = mul(norm(sub(q, p)), W * 0.4);
      const halves = [[add(p, mul(off, -1)), add(add(m, ov), mul(off, -1))], [add(sub(m, ov), off), add(q, off)]];
      for (const h of halves) parts.push(base.round ? { pts: h } : { poly: ribbon(h, W * 0.8, { end: 'cut' }) });
    } else parts.push(base.round ? { pts: s } : { poly: ribbon(s, W, caps[i]) });
  });
  parts.push(...extras);

  // bounding box of the ink (approximate: points ± W/2)
  const pts = parts.flatMap((p) => p.poly ?? p.pts);
  const pad = base.round ? W / 2 : 0;
  const xs = pts.map((p) => p[0]), ys = pts.map((p) => p[1]);
  const box = { x0: Math.min(...xs) - (base.round ? pad : W * 0.1), x1: Math.max(...xs) + (base.round ? pad : W * 0.1), y0: Math.min(...ys) - pad, y1: Math.max(...ys) + pad };
  return { char, parts, W, round: base.round, box, applied, skeleton: strokes };
}

// ---------------- rendering ----------------
const pathPoly = (p) => `M${p.map(([x, y]) => `${r2(x)} ${r2(y)}`).join(' L')}Z`;
const pathLine = (p) => `M${p.map(([x, y]) => `${r2(x)} ${r2(y)}`).join(' L')}`;

/** Silhouette of a letter, grown by `grow` units, in one colour. */
function silhouette(L, color, grow) {
  return L.parts.map((p) => (p.poly
    ? `<path d="${pathPoly(p.poly)}" fill="${color}" stroke="${color}" stroke-width="${r2(grow * 2)}" stroke-linejoin="miter" stroke-miterlimit="3"/>`
    : `<path d="${pathLine(p.pts)}" fill="none" stroke="${color}" stroke-width="${r2((p.w ?? L.W) + grow * 2)}" stroke-linecap="round" stroke-linejoin="round"/>`)).join('');
}

/** Highlights: short white lines along the lit (top-left) side of each bar. */
function highlights(L) {
  const light = norm([-0.55, -0.85]), out = [];
  const segs = L.parts.flatMap((p) => { const pts = p.pts ?? null; if (!pts) return []; return pts.slice(1).map((q, i) => [pts[i], q]); });
  // straight bases: use the skeleton (centre lines) for highlight placement
  const src = L.round ? segs : L.skeleton.flatMap((s) => s.slice(1).map((q, i) => [s[i], q]));
  for (const [a, b] of src) {
    const d = sub(b, a), len = Math.hypot(...d);
    if (len < 22) continue;
    const u = mul(d, 1 / len); let p = perp(u); if (p[0] * light[0] + p[1] * light[1] < 0) p = mul(p, -1);
    const off = L.W / 2 - Math.max(4, L.W * 0.18);
    const s0 = add(add(a, mul(u, len * 0.12)), mul(p, off)), s1 = add(add(a, mul(u, len * 0.5)), mul(p, off));
    out.push(`<path d="M${r2(s0[0])} ${r2(s0[1])} L${r2(s1[0])} ${r2(s1[1])}" stroke="#fff" stroke-width="${r2(Math.max(3, L.W * 0.11))}" stroke-linecap="round" opacity=".9"/>`);
  }
  return out.join('');
}

/**
 * Render placed letters as one SVG group. items: [{ letter, transform }]. finish: { fill, outline, outlineWidth,
 * depth: { dx, dy, color } | null, highlights }. 3D sits behind all letters; later letters overlap earlier ones.
 */
export function renderLetters(items, finish) {
  const ow = finish.outlineWidth ?? 7;
  let back = '', front = '';
  for (const { letter: L, transform } of items) {
    if (finish.depth) {
      const steps = 8; let ext = '';
      for (let i = steps; i >= 1; i--) ext += `<g transform="translate(${r2((finish.depth.dx * i) / steps)} ${r2((finish.depth.dy * i) / steps)})">${silhouette(L, finish.depth.color, ow)}</g>`;
      back += `<g transform="${transform}">${ext}</g>`;
    }
    front += `<g transform="${transform}" data-char="${L.char}" data-moves="${L.applied.map((a) => a.move).join(' ')}">${finish.outline ? silhouette(L, finish.outline, ow) : ''}${silhouette(L, finish.fill, 0)}${finish.highlights ? highlights(L) : ''}</g>`;
  }
  return `<g class="depth">${back}</g><g class="letters">${front}</g>`;
}
