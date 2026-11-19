// Perpendicular thickness of facing parallel straight edges (used to verify constructed diagonals).
// Perpendicular thickness of every pair of (anti)parallel straight edges that face each other.
export function parse(d) { return [...d.matchAll(/[ML] ?(-?[\d.]+) (-?[\d.]+)/g)].map((m) => [+m[1], +m[2]]); }
export function strokes(d) {
  const p = parse(d), n = p.length, E = p.map((a, i) => [a, p[(i + 1) % n]]), out = [];
  for (let i = 0; i < n; i++) for (let j = i + 1; j < n; j++) {
    const [a, b] = E[i], [c, e] = E[j];
    const u = [b[0] - a[0], b[1] - a[1]], v = [e[0] - c[0], e[1] - c[1]];
    const lu = Math.hypot(...u), lv = Math.hypot(...v);
    if (Math.abs(u[0] * v[1] - u[1] * v[0]) / (lu * lv) > 0.03) continue; // not parallel
    if (u[0] * v[0] + u[1] * v[1] > 0) continue; // same direction: not facing walls of one stroke
    const nrm = [-u[1] / lu, u[0] / lu];
    const dist = Math.abs((c[0] - a[0]) * nrm[0] + (c[1] - a[1]) * nrm[1]);
    // overlap of projections along the edge direction
    const t = (q) => ((q[0] - a[0]) * u[0] + (q[1] - a[1]) * u[1]) / lu;
    const lo = Math.max(0, Math.min(t(c), t(e))), hi = Math.min(lu, Math.max(t(c), t(e)));
    if (hi - lo < 4 || dist < 1) continue;
    out.push({ i, j, dist: +dist.toFixed(1), diagonal: Math.abs(u[0]) > 1 && Math.abs(u[1]) > 1 });
  }
  return out;
}
