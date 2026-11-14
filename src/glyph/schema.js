// Runtime validation for canonical GlyphDefinition records (schema 1.0).
// Returns structured diagnostics; never mutates or repairs input.
// Diagnostic codes reuse contracts/glyph-geometry-validation.v1.json where one
// exists (VAL_SCHEMA, VAL_TOPOLOGY_MISMATCH, VAL_UNCALIBRATED).

import { sha256Hex } from '../core/sha256.js';
import { stableStringify } from '../core/stable-json.js';
import { serializeSegments } from '../geometry/svg-path.js';
import { ID_PATTERNS } from './ids.js';
import { stripIds } from './import-v06.js';

export const MATURITY = ['provisional', 'authored-contour', 'semantic-reviewed', 'render-reviewed',
  'context-reviewed', 'production-approved', 'deprecated'];
const GEOMETRY_STATUS = ['draft', 'validated', 'review-required', 'rejected'];
const CONTOUR_ROLES = ['outer', 'counter', 'aperture-boundary', 'detail', 'extension', 'unclassified'];
const SEGMENT_TYPES = ['move', 'line', 'quadratic', 'cubic', 'close'];
const NEGATIVE_KINDS = ['counter', 'aperture', 'channel'];
const EDITABILITY = ['fully-editable', 'partially-editable', 'reference-only'];
const APERTURE_STATUS = ['none-declared', 'interpretation-required', 'classified', 'undeclared'];
const COUNTER_STATUS = ['none-in-master', 'provisional-declared', 'validated', 'undeclared'];

// Review stage that must have passed before a maturity level may be claimed.
const MATURITY_REQUIRES = {
  'semantic-reviewed': ['semantic'],
  'render-reviewed': ['semantic', 'render'],
  'context-reviewed': ['semantic', 'render', 'context'],
  'production-approved': ['semantic', 'render', 'context', 'owner'],
};

const NUM_KEYS = { move: ['x', 'y'], line: ['x', 'y'], quadratic: ['cx', 'cy', 'x', 'y'], cubic: ['c1x', 'c1y', 'c2x', 'c2y', 'x', 'y'], close: [] };

/** @returns {Array<{code:string,severity:string,glyphId?:string,affectedIds:string[],message:string}>} */
export function validateGlyphDefinition(g) {
  const out = [];
  const gid = g?.glyphId;
  const err = (code, ids, message, extra) => out.push({ code, severity: 'error', glyphId: gid, affectedIds: ids, message, ...extra });
  const req = (cond, path, message) => { if (!cond) err('VAL_SCHEMA', [gid ?? '?'], `${path}: ${message}`); return cond; };

  if (!req(g && typeof g === 'object', 'record', 'must be an object')) return out;
  req(g.schemaVersion === '1.0', 'schemaVersion', 'must be "1.0"');
  if (!req(typeof gid === 'string' && ID_PATTERNS.glyphId.test(gid), 'glyphId', 'must match latin.upper.[A-Z]')) return out;
  const ch = g.character;
  req(gid.endsWith(`.${ch}`), 'character', 'must match glyphId');
  req(MATURITY.includes(g.maturity), 'maturity', `must be one of ${MATURITY.join(', ')}`);
  req(GEOMETRY_STATUS.includes(g.geometryStatus), 'geometryStatus', 'invalid value');
  req(Number.isInteger(g.revision) && g.revision >= 1, 'revision', 'must be a positive integer');

  // Coordinate system and metrics: null allowed only while uncalibrated.
  const cs = g.coordinateSystem;
  if (req(cs && typeof cs === 'object', 'coordinateSystem', 'required')) {
    req(['up', 'down'].includes(cs.positiveYDirection), 'coordinateSystem.positiveYDirection', 'must be up|down');
    if (cs.calibrated) for (const k of ['unitsPerEm', 'baselineY', 'capHeightY']) req(typeof cs[k] === 'number', `coordinateSystem.${k}`, 'required when calibrated');
  }
  const m = g.baseMetrics;
  if (req(m && typeof m === 'object', 'baseMetrics', 'required')) {
    req(typeof m.calibrated === 'boolean', 'baseMetrics.calibrated', 'must be boolean');
    req(typeof m.measurementMethod === 'string' && m.measurementMethod.length > 0, 'baseMetrics.measurementMethod', 'required');
    if (m.calibrated) for (const k of ['advanceWidth', 'sideBearingStart', 'sideBearingEnd', 'capHeight']) req(typeof m[k] === 'number', `baseMetrics.${k}`, 'required when calibrated');
  }

  // Variants and geometry.
  const contourIds = new Set();
  const scoped = ID_PATTERNS.scoped(ch);
  if (req(Array.isArray(g.variants) && g.variants.length > 0, 'variants', 'at least one variant required')) {
    for (const v of g.variants) {
      req(ID_PATTERNS.variantId.test(v.variantId ?? '') && v.variantId.startsWith(`${ch.toLowerCase()}.`), `variants[${v.variantId}].variantId`, 'invalid variant ID');
      req(MATURITY.includes(v.maturity), `variants[${v.variantId}].maturity`, 'invalid value');
      req(MATURITY.indexOf(v.maturity) <= MATURITY.indexOf(g.maturity) || g.maturity === 'deprecated', `variants[${v.variantId}].maturity`, 'variant cannot exceed glyph maturity');
      const geo = v.geometry;
      if (!req(geo?.format === 'path-segments' && Array.isArray(geo.contours), `variants[${v.variantId}].geometry`, 'path-segments geometry required')) continue;
      req(EDITABILITY.includes(geo.editability), `variants[${v.variantId}].geometry.editability`, 'invalid value');
      if (v.geometryHash !== undefined) {
        const actual = sha256Hex(stableStringify(geo));
        if (actual !== v.geometryHash) err('VAL_GEOMETRY_HASH_MISMATCH', [v.variantId], 'geometryHash does not match geometry', { measured: { expected: v.geometryHash, actual } });
      }
      for (const c of geo.contours) {
        req(scoped.test(c.contourId ?? ''), `contour ${c.contourId}`, `ID must be scoped to glyph.${ch}`);
        req(CONTOUR_ROLES.includes(c.role), `contour ${c.contourId}.role`, 'invalid role');
        contourIds.add(c.contourId);
        validateSegments(c, req);
      }
      validateLegacySnapshot(v, err);
    }
  }

  // Semantic graph and topology declarations.
  const sg = g.semanticGraph;
  if (req(sg && typeof sg === 'object', 'semanticGraph', 'required')) {
    const ns = sg.negativeSpaces ?? [];
    for (const n of ns) {
      req(scoped.test(n.id ?? ''), `negativeSpace ${n.id}`, `ID must be scoped to glyph.${ch}`);
      req(NEGATIVE_KINDS.includes(n.kind), `negativeSpace ${n.id}.kind`, 'must be counter|aperture|channel');
      if (n.geometryRef !== undefined && !contourIds.has(n.geometryRef)) {
        err('VAL_SCHEMA', [n.id], `negativeSpace geometryRef ${n.geometryRef} does not resolve to a contour`);
      }
    }
    const t = sg.topology;
    if (req(t && typeof t === 'object', 'semanticGraph.topology', 'required')) {
      req(APERTURE_STATUS.includes(t.apertureStatus), 'topology.apertureStatus', 'invalid value');
      req(COUNTER_STATUS.includes(t.counterStatus), 'topology.counterStatus', 'invalid value');
      const byId = new Map(ns.map((n) => [n.id, n]));
      for (const id of t.counterIds ?? []) if (byId.get(id)?.kind !== 'counter') err('VAL_TOPOLOGY_MISMATCH', [id], 'counterIds entry is not a declared counter');
      for (const id of t.apertureIds ?? []) if (byId.get(id)?.kind !== 'aperture') err('VAL_TOPOLOGY_MISMATCH', [id], 'apertureIds entry is not a declared aperture');
      if (t.apertureStatus === 'classified' && !(t.apertureIds ?? []).length) err('VAL_TOPOLOGY_MISMATCH', [gid], 'apertureStatus classified without an aperture entity');
      if (t.apertureStatus !== 'classified' && (t.apertureIds ?? []).length) err('VAL_TOPOLOGY_MISMATCH', [gid], 'aperture entities exist but apertureStatus is not classified');
      if (t.counterStatus === 'none-in-master' && (t.counterIds ?? []).length) err('VAL_TOPOLOGY_MISMATCH', [gid], 'none-in-master declared but counters exist');
    }
  }

  // Maturity must be backed by passed human review records.
  for (const stage of MATURITY_REQUIRES[g.maturity] ?? []) {
    if (!(g.review ?? []).some((r) => r.stage === stage && r.status === 'passed')) {
      err('VAL_MATURITY_UNREVIEWED', [gid], `maturity ${g.maturity} requires a passed ${stage} review record`);
    }
  }
  return out;
}

function validateSegments(c, req) {
  const segs = c.segments ?? [];
  if (!req(segs.length >= 2 && segs[0].type === 'move', `contour ${c.contourId}`, 'must start with move and contain segments')) return;
  const ids = new Set();
  segs.forEach((s, i) => {
    req(SEGMENT_TYPES.includes(s.type), `${c.contourId}[${i}].type`, 'invalid segment type');
    for (const k of NUM_KEYS[s.type] ?? []) req(Number.isFinite(s[k]), `${c.contourId}[${i}].${k}`, 'must be a finite number');
    req(typeof s.segmentId === 'string' && !ids.has(s.segmentId), `${c.contourId}[${i}].segmentId`, 'missing or duplicate');
    ids.add(s.segmentId);
    if (s.type !== 'close') req(typeof s.nodeId === 'string', `${c.contourId}[${i}].nodeId`, 'required for on-curve segments');
    if (s.type === 'move') req(i === 0, `${c.contourId}[${i}]`, 'move only allowed as first segment');
    if (s.type === 'close') req(i === segs.length - 1, `${c.contourId}[${i}]`, 'close only allowed as last segment');
  });
  req(c.closed === (segs.at(-1).type === 'close'), `contour ${c.contourId}.closed`, 'must agree with segments');
}

function validateLegacySnapshot(v, err) {
  const snap = v.legacySnapshot;
  if (!snap) return;
  const contours = new Map(v.geometry.contours.map((c) => [c.contourId, c]));
  for (const p of snap.paths ?? []) {
    if (sha256Hex(p.d) !== p.sha256) {
      err('VAL_LEGACY_SNAPSHOT_HASH', [v.variantId], `legacy ${p.role} path hash mismatch`);
      continue;
    }
    // Imported contours must still reproduce the snapshot exactly while the
    // variant is the unmodified import (revision of the legacy record).
    const ids = p.contourIds ?? [p.contourId];
    if (ids.some((id) => !contours.has(id))) {
      err('VAL_SCHEMA', ids, 'legacy snapshot references missing contour');
      continue;
    }
    if (v.deliberateChanges.length === 0) {
      const re = ids.map((id) => serializeSegments(stripIds(contours.get(id).segments))).join(' ');
      if (re !== p.d) err('VAL_LEGACY_GEOMETRY_DRIFT', ids, 'imported contour no longer reproduces the legacy snapshot and no deliberate change is recorded');
    }
  }
}

/** Registry-wide checks: per-record validation plus global ID uniqueness. */
export function validateRecords(records) {
  const out = records.flatMap(validateGlyphDefinition);
  const seen = new Map();
  const claim = (id, owner) => {
    if (seen.has(id)) out.push({ code: 'VAL_SCHEMA', severity: 'error', affectedIds: [id], message: `duplicate stable ID (also in ${seen.get(id)})` });
    else seen.set(id, owner);
  };
  for (const g of records) {
    claim(g.glyphId, g.glyphId);
    for (const v of g.variants ?? []) {
      claim(`${g.glyphId}#${v.variantId}`, g.glyphId);
      for (const c of v.geometry?.contours ?? []) {
        claim(`${v.variantId}:${c.contourId}`, g.glyphId);
        for (const s of c.segments ?? []) claim(`${v.variantId}:${s.segmentId}`, g.glyphId);
      }
    }
    for (const n of g.semanticGraph?.negativeSpaces ?? []) claim(n.id, g.glyphId);
  }
  return out;
}
