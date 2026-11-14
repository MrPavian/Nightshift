# Claude Implementation Brief — NIGHTSHIFT Generator 0.7

**Audience:** Claude coding agent  
**Owner direction:** Implement the production generator with Three.js integrated into the actual editor workflow.  
**Specification baseline:** Build 0.6 is a legacy/reference prototype, not production architecture.  
**Implementation status:** Not implemented by this document. This is the handoff brief and acceptance contract.

## 1. Mission

Build the first production slice of the NIGHTSHIFT procedural graffiti lettering / blackbook editor. Prioritize authentic, editable glyph construction and reliable vector topology before effects or feature breadth.

The editor must support a real interactive workflow in which the user selects and edits letters in a Three.js-powered viewport. Three.js is not merely a detached wall preview. The canonical semantic/vector model remains authoritative, and every editor change must commit through model operations.

## 2. Read before coding

Read and follow:
- `AGENTS.md`
- `docs/PROJECT_BRIEF.md`
- `docs/ARCHITECTURE.md`
- `docs/DECISIONS.md`
- `docs/ROADMAP.md`
- `docs/GENERATOR_SYSTEM_RESPONSIBILITIES.md`
- `research/GLYPH_CONSTRUCTION_LIBRARY.md`
- `research/GLYPH_MASTER_AUDIT_V06.md`
- `research/GLYPH_MASTER_SPECIFICATIONS_A_B_G_R_S.md`
- `research/GLYPH_DATA_CONTRACT_A_Z.md`
- `research/ALPHABET_TEST_MATRIX_AND_GLYPH_VARIANTS.md`
- `research/LETTER_PAIR_CONNECTIONS_AND_WORD_FLOW.md`
- `research/HANDSTYLE_GESTURE_AND_MOTOR_DYNAMICS.md`
- `research/STYLE_GRAMMAR_SPECIFICATIONS_01.md`
- `research/STYLE_GRAMMAR_COMPATIBILITY_AND_PARAMETERS.md`
- `research/VISUAL_REFERENCE_DATABASE.md`
- `research/VISUAL_CONSTRUCTION_BRIEF_01.md`
- `research/GLYPH_VISUAL_REVIEW_PROTOCOL_01.md`
- `research/MASTER_GLYPH_VARIANT_MATRIX_01.md`
- `research/GLYPH_PARAMETER_DEPENDENCY_CONTRACT_01.md`
- `contracts/glyph-parameter-contract.v1.json`
- `research/GLYPH_GEOMETRY_VALIDATION_CONTRACT_01.md`
- `contracts/glyph-geometry-validation.v1.json`
- `research/RELATIONSHIP_SOLVER_AND_WORD_COMPOSITION_01.md`
- `contracts/relationship-solver.v1.json`
- `research/THREEJS_EDITOR_INTERACTION_AND_UX_01.md`
- `research/EDITOR_WORKSPACE_LAYOUT_01.md`
- `contracts/editor-interaction.v1.json`
- `research/CREATIVE_WORKFLOW_AND_STYLE_AUTHORING_01.md`
- `contracts/creative-workflow.v1.json`
- `research/PERSONAL_STYLE_ENGINE_01.md`
- `contracts/personal-style-engine.v1.json`
- `research/A_Z_STYLE_GRAMMAR_APPLICATION_MATRIX_01.md`
- `contracts/az-style-grammar-application.v1.json`
- `research/PROCEDURAL_VARIANT_GENERATOR_CORE_01.md`
- `contracts/procedural-variant-generator.v1.json`
- `research/VISUAL_CALIBRATION_AND_COMPARATIVE_EVALUATION_01.md`
- `contracts/visual-calibration.v1.json`
- `research/PROOF_SHEET_AND_TEST_FIXTURE_INFRASTRUCTURE_01.md`
- `contracts/proof-sheet-fixtures.v1.json`
- `research/GLYPH_CONSTRUCTION_PIPELINE_01.md`
- `contracts/glyph-construction-pipeline.v1.json`

If any source is missing or conflicts with this brief, report the conflict and preserve explicit owner decisions. Do not invent missing content.

## 3. Visual construction and review requirements

Before implementing composition and style expansion, follow `research/VISUAL_CONSTRUCTION_BRIEF_01.md`. It defines the evidence-led construction layers, grammar-specific visual criteria, Three.js editor requirements, six deterministic proof-sheet families and acceptance criteria. Consult `research/VISUAL_REFERENCE_DATABASE.md` for provenance and rights status. Do not bundle or trace archival images without item-level permission. The visual brief, glyph review protocol and master glyph variant matrix are design specifications, not evidence that these features are implemented. Use the variant matrix to implement only Slice 1 and the minimal Slice 2 controls first; preserve master snapshots, calibrate bounds from reviewed geometry, and keep topology-changing variants separately named. Apply the staged review gates and 0–3 human rubric from `research/GLYPH_VISUAL_REVIEW_PROTOCOL_01.md`. Do not promote glyph maturity without recorded proof-sheet review; identity or topology failure blocks approval.

## 3.1 Typed parameter operations and Three.js command contract

Use `contracts/glyph-parameter-contract.v1.json` as the machine-readable registry and `research/GLYPH_PARAMETER_DEPENDENCY_CONTRACT_01.md` for its execution semantics. Implement registered operation IDs rather than generic untyped property mutation. Every command carries stable command/operation/glyph-instance/variant IDs and an expected model revision. Validate a candidate canonical model and commit atomically; on failure preserve the prior model and revision. Undo/redo must replay canonical patches through the same validator.

Three.js handles bind to stable semantic component/anchor IDs. Dragging may preview a candidate, but pointer release submits one typed model command. Never persist direct mesh-vertex or scene-object mutations as canonical edits. Regenerate meshes, SVG and diagnostics from committed canonical state. Apply each operation's declared invalidation classes and validation rules.

Do not invent production numeric bounds, defaults or slider steps. Keep numeric controls uncalibrated until bounds are measured from authored geometry and reviewed fixtures. Do not silently clamp. Topology changes require a separately named authored variant and topology review; they are not continuous slider operations. Keep hard identity/topology/geometry/anchor constraints separate from soft style and word-rhythm diagnostics.

## 3.2 Geometry and topology validator contract

Use `contracts/glyph-geometry-validation.v1.json` as the machine-readable validator profile and `research/GLYPH_GEOMETRY_VALIDATION_CONTRACT_01.md` for its rationale and acceptance requirements. Validate candidate canonical geometry before committing a model command. The ordered pipeline covers schema/reference integrity, curve normalization, degeneracy, intersections, planar topology, negative-space classification, clearance, anchors, glyph identity and derived-render consistency.

Keep counters, apertures and channels distinct: counters are enclosed bounded faces; apertures remain connected to exterior space; channels are corridors and must not be implicitly classified as counters. Curve approximation must be adaptive and carry an error bound. A hard clearance pass requires the measured distance minus its error bound to meet a calibrated threshold. Thresholds are per glyph/variant/feature/context; do not invent global values. Uncalibrated required thresholds block production approval.

Reject undeclared self-intersections/crossings and invalid topology atomically. Do not silently repair geometry, discard fragments or convert topology. Diagnostics must include stable codes, affected IDs, measured values, thresholds, error bounds and calibration status. Automated validation does not replace the visual proof-sheet review gate.

## 3.3 Relationship solver and word composition contract

Use `contracts/relationship-solver.v1.json` as the machine-readable relationship registry and `research/RELATIONSHIP_SOLVER_AND_WORD_COMPOSITION_01.md` as its implementation specification. Generate pair candidates from stable anchor metadata and context; do not rely on a hardcoded 26×26 pair matrix. Store relationship type separately from its geometric realization. Deliberate open separation is a valid outcome.

Implement in stages: Phase 1 open separation, near-touch and terminal-to-terminal; Phase 2 bar continuation, overlap and separate extension bridges; Phase 3 shared strokes and interlocks only after topology validation and visual review. A decorative bridge is never a structural join. Overlap/interlock requires explicit occlusion order. Every accepted edge has stable IDs and a validation report.

Pair candidates must pass local hard gates and then be rechecked in whole-word context for non-adjacent collisions, counter/aperture occlusion, channel bottlenecks and contradictory layer order. Keep hard topology/identity checks separate from soft rhythm/flow/silhouette metrics. Three.js interaction previews candidates but commits only typed relationship commands to the canonical composition graph. Persist user overrides and revalidate them after dependent edits.

## 3.4 Progressive editor interaction and UX

Follow `research/THREEJS_EDITOR_INTERACTION_AND_UX_01.md` and `contracts/editor-interaction.v1.json`. The product requirement is easy entry with an open-ended creative ceiling: do not bury beginners in controls, but do not arbitrarily gate advanced authoring. Implement Quick lettering first, then contextual Shape and Connect modes, and finally precision/advanced authoring. Blackbook, Studio and Wall are views over one canonical project, not separate editors. Selection, handles, diagnostics, history and scene objects must resolve to stable canonical IDs. A drag is a preview followed by one typed, atomically validated command; rejected edits restore the committed scene. Undo/redo replays canonical commands. Camera and overlay changes do not dirty glyph geometry. Essential workflows must work without hover and have touch-friendly alternatives. The interaction contract contains the required event envelopes and interaction fixtures. The tutorial is a non-blocking companion with Guided, Adaptive and Off modes; tool layout is an independent Compact/Full setting. All features are available from first launch, lessons are skippable/replayable, and tutorial state never changes canonical artwork or geometry. These are specifications, not implemented features. Follow `research/EDITOR_WORKSPACE_LAYOUT_01.md` for the responsive workspace hierarchy: dominant Three.js viewport, stable left tool rail, selection-aware inspector, optional history strip, and Compact/Full presentation modes. Compact and Full must expose identical capabilities. Tablet layouts must preserve core actions without hover or obstructing the active edit target.


## 3.5 End-to-end creative workflow

Follow `research/CREATIVE_WORKFLOW_AND_STYLE_AUTHORING_01.md` and `contracts/creative-workflow.v1.json`. Generate exactly four deterministic, structurally distinct concepts; palette/effect-only variation does not satisfy D-006. Keep generated concepts immutable and branch the selected concept for editing. Support isolated glyph refinement, contextual relationship suggestions and whole-word revalidation. Assistance is optional (Off/Suggest/Preview); no silent auto-apply may overwrite a user decision. A personal style library stores versioned reusable recipes and resolved parameter snapshots, not flattened artwork. Keep rendering preferences separate from construction grammar. Do not clone named writers' signatures or exact protected works. Implement in the staged sequence in the workflow specification and report each acceptance fixture independently.


## 3.6 Personal Style Engine and reusable recipes

Follow `research/PERSONAL_STYLE_ENGINE_01.md` and `contracts/personal-style-engine.v1.json`. A style recipe is a versioned set of construction/composition rules and preferences, not a visual filter or flattened artwork. Preserve independent grammar axes and registered parameter ownership. Resolve values deterministically using the documented precedence stack; hard glyph identity and topology invariants cannot be overridden. Recipe merge creates a new draft with a conflict report; numeric interpolation is allowed only where the parameter registry explicitly supports it. Applying a recipe creates a preview branch and requires user acceptance. Capture from artwork is explicit and reviewable; no hidden preference learning or silent recipe mutation. Store recipe version, provenance and resolved values in project snapshots. Do not imitate named writers' signatures or exact protected works.


## 3.7 A–Z grammar application

Use `research/A_Z_STYLE_GRAMMAR_APPLICATION_MATRIX_01.md` and `contracts/az-style-grammar-application.v1.json` to resolve grammar behavior per glyph. Do not apply one global distortion to the alphabet. The matrix maps the existing neutral structural checklist to candidate Bubble, Straight/Block and Wildstyle composition behavior; it does not claim that all variants exist. Preserve the taxonomy: Bubble/Straight are letterform grammars, Blockbuster combines straight/block construction with context/coverage, and Wildstyle Study is primarily a composition/relationship grammar. Keep the 21 provisional glyphs visibly provisional; first connect reviewed A/B/G/R/S controls, then author and review remaining masters. Rendering never substitutes for construction differences.


## 3.8 Procedural variant generator core

Follow `research/PROCEDURAL_VARIANT_GENERATOR_CORE_01.md` and `contracts/procedural-variant-generator.v1.json`. Treat generation as deterministic constrained candidate search, not random distortion. Use a versioned seeded PRNG with isolated named streams; never use ambient randomness. Build glyph-specific operation plans from the A–Z matrix and registered operation contracts. Validate glyphs, relationships and whole-word geometry before candidate ranking. Keep quality as separate dimensions with hard gates; do not use an opaque single score. D-006 requires four structurally distinct concepts, but do not force four by duplicating outputs or silently relaxing thresholds: if the candidate pool cannot meet calibrated gates, report generation exhaustion. Diversity weights, thresholds and parameter ranges require reviewed calibration data.


## 3.9 Visual calibration and comparative evaluation

Follow `research/VISUAL_CALIBRATION_AND_COMPARATIVE_EVALUATION_01.md` and `contracts/visual-calibration.v1.json`, alongside—not instead of—the existing `GLYPH_VISUAL_REVIEW_PROTOCOL_01.md`. Calibrate each parameter and geometry threshold at its narrowest defensible scope. Use controlled, reproducible comparison plates with fixed render conditions and declared factors. Preserve individual human ratings and disagreement; identity/topology score 0 requires explicit defect review. Production parameter bounds and thresholds require approved calibration records with evidence and boundary regression fixtures. Do not expose invented numeric ranges or auto-approve from score averages.


## 3.10 Proof-sheet and test-fixture infrastructure

Follow `research/PROOF_SHEET_AND_TEST_FIXTURE_INFRASTRUCTURE_01.md` and `contracts/proof-sheet-fixtures.v1.json`. Build immutable proof runs over canonical project snapshots; record source revision, engine versions, seeds, operations, resolved parameters, render conditions, validation reports and artifact hashes. Use the existing A–Z, pair and word inventories without changing maturity. Label fixtures involving provisional glyphs as partial coverage. Generate neutral monochrome structure plates before finish plates. Automated rendering must never advance human-review maturity; preserve the existing rubric and explicit reviewer decisions.


## 3.11 Glyph construction pipeline

Implement `research/GLYPH_CONSTRUCTION_PIPELINE_01.md` and `contracts/glyph-construction-pipeline.v1.json` as the end-to-end stage contract. Preserve the canonical semantic graph and editable vector geometry; Three.js meshes are derived and all edits return through typed commands and validation. Do not infer stroke order from closed contours. First import/preserve exact A/B/G/R/S legacy snapshots, declare semantic topology, then implement only the minimal registered edits after calibration. The first visible milestone is a valid monochrome editable A/B/G/R/S set in the live Three.js editor—not extrusion or effects.

## 4. Current-state facts

Build 0.6 is a standalone HTML prototype with:
- A–Z input addressing;
- custom path records for A, B, G, R, S;
- 21 provisional path-string bases;
- four early style-profile options;
- basic word-level transforms and decorative bridges;
- fill/layer controls and SVG export;
- localStorage archive;
- a Three.js wall preview that displays an SVG-derived canvas texture.

Important source-level findings:
- A, B and R have explicit inner path arrays (1, 2 and 1 respectively).
- G and S have empty inner path arrays.
- G's opening/internal bar logic is encoded in its single closed outer contour.
- S is a single closed outer contour with no declared counter.
- Fill/depth combine path data; outline/inline/highlight draw the outer path only.
- Explicit counters are painted with fixed paper colour `#eee9dc`, not transparent negative space.
- “Active joins” is a heuristic count; bridge curves are decorative, not validated contour joins.
- Style presets do not implement complete semantic construction grammars.
- Remix changes seed using unseeded `Math.random()`.
- No semantic component graph, explicit anchors or calibrated per-glyph metrics exist.

These facts are code inspection observations. They are not visual quality certification.

## 5. Architecture constraints

### Canonical state
Canonical project state consists of:
- semantic glyph graph;
- editable vector geometry and topology;
- glyph metrics and anchors;
- glyph/variant identity and maturity;
- style grammar parameters;
- composition relationship graph;
- project settings, transforms and deterministic seed state.

### Derived state
Derived from canonical state:
- Three.js meshes and render objects;
- SVG output;
- textures and thumbnails;
- diagnostic overlays;
- proof sheets.

### Three.js role
Three.js must power the actual live editor viewport:
- select glyphs/components;
- show editable bounds, anchors and handles;
- support meaningful transforms/structural edits;
- show live composition and surface context;
- send edits to the canonical model through stable-ID edit commands;
- refresh from committed model state.

Do not implement a 2D editor plus a separate decorative 3D pane and call that integrated Three.js editing.

### Vector role
Keep geometry editable and independent of transient scene state. SVG export must match the editor composition. Counters and apertures must expose the underlying surface; never fake negative space by painting a background colour.

### Versioning
Keep v0.6 unchanged as a legacy reference. Do not overwrite it. Any new prototype or implementation branch must be versioned and documented.

## 6. Non-goals for the first slice

Do not prioritize:
- advanced chrome, drips, particles or surface weathering;
- full 3D sculpting of every vertex;
- cloud sync or collaboration;
- complete historically exhaustive A–Z style coverage;
- automatic historical authenticity claims;
- a polished archive/marketing UI before glyph editing works.

## 7. Implementation phases

### Phase 0 — Repository and implementation plan

Tasks:
- Inspect repository and current file layout.
- Confirm available runtime/build/test setup; do not assume a framework or test runner.
- Propose module boundaries and dependency choices.
- Record technical decisions before adding significant dependencies.
- Preserve v0.6 as immutable reference.

Exit criteria:
- Implementation plan identifies modules, tests, migration and known risks.
- No architecture conflict with D-009.
- Dependency additions are justified and documented.

### Phase 1 — Canonical glyph model and registry

Implement:
- stable A–Z glyph IDs;
- schema version;
- semantic component graph;
- vector segment/contour model;
- explicit counter/aperture/channel records;
- metrics with calibrated/un-calibrated status;
- anchors with direction and clearance;
- maturity/provenance/review records;
- deterministic variant metadata.

Import the v0.6 paths as legacy reference geometry:
- A/B/R inner paths become provisional counter records;
- G opening is represented as aperture/terminal logic pending semantic review;
- S is represented as a continuous contour with no counter;
- remaining 21 letters remain provisional.

Do not promote legacy paths to semantic-reviewed or render-reviewed.

Exit criteria:
- A–Z registry loads and validates.
- All five legacy custom records are represented without flattening G/S into false counter assumptions.
- Stable IDs survive save/load.
- Validation reports structured errors and warnings.

### Phase 2 — Vector topology and geometry validator

Implement:
- editable path segments;
- contour closure and winding handling;
- fill-rule normalization;
- counter/aperture topology;
- self-intersection checks where supported;
- bounds, area and clearance measurements;
- stable geometry hashing;
- diagnostic issue reporting.

All render layers must consume the same validated topology.

Exit criteria:
- Counter transparency works on light, dark and textured surfaces.
- Fill, outline, inline, highlights and depth agree on counter boundaries.
- No paper-colour patches remain.
- Geometry validation has unit tests for valid/invalid contour fixtures.

### Phase 3 — First end-to-end authored glyph workflow

Start with A, B, G, R and S, not the full alphabet expansion.

Implement:
- semantic inspector for components, counters/apertures, anchors and metrics;
- glyph selection and variant selection;
- edit one component or vector segment;
- validate after edit;
- undo/redo;
- save/reload;
- proof-sheet output.

The owner-provided master specification describes current structure and review requirements. Treat proposed semantic segmentation and anchors as candidates that need explicit review, not facts.

Exit criteria:
- At least one glyph can be edited semantically and geometrically end-to-end.
- A/B/G/R/S show explicit topology and maturity status.
- Undo/redo and save/reload preserve canonical model state.
- A proof sheet can be generated for human review.

### Phase 4 — Integrated Three.js editor surface

Implement:
- main live editor viewport using Three.js;
- glyph and component selection by stable IDs;
- handles for supported transforms/edits;
- diagnostic overlays for bounds, anchors, counters and collisions;
- surface/material context;
- command-based edit pipeline;
- scene update from committed canonical state.

Camera, zoom and lighting are view state; they must not modify canonical glyph geometry.

Exit criteria:
- The user can select a glyph/component in the Three.js viewport.
- An edit submits a model command and updates canonical vector geometry.
- Rejected edits do not leave scene and model inconsistent.
- Scene objects map back to stable model IDs.
- The editor viewport is the real working surface, not only a preview.

### Phase 5 — Word composition and relationship solver

Implement in dependency order:
1. metrics-based word layout;
2. anchor candidate generation;
3. relationship graph;
4. overlap and contour collision;
5. counter/aperture occlusion;
6. negative-space channel diagnostics;
7. reversible manual overrides;
8. word silhouette and legibility diagnostics.

Do not count decorative bridges as joins. A join requires a declared, validated geometric/anchor relationship.

Exit criteria:
- Pair and word tests produce measured diagnostics.
- Manual overrides survive regeneration and reload.
- Counter occlusion is detected.
- Join count reflects accepted relationships only.

### Phase 6 — SVG interchange and project persistence

Implement:
- editable SVG export;
- SVG import where supported;
- metadata/sidecar strategy for semantic data;
- versioned project serialization;
- deterministic seeds and generator version;
- migration and compatibility warnings;
- stable thumbnails and export snapshots.

Exit criteria:
- SVG matches the editor viewport's vector composition.
- Import/export round-trip preserves supported editable geometry.
- Unsupported semantics produce explicit warnings, not silent loss.
- Same saved project + generator version + seed reproduces canonical geometry.

### Phase 7 — Alphabet expansion and style grammars

Only after the first five glyphs and editor pipeline are reviewed:
- author remaining glyphs individually;
- use the A–Z structural test matrix;
- create style-specific variants as actual construction differences;
- implement the axis-separated grammar model from `research/STYLE_GRAMMAR_SPECIFICATIONS_01.md`; keep letterform, composition, practice/form, surface and rendering treatment independent;
- implement Bubble/Throw-up, Blockbuster, Straight Letter and Wildstyle Study as compatible profiles, not mutually exclusive historical categories;
- test every glyph in pair and word contexts.

Exit criteria:
- maturity is visible for all A–Z glyphs;
- style families differ in construction, not only presentation;
- provisional forms are not mislabeled as authored masters;
- proof sheets and regression results are available.

## 8. Required tests

### Unit tests
- schema validation;
- stable ID uniqueness;
- segment parsing and contour closure;
- counter/aperture distinction;
- fill-rule and winding behavior;
- anchor direction and bounds;
- deterministic PRNG;
- migration of v0.6 paths.

### Geometry tests
- self-intersections;
- minimum clearance;
- contour collisions;
- counter/aperture preservation;
- overlap/occlusion;
- degenerate segments and zero-length edges.

### Rendering tests
- fill;
- outline;
- inline;
- highlights;
- depth;
- light/dark/textured surfaces;
- thumbnail and full-size;
- slant and non-uniform scale.

### Interaction tests
- selection resolves to correct IDs;
- edits become model commands;
- invalid edits are rejected or warned;
- undo/redo restores canonical state;
- camera/lighting changes do not dirty geometry.

### Persistence tests
- save/reload;
- schema migration;
- seed reproducibility;
- project version compatibility;
- no dependence on transient Three.js objects.

### Export tests
- SVG silhouette comparison;
- counter/aperture visibility;
- round-trip editability;
- metadata preservation/loss reporting.

### Regression words
Use the existing test matrix, including:
- ABRA
- BOMB
- GHOST
- KRAZE
- MIND
- NYX
- RISK
- SQUE

Also test pair cases around the five authored masters: AV, AR, BA, BR, GO, GR, RA, RO, SA, SB, GS, NS.

## 9. Required visual proof sheets

Generate repeatable proof sheets containing:
1. each glyph silhouette;
2. semantic component overlay;
3. counters/apertures diagnostic overlay;
4. fill + outline + inline + highlight;
5. depth;
6. light and dark surface;
7. thumbnail scale;
8. pair contexts;
9. word contexts;
10. maturity/provenance and seed metadata.

Do not mark a glyph render-reviewed until a human has inspected the sheet. Record reviewer, date, build, seed and outcome.

## 10. Delivery protocol

For each phase:
- state files/modules created or changed;
- describe key design choices;
- list tests run and exact results;
- attach or reference proof sheets where generated;
- list limitations and deferred tasks;
- update architecture/roadmap/changelog;
- preserve working builds and version history.

Do not report “done” based only on compilation. Test actual behavior.

## 11. Definition of done for first production slice

A user can:
1. open a project with one of the five authored-contour glyphs;
2. select the glyph and one semantic component in the Three.js editor;
3. make a structural edit through a model command;
4. see canonical vector geometry update;
5. receive relevant geometry/topology diagnostics;
6. undo and redo the edit;
7. save and reload the project;
8. export an editable SVG that matches the editor composition;
9. reproduce the same geometry from the saved project version and seed.

If any of these steps is missing, describe the result as a partial prototype, not the production generator.

## 12. Claude completion report format

Return:
- implementation summary;
- modules/files created;
- architecture decisions and dependencies;
- phase exit criteria met/not met;
- automated tests with pass/fail counts;
- visual review status;
- known defects and limitations;
- exact next implementation task.

Do not ask the owner routine questions. Make reasonable implementation choices, document them and proceed. Escalate only genuine product-direction conflicts, unavailable access or high-impact ambiguity that cannot be resolved from the specifications.


## 3.12 A/B/G/R/S construction implementation specification

Use [A/B/G/R/S Glyph Construction Implementation Specification 01](../research/ABGRS_GLYPH_CONSTRUCTION_IMPLEMENTATION_SPEC_01.md) and [abgrs-glyph-construction.v1.json](../contracts/abgrs-glyph-construction.v1.json) as the glyph-specific handoff. Preserve exact v0.6 snapshots; treat component segmentation and anchors as provisional engineering proposals; do not infer gesture order. Import A/B/R counters, G's exterior-connected aperture semantics (or explicitly unresolved interpretation), and S's no-counter state correctly. All render passes and SVG must consume one validated topology; remove fixed paper-colour counter painting. Use only registered operation IDs from the parameter contract, with no invented bounds or silent clamping. Keep all five glyphs at authored-contour until explicit review. Run the listed canonical pair/word fixtures and report partial coverage where other glyphs remain provisional.


## 3.13 Specification integration audit gate

Before implementing G aperture controls, follow [Specification Integration Audit 01](../research/SPECIFICATION_INTEGRATION_AUDIT_01.md). The G master identity describes an intended exterior-connected opening, but the imported v0.6 contour must remain `interpretation-required` until topology analysis establishes it. The `glyph.G.set-aperture-width` operation now requires a classified aperture, validated boundary/measurement construction and approved calibration. Reject canonical commits otherwise. Do not synthesize an aperture polygon or infer it from an empty hole array.


## 3.14 Executable ticket sequence

Use [Claude Ticket Pack 0.7A 01](CLAUDE_TICKET_PACK_0_7A_01.md) to execute the first A/B/G/R/S slice in dependency order. Do not collapse import, topology, renderer and editor interaction into one untestable task. Each ticket has explicit acceptance criteria and a completion report. Read the specification integration audit before implementing G aperture behavior.
