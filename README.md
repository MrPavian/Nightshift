# NIGHTSHIFT ART ENGINE

A procedural graffiti lettering and blackbook composition tool, developed as a stylized, historically informed creative system.

## Project direction

NIGHTSHIFT is not intended to be a generic text-to-graffiti filter. Its core is a **letter-construction engine**: individual glyph geometry, style-specific construction rules, word-level relationships, fill treatments, and a blackbook workflow.

The wider game concept is a grounded New York graffiti crew simulator. The editor is the central creative system. The game also includes **THE BLACKBOOK ARCHIVE**, a visual, interactive, in-game graffiti knowledge library.

## Current development status

**Production code: 0.7A in progress** — canonical glyph registry with an exact, hash-verified import of the v0.6 glyphs semantic component overlays for A/B/G/R/S a geometry/topology validator and a topology-correct monochrome SVG/Three.js renderer (tickets T01–T05 done). See [docs/IMPLEMENTATION_PLAN_0_7A.md](docs/IMPLEMENTATION_PLAN_0_7A.md). Run `npm install` once (Three.js), then `npm test` (Node ≥ 20) and `npm run test:browser` (headless Chrome).

**Latest prototype (legacy reference): Build 0.6 — Full Alphabet / Glyph Relationships**

- A–Z glyph addressing is available.
- Five hand-authored contour masters exist: A, B, G, R, S.
- The other 21 letters are provisional geometric bases, not production-quality custom glyphs.
- Four style profiles are selectable: Bubble / Throw-up, Blockbuster, Straight Letters, Wildstyle study.
- Word overlap, rhythm, slant, palette and fill treatments are adjustable.
- SVG export, local blackbook archive and a Three.js wall preview are included in the prototype.

Important limitation: current "letter joins" are still largely decorative bridges and layout overlaps. They are not yet robust shared contours or semantic connection geometry. Diagnostic numbers are heuristic gameplay estimates, not artistic quality scores.

## Design principles

1. **Letter first.** Strong, readable, individually designed glyphs take priority over effects and UI controls.
2. **Historical grounding.** Styles should be informed by real graffiti history and stylistic development, not flattened into arbitrary presets.
3. **Distinct style grammars.** Bubble, Blockbuster, Straight Letter and Wildstyle must differ in construction logic, not merely color, skew or decoration.
4. **Word-level composition.** The engine should analyze rhythm, spacing, negative space, overlaps and silhouette across the whole word.
5. **Hybrid graphics architecture.** SVG/vector geometry is the source of truth; Three.js handles spatial presentation, wall surfaces, lighting and scene integration.
6. **Honest diagnostics.** Report actual geometry relationships separately from heuristic complexity or sketch-time estimates.
7. **One knowledge base.** The `research/` library is the editorial source of truth; THE BLACKBOOK ARCHIVE is its in-game presentation, not a separately maintained encyclopedia.

## Roadmap

- **0.7 — Authentic Letter Construction:** replace provisional glyphs with authored, style-aware contours; define glyph metrics and real connection anchors.
- **0.8 — Relationship Solver:** build overlap/connection candidates, negative-space checks, collision handling and legibility scoring.
- **0.9 — Blackbook Workflow:** sketch variants, per-letter editing, layer controls, save/load and export refinement.
- **1.0 — Engine Integration:** reusable API/data model for the New York graffiti crew simulator.
- **THE BLACKBOOK ARCHIVE 0.1–1.0:** research library, content pilot, versioned data pipeline, interactive archive, visual learning, generator bridge and in-game release.

## Project documentation

New contributors and AI agents should start with [AGENTS.md](AGENTS.md) and [docs/AI_HANDOFF.md](docs/AI_HANDOFF.md).

- [Project Brief](docs/PROJECT_BRIEF.md)
- [Main Roadmap](docs/ROADMAP.md)
- [Blackbook Archive Masterprompt](docs/BLACKBOOK_ARCHIVE_MASTERPROMPT.md)
- [Blackbook Archive Roadmap](docs/BLACKBOOK_ARCHIVE_ROADMAP.md)
- [Architecture](docs/ARCHITECTURE.md)
- [Style Taxonomy & Research Framework](docs/STYLE_TAXONOMY.md)
- [Decision Log](docs/DECISIONS.md)
- [Contributing](CONTRIBUTING.md)
- [Changelog](docs/CHANGELOG.md)

## Research library

The source-backed research library and its first cross-linked deep synthesis are committed under [`research/`](research/README.md): NYC history, lettering styles, practices/formats, writers and crews, visual-reference records, and glyph-construction implications. Entries are provisional where the source base is not yet deep enough; see the research README for evidence labels and editorial rules.

## Prototype

The runnable 0.6 prototype is committed at [`prototypes/nightshift_art_engine_v06.html`](prototypes/nightshift_art_engine_v06.html). Open it locally in a modern browser with internet access (Three.js is loaded from jsDelivr). Future builds should be added as new versioned files rather than silently overwriting prior prototypes.
