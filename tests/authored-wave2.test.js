// C02 wave 2: authored E/F/H/I/L/T masters (bar and stem systems).
import { test } from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import { loadRegistry } from '../src/glyph/load-node.js';
import { validateGlyphGeometry } from '../src/glyph/validate-geometry.js';
import { buildRenderModel } from '../src/render/render-model.js';
import { sha256Hex } from '../src/core/sha256.js';
import { EditorStore, moveNodeCommand } from '../src/model/editor-store.js';

const profile = JSON.parse(readFileSync('data/validator-profiles/legacy-v06.v1.json', 'utf8'));
const snapshot = JSON.parse(readFileSync('data/glyphs/authored/c02-wave2.v1.json', 'utf8'));
const plan = JSON.parse(readFileSync('contracts/alphabet-authoring-plan.v1.json', 'utf8'));
const registry = loadRegistry();
const WAVE2 = ['E', 'F', 'H', 'I', 'L', 'T'];
const run = (ch) => validateGlyphGeometry(registry.getByChar(ch), profile);
const outer = (ch) => registry.getByChar(ch).variants[0].geometry.contours[0];
const pts = (ch) => outer(ch).segments.map((s) => [s.x, s.y]).filter(([x]) => x !== undefined);

test('wave 2 covers exactly the plan’s bar-and-stem glyphs, hash-consistent, original provenance, review pending', () => {
  assert.deepEqual(plan.waves.find((w) => w.id === 'wave-2').glyphs.slice().sort(), [...WAVE2].sort());
  assert.deepEqual(Object.keys(snapshot.glyphs).sort(), [...WAVE2].sort());
  for (const g of Object.values(snapshot.glyphs)) { assert.equal(sha256Hex(g.outer.d), g.outer.sha256); assert.deepEqual(g.counters, []); }
  assert.equal(snapshot.provenance.kind, 'claude-authored');
  assert.equal(snapshot.provenance.review, 'pending');
  assert.match(snapshot.provenance.method, /Not traced or derived/);
});

test('wave 2 records: authored master first, v0.6 base kept as reference-only, no review claimed', () => {
  for (const ch of WAVE2) {
    const g = registry.getByChar(ch);
    assert.equal(g.maturity, 'authored-contour', ch);
    assert.deepEqual(g.variants.map((v) => v.variantId), [`${ch.toLowerCase()}.master`, `${ch.toLowerCase()}.provisional`]);
    assert.equal(g.variants[1].geometry.editability, 'reference-only');
    assert.deepEqual(g.review, []);
  }
});

test('all wave 2 masters pass hard validation and identity checks; distinctions stay for human review', () => {
  for (const ch of WAVE2) {
    const r = run(ch);
    assert.equal(r.hardChecksPassed, true, ch);
    const id = Object.fromEntries(r.identityChecks.map((i) => [i.name, i.status]));
    for (const n of ['single-required-connected-contour', 'no-unintended-self-intersection', 'no-enclosed-counter']) assert.equal(id[n], 'passed', `${ch} ${n}`);
    assert.ok(r.identityChecks.some((i) => i.name.endsWith('-review') && i.status === 'not-evaluable'), `${ch} keeps a human review check`);
    assert.ok(buildRenderModel(registry.getByChar(ch), r), ch);
  }
});

test('family metrics: cap height 8–132, stems 26 units, bars 23 units, shared middle band for E/F/H', () => {
  for (const ch of WAVE2) {
    const ys = pts(ch).map(([, y]) => y);
    assert.equal(Math.min(...ys), 8, ch); assert.equal(Math.max(...ys), 132, ch);
  }
  const has = (ch, x, y) => pts(ch).some(([px, py]) => px === x && py === y);
  for (const ch of ['E', 'F']) { assert.ok(has(ch, 36, 31) && has(ch, 36, 59) && has(ch, 80, 59) && has(ch, 80, 81), ch); }
  assert.ok(has('H', 36, 59) && has('H', 74, 81), 'H crossbar uses the same 59–81 band');
  assert.ok(has('T', 39, 132) && has('T', 65, 132), 'T stem 26 units');
  assert.ok(has('I', 30, 31) && has('I', 56, 109), 'I stem 26 units');
  assert.ok(has('L', 36, 109) && has('E', 36, 109), 'L foot bar = E foot bar height');
});

test('every overlay reference of wave 2 resolves to real geometry', () => {
  for (const ch of WAVE2) {
    const g = registry.getByChar(ch);
    const ids = new Set(g.variants[0].geometry.contours.flatMap((c) => c.segments.flatMap((s) => [s.segmentId, s.nodeId]).filter(Boolean)));
    const refs = [...g.semanticGraph.components.flatMap((c) => c.candidateGeometryRefs), ...g.semanticGraph.junctions.flatMap((j) => j.candidateNodeRefs)];
    for (const r of refs) assert.ok(ids.has(r), `${ch}: ${r}`);
  }
});

test('E/F distinction is structural: removing the foot bar is the only outline difference', () => {
  const e = snapshot.glyphs.E.outer.d, f = snapshot.glyphs.F.outer.d;
  assert.ok(e.startsWith(f.slice(0, f.indexOf('L36 132'))), 'F shares E’s spine, top and middle bar');
  assert.notEqual(run('E').identityChecks.find((i) => i.name === 'no-enclosed-counter').status, 'failed');
});

test('editor can edit wave 2 masters and rejects an edit that breaks the contour', () => {
  const store = new EditorStore(registry.list(), profile);
  const id = 'latin.upper.T';
  const ok = store.submit(moveNodeCommand(store, id, 'glyph.T.contour.outer.node.02', { x: 100, y: 8 }));
  assert.equal(ok.committed, true);
  const bad = store.submit(moveNodeCommand(store, id, 'glyph.T.contour.outer.node.01', { x: 50, y: 140 })); // drags the bar corner through the stem
  assert.equal(bad.committed, false);
});
