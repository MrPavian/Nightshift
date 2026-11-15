// C02 wave 1: authored C/D/O/P/Q masters.
import { test } from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import { loadRegistry, readInputs } from '../src/glyph/load-node.js';
import { validateGlyphGeometry } from '../src/glyph/validate-geometry.js';
import { buildRenderModel } from '../src/render/render-model.js';
import { reserializeLegacyPaths, stripIds } from '../src/glyph/import-v06.js';
import { serializeSegments } from '../src/geometry/svg-path.js';
import { sha256Hex } from '../src/core/sha256.js';
import { EditorStore, moveNodeCommand } from '../src/model/editor-store.js';

const profile = JSON.parse(readFileSync('data/validator-profiles/legacy-v06.v1.json', 'utf8'));
const snapshot = JSON.parse(readFileSync('data/glyphs/authored/c02-wave1.v1.json', 'utf8'));
const registry = loadRegistry();
const run = (ch) => validateGlyphGeometry(registry.getByChar(ch), profile);
const WAVE1 = ['C', 'D', 'O', 'P', 'Q'];

test('authoring snapshot is hash-consistent and declares original Claude provenance with pending review', () => {
  assert.deepEqual(Object.keys(snapshot.glyphs).sort(), [...WAVE1].sort());
  for (const g of Object.values(snapshot.glyphs)) for (const p of [g.outer, ...g.counters]) assert.equal(sha256Hex(p.d), p.sha256);
  assert.equal(snapshot.provenance.kind, 'claude-authored');
  assert.equal(snapshot.provenance.review, 'pending');
  assert.match(snapshot.provenance.method, /Not traced or derived/);
});

test('wave 1 records: authored-contour master first, v0.6 base kept as reference-only second variant, no review claimed', () => {
  for (const ch of WAVE1) {
    const g = registry.getByChar(ch);
    assert.equal(g.maturity, 'authored-contour', ch);
    assert.deepEqual(g.variants.map((v) => v.variantId), [`${ch.toLowerCase()}.master`, `${ch.toLowerCase()}.provisional`]);
    assert.equal(g.variants[0].geometry.editability, 'fully-editable');
    assert.equal(g.variants[1].geometry.editability, 'reference-only');
    assert.equal(g.variants[1].maturity, 'provisional');
    assert.equal(g.provenance[0].kind, 'claude-authored');
    assert.equal(g.provenance[1].kind, 'legacy-prototype');
    assert.deepEqual(g.review, []);
  }
  // Every other letter is unchanged in maturity.
  for (const g of registry.list().filter((x) => !'ABGRSCDOPQEFHILTKMNVWXYZJU'.includes(x.character))) assert.equal(g.maturity, 'provisional', g.character);
});

test('authored contours reproduce the snapshot byte-for-byte; the legacy reference variant still matches v0.6', () => {
  for (const ch of WAVE1) {
    const [master, legacy] = registry.getByChar(ch).variants;
    for (const p of master.authoringSnapshot.paths) {
      const c = master.geometry.contours.find((x) => x.contourId === p.contourId);
      assert.equal(serializeSegments(stripIds(c.segments)), p.d, `${ch} ${p.contourId}`);
    }
    for (const p of reserializeLegacyPaths(legacy)) assert.equal(p.reserialized, p.d);
  }
});

test('all wave 1 masters pass hard validation and render with declared topology', () => {
  for (const ch of WAVE1) {
    const r = run(ch);
    assert.deepEqual(r.diagnostics.filter((d) => d.severity === 'error'), [], ch);
    assert.equal(r.topology.connectedComponents, 1, ch);
    assert.ok(buildRenderModel(registry.getByChar(ch), r), ch);
  }
});

test('topology vocabulary: C aperture, O/D/P/Q one enclosed counter each', () => {
  for (const ch of ['O', 'D', 'P', 'Q']) {
    const r = run(ch);
    assert.equal(r.negativeSpace.counters.length, 1, ch);
    assert.ok(r.negativeSpace.counters[0].boundedFace, ch);
    assert.equal(r.identityChecks.find((c) => c.name === 'counter-enclosed').status, 'passed', ch);
  }
  const c = run('C');
  assert.deepEqual(c.negativeSpace.counters, []);
  assert.deepEqual(c.negativeSpace.apertures.map((a) => a.exteriorConnected), [true]);
  assert.equal(c.identityChecks.find((x) => x.name === 'aperture-exterior-connected').status, 'passed');
  assert.equal(registry.getByChar('C').semanticGraph.topology.apertureStatus, 'classified');
});

test('C aperture mouth is an authored measurement construction (48 units, uncalibrated)', () => {
  const g = registry.getByChar('C');
  const ap = g.semanticGraph.negativeSpaces.find((n) => n.kind === 'aperture');
  const pts = ap.mouthNodeRefs.map((ref) => g.variants[0].geometry.contours[0].segments.find((s) => s.nodeId === ref));
  assert.equal(Math.hypot(pts[0].x - pts[1].x, pts[0].y - pts[1].y), 48);
  assert.deepEqual(ap.boundaryComponentIds, ['glyph.C.component.upper-terminal', 'glyph.C.component.lower-terminal']);
});

test('C, G and O stay topologically distinct', () => {
  const sig = (ch) => {
    const t = registry.getByChar(ch).semanticGraph.topology;
    return `${t.counterIds.length}c/${t.apertureIds.length}a/${t.apertureStatus}`;
  };
  assert.deepEqual([sig('C'), sig('G'), sig('O')], ['0c/1a/classified', '0c/0a/interpretation-required', '1c/0a/none-declared']);
  assert.ok(registry.getByChar('G').semanticGraph.components.some((c) => c.role === 'bar'));
  assert.ok(!registry.getByChar('C').semanticGraph.components.some((c) => c.role === 'bar'));
});

test('Q tail is part of the outer contour and never touches the counter', () => {
  const r = run('Q');
  assert.equal(r.topology.containment.find((c) => c.contourId === 'glyph.Q.contour.counter.primary').parent, 'glyph.Q.contour.outer');
  assert.ok(r.clearance.counterWalls[0].minimumDistance >= 20);
  const tail = registry.getByChar('Q').semanticGraph.components.find((c) => c.label === 'tail');
  assert.equal(tail.candidateGeometryRefs.length, 3);
  assert.ok(registry.getByChar('Q').baseMetrics.visibleBounds.maxY > 132, 'tail descends below the baseline');
});

test('family consistency: wall thickness of new counters matches the A/B/G/R/S range', () => {
  const walls = (ch) => run(ch).clearance.counterWalls.map((w) => w.minimumDistance);
  const ref = ['A', 'B', 'R'].flatMap(walls);
  const lo = Math.min(...ref) - 1, hi = Math.max(...ref) + 9;
  for (const ch of ['D', 'O', 'P', 'Q']) for (const w of walls(ch)) assert.ok(w >= lo && w <= hi, `${ch} wall ${w} vs reference ${lo}–${hi}`);
});

test('wave 1 masters are editable through the command loop; provisional reference variants are not', () => {
  const s = new EditorStore(registry.list(), profile);
  const r = s.submit(moveNodeCommand(s, 'latin.upper.O', 'glyph.O.contour.outer.node.01', { x: 78, y: 8 }));
  assert.equal(r.committed, true);
  assert.equal(s.get('latin.upper.O').variants[1].variantId, 'o.provisional', 'reference variant untouched');
  assert.equal(s.get('latin.upper.O').variants[1].geometryHash, registry.getByChar('O').variants[1].geometryHash);
});

test('browser and Node loaders use the same input list', () => {
  const inputs = readInputs();
  assert.deepEqual(inputs.authored.map((a) => a.sourcePath), ['data/glyphs/authored/c02-wave1.v1.json', 'data/glyphs/authored/c02-wave2.v1.json', 'data/glyphs/authored/c02-wave3.v1.json', 'data/glyphs/authored/c02-wave4.v1.json']);
});
