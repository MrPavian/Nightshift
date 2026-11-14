// Adaptive curve flattening with a certified error bound.
//
// Bound: a Bézier piece lies in the convex hull of its control points. If every
// control point is within `e` of the chord segment, the whole piece is within
// `e` of that chord (the chord is convex, so the e-neighbourhood is convex and
// contains the hull). Subdivision continues until e <= tolerance.
// Line segments are exact (errorBound 0).

const MAX_DEPTH = 24;

/** Distance from point p to segment ab. */
export function pointSegmentDistance(px, py, ax, ay, bx, by) {
  const dx = bx - ax, dy = by - ay;
  const len2 = dx * dx + dy * dy;
  let t = len2 === 0 ? 0 : ((px - ax) * dx + (py - ay) * dy) / len2;
  t = Math.max(0, Math.min(1, t));
  const cx = ax + t * dx, cy = ay + t * dy;
  return Math.hypot(px - cx, py - cy);
}

function splitQuad(p) {
  const [p0, p1, p2] = p;
  const a = mid(p0, p1), b = mid(p1, p2), m = mid(a, b);
  return [[p0, a, m], [m, b, p2]];
}
function splitCubic(p) {
  const [p0, p1, p2, p3] = p;
  const a = mid(p0, p1), b = mid(p1, p2), c = mid(p2, p3);
  const d = mid(a, b), e = mid(b, c), m = mid(d, e);
  return [[p0, a, d, m], [m, e, c, p3]];
}
const mid = (a, b) => [(a[0] + b[0]) / 2, (a[1] + b[1]) / 2];

function hullError(ctrl) {
  const a = ctrl[0], b = ctrl[ctrl.length - 1];
  let e = 0;
  for (let i = 1; i < ctrl.length - 1; i++) e = Math.max(e, pointSegmentDistance(ctrl[i][0], ctrl[i][1], a[0], a[1], b[0], b[1]));
  return e;
}

function flattenCurve(ctrl, tol, out, depth = 0) {
  const e = hullError(ctrl);
  if (e <= tol || depth >= MAX_DEPTH) {
    out.push({ to: ctrl[ctrl.length - 1], errorBound: e });
    return;
  }
  const [l, r] = ctrl.length === 3 ? splitQuad(ctrl) : splitCubic(ctrl);
  flattenCurve(l, tol, out, depth + 1);
  flattenCurve(r, tol, out, depth + 1);
}

/**
 * Flatten one canonical contour into a closed polygon.
 * @returns {{contourId:string, points:number[][], edges:{a:number,b:number,segmentId:string,segIndex:number,errorBound:number}[], maxError:number, closed:boolean}}
 */
export function flattenContour(contour, tolerance) {
  const points = [];
  const edges = [];
  let start = null, cur = null, segIndex = 0;
  const pushEdge = (to, segmentId, errorBound) => {
    points.push(to);
    edges.push({ a: points.length - 2, b: points.length - 1, segmentId, segIndex, errorBound });
  };
  for (const s of contour.segments) {
    if (s.type === 'move') { start = cur = [s.x, s.y]; points.push(cur); segIndex++; continue; }
    if (s.type === 'line') pushEdge([s.x, s.y], s.segmentId, 0);
    else if (s.type === 'quadratic' || s.type === 'cubic') {
      const ctrl = s.type === 'quadratic' ? [cur, [s.cx, s.cy], [s.x, s.y]] : [cur, [s.c1x, s.c1y], [s.c2x, s.c2y], [s.x, s.y]];
      const pieces = [];
      flattenCurve(ctrl, tolerance, pieces);
      // Snap the final piece to the exact on-curve node.
      pieces[pieces.length - 1].to = [s.x, s.y];
      for (const p of pieces) pushEdge(p.to, s.segmentId, p.errorBound);
    } else if (s.type === 'close') {
      if (cur[0] !== start[0] || cur[1] !== start[1]) {
        points.push(start);
        edges.push({ a: points.length - 2, b: points.length - 1, segmentId: s.segmentId, segIndex, errorBound: 0 });
      } else {
        // Zero-length close: keep segment identity on the polygon's last edge.
        edges[edges.length - 1].closeSegmentId = s.segmentId;
      }
      // Polygon closes onto vertex 0: drop the duplicated start point.
      points.pop();
      edges[edges.length - 1].b = 0;
      segIndex++;
      continue;
    }
    if (s.type !== 'close') cur = [s.x, s.y];
    segIndex++;
  }
  const closed = contour.segments.at(-1)?.type === 'close';
  if (!closed && edges.length) {
    // Open contour: polygon is not closed; leave as polyline.
  }
  return { contourId: contour.contourId, points, edges, maxError: edges.reduce((m, e) => Math.max(m, e.errorBound), 0), closed };
}
