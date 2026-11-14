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

If any source is missing or conflicts with this brief, report the conflict and preserve explicit owner decisions. Do not invent missing content.

## 3. Visual construction and review requirements

Before implementing composition and style expansion, follow `research/VISUAL_CONSTRUCTION_BRIEF_01.md`. It defines the evidence-led construction layers, grammar-specific visual criteria, Three.js editor requirements, six deterministic proof-sheet families and acceptance criteria. Consult `research/VISUAL_REFERENCE_DATABASE.md` for provenance and rights status. Do not bundle or trace archival images without item-level permission. The visual brief and glyph review protocol are design specifications, not evidence that these features are implemented. Apply the staged review gates and 0–3 human rubric from `research/GLYPH_VISUAL_REVIEW_PROTOCOL_01.md`. Do not promote glyph maturity without recorded proof-sheet review; identity or topology failure blocks approval.

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
