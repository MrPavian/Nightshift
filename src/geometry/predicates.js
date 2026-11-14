// Deterministic 2D predicates over flattened polygons.
// Orientation tests are exact for the integer-valued legacy coordinates (all
// products stay far below 2^53); for curve-derived points they are ordinary
// doubles and are only trusted together with the recorded error bounds.

import { pointSegmentDistance } from './flatten.js';

export const orient = (a, b, c) => (b[0] - a[0]) * (c[1] - a[1]) - (b[1] - a[1]) * (c[0] - a[0]);

const onSegment = (a, b, p) =>
  Math.min(a[0], b[0]) <= p[0] && p[0] <= Math.max(a[0], b[0]) &&
  Math.min(a[1], b[1]) <= p[1] && p[1] <= Math.max(a[1], b[1]);

/** True if closed segments ab and cd share at least one point. */
export function segmentsIntersect(a, b, c, d) {
  const o1 = orient(a, b, c), o2 = orient(a, b, d), o3 = orient(c, d, a), o4 = orient(c, d, b);
  if (((o1 > 0 && o2 < 0) || (o1 < 0 && o2 > 0)) && ((o3 > 0 && o4 < 0) || (o3 < 0 && o4 > 0))) return true;
  if (o1 === 0 && onSegment(a, b, c)) return true;
  if (o2 === 0 && onSegment(a, b, d)) return true;
  if (o3 === 0 && onSegment(c, d, a)) return true;
  if (o4 === 0 && onSegment(c, d, b)) return true;
  return false;
}

/** Minimum distance between segments ab and cd, with a closest point pair. */
export function segmentDistance(a, b, c, d) {
  if (segmentsIntersect(a, b, c, d)) {
    return { distance: 0, pair: [intersectionPoint(a, b, c, d), intersectionPoint(a, b, c, d)] };
  }
  const cands = [
    [pointSegmentDistance(a[0], a[1], c[0], c[1], d[0], d[1]), a, closest(a, c, d)],
    [pointSegmentDistance(b[0], b[1], c[0], c[1], d[0], d[1]), b, closest(b, c, d)],
    [pointSegmentDistance(c[0], c[1], a[0], a[1], b[0], b[1]), closest(c, a, b), c],
    [pointSegmentDistance(d[0], d[1], a[0], a[1], b[0], b[1]), closest(d, a, b), d],
  ];
  cands.sort((x, y) => x[0] - y[0]);
  const best = { distance: cands[0][0], pair: [cands[0][1], cands[0][2]] };
  // Parallel segments attain the minimum along an interval: report the pair at
  // the middle of the overlap (stable and representative, not an arbitrary end).
  const ux = b[0] - a[0], uy = b[1] - a[1], vx = d[0] - c[0], vy = d[1] - c[1];
  const len2 = ux * ux + uy * uy;
  if (len2 > 0 && ux * vy - uy * vx === 0) {
    const tc = ((c[0] - a[0]) * ux + (c[1] - a[1]) * uy) / len2;
    const td = ((d[0] - a[0]) * ux + (d[1] - a[1]) * uy) / len2;
    const lo = Math.max(0, Math.min(tc, td)), hi = Math.min(1, Math.max(tc, td));
    if (hi > lo) {
      const t = (lo + hi) / 2;
      const p = [a[0] + t * ux, a[1] + t * uy];
      const q = closest(p, c, d);
      const dist = Math.hypot(p[0] - q[0], p[1] - q[1]);
      if (Math.abs(dist - best.distance) <= 1e-9 * Math.max(1, best.distance)) return { distance: best.distance, pair: [p, q] };
    }
  }
  return best;
}

function closest(p, a, b) {
  const dx = b[0] - a[0], dy = b[1] - a[1];
  const len2 = dx * dx + dy * dy;
  const t = len2 === 0 ? 0 : Math.max(0, Math.min(1, ((p[0] - a[0]) * dx + (p[1] - a[1]) * dy) / len2));
  return [a[0] + t * dx, a[1] + t * dy];
}

function intersectionPoint(a, b, c, d) {
  const den = (a[0] - b[0]) * (c[1] - d[1]) - (a[1] - b[1]) * (c[0] - d[0]);
  if (den === 0) {
    // Collinear overlap: return an endpoint lying on the other segment.
    for (const [p, s, e] of [[c, a, b], [d, a, b], [a, c, d], [b, c, d]]) if (orient(s, e, p) === 0 && onSegment(s, e, p)) return p;
    return a;
  }
  const t = ((a[0] - c[0]) * (c[1] - d[1]) - (a[1] - c[1]) * (c[0] - d[0])) / den;
  return [a[0] + t * (b[0] - a[0]), a[1] + t * (b[1] - a[1])];
}

/** Winding number of point p with respect to a closed polygon (points in order). */
export function windingNumber(p, points) {
  let w = 0;
  for (let i = 0; i < points.length; i++) {
    const a = points[i], b = points[(i + 1) % points.length];
    if (a[1] <= p[1]) {
      if (b[1] > p[1] && orient(a, b, p) > 0) w++;
    } else if (b[1] <= p[1] && orient(a, b, p) < 0) w--;
  }
  return w;
}

/** Minimum distance from point p to a polygon boundary. */
export function distanceToPolygon(p, poly) {
  let m = Infinity;
  for (const e of poly.edges) {
    const a = poly.points[e.a], b = poly.points[e.b];
    m = Math.min(m, pointSegmentDistance(p[0], p[1], a[0], a[1], b[0], b[1]) - e.errorBound);
  }
  return m;
}

/**
 * A point strictly inside a closed polygon, chosen deterministically: the
 * midpoint of the widest interior interval on a few horizontal scanlines.
 * Returns {point, margin} where margin is the certified distance to the boundary.
 */
export function interiorPoint(poly, others = []) {
  const ys = poly.points.map((p) => p[1]);
  const minY = Math.min(...ys), maxY = Math.max(...ys);
  let best = null;
  for (let k = 1; k <= 15; k++) {
    // Irrational-ish offset avoids scanlines through integer vertices.
    const y = minY + (maxY - minY) * ((k - 0.5 + 0.0137) / 15.03);
    const xs = [];
    for (const e of poly.edges) {
      const a = poly.points[e.a], b = poly.points[e.b];
      if ((a[1] <= y && b[1] > y) || (b[1] <= y && a[1] > y)) xs.push(a[0] + ((y - a[1]) / (b[1] - a[1])) * (b[0] - a[0]));
    }
    xs.sort((u, v) => u - v);
    for (let i = 0; i + 1 < xs.length; i += 2) {
      const p = [(xs[i] + xs[i + 1]) / 2, y];
      const margin = Math.min(distanceToPolygon(p, poly), ...others.map((o) => distanceToPolygon(p, o)));
      if (!best || margin > best.margin) best = { point: p, margin };
    }
  }
  return best;
}
