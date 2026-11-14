# A/B/G/R/S Glyph Construction Implementation Specification 01

**Status:** Claude-ready engineering specification; not production approval  
**Scope:** First editable glyph set for NIGHTSHIFT 0.7  
**Source baseline:** Build 0.6 legacy contours  
**Canonical rule:** Semantic construction graph + editable vector geometry are authoritative. Three.js objects, SVG output and proof images are derived.

## 1. Evidence boundary and implementation goal

This document combines verified v0.6 source facts with proposed engineering structures. Keep those categories separate in code and review records.

Verified source facts:
- A: one closed outer path and one separately stored closed inner path.
- B: one closed outer path and two separately stored closed inner paths.
- G: one closed outer path; its hole array is empty. Opening, internal bar and terminal logic are encoded in that single closed contour.
- R: one closed outer path and one separately stored closed inner path.
- S: one closed outer path; its hole array is empty. No enclosed counter is declared.
- The prototype's explicit counters are painted with fixed paper colour `#eee9dc`; outline/inline/highlight passes use the outer path only. This is not topology-correct rendering on arbitrary surfaces.
- The source's approximate 0–110 local coordinates are an observed v0.6 convention, not a production coordinate standard.

The source path command order is not evidence of historical stroke order or semantic segmentation. Preserve every original path string and its source ordering exactly as an immutable legacy snapshot. Do not normalize, simplify, re-fit, reverse, or repair the snapshot during import. A normalized editable representation may be derived alongside it, with a reversible mapping and provenance.

Goal of the first implementation slice: load A/B/G/R/S as editable monochrome glyph records, expose candidate semantic components and topology diagnostics, render negative space correctly, and support registered typed edits only when their parameter dependencies and calibration prerequisites are satisfied.

## 2. Canonical record shape

Each glyph record must carry:
- stable `glyphId` and stable `variantId`;
- schema and source-version identifiers;
- immutable `legacySnapshot` containing exact source path data and source locator/hash;
- editable vector geometry with stable contour, segment and node IDs;
- semantic component graph with stable component IDs and explicit relationships;
- explicit topology records: counters, apertures, channels, or an explicit none declaration;
- metrics with measured value, unit/coordinate frame, measurement method and calibration status;
- anchors with stable IDs, role, direction, clearance envelope and status;
- identity invariants and validation rules;
- maturity, provenance, review and revision history.

Do not store transient Three.js Object3D/Mesh references as canonical state. Scene objects carry canonical IDs in their adapter metadata and are recreated from committed state.

Suggested stable ID namespaces:
- glyph: `latin.upper.A` etc.;
- master variant: `a.master`, `b.master`, `g.master`, `r.master`, `s.master`;
- component: `glyph.A.component.left-leg` etc.;
- contour: `glyph.A.contour.outer`, `glyph.A.contour.counter.primary`;
- anchor: `glyph.A.anchor.entry-left`;
- relationship: `glyph.A.relationship.left-leg-apex`.

IDs identify authored semantic entities, not array positions. Renumbering an array must not change identity.

## 3. Legacy import and topology declarations

Import exact path snapshots without semantic edits:
| Glyph | Verified source paths | Initial topology declaration |
|---|---|---|
| A | outer + 1 inner | one enclosed counter |
| B | outer + 2 inner | two distinct enclosed counters |
| G | outer only | exterior-connected opening/aperture semantics pending contour interpretation; never invent a counter |
| R | outer + 1 inner | one enclosed counter |
| S | outer only | no enclosed counter in master |

For A/B/R, convert inner path records to provisional counter entities while preserving exact path geometry. Validate their relationship to the outer contour; do not assume the source's visual intent is fully reviewed.

For G, retain the exact single contour. Add a provisional semantic aperture declaration tied to a reviewed/derived boundary interpretation only when the geometry analysis can establish exterior connectivity. If the existing contour cannot be robustly decomposed, record `apertureStatus: "interpretation-required"` and show a diagnostic rather than fabricating an aperture polygon. The internal bar/terminal semantics remain candidate mappings.

For S, record `counterStatus: "none-in-master"`. Do not convert an empty hole array into an inferred negative-space shape. Validate contour self-intersection and deterministic fill.

## 4. Semantic component proposals

The following are engineering hypotheses for editor addressability, not verified source segmentation. Each component must map to one or more editable vector segments through an explicit mapping record. If a component cannot be mapped unambiguously without altering geometry, preserve the geometry and mark the component mapping `provisional-unmapped`.

### A — two-leg / apex family
Candidate components:
- `left-leg`
- `right-leg`
- `apex-zone`
- `crossbar-zone`
- `counter-boundary` (topology boundary, not positive fill)

Invariants for master-preserving and structural variants:
- A-family apex region and two descending legs remain identifiable;
- one enclosed counter remains protected;
- cross-structure remains attached and distinguishes A from a simple Λ-like form.

Do not decide from the outline alone whether the crossbar is an independent bar or an integrated contour transition. Preserve this as a construction choice in the graph.

### B — spine / two bowls
Candidate components:
- `spine`
- `upper-bowl`
- `lower-bowl`
- `waist-junction`
- `counter-upper`
- `counter-lower`

Invariants:
- one connected spine-and-bowl structure;
- two distinct enclosed counters in master-preserving and structural variants;
- upper/lower bowls remain distinguishable;
- waist does not disconnect the silhouette or merge counters accidentally.

### G — open bowl / bar / terminals
Candidate components:
- `outer-bowl`
- `upper-terminal`
- `lower-terminal`
- `internal-bar`
- `bar-attachment`
- `aperture-boundary` (only after geometric interpretation)

Invariants:
- open bowl family with an exterior-connected opening;
- terminal directions and bar relationship distinguish G from C and O;
- bar attachment is structural, not a decorative bridge;
- aperture remains open after supported transforms.

### R — spine / bowl / leg
Candidate components:
- `spine`
- `upper-bowl`
- `bowl-leg-junction`
- `descending-leg`
- `counter-boundary`

Invariants:
- spine, upper bowl and descending leg remain distinguishable;
- one enclosed counter remains protected in master-preserving and structural variants;
- leg remains attached through an authored junction;
- leg does not create an accidental pocket or sever the bowl.

### S — continuous directional curve
Candidate components:
- `upper-terminal`
- `upper-curve-mass`
- `middle-transition`
- `lower-curve-mass`
- `lower-terminal`

Invariants:
- one continuous connected contour;
- no enclosed counter in master;
- upper/lower directional turns remain legible;
- middle transition remains a deliberate constriction, not an accidental pinch.

Do not infer gesture/stroke order from the closed contour. A gesture trace, if authored later, is a separate representation with its own provenance.

## 5. Geometry, topology and rendering requirements

Use the geometry validation pipeline and contract as normative. Required order:
1. schema/reference integrity;
2. curve/segment normalization without mutating the legacy snapshot;
3. degeneracy checks;
4. self-intersection analysis;
5. planar topology;
6. counter/aperture/channel classification;
7. clearance checks;
8. anchor validation;
9. glyph identity invariants;
10. renderer consistency.

Counter, aperture and channel are distinct:
- counter: enclosed negative-space region;
- aperture: opening connected to exterior;
- channel: negative-space corridor relevant to spacing/flow.

One validated topology representation must drive fill, outline, inline, highlights, depth and SVG. Use compound paths/boolean topology or an equivalent robust representation with correct winding/fill-rule handling. Never paint a hole with a sampled background colour. A/B/R counter boundaries must be represented in every applicable pass. G's aperture must expose the actual surface and remain exterior-connected. S must not acquire a phantom counter.

If a render pass cannot support a topology feature, fail with a structured diagnostic; do not silently fall back to the old paper-colour patch.

## 6. Metrics and anchors

Metrics are measured outputs, not arbitrary defaults. Record calibration state independently for each metric. No production numeric bounds are specified here.

Candidate measurements:
- A: apex position/angle, leg thickness profiles, crossbar position/thickness, counter area/clearance, side bearings.
- B: spine thickness, bowl widths/heights, waist width, counter areas/clearances, advance width.
- G: bowl curvature/width, aperture width at declared measurement line, terminal directions, bar extent/angle/attachment.
- R: spine thickness, bowl dimensions, counter area/clearance, leg origin/angle/length, junction geometry.
- S: upper/lower mass ratio, neck width, curvature/inflection descriptors, terminal tangents, advance bounds.

Candidate anchors are semantic proposals only. Initial import may derive candidate locations from geometry, but must label them `derived-provisional`, retain derivation method and expose no production connection handle until direction and clearance are validated. Do not hardcode coordinates in this specification.

Candidate anchor roles:
- A: lower-left entry, lower-right exit, upper shoulders, crossbar-side zones.
- B: upper/lower spine zones, upper-right and lower-right bowl terminals, waist-side zone.
- G: upper/lower terminals, outer bowl zone, bar terminal/attachment.
- R: upper/lower spine zones, outer bowl zone, leg terminal, optional waist zone.
- S: upper/lower terminals, stable outer-curve zones. Avoid the narrowest neck unless separately validated.

Every anchor needs a stable ID, local position, unit direction, allowed relationship roles, clearance envelope, source/derivation and validation status.

## 7. Variant registry and topology boundaries

Keep variant IDs from the existing matrix. The first import slice creates only the master variant and does not auto-generate alternate geometry.

A variants:
- `a.master`
- `a.stance-narrow`, `a.stance-wide`
- `a.crossbar-high`, `a.crossbar-low`
- `a.apex-rounded`
- `a.open-apex` — topology-changing, separately authored

B variants:
- `b.master`
- `b.upper-dominant`, `b.lower-dominant`
- `b.waist-open`, `b.waist-tight`
- `b.angular-bowls`, `b.rounded-bowls`
- `b.open-bowl-study` — topology-changing, separately authored

G variants:
- `g.master`
- `g.aperture-wide`, `g.aperture-tight`
- `g.bar-high`, `g.bar-low`, `g.bar-extended`
- `g.terminal-angular`, `g.terminal-rounded`
- `g.aperture-variant` — topology-changing, separately authored

R variants:
- `r.master`
- `r.leg-steep`, `r.leg-shallow`
- `r.leg-long`, `r.leg-compact`
- `r.bowl-wide`, `r.bowl-narrow`
- `r.bowl-angular`, `r.bowl-rounded`
- `r.straight-leg-study`

S variants:
- `s.master`
- `s.upper-heavy`, `s.lower-heavy`
- `s.wide`, `s.compact`
- `s.neck-open`, `s.neck-tight`
- `s.angular-flow`, `s.curved-flow`
- `s.terminal-direction-study`

All non-topology variants remain named authoring targets, not a promise that geometry is already available. Topology-changing variants must be authored, validated and reviewed independently. Never create them by ordinary continuous parameter drift.

## 8. Registered parameter operations

Use the operation IDs and parameter names exactly as declared in `contracts/glyph-parameter-contract.v1.json`. Do not invent aliases or generic property setters.

A:
- `glyph.A.set-stance-width` → `stanceWidth`
- `glyph.A.set-crossbar-height` → `crossbarHeight`
- `glyph.A.set-crossbar-thickness` → `crossbarThickness`
- `glyph.A.set-apex-roundness` → `apexRoundness`
- `glyph.A.set-leg-mass` → `legMass`

B:
- `glyph.B.set-upper-bowl-width` → `upperBowlWidth`
- `glyph.B.set-lower-bowl-width` → `lowerBowlWidth`
- `glyph.B.set-mass-ratio` → `upperLowerMassRatio`
- `glyph.B.set-waist-width` → `waistWidth`
- `glyph.B.set-bowl-roundness` → `bowlRoundness`

G:
- `glyph.G.set-aperture-width` → `apertureWidth`
- `glyph.G.set-bar-height` → `barHeight`
- `glyph.G.set-bar-length` → `barLength`
- `glyph.G.set-bar-angle` → `barAngle`
- `glyph.G.set-terminal-direction` → `terminalDirection`

R:
- `glyph.R.set-bowl-width` → `bowlWidth`
- `glyph.R.set-counter-scale` → `counterScale`
- `glyph.R.set-leg-angle` → `legAngle`
- `glyph.R.set-leg-length` → `legLength`
- `glyph.R.set-junction-treatment` → `junctionTreatment`

S:
- `glyph.S.set-mass-ratio` → `upperLowerMassRatio`
- `glyph.S.set-overall-width` → `overallWidth`
- `glyph.S.set-neck-width` → `neckWidth`
- `glyph.S.set-curve-tension` → `curveTension`
- `glyph.S.set-terminal-tangents` → `terminalTangentStart` + `terminalTangentEnd`

Operation registration does not mean every control is immediately safe to expose. Until its parameter has a calibrated interval and a validated derivation function, keep it hidden/disabled or expose only a non-committing inspection preview with `CALIBRATION_REQUIRED`. Never invent min/max values, silently clamp, or silently repair geometry.

Each edit is a typed command containing command ID, operation ID, glyph instance ID, variant ID, expected revision and typed parameter patch. Execute resolve → revision check → type validation → derive geometry → hard constraints → soft diagnostics → atomic commit → revision increment → invalidate derived views. On failure, preserve prior canonical state and revision. Undo/redo replays inverse/forward canonical patches through the same validation path.

## 9. Three.js editor contract

Three.js is the live working surface, not a detached wall preview. Scene objects must map to stable canonical IDs for glyph, component, contour, segment, node, anchor and relationship. Selection and handles resolve those IDs through an adapter.

Interaction:
- drag begins a transient preview;
- preview is derived from a candidate canonical patch;
- release submits one typed command;
- successful validation commits canonical state and rebuilds/updates derived scene objects;
- rejection restores the scene from the last committed state and shows actionable diagnostics;
- one drag = one undoable command;
- camera, zoom, lighting and diagnostic visibility never dirty canonical geometry.

No direct mesh mutation is a persistent edit. If a handle cannot map to a registered typed operation, it is an inspection handle, not an editable control.

## 10. First implementation slices

### Slice 1 — Import and inspect (do first)
- import exact legacy snapshots for A/B/G/R/S;
- create master variant records only;
- create semantic component graph proposals with provisional mappings;
- declare counter/aperture/none topology correctly;
- add stable IDs, provenance and authored-contour maturity;
- run validator and report diagnostics;
- produce neutral monochrome proof output and topology overlay;
- do not auto-correct geometry or expose uncalibrated controls.

### Slice 2 — Minimal calibrated edit loop
- connect registered operations only after calibration evidence exists;
- implement preview/commit/reject/undo/redo;
- derive editable vector geometry from semantic parameter model;
- keep Three.js scene synchronized with canonical commits;
- preserve source snapshot unchanged.

### Slice 3 — Variant authoring
- implement structural variants from the existing registry;
- add topology-changing variants only as separate authored constructions;
- run isolated, pair and word review fixtures;
- update maturity only through explicit human review.

## 11. Test matrix and acceptance criteria

### Per-glyph checks
- A: exactly one protected counter in master; two legs and apex identity; crossbar attachment; narrow/wide stance and high/low crossbar fixtures only when authored.
- B: exactly two distinct protected counters in master; one connected spine/bowl structure; counters remain separate; waist remains valid.
- G: no enclosed counter fabricated; aperture/opening classification is exterior-connected or explicitly unresolved; bar attachment is structural; compare against C and O at thumbnail size.
- R: exactly one protected counter in master; bowl and descending leg remain distinguishable; leg junction remains connected; leg does not invade protected counter clearance.
- S: no enclosed counter in master; one connected contour; no prohibited self-intersection; neck does not collapse; directional upper/lower turns remain identifiable.

### Existing pair fixtures
Use the existing canonical pair list: AV, AR, BA, BR, GO, GR, RA, RO, SA, SB, GS, NS. A fixture containing a provisional glyph is partial coverage, not a full pass. Add per-master stress fixtures from the master spec only as supplemental tests; do not silently replace the canonical list.

### Existing word fixtures
ABRA, BOMB, GHOST, KRAZE, MIND, NYX, RISK, SQUE. Mark coverage partial wherever a non-A/B/G/R/S glyph remains provisional.

### Renderer checks
- A/B/R counters reveal the underlying light, dark and textured surface.
- G aperture reveals the underlying surface and remains open.
- S has no phantom hole.
- Fill, outline, inline, highlights, depth and SVG agree on topology.
- No fixed paper-colour patch is used.
- Compare editor and SVG silhouettes from the same canonical revision.

### Transaction and persistence checks
- stable IDs survive save/load;
- stale expected revision rejects atomically;
- invalid type, identity drift, collapsed counter, closed aperture, disconnected component and self-intersection reject as specified;
- undo/redo restores exact canonical snapshots;
- deterministic regeneration matches for same canonical input, command, seed and engine version;
- rejected preview leaves scene identical to committed state.

### Maturity gate
All five remain `authored-contour` until component graph, topology, metrics and semantic mapping have been reviewed. Do not mark render-reviewed without a human inspection of proof output. Do not mark context-reviewed without pair/word review. No glyph becomes production-approved from schema validation or successful compilation alone.

## 12. Required Claude report

Report imported source hashes, records and stable IDs; component mapping confidence; topology status; diagnostics; tests and pass/fail counts; proof artifacts generated; calibration gaps; interaction/undo/persistence status; maturity unchanged/updated with reviewer evidence; and the exact next slice. Clearly distinguish implemented, partially implemented and deferred work.
