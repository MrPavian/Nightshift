// C03: style grammar resolver. Styles must change construction (monochrome geometry), not just looks.
import { test } from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import { loadRegistry, readInputs, DEFAULT_INPUTS } from '../src/glyph/load-node.js';
import { GlyphRegistry } from '../src/glyph/registry.js';
import { validateGlyphGeometry } from '../src/glyph/validate-geometry.js';
import { resolveStyle, normaliseRequest } from '../src/style/resolver.js';

const contract = JSON.parse(readFileSync('contracts/style-resolver.v1.json', 'utf8'));
const profile = JSON.parse(readFileSync('data/validator-profiles/legacy-v06.v1.json', 'utf8'));
const registry = loadRegistry();
const ctx = { contract, profile };
const cache = new Map();
const res = (ch, p) => { const k = `${ch}:${typeof p === 'string' ? p : JSON.stringify(p)}`; if (!cache.has(k)) cache.set(k, resolveStyle(registry.getByChar(ch), p, ctx)); return cache.get(k); };
const ALL = registry.list().map((g) => g.character);
const counters = (rec) => validateGlyphGeometry(rec, profile).negativeSpace.counters.filter((c) => c.boundedFace).length;

test('Bubble, Straight and Blockbuster give different monochrome geometry; every result is valid and keeps its counters', () => {
  for (const ch of ALL) {
    const g = registry.getByChar(ch), master = g.variants[0].geometryHash, n = counters(g);
    const b = res(ch, 'bubble'), bb = res(ch, 'blockbuster'), s = res(ch, 'straight');
    assert.equal(b.status, 'applied', `${ch} bubble`); assert.equal(bb.status, 'applied', `${ch} blockbuster`);
    assert.notEqual(b.geometryHash, master, `${ch} bubble differs from neutral`);
    assert.notEqual(bb.geometryHash, master, `${ch} blockbuster differs from neutral`);
    assert.notEqual(b.geometryHash, bb.geometryHash, `${ch} bubble differs from blockbuster`);
    assert.notEqual(bb.geometryHash, s.geometryHash, `${ch} blockbuster differs from straight`);
    for (const r of [b, bb, s].filter((x) => x.derived)) {
      const v = validateGlyphGeometry(r.derived, profile);
      assert.equal(v.hardChecksPassed, true, `${ch} ${r.request.preset} hard checks`);
      assert.equal(counters(r.derived), n, `${ch} ${r.request.preset} keeps ${n} counter(s)`);
      assert.equal(r.derived.variants[0].geometry.editability, 'reference-only', 'derived geometry is not directly editable');
    }
  }
});

test('Straight changes only curves and sharp corners; right-angled letters are reported unchanged, not faked', () => {
  for (const ch of ALL) {
    const s = res(ch, 'straight'), master = registry.getByChar(ch).variants[0].geometryHash;
    if (s.status === 'unchanged') {
      assert.equal(s.geometryHash, master);
      assert.ok(s.operations.every((o) => o.status === 'unchanged' && o.reason), `${ch} gives reasons`);
    } else { assert.equal(s.status, 'applied'); assert.notEqual(s.geometryHash, master); }
  }
  for (const ch of 'BDJPRU') assert.equal(res(ch, 'straight').operations[0].status, 'applied', `${ch} has curves`);
  for (const ch of 'EFHILT') assert.equal(res(ch, 'straight').status, 'unchanged', `${ch} has only right angles`);
});

test('resolution is deterministic and never mutates the canonical master', () => {
  const g = registry.getByChar('R'), before = JSON.stringify(g);
  const a = resolveStyle(g, 'bubble', ctx), b = resolveStyle(g, 'bubble', ctx), c = resolveStyle(loadRegistry().getByChar('R'), 'bubble', ctx);
  assert.equal(a.geometryHash, b.geometryHash); assert.equal(a.geometryHash, c.geometryHash);
  assert.deepEqual(a.operations, b.operations);
  assert.equal(JSON.stringify(g), before);
});

test('axes stay separate: practice context and rendering never change geometry', () => {
  const neutralThrowUp = resolveStyle(registry.getByChar('A'), { letterform: 'neutral', composition: 'neutral', practiceContext: 'throw-up', rendering: ['outline', 'depth'] }, ctx);
  assert.equal(neutralThrowUp.status, 'unchanged');
  assert.equal(neutralThrowUp.geometryHash, registry.getByChar('A').variants[0].geometryHash, 'throw-up context alone does not force bubble geometry');
  const plain = resolveStyle(registry.getByChar('A'), { letterform: 'bubble' }, ctx);
  const dressed = resolveStyle(registry.getByChar('A'), { letterform: 'bubble', practiceContext: 'throw-up', rendering: ['outline', 'depth', 'highlights'] }, ctx);
  assert.equal(plain.geometryHash, dressed.geometryHash);
  assert.deepEqual(dressed.nonGeometricAxes, { practiceContext: 'throw-up', rendering: ['outline', 'depth', 'highlights'] });
  const bb = normaliseRequest(contract, 'blockbuster');
  assert.equal(bb.letterform, 'straight'); assert.equal(bb.composition, 'block-fit', 'Blockbuster = straight letterform + block-fit composition');
});

test('Wildstyle is a study: interlocking is skipped with a reason and never reported as applied', () => {
  for (const ch of ALL) {
    const w = res(ch, 'wildstyle');
    const inter = w.operations.find((o) => o.operationId === 'composition.interlocking');
    assert.equal(inter.status, 'skipped'); assert.match(inter.reason, /C04/);
    assert.equal(w.status, 'partial');
    assert.equal(w.geometryHash, res(ch, 'straight').geometryHash, 'only the letterform is shown');
  }
  assert.equal(contract.operations['composition.interlocking'].available, false);
});

test('glyphs without an editable authored master fall back to neutral with a reason', () => {
  const legacy = GlyphRegistry.build(readInputs(DEFAULT_INPUTS, []));
  const r = resolveStyle(legacy.getByChar('C'), 'bubble', ctx);
  assert.equal(r.status, 'fallback'); assert.equal(r.derived, null); assert.ok(r.operations[0].reason);
});

test('unknown presets and axis values are rejected, not guessed', () => {
  assert.throws(() => normaliseRequest(contract, 'burner'), /Unknown style preset/);
  assert.throws(() => normaliseRequest(contract, { letterform: 'wildstyle' }), /Unknown letterform/);
  assert.throws(() => normaliseRequest(contract, { rendering: ['neon'] }), /Unknown rendering/);
});

test('Bubble swells the outline (not just thicker): sides bulge, counters shrink, gaps between arms stay open', async () => {
  for (const ch of ALL) {
    const ops = Object.fromEntries(res(ch, 'bubble').operations.map((o) => [o.operationId, o.status]));
    assert.equal(ops['letterform.bubble.inflate'], 'applied', ch);
    assert.equal(ops['letterform.bubble.smooth'], 'applied', ch);
  }
  // a swollen side: the middle of E's left side lies further out than its corners would allow for a plain offset
  const { glyphPolygons } = await import('../src/style/render.js');
  const e = glyphPolygons(res('E', 'bubble').derived)[0].poly;
  const minX = Math.min(...e.map((p) => p[0]));
  assert.ok(minX < 10 - 9 - 1, `E bulges beyond the plain offset (min x ${minX})`);
});

test('bounce is word composition only: same glyph geometry, glyphs tilt and shift, no undeclared overlap', async () => {
  const { layoutWord } = await import('../src/style/render.js');
  const neutral = resolveStyle(registry.getByChar('B'), { letterform: 'bubble', composition: 'neutral' }, ctx);
  assert.equal(neutral.geometryHash, res('B', 'bubble').geometryHash);
  const recs = [...'ABRA'].map((c) => res(c, 'bubble').derived);
  const placed = layoutWord(recs, 'bounce', contract.operations['composition.bounce'].params);
  assert.ok(placed.some((p) => p.rotate !== 0) && placed.some((p) => p.y !== 0));
  // The old assertion here required overlapping letters; Issue #24 replaced it with the no-contact policy
  // (see tests/style-safety.test.js for the transformed-contour checks).
  for (let i = 1; i < placed.length; i++) assert.ok(placed[i].x > placed[i - 1].x, 'letters stay in order');
  const flat = layoutWord(recs, 'neutral');
  assert.ok(flat.every((p) => p.rotate === 0 && p.y === 0));
});
