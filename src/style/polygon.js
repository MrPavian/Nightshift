// Polygon helpers for the style grammar resolver (C03).
// All operations are deterministic and work in the glyph-local frame (y down).
// Signed area follows src/geometry/area.js: positive = clockwise in a y-down frame.
import { flattenContour } from '../geometry/flatten.js';

const EPS = 1e-9;
const r6 = (v) => Math.round(v * 1e6) / 1e6;

/** Canonical contour -> closed polygon (curves flattened at `tolerance`). */
export function contourToPolygon(contour, tolerance = 0.25) {
  return simplify(flattenContour(contour, tolerance).points.map(([x, y]) => [x, y]));
}

export function polyArea(p) {
  let a = 0;
  for (let i = 0; i < p.length; i++) { const [x0, y0] = p[i], [x1, y1] = p[(i + 1) % p.length]; a += x0 * y1 - x1 * y0; }
  return a / 2;
}

/** Drop duplicate and collinear vertices. */
export function simplify(p, tol = 1e-6) {
  let pts = p.filter((q, i) => { const n = p[(i + 1) % p.length]; return Math.hypot(n[0] - q[0], n[1] - q[1]) > 1e-7; });
  let changed = true;
  while (changed && pts.length > 3) {
    changed = false;
    for (let i = 0; i < pts.length; i++) {
      const a = pts[(i - 1 + pts.length) % pts.length], b = pts[i], c = pts[(i + 1) % pts.length];
      const cross = (b[0] - a[0]) * (c[1] - b[1]) - (b[1] - a[1]) * (c[0] - b[0]);
      const dot = (b[0] - a[0]) * (c[0] - b[0]) + (b[1] - a[1]) * (c[1] - b[1]);
      if (Math.abs(cross) <= tol * Math.hypot(c[0] - a[0], c[1] - a[1]) && dot > 0) { pts.splice(i, 1); changed = true; break; }
    }
  }
  return pts;
}

const unit = (x, y) => { const l = Math.hypot(x, y) || 1; return [x / l, y / l]; };

/**
 * Mitred offset. dist > 0 grows the polygon's own region, dist < 0 shrinks it.
 * Corners whose mitre would exceed `miterLimit` × |dist| are bevelled (two points).
 */
export function offsetPolygon(p, dist, { miterLimit = 3 } = {}) {
  const s = polyArea(p) > 0 ? 1 : -1, n = p.length, out = [];
  const normal = (a, b) => { const [dx, dy] = unit(b[0] - a[0], b[1] - a[1]); return [s * dy, -s * dx]; }; // outward
  for (let i = 0; i < n; i++) {
    const prev = p[(i - 1 + n) % n], cur = p[i], next = p[(i + 1) % n];
    const n1 = normal(prev, cur), n2 = normal(cur, next);
    const m = unit(n1[0] + n2[0], n1[1] + n2[1]), cos = m[0] * n1[0] + m[1] * n1[1];
    if (cos < 1 / miterLimit) {
      out.push([cur[0] + n1[0] * dist, cur[1] + n1[1] * dist], [cur[0] + n2[0] * dist, cur[1] + n2[1] * dist]);
    } else {
      const k = dist / cos;
      out.push([cur[0] + m[0] * k, cur[1] + m[1] * k]);
    }
  }
  return simplify(out);
}

/** Interior angle test: true when the vertex turns the same way as the polygon (convex). */
export function isConvex(p, i) {
  const n = p.length, a = p[(i - 1 + n) % n], b = p[i], c = p[(i + 1) % n];
  const cross = (b[0] - a[0]) * (c[1] - b[1]) - (b[1] - a[1]) * (c[0] - b[0]);
  return Math.sign(cross) === Math.sign(polyArea(p));
}

/** Angle at vertex i between its two edges, in degrees (0–180). */
export function cornerAngle(p, i) {
  const n = p.length, a = p[(i - 1 + n) % n], b = p[i], c = p[(i + 1) % n];
  const u = unit(a[0] - b[0], a[1] - b[1]), v = unit(c[0] - b[0], c[1] - b[1]);
  return (Math.acos(Math.max(-1, Math.min(1, u[0] * v[0] + u[1] * v[1]))) * 180) / Math.PI;
}

/** Clip sharp convex corners (angle < maxAngle) by `size` along both edges. */
export function clipSharpCorners(p, size, maxAngle) {
  const out = []; let clipped = 0;
  for (let i = 0; i < p.length; i++) {
    const n = p.length, a = p[(i - 1 + n) % n], b = p[i], c = p[(i + 1) % n];
    if (isConvex(p, i) && cornerAngle(p, i) < maxAngle) {
      const la = Math.hypot(a[0] - b[0], a[1] - b[1]), lc = Math.hypot(c[0] - b[0], c[1] - b[1]);
      const t = Math.min(size, la * 0.4, lc * 0.4);
      const u = unit(a[0] - b[0], a[1] - b[1]), v = unit(c[0] - b[0], c[1] - b[1]);
      out.push([b[0] + u[0] * t, b[1] + u[1] * t], [b[0] + v[0] * t, b[1] + v[1] * t]);
      clipped++;
    } else out.push(b);
  }
  return { points: simplify(out), clipped };
}

/** Polygon -> canonical segments (lines only). */
export function polygonSegments(p) {
  return [{ type: 'move', x: r6(p[0][0]), y: r6(p[0][1]) }, ...p.slice(1).map(([x, y]) => ({ type: 'line', x: r6(x), y: r6(y) })), { type: 'close' }];
}

/**
 * Polygon -> segments with every corner replaced by a quadratic fillet. The fillet starts and
 * ends at most `radius` (and at most 45 % of the adjacent edge) away from the corner.
 */
export function roundedSegments(p, radius, { minTurn = 4 } = {}) {
  const n = p.length, A = [], B = [], round = [];
  for (let i = 0; i < n; i++) {
    const a = p[(i - 1 + n) % n], b = p[i], c = p[(i + 1) % n];
    const la = Math.hypot(a[0] - b[0], a[1] - b[1]), lc = Math.hypot(c[0] - b[0], c[1] - b[1]);
    const turn = 180 - cornerAngle(p, i);
    round.push(turn >= minTurn);
    const ta = Math.min(radius, la * 0.45), tc = Math.min(radius, lc * 0.45);
    A.push([b[0] + ((a[0] - b[0]) / la) * ta, b[1] + ((a[1] - b[1]) / la) * ta]);
    B.push([b[0] + ((c[0] - b[0]) / lc) * tc, b[1] + ((c[1] - b[1]) / lc) * tc]);
  }
  const segs = [];
  const start = round[0] ? A[0] : p[0];
  segs.push({ type: 'move', x: r6(start[0]), y: r6(start[1]) });
  for (let i = 0; i < n; i++) {
    if (round[i]) {
      if (i > 0) segs.push({ type: 'line', x: r6(A[i][0]), y: r6(A[i][1]) });
      segs.push({ type: 'quadratic', cx: r6(p[i][0]), cy: r6(p[i][1]), x: r6(B[i][0]), y: r6(B[i][1]) });
    } else if (i > 0) segs.push({ type: 'line', x: r6(p[i][0]), y: r6(p[i][1]) });
  }
  segs.push({ type: 'close' });
  return segs;
}

/**
 * Straighten curves: every quadratic/cubic segment is replaced by three straight pieces
 * (start → tangent midpoint → tangent midpoint → end), i.e. the curve becomes a chamfered corner.
 */
export function chamferCurves(segments) {
  const out = []; let cur = null, changed = 0;
  for (const s of segments) {
    if (s.type === 'quadratic') {
      const m1 = [(cur[0] + s.cx) / 2, (cur[1] + s.cy) / 2], m2 = [(s.cx + s.x) / 2, (s.cy + s.y) / 2];
      out.push({ type: 'line', x: r6(m1[0]), y: r6(m1[1]) }, { type: 'line', x: r6(m2[0]), y: r6(m2[1]) }, { type: 'line', x: s.x, y: s.y });
      changed++;
    } else if (s.type === 'cubic') {
      const m1 = [(cur[0] + s.c1x) / 2, (cur[1] + s.c1y) / 2], m2 = [(s.c2x + s.x) / 2, (s.c2y + s.y) / 2];
      out.push({ type: 'line', x: r6(m1[0]), y: r6(m1[1]) }, { type: 'line', x: r6(m2[0]), y: r6(m2[1]) }, { type: 'line', x: s.x, y: s.y });
      changed++;
    } else out.push({ type: s.type, ...(s.type === 'close' ? {} : { x: s.x, y: s.y }) });
    if (s.type !== 'close') cur = [s.x, s.y];
  }
  return { segments: out, changed };
}

export function bounds(polys) {
  let x0 = Infinity, y0 = Infinity, x1 = -Infinity, y1 = -Infinity;
  for (const p of polys) for (const [x, y] of p) { x0 = Math.min(x0, x); y0 = Math.min(y0, y); x1 = Math.max(x1, x); y1 = Math.max(y1, y); }
  return { x0, y0, x1, y1, w: x1 - x0, h: y1 - y0 };
}

export const affine = (p, sx, sy, tx, ty) => p.map(([x, y]) => [x * sx + tx, y * sy + ty]);
export { EPS };

/**
 * Remove local loops that a mitred offset creates at tight concave corners: wherever two
 * non-adjacent edges cross, the polygon is split at the crossing and the part with the larger
 * area (same orientation as the input) is kept. Repeats until no crossing is left.
 */
export function removeLoops(p, maxPasses = 64) {
  let pts = p.slice();
  const sign = Math.sign(polyArea(p));
  const hit = (a, b, c, d) => {
    const r = [b[0] - a[0], b[1] - a[1]], s = [d[0] - c[0], d[1] - c[1]], den = r[0] * s[1] - r[1] * s[0];
    if (Math.abs(den) < 1e-12) return null;
    const t = ((c[0] - a[0]) * s[1] - (c[1] - a[1]) * s[0]) / den, u = ((c[0] - a[0]) * r[1] - (c[1] - a[1]) * r[0]) / den;
    return t > 1e-9 && t < 1 - 1e-9 && u > 1e-9 && u < 1 - 1e-9 ? [a[0] + r[0] * t, a[1] + r[1] * t] : null;
  };
  for (let pass = 0; pass < maxPasses; pass++) {
    const n = pts.length; let found = null;
    outer: for (let i = 0; i < n; i++) for (let j = i + 2; j < n; j++) {
      if (i === 0 && j === n - 1) continue;
      const x = hit(pts[i], pts[(i + 1) % n], pts[j], pts[(j + 1) % n]);
      if (x) { found = { i, j, x }; break outer; }
    }
    if (!found) return simplify(pts);
    const { i, j, x } = found;
    const a = [x, ...pts.slice(i + 1, j + 1)], b = [x, ...pts.slice(j + 1), ...pts.slice(0, i + 1)];
    const keep = [a, b].filter((q) => q.length >= 3 && Math.sign(polyArea(q)) === sign).sort((q, w) => Math.abs(polyArea(w)) - Math.abs(polyArea(q)))[0];
    if (!keep) return simplify(pts);
    pts = keep;
  }
  return simplify(pts);
}

/**
 * Pillow bowing: every edge longer than `minLength` is bent outward (away from the polygon's own
 * region) along a sine arc; the bend is `ratio` × edge length, capped at `max`. Used by Bubble to
 * turn flat sides into swollen ones.
 */
export function bowEdges(p, { ratio = 0.1, max = 10, minLength = 12, steps = 6, convexOnly = true } = {}) {
  const s = polyArea(p) > 0 ? 1 : -1, out = [];
  for (let i = 0; i < p.length; i++) {
    const a = p[i], b = p[(i + 1) % p.length], L = Math.hypot(b[0] - a[0], b[1] - a[1]);
    out.push(a);
    if (L < minLength) continue;
    // Only edges between two convex corners are outer sides; bending edges next to a concave corner
    // would fill the gaps between arms and legs (E, H, M, W) and cost legibility.
    if (convexOnly && !(isConvex(p, i) && isConvex(p, (i + 1) % p.length))) continue;
    const [dx, dy] = [(b[0] - a[0]) / L, (b[1] - a[1]) / L], n = [s * dy, -s * dx], h = Math.min(max, L * ratio);
    for (let k = 1; k < steps; k++) { const t = k / steps, off = h * Math.sin(Math.PI * t); out.push([a[0] + (b[0] - a[0]) * t + n[0] * off, a[1] + (b[1] - a[1]) * t + n[1] * off]); }
  }
  return out;
}

/** Chaikin corner cutting, `iterations` times: a smooth, organic outline. */
export function chaikin(p, iterations = 3) {
  let pts = p;
  for (let k = 0; k < iterations; k++) {
    const next = [];
    for (let i = 0; i < pts.length; i++) {
      const a = pts[i], b = pts[(i + 1) % pts.length];
      next.push([a[0] * 0.75 + b[0] * 0.25, a[1] * 0.75 + b[1] * 0.25], [a[0] * 0.25 + b[0] * 0.75, a[1] * 0.25 + b[1] * 0.75]);
    }
    pts = next;
  }
  return pts;
}

/** Douglas–Peucker on a closed polygon: drops points closer than `tol` to the simplified line. */
export function reducePoints(p, tol = 0.35) {
  const dp = (pts) => {
    if (pts.length < 3) return pts;
    const [a, b] = [pts[0], pts[pts.length - 1]], L = Math.hypot(b[0] - a[0], b[1] - a[1]) || 1e-9;
    let idx = 0, dmax = 0;
    for (let i = 1; i < pts.length - 1; i++) { const d = Math.abs((b[0] - a[0]) * (a[1] - pts[i][1]) - (a[0] - pts[i][0]) * (b[1] - a[1])) / L; if (d > dmax) { dmax = d; idx = i; } }
    return dmax > tol ? [...dp(pts.slice(0, idx + 1)).slice(0, -1), ...dp(pts.slice(idx))] : [a, b];
  };
  const half = Math.floor(p.length / 2);
  return [...dp(p.slice(0, half + 1)).slice(0, -1), ...dp([...p.slice(half), p[0]]).slice(0, -1)];
}
