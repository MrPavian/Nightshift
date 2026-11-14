# NIGHTSHIFT Glyph Data Contract — A–Z

**Status:** Version 1.0 specification proposal for Claude implementation  
**Scope:** Latin uppercase A–Z; later extension for numerals, punctuation, ligatures and non-Latin alphabets  
**Depends on:** `GLYPH_CONSTRUCTION_LIBRARY.md`, `ALPHABET_TEST_MATRIX_AND_GLYPH_VARIANTS.md`, `GLYPH_MASTER_AUDIT_V06.md`, `GLYPH_MASTER_SPECIFICATIONS_A_B_G_R_S.md`  
**Evidence boundary:** This is an engineering contract for NIGHTSHIFT. It is not a claim about a universal historical graffiti alphabet or a universal way writers construct letters.

## 1. Contract goals

The contract must represent:
- a stable identity for each glyph and each authored variant;
- semantic construction separately from rendered contours;
- closed contours, enclosed counters and open apertures without conflating them;
- measurable metrics and coordinate conventions;
- semantic anchors with direction and clearance;
- style-family compatibility and construction constraints;
- maturity, provenance and review history;
- deterministic generation and reproducible project snapshots;
- validation diagnostics;
- editable vector geometry and SVG interoperability.

The contract must not force every glyph into one outer path plus a list of holes. G demonstrates an open aperture/terminal relationship; S demonstrates a continuous silhouette without an enclosed counter. A, B and R currently have explicit counter paths. All cases must be first-class.

## 2. Canonical coordinate model

### 2.1 Local glyph space

Each glyph definition declares a coordinate system. Do not rely on implicit SVG user units or the legacy prototype's approximate 0–110 coordinates.

Required frame metadata:
- `unitsPerEm`: declared local unit scale;
- `baselineY`;
- `capHeightY`;
- optional `xHeightY` for lowercase extension;
- `origin`;
- `positiveYDirection`;
- `advanceWidth`;
- `visibleBounds`.

Use one consistent convention for all glyphs. Recommended implementation convention: x increases rightward, y increases upward in semantic geometry; convert explicitly at SVG/Three.js boundaries if the renderer uses downward-positive screen coordinates.

No production numerical metrics are mandated by this document. Calibrate them from reviewed glyph geometry and store actual measured values.

### 2.2 Metrics are not transforms

Keep base glyph metrics separate from instance transforms:
- base metrics describe the authored glyph;
- instance transform describes scale, slant, rotation and placement in a composition;
- style grammar may generate a named variant or a constrained transform, but must not silently rewrite the base master.

## 3. Conceptual data model

The following is an illustrative contract. Claude should implement runtime validation and refine serialization details, but must preserve the semantics and required distinctions.

```ts
type GlyphId = string;          // stable, e.g. "latin.upper.A"
type VariantId = string;        // stable within a glyph
type ComponentId = string;
type ContourId = string;
type AnchorId = string;

type Maturity =
  | "provisional"
  | "authored-contour"
  | "semantic-reviewed"
  | "render-reviewed"
  | "context-reviewed"
  | "production-approved"
  | "deprecated";

type GeometryStatus =
  | "draft"
  | "validated"
  | "review-required"
  | "rejected";

type ComponentRole =
  | "stem" | "bar" | "diagonal" | "bowl" | "arc"
  | "loop" | "crossbar" | "leg" | "tail" | "terminal"
  | "junction" | "connector" | "counter-boundary"
  | "aperture-boundary" | "extension" | "other";

type NegativeSpaceKind = "counter" | "aperture" | "channel";

interface GlyphDefinition {
  schemaVersion: "1.0";
  glyphId: GlyphId;
  character: string;
  script: "Latin";
  case: "uppercase";
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
  tags?: string[];
}

interface CoordinateSystem {
  unitsPerEm: number;
  origin: { x: number; y: number };
  positiveYDirection: "up" | "down";
  baselineY: number;
  capHeightY: number;
  xHeightY?: number;
  measurementNotes?: string;
}

interface GlyphMetrics {
  advanceWidth: number;
  visibleBounds: Bounds;
  sideBearingStart: number;
  sideBearingEnd: number;
  capHeight: number;
  overshootTop?: number;
  overshootBottom?: number;
  measurementMethod: string;
  calibrated: boolean;
}

interface Bounds {
  minX: number; minY: number;
  maxX: number; maxY: number;
}

interface SemanticGraph {
  components: SemanticComponent[];
  junctions: Junction[];
  negativeSpaces: NegativeSpace[];
  anchors: Anchor[];
  constraints: GlyphConstraint[];
  topology: TopologySummary;
}

interface SemanticComponent {
  id: ComponentId;
  role: ComponentRole;
  label: string;
  required: boolean;
  geometryRefs: string[];
  connectsTo: string[];
  notes?: string;
}

interface Junction {
  id: string;
  kind: "endpoint" | "continuation" | "branch" | "crossing"
      | "attachment" | "overlap" | "near-contact";
  componentIds: string[];
  position: { x: number; y: number };
  crossingOrder?: string[];
  confidence: "authored" | "inferred" | "provisional";
}

interface NegativeSpace {
  id: string;
  kind: NegativeSpaceKind;
  geometryRef?: string;
  boundaryComponentIds: string[];
  protected: boolean;
  minimumClearance?: number;
  expectedCountRole?: string;
  notes?: string;
}

interface Anchor {
  id: AnchorId;
  role: "entry" | "exit" | "top" | "bottom" | "left"
      | "right" | "overlap" | "connection" | "extension";
  position: { x: number; y: number };
  direction: { x: number; y: number };
  normal?: { x: number; y: number };
  allowedConnections: string[];
  clearanceRadius?: number;
  confidence: "authored" | "derived" | "provisional";
}

interface GlyphConstraint {
  id: string;
  kind: "preserve-counter" | "preserve-aperture"
      | "minimum-clearance" | "avoid-self-intersection"
      | "preserve-component-order" | "identity-invariant";
  targetIds: string[];
  parameters?: Record<string, number | string | boolean>;
  severity: "error" | "warning";
}

interface TopologySummary {
  connectedComponentCount: number;
  contourCount: number;
  counterIds: string[];
  apertureIds: string[];
  fillRule: "nonzero" | "evenodd";
  topologyHash?: string;
}

interface GlyphVariant {
  variantId: VariantId;
  label: string;
  maturity: Maturity;
  geometry: VectorGeometry;
  semanticOverrides?: Partial<SemanticGraph>;
  styleCompatibility: StyleCompatibility[];
  identityInvariants: string[];
  deliberateChanges: string[];
  seedPolicy: "none" | "deterministic";
  provenanceRefs: string[];
}

interface VectorGeometry {
  format: "path-segments";
  contours: VectorContour[];
  editability: "fully-editable" | "partially-editable" | "reference-only";
}

interface VectorContour {
  contourId: ContourId;
  role: "outer" | "counter" | "aperture-boundary"
      | "detail" | "extension";
  closed: boolean;
  segments: VectorSegment[];
  winding?: "clockwise" | "counterclockwise" | "unspecified";
  source: "authored" | "generated" | "imported";
}

type VectorSegment =
  | { type: "move"; x: number; y: number }
  | { type: "line"; x: number; y: number }
  | { type: "quadratic"; cx: number; cy: number; x: number; y: number }
  | { type: "cubic"; c1x: number; c1y: number; c2x: number; c2y: number; x: number; y: number }
  | { type: "close" };

interface StyleCompatibility {
  styleFamily: "bubble-throwup" | "blockbuster"
      | "straight-letter" | "wildstyle-study" | "neutral";
  support: "native" | "adaptable" | "experimental" | "unsupported";
  grammarRef?: string;
  notes?: string;
}

interface ProvenanceRecord {
  id: string;
  kind: "authored-by-project" | "legacy-prototype"
      | "research-reference" | "derived" | "imported";
  sourcePath?: string;
  sourceUrl?: string;
  creatorOrInstitution?: string;
  claim?: string;
  evidenceGrade?: "A" | "B" | "C" | "D" | "not-applicable";
  rightsStatus?: "original" | "licensed" | "permission-required"
      | "reference-only" | "unknown";
  notes?: string;
}

interface ReviewRecord {
  id: string;
  stage: "semantic" | "geometry" | "render" | "context" | "owner";
  status: "pending" | "passed" | "failed" | "waived";
  reviewer: string;
  date: string;
  artifactRefs?: string[];
  notes?: string;
}
```

## 4. Stable IDs and alphabet inventory

Use stable IDs independent of display labels:
- `latin.upper.A` through `latin.upper.Z`.
- Variant IDs should be stable and descriptive, e.g. `default`, `wide-bowl`, `open-apex`.
- Never use array position as identity.
- Renaming a display label must not break project references.
- Deprecated IDs remain resolvable for migration; do not recycle them.

Every uppercase letter must have an inventory record even when its geometry is provisional. Coverage must not be confused with maturity.

### 4.1 Structural coverage classes

These are validation lenses, not historical categories:
- open curves/terminals: C, G, J, S;
- enclosed counters: A, B, D, O, P, Q, R;
- multi-stem/bar structures: E, F, H, I, L, T;
- diagonals/branching: K, M, N, V, W, X, Y, Z;
- mixed structures: A, G, P, Q, R.

Letters may belong to multiple groups. The validator should not infer geometry from group membership.

## 5. Semantic graph and vector geometry

### 5.1 Separate meaning from drawing

Semantic components describe what structural role a part plays. Vector contours describe the actual editable boundary. The mapping is many-to-many:
- one semantic component may contribute multiple contour segments;
- one contour may be generated from several semantic components;
- a contour may include an intentional junction transition;
- negative spaces are explicit regions or topological relationships.

Do not make an SVG path string the only editable source of truth. Retain editable segment geometry and semantic graph references.

### 5.2 Counters, apertures and channels

- **Counter:** enclosed negative-space region bounded by glyph geometry.
- **Aperture:** intentional opening between terminals or contour boundaries.
- **Channel:** negative-space corridor, often between components or neighboring glyphs.

They are not interchangeable. A G-like opening must not be forced into a counter field. A word-level gap must not be stored as a glyph counter.

### 5.3 Fill topology

Every rendered shape must use a topology derived from declared geometry:
- explicit contour roles;
- consistent fill rule;
- validated containment/intersection relationships;
- stable counter and aperture semantics.

Never paint counter areas with the current paper colour. The surface behind the glyph must remain visible through negative space.

## 6. Metrics, anchors and calibration

### 6.1 Metrics

Metrics are required, but numerical values should be calibrated after glyph review. For each metric store:
- value;
- unit/frame;
- measurement method;
- calibrated flag;
- source/reviewer where applicable.

Avoid arbitrary fixed advances or universal anchor percentages before the first reviewed alphabet set exists.

### 6.2 Anchors

An anchor is a semantic connection proposal, not merely a point. It requires:
- position;
- direction;
- allowed connection roles;
- clearance radius or envelope;
- confidence/provenance;
- validation against actual contour geometry.

The relationship solver may derive candidate anchors, but must not silently promote them to authored anchors.

## 7. Style grammar and variants

Style families operate on glyph variants and construction constraints, not on a decorative effect stack.

Initial family identifiers:
- `bubble-throwup`;
- `blockbuster`;
- `straight-letter`;
- `wildstyle-study`.

A variant declares:
- which style families support it;
- structural invariants it preserves;
- deliberate structural changes;
- permitted operations;
- constraints and legibility trade-offs;
- provenance or reference notes.

“Wildstyle study” remains a NIGHTSHIFT study grammar, not a universal canonical formula. No style label alone proves historical authenticity.

## 8. Determinism and project reproducibility

A glyph master is static authored data unless a variant explicitly supports procedural generation.

For generated variants:
- use a documented deterministic PRNG;
- derive seeds from saved project seed + stable glyph ID + variant ID + operation ID;
- do not use unseeded `Math.random()` in reproducible operations;
- persist the resolved generated geometry or enough parameters to regenerate it exactly;
- include generator/schema version in the project snapshot.

The same project snapshot, engine version and seed must reproduce the same vector geometry. If an algorithm changes, preserve the old generator version or migrate with a recorded compatibility note.

## 9. Validation contract

Validation returns structured issues, not only a boolean.

Suggested issue shape:
```ts
interface ValidationIssue {
  code: string;
  severity: "error" | "warning" | "info";
  glyphId: string;
  variantId?: string;
  componentIds?: string[];
  contourIds?: string[];
  message: string;
  measuredValue?: number;
  expectedRange?: [number, number];
  suggestedAction?: string;
}
```

### 9.1 Required error checks

- invalid/missing glyph identity;
- invalid segment sequence or malformed contour;
- open contour where a closed fill contour is required;
- counter declared but missing geometry/boundary;
- aperture declared but no terminal/boundary relationship;
- self-intersection where prohibited;
- invalid fill topology or ambiguous containment;
- duplicate stable IDs;
- missing required semantic components;
- anchor direction vector of zero length;
- anchor outside valid glyph bounds without explicit permission;
- non-deterministic generation in a reproducible operation.

### 9.2 Required warning checks

- uncalibrated metrics;
- provisional semantic components;
- counter/aperture clearance below target;
- anchor clearance too small;
- near-contact or overlap without explicit relationship;
- unsupported style-family pairing;
- low-size collapse risk;
- variant changes an identity invariant;
- geometry imported as reference-only and not editable.

### 9.3 Geometry validation versus human review

Automated validation can measure topology, bounds, intersections, clearances and deterministic output. It cannot certify historical authenticity or aesthetic quality. Keep human review records separate and visible.

## 10. SVG and Three.js interoperability

### 10.1 SVG

SVG is an interchange/export representation, not the sole semantic model.
- Export outer contours, counters and details with correct fill-rule/topology.
- Preserve editable vector segments and stable IDs where possible.
- Include a metadata block or sidecar for semantic graph and project references.
- SVG export must match the visible editor composition.
- Import must preserve unsupported metadata rather than silently discard it; warn when a round-trip loses semantic editability.

### 10.2 Three.js

Three.js consumes geometry derived from the canonical vector/semantic model:
- create renderable shapes/meshes from validated contours;
- use actual negative-space topology;
- support interactive selection and manipulation;
- maintain stable references from scene objects back to glyph/component IDs;
- never make Three.js transient mesh state the only copy of editable geometry.

When users edit in the Three.js view, the interaction layer submits semantic/vector operations to the model. The model validates and emits updated geometry; the scene is rebuilt or incrementally updated from that result. This avoids two competing sources of truth.

### 10.3 Synchronization rule

**Canonical state:** semantic graph + editable vector geometry + project parameters.  
**Derived state:** SVG serialization, Three.js meshes, textures, diagnostics overlays and thumbnails.

Derived state may be cached, but must be reconstructible from canonical state and versioned generation parameters.

## 11. Migration from Build 0.6

Treat v0.6 as a source snapshot:
- preserve original path strings unchanged as legacy provenance;
- map A/B/R hole arrays to provisional counter records;
- map G/S as outer contours with explicit “aperture/gesture semantics pending” rather than inventing counters;
- map F-map letters as provisional geometry, not authored semantic masters;
- mark all imported records with `legacy-prototype` provenance;
- do not mark any imported glyph render-reviewed without actual proof-sheet review;
- record migration warnings for path strings containing multiple subpaths whose topology is not explicitly declared.

Migration must be reversible and must not overwrite the legacy prototype.

## 12. Project-level references

A project stores references to glyph master IDs and variants, not duplicated ad hoc path fragments as its only identity. It also stores:
- project schema version;
- engine/generator version;
- input word;
- selected glyph IDs/variant IDs;
- per-glyph transform and overrides;
- composition relationship graph;
- style grammar version;
- seed and deterministic operation parameters;
- vector snapshot/export references;
- review/diagnostic snapshot.

## 13. Acceptance criteria for the contract

- A–Z can be represented without special-case data structures for A/B/G/R/S.
- Counters and apertures are distinct first-class structures.
- Semantic components and editable contours can be mapped independently.
- Every glyph and variant has stable identity and maturity/provenance.
- Metrics can remain uncalibrated without fabricated numeric values.
- Anchors include direction and clearance semantics.
- Deterministic regeneration is testable.
- SVG round-trip preserves geometry and reports semantic losses.
- Three.js scene objects can be traced back to canonical glyph/component IDs.
- Automated validation and human review are separate.
- v0.6 paths can be imported as legacy references without being misrepresented as production masters.

## 14. Open implementation choices for Claude

Claude may choose implementation details, provided the semantics above remain intact:
- exact runtime validation library or custom validator;
- exact curve/segment internal classes;
- whether geometry operations use a dedicated computational-geometry library;
- cache and incremental scene-update strategy;
- metadata embedding strategy for SVG;
- serialization details for optional fields.

Claude must document these choices and add tests. Do not change the required distinctions between semantic data, vector geometry, negative-space topology, derived render state and maturity/provenance.
