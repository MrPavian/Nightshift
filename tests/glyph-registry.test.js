// Ticket 0.7A-T02 acceptance tests: canonical registry + exact legacy import.
import { test } from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import { buildSnapshot, readPrototype, SNAPSHOT_PATH } from '../tools/extract-v06-paths.mjs';
import { sha256Hex } from '../src/core/sha256.js';
import { stableStringify } from '../src/core/stable-json.js';
import { GlyphRegistry } from '../src/glyph/registry.js';
import { importLegacyV06, reserializeLegacyPaths } from '../src/glyph/import-v06.js';
import { validateGlyphDefinition } from '../src/glyph/schema.js';
import { ALPHABET, AUTHORED_LEGACY_SET } from '../src/glyph/ids.js';

const snapshot = JSON.parse(readFileSync(SNAPSHOT_PATH, 'utf8'));
const contract = JSON.parse(readFileSync('contracts/abgrs-glyph-construction.v1.json', 'utf8'));
const registry = GlyphRegistry.fromLegacyV06(snapshot);

test('committed legacy snapshot equals a fresh extraction from the v0.6 prototype', () => {
  const fresh = buildSnapshot(readPrototype());
  assert.equal(stableStringify(fresh, 2) + '\n', readFileSync(SNAPSHOT_PATH, 'utf8'));
  assert.equal(snapshot.source.sha256, sha256Hex(readPrototype()), 'prototype file changed since snapshot');
});

test('every legacy path string appears verbatim in the prototype source', () => {
  const source = readPrototype();
  for (const [ch, e] of Object.entries(snapshot.glyphs)) {
    for (const p of [e.outer, ...(e.inner ?? []), e.combined].filter(Boolean)) {
      assert.ok(source.includes(`'${p.d}'`) || source.includes(`"${p.d}"`), `${ch}: ${p.d.slice(0, 30)}…`);
      assert.equal(sha256Hex(p.d), p.sha256);
    }
  }
});

test('registry validates without errors and covers A–Z', () => {
  assert.deepEqual(registry.errors, []);
  assert.deepEqual(registry.inventory().map((i) => i.character).join(''), ALPHABET);
  assert.ok(registry.inventory().every((i) => i.present));
});

test('imported contours reproduce the legacy path strings byte-for-byte (no normalisation)', () => {
  for (const g of registry.list()) {
    for (const p of reserializeLegacyPaths(g.variants[0])) {
      assert.equal(p.reserialized, p.d, `${g.glyphId} ${p.role}[${p.index}]`);
    }
  }
});

test('import is deterministic and repeatable', () => {
  assert.equal(stableStringify(importLegacyV06(snapshot)), stableStringify(importLegacyV06(snapshot)));
  assert.equal(GlyphRegistry.fromLegacyV06(snapshot).serialize(), registry.serialize());
});

test('A/B/G/R/S match the contract topology declarations and only master variants exist', () => {
  for (const spec of contract.legacyImport.glyphs) {
    const g = registry.get(spec.glyphId);
    const v = g.variants;
    assert.deepEqual(v.map((x) => x.variantId), [spec.variantId]);
    const contours = v[0].geometry.contours;
    assert.equal(contours.filter((c) => c.role === 'outer').length, spec.outerContours, spec.glyphId);
    assert.equal(contours.filter((c) => c.role === 'counter').length, spec.innerContours, spec.glyphId);
    assert.equal(g.semanticGraph.topology.counterIds.length, spec.topology.counters, spec.glyphId);
    if (typeof spec.topology.apertures === 'number') assert.equal(g.semanticGraph.topology.apertureIds.length, spec.topology.apertures);
  }
});

test('G is not given a synthetic counter or unproven aperture', () => {
  const g = registry.getByChar('G');
  const t = g.semanticGraph.topology;
  assert.equal(t.apertureStatus, 'interpretation-required');
  assert.deepEqual(t.apertureIds, []);
  assert.deepEqual(t.counterIds, []);
  assert.deepEqual(g.semanticGraph.negativeSpaces, []);
  assert.ok(g.importDiagnostics.some((d) => d.code === 'IMPORT_APERTURE_INTERPRETATION_REQUIRED'));
});

test('S declares no counter in its master', () => {
  const t = registry.getByChar('S').semanticGraph.topology;
  assert.equal(t.counterStatus, 'none-in-master');
  assert.deepEqual(t.counterIds, []);
});

test('B counters are named by measured position (upper above lower)', () => {
  const v = registry.getByChar('B').variants[0];
  const by = Object.fromEntries(v.geometry.contours.map((c) => [c.contourId, c]));
  const top = (c) => Math.min(...c.segments.filter((s) => 'y' in s).map((s) => s.y));
  assert.ok(top(by['glyph.B.contour.counter.upper']) < top(by['glyph.B.contour.counter.lower']));
});

test('maturity: A/B/G/R/S authored-contour, other 21 provisional and reference-only; no review claimed', () => {
  for (const g of registry.list()) {
    const authored = AUTHORED_LEGACY_SET.includes(g.character);
    assert.equal(g.maturity, authored ? 'authored-contour' : 'provisional', g.glyphId);
    assert.equal(g.variants[0].variantId.endsWith(authored ? '.master' : '.provisional'), true);
    if (!authored) assert.equal(g.variants[0].geometry.editability, 'reference-only');
    assert.deepEqual(g.review, []);
    assert.equal(g.provenance[0].kind, 'legacy-prototype');
    assert.equal(g.baseMetrics.calibrated, false);
    assert.equal(g.coordinateSystem.calibrated, false);
  }
});

test('multi-subpath provisional letters carry an undeclared-topology warning', () => {
  const warned = registry.inventory().filter((i) => i.warnings.includes('IMPORT_UNDECLARED_SUBPATH_TOPOLOGY')).map((i) => i.character);
  assert.deepEqual(warned, ['D', 'O', 'P', 'Q']);
});

test('stable IDs survive serialize/deserialize', () => {
  const restored = GlyphRegistry.fromJSON(registry.serialize());
  assert.deepEqual(restored.errors, []);
  assert.equal(restored.serialize(), registry.serialize());
  const ids = (r) => r.list().flatMap((g) => g.variants.flatMap((v) => v.geometry.contours.flatMap((c) => [c.contourId, ...c.segments.map((s) => s.segmentId)])));
  assert.deepEqual(ids(restored), ids(registry));
});

test('registry records are immutable', () => {
  const g = registry.getByChar('A');
  assert.throws(() => { g.maturity = 'production-approved'; }, TypeError);
  assert.throws(() => { g.variants[0].geometry.contours[0].segments[1].x = 0; }, TypeError);
});

test('validator rejects tampering: maturity without review, geometry drift, bad refs, fake aperture', () => {
  const base = () => structuredClone(registry.getByChar('A'));
  const codes = (g) => validateGlyphDefinition(g).map((d) => d.code);

  let g = base(); g.maturity = 'render-reviewed'; g.variants[0].maturity = 'render-reviewed';
  assert.ok(codes(g).includes('VAL_MATURITY_UNREVIEWED'));

  g = base(); g.variants[0].geometry.contours[0].segments[1].x += 1;
  assert.ok(codes(g).includes('VAL_LEGACY_GEOMETRY_DRIFT'));
  assert.ok(codes(g).includes('VAL_GEOMETRY_HASH_MISMATCH'));

  g = base(); g.variants[0].legacySnapshot.paths[0].d += ' ';
  assert.ok(codes(g).includes('VAL_LEGACY_SNAPSHOT_HASH'));

  g = base(); g.semanticGraph.negativeSpaces[0].geometryRef = 'glyph.A.contour.missing';
  assert.ok(codes(g).includes('VAL_SCHEMA'));

  const G = structuredClone(registry.getByChar('G'));
  G.semanticGraph.topology.apertureStatus = 'classified';
  assert.ok(codes(G).includes('VAL_TOPOLOGY_MISMATCH'));

  g = base(); g.variants[0].geometry.contours[0].contourId = 'glyph.B.contour.outer';
  assert.ok(codes(g).includes('VAL_SCHEMA'));
});

test('A counter orientation finding is recorded (same winding as outer)', () => {
  const codes = (ch) => registry.getByChar(ch).importDiagnostics.map((d) => d.code);
  assert.ok(codes('A').includes('IMPORT_COUNTER_SAME_WINDING'));
  assert.ok(!codes('B').includes('IMPORT_COUNTER_SAME_WINDING'));
  assert.ok(!codes('R').includes('IMPORT_COUNTER_SAME_WINDING'));
});

test('core model has no DOM or Three.js dependency', () => {
  for (const f of ['src/glyph/registry.js', 'src/glyph/import-v06.js', 'src/glyph/schema.js', 'src/geometry/svg-path.js']) {
    const src = readFileSync(f, 'utf8');
    assert.ok(!/from ['"]three|document\.|window\./.test(src), f);
  }
});
