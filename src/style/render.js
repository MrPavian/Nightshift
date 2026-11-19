// Style rendering (C03): the rendering axis and word-level composition.
// Rendering never changes geometry; it only decides how a resolved glyph is painted.
// Composition "bounce" only places glyphs in a word; it never changes a glyph's own shape.
import { contourToPolygon, polyArea, bounds } from './polygon.js';

const f = (n) => Math.round(n * 100) / 100;
const pathOf = (polys) => polys.map((p) => `M${p.map(([x, y]) => `${f(x)} ${f(y)}`).join(' L')}Z`).join(' ');

/** Glyph record (master or derived) -> polygons per contour. */
export function glyphPolygons(record) {
  return record.variants[0].geometry.contours.map((c) => ({ role: c.role, poly: contourToPolygon(c, 0.3) }));
}

/**
 * Highlight strokes: runs of outer-contour points whose outward normal faces the light (top left),
 * pulled `inset` units into the letter. Deterministic, derived from the shape itself.
 */
export function highlightRuns(polys, { inset = 7, light = [-0.6, -0.8], threshold = 0.55, minPoints = 4, keep = 0.6 } = {}) {
  const runs = [];
  for (const { role, poly } of polys) {
    if (role !== 'outer') continue;
    const s = polyArea(poly) > 0 ? 1 : -1, n = poly.length, lit = [];
    for (let i = 0; i < n; i++) {
      const a = poly[(i - 1 + n) % n], b = poly[(i + 1) % n], dx = b[0] - a[0], dy = b[1] - a[1], L = Math.hypot(dx, dy) || 1;
      const nx = (s * dy) / L, ny = (-s * dx) / L; // outward normal
      lit.push(nx * light[0] + ny * light[1] > threshold ? [poly[i][0] - nx * inset, poly[i][1] - ny * inset] : null);
    }
    // rotate so that we start on an unlit point, then collect consecutive lit runs
    const start = lit.findIndex((q) => q === null);
    if (start < 0) continue;
    let cur = [];
    for (let k = 1; k <= n; k++) {
      const q = lit[(start + k) % n];
      if (q) cur.push(q); else { if (cur.length >= minPoints) runs.push(cur.slice(0, Math.max(2, Math.round(cur.length * keep)))); cur = []; }
    }
  }
  return runs;
}

/**
 * Paint one glyph. rendering: { fill, outline: { color, width } | null, depth: { dx, dy, color } | null, highlights: bool }.
 * Returns an SVG <g> string in glyph units.
 */
export function paintGlyph(record, rendering = {}, transform = '') {
  const polys = glyphPolygons(record), d = pathOf(polys.map((p) => p.poly));
  const { fill = '#111', outline = null, depth = null, highlights = false } = rendering;
  const ow = outline?.width ?? 0;
  let s = `<g data-glyph-id="${record.glyphId}" data-geometry-hash="${record.variants[0].geometryHash}"${transform ? ` transform="${transform}"` : ''}>`;
  if (depth) s += `<path d="${d}" transform="translate(${depth.dx} ${depth.dy})" fill="${depth.color}" stroke="${depth.color}" stroke-width="${f(ow * 1.6)}" stroke-linejoin="round" fill-rule="evenodd"/>`;
  s += `<path d="${d}" fill="${fill}" fill-rule="evenodd"${outline ? ` stroke="${outline.color}" stroke-width="${ow}" stroke-linejoin="round" paint-order="stroke"` : ''}/>`;
  if (highlights) for (const r of highlightRuns(polys)) s += `<path d="M${r.map(([x, y]) => `${f(x)} ${f(y)}`).join(' L')}" fill="none" stroke="#fff" stroke-width="3.6" stroke-linecap="round" stroke-linejoin="round" opacity=".92"/>`;
  return s + '</g>';
}

export const WORD_LAYOUT_VERSION = 'word-layout/1.1.0'; // 1.1.0: Bounce collision safety on transformed contours

/**
 * Place resolved glyphs in a word. composition: 'neutral' | 'bounce' (others are placed neutrally;
 * their glyph-level part, e.g. block-fit, is already in the geometry). Returns [{ record, x, y, rotate, box, ... }].
 */
export function layoutWord(records, composition = 'neutral', params = {}, opts = {}) {
  return layoutWordWithReport(records, composition, params, opts).items;
}

const rotateAbout = (deg, cx, cy) => {
  const a = (deg * Math.PI) / 180, c = Math.cos(a), s = Math.sin(a);
  return ([x, y]) => [cx + (x - cx) * c - (y - cy) * s, cy + (x - cx) * s + (y - cy) * c];
};
/** Outer contours of a placed glyph in word coordinates: rotate about the box centre, then translate. */
function placedOuter(rec, it) {
  const r = rotateAbout(it.rotate, (it.box.x0 + it.box.x1) / 2, (it.box.y0 + it.box.y1) / 2);
  return glyphPolygons(rec).filter((p) => p.role === 'outer').map((p) => p.poly.map((pt) => { const [x, y] = r(pt); return [x + it.x, y + it.y]; }));
}
const bboxOf = (polys) => { const xs = polys.flat().map((p) => p[0]), ys = polys.flat().map((p) => p[1]); return { x0: Math.min(...xs), y0: Math.min(...ys), x1: Math.max(...xs), y1: Math.max(...ys) }; };
const boxGap = (a, b) => Math.hypot(Math.max(0, a.x0 - b.x1, b.x0 - a.x1), Math.max(0, a.y0 - b.y1, b.y0 - a.y1));
const cross = (o, a, b) => (a[0] - o[0]) * (b[1] - o[1]) - (a[1] - o[1]) * (b[0] - o[0]);
function segIntersect(p, q, r, s) {
  const d1 = cross(r, s, p), d2 = cross(r, s, q), d3 = cross(p, q, r), d4 = cross(p, q, s);
  if (((d1 > 0 && d2 < 0) || (d1 < 0 && d2 > 0)) && ((d3 > 0 && d4 < 0) || (d3 < 0 && d4 > 0))) {
    const t = d1 / (d1 - d2);
    return [p[0] + t * (q[0] - p[0]), p[1] + t * (q[1] - p[1])];
  }
  return null;
}
const ptSeg = ([px, py], [ax, ay], [bx, by]) => {
  const dx = bx - ax, dy = by - ay, l = dx * dx + dy * dy;
  const t = l ? Math.max(0, Math.min(1, ((px - ax) * dx + (py - ay) * dy) / l)) : 0;
  return Math.hypot(px - ax - t * dx, py - ay - t * dy);
};
const inPoly = ([x, y], q) => { let c = false; for (let i = 0, j = q.length - 1; i < q.length; j = i++) { const [xi, yi] = q[i], [xj, yj] = q[j]; if ((yi > y) !== (yj > y) && x < ((xj - xi) * (y - yi)) / (yj - yi) + xi) c = !c; } return c; };

/** Exact contact test between two placed glyphs (outer contours): intersection, overlap region, clearance. */
function contact(A, B, reach) {
  const bA = bboxOf(A), bB = bboxOf(B);
  if (boxGap(bA, bB) > reach) return { intersects: false, clearance: Math.round(boxGap(bA, bB) * 1000) / 1000, clearanceKind: 'lower-bound (bounding boxes)', overlapBox: null };
  const pts = [];
  let min = Infinity;
  const near = (q, box) => q.map((p, i) => [p, q[(i + 1) % q.length]]).filter(([p, n]) => boxGap({ x0: Math.min(p[0], n[0]), y0: Math.min(p[1], n[1]), x1: Math.max(p[0], n[0]), y1: Math.max(p[1], n[1]) }, box) <= reach);
  const sa = A.flatMap((q) => near(q, bB)), sb = B.flatMap((q) => near(q, bA));
  for (const [p, q] of sa) for (const [r, s] of sb) {
    const x = segIntersect(p, q, r, s);
    if (x) { pts.push(x); min = 0; continue; }
    if (min > 0) min = Math.min(min, ptSeg(p, r, s), ptSeg(q, r, s), ptSeg(r, p, q), ptSeg(s, p, q));
  }
  for (const q of A) for (const p of q) if (B.some((o) => inPoly(p, o))) pts.push(p);
  for (const q of B) for (const p of q) if (A.some((o) => inPoly(p, o))) pts.push(p);
  const intersects = pts.length > 0;
  return { intersects, clearance: intersects ? 0 : Math.round(min * 1000) / 1000, clearanceKind: 'exact (flattened contours)', overlapBox: intersects ? bboxOf([pts]) : null };
}

/**
 * Word layout plus a deterministic placement report.
 * Bounce: tilt and shift per letter; the preferred x-step (overlapRatio) is only a preference. Each glyph is
 * tested on its transformed contours against every earlier glyph. Intersection, tangency or clearance below
 * minClearance is rejected unless opts.relationships declares an overlap for exactly that pair and region;
 * otherwise the glyph steps right by stepIncrement until it is safe.
 * opts.relationships: [{ id, a, b, type: 'overlap', region: {x0,y0,x1,y1}, layer: 'a-over-b'|'b-over-a' }]
 * with a/b = glyph-instance IDs `inst.<index>.<glyphId>`. opts.collisionPolicy: 'no-contact' (default) or
 * 'legacy-unchecked' (only to reproduce the pre-1.1 behaviour for before/after proofs).
 */
export function layoutWordWithReport(records, composition = 'neutral', params = {}, { gap = 10, relationships = [], collisionPolicy = 'no-contact' } = {}) {
  const inst = (i) => `inst.${i}.${records[i].glyphId}`;
  if (composition !== 'bounce') {
    let x = 0;
    const items = records.map((rec, i) => {
      const b = bounds(glyphPolygons(rec).map((p) => p.poly));
      const placed = { record: rec, instanceId: inst(i), x: x - b.x0, y: 0, rotate: 0, box: b };
      x += b.w + gap;
      return placed;
    });
    return { items, report: { layoutVersion: WORD_LAYOUT_VERSION, composition: 'neutral', collisionPolicy: 'not-applicable (fixed gap)', gap, pairs: [] } };
  }
  const tilt = params.tiltDeg ?? [-3, 4], shift = params.shiftY ?? [5, -6], overlapRatio = params.overlapRatio ?? 0.12;
  const minClearance = params.minClearance ?? 4, inc = params.stepIncrement ?? 1, maxExtra = params.maxExtraSteps ?? 120;
  const errorBound = 0.6; // two contours flattened at 0.3 units each
  const items = [], outer = [], pairs = [];
  let cursor = 0;
  records.forEach((rec, i) => {
    const b = bounds(glyphPolygons(rec).map((p) => p.poly));
    const base = { record: rec, instanceId: inst(i), y: shift[i % shift.length], rotate: tilt[i % tilt.length], box: b };
    const at = (extra) => { const it = { ...base, x: cursor + extra * inc - b.x0 }; return { it, poly: placedOuter(rec, it) }; };
    const judge = (poly) => {
      const entries = [];
      outer.forEach((prev, k) => {
        const c = contact(prev, poly, minClearance + errorBound + 1);
        const cls = c.intersects ? 'intersection' : c.clearance <= errorBound ? 'tangency' : c.clearance < minClearance ? 'too-close' : 'safe';
        let authorizedBy = null;
        if (cls !== 'safe') {
          const rel = relationships.find((r) => r.type === 'overlap' && ((r.a === inst(k) && r.b === inst(i)) || (r.a === inst(i) && r.b === inst(k))));
          const box = c.overlapBox;
          if (rel && box && box.x0 >= rel.region.x0 && box.y0 >= rel.region.y0 && box.x1 <= rel.region.x1 && box.y1 <= rel.region.y1) authorizedBy = rel.id;
        }
        const entry = { a: inst(k), b: inst(i), class: authorizedBy ? 'authorized-overlap' : cls, clearance: c.clearance, clearanceKind: c.clearanceKind, ...(authorizedBy ? { authorizedBy } : {}) };
        entries.push(entry);
      });
      // Report the blocking contact if any, otherwise the closest neighbour (exact measurements first).
      const blocking = entries.filter((e) => e.class !== 'safe' && e.class !== 'authorized-overlap');
      const pool = blocking.length ? blocking : entries;
      return pool.slice().sort((x, y) => (x.clearanceKind.startsWith('exact') ? 0 : 1) - (y.clearanceKind.startsWith('exact') ? 0 : 1) || x.clearance - y.clearance)[0] ?? null;
    };
    let chosen = at(0), verdict = i ? judge(chosen.poly) : null, extra = 0;
    const preferred = verdict;
    if (i && collisionPolicy === 'no-contact') {
      while (verdict && verdict.class !== 'safe' && verdict.class !== 'authorized-overlap' && extra < maxExtra) {
        extra++; chosen = at(extra); verdict = judge(chosen.poly);
      }
    }
    if (i) {
      const ok = !verdict || verdict.class === 'safe' || verdict.class === 'authorized-overlap';
      pairs.push({
        a: inst(i - 1), b: inst(i), errorBound, minClearance,
        preferred: { overlapRatio, class: preferred?.class ?? 'safe', clearance: preferred?.clearance ?? null, against: preferred?.a ?? null },
        accepted: { extraSteps: extra, shift: extra * inc, class: verdict?.class ?? 'safe', clearance: verdict?.clearance ?? null, against: verdict?.a ?? null, ...(verdict?.authorizedBy ? { authorizedBy: verdict.authorizedBy } : {}) },
        result: collisionPolicy !== 'no-contact' ? 'unchecked (legacy)' : ok ? (extra ? 'moved-to-safe' : 'preferred-accepted') : 'unsafe-max-steps',
      });
    }
    items.push(chosen.it);
    outer.push(chosen.poly);
    cursor = chosen.it.x + b.x0 + b.w * (1 - overlapRatio);
  });
  return { items, report: { layoutVersion: WORD_LAYOUT_VERSION, composition: 'bounce', collisionPolicy, params: { tiltDeg: tilt, shiftY: shift, overlapRatio, minClearance, stepIncrement: inc, maxExtraSteps: maxExtra }, relationships: relationships.map((r) => r.id), channels: 'none-declared', pairs } };
}
