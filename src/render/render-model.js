// Derived render topology (Ticket 0.7A-T05).
//
// Builds ONE render representation from the canonical record and its
// validation report. Every pass (SVG fill, outline, Three.js mesh) consumes
// this representation, so they cannot disagree about holes.
//
// Holes come from declared topology (counter contours), never from source
// winding or a background-colour patch. Contours are re-oriented in the
// derived output (outer clockwise, counters counter-clockwise in the y-down
// frame) so the compound path is correct under both evenodd and nonzero.
// The canonical record is never modified.

import { signedArea } from '../geometry/area.js';
import { flattenContour } from '../geometry/flatten.js';
import { serializeSegments } from '../geometry/svg-path.js';

export const RENDER_MODEL_VERSION = 'render-model/1.0.0';

export class RenderError extends Error {
  constructor(code, message, diagnostics = []) {
    super(message);
    this.code = code;
    this.diagnostics = diagnostics;
  }
}

/** Reverse a closed subpath (segments with move … close) without changing its shape. */
export function reverseContourSegments(segments) {
  const draws = [];
  let start = null, cur = null;
  for (const s of segments) {
    if (s.type === 'move') { start = cur = [s.x, s.y]; continue; }
    if (s.type === 'close') {
      if (cur[0] !== start[0] || cur[1] !== start[1]) draws.push({ type: 'line', from: cur, to: start });
      cur = start;
      continue;
    }
    draws.push({ ...s, from: cur, to: [s.x, s.y] });
    cur = [s.x, s.y];
  }
  const out = [{ type: 'move', x: start[0], y: start[1] }];
  for (let i = draws.length - 1; i >= 0; i--) {
    const d = draws[i];
    const [x, y] = d.from;
    if (d.type === 'line') out.push({ type: 'line', x, y });
    else if (d.type === 'quadratic') out.push({ type: 'quadratic', cx: d.cx, cy: d.cy, x, y });
    else if (d.type === 'cubic') out.push({ type: 'cubic', c1x: d.c2x, c1y: d.c2y, c2x: d.c1x, c2y: d.c1y, x, y });
  }
  // The reversed path ends at the original start; drop that duplicate endpoint
  // by closing instead (the move already sits there).
  const last = out[out.length - 1];
  if (last.type === 'line' && last.x === start[0] && last.y === start[1]) out.pop();
  out.push({ type: 'close' });
  return out;
}

const strip = (segments) => segments.map(({ segmentId: _s, nodeId: _n, ...rest }) => rest);

/**
 * @param {object} glyph canonical GlyphDefinition
 * @param {object} report result of validateGlyphGeometry for the same record
 * @returns render model: regions (outer + holes), path data, flattened polygons
 */
export function buildRenderModel(glyph, report, { flatteningTolerance = 0.05 } = {}) {
  const variant = glyph.variants.find((v) => v.variantId === report.variantId);
  if (!variant || report.glyphId !== glyph.glyphId) {
    throw new RenderError('RENDER_REPORT_MISMATCH', 'Validation report does not belong to this glyph/variant.');
  }
  if (report.geometryHash && variant.geometryHash && report.geometryHash !== variant.geometryHash) {
    throw new RenderError('RENDER_STALE_REPORT', 'Validation report was produced for a different geometry revision.');
  }
  if (!report.hardChecksPassed) {
    throw new RenderError('RENDER_INVALID_TOPOLOGY', `${glyph.glyphId} failed hard validation checks; refusing to render misleading output.`,
      report.diagnostics.filter((d) => d.severity === 'error'));
  }
  const contours = variant.geometry.contours;
  const undeclared = contours.filter((c) => c.role !== 'outer' && c.role !== 'counter');
  if (undeclared.length) {
    throw new RenderError('RENDER_UNDECLARED_TOPOLOGY',
      `${glyph.glyphId} has contours with undeclared topology (${undeclared.map((c) => c.contourId).join(', ')}); render requires declared roles.`);
  }
  const counterIds = new Set(glyph.semanticGraph.negativeSpaces.filter((n) => n.kind === 'counter').map((n) => n.geometryRef));
  const parentOf = new Map(report.topology.containment.map((c) => [c.contourId, c.parent]));

  const orient = (c, wantClockwise) => {
    const cw = signedArea(c.segments) > 0; // y-down frame: positive = clockwise on screen
    const segs = strip(c.segments);
    return { contourId: c.contourId, reoriented: cw !== wantClockwise, segments: cw === wantClockwise ? segs : reverseContourSegments(segs) };
  };

  const regions = contours.filter((c) => c.role === 'outer').map((outer) => {
    const holes = contours.filter((c) => c.role === 'counter' && counterIds.has(c.contourId) && parentOf.get(c.contourId) === outer.contourId);
    const o = orient(outer, true);
    const hs = holes.map((h) => orient(h, false));
    return {
      outer: o,
      holes: hs,
      pathData: [o, ...hs].map((c) => serializeSegments(c.segments)).join(' '),
      polygons: {
        outer: flattenContour({ ...outer, segments: o.segments.map((s, i) => ({ ...s, segmentId: `r${i}` })) }, flatteningTolerance),
        holes: hs.map((h) => flattenContour({ contourId: h.contourId, segments: h.segments.map((s, i) => ({ ...s, segmentId: `r${i}` })) }, flatteningTolerance)),
      },
    };
  });

  return {
    renderModelVersion: RENDER_MODEL_VERSION,
    glyphId: glyph.glyphId,
    variantId: variant.variantId,
    revision: glyph.revision,
    geometryHash: variant.geometryHash ?? null,
    validator: report.validatorVersion,
    frame: glyph.coordinateSystem,
    bounds: glyph.baseMetrics.visibleBounds,
    flatteningTolerance,
    regions,
    apertureStatus: glyph.semanticGraph.topology.apertureStatus,
    // Certified probe points for parity tests: filled face of each outer, open face of each hole.
    probes: [
      ...contours.filter((c) => c.role === 'outer').map((c) => ({ contourId: c.contourId, expect: 'filled', ...report.topology.facePoints[c.contourId] })),
      ...[...counterIds].map((id) => ({ contourId: id, expect: 'surface', ...report.topology.facePoints[id] })),
    ].filter((p) => p.point),
    diagnostics: {
      unresolvedAperture: glyph.semanticGraph.topology.apertureStatus === 'interpretation-required',
      counters: [...counterIds],
    },
  };
}

/** Exact filled area of a render model (outer areas minus hole areas). */
export function renderModelArea(model) {
  let a = 0;
  for (const r of model.regions) {
    a += Math.abs(signedArea(r.outer.segments));
    for (const h of r.holes) a -= Math.abs(signedArea(h.segments));
  }
  return a;
}
