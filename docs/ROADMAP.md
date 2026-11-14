# Roadmap

## 0.6 — Full Alphabet / Glyph Relationships (current prototype)

- A–Z input coverage.
- Five authored contour masters: A, B, G, R, S.
- Twenty-one provisional geometric bases.
- Four style-profile labels.
- Basic word layout, palette/fill options, SVG export and Three.js wall preview.

**Known gaps:** style families are not yet fully distinct construction grammars; joins are mostly decorative bridges/overlaps; no robust contour collision or negative-space analysis exists.

## 0.7 — Authentic Letter Construction

Priority: letter quality before feature breadth.

- Replace provisional glyphs with individually authored, reviewed contour masters.
- Build style-aware alternate constructions for each glyph.
- Define consistent glyph metrics, counters and anchor zones.
- Introduce per-letter selection and editing without losing word-level composition.
- Establish a visual review sheet for A–Z in each style family.

Acceptance criteria:
- Each supported letter reads clearly at thumbnail and full size.
- Bubble, Blockbuster and Straight Letter have recognizably different geometry.
- Wildstyle is treated as a composition grammar, not a decorative overlay.
- Custom/provisional maturity is visible in diagnostics.

## 0.8 — Relationship Solver

- Anchor-based neighbor relationships.
- Controlled overlap and contour collision detection.
- Counter occlusion checks.
- Negative-space analysis from rendered geometry.
- Word silhouette and legibility diagnostics.
- Reversible relationship graph and local manual overrides.

## 0.9 — Blackbook Workflow

- Generate four structurally distinct concepts.
- Per-letter transform and shape editing.
- Layer stack and fill editor.
- Save/load versioned project JSON.
- PNG and SVG export; stable thumbnail generation.

## 1.0 — Game Integration

- Reusable engine API.
- Exportable artwork package for in-game use.
- Three.js scene material integration.
- Game-facing design difficulty/time estimates, calibrated as gameplay parameters.


## Delivery sequence and working tickets

### 0.7A — Glyph inventory and audit
- Inspect the actual 0.6 implementation and enumerate A–Z.
- Record each glyph's contour source, counter handling, metrics and maturity.
- Produce a visual proof sheet and identify the weakest/highest-impact letters.
- Do not call provisional glyphs authored masters.

### 0.7B — Glyph data model
- Define stable glyph IDs and a versioned data schema.
- Define contours, counters, metrics, anchors and style metadata.
- Define authored-master / reviewed-variant / provisional status.
- Add deterministic loading and validation.

### 0.7C — Authored construction set
- Build a coherent initial alphabet subset with real custom contours.
- Test each glyph alone and in multiple word contexts.
- Add style-specific alternate constructions only when the underlying letter remains intentional.
- Expand alphabet coverage based on visual review, not merely checkbox completion.

### 0.7D — Letter editor integration
- Select and edit one glyph at a time.
- Preserve local changes when word-level parameters change.
- Show glyph metrics and anchor zones in a useful edit view.
- Save edits in project data.

### 0.7 release gate
- A–Z maturity is visible and accurate.
- At least one coherent, reviewed construction set exists for the supported first style family.
- Glyphs are tested in words, not only as isolated specimens.
- SVG export matches the editor preview.
- Four generated variants differ in construction/arrangement and can be regenerated from saved seeds.
- Documentation identifies incomplete glyphs and known limitations.

## 0.8–1.0 release discipline

Each milestone should have:
- a short design note before implementation;
- acceptance criteria that can be checked;
- a versioned prototype or tagged release;
- a changelog entry;
- a short test report;
- an explicit list of deferred work.

Do not advance a milestone merely because its UI controls exist. Advance when its underlying system meets the acceptance criteria.


## Parallel workstream — THE BLACKBOOK ARCHIVE

The in-game graffiti lexicon is a separate product workstream. Follow [docs/BLACKBOOK_ARCHIVE_ROADMAP.md](BLACKBOOK_ARCHIVE_ROADMAP.md) and its [masterprompt](BLACKBOOK_ARCHIVE_MASTERPROMPT.md). The research library under `research/` is its editorial source of truth. Do not duplicate the archive roadmap's content milestones here; coordinate shared architecture and generator integration at the relevant main-engine milestones.


## Updated implementation direction — Claude + integrated Three.js

The production generator will be implemented with Claude and integrated Three.js support. Build 0.6 is retained as a reference prototype; do not treat another standalone HTML/JSON-only generator as the end product. The research/specification workstream should produce implementation-ready glyph specifications, semantic geometry/data contracts, interaction requirements, visual reference guidance and regression tests for Claude.

Three.js is part of the real generator interaction/rendering workflow, not merely a separate wall-preview widget. Preserve editable vector geometry and SVG interoperability; use HTML as a possible application shell and JSON as a possible project-data format, not as substitutes for the integrated generator architecture.

### Specification documents

- [Claude Implementation Brief — Generator 0.7](CLAUDE_IMPLEMENTATION_BRIEF_0_7.md)
- [Glyph Review Package — A–Z](../research/GLYPH_REVIEW_PACKAGE_A_Z.md)
- [Style Grammar Specifications 01](../research/STYLE_GRAMMAR_SPECIFICATIONS_01.md)
- [Style Grammar Compatibility & Parameter Contract](../research/STYLE_GRAMMAR_COMPATIBILITY_AND_PARAMETERS.md)

- [Glyph Master Specifications — A, B, G, R, S](../research/GLYPH_MASTER_SPECIFICATIONS_A_B_G_R_S.md)
- [Glyph Data Contract — A–Z](../research/GLYPH_DATA_CONTRACT_A_Z.md)
- [Generator System Responsibility Map](GENERATOR_SYSTEM_RESPONSIBILITIES.md)

### Updated next deliverables
- Master specifications for the five existing authored glyphs A, B, G, R and S.
- A normalized A–Z glyph data contract with explicit maturity/provenance status.
- A clear division of responsibility between glyph construction, composition solving, Three.js rendering/interaction, vector export and project persistence.
- Claude-ready implementation brief and acceptance tests before production generator coding.



### Next research/specification deliverables

- Build visual comparison plates for the five authored glyphs in neutral monochrome and diagnostic modes; do not mark them visually reviewed until inspected.
- Implement the style grammar parameter dependency model and compatibility rules from the four initial grammar specifications.
- Define the first supported combinations of letterform grammar, composition grammar, practice/form context and rendering treatment.
- Expand period- and region-specific references where current evidence remains broad or contested.


## Creative workflow specification — implementation handoff

The complete authoring journey is specified in [Creative Workflow and Style Authoring 01](../research/CREATIVE_WORKFLOW_AND_STYLE_AUTHORING_01.md), with its machine-readable contract at [creative-workflow.v1.json](../contracts/creative-workflow.v1.json). This refines the 0.9 Blackbook Workflow milestone into five slices: (A) four deterministic concepts and branching; (B) word/glyph refinement and persistence; (C) relationship authoring; (D) optional assistance; (E) personal style recipes. The specification does not claim these features are implemented. Keep the existing 0.7 glyph-first and 0.8 relationship validation gates intact.


### Personal Style Engine specification

See [Personal Style Engine 01](../research/PERSONAL_STYLE_ENGINE_01.md) and [personal-style-engine.v1.json](../contracts/personal-style-engine.v1.json). The recipe library is a later creative-workflow slice, after canonical glyph editing, relationship validation and project persistence are reliable. Implement schema/resolver first, then explicit save/apply preview, glyph-aware compatibility, recipe merge/interpolation and library lifecycle. This is specification work only; no production engine is claimed.


### A–Z style grammar application

See [A–Z Style Grammar Application Matrix 01](../research/A_Z_STYLE_GRAMMAR_APPLICATION_MATRIX_01.md) and [az-style-grammar-application.v1.json](../contracts/az-style-grammar-application.v1.json). Implement the resolver before broad style generation. Connect registered A/B/G/R/S controls first; author and review the remaining 21 glyph masters before claiming full A–Z grammar coverage. Bubble and Straight must differ in monochrome construction; Blockbuster remains multi-axis; Wildstyle is expressed through relationships and word composition. This is a specification, not implemented functionality.


### Procedural variant generator core

See [Procedural Variant Generator Core 01](../research/PROCEDURAL_VARIANT_GENERATOR_CORE_01.md) and [procedural-variant-generator.v1.json](../contracts/procedural-variant-generator.v1.json). Implement in sequence: deterministic seed service; glyph-specific operation planner; validated A/B/G/R/S candidate builder; word/layout candidate builder; structural feature extraction and four-way selection; quality/proof harness. Four concepts must be structurally distinct. Do not claim calibrated diversity or quality scores before reviewed examples exist, and do not weaken hard validity gates to fill the result set.


### Visual calibration and comparative evaluation

See [Visual Calibration and Comparative Evaluation 01](../research/VISUAL_CALIBRATION_AND_COMPARATIVE_EVALUATION_01.md) and [visual-calibration.v1.json](../contracts/visual-calibration.v1.json). This workstream precedes production parameter tuning and diversity-score calibration. Build the proof specimen manifest, reviewer capture, calibration registry, deterministic parameter sweep harness, labelled diversity corpus and release-gate integration. Keep the established visual review rubric and maturity gates; this specification does not constitute visual review or calibration evidence.


### Proof-sheet and test-fixture infrastructure

See [Proof-Sheet and Test-Fixture Infrastructure 01](../research/PROOF_SHEET_AND_TEST_FIXTURE_INFRASTRUCTURE_01.md) and [proof-sheet-fixtures.v1.json](../contracts/proof-sheet-fixtures.v1.json). Implement the fixture registry and immutable run manifest first, then deterministic Three.js/SVG proof rendering, sheet assembly, review capture and calibration/CI integration. Preserve the current authored-contour/provisional distinction and mark incomplete pair/word coverage honestly. Generated sheets are evidence for human review, not automatic approvals.


### Glyph construction pipeline

See [Glyph Construction Pipeline 01](../research/GLYPH_CONSTRUCTION_PIPELINE_01.md) and [glyph-construction-pipeline.v1.json](../contracts/glyph-construction-pipeline.v1.json). Implementation order: canonical schema/registry, exact A/B/G/R/S snapshot import, semantic graph/vector adapters, geometry validator, typed operation/command bus, metrics/anchors, Three.js stable-ID scene adapter, preview/commit/undo/redo, SVG/persistence and proof harness. The first slice is monochrome, editable and topology-valid; effects and extrusion are explicitly downstream.
