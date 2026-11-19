// C02 wave 3: constructive source of the K M N V W X Y Z masters (perpendicular stroke thickness T).
// Run by tests/authored-wave3.test.js to prove the committed paths equal the construction.
// Construct wave-3 outlines from stroke edges with a fixed perpendicular thickness.
const T = 25;
const r = (v) => Math.round(v);
const line = (p, q) => ({ p, d: [q[0] - p[0], q[1] - p[1]] });
const shift = (l, t) => { const n = Math.hypot(...l.d); return { p: [l.p[0] - (l.d[1] / n) * t, l.p[1] + (l.d[0] / n) * t], d: l.d }; }; // + = to the right of the direction (y down)
const X = (a, b) => { const den = a.d[0] * b.d[1] - a.d[1] * b.d[0]; const t = ((b.p[0] - a.p[0]) * b.d[1] - (b.p[1] - a.p[1]) * b.d[0]) / den; return [a.p[0] + a.d[0] * t, a.p[1] + a.d[1] * t]; };
const H = (y) => ({ p: [0, y], d: [1, 0] }), V = (x) => ({ p: [x, 0], d: [0, 1] });
const path = (pts) => { const q = pts.map(([x, y]) => [r(x), r(y)]).filter((v, i, a) => i === 0 || v[0] !== a[i - 1][0] || v[1] !== a[i - 1][1]); return 'M' + q.map(([x, y]) => `${x} ${y}`).join(' L') + ' Z'; };
export const G = {};
// N: stems 10–36 / 74–100, diagonal with parallel edges at thickness T.
{ let lo = 0.5, hi = 3.2, s = 1; for (let i = 0; i < 60; i++) { s = (lo + hi) / 2; if ((124 - 38 * s) / Math.hypot(1, s) > T) lo = s; else hi = s; }
  G.N = path([[10, 132], [10, 8], [36, 8], [74, 8 + 38 * s], [74, 8], [100, 8], [100, 132], [74, 132], [36, 132 - 38 * s], [36, 132]]); }
// V: symmetric about x=52, feet 40–64 on the baseline.
{ const a = line([6, 8], [40, 132]), b = shift(a, -T); const ai = line([98, 8], [64, 132]), bi = shift(ai, T);
  const top = X(b, H(8)), notch = X(b, bi);
  G.V = path([[6, 8], top, notch, [104 - top[0], 8], [98, 8], [64, 132], [40, 132]]); }
// X: two crossing strokes, horizontal width chosen for perpendicular thickness T.
{ const dx = 70, w = T * Math.hypot(dx, 124) / 124;
  const A = line([6, 8], [6 + dx, 132]), B = line([6 + w, 8], [6 + w + dx, 132]);
  const C = line([6 + dx, 8], [6, 132]), D = line([6 + dx + w, 8], [6 + w, 132]);
  G.X = path([[6, 8], [6 + w, 8], X(B, C), [6 + dx, 8], [6 + dx + w, 8], X(B, D), [6 + dx + w, 132], [6 + dx, 132], X(A, D), [6 + w, 132], [6, 132], X(C, A)]); }
// Y: arms into a stem 39–65 (as T), symmetric about x=52.
{ const a = line([6, 8], [39, 82]), b = shift(a, -T); const ai = line([98, 8], [65, 82]), bi = shift(ai, T);
  const top = X(b, H(8)), notch = X(b, bi);
  G.Y = path([[6, 8], top, notch, [104 - top[0], 8], [98, 8], [65, 82], [65, 132], [39, 132], [39, 82]]); }
// Z: bars 8–31 / 109–132, diagonal with parallel edges.
{ const up = line([100, 31], [40, 109]); const lo = shift(up, T); // lower-left edge
  const loTop = X(lo, H(31)), loBot = X(lo, H(109));
  G.Z = path([[8, 8], [100, 8], [100, 31], [40, 109], [102, 109], [102, 132], [8, 132], [8, 109], loBot, loTop, [8, 31]]); }
// M: stems 10–36 / 78–104, diagonals meet on the axis x=57.
{ const s = 1.6, d = T * Math.hypot(1, s);
  G.M = path([[10, 132], [10, 8], [36, 8], [57, 8 + 21 * s], [78, 8], [104, 8], [104, 132], [78, 132], [78, 8 + d], [57, 8 + d + 21 * s], [36, 8 + d], [36, 132]]); }
// K: stem 10–36; arm from the stem to the top right; leg from the arm to the bottom right.
{ const armTop = line([36, 60], [74, 8]), armLow = shift(armTop, T);
  const legR = line([106, 132], [60, 62]), legL = shift(legR, -T);
  const v = X(armLow, legR), a8 = X(armLow, H(8)), l132 = X(legL, H(132)), lStem = X(legL, V(36));
  G.K = path([[10, 8], [36, 8], [36, 60], [74, 8], a8, v, [106, 132], l132, lStem, [36, 132], [10, 132]]); }
// W: two Vs with one slope throughout; middle apex at cap height, inner notches computed.
{ const k = 24 / 124, w = T * Math.hypot(24, 124) / 124;
  const La = line([4, 8], [28, 132]), Lb = line([4 + w, 8], [28 + w, 132]);
  const Ml = line([28, 132], [28 + 124 * k, 8]), Mr = line([28 + w, 132], [28 + w + 124 * k, 8]);
  const m = (l) => ({ p: [126 - l.p[0], l.p[1]], d: [-l.d[0], l.d[1]] });
  const ln = X(Lb, Ml), mid = X(Mr, m(Mr));
  G.W = path([[4, 8], [4 + w, 8], ln, [28 + 124 * k, 8], [126 - 28 - 124 * k, 8], [126 - ln[0], ln[1]], [126 - 4 - w, 8], [122, 8], [98, 132], [126 - 28 - w, 132], mid, [28 + w, 132], [28, 132]]); }
