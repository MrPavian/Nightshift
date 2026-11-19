// Issue #24 / CLAUDE_TASK_C03_BUBBLE_BOUNCE_GATES_01: Bubble counter safety and Bounce collision safety.
import test from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import { loadRegistry } from '../src/glyph/load-node.js';
import { validateGlyphGeometry } from '../src/glyph/validate-geometry.js';
import { resolveStyle } from '../src/style/resolver.js';
import { negativeSpaceMetrics, checkCounterSafety, inscribedDiameter } from '../src/style/negative-space.js';
import { layoutWordWithReport, layoutWord, glyphPolygons } from '../src/style/render.js';
import { stableStringify } from '../src/core/stable-json.js';
import { sha256Hex } from '../src/core/sha256.js';

const registry = loadRegistry();
const profile = JSON.parse(readFileSync('data/validator-profiles/legacy-v06.v1.json', 'utf8'));
const contract = JSON.parse(readFileSync('contracts/style-resolver.v1.json', 'utf8'));
const ctx = { contract, profile };
const SAFETY = contract.operations['letterform.bubble.counter-safety'].params;
const BOUNCE = contract.operations['composition.bounce'].params;
const bubble = (c) => resolveStyle(registry.getByChar(c), 'bubble', ctx);
const PRIMARY = ['A', 'B', 'G', 'R', 'S'];
const PAIRS = ['AR', 'BA', 'BR', 'GR', 'RA', 'SA', 'SB', 'GS'];

// ---------- Bubble ----------
test('Bubble on A/B/G/R/S: masters unchanged, deterministic, valid, counters kept with metrics', () => {
  for (const c of PRIMARY) {
    const g = registry.getByChar(c), before = g.variants[0].geometryHash;
    const r1 = bubble(c), r2 = bubble(c);
    assert.equal(g.variants[0].geometryHash, before, `${c}: master unchanged`);
    assert.equal(stableStringify(r1), stableStringify(r2), `${c}: deterministic`);
    assert.equal(r1.status, 'applied', c);
    const rep = validateGlyphGeometry(r1.derived, profile), neutral = validateGlyphGeometry(g, profile);
    assert.ok(rep.hardChecksPassed, `${c}: no topology/intersection errors`);
    assert.deepEqual(rep.negativeSpace.counters.filter((x) => x.boundedFace).map((x) => x.contourId).sort(), neutral.negativeSpace.counters.filter((x) => x.boundedFace).map((x) => x.contourId).sort(), `${c}: counter IDs preserved`);
    for (const k of r1.negativeSpace.counters) {
      for (const f of ['neutralArea', 'area', 'areaRatio', 'neutralOpening', 'opening', 'openingRatio']) assert.equal(typeof k[f], 'number', `${c} ${k.counterId} ${f}`);
      assert.ok(k.areaRatio >= SAFETY.minAreaRatio && k.openingRatio >= SAFETY.minOpeningRatio, `${c} ${k.counterId} above floors`);
      assert.equal(k.calibrationStatus, 'measured-uncalibrated');
      assert.ok(k.wallClearance && typeof k.wallClearance.errorBound === 'number', `${c}: wall clearance with error bound`);
    }
    for (const a of r1.negativeSpace.apertures) {
      assert.equal(a.exteriorConnected, true, `${c} ${a.apertureId}`);
      assert.equal(a.throat, 'not-evaluable');
      assert.ok(a.throatReason);
    }
    assert.equal(r1.negativeSpace.calibrationStatus, 'measured-uncalibrated');
    assert.doesNotMatch(JSON.stringify(r1), /generator-ready|"calibrationStatus":"calibrated"/, `${c}: nothing claims calibration`);
  }
});

test('A/B/R: the old strongest candidate (counters at 16–20 %) is now rejected with stable reason codes', () => {
  for (const c of ['A', 'B', 'R']) {
    const inf = bubble(c).operations.find((o) => o.operationId === 'letterform.bubble.inflate');
    const first = inf.params.candidates[0];
    assert.equal(first.distance, 9);
    assert.equal(first.result, 'rejected');
    assert.ok(first.reasons.every((r) => /^(COUNTER_AREA_BELOW_FLOOR|COUNTER_OPENING_BELOW_FLOOR|APERTURE_CLOSED|COUNTER_MISSING|VALIDATION_FAILED|COUNTER_COUNT_CHANGED|COMPONENTS_CHANGED)(:|$)/.test(r)), first.reasons.join());
    assert.ok(first.reasons.some((r) => r.startsWith('COUNTER_AREA_BELOW_FLOOR')), `${c}: area floor named`);
    assert.ok(inf.params.distance < 9, `${c}: gentler candidate chosen`);
    assert.equal(inf.params.candidates.at(-1).result, 'accepted');
  }
});

test('synthetic regression: a technically enclosed but tiny counter passes the old count-only gate and fails the new one', () => {
  const g = registry.getByChar('A');
  const shrink = (seg, cx, cy, k) => ({ ...seg, ...(seg.x !== undefined ? { x: cx + (seg.x - cx) * k, y: cy + (seg.y - cy) * k } : {}) });
  const contours = g.variants[0].geometry.contours.map((c) => {
    if (c.role === 'outer') return c;
    const pts = c.segments.filter((s) => s.x !== undefined);
    const cx = pts.reduce((a, s) => a + s.x, 0) / pts.length, cy = pts.reduce((a, s) => a + s.y, 0) / pts.length;
    return { ...c, segments: c.segments.map((s) => shrink(s, cx, cy, 0.15)) };
  });
  const geometry = { ...g.variants[0].geometry, editability: 'reference-only', contours };
  // Built like a resolver-derived record: matching hash and a recorded deliberate change.
  const tiny = { ...g, variants: [{ ...g.variants[0], variantId: 'a.synthetic-tiny-counter', geometry, geometryHash: sha256Hex(stableStringify(geometry)), deliberateChanges: [{ operationId: 'test.shrink-counter', note: 'synthetic regression fixture' }] }] };
  const neutral = validateGlyphGeometry(g, profile), rep = validateGlyphGeometry(tiny, profile);
  const count = (r) => r.negativeSpace.counters.filter((x) => x.boundedFace).length;
  // old gate: hard checks + same counter count + one component
  assert.ok(rep.hardChecksPassed && count(rep) === count(neutral) && rep.topology.connectedComponents === 1, 'old count-only gate accepts it');
  const gate = checkCounterSafety(negativeSpaceMetrics(g, neutral, tiny, rep), SAFETY);
  assert.equal(gate.ok, false, 'new gate rejects it');
  assert.ok(gate.reasons.some((r) => r.startsWith('COUNTER_AREA_BELOW_FLOOR')) && gate.reasons.some((r) => r.startsWith('COUNTER_OPENING_BELOW_FLOOR')));
});

test('if no candidate keeps the counters open, Bubble is skipped with reasons; it is never forced through', () => {
  const strict = structuredClone(contract);
  strict.operations['letterform.bubble.counter-safety'].params = { minAreaRatio: 0.99, minOpeningRatio: 0.99 };
  const r = resolveStyle(registry.getByChar('A'), 'bubble', { contract: strict, profile });
  const inf = r.operations.find((o) => o.operationId === 'letterform.bubble.inflate');
  assert.equal(inf.status, 'skipped');
  assert.ok(inf.params.candidates.length > 0 && inf.params.candidates.every((c) => c.result === 'rejected' && c.reasons.length));
  assert.equal(r.derived, null);
});

test('inscribed diameter of a known shape', () => {
  const sq = [[0, 0], [20, 0], [20, 20], [0, 20]];
  const d = inscribedDiameter(sq);
  assert.ok(Math.abs(d.diameter - 20) <= d.errorBound + 1e-9, `square opening ${d.diameter}`);
});

// ---------- Bounce ----------
const recs = (w) => [...w].map((c) => bubble(c).derived);
const rot = (deg, cx, cy) => { const a = (deg * Math.PI) / 180; return ([x, y]) => [cx + (x - cx) * Math.cos(a) - (y - cy) * Math.sin(a), cy + (x - cx) * Math.sin(a) + (y - cy) * Math.cos(a)]; };
const placed = (it) => { const r = rot(it.rotate, (it.box.x0 + it.box.x1) / 2, (it.box.y0 + it.box.y1) / 2); return glyphPolygons(it.record).filter((p) => p.role === 'outer').map((p) => p.poly.map((pt) => { const [x, y] = r(pt); return [x + it.x, y + it.y]; })); };
const inPoly = ([x, y], q) => { let c = false; for (let i = 0, j = q.length - 1; i < q.length; j = i++) { const [xi, yi] = q[i], [xj, yj] = q[j]; if ((yi > y) !== (yj > y) && x < ((xj - xi) * (y - yi)) / (yj - yi) + xi) c = !c; } return c; };
const ptSeg = ([px, py], [ax, ay], [bx, by]) => { const dx = bx - ax, dy = by - ay, l = dx * dx + dy * dy; const t = l ? Math.max(0, Math.min(1, ((px - ax) * dx + (py - ay) * dy) / l)) : 0; return Math.hypot(px - ax - t * dx, py - ay - t * dy); };
/** Independent check: vertex-to-contour distance between two placed glyphs (no shared code with render.js). */
function independentGap(A, B) {
  let min = Infinity;
  for (const qa of A) for (const p of qa) { if (B.some((qb) => inPoly(p, qb))) return 0; for (const qb of B) for (let i = 0; i < qb.length; i++) min = Math.min(min, ptSeg(p, qb[i], qb[(i + 1) % qb.length])); }
  for (const qb of B) for (const p of qb) if (A.some((qa) => inPoly(p, qa))) return 0;
  return min;
}

test('Bounce on AR…GS and ABRA: transformed contours never intersect, touch or come closer than minClearance', () => {
  for (const w of [...PAIRS, 'ABRA']) {
    const { items, report } = layoutWordWithReport(recs(w), 'bounce', BOUNCE);
    assert.ok(items.some((it) => it.rotate !== 0), `${w}: tilt kept`);
    for (let i = 1; i < items.length; i++) {
      const gap = independentGap(placed(items[i - 1]), placed(items[i]));
      assert.ok(gap >= BOUNCE.minClearance - report.pairs[i - 1].errorBound, `${w} ${i}: independent gap ${gap.toFixed(2)}`);
      assert.ok(['preferred-accepted', 'moved-to-safe'].includes(report.pairs[i - 1].result), `${w} ${i}: ${report.pairs[i - 1].result}`);
      assert.equal(report.pairs[i - 1].accepted.class, 'safe');
    }
  }
});

test('an excessive overlap preference is reduced to a safe placement, not accepted', () => {
  const { report } = layoutWordWithReport(recs('ABRA'), 'bounce', { ...BOUNCE, overlapRatio: 0.6 });
  assert.ok(report.pairs.every((p) => p.preferred.class === 'intersection'));
  assert.ok(report.pairs.every((p) => p.result === 'moved-to-safe' && p.accepted.class === 'safe'));
});

test('a declared relationship authorises only its exact pair and region', () => {
  const r = recs('ABRA');
  const legacy = layoutWordWithReport(r, 'bounce', BOUNCE, { collisionPolicy: 'legacy-unchecked' });
  const ids = legacy.items.map((it) => it.instanceId);
  const big = { x0: -1e4, y0: -1e4, x1: 1e4, y1: 1e4 };
  const rel = { id: 'rel.test.ab', a: ids[0], b: ids[1], type: 'overlap', region: big, layer: 'b-over-a' };
  const withRel = layoutWordWithReport(r, 'bounce', BOUNCE, { relationships: [rel] });
  assert.equal(withRel.report.pairs[0].accepted.class, 'authorized-overlap');
  assert.equal(withRel.report.pairs[0].accepted.authorizedBy, 'rel.test.ab');
  assert.equal(withRel.report.pairs[0].accepted.extraSteps, 0);
  assert.ok(withRel.report.pairs.slice(1).every((p) => p.accepted.class === 'safe'), 'other pairs are not authorised');
  const tinyRegion = layoutWordWithReport(r, 'bounce', BOUNCE, { relationships: [{ ...rel, region: { x0: 0, y0: 0, x1: 1, y1: 1 } }] });
  assert.equal(tinyRegion.report.pairs[0].accepted.class, 'safe', 'overlap outside the declared region is rejected');
  const wrongPair = layoutWordWithReport(r, 'bounce', BOUNCE, { relationships: [{ ...rel, a: ids[2], b: ids[3] }] });
  assert.equal(wrongPair.report.pairs[0].accepted.class, 'safe');
});

test('placement and report are byte-identical for identical inputs; neutral layout is unchanged', () => {
  const a = layoutWordWithReport(recs('ABRA'), 'bounce', BOUNCE), b = layoutWordWithReport(recs('ABRA'), 'bounce', BOUNCE);
  const strip = (x) => stableStringify({ items: x.items.map(({ record, ...rest }) => rest), report: x.report });
  assert.equal(strip(a), strip(b));
  const neutralRecs = [...'ABRA'].map((c) => registry.getByChar(c));
  const flat = layoutWord(neutralRecs, 'neutral');
  let x = 0;
  for (const it of flat) {
    const xs = glyphPolygons(it.record).flatMap((p) => p.poly.map((q) => q[0]));
    assert.equal(it.x, x - Math.min(...xs));
    assert.equal(it.rotate, 0); assert.equal(it.y, 0);
    x += Math.max(...xs) - Math.min(...xs) + 10;
  }
});
