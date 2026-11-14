# AI Handoff — Start Here

This is the short onboarding brief for a new AI assistant or coding agent.

## What is this project?

NIGHTSHIFT is a grounded New York graffiti crew simulator with a procedural lettering / blackbook editor as its central creative system. A second major component is **THE BLACKBOOK ARCHIVE**, a visual, interactive, in-game graffiti knowledge library.

## Read these files

- `AGENTS.md` — rules for AI contributors.
- `README.md` — project summary and current state.
- `docs/PROJECT_BRIEF.md` — product intent and current baseline.
- `docs/ARCHITECTURE.md` — intended technical architecture.
- `docs/ROADMAP.md` — main engine priorities and acceptance criteria.
- `docs/STYLE_TAXONOMY.md` — terminology and research discipline.
- `docs/BLACKBOOK_ARCHIVE_MASTERPROMPT.md` — full archive product and implementation brief.
- `docs/BLACKBOOK_ARCHIVE_ROADMAP.md` — archive phases and release gates.
- `docs/DECISIONS.md` — agreed decisions.
- `docs/CHANGELOG.md` — build history.
- Latest prototype in `prototypes/` — actual implementation.

## Current baseline

Build 0.6 is a standalone HTML prototype. It supports A–Z addressing, five authored contour masters (A, B, G, R, S), 21 provisional bases, early style profiles, basic word layout, layer controls, SVG export, browser-local archive and a Three.js wall preview.

Do not mistake the provisional bases or style labels for a finished graffiti alphabet or researched style engine. The research library and in-game archive are planned workstreams; do not claim they already exist as implemented features.

## Next engine task

**Build 0.7 — Authentic Letter Construction.** Audit the actual prototype and glyph data, produce a letter inventory with status per glyph, then propose the data model and construction workflow for bespoke glyph masters.

## Next archive task

**THE BLACKBOOK ARCHIVE — Phase A/B.** Start with product taxonomy, research methodology and source-backed pilot entries. Read the archive masterprompt and roadmap. Do not begin with a decorative UI shell or bulk-generated unsourced definitions.

## What a useful first response should contain

1. Confirm which project files were inspected.
2. Summarize the actual current implementation, not just the intended architecture.
3. Identify the relevant workstream and roadmap phase.
4. List gaps between implementation and design.
5. Propose a small, testable next change aligned with the roadmap.
6. Identify assumptions that need owner confirmation.

## Collaboration standard

Make small changes, preserve prior versions, test real behavior, update docs and clearly state what was and was not verified.
