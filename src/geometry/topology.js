// Planar contour analysis for canonical glyph geometry (Ticket 0.7A-T04).
//
// Pure geometry: no glyph semantics. Given contours (with roles) it reports
// degeneracies, certified intersections, containment, fill-rule behaviour at
// certified interior sample points, connectivity and boundary distances.
// Every measurement carries an error bound derived from curve flattening.

import { flattenContour } from './flatten.js';
import { signedArea } from './area.js';
import { segmentsIntersect, segmentDistance, windingNumber, distanceToPolygon, orient } from './predicates.js';

const EPS = 1e-9;

/**
 * @param {object[]} contours canonical contours {contourId, role, closed, segments}
 * @param {{flatteningTolerance:number, refinementFactor:number, maxRefinements:number}} numerical
 */
export function analyseContours(contours, numerical) {
  let tol = numerical.flatteningTolerance;
  let result;
  for (let round = 0; round <= numerical.maxRefinements; round++) {
    result = analyseAt(contours, tol);
    certifyStraddlingCrossings(result);
    result.flatteningTolerance = tol;
    result.refinementRounds = round;
    if (!result.intersections.some((x) => x.certainty === 'uncertain')) break;
    tol /= numerical.refinementFactor;
  }
  return result;
}

/**
 * Jordan-curve certificate: if contour P has an exact on-curve node strictly
 * inside contour Q and another strictly outside (both farther than Q's error
 * bound), P and Q must cross. Uncertain candidate pairs between such contours
 * collapse into one certain crossing, without further refinement.
 */
function certifyStraddlingCrossings(result) {
  const polys = result._polys;
  const nodes = (p) => p.contour.segments.filter((s) => s.type !== 'close').map((s) => [s.x, s.y]);
  const straddles = (P, Q) => {
    let inside = false, outside = false;
    for (const n of nodes(P)) {
      if (distanceToPolygon(n, Q) <= EPS) continue;
      if (windingNumber(n, Q.points) !== 0) inside = true; else outside = true;
    }
    return inside && outside;
  };
  const groups = new Map();
  const keep = [];
  for (const x of result.intersections) {
    if (x.kind !== 'cross') { keep.push(x); continue; }
    const key = x.contourIds.join('|');
    if (!groups.has(key)) {
      const [P, Q] = x.contourIds.map((id) => polys.find((p) => p.contourId === id));
      groups.set(key, { certified: straddles(P, Q) || straddles(Q, P), items: [] });
    }
    groups.get(key).items.push(x);
  }
  for (const [, g] of groups) {
    if (!g.certified) { keep.push(...g.items); continue; }
    keep.push({
      kind: 'cross',
      certainty: 'certain',
      certifiedBy: 'node-straddle',
      contourIds: g.items[0].contourIds,
      segmentIds: [...new Set(g.items.flatMap((x) => x.segmentIds))].sort(),
      point: g.items.find((x) => x.certainty === 'certain')?.point ?? g.items[0].point,
    });
  }
  result.intersections = keep;
}

function analyseAt(contours, tol) {
  const polys = contours.map((c) => ({ ...flattenContour(c, tol), role: c.role, contour: c }));
  return {
    polygons: polys.map((p) => ({ contourId: p.contourId, vertexCount: p.points.length, maxError: p.maxError })),
    degeneracies: contours.flatMap(degeneracies),
    intersections: findIntersections(polys),
    ...containmentAndFill(polys),
    proximity: boundaryProximity(polys),
    _polys: polys,
  };
}

/** Exact degeneracy checks on canonical segments (no tolerance needed). */
function degeneracies(c) {
  const out = [];
  if (!c.closed) out.push({ kind: 'unclosed', contourId: c.contourId, affectedIds: [c.contourId] });
  let start = null, cur = null;
  for (const s of c.segments) {
    if (s.type === 'move') { start = cur = [s.x, s.y]; continue; }
    const to = s.type === 'close' ? start : [s.x, s.y];
    if (to[0] === cur[0] && to[1] === cur[1] && !(s.type === 'close')) {
      out.push({ kind: 'zero-length-segment', contourId: c.contourId, affectedIds: [s.segmentId] });
    }
    if (s.type === 'quadratic' && ((s.cx === cur[0] && s.cy === cur[1]) || (s.cx === s.x && s.cy === s.y))) {
      out.push({ kind: 'zero-length-handle', contourId: c.contourId, affectedIds: [s.segmentId] });
    }
    if (s.type === 'cubic' && ((s.c1x === cur[0] && s.c1y === cur[1]) || (s.c2x === s.x && s.c2y === s.y))) {
      out.push({ kind: 'zero-length-handle', contourId: c.contourId, affectedIds: [s.segmentId] });
    }
    cur = to;
  }
  if (c.closed && signedArea(c.segments) === 0) out.push({ kind: 'zero-area-contour', contourId: c.contourId, affectedIds: [c.contourId] });
  return out;
}

const shareVertex = (e, f) => e.a === f.a || e.a === f.b || e.b === f.a || e.b === f.b;

/**
 * Certified intersection search. Two true boundary pieces can only meet if
 * their flattened edges are within eA + eB of each other.
 *  - exact edges (e = 0): orientation predicates decide;
 *  - otherwise: distance > eA + eB certifies "disjoint"; else "uncertain"
 *    (the caller refines the flattening and retries).
 */
function findIntersections(polys) {
  const hits = new Map();
  const record = (pa, ea, pb, eb, certainty, point) => {
    const key = [pa.contourId, ea.segmentId, pb.contourId, eb.segmentId].join('|');
    if (hits.has(key) && hits.get(key).certainty === 'certain') return;
    hits.set(key, {
      kind: pa === pb ? 'self' : 'cross',
      certainty,
      contourIds: pa === pb ? [pa.contourId] : [pa.contourId, pb.contourId],
      segmentIds: [ea.segmentId, eb.segmentId],
      point,
    });
  };
  for (let i = 0; i < polys.length; i++) {
    for (let j = i; j < polys.length; j++) {
      const A = polys[i], B = polys[j];
      for (let x = 0; x < A.edges.length; x++) {
        for (let y = A === B ? x + 1 : 0; y < B.edges.length; y++) {
          const e = A.edges[x], f = B.edges[y];
          const a0 = A.points[e.a], a1 = A.points[e.b], b0 = B.points[f.a], b1 = B.points[f.b];
          if (A === B && shareVertex(e, f)) {
            // Adjacent edges only "intersect" if they fold back onto each other.
            const shared = e.b === f.a ? a1 : e.a === f.b ? a0 : null;
            if (shared && e.errorBound === 0 && f.errorBound === 0) {
              const other = e.b === f.a ? b1 : b0;
              const prev = e.b === f.a ? a0 : a1;
              if (orient(prev, shared, other) === 0 && (prev[0] - shared[0]) * (other[0] - shared[0]) + (prev[1] - shared[1]) * (other[1] - shared[1]) > 0) {
                record(A, e, B, f, 'certain', shared);
              }
            }
            continue;
          }
          const bound = e.errorBound + f.errorBound;
          if (bound === 0) {
            if (segmentsIntersect(a0, a1, b0, b1)) record(A, e, B, f, 'certain', segmentDistance(a0, a1, b0, b1).pair[0]);
          } else {
            const d = segmentDistance(a0, a1, b0, b1);
            if (d.distance <= bound + EPS) record(A, e, B, f, 'uncertain', d.pair[0]);
          }
        }
      }
    }
  }
  return [...hits.values()];
}

/** Containment tree + fill-rule evaluation at certified sample points. */
function containmentAndFill(polys) {
  const containment = polys.map((p) => {
    // Use on-curve nodes (exactly on the true boundary) as probes.
    const probes = p.contour.segments.filter((s) => s.type !== 'close').map((s) => [s.x, s.y]);
    const containers = [];
    let certain = true;
    for (const q of polys) {
      if (q === p) continue;
      let decided = null;
      for (const pt of probes) {
        if (distanceToPolygon(pt, q) > EPS) { decided = windingNumber(pt, q.points) !== 0; break; }
      }
      if (decided === null) certain = false;
      else if (decided) containers.push(q.contourId);
    }
    return { contourId: p.contourId, containedBy: containers, certain };
  });
  const depth = new Map(containment.map((c) => [c.contourId, c.containedBy.length]));
  const parentOf = (c) => c.containedBy.reduce((best, id) => (best === null || depth.get(id) > depth.get(best) ? id : best), null);
  for (const c of containment) c.parent = parentOf(c);

  // Interior sample of each contour's own face (inside it, outside its children).
  const samples = polys.map((p) => {
    const children = polys.filter((q) => containment.find((c) => c.contourId === q.contourId).parent === p.contourId);
    const s = sampleFace(p, children);
    if (!s) return { contourId: p.contourId, point: null };
    const windings = polys.map((q) => windingNumber(s.point, q.points));
    const sum = windings.reduce((a, b) => a + b, 0);
    const insideCount = windings.filter((w) => w !== 0).length;
    return {
      contourId: p.contourId,
      point: s.point,
      margin: s.margin,
      windingSum: sum,
      filled: { nonzero: sum !== 0, evenodd: insideCount % 2 === 1 },
    };
  });
  return { containment, samples };
}

/** Point inside polygon p but outside each child polygon, with certified margin. */
function sampleFace(p, children) {
  const all = [p, ...children];
  const ys = p.points.map((pt) => pt[1]);
  const minY = Math.min(...ys), maxY = Math.max(...ys);
  let best = null;
  for (let k = 1; k <= 31; k++) {
    const y = minY + (maxY - minY) * ((k - 0.5 + 0.0137) / 31.03);
    const xs = [];
    for (const poly of all) {
      for (const e of poly.edges) {
        const a = poly.points[e.a], b = poly.points[e.b];
        if ((a[1] <= y && b[1] > y) || (b[1] <= y && a[1] > y)) xs.push(a[0] + ((y - a[1]) / (b[1] - a[1])) * (b[0] - a[0]));
      }
    }
    xs.sort((u, v) => u - v);
    for (let i = 0; i + 1 < xs.length; i++) {
      const pt = [(xs[i] + xs[i + 1]) / 2, y];
      if (windingNumber(pt, p.points) === 0) continue;
      if (children.some((c) => windingNumber(pt, c.points) !== 0)) continue;
      const margin = Math.min(...all.map((poly) => distanceToPolygon(pt, poly)));
      if (margin > EPS && (!best || margin > best.margin)) best = { point: pt, margin };
    }
  }
  return best;
}

/**
 * Boundary distances:
 *  - between different contours (e.g. counter wall thickness);
 *  - within one contour between non-adjacent original segments (local
 *    thickness/neck candidates). Reported as measurements only.
 */
// Same-contour pairs whose closest points are joined by a boundary arc no
// longer than ARC_RATIO × distance measure a corner, not a wall or gap; they
// are omitted from the proximity report. Reporting filter, not a threshold.
const ARC_RATIO = 1.5;

function arcPositions(poly) {
  const cum = [0];
  for (const e of poly.edges) {
    const a = poly.points[e.a], b = poly.points[e.b];
    cum.push(cum[cum.length - 1] + Math.hypot(b[0] - a[0], b[1] - a[1]));
  }
  return cum;
}
const arcAt = (poly, cum, i, p) => {
  const e = poly.edges[i], a = poly.points[e.a];
  return cum[i] + Math.hypot(p[0] - a[0], p[1] - a[1]);
};

function boundaryProximity(polys) {
  const pairs = [];
  for (let i = 0; i < polys.length; i++) {
    for (let j = i; j < polys.length; j++) {
      const A = polys[i], B = polys[j];
      const nSeg = A.contour.segments.length;
      const best = new Map();
      const cum = A === B ? arcPositions(A) : null;
      const total = cum ? cum[cum.length - 1] : 0;
      for (let ei = 0; ei < A.edges.length; ei++) {
        const e = A.edges[ei];
        for (let fi = 0; fi < B.edges.length; fi++) {
          const f = B.edges[fi];
          if (A === B) {
            const d = Math.abs(e.segIndex - f.segIndex);
            // same or adjacent original segments (cyclic, skipping the move at index 0)
            if (d <= 1 || d === nSeg - 2) continue;
            if (e.segIndex > f.segIndex) continue;
          }
          const r = segmentDistance(A.points[e.a], A.points[e.b], B.points[f.a], B.points[f.b]);
          if (cum) {
            const d = Math.abs(arcAt(A, cum, ei, r.pair[0]) - arcAt(A, cum, fi, r.pair[1]));
            if (Math.min(d, total - d) <= ARC_RATIO * r.distance) continue;
          }
          const key = `${e.segmentId}|${f.segmentId}`;
          const errorBound = e.errorBound + f.errorBound;
          if (!best.has(key) || r.distance < best.get(key).distance) {
            best.set(key, { contourIds: A === B ? [A.contourId] : [A.contourId, B.contourId], segmentIds: [e.segmentId, f.segmentId], distance: r.distance, closestPointPair: r.pair, errorBound });
          }
        }
      }
      for (const v of best.values()) pairs.push(v);
    }
  }
  return pairs.sort((x, y) => x.distance - y.distance || x.segmentIds.join().localeCompare(y.segmentIds.join()));
}
