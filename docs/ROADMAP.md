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
