// Authored glyph masters (C02): replaces a provisional v0.6 record with an
// original authored master while keeping the v0.6 base as a reference-only
// second variant. Geometry is copied verbatim from the authoring snapshot.

import { sha256Hex } from '../core/sha256.js';
import { stableStringify } from '../core/stable-json.js';
import { parsePath, segmentBounds } from '../geometry/svg-path.js';
import { buildContour } from './import-v06.js';
import { contourId, negativeSpaceId, masterVariantId, glyphId as toGlyphId } from './ids.js';

export const AUTHORED_IMPORTER_VERSION = 'authored-import/1.0.0';

function single(d, label) {
  const sp = parsePath(d);
  if (sp.length !== 1) throw new Error(`${label}: expected one subpath, found ${sp.length}`);
  return sp[0].segments;
}

/**
 * @param {object} legacyRecord the provisional record from the v0.6 import
 * @param {object} entry authoring snapshot entry {brief, outer:{d,sha256}, counters:[{d,sha256}]}
 * @param {object} snapshot authoring snapshot (for provenance)
 * @param {string} sourcePath repository path of the snapshot file
 */
export function importAuthoredMaster(legacyRecord, entry, snapshot, sourcePath) {
  const ch = legacyRecord.character;
  const gid = toGlyphId(ch);
  for (const p of [entry.outer, ...entry.counters]) {
    if (sha256Hex(p.d) !== p.sha256) throw new Error(`${ch}: authoring snapshot hash mismatch`);
  }
  const names = entry.counters.length === 1 ? ['primary'] : entry.counters.map((_, i) => `n${i + 1}`);
  const contours = [buildContour(contourId(ch, 'outer'), 'outer', single(entry.outer.d, `${ch} outer`))];
  const negativeSpaces = [];
  entry.counters.forEach((p, i) => {
    const cid = contourId(ch, `counter.${names[i]}`);
    contours.push(buildContour(cid, 'counter', single(p.d, `${ch} counter`)));
    negativeSpaces.push({ id: negativeSpaceId(ch, 'counter', names[i]), kind: 'counter', status: 'provisional', geometryRef: cid,
      boundaryComponentIds: [], protected: true, notes: 'Authored counter; containment checked by the validator.' });
  });
  const geometry = { format: 'path-segments', editability: 'fully-editable', contours };
  const provId = `prov.authored.${snapshot.snapshotId}.${ch}`;
  const bounds = contours.map((c) => segmentBounds(c.segments)).reduce((a, b) => ({
    minX: Math.min(a.minX, b.minX), minY: Math.min(a.minY, b.minY), maxX: Math.max(a.maxX, b.maxX), maxY: Math.max(a.maxY, b.maxY) }));
  const diag = (code, severity, ids, message) => ({ code, severity, glyphId: gid, affectedIds: ids, message });
  const record = structuredClone(legacyRecord);
  const legacyVariant = record.variants[0];
  Object.assign(record, {
    maturity: 'authored-contour',
    geometryStatus: 'review-required',
    revision: 1,
    baseMetrics: { ...record.baseMetrics, visibleBounds: bounds,
      measurementMethod: 'analytic bounds of authored contours (quadratic extrema included); other metrics unset', calibrated: false },
    semanticGraph: {
      ...record.semanticGraph,
      negativeSpaces,
      topology: {
        contourCount: contours.length, connectedComponentCount: null,
        counterIds: negativeSpaces.map((n) => n.id), apertureIds: [],
        fillRule: 'evenodd',
        counterStatus: negativeSpaces.length ? 'provisional-declared' : 'none-in-master',
        apertureStatus: 'none-declared', analysisStatus: 'declared-not-analysed',
      },
    },
    variants: [{
      variantId: masterVariantId(ch),
      label: `${ch} master (authored, ${snapshot.snapshotId}@${snapshot.version})`,
      maturity: 'authored-contour',
      authoringSnapshot: {
        snapshotId: snapshot.snapshotId, version: snapshot.version, sourcePath, brief: entry.brief,
        paths: [
          { role: 'outer', index: 0, d: entry.outer.d, sha256: entry.outer.sha256, contourId: contours[0].contourId },
          ...entry.counters.map((p, i) => ({ role: 'counter', index: i, d: p.d, sha256: p.sha256, contourId: contours[i + 1].contourId })),
        ],
      },
      geometry,
      geometryHash: sha256Hex(stableStringify(geometry)),
      styleCompatibility: [], identityInvariants: [], deliberateChanges: [], seedPolicy: 'none',
      provenanceRefs: [provId],
    }, { ...legacyVariant, label: `${legacyVariant.label} — superseded reference` }],
    provenance: [{
      id: provId, kind: 'claude-authored', sourcePath,
      claim: `Original authored master for ${ch} (${snapshot.provenance.roadmap}).`,
      author: snapshot.provenance.author, date: snapshot.provenance.date, method: snapshot.provenance.method,
      evidenceGrade: 'not-applicable', rightsStatus: 'original',
      notes: `Imported by ${AUTHORED_IMPORTER_VERSION}. Human review ${snapshot.provenance.review}.`,
    }, ...record.provenance],
    review: [],
    importDiagnostics: [
      diag('AUTHORED_MASTER', 'info', [masterVariantId(ch)], `Authored master replaces the provisional v0.6 base as primary variant; the base is kept as reference.`),
      diag('VAL_UNCALIBRATED', 'info', [gid], 'Metrics, anchors and parameter bounds are uncalibrated; only analytic visible bounds are measured.'),
    ],
  });
  return record;
}

/** Apply all glyphs of an authoring snapshot to a list of imported records. */
export function applyAuthoredSnapshot(records, snapshot, sourcePath) {
  return records.map((r) => (snapshot.glyphs[r.character] ? importAuthoredMaster(r, snapshot.glyphs[r.character], snapshot, sourcePath) : r));
}
