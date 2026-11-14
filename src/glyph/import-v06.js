// Build 0.6 legacy import (Ticket 0.7A-T02).
//
// Converts the verbatim legacy snapshot into canonical GlyphDefinition records
// without changing geometry:
// - A/B/G/R/S become `x.master` variants at maturity `authored-contour`.
// - The other 21 letters become `x.provisional` reference-only records.
// - A/B/R inner paths become provisional counter records.
// - G keeps its single contour; its aperture is `interpretation-required`.
// - S declares no counter (`none-in-master`).
// - Metrics are measured where analytic, otherwise null + uncalibrated.
//
// Nothing here repairs, normalizes, reverses or simplifies a path.

import { sha256Hex } from '../core/sha256.js';
import { stableStringify } from '../core/stable-json.js';
import { parsePath, serializeSegments, segmentBounds } from '../geometry/svg-path.js';
import {
  ALPHABET, AUTHORED_LEGACY_SET, glyphId, masterVariantId, provisionalVariantId,
  contourId, negativeSpaceId, segmentId, nodeId,
} from './ids.js';

export const GLYPH_SCHEMA_VERSION = '1.0';
export const IMPORTER_VERSION = 'legacy-v06-import/1.0.0';

const FRAME = Object.freeze({
  frameId: 'legacy-v06',
  unitsPerEm: null,
  origin: { x: 0, y: 0 },
  positiveYDirection: 'down',
  baselineY: null,
  capHeightY: null,
  calibrated: false,
  measurementNotes:
    'Observed v0.6 local path frame (approx. 0–110 × 0–150, y down). Not a production coordinate standard; ' +
    'baseline and cap height are deliberately unset until calibrated from reviewed geometry.',
});

/** Build canonical contour from one parsed subpath. */
function buildContour(id, role, segments) {
  const out = [];
  let n = 0;
  for (const s of segments) {
    if (s.type === 'close') out.push({ segmentId: segmentId(id, n++), ...s });
    else out.push({ segmentId: segmentId(id, n), nodeId: nodeId(id, n++), ...s });
  }
  const closed = segments.at(-1)?.type === 'close';
  const area = signedArea(segments);
  return {
    contourId: id,
    role,
    closed,
    source: 'imported',
    signedArea: area,
    // Orientation as seen in the declared y-down frame (screen orientation).
    winding: area === 0 ? 'unspecified' : area > 0 ? 'clockwise' : 'counterclockwise',
    segments: out,
  };
}

/**
 * Exact signed area (shoelace generalisation, Green's theorem) of a closed
 * subpath of line/quadratic/cubic segments. Positive = clockwise in a y-down frame.
 */
export function signedArea(segments) {
  let a = 0, sx = 0, sy = 0, px = 0, py = 0;
  const cross = (x0, y0, x1, y1) => x0 * y1 - x1 * y0;
  for (const s of segments) {
    if (s.type === 'move') { sx = px = s.x; sy = py = s.y; continue; }
    if (s.type === 'line') a += cross(px, py, s.x, s.y) / 2;
    else if (s.type === 'quadratic') {
      a += (2 * cross(px, py, s.cx, s.cy) + 2 * cross(s.cx, s.cy, s.x, s.y) + cross(px, py, s.x, s.y)) / 6;
    } else if (s.type === 'cubic') {
      const [x0, y0, x1, y1, x2, y2, x3, y3] = [px, py, s.c1x, s.c1y, s.c2x, s.c2y, s.x, s.y];
      a += (6 * cross(x0, y0, x1, y1) + 3 * cross(x0, y0, x2, y2) + cross(x0, y0, x3, y3)
        + 3 * cross(x1, y1, x2, y2) + 3 * cross(x1, y1, x3, y3) + 6 * cross(x2, y2, x3, y3)) / 20;
    } else if (s.type === 'close') { a += cross(px, py, sx, sy) / 2; px = sx; py = sy; continue; }
    px = s.x; py = s.y;
  }
  return a;
}

function unionBounds(list) {
  return list.reduce((b, c) => ({
    minX: Math.min(b.minX, c.minX), minY: Math.min(b.minY, c.minY),
    maxX: Math.max(b.maxX, c.maxX), maxY: Math.max(b.maxY, c.maxY),
  }));
}

function diag(code, severity, glyph, affectedIds, message, extra = {}) {
  return { code, severity, glyphId: glyph, affectedIds, message, ...extra };
}

function metricsFor(contours) {
  return {
    advanceWidth: null,
    visibleBounds: unionBounds(contours.map((c) => segmentBounds(c.segments))),
    sideBearingStart: null,
    sideBearingEnd: null,
    capHeight: null,
    measurementMethod: 'analytic bounds of imported legacy contours (quadratic/cubic extrema included); other metrics unset',
    calibrated: false,
  };
}

function importAuthored(ch, entry, snapshot) {
  const gid = glyphId(ch);
  const vid = masterVariantId(ch);
  const diagnostics = [];

  const outerParsed = parsePath(entry.outer.d);
  if (outerParsed.length !== 1) throw new Error(`${ch}: legacy outer path has ${outerParsed.length} subpaths`);
  const contours = [buildContour(contourId(ch, 'outer'), 'outer', outerParsed[0].segments)];

  // Inner paths: provisional counters. Names come from measured position so
  // that B's two counters get semantic-neutral but stable, verifiable IDs.
  const inner = entry.inner.map((p, index) => {
    const parsed = parsePath(p.d);
    if (parsed.length !== 1) throw new Error(`${ch}: legacy inner path ${index} has ${parsed.length} subpaths`);
    return { index, segments: parsed[0].segments, bounds: segmentBounds(parsed[0].segments) };
  });
  const names = inner.length === 1 ? ['primary']
    : inner.length === 2 ? (inner[0].bounds.minY < inner[1].bounds.minY ? ['upper', 'lower'] : ['lower', 'upper'])
      : inner.map((_, i) => `n${i + 1}`);
  const negativeSpaces = [];
  inner.forEach((p, i) => {
    const cid = contourId(ch, `counter.${names[i]}`);
    contours.push(buildContour(cid, 'counter', p.segments));
    negativeSpaces.push({
      id: negativeSpaceId(ch, 'counter', names[i]),
      kind: 'counter',
      status: 'provisional',
      geometryRef: cid,
      boundaryComponentIds: [],
      protected: true,
      notes: `Imported from v0.6 hole array index ${p.index}; containment not yet validated (T04).`,
    });
  });

  const topology = {
    contourCount: contours.length,
    connectedComponentCount: null,
    counterIds: negativeSpaces.map((n) => n.id),
    apertureIds: [],
    fillRule: entry.legacyRenderFillRule,
    counterStatus: negativeSpaces.length ? 'provisional-declared' : 'none-in-master',
    apertureStatus: 'none-declared',
    analysisStatus: 'declared-not-analysed',
  };

  for (const c of contours.slice(1)) {
    if (c.winding === contours[0].winding) {
      diagnostics.push(diag('IMPORT_COUNTER_SAME_WINDING', 'info', gid, [contours[0].contourId, c.contourId],
        'Counter contour has the same orientation as the outer contour. v0.6 relied on evenodd fill; a nonzero ' +
        'fill would not open this counter. Renderers must derive holes from declared topology, not winding.',
        { measured: { outer: contours[0].winding, counter: c.winding } }));
    }
  }

  if (ch === 'G') {
    topology.apertureStatus = 'interpretation-required';
    diagnostics.push(diag('IMPORT_APERTURE_INTERPRETATION_REQUIRED', 'warning', gid, [contourId(ch, 'outer')],
      'G is a single closed legacy contour with an empty hole array. The intended exterior-connected opening is ' +
      'not yet classified; no aperture geometry is synthesised (AUD-01). glyph.G.set-aperture-width stays non-committing.'));
  }
  if (ch === 'S') {
    diagnostics.push(diag('IMPORT_NO_COUNTER_IN_MASTER', 'info', gid, [contourId(ch, 'outer')],
      'S is a single continuous contour; empty hole array recorded as none-in-master, not as an inferred shape.'));
  }

  const legacyPaths = [
    { role: 'outer', index: 0, d: entry.outer.d, sha256: entry.outer.sha256, contourId: contourId(ch, 'outer') },
    ...entry.inner.map((p, i) => ({ role: 'inner', index: i, d: p.d, sha256: p.sha256, contourId: contours[i + 1].contourId })),
  ];

  return finishRecord({
    ch, gid, vid, maturity: 'authored-contour', editability: 'fully-editable',
    contours, negativeSpaces, topology, legacyPaths, entry, snapshot, diagnostics,
    variantLabel: `${ch} master (v0.6 authored contour)`,
  });
}

function importProvisional(ch, entry, snapshot) {
  const gid = glyphId(ch);
  const vid = provisionalVariantId(ch);
  const diagnostics = [];
  const subpaths = parsePath(entry.combined.d);
  const contours = subpaths.map((sp, i) =>
    buildContour(i === 0 ? contourId(ch, 'outer') : contourId(ch, `subpath.${i + 1}`), i === 0 ? 'outer' : 'unclassified', sp.segments));

  if (subpaths.length > 1) {
    diagnostics.push(diag('IMPORT_UNDECLARED_SUBPATH_TOPOLOGY', 'warning', gid, contours.slice(1).map((c) => c.contourId),
      `Legacy combined path has ${subpaths.length} subpaths rendered with nonzero fill; their topology (counter, overlap, ` +
      'detail) is not declared and must be authored, not inferred.',
      { measured: { subpathCount: subpaths.length, windings: contours.map((c) => c.winding) } }));
  }
  diagnostics.push(diag('IMPORT_PROVISIONAL_GEOMETRY', 'info', gid, [vid],
    'Provisional v0.6 geometric base; reference-only, not an authored master.'));

  const legacyPaths = [{ role: 'combined', index: 0, d: entry.combined.d, sha256: entry.combined.sha256, contourIds: contours.map((c) => c.contourId) }];
  const topology = {
    contourCount: contours.length,
    connectedComponentCount: null,
    counterIds: [],
    apertureIds: [],
    fillRule: entry.legacyRenderFillRule,
    counterStatus: 'undeclared',
    apertureStatus: 'undeclared',
    analysisStatus: 'not-analysed',
  };

  return finishRecord({
    ch, gid, vid, maturity: 'provisional', editability: 'reference-only',
    contours, negativeSpaces: [], topology, legacyPaths, entry, snapshot, diagnostics,
    variantLabel: `${ch} provisional base (v0.6)`,
  });
}

function finishRecord({ ch, gid, vid, maturity, editability, contours, negativeSpaces, topology, legacyPaths, entry, snapshot, diagnostics, variantLabel }) {
  const provId = `prov.legacy-v06.${ch}`;
  diagnostics.push(diag('VAL_UNCALIBRATED', 'info', gid, [gid],
    'Metrics, anchors and parameter bounds are uncalibrated; only analytic visible bounds are measured.'));

  const geometry = { format: 'path-segments', editability, contours };
  return {
    schemaVersion: GLYPH_SCHEMA_VERSION,
    glyphId: gid,
    character: ch,
    script: 'Latin',
    case: 'uppercase',
    displayName: `Latin capital ${ch}`,
    maturity,
    geometryStatus: 'review-required',
    revision: 1,
    coordinateSystem: structuredClone(FRAME),
    baseMetrics: metricsFor(contours),
    semanticGraph: {
      components: [],
      componentStatus: 'not-yet-declared',
      junctions: [],
      negativeSpaces,
      anchors: [],
      anchorStatus: 'not-yet-derived',
      constraints: [],
      topology,
    },
    variants: [{
      variantId: vid,
      label: variantLabel,
      maturity,
      legacySnapshot: {
        snapshotId: snapshot.snapshotId,
        sourcePath: snapshot.source.path,
        sourceSha256: snapshot.source.sha256,
        sourceTable: entry.sourceTable,
        sourceLine: entry.sourceLine,
        paths: legacyPaths,
      },
      geometry,
      geometryHash: sha256Hex(stableStringify(geometry)),
      styleCompatibility: [],
      identityInvariants: [],
      deliberateChanges: [],
      seedPolicy: 'none',
      provenanceRefs: [provId],
    }],
    provenance: [{
      id: provId,
      kind: 'legacy-prototype',
      sourcePath: snapshot.source.path,
      claim: `Exact v0.6 path data for ${ch} (table ${entry.sourceTable}, line ${entry.sourceLine}).`,
      evidenceGrade: 'not-applicable',
      rightsStatus: 'original',
      notes: `Imported by ${IMPORTER_VERSION}. Source path order is not evidence of stroke order or semantic segmentation.`,
    }],
    review: [],
    importDiagnostics: diagnostics,
  };
}

/** Import all 26 glyphs from a legacy snapshot. Deterministic and side-effect free. */
export function importLegacyV06(snapshot) {
  return [...ALPHABET].map((ch) => {
    const entry = snapshot.glyphs[ch];
    if (!entry) throw new Error(`Legacy snapshot is missing glyph ${ch}`);
    return AUTHORED_LEGACY_SET.includes(ch) ? importAuthored(ch, entry, snapshot) : importProvisional(ch, entry, snapshot);
  });
}

/** Re-derive the exact legacy path string of each imported contour (round-trip proof). */
export function reserializeLegacyPaths(variant) {
  const byId = new Map(variant.geometry.contours.map((c) => [c.contourId, c]));
  return variant.legacySnapshot.paths.map((p) => {
    const ids = p.contourIds ?? [p.contourId];
    return { ...p, reserialized: ids.map((id) => serializeSegments(stripIds(byId.get(id).segments))).join(' ') };
  });
}

const stripIds = (segments) => segments.map(({ segmentId: _s, nodeId: _n, ...rest }) => rest);
export { stripIds };
