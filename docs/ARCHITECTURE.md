# Architecture — NIGHTSHIFT ART ENGINE

## Core pipeline

`Word Input → Glyph Selection → Style Grammar → Glyph Transform → Relationship Solver → Layer Renderer → SVG → Three.js Presentation`

### 1. Glyph data

A glyph should be represented as structured vector geometry, not as a font character alone.

Target data shape (conceptual):

- `id`: stable glyph identifier (A–Z, numerals, punctuation later)
- `contours`: closed outer contours and explicit counter contours
- `metrics`: advance width, cap height, baseline, side bearings
- `anchors`: entry, exit, top, bottom, overlap and connection zones
- `styleFamily`: supported construction families
- `variants`: alternate authored shapes for the same letter
- `metadata`: source notes, historical references, maturity status

Every glyph must declare whether it is an authored master, reviewed variant, or provisional base. Do not present provisional geometry as finished custom lettering.

### 2. Style grammar

Each style family owns its own construction parameters and constraints.

- **Bubble / Throw-up:** rounded mass, inflated counters, compact rhythm, controlled asymmetry.
- **Blockbuster:** broad modular forms, high legibility, strong shared baseline and compact spacing.
- **Straight Letters:** upright or controlled lean, clear structure, deliberate proportions and restrained extensions.
- **Wildstyle:** interlocking directional structure, layered overlaps, controlled extensions and deliberate legibility trade-offs.

A style profile must change geometry and construction decisions, not just palette, skew, stroke width or decorations.

### 3. Relationship solver

The word-level solver should:

1. measure glyph advance and bounding boxes;
2. propose anchor-to-anchor relationships between neighboring glyphs;
3. test overlap candidates;
4. detect contour collisions and counter occlusion;
5. measure negative-space pockets;
6. evaluate word silhouette and legibility;
7. keep a reversible relationship graph so a user can edit one letter without rebuilding the whole word.

A visual bridge or arrow is decoration; it must not be counted as a true letter connection.

### 4. Rendering

- **SVG:** canonical, scalable source for contours, outlines, fills, highlights and export.
- **Three.js:** scene presentation only—wall geometry, perspective, material response, lighting and camera.
- **Canvas textures:** generated from SVG for real-time Three.js previews.
- **Separation:** editing geometry must not depend on the Three.js scene.

### 5. Persistence

The prototype currently uses browser local storage for its local blackbook archive. A later build should introduce versioned project JSON with:

- project schema version;
- source word and random seed;
- per-glyph IDs and transform parameters;
- relationship graph;
- style grammar and palette;
- layer visibility and fill settings;
- SVG snapshot for stable archival/export.

## Quality gates

- A glyph is not "custom" until its contours and counters have been reviewed.
- A connection is not counted unless geometry or a declared anchor relationship exists.
- Negative-space diagnostics must be derived from actual rendered geometry, not a formula based only on slider values.
- Four generated variants must be structurally distinct, not cosmetic recolors.
- SVG export must preserve the selected design without relying on external runtime state.
