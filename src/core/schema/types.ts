/**
 * Canonical glyph record types — schema 1.0.
 *
 * Follows research/GLYPH_DATA_CONTRACT_A_Z.md §3. Deliberate deviations, all made so the
 * model never has to carry an invented number or classification:
 *  - GlyphMetrics: advance/side bearings/cap height are `null` until calibrated
 *    (the contract types them as numbers, but forbids inventing values).
 *  - VectorContour.role adds "unclassified" for imported subpaths whose role is not yet established.
 *  - Segments and contours carry stable IDs (ticket 0.7A-T02).
 *  - TopologySummary adds `apertureStatus` and allows `connectedComponentCount: null`
 *    until the validator (T04) has measured it.
 *  - GlyphDefinition adds `legacySource` holding the verbatim imported path strings.
 *
 * This module is pure data: no DOM, no three.js.
 */

export const SCHEMA_VERSION = '1.0' as const;

export type GlyphId = `latin.upper.${string}`;
export type VariantId = string;
export type ContourId = string;
export type SegmentId = string;

export type Maturity =
  | 'provisional'
  | 'authored-contour'
  | 'semantic-reviewed'
  | 'render-reviewed'
  | 'context-reviewed'
  | 'production-approved'
  | 'deprecated';

export type GeometryStatus = 'draft' | 'validated' | 'review-required' | 'rejected';

export type NegativeSpaceKind = 'counter' | 'aperture' | 'channel';

export interface Point {
  x: number;
  y: number;
}

export interface Bounds {
  minX: number;
  minY: number;
  maxX: number;
  maxY: number;
}

export interface CoordinateSystem {
  unitsPerEm: number | null;
  origin: Point;
  positiveYDirection: 'up' | 'down';
  baselineY: number | null;
  capHeightY: number | null;
  measurementNotes: string;
}

export interface GlyphMetrics {
  advanceWidth: number | null;
  /** Exact bounds of the imported geometry (curve extrema included). Measured, not calibrated. */
  visibleBounds: Bounds;
  sideBearingStart: number | null;
  sideBearingEnd: number | null;
  capHeight: number | null;
  measurementMethod: string;
  calibrated: boolean;
}

export type VectorSegment =
  | { id: SegmentId; type: 'move'; x: number; y: number }
  | { id: SegmentId; type: 'line'; x: number; y: number }
  | { id: SegmentId; type: 'quadratic'; cx: number; cy: number; x: number; y: number }
  | { id: SegmentId; type: 'cubic'; c1x: number; c1y: number; c2x: number; c2y: number; x: number; y: number }
  | { id: SegmentId; type: 'close' };

export type ContourRole = 'outer' | 'counter' | 'aperture-boundary' | 'detail' | 'extension' | 'unclassified';

export interface VectorContour {
  contourId: ContourId;
  role: ContourRole;
  closed: boolean;
  segments: VectorSegment[];
  /** Screen-space winding in the declared coordinate system, from the exact signed area. */
  winding: 'clockwise' | 'counterclockwise' | 'unspecified';
  /** Exact signed area (Green's theorem, quadratic segments integrated exactly). */
  signedArea: number;
  source: 'authored' | 'generated' | 'imported';
}

export interface VectorGeometry {
  format: 'path-segments';
  contours: VectorContour[];
  editability: 'fully-editable' | 'partially-editable' | 'reference-only';
}

export interface NegativeSpace {
  id: string;
  kind: NegativeSpaceKind;
  geometryRef?: ContourId;
  boundaryComponentIds: string[];
  protected: boolean;
  confidence: 'authored' | 'inferred' | 'provisional';
  notes?: string;
}

export interface TopologySummary {
  connectedComponentCount: number | null;
  contourCount: number;
  counterIds: string[];
  apertureIds: string[];
  apertureStatus: 'none-declared' | 'classified' | 'interpretation-required';
  fillRule: 'nonzero' | 'evenodd';
}

export interface SemanticGraph {
  /** Filled by T03 (semantic overlay). Empty in the T02 import. */
  components: unknown[];
  junctions: unknown[];
  negativeSpaces: NegativeSpace[];
  anchors: unknown[];
  constraints: unknown[];
  topology: TopologySummary;
}

export interface GlyphVariant {
  variantId: VariantId;
  label: string;
  maturity: Maturity;
  geometry: VectorGeometry;
  identityInvariants: string[];
  deliberateChanges: string[];
  seedPolicy: 'none' | 'deterministic';
  provenanceRefs: string[];
}

export interface ProvenanceRecord {
  id: string;
  kind: 'authored-by-project' | 'legacy-prototype' | 'research-reference' | 'derived' | 'imported';
  sourcePath?: string;
  sourceSha256?: string;
  sourceCommit?: string;
  rightsStatus?: 'original' | 'licensed' | 'permission-required' | 'reference-only' | 'unknown';
  notes?: string;
}

export interface ReviewRecord {
  id: string;
  stage: 'semantic' | 'geometry' | 'render' | 'context' | 'owner';
  status: 'pending' | 'passed' | 'failed' | 'waived';
  reviewer: string;
  date: string;
  notes?: string;
}

export interface LegacySource {
  map: 'M' | 'F';
  /** Verbatim path strings; for `M` the outer first, then inner paths in source order. */
  paths: string[];
}

export interface GlyphDefinition {
  schemaVersion: typeof SCHEMA_VERSION;
  glyphId: GlyphId;
  character: string;
  script: 'Latin';
  case: 'uppercase';
  displayName: string;
  maturity: Maturity;
  geometryStatus: GeometryStatus;
  revision: number;
  coordinateSystem: CoordinateSystem;
  baseMetrics: GlyphMetrics;
  semanticGraph: SemanticGraph;
  variants: GlyphVariant[];
  provenance: ProvenanceRecord[];
  review: ReviewRecord[];
  legacySource: LegacySource;
}

export interface GlyphRegistrySnapshot {
  schemaVersion: typeof SCHEMA_VERSION;
  registryRevision: number;
  glyphs: GlyphDefinition[];
}
