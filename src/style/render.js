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

/**
 * Place resolved glyphs in a word. composition: 'neutral' | 'bounce' (others are placed neutrally;
 * their glyph-level part, e.g. block-fit, is already in the geometry). Returns [{ record, x, y, rotate, box }].
 */
export function layoutWord(records, composition = 'neutral', params = {}, { gap = 10 } = {}) {
  let x = 0;
  return records.map((rec, i) => {
    const b = bounds(glyphPolygons(rec).map((p) => p.poly));
    let y = 0, rotate = 0, step = b.w + gap;
    if (composition === 'bounce') {
      const tilt = params.tiltDeg ?? [-3, 4], shift = params.shiftY ?? [5, -6];
      rotate = tilt[i % tilt.length]; y = shift[i % shift.length];
      step = b.w * (1 - (params.overlapRatio ?? 0.12));
    }
    const placed = { record: rec, x: x - b.x0, y, rotate, box: b };
    x += step;
    return placed;
  });
}
