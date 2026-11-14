# AI Handoff — Start Here

This is the short onboarding brief for a new AI assistant or coding agent.

## Autonomous work instruction

For the current uninterrupted research/specification workstream, follow [AUTONOMOUS_WORK_PROMPT.md](AUTONOMOUS_WORK_PROMPT.md). It defines the role boundaries, deliverables, repository workflow and conditions under which owner input is genuinely required.

## What is this project?

NIGHTSHIFT is a grounded New York graffiti crew simulator with a procedural lettering / blackbook editor as its central creative system. A second major component is **THE BLACKBOOK ARCHIVE**, a visual, interactive, in-game graffiti knowledge library.

## Read these files

- `AGENTS.md` — rules for AI contributors.
- `README.md` — project summary and current state.
- `docs/PROJECT_BRIEF.md` — product intent and current baseline.
- `docs/ARCHITECTURE.md` — intended technical architecture.
- `docs/GENERATOR_SYSTEM_RESPONSIBILITIES.md` — ownership boundaries and interfaces for the integrated Three.js editor.
- `docs/CLAUDE_IMPLEMENTATION_BRIEF_0_7.md` — phased production implementation handoff and acceptance criteria.
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


## Confirmed implementation direction

The production generator will be implemented with Claude and integrated Three.js support. Treat `prototypes/nightshift_art_engine_v06.html` as a legacy/reference prototype and audit target, not as the target production architecture. Do not continue building the final generator as a standalone HTML/JSON-only tool. The model's role in this workflow is to produce research-backed specifications, geometry/data contracts, test matrices, visual/functional requirements and implementation briefs that Claude can execute. Three.js belongs in the interactive generator itself, not only in a separate wall-preview pane. Keep editable vector geometry and SVG interoperability in the design unless the owner explicitly changes that requirement. JSON remains available as a suitable project-data format where needed.

