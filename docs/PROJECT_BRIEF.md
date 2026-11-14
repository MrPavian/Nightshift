# Project Brief — NIGHTSHIFT ART ENGINE

## 1. One-sentence description

NIGHTSHIFT is a procedural graffiti lettering and blackbook composition engine for a grounded New York graffiti crew simulator, with vector-first letter construction and Three.js scene presentation.

## 2. Product vision

The central creative activity is making a piece feel authored. A player enters a word, explores a family of letter constructions, edits individual glyphs, shapes the relationships between letters, chooses fills and details, and saves the result in a blackbook.

The generator should produce four meaningfully different starting concepts. These are not four random recolors: each should explore a different structural interpretation of the same word within the selected style language.

The editor should feel like a digital blackbook and lettering workbench, not a generic design dashboard.

## 3. Wider game context

- Setting: New York City, presented with grounded environmental detail.
- Perspective: isometric for the wider simulator.
- Player fantasy: develop a writer identity, work alone or with a crew, plan creative projects, manage time and risk, and document completed work.
- NIGHTSHIFT ART ENGINE is the core artwork-creation subsystem and should eventually be reusable by the game.
- The game may represent different graffiti practices and contexts. The art engine should not assume every activity is a large multi-colour wall piece.

## 4. Core creative workflow

1. Enter a word/name.
2. Select a style family and a historically informed style direction.
3. Generate four structural concepts.
4. Select one concept.
5. Adjust word-level composition: width, height, rhythm, spacing, slant and overlap.
6. Select individual letters and refine their construction.
7. Work with fill, outline, inline, depth, highlights, extensions and optional character elements.
8. Review the complete composition and its diagnostics.
9. Save to the blackbook.
10. Export as SVG/PNG and later send the artwork to a game scene.

## 5. Product principles

### Letter first
A strong letter skeleton is more important than a complex palette or a pile of arrows, highlights and extensions.

### Historical grounding
Style families must be informed by documented graffiti practice and stylistic development. The engine should make meaningful distinctions between tags, throw-ups, pieces, burners, wildstyle, blockbuster lettering, characters, stencils and other forms. These are not interchangeable presets.

### Originality
Generate original letter constructions from broad structural rules. Do not reproduce an identifiable artist's signature or a specific artwork.

### Readability as a design variable
Some styles intentionally reduce immediate readability. The engine should expose that as a spectrum and explain trade-offs rather than treating all illegibility as failure.

### Honest diagnostics
Distinguish measured geometry from heuristic estimates. A decorative arrow is not a letter connection. A difficulty estimate is a gameplay model, not an artistic quality score.

## 6. Current implementation baseline

Latest documented prototype: **Build 0.6 — Full Alphabet / Glyph Relationships**.

Implemented in the standalone HTML prototype:

- A–Z input addressing.
- Five authored contour masters: A, B, G, R and S.
- Twenty-one provisional geometric bases.
- Four early style-profile options.
- Basic word-level spacing, overlap, rhythm and slant controls.
- Fill treatments, layer toggles and SVG export.
- Local blackbook archive using browser storage.
- Three.js wall preview.

Not yet production-ready:

- The 21 provisional glyphs are not bespoke, reviewed letter designs.
- The four style profiles are early profiles, not complete historical grammars.
- Letter bridges are largely decorative; there is no robust contour relationship solver.
- No production-grade contour collision, counter occlusion or negative-space analysis.
- Diagnostics and sketch-time values are heuristic.
- Persistence is local to the browser and not yet a versioned portable project format.

The latest prototype is `prototypes/nightshift_art_engine_v06.html`.

## 7. Intended technical direction

- Browser-first development.
- SVG/vector contours are canonical editable geometry.
- Three.js is used for 3D presentation, scene lighting, walls, camera and material integration.
- Keep geometry generation independent from the Three.js scene.
- Use deterministic seeds so a concept can be recreated.
- Introduce a versioned JSON project format before deep game integration.

Do not assume a framework, build pipeline or automated test suite exists. Inspect the repository first.

## 8. Current priority

**Build 0.7 — Authentic Letter Construction.**

The immediate goal is to replace generic/provisional glyph shapes with individually considered, style-aware letter constructions. Do not jump ahead to advanced 3D effects or a large feature expansion before the alphabet has a convincing foundation.

## 9. Success criteria

A successful NIGHTSHIFT concept should:

- Have a recognizable and intentional letter skeleton.
- Show coherent proportions and rhythm across the word.
- Use counters and negative space deliberately.
- Have a style identity visible in geometry, not only decoration.
- Offer four structurally distinct variants.
- Remain editable letter by letter.
- Export faithfully to SVG.
- Be reproducible from its saved project data and seed.
