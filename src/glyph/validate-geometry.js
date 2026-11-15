// Geometry validator vertical slice (Ticket 0.7A-T04).
//
// Runs the contract pipeline (contracts/glyph-geometry-validation.v1.json) on
// one glyph variant and returns a deterministic report. Pure: never mutates or
// repairs input. Stages that need later tickets (anchors beyond basic checks,
// render consistency) report `not-run` with a reason instead of passing.

import { validateGlyphDefinition } from './schema.js';
import { analyseContours } from '../geometry/topology.js';
import { windingNumber } from '../geometry/predicates.js';

export const VALIDATOR_VERSION = 'geometry-validator/1.0.0';

const round = (x) => Math.round(x * 1e6) / 1e6;
const roundPt = (p) => (p ? [round(p[0]), round(p[1])] : p);

/**
 * @param {object} glyph canonical GlyphDefinition
 * @param {object} profile validator profile (data/validator-profiles/*.json)
 * @param {{variantId?:string}} [opts]
 */
export function validateGlyphGeometry(glyph, profile, opts = {}) {
  const variant = opts.variantId ? glyph.variants.find((v) => v.variantId === opts.variantId) : glyph.variants[0];
  const diagnostics = [];
  const stages = [];
  const gid = glyph.glyphId;
  const diag = (stage, code, severity, affectedIds, message, extra = {}) =>
    diagnostics.push({ stage, code, severity, glyphId: gid, variantId: variant.variantId, affectedIds, message, ...extra });
  const stage = (name, status, note) => stages.push(note ? { stage: name, status, note } : { stage: name, status });
  const sg = glyph.semanticGraph;
  const contours = variant.geometry.contours;
  const byId = new Map(contours.map((c) => [c.contourId, c]));

  // 1. schema-and-reference-integrity
  const schema = validateGlyphDefinition(glyph);
  for (const d of schema.filter((x) => x.severity === 'error')) diag('schema-and-reference-integrity', d.code, 'error', d.affectedIds, d.message);
  stage('schema-and-reference-integrity', schema.some((d) => d.severity === 'error') ? 'failed' : 'passed');

  // 2–3. curve-normalization + geometric-degeneracy (analysis is exact on canonical segments)
  const a = analyseContours(contours, profile.numerical);
  for (const d of a.degeneracies) {
    if (d.kind === 'unclosed') diag('curve-normalization', 'VAL_CLOSURE', 'error', d.affectedIds, `Contour ${d.contourId} is not closed.`);
    else if (d.kind === 'zero-length-handle') diag('geometric-degeneracy', 'GEO_ZERO_HANDLE', 'info', d.affectedIds, 'Curve handle coincides with an endpoint (exact).');
    else diag('geometric-degeneracy', 'VAL_DEGENERATE', 'error', d.affectedIds, `Degenerate geometry: ${d.kind}.`);
  }
  stage('curve-normalization', a.degeneracies.some((d) => d.kind === 'unclosed') ? 'failed' : 'passed');
  stage('geometric-degeneracy', a.degeneracies.some((d) => d.kind !== 'unclosed' && d.kind !== 'zero-length-handle') ? 'failed' : 'passed');

  // 4. contour-intersection-analysis
  const declared = sg.topology.signature?.declaredCrossings ?? [];
  const isDeclared = (ids) => declared.some((c) => Array.isArray(c.order) && c.order.length >= 2 &&
    ids.every((id) => c.contourIds.includes(id)) && (ids.length > 1 || c.contourIds.filter((x) => x === ids[0]).length >= 2 || c.contourIds.length === 1));
  for (const x of a.intersections) {
    const loc = { measured: { point: roundPt(x.point) } };
    if (x.certainty === 'uncertain') {
      diag('contour-intersection-analysis', 'GEO_INTERSECTION_UNCERTAIN', 'error', x.segmentIds,
        `Boundaries are closer than the flattening error bound after ${a.refinementRounds} refinement(s); cannot certify.`, loc);
    } else if (isDeclared(x.contourIds)) {
      diag('contour-intersection-analysis', 'GEO_DECLARED_CROSSING', 'info', x.segmentIds, 'Intersection matches a declared crossing with explicit order.', loc);
    } else if (x.kind === 'self') {
      diag('contour-intersection-analysis', 'VAL_SELF_INTERSECTION', 'error', x.segmentIds, `Contour ${x.contourIds[0]} intersects itself.`, loc);
    } else {
      diag('contour-intersection-analysis', 'VAL_UNDECLARED_CROSSING', 'error', x.segmentIds, `Contours ${x.contourIds.join(' and ')} cross without a declared crossing.`, loc);
    }
  }
  const crossingFree = !a.intersections.some((x) => !isDeclared(x.contourIds));
  stage('contour-intersection-analysis', diagnostics.some((d) => d.stage === 'contour-intersection-analysis' && d.severity === 'error') ? 'failed' : 'passed');

  // 5. planar-topology-classification
  const cont = new Map(a.containment.map((c) => [c.contourId, c]));
  const samples = new Map(a.samples.map((s) => [s.contourId, s]));
  const topLevel = a.containment.filter((c) => c.parent === null).map((c) => c.contourId);
  const connectedComponents = crossingFree ? topLevel.length : null;
  const expected = sg.topology.signature?.connectedComponentCount;
  for (const c of a.containment.filter((x) => !x.certain)) {
    diag('planar-topology-classification', 'GEO_CONTAINMENT_UNCERTAIN', 'error', [c.contourId], 'Containment could not be certified.');
  }
  for (const c of contours) {
    const parent = cont.get(c.contourId).parent;
    if (c.role === 'outer' && parent !== null) diag('planar-topology-classification', 'VAL_TOPOLOGY_MISMATCH', 'error', [c.contourId], `Outer contour lies inside ${parent}.`);
    if (c.role === 'counter' && (parent === null || byId.get(parent)?.role !== 'outer')) {
      diag('planar-topology-classification', 'VAL_TOPOLOGY_MISMATCH', 'error', [c.contourId], 'Counter contour is not directly contained by an outer contour.');
    }
  }
  if (typeof expected === 'number' && connectedComponents !== null && expected !== connectedComponents) {
    diag('planar-topology-classification', 'VAL_COMPONENT_DISCONNECTED', 'error', [gid], `Expected ${expected} connected component(s), found ${connectedComponents}.`);
  }
  // Fill-rule behaviour at certified interior points (feeds the T05 renderer).
  const declaredRule = sg.topology.fillRule;
  const fillRules = {};
  for (const rule of ['evenodd', 'nonzero']) {
    const wrong = [];
    for (const c of contours) {
      const s = samples.get(c.contourId);
      if (!s?.point) continue;
      const shouldFill = c.role === 'outer';
      if (c.role === 'outer' || c.role === 'counter') if (s.filled[rule] !== shouldFill) wrong.push(c.contourId);
    }
    fillRules[rule] = { reproducesDeclaredTopology: wrong.length === 0, mismatchedContours: wrong };
  }
  if (!fillRules[declaredRule]?.reproducesDeclaredTopology) {
    diag('planar-topology-classification', 'VAL_RENDER_TOPOLOGY_DRIFT', 'error', fillRules[declaredRule]?.mismatchedContours ?? [gid],
      `Declared fill rule ${declaredRule} does not reproduce the declared counters/outer fill.`);
  }
  for (const rule of ['evenodd', 'nonzero']) {
    if (rule !== declaredRule && !fillRules[rule].reproducesDeclaredTopology) {
      diag('planar-topology-classification', 'GEO_FILL_RULE_SENSITIVE', 'info', fillRules[rule].mismatchedContours,
        `Under ${rule} fill these contours would render incorrectly; renderers must use the declared topology.`);
    }
  }
  stage('planar-topology-classification', diagnostics.some((d) => d.stage === 'planar-topology-classification' && d.severity === 'error') ? 'failed' : 'passed');

  // 6. negative-space-classification
  const counters = sg.negativeSpaces.filter((n) => n.kind === 'counter');
  const negative = { counters: [], apertures: [], channels: [] };
  for (const n of counters) {
    const c = byId.get(n.geometryRef);
    const parentId = cont.get(n.geometryRef)?.parent;
    const s = samples.get(n.geometryRef);
    const enclosed = Boolean(c?.closed && parentId && byId.get(parentId)?.role === 'outer' && crossingFree && s?.point && !s.filled[declaredRule]);
    negative.counters.push({ id: n.id, contourId: n.geometryRef, boundedFace: enclosed, area: c ? round(Math.abs(polyAreaExact(c))) : null, samplePoint: roundPt(s?.point) });
    if (!enclosed) diag('negative-space-classification', 'VAL_COUNTER_MISSING', 'error', [n.id], 'Declared counter is not an enclosed bounded face.');
  }
  // Merged counters: two declared counter contours intersecting or nested.
  for (let i = 0; i < counters.length; i++) {
    for (let j = i + 1; j < counters.length; j++) {
      const [p, q] = [counters[i].geometryRef, counters[j].geometryRef];
      const touching = a.intersections.some((x) => x.contourIds.includes(p) && x.contourIds.includes(q));
      const nested = cont.get(p)?.containedBy.includes(q) || cont.get(q)?.containedBy.includes(p);
      if (touching || nested) diag('negative-space-classification', 'VAL_COUNTER_MERGED', 'error', [counters[i].id, counters[j].id], 'Two declared counters merge into one region.');
    }
  }
  // Apertures and exterior connectivity of unfilled space.
  const outerIds = contours.filter((c) => c.role === 'outer').map((c) => c.contourId);
  const innerContours = contours.filter((c) => c.role !== 'outer');
  const unfilledAllExterior = crossingFree && innerContours.length === 0 && outerIds.length >= 1 &&
    !a.intersections.length && a.containment.every((c) => c.parent === null);
  for (const n of sg.negativeSpaces.filter((x) => x.kind === 'aperture')) {
    // Aperture entities need a declared boundary; connectivity follows from the faces.
    const ok = unfilledAllExterior || (n.exteriorPathCheck === true);
    negative.apertures.push({ id: n.id, exteriorConnected: ok });
    if (!ok) diag('negative-space-classification', 'VAL_APERTURE_CLOSED', 'error', [n.id], 'Aperture is not connected to exterior space.');
  }
  if (sg.topology.apertureStatus === 'interpretation-required') {
    if (unfilledAllExterior) {
      diag('negative-space-classification', 'GEO_UNFILLED_SPACE_EXTERIOR_CONNECTED', 'info', outerIds,
        'Proven: the glyph is bounded by simple, non-intersecting outer contour(s) with no inner contours, so all unfilled space ' +
        'belongs to the single exterior face. Any opening in the silhouette is exterior-connected.');
    }
    diag('negative-space-classification', 'TOPO_APERTURE_UNRESOLVED', 'warning', [gid],
      'Aperture entity is not classified: boundary and measurement construction are still undefined (AUD-01/AUD-03).',
      { measured: { unfilledSpaceExteriorConnected: unfilledAllExterior } });
  }
  for (const n of sg.negativeSpaces.filter((x) => x.kind === 'channel')) {
    negative.channels.push({ id: n.id, classifiedAsCounter: false, corridorAnalysis: 'not-implemented' });
    diag('negative-space-classification', 'GEO_CHANNEL_NOT_ANALYSED', 'warning', [n.id], 'Channel corridor analysis is not implemented yet; channel is never treated as a counter.');
  }
  stage('negative-space-classification', diagnostics.some((d) => d.stage === 'negative-space-classification' && d.severity === 'error') ? 'failed' : 'passed');

  // 7. clearance-analysis (measured; pass/fail only with calibrated thresholds)
  const thresholds = profile.thresholds ?? [];
  // Is the measured gap filled material (a wall/stroke) or unfilled space (a gap)?
  // Decided at the midpoint of the closest pair under the declared fill rule,
  // only when that point is farther from every boundary than the error bound.
  const sideOf = (p) => {
    const [u, v] = p.closestPointPair;
    const mid = [(u[0] + v[0]) / 2, (u[1] + v[1]) / 2];
    const margin = Math.min(...a._polys.map((poly) => distanceToBoundary(mid, poly)));
    if (!(margin > 1e-9)) return 'undetermined';
    const w = a._polys.map((poly) => windingNumber(mid, poly.points));
    const filled = declaredRule === 'nonzero' ? w.reduce((x, y) => x + y, 0) !== 0 : w.filter((x) => x !== 0).length % 2 === 1;
    return filled ? 'filled' : 'unfilled';
  };
  const clearance = { counterWalls: [], boundarySelfProximity: [] };
  for (const n of counters) {
    const parentId = cont.get(n.geometryRef)?.parent;
    const m = a.proximity.find((p) => p.contourIds.length === 2 && p.contourIds.includes(n.geometryRef) && p.contourIds.includes(parentId));
    if (!m) continue;
    const rec = measurement(m, n.id, sideOf);
    clearance.counterWalls.push(rec);
    applyThreshold(thresholds.find((t) => t.kind === 'counter-wall-clearance' && t.featureId === n.id), rec, diag);
  }
  for (const c of contours.filter((x) => x.role === 'outer')) {
    const seen = new Set();
    for (const p of a.proximity.filter((x) => x.contourIds.length === 1 && x.contourIds[0] === c.contourId)) {
      const key = p.segmentIds.join('|');
      if (seen.has(key)) continue;
      seen.add(key);
      clearance.boundarySelfProximity.push(measurement(p, c.contourId, sideOf));
      if (clearance.boundarySelfProximity.filter((r) => r.featureId === c.contourId).length >= 5) break;
    }
    for (const rec of clearance.boundarySelfProximity.filter((r) => r.featureId === c.contourId)) {
      applyThreshold(thresholds.find((t) => t.kind === 'boundary-self-proximity' && t.featureId === c.contourId), rec, diag);
    }
  }
  const uncalibrated = [...clearance.counterWalls, ...clearance.boundarySelfProximity].filter((r) => r.calibrationStatus === 'uncalibrated');
  if (uncalibrated.length) {
    diag('clearance-analysis', 'VAL_UNCALIBRATED', 'warning', [...new Set(uncalibrated.map((r) => r.featureId))],
      `${uncalibrated.length} clearance measurement(s) have no calibrated threshold; measured only, cannot support production approval.`);
  }
  stage('clearance-analysis', diagnostics.some((d) => d.stage === 'clearance-analysis' && d.severity === 'error') ? 'failed' : uncalibrated.length ? 'measured-uncalibrated' : 'passed');

  // 8. anchor-validation
  const anchors = sg.anchors ?? [];
  for (const an of anchors) {
    const dir = an.direction ?? { x: 0, y: 0 };
    if (!Number.isFinite(dir.x) || !Number.isFinite(dir.y) || Math.hypot(dir.x, dir.y) === 0) {
      diag('anchor-validation', 'VAL_ANCHOR_DIRECTION', 'error', [an.id], 'Anchor direction is zero or invalid.');
    }
    if (an.position && an.clearanceRadius > 0) {
      const p = [an.position.x, an.position.y];
      const dmin = Math.min(...a._polys.map((poly) => distanceToBoundary(p, poly)));
      if (dmin < an.clearanceRadius) {
        diag('anchor-validation', 'VAL_ANCHOR_CLEARANCE', 'error', [an.id], 'Anchor clearance zone collides with glyph boundary.', { measured: { distance: round(dmin), clearanceRadius: an.clearanceRadius } });
      }
    }
  }
  stage('anchor-validation', anchors.length === 0 ? 'not-run' : diagnostics.some((d) => d.stage === 'anchor-validation' && d.severity === 'error') ? 'failed' : 'passed',
    anchors.length === 0 ? 'No anchors declared (anchorStatus: not-yet-derived).' : undefined);

  // 9. glyph-identity-invariants
  const identityChecks = evaluateIdentity(glyph, { negative, connectedComponents, crossingFree, unfilledAllExterior, clearance, contours });
  for (const c of identityChecks.filter((x) => x.status === 'failed')) {
    diag('glyph-identity-invariants', 'VAL_IDENTITY_INVARIANT', 'error', [gid], `Identity check ${c.name} failed: ${c.reason}`);
  }
  stage('glyph-identity-invariants', identityChecks.some((c) => c.status === 'failed') ? 'failed' : identityChecks.some((c) => c.status !== 'passed') ? 'partial' : 'passed');

  // 10. derived-render-consistency
  stage('derived-render-consistency', 'not-run', 'No renderer exists yet (T05).');

  const errors = diagnostics.filter((d) => d.severity === 'error');
  return {
    validatorVersion: VALIDATOR_VERSION,
    profileId: `${profile.profileId}@${profile.version}`,
    glyphId: gid,
    variantId: variant.variantId,
    geometryHash: variant.geometryHash ?? null,
    hardChecksPassed: errors.length === 0,
    stages,
    numerical: { flatteningTolerance: a.flatteningTolerance, refinementRounds: a.refinementRounds, maxFlatteningError: Math.max(0, ...a.polygons.map((p) => p.maxError)) },
    topology: {
      connectedComponents,
      expectedConnectedComponents: expected ?? null,
      containment: a.containment.map(({ contourId, parent }) => ({ contourId, parent })),
      // Certified interior point of each contour's own face (inside it, outside its children).
      facePoints: Object.fromEntries(a.samples.filter((s) => s.point).map((s) => [s.contourId, { point: roundPt(s.point), margin: round(s.margin) }])),
      fillRules,
      declaredFillRule: declaredRule,
    },
    negativeSpace: negative,
    clearance,
    identityChecks,
    diagnostics,
  };
}

function measurement(p, featureId, fill) {
  return {
    side: fill ? fill(p) : undefined,
    featureId,
    segmentIds: p.segmentIds,
    minimumDistance: round(p.distance),
    closestPointPair: p.closestPointPair.map(roundPt),
    measurementErrorBound: round(p.errorBound),
    calibrationStatus: 'uncalibrated',
  };
}

/** Hard pass requires distance − error bound ≥ calibrated threshold (contract clearanceMethod.rule). */
function applyThreshold(t, rec, diag) {
  if (!t || t.calibrationStatus !== 'approved') return;
  rec.calibrationStatus = 'calibrated';
  rec.threshold = t.value;
  rec.calibrationProfileId = t.calibrationRecordId;
  const lower = rec.minimumDistance - rec.measurementErrorBound;
  if (lower < t.value) {
    rec.result = 'failed';
    diag('clearance-analysis', 'VAL_NEGATIVE_SPACE_CLEARANCE', 'error', [rec.featureId, ...rec.segmentIds],
      `Clearance ${rec.minimumDistance} (±${rec.measurementErrorBound}) is below threshold ${t.value}.`,
      { measured: { minimumDistance: rec.minimumDistance, errorBound: rec.measurementErrorBound, threshold: t.value, calibrationStatus: 'calibrated' } });
  } else {
    rec.result = 'passed';
    if (typeof t.nearMargin === 'number' && lower < t.value + t.nearMargin) {
      diag('clearance-analysis', 'VAL_NEAR_CLEARANCE', 'warning', [rec.featureId], `Clearance is within ${t.nearMargin} of its threshold.`);
    }
  }
}

function distanceToBoundary(p, poly) {
  let m = Infinity;
  for (const e of poly.edges) {
    const a = poly.points[e.a], b = poly.points[e.b];
    const dx = b[0] - a[0], dy = b[1] - a[1], len2 = dx * dx + dy * dy;
    const t = len2 ? Math.max(0, Math.min(1, ((p[0] - a[0]) * dx + (p[1] - a[1]) * dy) / len2)) : 0;
    m = Math.min(m, Math.hypot(p[0] - (a[0] + t * dx), p[1] - (a[1] + t * dy)) - e.errorBound);
  }
  return m;
}

function polyAreaExact(c) {
  // Exact area for line/quadratic/cubic contours (Green's theorem).
  let a = 0, sx = 0, sy = 0, px = 0, py = 0;
  const cr = (x0, y0, x1, y1) => x0 * y1 - x1 * y0;
  for (const s of c.segments) {
    if (s.type === 'move') { sx = px = s.x; sy = py = s.y; continue; }
    if (s.type === 'line') a += cr(px, py, s.x, s.y) / 2;
    else if (s.type === 'quadratic') a += (2 * cr(px, py, s.cx, s.cy) + 2 * cr(s.cx, s.cy, s.x, s.y) + cr(px, py, s.x, s.y)) / 6;
    else if (s.type === 'cubic') {
      a += (6 * cr(px, py, s.c1x, s.c1y) + 3 * cr(px, py, s.c2x, s.c2y) + cr(px, py, s.x, s.y)
        + 3 * cr(s.c1x, s.c1y, s.c2x, s.c2y) + 3 * cr(s.c1x, s.c1y, s.x, s.y) + 6 * cr(s.c2x, s.c2y, s.x, s.y)) / 20;
    } else if (s.type === 'close') { a += cr(px, py, sx, sy) / 2; continue; }
    px = s.x; py = s.y;
  }
  return a;
}

/**
 * Identity checks from the contract profile. Only geometry-decidable checks
 * pass or fail; the rest report why they cannot be evaluated yet.
 */
function evaluateIdentity(glyph, ctx) {
  const checks = glyph.semanticGraph.identityProfile?.checks ?? [];
  const counters = ctx.negative.counters;
  const NE = (reason) => ({ status: 'not-evaluable', reason });
  const mappingReason = 'requires reviewed component-to-geometry mapping (components are provisional-unmapped)';
  const evaluators = {
    'counter-enclosed': () => counters.length >= 1 && counters.every((c) => c.boundedFace)
      ? { status: 'passed', reason: 'declared counter is a certified enclosed bounded face' }
      : { status: 'failed', reason: 'declared counter is missing or not enclosed' },
    'two-distinct-bounded-counters': () => counters.length === 2 && counters.every((c) => c.boundedFace) && ctx.crossingFree
      ? { status: 'passed', reason: 'two enclosed counters, disjoint and not nested' }
      : { status: 'failed', reason: 'expected two separate enclosed counters' },
    'single-required-connected-contour': () => ctx.contours.length === 1 && ctx.connectedComponents === 1
      ? { status: 'passed', reason: 'one closed contour, one connected component' }
      : { status: 'failed', reason: `contours=${ctx.contours.length}, components=${ctx.connectedComponents}` },
    'no-unintended-self-intersection': () => ctx.crossingFree
      ? { status: 'passed', reason: 'no undeclared intersections (certified)' }
      : { status: 'failed', reason: 'undeclared intersection present' },
    'aperture-exterior-connected': () => {
      const ap = ctx.negative.apertures;
      if (ap.length) return ap.every((a) => a.exteriorConnected)
        ? { status: 'passed', reason: 'declared aperture is connected to exterior space (certified)' }
        : { status: 'failed', reason: 'declared aperture is not exterior-connected' };
      return ctx.unfilledAllExterior
        ? NE('unfilled space is proven exterior-connected, but no aperture entity is classified yet (AUD-01)')
        : NE('aperture unclassified and exterior connectivity not proven');
    },
    'no-enclosed-counter': () => ctx.contours.length === 1 && counters.length === 0
      ? { status: 'passed', reason: 'single outer contour, no inner contour: no enclosed counter' }
      : { status: 'failed', reason: `expected no counter, found ${ctx.contours.length - 1} inner contour(s)` },
    'tail-counter-clearance': () => NE('requires reviewed tail mapping and a calibrated threshold'),
    'neck-clearance': () => NE('neck location requires reviewed mapping and a calibrated threshold'),
    'leg-counter-clearance': () => NE('requires reviewed leg mapping and a calibrated threshold'),
    'clearance-measured': () => NE('measured; threshold uncalibrated'),
    'distinction-from-C-and-O-review': () => NE('human visual review required'),
  };
  return checks.map(({ name }) => ({ name, ...(evaluators[name]?.() ?? (name.endsWith('-review') ? NE('human visual review required') : NE(mappingReason))) }));
}

/**
 * Atomic candidate check for the future command pipeline: returns the report
 * and whether the candidate may be committed. Never mutates inputs.
 */
export function checkCandidate(glyph, profile, opts) {
  const report = validateGlyphGeometry(glyph, profile, opts);
  return { commitAllowed: report.hardChecksPassed, report };
}
