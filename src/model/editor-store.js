// Canonical editor state and command bus (Ticket 0.7A-T07).
//
// - Every edit is a typed command envelope (contracts/editor-interaction.v1.json).
// - expected_revision must equal the glyph's committed revision (optimistic concurrency).
// - Candidates are validated atomically; rejected commands leave state untouched.
// - History stores canonical patches; undo/redo re-validate and commit new revisions.
// - Preview never persists. View state (camera, overlays) lives outside this store.

import { sha256Hex } from '../core/sha256.js';
import { stableStringify, deepFreeze } from '../core/stable-json.js';
import { segmentBounds } from '../geometry/svg-path.js';
import { checkCandidate } from '../glyph/validate-geometry.js';
import { OPERATIONS, OperationError, applyPatch } from './operations.js';

export const PROJECT_SCHEMA_VERSION = '1.0';
const ENVELOPE = ['command_id', 'operation_id', 'target_ids', 'expected_revision', 'payload', 'source_interaction_id'];

/** Recompute derived fields after authored fields changed. */
export function finalizeCandidate(record, revision) {
  const v = record.variants[0];
  v.geometryHash = sha256Hex(stableStringify(v.geometry));
  const bounds = v.geometry.contours.map((c) => segmentBounds(c.segments));
  record.baseMetrics.visibleBounds = bounds.reduce((a, b) => ({ minX: Math.min(a.minX, b.minX), minY: Math.min(a.minY, b.minY), maxX: Math.max(a.maxX, b.maxX), maxY: Math.max(a.maxY, b.maxY) }));
  record.revision = revision;
  return record;
}

export class EditorStore {
  /**
   * @param {object[]} records canonical glyph records (e.g. registry.list())
   * @param {object} profile validator profile
   * @param {object} [extraOperations] e.g. disabled parameter operations
   */
  constructor(records, profile, extraOperations = {}) {
    this.profile = profile;
    this.operations = { ...extraOperations, ...OPERATIONS };
    this._glyphs = new Map(records.map((r) => [r.glyphId, deepFreeze(structuredClone(r))]));
    this.undoStack = [];
    this.redoStack = [];
    this.dirty = false;
    this._listeners = new Set();
  }

  get(glyphId) { return this._glyphs.get(glyphId); }
  list() { return [...this._glyphs.values()]; }
  revision(glyphId) { return this.get(glyphId).revision; }
  onChange(fn) { this._listeners.add(fn); return () => this._listeners.delete(fn); }
  _emit(event) { for (const fn of this._listeners) fn(event); }

  _envelopeError(cmd) {
    for (const k of ENVELOPE) if (!(k in (cmd ?? {}))) return `missing ${k}`;
    if (!Array.isArray(cmd.target_ids) || !cmd.target_ids.length) return 'target_ids must be a non-empty array';
    return null;
  }

  /** Build a validated candidate without committing (preview / commit share this path). */
  _candidate(cmd) {
    const envErr = this._envelopeError(cmd);
    if (envErr) return { ok: false, code: 'CMD_BAD_ENVELOPE', message: envErr };
    const op = this.operations[cmd.operation_id];
    if (!op) return { ok: false, code: 'CMD_UNKNOWN_OPERATION', message: `Unknown operation ${cmd.operation_id}` };
    if (!op.enabled) return { ok: false, code: 'CMD_OPERATION_DISABLED', message: op.reason };
    const committed = this.get(cmd.payload?.glyphId);
    if (!committed) return { ok: false, code: 'CMD_UNKNOWN_GLYPH', message: `Unknown glyph ${cmd.payload?.glyphId}` };
    if (cmd.expected_revision !== committed.revision) {
      return { ok: false, code: 'CMD_REVISION_CONFLICT', message: `expected revision ${cmd.expected_revision}, committed is ${committed.revision}`, committedRevision: committed.revision };
    }
    let patch;
    try { patch = op.buildPatch(committed, cmd.payload, cmd); } catch (e) {
      if (e instanceof OperationError) return { ok: false, code: e.code, message: e.message };
      throw e;
    }
    const candidate = finalizeCandidate(applyPatch(structuredClone(committed), patch), committed.revision + 1);
    const { commitAllowed, report } = checkCandidate(candidate, this.profile);
    return { ok: commitAllowed, code: commitAllowed ? null : 'CMD_VALIDATION_FAILED', candidate, patch, report, committed,
      message: commitAllowed ? null : report.diagnostics.filter((d) => d.severity === 'error').map((d) => d.code).join(', ') };
  }

  /** Transient preview: provisional, never persisted, never changes revision. */
  preview(cmd) {
    const r = this._candidate(cmd);
    return { ...r, provisional: true };
  }

  /** Atomic validate-then-commit. Returns {committed:boolean, ...}. */
  submit(cmd) {
    const r = this._candidate(cmd);
    if (!r.ok) {
      this._emit({ type: 'rejected', command: cmd, code: r.code, message: r.message });
      return { committed: false, code: r.code, message: r.message, report: r.report ?? null };
    }
    const entry = {
      command_id: cmd.command_id,
      operation_id: cmd.operation_id,
      affected_entity_ids: cmd.target_ids,
      glyphId: r.committed.glyphId,
      before_revision: r.committed.revision,
      after_revision: r.candidate.revision,
      description: describe(cmd),
      validation_status: 'passed',
      patch: r.patch,
    };
    this._commit(r.candidate);
    this.undoStack.push(entry);
    this.redoStack = [];
    this._emit({ type: 'committed', entry });
    return { committed: true, entry, report: r.report };
  }

  _commit(record) {
    this._glyphs.set(record.glyphId, deepFreeze(record));
    this.dirty = true;
  }

  _replay(entry, inverse) {
    const current = this.get(entry.glyphId);
    const candidate = finalizeCandidate(applyPatch(structuredClone(current), entry.patch, { inverse }), current.revision + 1);
    const { commitAllowed, report } = checkCandidate(candidate, this.profile);
    if (!commitAllowed) return { committed: false, code: 'CMD_VALIDATION_FAILED', report };
    this._commit(candidate);
    return { committed: true, before_revision: current.revision, after_revision: candidate.revision, report };
  }

  undo() {
    const entry = this.undoStack.at(-1);
    if (!entry) return { committed: false, code: 'HISTORY_EMPTY' };
    const r = this._replay(entry, true);
    if (r.committed) { this.undoStack.pop(); this.redoStack.push(entry); this._emit({ type: 'undo', entry }); }
    return r;
  }

  redo() {
    const entry = this.redoStack.at(-1);
    if (!entry) return { committed: false, code: 'HISTORY_EMPTY' };
    const r = this._replay(entry, false);
    if (r.committed) { this.redoStack.pop(); this.undoStack.push(entry); this._emit({ type: 'redo', entry }); }
    return r;
  }

  /** Project file: committed canonical records only (no preview, no view state). */
  save() {
    this.dirty = false;
    return stableStringify({ projectSchemaVersion: PROJECT_SCHEMA_VERSION, glyphs: this.list() }, 2);
  }

  static load(json, profile, extraOperations) {
    const obj = typeof json === 'string' ? JSON.parse(json) : json;
    if (obj.projectSchemaVersion !== PROJECT_SCHEMA_VERSION) throw new Error(`Unsupported project schema ${obj.projectSchemaVersion}`);
    return new EditorStore(obj.glyphs, profile, extraOperations);
  }
}

function describe(cmd) {
  if (cmd.operation_id === 'contour.move-node') {
    return `Move ${cmd.payload.nodeId.replace(/^glyph\.[A-Z]\.contour\./, '')} to (${cmd.payload.to.x}, ${cmd.payload.to.y})`;
  }
  return cmd.operation_id;
}

let seq = 0;
/** Convenience builder for command envelopes (ids are unique per session, not persisted inputs). */
export function moveNodeCommand(store, glyphId, nodeId, to, { interactionId, expectedRevision } = {}) {
  seq++;
  return {
    command_id: `cmd.${Date.now().toString(36)}.${seq}`,
    operation_id: 'contour.move-node',
    target_ids: [nodeId],
    expected_revision: expectedRevision ?? store.revision(glyphId),
    payload: { glyphId, nodeId, to },
    source_interaction_id: interactionId ?? `ix.${seq}`,
  };
}
