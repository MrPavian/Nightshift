// Ticket 0.7A-T07 transaction tests: typed commands, revisions, atomic validation, undo/redo, save/load.
import { test } from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import { loadRegistry } from '../src/glyph/load-node.js';
import { EditorStore, moveNodeCommand } from '../src/model/editor-store.js';
import { disabledParameterOperations, findNode } from '../src/model/operations.js';
import { validateGlyphGeometry } from '../src/glyph/validate-geometry.js';
import { buildRenderModel } from '../src/render/render-model.js';

const profile = JSON.parse(readFileSync('data/validator-profiles/legacy-v06.v1.json', 'utf8'));
const paramContract = JSON.parse(readFileSync('contracts/glyph-parameter-contract.v1.json', 'utf8'));
const A = 'latin.upper.A';
const APEX = 'glyph.A.contour.outer.node.02';
const COUNTER_NODE = 'glyph.A.contour.counter.primary.node.01';
const fresh = () => new EditorStore(loadRegistry().list(), profile, disabledParameterOperations(paramContract));
const node = (store, id) => findNode(store.get(A), id).segment;
const cmd = (id, nodeId, to, rev) => ({ command_id: id, operation_id: 'contour.move-node', target_ids: [nodeId], expected_revision: rev, payload: { glyphId: A, nodeId, to }, source_interaction_id: `ix.${id}` });

test('valid move commits atomically: new revision, new hash, same IDs, recomputed bounds, contract history entry', () => {
  const s = fresh();
  const before = s.get(A);
  const r = s.submit(cmd('c1', APEX, { x: 42, y: 4 }, before.revision));
  assert.equal(r.committed, true);
  const after = s.get(A);
  assert.equal(after.revision, before.revision + 1);
  assert.notEqual(after.variants[0].geometryHash, before.variants[0].geometryHash);
  assert.deepEqual({ x: node(s, APEX).x, y: node(s, APEX).y }, { x: 42, y: 4 });
  assert.equal(after.baseMetrics.visibleBounds.minY, 4, 'bounds follow the edit');
  const ids = (g) => g.variants[0].geometry.contours.flatMap((c) => c.segments.map((x) => x.segmentId));
  assert.deepEqual(ids(after), ids(before));
  for (const k of ['command_id', 'operation_id', 'affected_entity_ids', 'before_revision', 'after_revision', 'description', 'validation_status']) assert.ok(k in r.entry, k);
  assert.equal(after.variants[0].deliberateChanges.length, 1);
  assert.ok(s.dirty);
  assert.ok(Object.isFrozen(after), 'committed state is immutable');
});

test('invalid command is rejected and leaves canonical state and history untouched', () => {
  const s = fresh();
  const snapshot = s.save();
  s.dirty = false;
  const r = s.submit(cmd('bad', COUNTER_NODE, { x: 5, y: 60 }, s.revision(A)));
  assert.equal(r.committed, false);
  assert.equal(r.code, 'CMD_VALIDATION_FAILED');
  assert.ok(r.report.diagnostics.some((d) => d.code === 'VAL_COUNTER_MISSING' || d.code === 'VAL_UNDECLARED_CROSSING'));
  assert.equal(s.save(), snapshot);
  assert.equal(s.undoStack.length, 0);
});

test('stale expected revision is rejected without changing state', () => {
  const s = fresh();
  const rev = s.revision(A);
  assert.equal(s.submit(cmd('c1', APEX, { x: 41, y: 8 }, rev)).committed, true);
  const snapshot = s.save();
  const r = s.submit(cmd('c2', APEX, { x: 40, y: 8 }, rev));
  assert.equal(r.code, 'CMD_REVISION_CONFLICT');
  assert.equal(s.save(), snapshot);
});

test('uncalibrated parameter operations are registered but disabled', () => {
  const s = fresh();
  const ids = Object.keys(paramContract.operationSemantics);
  assert.ok(ids.length > 5);
  for (const id of ids) {
    const r = s.submit({ command_id: 'p', operation_id: id, target_ids: [A], expected_revision: s.revision(A), payload: { glyphId: A }, source_interaction_id: 'ix' });
    assert.equal(r.code, 'CMD_OPERATION_DISABLED', id);
  }
  assert.equal(s.undoStack.length, 0);
});

test('provisional reference-only glyphs cannot be edited; malformed envelopes are rejected', () => {
  const s = fresh();
  const c = { ...cmd('c', 'glyph.J.contour.outer.node.01', { x: 1, y: 1 }, s.revision('latin.upper.J')), payload: { glyphId: 'latin.upper.J', nodeId: 'glyph.J.contour.outer.node.01', to: { x: 1, y: 1 } } };
  assert.equal(s.submit(c).code, 'OP_NOT_EDITABLE');
  const { expected_revision: _drop, ...noRev } = cmd('c', APEX, { x: 1, y: 1 }, 0);
  assert.equal(s.submit(noRev).code, 'CMD_BAD_ENVELOPE');
  assert.equal(s.submit(cmd('c', APEX, { x: NaN, y: 1 }, s.revision(A))).code, 'OP_BAD_PAYLOAD');
  assert.equal(s.submit(cmd('c', 'glyph.A.contour.outer.node.99', { x: 1, y: 1 }, s.revision(A))).code, 'OP_UNKNOWN_TARGET');
});

test('preview is provisional and never persists', () => {
  const s = fresh();
  const snapshot = s.save();
  s.dirty = false;
  const ok = s.preview(cmd('pv', APEX, { x: 44, y: 2 }, s.revision(A)));
  assert.equal(ok.ok, true);
  assert.equal(ok.provisional, true);
  assert.equal(ok.candidate.revision, s.revision(A) + 1);
  const bad = s.preview(cmd('pv2', COUNTER_NODE, { x: 5, y: 60 }, s.revision(A)));
  assert.equal(bad.ok, false);
  assert.equal(s.save(), snapshot);
  assert.equal(s.undoStack.length, 0);
});

test('undo/redo replay canonical patches through the validator; full undo restores the legacy geometry', () => {
  const s = fresh();
  const original = s.get(A);
  s.submit(cmd('c1', APEX, { x: 42, y: 4 }, s.revision(A)));
  s.submit(cmd('c2', 'glyph.A.contour.outer.node.03', { x: 76, y: 4 }, s.revision(A)));
  const afterTwo = s.get(A).variants[0].geometryHash;
  assert.equal(s.undo().committed, true);
  assert.equal(s.undo().committed, true);
  const back = s.get(A);
  assert.equal(back.variants[0].geometryHash, original.variants[0].geometryHash);
  assert.deepEqual(back.variants[0].deliberateChanges, []);
  assert.deepEqual(back.baseMetrics.visibleBounds, original.baseMetrics.visibleBounds);
  assert.equal(back.revision, original.revision + 4, 'revisions stay monotonic');
  assert.equal(s.undo().code, 'HISTORY_EMPTY');
  s.redo(); s.redo();
  assert.equal(s.get(A).variants[0].geometryHash, afterTwo);
  assert.equal(s.redo().code, 'HISTORY_EMPTY');
  // A new commit clears the redo stack.
  s.undo();
  s.submit(cmd('c3', APEX, { x: 40, y: 8 }, s.revision(A)));
  assert.equal(s.redoStack.length, 0);
});

test('save/reload preserves canonical geometry, IDs and revisions; loaded state validates', () => {
  const s = fresh();
  s.submit(cmd('c1', APEX, { x: 42, y: 4 }, s.revision(A)));
  const text = s.save();
  assert.equal(s.dirty, false);
  const t = EditorStore.load(text, profile);
  assert.equal(t.save(), text);
  assert.equal(t.get(A).variants[0].geometryHash, s.get(A).variants[0].geometryHash);
  assert.equal(validateGlyphGeometry(t.get(A), profile).hardChecksPassed, true);
  assert.ok(buildRenderModel(t.get(A), validateGlyphGeometry(t.get(A), profile)));
});

test('deterministic replay: same command sequence gives identical canonical state', () => {
  const run = () => {
    const s = fresh();
    s.submit(cmd('c1', APEX, { x: 42, y: 4 }, s.revision(A)));
    s.submit(cmd('c2', 'glyph.A.contour.counter.primary.node.00', { x: 34, y: 66 }, s.revision(A)));
    s.undo();
    return s.save();
  };
  assert.equal(run(), run());
});

test('view state is not part of the canonical store', () => {
  const s = fresh();
  const before = s.save();
  const view = { camera: { zoom: 1, x: 0, y: 0 } };
  view.camera.zoom = 3; view.camera.x = 50;
  assert.equal(s.save(), before);
  assert.ok(!('camera' in JSON.parse(before)));
});

test('committed T07 editor proof passed and is tied to the current editor inputs', async () => {
  const { createHash } = await import('node:crypto');
  const m = JSON.parse(readFileSync('docs/reports/proof/T07/manifest.json', 'utf8'));
  assert.equal(m.result, 'pass');
  assert.ok(Object.values(m.steps).length >= 13 && Object.values(m.steps).every(Boolean));
  for (const [p, h] of Object.entries(m.inputs)) assert.equal(createHash('sha256').update(readFileSync(p)).digest('hex'), h, `${p} changed since the proof run`);
});
