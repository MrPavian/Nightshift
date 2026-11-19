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
- `research/STYLE_GRAMMAR_SPECIFICATIONS_01.md` — evidence-led construction and composition grammars for the first four profiles.
- `research/STYLE_GRAMMAR_COMPATIBILITY_AND_PARAMETERS.md` — axis model, compatibility, parameter dependencies and validation.
- `docs/BLACKBOOK_ARCHIVE_MASTERPROMPT.md` — full archive product and implementation brief.
- `docs/BLACKBOOK_ARCHIVE_ROADMAP.md` — archive phases and release gates.
- `docs/DECISIONS.md` — agreed decisions.
- `docs/CHANGELOG.md` — build history.
- Latest prototype in `prototypes/` — actual implementation.

## Current baseline

Build 0.6 is a standalone HTML prototype. It supports A–Z addressing, five authored contour masters (A, B, G, R, S), 21 provisional bases, early style profiles, basic word layout, layer controls, SVG export, browser-local archive and a Three.js wall preview.

Do not mistake the provisional bases or style labels for a finished graffiti alphabet or researched style engine. The research library under `research/` and the machine-readable contracts under `contracts/` exist and are actively maintained; the archive content pipeline and first-edition UI exist since C06 (`archive/`).

Production implementation has started: `src/` contains the canonical glyph registry, legacy v0.6 import, semantic overlays, geometry validator, topology-correct renderer, proof sheets, a test/review page and a Three.js editor with a validated edit loop (0.7A-T01–T07). Run `npm install` once (Three.js).. Status, module map and next ticket are in `docs/IMPLEMENTATION_PLAN_0_7A.md`.

## Next engine task

**Build 0.7 — Authentic Letter Construction.** 0.7A (T01–T07) is complete; the first-slice release gate is met. Current package: C02 (`docs/CLAUDE_FINAL_RELEASE_TICKET_PACK_01.md`). Wave 1 (C/D/O/P/Q) is authored; see `docs/C02_GLYPH_AUTHORING_REPORT.md`. Next: wave 2 (E F H I L T). Open owner actions: human review of A/B/G/R/S (`docs/reports/proof/T06/review/ratings.json`), G aperture boundary (AUD-01/AUD-03), topology of D/O/P/Q.

## Next archive task

**C06 first edition is implemented as a complete German edition** (owner approval pending): `archive/` UI, `research/archive/de/` entry sources, `data/archive/archive.v1.de.json` (generated, `npm run archive:check` in CI), and the bridge contract `docs/EDITOR_BRIDGE_CONTRACT_01.md`. Report: `docs/reports/C06_BLACKBOOK_ARCHIVE_REPORT.md`. Under the owner-approved sequence (C01 → C06 → C02 → C03 → C04 → C05 → C07), the next package is **C02**. Archive follow-ups are listed as gaps in the C06 report: owner editorial and visual review, Berlin/Cologne/Munich chapters after source checks, and the English edition after C07 (roadmap section “Sprachausgaben”). When C03–C05 make a bridge capability real, set it to `available` in `src/bridge/editor-bridge.js` and add a receiver.

## What a useful first response should contain

1. Confirm which project files were inspected.
2. Summarize the actual current implementation, not just the intended architecture.
3. Identify the relevant workstream and roadmap phase.
4. List gaps between implementation and design.
5. Propose a small, testable next change aligned with the roadmap.
6. Identify assumptions that need owner confirmation.

## Collaboration standard

Make small changes, preserve prior versions, test real behavior, update docs and clearly state what was and was not verified.


## Creator-first product direction

The default experience is Name → Creative Brief → Four Proposals → Choose → Refine → Save/Export/Game Artwork. Creator, Studio and Writer Lab are progressive views of the same canonical project, not separate editors or unlock tiers. Keep activity, artwork form, letterform grammar, composition grammar, surface/format, priorities and rendering separate. Tag requires gesture-based handstyle construction; Throw-up is not synonymous with Bubble; Piece is not a style; Burner is evaluative; Bombing is an activity context; Panel/Wholecar are surface formats. See D-014 and the Creator-First Product Vision.

## Confirmed implementation direction

The production generator will be implemented with Claude and integrated Three.js support. Treat `prototypes/nightshift_art_engine_v06.html` as a legacy/reference prototype and audit target, not as the target production architecture. Do not continue building the final generator as a standalone HTML/JSON-only tool. The model's role in this workflow is to produce research-backed specifications, geometry/data contracts, test matrices, visual/functional requirements and implementation briefs that Claude can execute. Three.js belongs in the interactive generator itself, not only in a separate wall-preview pane. Keep editable vector geometry and SVG interoperability in the design unless the owner explicitly changes that requirement. JSON remains available as a suitable project-data format where needed.

