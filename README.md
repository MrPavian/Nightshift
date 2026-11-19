# NIGHTSHIFT ART ENGINE

A procedural graffiti lettering and blackbook composition tool, developed as a stylized, historically informed creative system.

## Project direction

NIGHTSHIFT is not intended to be a generic text-to-graffiti filter. It is a **creator-first generative graffiti studio**: users enter a name, describe the desired artwork, compare structurally distinct proposals, then refine or fully author the result. Its core engine combines individual glyph geometry, style-specific construction rules, word-level relationships, finish treatments and a blackbook workflow. The default journey is Name → Creative Brief → Four Proposals → Choose → Refine → Save/Export/Game Artwork.

The wider game concept is a grounded New York graffiti crew simulator. The editor is the central creative system. The game also includes **THE BLACKBOOK ARCHIVE**, a visual, interactive, in-game graffiti knowledge library.

## Current development status

**Production code: 0.7A in progress** — canonical glyph registry with an exact, hash-verified import of the v0.6 glyphs semantic component overlays for A/B/G/R/S a geometry/topology validator a topology-correct monochrome SVG/Three.js renderer, proof sheets with a review package, and a Three.js editor with a validated edit loop (0.7A T01–T07 done). C02 alphabet authoring: C, D, O, P, Q added as authored masters (review pending); all 26 letters validate and render. See [docs/IMPLEMENTATION_PLAN_0_7A.md](docs/IMPLEMENTATION_PLAN_0_7A.md). Run `npm install` once (Three.js), then `npm test` (Node ≥ 20) and `npm run test:browser` (headless Chrome).

**Try it:** open [`review/`](review/index.html) from any static server at the repository root (e.g. `python3 -m http.server`, then `http://localhost:8000/review/`): live A–Z, SVG and Three.js views, word tester, proof sheets and review form; [`editor/`](editor/index.html) lets you drag contour nodes of A/B/G/R/S with validation, undo/redo and save. Live: https://mrpavian.github.io/Nightshift/ Proof sheets: [`docs/reports/proof/T06/plates/`](docs/reports/proof/T06/plates/).

**THE BLACKBOOK ARCHIVE — erste Ausgabe, komplett deutsch (C06):** [`archive/`](archive/index.html) ist ein belegtes Graffiti-Lexikon mit 28 Einträgen. Es deckt das New-York-Fundament ab sowie Philadelphia, Amsterdam, Paris, São Paulo, China, Dortmund/Ruhrgebiet und Hamburg, mit Suche, Zeitleiste, Szenen, fünf Lernpfaden und Belegen auf Aussageebene; es läuft offline. Die Inhalte werden aus `research/archive/de/` erzeugt (`npm run archive:build`, siehe [research/archive/README.md](research/archive/README.md)); eine englische Ausgabe ist nach C07 geplant. Links in Prüfstand und Editor folgen dem [Editor-Bridge-Vertrag](docs/EDITOR_BRIDGE_CONTRACT_01.md). Bericht: [docs/reports/C06_BLACKBOOK_ARCHIVE_REPORT.md](docs/reports/C06_BLACKBOOK_ARCHIVE_REPORT.md).

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

- [Creator-First Product Vision 01](docs/NIGHTSHIFT_CREATOR_FIRST_PRODUCT_VISION_01.md)
- [Claude Ticket C08 — Creator-First Studio](docs/CLAUDE_TICKET_C08_CREATOR_FIRST_STUDIO_01.md)
- [Project Brief](docs/PROJECT_BRIEF.md)
- [Main Roadmap](docs/ROADMAP.md)
- [Blackbook Archive Masterprompt](docs/BLACKBOOK_ARCHIVE_MASTERPROMPT.md)
- [Blackbook Archive Global Editorial Framework](docs/BLACKBOOK_ARCHIVE_GLOBAL_EDITORIAL_FRAMEWORK_01.md)
- [Blackbook Archive Roadmap](docs/BLACKBOOK_ARCHIVE_ROADMAP.md)
- [Blackbook Archive Styleguide 01](docs/BLACKBOOK_ARCHIVE_STYLEGUIDE_01.md)
- [Blackbook Archive Joint Work Order 01](docs/BLACKBOOK_ARCHIVE_JOINT_WORK_ORDER_01.md)
- [Architecture](docs/ARCHITECTURE.md)
- [Style Taxonomy & Research Framework](docs/STYLE_TAXONOMY.md)
- [Decision Log](docs/DECISIONS.md)
- [Contributing](CONTRIBUTING.md)
- [Changelog](docs/CHANGELOG.md)

## Research library

The source-backed research library and its first cross-linked deep synthesis are committed under [`research/`](research/README.md): NYC history, lettering styles, practices/formats, writers and crews, visual-reference records, and glyph-construction implications. Entries are provisional where the source base is not yet deep enough; see the research README for evidence labels and editorial rules.

## Prototype

The runnable 0.6 prototype is committed at [`prototypes/nightshift_art_engine_v06.html`](prototypes/nightshift_art_engine_v06.html). Open it locally in a modern browser with internet access (Three.js is loaded from jsDelivr). Future builds should be added as new versioned files rather than silently overwriting prior prototypes.


## NIGHTSHIFT 1.0 — final delivery plan

The binding finite release target is [Final Roadmap and Joint Work Order 01](docs/FINAL_ROADMAP_AND_WORK_ORDER_01.md). Claude's implementation sequence is [Claude Final Release Ticket Pack 01](docs/CLAUDE_FINAL_RELEASE_TICKET_PACK_01.md). These documents define the 1.0 scope, owners, acceptance gates, stop conditions and project closure. Older milestone descriptions below are historical context where they conflict with the 1.0 plan.
