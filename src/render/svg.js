// Topology-correct monochrome SVG output (Ticket 0.7A-T05).
//
// Fill and outline both use the same compound path from the render model, so
// they agree on every counter boundary. No element paints a hole: counters are
// genuine holes and show whatever surface lies underneath. Coordinates are the
// glyph-local y-down frame, which matches SVG user space directly.

const esc = (s) => String(s).replace(/&/g, '&amp;').replace(/"/g, '&quot;').replace(/</g, '&lt;');

/**
 * SVG group for one glyph (no surrounding <svg>), usable inside larger proof sheets.
 * @param {object} model render model
 * @param {{fill?:string, outline?:{color:string,width:number}|null, diagnostic?:boolean, transform?:string}} opts
 */
export function glyphGroup(model, { fill = '#111', outline = null, diagnostic = false, transform } = {}) {
  const parts = [];
  const attrs = [
    `data-glyph-id="${esc(model.glyphId)}"`,
    `data-variant-id="${esc(model.variantId)}"`,
    `data-revision="${model.revision}"`,
    model.geometryHash ? `data-geometry-hash="${esc(model.geometryHash)}"` : '',
    transform ? `transform="${esc(transform)}"` : '',
  ].filter(Boolean).join(' ');
  parts.push(`<g ${attrs}>`);
  for (const r of model.regions) {
    parts.push(`<path data-role="fill" data-contour-id="${esc(r.outer.contourId)}" d="${r.pathData}" fill="${esc(fill)}" fill-rule="evenodd"/>`);
    if (outline) {
      parts.push(`<path data-role="outline" d="${r.pathData}" fill="none" stroke="${esc(outline.color)}" stroke-width="${outline.width}" stroke-linejoin="round"/>`);
    }
  }
  if (diagnostic) parts.push(diagnosticOverlay(model));
  parts.push('</g>');
  return parts.join('');
}

/** Diagnostic overlay: counter boundaries, contour ids, unresolved-aperture flag. */
function diagnosticOverlay(model) {
  const out = ['<g data-role="diagnostics" fill="none" font-family="monospace" font-size="5">'];
  for (const r of model.regions) {
    for (const h of r.holes) {
      out.push(`<path data-role="counter-boundary" data-contour-id="${esc(h.contourId)}" d="${pathOf(h)}" stroke="#1e88e5" stroke-width="1.2" stroke-dasharray="3 2"/>`);
    }
  }
  if (model.diagnostics.unresolvedAperture) {
    const b = model.bounds;
    out.push(`<rect data-role="aperture-unresolved" x="${b.minX - 3}" y="${b.minY - 3}" width="${b.maxX - b.minX + 6}" height="${b.maxY - b.minY + 6}" stroke="#e53935" stroke-width="1" stroke-dasharray="4 3"/>`);
    out.push(`<text x="${b.minX}" y="${b.maxY + 9}" fill="#e53935" stroke="none">APERTURE UNRESOLVED (AUD-01)</text>`);
  }
  out.push('</g>');
  return out.join('');
}

const pathOf = (c) => c.segments.map((s) => {
  switch (s.type) {
    case 'move': return `M${s.x} ${s.y}`;
    case 'line': return `L${s.x} ${s.y}`;
    case 'quadratic': return `Q${s.cx} ${s.cy} ${s.x} ${s.y}`;
    case 'cubic': return `C${s.c1x} ${s.c1y} ${s.c2x} ${s.c2y} ${s.x} ${s.y}`;
    default: return 'Z';
  }
}).join(' ');

/**
 * Standalone SVG document for one glyph.
 * @param {{surface?:string|null, padding?:number}} opts surface = background fill (or null for transparent)
 */
export function glyphSvg(model, opts = {}) {
  const pad = opts.padding ?? 12;
  const b = model.bounds;
  const x = b.minX - pad, y = b.minY - pad, w = b.maxX - b.minX + 2 * pad, h = b.maxY - b.minY + 2 * pad + (opts.diagnostic ? 10 : 0);
  const surface = opts.surface ? `<rect data-role="surface" x="${x}" y="${y}" width="${w}" height="${h}" fill="${esc(opts.surface)}"/>` : '';
  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="${x} ${y} ${w} ${h}" width="${w * 2}" height="${h * 2}">${surface}${glyphGroup(model, opts)}</svg>`;
}
