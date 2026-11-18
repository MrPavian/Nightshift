// Style grammar resolver (C03). Turns a style request into derived glyph geometry by applying
// registered, deterministic operations to an authored master, validating after every step.
// Axes stay separate: letterform and composition change geometry; practice context and rendering never do.
// Nothing here mutates the canonical record; the result is a derived record plus a report.
import { validateGlyphGeometry } from '../glyph/validate-geometry.js';
import { sha256Hex } from '../core/sha256.js';
import { stableStringify } from '../core/stable-json.js';
import { contourToPolygon, polyArea, offsetPolygon, removeLoops, clipSharpCorners, polygonSegments, roundedSegments, chamferCurves, bounds, affine } from './polygon.js';

export const RESOLVER_VERSION = 'style-resolver/1.0.0';

/** Normalise a request: a preset id, or explicit axes (missing axes default to neutral/none). */
export function normaliseRequest(contract, request) {
  const req = typeof request === 'string' ? { preset: request } : { ...request };
  const preset = req.preset ? contract.presets[req.preset] : null;
  if (req.preset && !preset) throw new Error(`Unknown style preset ${req.preset}`);
  const axes = {
    letterform: req.letterform ?? preset?.letterform ?? 'neutral',
    composition: req.composition ?? preset?.composition ?? 'neutral',
    practiceContext: req.practiceContext ?? preset?.practiceContext ?? 'none',
    rendering: req.rendering ?? ['fill'],
  };
  for (const k of ['letterform', 'composition', 'practiceContext']) {
    if (!contract.axes[k].includes(axes[k])) throw new Error(`Unknown ${k} value ${axes[k]}`);
  }
  for (const r of axes.rendering) if (!contract.axes.rendering.includes(r)) throw new Error(`Unknown rendering value ${r}`);
  return { preset: req.preset ?? null, ...axes };
}

const withIds = (contourId, segments) => segments.map((s, i) => ({
  segmentId: `${contourId}.seg.${String(i).padStart(2, '0')}`, nodeId: `${contourId}.node.${String(i).padStart(2, '0')}`, ...s,
}));

/** Build a derived glyph record around new contours (stable contour IDs kept, segment IDs regenerated). */
function derive(glyph, contours, style) {
  const variant = glyph.variants[0];
  const geometry = { ...variant.geometry, editability: 'reference-only', contours: contours.map((c) => ({ ...c, segments: withIds(c.contourId, c.segments) })) };
  // Derived geometry is reference-only: it is never edited directly; edits go to the master.
  // Segment-level semantic references belong to the master; the derived shape is checked on hard geometry and negative space.
  const semanticGraph = { ...glyph.semanticGraph, components: [], junctions: [], constraints: [], anchors: [], negativeSpaces: (glyph.semanticGraph.negativeSpaces ?? []).map(({ boundaryComponentIds, boundaryComponents, ...n }) => n), identityProfile: { ...(glyph.semanticGraph.identityProfile ?? {}), checks: [] } };
  return {
    ...glyph, semanticGraph,
    variants: [{ ...variant, variantId: `${glyph.character.toLowerCase()}.style-${style}`, label: `${variant.label ?? variant.variantId} (${style})`, geometry, geometryHash: sha256Hex(stableStringify(geometry)), deliberateChanges: [{ operationId: 'style.resolve', style, note: 'Derived by the style resolver; not a canonical edit.' }] }],
  };
}

function check(glyph, contours, profile, expectCounters, style) {
  const rec = derive(glyph, contours, style);
  const v = validateGlyphGeometry(rec, profile);
  const errors = v.diagnostics.filter((d) => d.severity === 'error').map((d) => d.code);
  const counters = v.negativeSpace.counters.filter((c) => c.boundedFace).length;
  const components = v.topology.connectedComponents;
  const ok = v.hardChecksPassed && counters === expectCounters && components === 1;
  return { ok, rec, report: v, reason: ok ? null : errors.length ? `Validierung: ${[...new Set(errors)].join(', ')}` : counters !== expectCounters ? `Punzen: ${counters} statt ${expectCounters}` : `Teile: ${components} statt 1` };
}

const polysOf = (contours) => contours.map((c) => ({ contourId: c.contourId, role: c.role, poly: contourToPolygon(c) }));
const toContours = (base, polys, segFn = polygonSegments) => polys.map((p) => ({ ...base.find((c) => c.contourId === p.contourId), segments: segFn(p.poly) }));
/** Offset every contour away from the filled area: outer contour grows, counters shrink. */
const grow = (polys, d, miterLimit) => polys.map((p) => ({ ...p, poly: removeLoops(offsetPolygon(p.poly, p.role === 'outer' ? d : -d, { miterLimit })) }));

/**
 * Resolve one glyph. Returns { glyphId, request, status, operations[], derived, geometryHash, compatibility }.
 * status: 'applied' (all requested steps done), 'partial' (some skipped), 'unchanged' (nothing to change),
 * 'fallback' (glyph not eligible; neutral master returned).
 */
export function resolveStyle(glyph, request, { contract, profile }) {
  const req = normaliseRequest(contract, request);
  const ops = [];
  const op = (id, status, reason = null, params = undefined) => ops.push({ operationId: id, axis: contract.operations[id]?.axis ?? id.split('.')[0], status, reason, ...(params ? { params } : {}) });
  const master = glyph.variants[0];
  const out = (status, derived) => ({
    resolverVersion: RESOLVER_VERSION, glyphId: glyph.glyphId, character: glyph.character, request: req, status, operations: ops,
    derived, geometryHash: derived ? derived.variants[0].geometryHash : master.geometryHash,
    nonGeometricAxes: { practiceContext: req.practiceContext, rendering: req.rendering },
  });

  if (master.geometry.editability !== 'fully-editable' || glyph.maturity !== 'authored-contour') {
    op('glyph-identity-and-maturity', 'skipped', `Kein bearbeitbarer Master (${glyph.maturity}, ${master.geometry.editability}); neutrale Form bleibt.`);
    return out('fallback', null);
  }
  const base = master.geometry.contours;
  const neutralReport = validateGlyphGeometry(glyph, profile);
  const expectCounters = neutralReport.negativeSpace.counters.filter((c) => c.boundedFace).length;
  const styleKey = req.preset ?? `${req.letterform}-${req.composition}`;
  let contours = base, changed = false;

  // ---- letterform ----
  if (req.letterform === 'straight') {
    const ch = base.map((c) => ({ c, r: chamferCurves(c.segments) }));
    const nCurves = ch.reduce((s, x) => s + x.r.changed, 0);
    if (nCurves) {
      const cand = ch.map(({ c, r }) => ({ ...c, segments: r.segments }));
      const v = check(glyph, cand, profile, expectCounters, styleKey);
      if (v.ok) { contours = cand; changed = true; op('letterform.straight.chamfer-curves', 'applied', null, { curves: nCurves }); } else op('letterform.straight.chamfer-curves', 'skipped', v.reason);
    } else op('letterform.straight.chamfer-curves', 'unchanged', 'Der Master hat keine Kurven.');
    const { size, maxAngleDeg } = contract.operations['letterform.straight.clip-sharp-corners'].params;
    const polys = polysOf(contours);
    let clipped = 0;
    const clippedPolys = polys.map((p) => (p.role === 'outer' ? (() => { const r = clipSharpCorners(p.poly, size, maxAngleDeg); clipped += r.clipped; return { ...p, poly: r.points }; })() : p));
    if (clipped) {
      const cand = toContours(contours, clippedPolys);
      const v = check(glyph, cand, profile, expectCounters, styleKey);
      if (v.ok) { contours = cand; changed = true; op('letterform.straight.clip-sharp-corners', 'applied', null, { corners: clipped, size, maxAngleDeg }); } else op('letterform.straight.clip-sharp-corners', 'skipped', v.reason);
    } else op('letterform.straight.clip-sharp-corners', 'unchanged', `Keine Außenecke spitzer als ${maxAngleDeg}°.`);
  } else if (req.letterform === 'bubble') {
    const polys = polysOf(base);
    let grown = null;
    for (const d of contract.operations['letterform.bubble.inflate'].params.distanceCandidates) {
      const g = grow(polys, d, 2);
      const v = check(glyph, toContours(base, g), profile, expectCounters, styleKey);
      if (v.ok) { grown = { g, d }; break; }
    }
    if (grown) op('letterform.bubble.inflate', 'applied', null, { distance: grown.d });
    else op('letterform.bubble.inflate', 'skipped', 'Keine Aufblasstärke hält die Punzen offen.');
    const src = grown?.g ?? polys;
    let rounded = null;
    for (const r of contract.operations['letterform.bubble.round-corners'].params.radiusCandidates) {
      const cand = toContours(base, src, (p) => roundedSegments(p, r));
      const v = check(glyph, cand, profile, expectCounters, styleKey);
      if (v.ok) { rounded = { cand, r }; break; }
    }
    if (rounded) { contours = rounded.cand; changed = true; op('letterform.bubble.round-corners', 'applied', null, { radius: rounded.r }); } else {
      op('letterform.bubble.round-corners', 'skipped', 'Kein Rundungsradius besteht die Validierung.');
      if (grown) { contours = toContours(base, grown.g); changed = true; }
    }
  }

  // ---- composition ----
  if (req.composition === 'block-fit') {
    const polys = polysOf(contours);
    let thick = null;
    for (const d of contract.operations['composition.block-fit.thicken'].params.distanceCandidates) {
      const g = grow(polys, d, 3);
      const v = check(glyph, toContours(contours, g), profile, expectCounters, styleKey);
      if (v.ok) { thick = { g, d }; break; }
    }
    if (thick) op('composition.block-fit.thicken', 'applied', null, { distance: thick.d }); else op('composition.block-fit.thicken', 'skipped', 'Verstärkung würde Punzen schließen.');
    const src = thick?.g ?? polys;
    const { capTop, baseline, minWidthRatio } = contract.operations['composition.block-fit.fit-box'].params;
    const b = bounds(src.map((p) => p.poly)), H = baseline - capTop, targetW = Math.max(b.w, H * minWidthRatio);
    const sx = targetW / b.w, sy = H / b.h;
    const fitted = src.map((p) => ({ ...p, poly: affine(p.poly, sx, sy, b.x0 - b.x0 * sx, capTop - b.y0 * sy) }));
    const cand = toContours(contours, fitted);
    const v = check(glyph, cand, profile, expectCounters, styleKey);
    if (v.ok) { contours = cand; changed = true; op('composition.block-fit.fit-box', 'applied', null, { scaleX: Math.round(sx * 1000) / 1000, scaleY: Math.round(sy * 1000) / 1000 }); } else {
      op('composition.block-fit.fit-box', 'skipped', v.reason);
      if (thick) { contours = toContours(contours, thick.g); changed = true; }
    }
  } else if (req.composition === 'interlocking') {
    op('composition.interlocking', 'skipped', 'Verschränkung braucht den Beziehungslöser (C04), der noch fehlt. Nur die Buchstabenform wird gezeigt; nichts wird als verschränkt ausgegeben.');
  }

  if (!changed) return out(ops.some((o) => o.status === 'skipped') ? 'partial' : 'unchanged', null);
  const final = check(glyph, contours, profile, expectCounters, styleKey);
  if (!final.ok) { op('glyph-validation', 'skipped', final.reason); return out('fallback', null); }
  return out(ops.some((o) => o.status === 'skipped') ? 'partial' : 'applied', final.rec);
}
