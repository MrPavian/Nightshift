# AI Handoff — Start Here

This is the short onboarding brief for a new AI assistant or coding agent.

## What is this project?

NIGHTSHIFT ART ENGINE is the procedural lettering/blackbook editor for a grounded New York graffiti crew simulator. Its purpose is to generate and edit original graffiti letter compositions with a historically informed style system.

## Read these files

- `AGENTS.md` — rules for AI contributors.
- `docs/PROJECT_BRIEF.md` — product intent and current baseline.
- `docs/ARCHITECTURE.md` — technical direction.
- `docs/ROADMAP.md` — priorities and acceptance criteria.
- `docs/STYLE_TAXONOMY.md` — terminology and research discipline.
- `docs/DECISIONS.md` — agreed decisions.
- `docs/CHANGELOG.md` — build history.
- `prototypes/nightshift_art_engine_v06.html` — current implementation.

## Current baseline

Build 0.6 is a standalone HTML prototype. It supports A–Z addressing, five authored contour masters (A, B, G, R, S), 21 provisional bases, early style profiles, basic word layout, layer controls, SVG export, browser-local archive and a Three.js wall preview.

Do not mistake the provisional bases or style labels for a finished graffiti alphabet or researched style engine.

## Next task

**Build 0.7 — Authentic Letter Construction.**

Start by auditing the actual prototype and glyph data. Produce a letter inventory with status per glyph, then propose the data model and construction workflow for bespoke glyph masters. Do not start by redesigning the UI or adding more decorative effects.

## What a useful first response should contain

1. Confirm which project files were inspected.
2. Summarize the actual current implementation, not just the intended architecture.
3. List gaps between implementation and design.
4. Propose a small, testable next change aligned with Build 0.7.
5. Identify any assumptions that need owner confirmation.

## Collaboration standard

Make small changes, preserve prior versions, test real behavior, update docs and clearly state what was and was not verified.
