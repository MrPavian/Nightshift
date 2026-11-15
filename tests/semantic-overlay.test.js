// Ticket 0.7A-T03 acceptance tests: semantic overlays and topology declarations.
import { test } from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import { readInputs } from '../src/glyph/load-node.js';
import { GlyphRegistry } from '../src/glyph/registry.js';
import { importLegacyV06 } from '../src/glyph/import-v06.js';
import { applyAuthoredSnapshot } from '../src/glyph/import-authored.js';
import { applySemanticOverlay, topologyReport, resolveRef } from '../src/glyph/semantic-overlay.js';
import { validateGlyphDefinition } from '../src/glyph/schema.js';
import { stableStringify } from '../src/core/stable-json.js';
import { renderReport, REPORT_PATH } from '../tools/report-topology.mjs';

const inputs = readInputs();
const registry = GlyphRegistry.build(inputs);
const imported = new GlyphRegistry(inputs.authored.reduce((recs, a) => applyAuthoredSnapshot(recs, a.snapshot, a.sourcePath), importLegacyV06(inputs.snapshot)));
const abgrsContract = JSON.parse(readFileSync('contracts/abgrs-glyph-construction.v1.json', 'utf8'));
const codes = (g) => validateGlyphDefinition(g).map((d) => d.code);

test('overlaid registry validates without errors', () => {
  assert.deepEqual(registry.errors, []);
});

test('overlay does not change any geometry or legacy snapshot', () => {
  for (const g of registry.list()) {
    const before = imported.get(g.glyphId).variants[0];
    const after = g.variants[0];
    assert.equal(after.geometryHash, before.geometryHash, g.glyphId);
    assert.equal(stableStringify(after.geometry), stableStringify(before.geometry));
    assert.deepEqual(after.legacySnapshot, before.legacySnapshot);
  }
});

test('overlay is pure: input records are not mutated', () => {
  const records = importLegacyV06(inputs.snapshot);
  const snapshotText = stableStringify(records);
  applySemanticOverlay(records, inputs.overlay, inputs);
  assert.equal(stableStringify(records), snapshotText);
});

test('A/B/G/R/S components match the contract proposals exactly; waves 1–2 match their plans; other letters untouched', () => {
  for (const [gid, names] of Object.entries(abgrsContract.componentProposals)) {
    const comps = registry.get(gid).semanticGraph.components;
    assert.deepEqual(comps.map((c) => c.label).sort(), [...names].sort(), gid);
    assert.ok(comps.every((c) => c.id === `glyph.${gid.slice(-1)}.component.${c.label}`));
  }
  const PLAN = { C: ['upper-terminal', 'upper-arc', 'lower-arc', 'lower-terminal'], D: ['spine', 'bowl', 'spine-bowl-junction', 'counter-boundary'],
    O: ['outer-bowl', 'counter-boundary'], P: ['spine', 'upper-bowl', 'lower-termination', 'counter-boundary'], Q: ['outer-bowl', 'tail', 'tail-junction', 'counter-boundary'],
    E: ['spine', 'top-bar', 'middle-bar', 'foot-bar'], F: ['spine', 'top-bar', 'middle-bar', 'foot'], H: ['left-stem', 'crossbar', 'right-stem'],
    I: ['stem', 'top-terminal', 'foot-terminal'], L: ['spine', 'foot-bar'], T: ['top-bar', 'stem'] };
  for (const [ch, names] of Object.entries(PLAN)) {
    assert.deepEqual(registry.getByChar(ch).semanticGraph.components.map((c) => c.label).sort(), [...names].sort(), ch);
  }
  for (const ch of 'JKMNUVWXYZ') {
    assert.deepEqual(registry.getByChar(ch).semanticGraph.components, []);
    assert.equal(registry.getByChar(ch).revision, 1);
  }
});

test('only topologically determined counter boundaries are mapped', () => {
  for (const ch of 'ABGRS') {
    const g = registry.getByChar(ch);
    const contours = new Map(g.variants[0].geometry.contours.map((c) => [c.contourId, c]));
    for (const c of g.semanticGraph.components) {
      if (c.mappingStatus === 'mapped') {
        assert.equal(c.role, 'counter-boundary', c.id);
        assert.ok(c.geometryRefs.every((r) => contours.get(r)?.role === 'counter'), c.id);
      } else {
        assert.deepEqual(c.geometryRefs, [], c.id);
      }
    }
  }
  const mapped = (ch) => registry.getByChar(ch).semanticGraph.components.filter((c) => c.mappingStatus === 'mapped').length;
  assert.deepEqual([...'ABGRS'].map(mapped), [1, 2, 0, 1, 0]);
});

test('A/B/R counter counts match import; each counter has its boundary component', () => {
  for (const [ch, n] of [['A', 1], ['B', 2], ['R', 1]]) {
    const ns = registry.getByChar(ch).semanticGraph.negativeSpaces.filter((x) => x.kind === 'counter');
    assert.equal(ns.length, n, ch);
    assert.ok(ns.every((x) => x.boundaryComponentIds.length === 1), ch);
  }
});

test('S has no enclosed counter in master', () => {
  const sg = registry.getByChar('S').semanticGraph;
  assert.equal(sg.topology.counterStatus, 'none-in-master');
  assert.deepEqual(sg.negativeSpaces, []);
  assert.equal(sg.topology.signature.requiredCounterIds.length, 0);
});

test('G aperture is explicitly unresolved, reported with reasons, and its operation is gated', () => {
  const g = registry.getByChar('G');
  const sg = g.semanticGraph;
  assert.equal(sg.topology.apertureStatus, 'interpretation-required');
  assert.equal(sg.components.find((c) => c.label === 'aperture-boundary').mappingStatus, 'pending-classification');
  assert.ok(sg.apertureInterpretation.blockers.length >= 2);
  assert.ok(sg.apertureInterpretation.blockers.some((b) => b.includes('AUD-03')));
  assert.deepEqual(sg.apertureInterpretation.gatedOperations, [{ operationId: 'glyph.G.set-aperture-width', commitAllowed: false }]);
  const report = topologyReport(g);
  const f = report.findings.find((x) => x.code === 'TOPO_APERTURE_UNRESOLVED');
  assert.equal(f.severity, 'warning');
  assert.ok(!report.findings.some((x) => x.code === 'TOPO_APERTURE_PASSED'));

  const tampered = structuredClone(g);
  tampered.semanticGraph.apertureInterpretation.gatedOperations[0].commitAllowed = true;
  assert.ok(codes(tampered).includes('VAL_TOPOLOGY_MISMATCH'));
});

test('identity invariants from the parameter contract become declared, unverified constraints', () => {
  for (const pg of inputs.parameterContract.glyphs) {
    const cs = registry.get(pg.glyphId).semanticGraph.constraints.filter((c) => c.kind === 'identity-invariant');
    assert.deepEqual(cs.map((c) => c.description), pg.identityInvariants, pg.glyphId);
    assert.ok(cs.every((c) => c.status === 'declared-unverified'));
  }
  const g = registry.getByChar('G').semanticGraph.constraints.find((c) => c.kind === 'preserve-aperture');
  assert.equal(g.status, 'pending-classification');
});

test('candidate proposals cover each outer contour segment exactly once (reviewable partition)', () => {
  for (const ch of 'ABCDGOPQRS') {
    const g = registry.getByChar(ch);
    const outer = g.variants[0].geometry.contours.find((c) => c.role === 'outer');
    const counts = new Map(outer.segments.filter((s) => s.type !== 'move').map((s) => [s.segmentId, 0]));
    for (const c of g.semanticGraph.components) {
      for (const r of c.candidateGeometryRefs) if (counts.has(r)) counts.set(r, counts.get(r) + 1);
    }
    for (const [id, n] of counts) assert.equal(n, 1, `${id} covered ${n}×`);
  }
});

test('topology reports distinguish counters, apertures and channels and are traceable to IDs', () => {
  for (const ch of 'ABGRS') {
    const r = topologyReport(registry.getByChar(ch));
    assert.ok('counters' in r.negativeSpace && 'apertures' in r.negativeSpace && 'channels' in r.negativeSpace);
    assert.ok(r.findings.every((f) => f.affectedIds.length > 0 && typeof f.code === 'string'));
    assert.ok(!r.findings.some((f) => f.severity === 'error'), ch);
  }
});

test('semantic IDs survive serialize/deserialize', () => {
  const restored = GlyphRegistry.fromJSON(registry.serialize());
  assert.deepEqual(restored.errors, []);
  assert.equal(restored.serialize(), registry.serialize());
});

test('validator rejects bad semantic references', () => {
  const base = () => structuredClone(registry.getByChar('R'));
  let g = base(); g.semanticGraph.components[0].geometryRefs = ['glyph.R.contour.outer.seg.01'];
  assert.ok(codes(g).includes('VAL_SCHEMA'), 'unmapped claiming geometry');
  g = base(); g.semanticGraph.components[0].candidateGeometryRefs.push('glyph.R.contour.outer.seg.99');
  assert.ok(codes(g).includes('VAL_SCHEMA'), 'unknown candidate segment');
  g = base(); g.semanticGraph.components[0].connectsTo.push('glyph.R.component.tail');
  assert.ok(codes(g).includes('VAL_SCHEMA'), 'unknown connectsTo');
  g = base(); g.semanticGraph.junctions[0].candidateNodeRefs.push('glyph.R.contour.outer.node.42');
  assert.ok(codes(g).includes('VAL_SCHEMA'), 'unknown node');
  g = base(); g.semanticGraph.constraints[0].targetIds.push('glyph.R.component.nope');
  assert.ok(codes(g).includes('VAL_SCHEMA'), 'unknown constraint target');
  g = base(); g.semanticGraph.components[0].role = 'swoosh';
  assert.ok(codes(g).includes('VAL_SCHEMA'), 'invalid role');
});

test('resolveRef expands overlay shorthand deterministically', () => {
  assert.equal(resolveRef('B', 'outer#07'), 'glyph.B.contour.outer.seg.07');
  assert.equal(resolveRef('B', 'outer@03'), 'glyph.B.contour.outer.node.03');
  assert.equal(resolveRef('B', 'counter.upper'), 'glyph.B.contour.counter.upper');
  assert.throws(() => resolveRef('B', 'Outer#7'));
});

test('generated topology report is up to date', () => {
  assert.equal(readFileSync(REPORT_PATH, 'utf8'), renderReport(registry));
});
