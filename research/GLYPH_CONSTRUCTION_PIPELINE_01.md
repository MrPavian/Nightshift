# Glyph Construction Pipeline 01 — Semantic Model to Three.js

**Status:** implementation architecture specification; not implemented functionality.  
**Purpose:** define the deterministic path from a glyph definition to an editable, validated glyph instance and its live Three.js representation.  
**Authority:** `GLYPH_DATA_CONTRACT_A_Z.md`, `GLYPH_CONSTRUCTION_GUIDE.md`, `VISUAL_CONSTRUCTION_BRIEF_01.md`, `GENERATOR_SYSTEM_RESPONSIBILITIES.md`, and decision D-009.

## 1. Non-negotiable model boundary

The canonical glyph is a semantic construction graph plus editable vector geometry, metrics, anchors, constraints, maturity and provenance. It is not a font character, SVG string, bitmap, Three.js Shape or mesh.

Three.js is the integrated live editing/rendering surface. Its objects and meshes are derived representations. Every persistent edit returns through a typed command, is validated against the canonical model, and is then rendered from committed state.

The word “skeleton” means the principal directional/structural organization used to reason about letter identity. It does **not** imply that every closed contour reveals a historical stroke order. Do not infer gesture sequence from a filled outline.

## 2. Pipeline overview

`Glyph Registry → Definition Resolution → Semantic Construction → Parametric Operations → Editable Vector Geometry → Topology/Identity Validation → Metrics & Anchors → Glyph Instance → Three.js Scene Adapter → Live Editor`

Each stage consumes a versioned input and emits a versioned result plus diagnostics. A failed hard gate stops downstream production rendering; a draft/inspection mode may show the last committed valid state alongside the failed preview.

## 3. Stage contracts

### Stage 0 — Registry and definition resolution
Resolve stable `glyphId`, `variantId`, maturity, source revision, provenance, coordinate system, base metrics and grammar compatibility. Never resolve identity by array position or display label. A provisional definition may be inspected but must remain visibly provisional.

### Stage 1 — Semantic construction graph
Resolve authored components and their roles: stems, bars, diagonals, bowls, arcs, loops, legs, terminals, junctions and other declared roles. Resolve component connectivity, identity invariants, junction semantics, negative-space declarations and authored anchors.

Semantic components describe *what* a part does; they do not prescribe one universal drawing/stroke order. Components may map to multiple contour segments and contours may be generated from multiple components.

### Stage 2 — Construction plan and registered operations
Build an immutable construction plan from:
- selected authored master/variant;
- compatible style grammar axes;
- recipe and project rules;
- registered glyph parameter operations;
- explicit user overrides and locks;
- deterministic request seed/version where randomness is permitted.

Apply precedence from the Personal Style Engine. Reject unsupported grammar/variant combinations. No generic untyped property mutation, hidden random values or topology-changing slider operation is permitted.

### Stage 3 — Editable vector geometry generation
Generate/update canonical editable line, quadratic Bézier and cubic Bézier segments and explicit contour records. Maintain stable contour and segment IDs where identity survives the edit. Store semantic-to-geometry references.

A semantic component can contribute multiple contours; a contour can represent transitions among components. Keep outer boundaries, counter boundaries, aperture boundaries, details and extensions semantically distinct. Do not flatten to one opaque path string.

### Stage 4 — Topology and identity validation
Run the ordered geometry validator:
1. schema/reference integrity;
2. curve normalization;
3. degeneracy;
4. contour intersections;
5. planar topology;
6. negative-space classification;
7. clearance;
8. anchors;
9. glyph identity invariants;
10. derived-render consistency.

Counters are enclosed bounded regions; apertures remain exterior-connected; channels are corridors. Verify declared topology signatures, required component connectivity, junctions and identity invariants. No silent repair or automatic topology conversion. Rejection is atomic.

### Stage 5 — Metrics and anchor resolution
Calculate measured visible bounds from canonical geometry and resolve advance width, side bearings, baseline/cap-height relation and other declared metrics. Preserve authored base metrics separately from instance transforms.

Anchors resolve from authored positions or registered derivation rules. Each carries stable ID, position, direction, optional normal, allowed relationship types and clearance metadata. An anchor is not valid merely because a point exists; its usable region must pass geometry checks.

### Stage 6 — Glyph instance assembly
Create an instance that references the immutable glyph definition/variant and stores its own transform, overrides, resolved parameter snapshot, canonical revision and provenance. Instance-level edits must not destructively mutate the master. Apply style and project rules without silently rewriting base metrics.

### Stage 7 — Three.js scene adaptation
Convert validated canonical contours to derived render geometry:
- triangulate filled regions with holes and aperture topology handled correctly;
- generate outline/edge representations from the same topology;
- generate optional extrusion/depth as a derived layer;
- attach stable semantic IDs to selectable scene objects/handles;
- create diagnostic overlays for components, anchors, counters, apertures and channels.

Do not use generic Three.js Shapes as the only representation of the glyph. Preserve mapping from each selectable/rendered feature to canonical IDs. Camera, lighting, material and scene transforms are view state unless explicitly committed as a typed model operation.

### Stage 8 — Interaction and command commit
Picking selects stable project/word/glyph/component/contour/segment/anchor IDs. Dragging produces a preview candidate against a working copy. Pointer release emits one typed command with expected revision. The model validates and atomically commits or rejects it. On rejection, restore the last committed scene and display actionable diagnostics.

One drag gesture is one undoable command. No direct mesh-vertex mutation may become canonical persistence.

### Stage 9 — Derived outputs and persistence
From committed canonical state, derive SVG interchange, Three.js meshes, thumbnails, proof sheets and diagnostics. Persist schema/version, source glyph/variant IDs, canonical vector and semantic state, metrics, anchors, operation/parameter snapshot, transforms, relationships, seed and provenance. SVG import/export must report unsupported semantics rather than silently flattening or losing them.

## 4. Stable identity and invalidation

Stable IDs must survive geometry regeneration when the semantic entity remains the same. If topology changes, affected contour/segment IDs may be retired and replaced through an explicit migration map; never recycle IDs for unrelated entities.

Each registered operation declares invalidation classes. For example, a bowl-width edit may invalidate bowl contours, counter geometry, bounds, anchor clearances and derived meshes; it must not rebuild unrelated glyphs or rewrite the master. Use the parameter dependency contract as the source of truth for exact invalidation.

## 5. Glyph-specific first slice

The first implementation slice is deliberately limited to existing authored-contour masters A/B/G/R/S. Preserve their v0.6 path snapshots as legacy reference input, not as unquestioned production geometry.

| Glyph | Required semantic/topology checks |
|---|---|
| A | two legs, apex relationship, authored cross-structure; preserve declared counter/open-apex variant |
| B | spine, upper/lower bowls, two distinct bounded counters, waist connectivity |
| G | open-bowl family, internal bar/terminal feature, exterior-connected aperture; do not force a counter |
| R | spine, bowl, descending leg, enclosed counter and leg clearance |
| S | continuous directional contour, upper/lower turns, middle transition, neck clearance; no forced counter |

The five masters remain at `authored-contour` until their semantic, geometry, render and context gates have been completed. This document does not certify their visual quality.

### Slice 1 — Import and preserve
- Import exact v0.6 snapshots.
- Create stable semantic IDs and explicit topology declarations.
- Keep original geometry immutable as a reference revision.
- Generate neutral proof specimens and validator reports.
- No automatic shape correction.

### Slice 2 — Minimal registered edits
- A: stance and crossbar.
- B: bowl balance and waist.
- G: aperture and bar placement.
- R: leg angle/length.
- S: mass and neck.
- Each control is a typed operation with dependencies, calibrated bounds and atomic validation. Until bounds are approved, controls remain inspection/experimental only.

### Slice 3 — Remaining variants
Implement additional named structural variants only after the master and first controls pass review. Topology-changing variants are separately authored and separately reviewed.

## 6. Error handling and user-facing diagnostics

Each stage emits stable diagnostic code, severity, affected IDs, measured values, threshold/calibration status and repair guidance where safe. Hard errors block commit. Soft warnings allow a commit only when the operation contract permits it. A rejected command leaves canonical model revision and persisted project unchanged.

The editor should explain failures in practical language: “G aperture would close” or “R leg loses its bowl attachment,” while retaining the stable diagnostic code for logs and tests.

## 7. Performance and incremental recomputation

- Cache immutable glyph definitions and versioned grammar data.
- Recompute only affected components and dependency classes.
- Keep preview geometry separate from committed canonical geometry.
- Debounce expensive triangulation during pointer movement; validate the final candidate before commit.
- Use stable IDs for Three.js object reuse, picking and overlay updates.
- Rebuild full glyph/word proofs in background or on demand, not on every pointer frame.
- Never trade away hard topology checks for frame rate; preview may be explicitly marked approximate.

## 8. Required test layers

1. **Schema tests:** IDs, references, coordinate frame and version migration.
2. **Semantic tests:** required components, junctions, identity invariants.
3. **Geometry tests:** curve continuity, degeneracy, intersections and topology.
4. **Negative-space tests:** counter/aperture/channel classification and clearance.
5. **Anchor tests:** direction, allowed relationships and usable-zone clearance.
6. **Command tests:** stale revision, atomic rejection, undo/redo and deterministic replay.
7. **Renderer tests:** Three.js/SVG topology and geometry consistency.
8. **Interaction tests:** stable selection, preview/commit/cancel, one drag = one command.
9. **Persistence tests:** save/reload, migration and reproducible reconstruction.
10. **Proof tests:** A/B/G/R/S, pair and word fixtures, maturity/provenance metadata.

## 9. Acceptance criteria

- Canonical model contains semantic graph and editable vector segments.
- Three.js scene is fully derived and maps back to stable canonical IDs.
- All edits commit through typed commands and validation.
- Counters, apertures and channels remain distinct in model and render.
- A/B/G/R/S identity checks are glyph-specific and testable.
- Failed commands never partially mutate canonical state.
- Undo/redo restores byte-equivalent canonical state and metadata.
- SVG and Three.js derive from the same committed geometry.
- No production parameter bounds are invented or exposed before calibration.
- Provisional maturity and missing review evidence remain visible.
- Deterministic save/reload and seed replay are verified.

## 10. Implementation handoff order

1. Canonical schema/runtime validation.
2. Stable glyph registry and exact legacy snapshot import.
3. Semantic graph and vector geometry adapters.
4. Ordered geometry/topology validator integration.
5. Registered operation executor and atomic command bus.
6. Metrics/anchor resolver.
7. Three.js scene adapter and stable-ID picking.
8. Preview/commit/undo/redo interaction.
9. SVG/persistence round-trip.
10. Proof-sheet harness and review gate.

Do not begin with extrusion, spray materials or decorative effects. The first visible success is a correctly editable, topologically valid monochrome A/B/G/R/S set in the live Three.js editor.
