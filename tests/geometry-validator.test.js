// Ticket 0.7A-T04 acceptance tests: geometry validator vertical slice.
import { test } from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import { loadRegistry } from '../src/glyph/load-node.js';
import { GlyphRegistry } from '../src/glyph/registry.js';
import { validateGlyphGeometry, checkCandidate } from '../src/glyph/validate-geometry.js';
import { flattenContour } from '../src/geometry/flatten.js';
import { buildContour } from '../src/glyph/import-v06.js';
import { parsePath } from '../src/geometry/svg-path.js';
import { stableStringify } from '../src/core/stable-json.js';
import { fixtureGlyph, SQUARE, C_SHAPE, BOWTIE } from './fixtures/geometry-fixtures.js';
import { renderValidationReport, VALIDATION_REPORT_PATH } from '../tools/report-validation.mjs';

const profile = JSON.parse(readFileSync('data/validator-profiles/legacy-v06.v1.json', 'utf8'));
const registry = loadRegistry();
const run = (g, p = profile) => validateGlyphGeometry(g, p);
const codes = (r) => r.diagnostics.map((d) => d.code);
const errors = (r) => r.diagnostics.filter((d) => d.severity === 'error').map((d) => d.code);
const INNER = 'M30 30 L30 70 L70 70 L70 30 Z';

// ---------- legacy glyphs ----------

test('A/B/G/R/S pass all hard checks; no uncertain or failed stages', () => {
  for (const ch of 'ABGRS') {
    const r = run(registry.getByChar(ch));
    assert.deepEqual(errors(r), [], ch);
    assert.equal(r.hardChecksPassed, true, ch);
    assert.equal(r.topology.connectedComponents, 1, ch);
    assert.ok(!r.stages.some((s) => s.status === 'failed'), ch);
  }
});

test('A/B/R counters are certified enclosed bounded faces with measured wall clearance', () => {
  for (const [ch, n] of [['A', 1], ['B', 2], ['R', 1]]) {
    const r = run(registry.getByChar(ch));
    assert.equal(r.negativeSpace.counters.length, n);
    assert.ok(r.negativeSpace.counters.every((c) => c.boundedFace && c.area > 0), ch);
    assert.equal(r.clearance.counterWalls.length, n);
    for (const w of r.clearance.counterWalls) {
      assert.equal(w.side, 'filled', `${ch} counter wall is material`);
      assert.equal(w.calibrationStatus, 'uncalibrated');
      assert.ok(w.minimumDistance > 0 && w.measurementErrorBound >= 0);
      assert.equal(w.closestPointPair.length, 2);
    }
  }
  assert.equal(run(registry.getByChar('A')).clearance.counterWalls[0].minimumDistance, 17);
});

test('identity checks: geometry-decidable checks pass, others say why they cannot be evaluated', () => {
  const status = (ch) => Object.fromEntries(run(registry.getByChar(ch)).identityChecks.map((c) => [c.name, c.status]));
  assert.deepEqual(status('A'), { 'counter-enclosed': 'passed', 'crossbar-connected': 'not-evaluable', 'leg-connectivity': 'not-evaluable' });
  assert.equal(status('B')['two-distinct-bounded-counters'], 'passed');
  assert.equal(status('R')['counter-enclosed'], 'passed');
  assert.equal(status('S')['single-required-connected-contour'], 'passed');
  assert.equal(status('S')['no-unintended-self-intersection'], 'passed');
  assert.equal(status('G')['aperture-exterior-connected'], 'not-evaluable');
  assert.ok(run(registry.getByChar('R')).identityChecks.every((c) => c.reason.length > 0));
});

test('G: unfilled space proven exterior-connected, aperture still not reported as passing', () => {
  const r = run(registry.getByChar('G'));
  assert.ok(codes(r).includes('GEO_UNFILLED_SPACE_EXTERIOR_CONNECTED'));
  const w = r.diagnostics.find((d) => d.code === 'TOPO_APERTURE_UNRESOLVED');
  assert.equal(w.severity, 'warning');
  assert.equal(w.measured.unfilledSpaceExteriorConnected, true);
  assert.deepEqual(r.negativeSpace.apertures, []);
  assert.deepEqual(r.negativeSpace.counters, []);
});

test('A counter depends on evenodd: nonzero would fill it (renderer input for T05)', () => {
  const r = run(registry.getByChar('A'));
  assert.equal(r.topology.fillRules.evenodd.reproducesDeclaredTopology, true);
  assert.deepEqual(r.topology.fillRules.nonzero.mismatchedContours, ['glyph.A.contour.counter.primary']);
  assert.ok(codes(r).includes('GEO_FILL_RULE_SENSITIVE'));
  for (const ch of 'BR') assert.equal(run(registry.getByChar(ch)).topology.fillRules.nonzero.reproducesDeclaredTopology, true);
});

test('clearance is measured but never passed without calibration', () => {
  for (const ch of 'ABGRS') {
    const r = run(registry.getByChar(ch));
    assert.equal(r.stages.find((s) => s.stage === 'clearance-analysis').status, 'measured-uncalibrated');
    assert.ok(codes(r).includes('VAL_UNCALIBRATED'));
    assert.ok([...r.clearance.counterWalls, ...r.clearance.boundarySelfProximity].every((m) => !('result' in m)));
  }
});

test('v0.6 legacy alphabet: only Q fails (undeclared crossing of its tail); the current registry has no failures', () => {
  const legacy = GlyphRegistry.fromLegacyV06(JSON.parse(readFileSync('data/legacy/v06-glyph-paths.json', 'utf8')));
  const failing = legacy.list().filter((g) => !run(g).hardChecksPassed).map((g) => g.character);
  assert.deepEqual(failing, ['Q']);
  assert.deepEqual(registry.list().filter((g) => !run(g).hardChecksPassed).map((g) => g.character), []);
  const q = run(legacy.getByChar('Q'));
  assert.ok(errors(q).every((c) => c === 'VAL_UNDECLARED_CROSSING'));
  assert.ok(q.diagnostics.some((d) => d.affectedIds.some((id) => id.startsWith('glyph.Q.contour.subpath.3'))));
});

test('stages that need later tickets report not-run instead of passing', () => {
  const r = run(registry.getByChar('B'));
  assert.equal(r.stages.find((s) => s.stage === 'derived-render-consistency').status, 'not-run');
  assert.equal(r.stages.find((s) => s.stage === 'anchor-validation').status, 'not-run');
  assert.equal(r.stages.length, 10);
});

test('fixture.determinism: identical geometry/profile produce identical reports', () => {
  for (const ch of 'ABGRSQ') {
    const a = stableStringify(run(registry.getByChar(ch)));
    const b = stableStringify(run(loadRegistry().getByChar(ch)));
    assert.equal(a, b, ch);
  }
});

test('validation never mutates the canonical record (registry records are frozen)', () => {
  const before = registry.serialize();
  for (const g of registry.list()) run(g);
  assert.equal(registry.serialize(), before);
});

test('checkCandidate rejects an invalid candidate atomically and leaves the committed record untouched', () => {
  const committed = registry.getByChar('A');
  const candidate = structuredClone(committed);
  // Move the counter outside the glyph: a structural edit that must be rejected.
  for (const s of candidate.variants[0].geometry.contours[1].segments) if ('x' in s) s.x += 200;
  candidate.variants[0].deliberateChanges = ['test: counter moved'];
  delete candidate.variants[0].geometryHash;
  const { commitAllowed, report } = checkCandidate(candidate, profile);
  assert.equal(commitAllowed, false);
  assert.ok(errors(report).includes('VAL_COUNTER_MISSING'));
  assert.equal(registry.getByChar('A'), committed);
  assert.equal(checkCandidate(committed, profile).commitAllowed, true);
});

// ---------- contract fixtures ----------

test('fixture.counter.enclosed', () => {
  const r = run(fixtureGlyph({ outer: [SQUARE], counters: [INNER], checks: ['counter-enclosed'] }));
  assert.equal(r.hardChecksPassed, true);
  assert.equal(r.negativeSpace.counters[0].boundedFace, true);
  assert.equal(r.clearance.counterWalls[0].minimumDistance, 30);
  assert.equal(r.identityChecks[0].status, 'passed');
});

test('fixture.counter.merged', () => {
  const r = run(fixtureGlyph({ outer: [SQUARE], counters: ['M20 20 L20 60 L60 60 L60 20 Z', 'M40 40 L40 80 L80 80 L80 40 Z'] }));
  assert.ok(errors(r).includes('VAL_COUNTER_MERGED'));
  const nested = run(fixtureGlyph({ outer: [SQUARE], counters: ['M10 10 L10 90 L90 90 L90 10 Z', INNER] }));
  assert.ok(errors(nested).includes('VAL_COUNTER_MERGED'));
});

test('counter outside its outer contour is reported missing', () => {
  const r = run(fixtureGlyph({ outer: [SQUARE], counters: ['M130 30 L130 70 L170 70 L170 30 Z'] }));
  assert.ok(errors(r).includes('VAL_COUNTER_MISSING'));
  assert.ok(errors(r).includes('VAL_TOPOLOGY_MISMATCH'));
});

test('fixture.aperture.open and fixture.aperture.closed', () => {
  const open = run(fixtureGlyph({ outer: [C_SHAPE], apertures: [{}] }));
  assert.equal(open.hardChecksPassed, true);
  assert.deepEqual(open.negativeSpace.apertures.map((a) => a.exteriorConnected), [true]);
  // Same declaration, but the opening is sealed into an enclosed hole.
  const closed = run(fixtureGlyph({ outer: [SQUARE], counters: [INNER], apertures: [{}] }));
  assert.ok(errors(closed).includes('VAL_APERTURE_CLOSED'));
});

test('fixture.channel.corridor: a channel is never classified as a counter (corridor analysis deferred)', () => {
  const r = run(fixtureGlyph({ outer: [C_SHAPE], channels: [{}] }));
  assert.deepEqual(r.negativeSpace.counters, []);
  assert.equal(r.negativeSpace.channels[0].classifiedAsCounter, false);
  assert.ok(codes(r).includes('GEO_CHANNEL_NOT_ANALYSED'));
});

test('fixture.self-intersection', () => {
  const r = run(fixtureGlyph({ outer: [BOWTIE] }));
  assert.ok(errors(r).includes('VAL_SELF_INTERSECTION'));
  const spike = run(fixtureGlyph({ outer: ['M0 0 L100 0 L50 0 L50 50 Z'] }));
  assert.ok(errors(spike).includes('VAL_SELF_INTERSECTION'), 'fold-back spike');
});

test('fixture.declared-crossing: declared crossing with explicit order passes, without order fails', () => {
  const a = 'M0 0 L60 0 L60 60 L0 60 Z', b = 'M40 40 L100 40 L100 100 L40 100 Z';
  const ids = ['glyph.X.contour.outer', 'glyph.X.contour.outer.2'];
  const ok = run(fixtureGlyph({ outer: [a, b], declaredCrossings: [{ contourIds: ids, order: ids }] }));
  assert.ok(codes(ok).includes('GEO_DECLARED_CROSSING'));
  assert.ok(!errors(ok).includes('VAL_UNDECLARED_CROSSING'));
  const noOrder = run(fixtureGlyph({ outer: [a, b], declaredCrossings: [{ contourIds: ids, order: [] }] }));
  assert.ok(errors(noOrder).includes('VAL_UNDECLARED_CROSSING'));
});

test('fixture.clearance.pass / fixture.clearance.fail with calibrated thresholds and error bounds', () => {
  const g = fixtureGlyph({ outer: [SQUARE], counters: [INNER] });
  const withThreshold = (value) => ({ ...profile, thresholds: [{ kind: 'counter-wall-clearance', featureId: 'glyph.X.negative.counter.c1', value, calibrationStatus: 'approved', calibrationRecordId: 'cal.fixture', nearMargin: 2 }] });
  const pass = run(g, withThreshold(25));
  assert.equal(pass.clearance.counterWalls[0].result, 'passed');
  assert.equal(pass.hardChecksPassed, true);
  const near = run(g, withThreshold(29));
  assert.ok(codes(near).includes('VAL_NEAR_CLEARANCE'));
  const fail = run(g, withThreshold(35));
  assert.ok(errors(fail).includes('VAL_NEGATIVE_SPACE_CLEARANCE'));
  const d = fail.diagnostics.find((x) => x.code === 'VAL_NEGATIVE_SPACE_CLEARANCE');
  assert.deepEqual(Object.keys(d.measured).sort(), ['calibrationStatus', 'errorBound', 'minimumDistance', 'threshold']);
  const unapproved = run(g, { ...profile, thresholds: [{ ...withThreshold(35).thresholds[0], calibrationStatus: 'draft' }] });
  assert.equal(unapproved.hardChecksPassed, true, 'draft thresholds are ignored');
});

test('fixture.anchor.invalid: zero direction and colliding clearance fail', () => {
  const anchors = [
    { id: 'glyph.X.anchor.zero', role: 'entry', position: { x: -20, y: 50 }, direction: { x: 0, y: 0 }, allowedConnections: [], confidence: 'provisional' },
    { id: 'glyph.X.anchor.tight', role: 'exit', position: { x: 105, y: 50 }, direction: { x: 1, y: 0 }, clearanceRadius: 10, allowedConnections: [], confidence: 'provisional' },
  ];
  const r = run(fixtureGlyph({ outer: [SQUARE], anchors }));
  assert.ok(errors(r).includes('VAL_ANCHOR_DIRECTION'));
  assert.ok(errors(r).includes('VAL_ANCHOR_CLEARANCE'));
});

test('degenerate and unclosed geometry fail', () => {
  assert.ok(errors(run(fixtureGlyph({ outer: ['M0 0 L0 0 L100 0 L100 100 Z'] }))).includes('VAL_DEGENERATE'));
  assert.ok(errors(run(fixtureGlyph({ outer: [SQUARE], closed: false }))).includes('VAL_CLOSURE'));
});

test('curves: near-touching quadratic is certified disjoint by adaptive refinement with error bound', () => {
  // Quadratic apex at y = 0.005 below a straight edge at y = 0: closer than the base flattening tolerance.
  const r = run(fixtureGlyph({ outer: ['M0 -10 L100 -10 L100 100 L0 100 Z'], counters: ['M10 50 Q50 -39.99 90 50 Z'] }));
  assert.equal(r.hardChecksPassed, true);
  const g2 = run(fixtureGlyph({ outer: ['M0 0 L100 0 L100 100 L0 100 Z'], counters: ['M10 50 Q50 -49.99 90 50 Z'] }));
  assert.ok(g2.numerical.refinementRounds >= 1);
  assert.equal(g2.hardChecksPassed, true);
  const wall = g2.clearance.counterWalls[0];
  assert.ok(Math.abs(wall.minimumDistance - 0.005) <= wall.measurementErrorBound + 1e-6, JSON.stringify(wall));
});

test('flattening error bound is certified: true curve points lie within the bound of the polygon', () => {
  const c = buildContour('glyph.X.contour.t', 'outer', parsePath('M0 0 Q50 80 100 0 C120 -30 20 -60 0 0 Z')[0].segments);
  const poly = flattenContour(c, 0.5);
  const dist = (p) => Math.min(...poly.edges.map((e) => {
    const a = poly.points[e.a], b = poly.points[e.b];
    const dx = b[0] - a[0], dy = b[1] - a[1], l = dx * dx + dy * dy;
    const t = Math.max(0, Math.min(1, ((p[0] - a[0]) * dx + (p[1] - a[1]) * dy) / l));
    return Math.hypot(p[0] - a[0] - t * dx, p[1] - a[1] - t * dy);
  }));
  for (let i = 0; i <= 200; i++) {
    const t = i / 200, u = 1 - t;
    assert.ok(dist([2 * u * t * 50 + t * t * 100, 2 * u * t * 80]) <= poly.maxError + 1e-9);
  }
  assert.ok(poly.maxError <= 0.5);
});

test('generated validation report is up to date', () => {
  assert.equal(readFileSync(VALIDATION_REPORT_PATH, 'utf8'), renderValidationReport(registry, profile));
});
