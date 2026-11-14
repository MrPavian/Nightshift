# Architecture — NIGHTSHIFT ART ENGINE

## Core pipeline

The semantic/vector project model is canonical. Three.js is the live editor surface and spatial renderer; it does not own persistent geometry. SVG is an interchange/export representation, not the sole semantic source of truth.

`Project Input → Canonical Semantic/Vector Model ↔ Three.js Editor Interaction → Typed Commands → Validation → Composition/Relationship Solver → Derived Rendering → SVG Interchange / Spatial Presentation`

### 1. Glyph data

A glyph should be represented as structured vector geometry, not as a font character alone.

Target data shape (conceptual):

- `id`: stable glyph identifier (A–Z, numerals, punctuation later)
- `contours`: closed outer contours and explicit counter contours
- `metrics`: advance width, cap height, baseline, side bearings
- `anchors`: entry, exit, top, bottom, overlap and connection zones
- `styleGrammars`: compatible letterform and composition grammar axes
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

### 4. Editing, rendering and interchange

- **Canonical semantic/vector model:** authoritative source for glyph components, editable contours, topology, metrics, anchors, variants, style parameters and composition relationships.
- **Three.js:** integrated live editor viewport and spatial presentation. It supports selection, handles, previews, scene context and wall composition. All edits submit typed commands against stable canonical IDs; scene objects and meshes are derived views, never the persistent source of truth.
- **SVG:** scalable interchange and export representation. It must faithfully represent supported vector geometry; semantic metadata may require a versioned sidecar. SVG import/export must report unsupported semantics rather than silently flattening or losing them.
- **Derived rendering:** meshes, textures, thumbnails, overlays and proof sheets are regenerated from canonical state.
- **Separation:** canonical geometry remains independent of transient camera, lighting and scene objects, while the Three.js viewport remains the actual interactive editor—not a detached preview.

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


## Updated implementation direction — Claude + integrated Three.js

The production generator is planned for implementation with Claude. The existing 0.6 standalone HTML file is a reference prototype and audit target, not the architecture to extend indefinitely.

Three.js is to be integrated into the actual generator workflow: interactive composition, scene-aware rendering and spatial presentation should be part of the same product rather than a separate decorative preview panel. Keep the glyph/letter construction model independent of transient scene state so geometry can be edited, tested and exported reliably.

The project still needs editable vector geometry and SVG interoperability. HTML may provide the browser application shell; JSON may carry versioned project data, seeds, glyph variants and relationship graphs. Neither HTML nor JSON alone defines the generator architecture. The implementation brief for Claude should specify the responsibilities and interfaces between:

1. **Glyph/construction model:** semantic parts, contours, counters, junctions, anchors and constraints.
2. **Composition engine:** word layout, pair relationships, overlap, negative-space and legibility checks.
3. **Three.js interaction/rendering:** live composition view, spatial preview, materials, lighting, camera and scene integration.
4. **Vector interchange:** editable geometry and faithful SVG export/import where supported.
5. **Project persistence:** versioned, reproducible project data and stable assets.

Do not assume that Three.js replaces the need for a semantic glyph model or reliable vector export. Equally, do not reduce Three.js to a texture preview detached from the composition editor.


## Editor UX and tutorial

The editor uses progressive disclosure with unrestricted feature availability. Quick lettering is the approachable default; Shape, Connect and precision authoring expose deeper control. Blackbook, Studio and Wall are views over one canonical project. An optional Guided/Adaptive/Off tutorial follows creative milestones but never gates tools. Compact/Full controls visibility is an independent setting. See `research/THREEJS_EDITOR_INTERACTION_AND_UX_01.md` and `research/EDITOR_WORKSPACE_LAYOUT_01.md`.
