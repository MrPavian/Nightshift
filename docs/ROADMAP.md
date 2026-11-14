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
