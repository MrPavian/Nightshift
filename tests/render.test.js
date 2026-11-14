// Ticket 0.7A-T05 acceptance tests: topology-correct monochrome renderer.
import { test } from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import { loadRegistry } from '../src/glyph/load-node.js';
import { validateGlyphGeometry } from '../src/glyph/validate-geometry.js';
import { buildRenderModel, renderModelArea, reverseContourSegments, RenderError } from '../src/render/render-model.js';
import { glyphSvg, glyphGroup } from '../src/render/svg.js';
import { buildGlyphObject, meshArea, meshCovers } from '../src/editor/three-glyph.js';
import { signedArea } from '../src/geometry/area.js';
import { parsePath, serializeSegments } from '../src/geometry/svg-path.js';
import { stableStringify } from '../src/core/stable-json.js';

const profile = JSON.parse(readFileSync('data/validator-profiles/legacy-v06.v1.json', 'utf8'));
const registry = loadRegistry();
const model = (ch) => {
  const g = registry.getByChar(ch);
  return buildRenderModel(g, validateGlyphGeometry(g, profile));
};
const perimeter = (m) => m.regions.flatMap((r) => [r.polygons.outer, ...r.polygons.holes]).reduce((sum, p) =>
  sum + p.edges.reduce((s, e) => s + Math.hypot(p.points[e.b][0] - p.points[e.a][0], p.points[e.b][1] - p.points[e.a][1]), 0), 0);

test('A/B/G/R/S render models carry declared holes only (A/B/R counters, none for G/S)', () => {
  const holes = (ch) => model(ch).regions.flatMap((r) => r.holes.map((h) => h.contourId));
  assert.deepEqual(holes('A'), ['glyph.A.contour.counter.primary']);
  assert.deepEqual(holes('B'), ['glyph.B.contour.counter.upper', 'glyph.B.contour.counter.lower']);
  assert.deepEqual(holes('G'), []);
  assert.deepEqual(holes('R'), ['glyph.R.contour.counter.primary']);
  assert.deepEqual(holes('S'), []);
});

test('invalid or undeclared topology produces structured failures, not a misleading render', () => {
  const err = (ch) => { try { model(ch); return null; } catch (e) { return e; } };
  const q = err('Q');
  assert.ok(q instanceof RenderError);
  assert.equal(q.code, 'RENDER_INVALID_TOPOLOGY');
  assert.ok(q.diagnostics.every((d) => d.code === 'VAL_UNDECLARED_CROSSING'));
  for (const ch of 'DOP') assert.equal(err(ch).code, 'RENDER_UNDECLARED_TOPOLOGY', ch);
  const rendered = registry.list().filter((g) => !err(g.character)).length;
  assert.equal(rendered, 22);
});

test('a report from another geometry revision is rejected', () => {
  const g = registry.getByChar('A');
  const report = { ...validateGlyphGeometry(g, profile), geometryHash: 'stale' };
  assert.throws(() => buildRenderModel(g, report), (e) => e.code === 'RENDER_STALE_REPORT');
  assert.throws(() => buildRenderModel(registry.getByChar('B'), validateGlyphGeometry(g, profile)), (e) => e.code === 'RENDER_REPORT_MISMATCH');
});

test('derived contours are re-oriented: outer clockwise, holes counter-clockwise (y-down)', () => {
  for (const ch of 'ABGRS') {
    for (const r of model(ch).regions) {
      assert.ok(signedArea(r.outer.segments) > 0, `${ch} outer`);
      for (const h of r.holes) assert.ok(signedArea(h.segments) < 0, `${ch} ${h.contourId}`);
    }
  }
  // A's counter had the same winding as its outer contour; the derived copy is reversed.
  assert.equal(model('A').regions[0].holes[0].reoriented, true);
});

test('re-oriented compound path reproduces the declared topology under BOTH fill rules', () => {
  for (const ch of 'ABR') {
    const g = structuredClone(registry.getByChar(ch));
    const m = model(ch);
    const derived = new Map(m.regions.flatMap((r) => [r.outer, ...r.holes]).map((c) => [c.contourId, c.segments]));
    for (const c of g.variants[0].geometry.contours) {
      c.segments = derived.get(c.contourId).map((s, i) => ({ ...s, segmentId: `${c.contourId}.seg.d${i}`, ...(s.type === 'close' ? {} : { nodeId: `${c.contourId}.node.d${i}` }) }));
    }
    g.variants[0].deliberateChanges = ['test: derived render orientation'];
    delete g.variants[0].geometryHash;
    const r = validateGlyphGeometry(g, profile);
    assert.equal(r.topology.fillRules.nonzero.reproducesDeclaredTopology, true, ch);
    assert.equal(r.topology.fillRules.evenodd.reproducesDeclaredTopology, true, ch);
  }
});

test('reverseContourSegments preserves shape and is an involution', () => {
  for (const d of ['M0 0 L10 0 L10 10 Z', 'M10 8 L58 8 Q96 8 96 39 Q96 59 77 69 L10 132 Z', 'M0 0 C10 -10 20 10 30 0 L30 30 Z']) {
    const segs = parsePath(d)[0].segments;
    const rev = reverseContourSegments(segs);
    assert.ok(Math.abs(signedArea(rev) + signedArea(segs)) < 1e-9, d);
    assert.equal(serializeSegments(reverseContourSegments(rev)), serializeSegments(segs), d);
  }
});

test('SVG output: one compound path per region, no painted holes, fill and outline share topology', () => {
  for (const ch of 'ABGRS') {
    const m = model(ch);
    const svg = glyphSvg(m, { surface: '#16181d', fill: '#eeeeee', outline: { color: '#000', width: 2 } });
    assert.ok(!/#eee9dc/i.test(svg), 'no legacy paper colour');
    const fills = [...svg.matchAll(/fill="([^"]+)"/g)].map((x) => x[1]);
    assert.deepEqual([...new Set(fills)].sort(), ['#16181d', '#eeeeee', 'none'].sort(), ch);
    const fillD = [...svg.matchAll(/data-role="fill"[^>]* d="([^"]+)"/g)].map((x) => x[1]);
    const outlineD = [...svg.matchAll(/data-role="outline" d="([^"]+)"/g)].map((x) => x[1]);
    assert.deepEqual(outlineD, fillD, `${ch} outline uses the fill topology`);
    assert.equal((svg.match(/data-role="surface"/g) ?? []).length, 1);
    assert.ok(svg.includes(`data-glyph-id="${m.glyphId}"`) && svg.includes(`data-geometry-hash="${m.geometryHash}"`));
  }
});

test('diagnostic mode flags G’s unresolved aperture and draws counter boundaries', () => {
  assert.ok(glyphGroup(model('G'), { diagnostic: true }).includes('data-role="aperture-unresolved"'));
  assert.ok(!glyphGroup(model('A'), { diagnostic: true }).includes('aperture-unresolved'));
  assert.equal((glyphGroup(model('B'), { diagnostic: true }).match(/data-role="counter-boundary"/g) ?? []).length, 2);
  assert.ok(!glyphGroup(model('B')).includes('data-role="diagnostics"'), 'off by default');
});

test('Three.js meshes match canonical area within the flattening bound and keep holes open', () => {
  for (const ch of 'ABGRS') {
    const m = model(ch);
    const obj = buildGlyphObject(m);
    const exact = renderModelArea(m);
    assert.ok(Math.abs(meshArea(obj) - exact) <= perimeter(m) * m.flatteningTolerance, `${ch}: ${meshArea(obj)} vs ${exact}`);
    for (const p of m.probes) {
      assert.equal(meshCovers(obj, ...p.point), p.expect === 'filled', `${ch} probe ${p.contourId}`);
    }
    assert.equal(obj.userData.glyphId, m.glyphId);
    obj.traverse((o) => { if (o.isMesh) assert.equal(o.userData.glyphId, m.glyphId); });
  }
  // Polygon-only glyphs triangulate exactly.
  for (const ch of 'AGS') assert.ok(Math.abs(meshArea(buildGlyphObject(model(ch))) - renderModelArea(model(ch))) < 1e-6, ch);
});

test('rendering is deterministic and leaves the canonical registry unchanged', () => {
  const before = registry.serialize();
  for (const ch of 'ABGRS') assert.equal(glyphSvg(model(ch), { diagnostic: true }), glyphSvg(model(ch), { diagnostic: true }));
  assert.equal(stableStringify(model('B')), stableStringify(model('B')));
  assert.equal(registry.serialize(), before);
});

test('committed proof run passed and matches the current geometry', () => {
  const manifest = JSON.parse(readFileSync('docs/reports/proof/T05/manifest.json', 'utf8'));
  assert.equal(manifest.result, 'pass');
  assert.equal(manifest.review.status, 'pending');
  assert.ok(manifest.negativeControls.length >= 2 && manifest.negativeControls.every((c) => c.detected));
  for (const gl of manifest.glyphs) {
    assert.equal(gl.geometryHash, registry.getByChar(gl.glyph).variants[0].geometryHash, `${gl.glyph} proof is stale`);
    assert.equal(gl.probesPassed, gl.probes);
    assert.equal(gl.parity.differingOutsideEdgeBand, 0);
  }
});
