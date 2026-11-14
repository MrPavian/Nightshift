# Glyph Geometry and Topology Validation Contract 01

**Status:** engineering design specification; not implemented functionality.  
**Scope:** canonical vector geometry, semantic topology, negative spaces, anchors and derived-render consistency.

## 1. Authority and model boundary

The semantic graph and editable vector geometry are canonical. Three.js meshes, SVG render output, textures and diagnostic overlays are derived. This follows owner decision D-009 and the production handoff; older architecture wording that treats Three.js as presentation-only is superseded for the production editor workflow. The scene may preview candidate edits, but it cannot become the persisted source of truth.

## 2. Validation pipeline

Run these stages after a typed model command and before commit:

1. Schema/reference integrity: stable IDs, finite coordinates, valid references and segment types.
2. Curve normalization: endpoint continuity, explicit closure, fill rule and winding policy.
3. Degeneracy: zero-length segments, duplicate points, zero-area contours and near-zero handles.
4. Intersection analysis: self-intersections, contour crossings and declared over/under relations.
5. Planar topology: connected components, bounded/unbounded faces, containment and declared topology signature.
6. Negative-space classification: compare counter, aperture and channel records with actual faces/connectivity.
7. Clearance: measure bottlenecks and minimum distances for protected regions.
8. Anchors: validate direction, usable zone, clearance and allowed connection roles.
9. Identity invariants: run glyph-specific structural checks.
10. Render consistency: verify derived SVG/Three.js output preserves canonical topology.

## 3. The three negative-space types

- **Counter:** a bounded, enclosed negative-space face. It must be topologically enclosed.
- **Aperture:** a negative-space region connected to exterior space, commonly between terminals. It must remain exterior-connected.
- **Channel:** a corridor between structural components or neighboring glyphs. It is not automatically a counter because it is locally narrow or bounded.

The validator must use actual geometry and connectivity, not slider values or pixel-colour guesses. Build a planar arrangement and classify faces using the variant's declared fill rule and semantic records.

## 4. Curve and intersection handling

Canonical line, quadratic Bézier and cubic Bézier segments remain editable. Computational checks may adaptively subdivide curves, but every approximation must carry a recorded error bound. Coarse fixed-step sampling cannot certify a narrow neck, aperture or crossing.

Use robust orientation, intersection and containment predicates with deterministic handling of near-degenerate cases. A crossing is valid only when the semantic graph declares participating components and, where relevant, front/back order. Undeclared self-intersections or crossings are hard failures. Do not delete tiny fragments or auto-repair topology silently; report affected IDs and require an explicit repair command.

## 5. Clearance measurement

Measure minimum Euclidean distance between relevant curve boundaries. Adaptive curve subdivision may provide conservative bounds; signed-distance fields or medial-axis approximations may accelerate candidate detection but must be checked against boundary geometry before a hard pass.

Every result includes measured minimum distance, closest point pair, affected IDs, measurement error bound, calibration profile ID and calibration status. A hard pass is allowed only when the measured distance minus its error bound meets the calibrated minimum.

Thresholds are specific to glyph/variant/feature and may depend on output scale. Do not invent a universal counter or neck clearance. An uncalibrated required threshold produces a warning and blocks production approval; it must not be silently treated as zero or passed.

## 6. Anchor validation

An anchor is a semantic connection zone, not just a coordinate. Validate stable ID, role, nonzero direction, usable region, boundary proximity, clearance and allowed connection types. Direction may be an authored vector or derived tangent, with provenance/confidence recorded. Anchor validity only makes a connection a candidate; the pair/word solver must validate the combined geometry and negative spaces.

## 7. Glyph-specific identity checks

| Glyph | Required structural checks | Negative-space expectation in current master |
|---|---|---|
| A | Two descending legs, apex relationship, authored cross-structure and connected junctions | One enclosed counter |
| B | Spine, upper/lower bowls, waist connectivity | Two distinct enclosed counters |
| G | Open-bowl family, semantic bar/terminal feature | One exterior-connected aperture; no assumed counter |
| R | Spine, upper bowl, attached descending leg | One enclosed counter, clear of leg |
| S | Continuous directional contour, upper/lower turns, middle transition | No enclosed counter in current master |

These are master-profile checks, not universal alphabet prescriptions. A separately named topology variant declares its own signature and passes a dedicated review gate.

## 8. Diagnostics

The machine-readable contract enumerates stable diagnostic codes. Each UI diagnostic includes severity, affected stable IDs, measured value, threshold, error bound, calibration status and actionable explanation. Hard errors reject the entire candidate command.

## 9. Test fixtures

Implement synthetic fixtures for enclosed counter pass; merged counters fail; open aperture pass; closed aperture fail; channel classification; undeclared self-intersection; declared crossing with order; clearance pass/fail including approximation error; invalid anchor; deterministic diagnostics; SVG/Three.js topology parity. Add A/B/G/R/S identity fixtures from the glyph review protocol.

## 10. Transaction and release gates

Validation runs on the candidate canonical model before commit. Any error-severity check rejects the whole edit and preserves the previous revision. Preview geometry may be shown but must be visibly provisional and cannot be persisted as committed geometry. Diagnostics must be deterministic for identical geometry and validator profile.

Automated geometry success is not human visual approval. Identity or topology errors block glyph approval. Uncalibrated required thresholds block production approval. Follow the glyph visual review protocol for proof sheets and reviewer records.

## 11. Implementation boundaries

This contract does not mandate a specific geometry library. Claude must inspect the actual repository runtime and choose a robust, testable implementation appropriate to dependency constraints. Record any dependency decision. The validator must expose deterministic interfaces and tests; it must not hide geometry repairs or silently downgrade a failed check.
