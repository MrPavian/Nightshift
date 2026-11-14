/**
 * Imports the verbatim v0.6 snapshot into canonical glyph records (ticket 0.7A-T02).
 *
 * Rules (ticket pack 0.7A, abgrs-glyph-construction.v1.json):
 *  - Path data is preserved exactly; no normalisation, repair or simplification.
 *  - A/B/G/R/S → `<x>.master`, maturity `authored-contour`.
 *  - A/B/R inner contours → provisional counters. S → no counter.
 *  - G → no counter, aperture status `interpretation-required` (T03/T04 may classify it).
 *  - The 21 other letters → `<x>.provisional-base`, maturity `provisional`, reference-only.
 *    Their extra subpaths stay `unclassified`; no counter is inferred from winding.
 */
import { V06_SNAPSHOT } from './v06-snapshot.ts';
import { assignSegmentIds, parseLegacyPath } from '../geometry/path.ts';
import { contourBounds, signedArea, unionBounds, windingOf } from '../geometry/measure.ts';
import {
  SCHEMA_VERSION,
  type ContourRole,
  type GlyphDefinition,
  type GlyphId,
  type NegativeSpace,
  type ProvenanceRecord,
  type VectorContour,
} from '../schema/types.ts';

export const ALPHABET = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'.split('');
export const AUTHORED = ['A', 'B', 'G', 'R', 'S'] as const;

export const glyphIdOf = (ch: string): GlyphId => `latin.upper.${ch}`;

const Y_DOWN = true;

const PROVENANCE_ID = 'prov.legacy.v06';

function provenance(): ProvenanceRecord {
  return {
    id: PROVENANCE_ID,
    kind: 'legacy-prototype',
    sourcePath: V06_SNAPSHOT.sourcePath,
    sourceSha256: V06_SNAPSHOT.sourceSha256,
    sourceCommit: V06_SNAPSHOT.sourceCommit,
    rightsStatus: 'original',
    notes: 'Imported verbatim from the Build 0.6 reference prototype. Not visually reviewed.',
  };
}

function buildContours(variantId: string, paths: readonly { d: string; role: ContourRole }[]): VectorContour[] {
  const out: VectorContour[] = [];
  for (const { d, role } of paths) {
    const subpaths = parseLegacyPath(d);
    subpaths.forEach((sp, k) => {
      const contourId = `${variantId}.c${out.length}`;
      const segments = assignSegmentIds(contourId, sp.segments);
      const area = signedArea(segments);
      out.push({
        contourId,
        // In a multi-subpath provisional string only the first subpath is known to be the outer.
        role: k === 0 ? role : 'unclassified',
        closed: true,
        segments,
        winding: windingOf(area, Y_DOWN),
        signedArea: area,
        source: 'imported',
      });
    });
  }
  return out;
}

function baseRecord(ch: string): Omit<GlyphDefinition, 'maturity' | 'geometryStatus' | 'baseMetrics' | 'semanticGraph' | 'variants' | 'legacySource'> {
  return {
    schemaVersion: SCHEMA_VERSION,
    glyphId: glyphIdOf(ch),
    character: ch,
    script: 'Latin',
    case: 'uppercase',
    displayName: `Latin capital ${ch}`,
    revision: 1,
    coordinateSystem: {
      unitsPerEm: null,
      origin: { x: 0, y: 0 },
      positiveYDirection: 'down',
      baselineY: null,
      capHeightY: null,
      measurementNotes:
        'v0.6 design space (+y down, glyphs drawn roughly within 0–110 × 0–152 and centred via translate(-50 -70) at render time). Baseline and cap height not calibrated.',
    },
    provenance: [provenance()],
    review: [],
  };
}

function metrics(contours: VectorContour[]): GlyphDefinition['baseMetrics'] {
  return {
    advanceWidth: null,
    visibleBounds: unionBounds(contours.map((c) => contourBounds(c.segments))),
    sideBearingStart: null,
    sideBearingEnd: null,
    capHeight: null,
    measurementMethod: 'exact-curve-bounds-of-imported-contours',
    calibrated: false,
  };
}

export function importAuthored(ch: (typeof AUTHORED)[number]): GlyphDefinition {
  const src = V06_SNAPSHOT.custom[ch];
  const variantId = `${ch.toLowerCase()}.master`;
  const contours = buildContours(variantId, [
    { d: src.outer, role: 'outer' },
    ...src.inner.map((d) => ({ d, role: 'counter' as const })),
  ]);
  const counterContours = contours.filter((c) => c.role === 'counter');
  const negativeSpaces: NegativeSpace[] = counterContours.map((c, k) => ({
    id: `${variantId}.counter${k}`,
    kind: 'counter',
    geometryRef: c.contourId,
    boundaryComponentIds: [],
    protected: true,
    confidence: 'provisional',
    notes: 'Imported v0.6 inner path; counter classification awaits topology validation (T04).',
  }));
  return {
    ...baseRecord(ch),
    maturity: 'authored-contour',
    geometryStatus: 'review-required',
    baseMetrics: metrics(contours),
    semanticGraph: {
      components: [],
      junctions: [],
      negativeSpaces,
      anchors: [],
      constraints: [],
      topology: {
        connectedComponentCount: null,
        contourCount: contours.length,
        counterIds: negativeSpaces.map((n) => n.id),
        apertureIds: [],
        apertureStatus: ch === 'G' ? 'interpretation-required' : 'none-declared',
        fillRule: src.inner.length ? 'evenodd' : 'nonzero',
      },
    },
    variants: [
      {
        variantId,
        label: `${ch} master (v0.6 import)`,
        maturity: 'authored-contour',
        geometry: { format: 'path-segments', contours, editability: 'fully-editable' },
        identityInvariants: [],
        deliberateChanges: [],
        seedPolicy: 'none',
        provenanceRefs: [PROVENANCE_ID],
      },
    ],
    legacySource: { map: 'M', paths: [src.outer, ...src.inner] },
  };
}

export function importProvisional(ch: string): GlyphDefinition {
  const d = (V06_SNAPSHOT.provisional as Record<string, string>)[ch];
  if (d === undefined) throw new Error(`import: no provisional base for ${ch}`);
  const variantId = `${ch.toLowerCase()}.provisional-base`;
  const contours = buildContours(variantId, [{ d, role: 'outer' }]);
  return {
    ...baseRecord(ch),
    maturity: 'provisional',
    geometryStatus: 'draft',
    baseMetrics: metrics(contours),
    semanticGraph: {
      components: [],
      junctions: [],
      negativeSpaces: [],
      anchors: [],
      constraints: [],
      topology: {
        connectedComponentCount: null,
        contourCount: contours.length,
        counterIds: [],
        apertureIds: [],
        apertureStatus: 'none-declared',
        // v0.6 drew provisional bases with nonzero; any counter there depends on subpath winding.
        fillRule: 'nonzero',
      },
    },
    variants: [
      {
        variantId,
        label: `${ch} provisional geometric base (v0.6)`,
        maturity: 'provisional',
        geometry: { format: 'path-segments', contours, editability: 'reference-only' },
        identityInvariants: [],
        deliberateChanges: [],
        seedPolicy: 'none',
        provenanceRefs: [PROVENANCE_ID],
      },
    ],
    legacySource: { map: 'F', paths: [d] },
  };
}

export function importV06(): GlyphDefinition[] {
  return ALPHABET.map((ch) =>
    (AUTHORED as readonly string[]).includes(ch) ? importAuthored(ch as (typeof AUTHORED)[number]) : importProvisional(ch),
  );
}
