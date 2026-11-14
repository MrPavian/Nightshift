# Glyph Parameter Dependency Contract 01

**Status:** machine-readable engineering contract; design specification, not implementation.

## Purpose

This contract defines typed edit operations, parameter ownership, dependency invalidation, validation gates and transaction semantics for the first authored glyph batch A/B/G/R/S. The JSON registry at `contracts/glyph-parameter-contract.v1.json` is the machine-readable source of operation and parameter metadata.

## Execution model

1. A UI control or Three.js handle emits a typed command with stable command, operation, glyph-instance and variant IDs plus the expected model revision.
2. The model checks the revision and parameter types, then derives candidate canonical vector geometry from the semantic glyph graph.
3. The validator runs hard identity, topology, geometry and anchor checks. Soft composition/style diagnostics are reported separately.
4. A valid candidate is committed atomically; an invalid candidate is rejected without changing canonical state or revision.
5. The commit invalidates only the dependent derived views listed by the operation. Three.js meshes, SVG, textures and proof sheets are regenerated from committed canonical state.

Undo/redo replays inverse/forward canonical patches through the same validation path. It must not restore stale meshes as authoritative state.

## Parameter calibration

No numeric minimum, maximum, default or slider step is fabricated here. Numeric parameters reference a calibration class and remain unavailable for unconstrained production UI until bounds are measured from the authored master geometry and reviewed fixtures. The UI must not silently clamp a value; it must reject it or return a visible diagnostic.

## Dependency semantics

- **geometry:** rebuild affected vector segments/contours.
- **metrics:** recompute bounds and glyph metrics.
- **topology:** revalidate counters, apertures, channels and component connectivity.
- **anchors:** recompute positions, directions and clearance envelopes.
- **composition:** rerun neighboring-pair, word-flow and collision analysis.
- **diagnostics:** rerun named hard and soft checks.

## Glyph-specific coupling

| Glyph | Primary coupled relationships | Critical validation |
|---|---|---|
| A | stance ↔ counter/leg balance; crossbar height/thickness ↔ counter and junction | counter remains enclosed; legs and crossbar remain connected |
| B | bowl widths/mass ↔ counters; waist ↔ counter separation and spine junction | two counters remain distinct; waist does not sever |
| G | aperture ↔ terminal direction; bar height/length/angle ↔ attachment and G/C distinction | aperture remains open; bar attachment is semantic |
| R | bowl width ↔ counter and leg origin; leg angle/length ↔ bounds and pair clearance | counter remains clear; leg remains attached |
| S | mass/width ↔ silhouette; neck ↔ minimum clearance; curve tension ↔ self-intersection; terminal tangents ↔ anchors | continuous contour and directional flow remain intact |

## Topology policy

Continuous parameter operations may reshape geometry only while preserving the variant's declared topology. A topology-changing study must select a separately named authored variant from the master glyph variant matrix, then pass the full topology review gate. Do not expose topology mutations as a normal slider or random remix side effect.

## Three.js integration

Three.js is an editor surface, not the canonical model. Handles bind to stable semantic component/anchor IDs. Pointer movement previews a candidate; pointer release submits one typed command. Rejected candidates restore the last committed scene state and expose diagnostics. No handle may write directly to mesh vertices and persist that as project state.

## Acceptance tests

- Every operation rejects stale `expectedRevision` values without mutation.
- Every hard-constraint failure leaves canonical state and revision unchanged.
- Every accepted command is deterministic for identical input, seed and generator version.
- Undo then redo returns to byte-equivalent canonical geometry and metadata.
- A parameter edit invalidates all and only its declared dependency classes.
- G aperture tests distinguish exterior-connected aperture from enclosed counter.
- B tests preserve two separate counters across waist and bowl edits.
- A/R tests preserve counter clearance and component connectivity.
- S tests preserve continuous contour, neck integrity and directional silhouette.
- SVG and Three.js viewport derive from the same committed vector state.
- No production numeric range is exposed until its calibration reference is recorded.

## Scope boundary

This contract specifies model behavior and test obligations. It does not claim that the editor, command bus, geometry solver, validator or UI controls already exist.
