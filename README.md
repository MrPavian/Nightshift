# NIGHTSHIFT ART ENGINE

A procedural graffiti lettering and blackbook composition tool, developed as a stylized, historically informed creative system.

## Project direction

NIGHTSHIFT is not intended to be a generic text-to-graffiti filter. Its core is a **letter-construction engine**: individual glyph geometry, style-specific construction rules, word-level relationships, fill treatments, and a blackbook workflow.

The visual setting of the wider game concept is New York. The editor itself is a standalone creative tool that can later feed the game's in-world blackbook and artwork workflow.

## Current development status

**Latest prototype: Build 0.6 — Full Alphabet / Glyph Relationships**

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

## Roadmap

- **0.7 — Authentic Letter Construction:** replace provisional glyphs with authored, style-aware contours; define glyph metrics and real connection anchors.
- **0.8 — Relationship Solver:** build overlap/connection candidates, negative-space checks, collision handling and legibility scoring.
- **0.9 — Blackbook Workflow:** sketch variants, per-letter editing, layer controls, save/load and export refinement.
- **1.0 — Engine Integration:** reusable API/data model for the New York graffiti crew simulator.

See [docs/ROADMAP.md](docs/ROADMAP.md), [docs/ARCHITECTURE.md](docs/ARCHITECTURE.md), and [docs/CHANGELOG.md](docs/CHANGELOG.md).

## Prototype

The current 0.6 prototype was generated as a standalone HTML file during development. The next repository update should add the runnable prototype source under `prototypes/`, then keep subsequent builds versioned there.
