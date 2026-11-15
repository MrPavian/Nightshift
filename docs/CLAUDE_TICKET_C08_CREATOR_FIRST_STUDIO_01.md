# Claude Implementation Ticket C08 — Creator-First Graffiti Studio

**Status:** Owner-authorized implementation work package, 2026-11-15  
**Authority:** docs/FINAL_ROADMAP_AND_WORK_ORDER_01.md and docs/NIGHTSHIFT_CREATOR_FIRST_PRODUCT_VISION_01.md  
**Dependencies:** C01 and C06 completed; C02–C05 must be completed or demonstrably available before the full Creator workflow is enabled.  
**Owner:** Claude — production implementation  
**Role of ChatGPT:** research, specification and independent QA; no production-code implementation.

## Purpose

Make the user-facing product feel like an approachable virtual writer: enter a name, describe the desired result, compare four meaningful proposals, then refine or fully author the artwork.

## Mandatory first action — reconcile actual repository state

Before coding:
1. Read AGENTS.md, the final work order, this ticket, the Creator-First Product Vision, current implementation plan, and linked creative-workflow/generator contracts.
2. Inspect current branch, working tree, latest commits, src/, editor/, archive/, data/, tests, package scripts and actual browser behavior.
3. Reconcile C06 completion against its report and code. Do not infer completion from draft content commits.
4. Produce a capability matrix: implemented and tested / implemented but unverified / specified only / unavailable.
5. Do not overwrite owner or user changes. Do not repeat completed work.

If C02–C05 are not complete, implement only safe preparatory pieces below and continue the existing dependency sequence. Do not fake the Creator experience with mock proposals or inactive controls.

## Product rule

The default journey is:

**Name → Creative Brief → Four Proposals → Choose → Refine → Save/Export/Game Artwork**

The default experience must not require the user to understand glyph topology, anchors, contour graphs or vector editing. Those belong in deeper authoring levels.

## C08-A — Creator brief and capability-aware request model

Create or reconcile a versioned request model using the existing creative-workflow and generator contracts. Do not create a second competing schema.

The brief represents independent axes:
- normalized source word/name;
- practice/activity context;
- artwork form;
- letterform grammar;
- composition grammar;
- surface/format;
- user priorities;
- rendering/palette;
- optional personal style recipe and locks.

Keep these distinctions:
- Tag is name/handstyle-led and must not be a scaled piece font. If no gesture-based implementation exists, mark it limited/unavailable.
- Throw-up is an artwork form, not a synonym for Bubble.
- Piece is a developed artwork form, not one exclusive grammar.
- Burner is an evaluative descriptor, not a geometry profile or quality score.
- Bombing is an activity/session context, not a font or singular letterform grammar.
- Panel/wholecar are surface/coverage formats.
- Character is a separate optional compositional element.

Resolve choices against the live glyph registry, maturity states, grammar compatibility and registered operations. Return clear unavailable/incompatible reasons before generation. Never silently substitute another form or grammar.

**Acceptance**
- request schema is versioned and validates;
- axes serialize independently;
- unsupported glyphs, forms and combinations produce actionable capability reports;
- existing projects migrate/load without losing prior meaning;
- contract tests cover Tag/Throw-up/Piece/Bombing/Panel/Wholecar distinctions.

## C08-B — Creator entry experience

Implement a focused, novice-friendly default screen:
- prominent word/name input;
- clear artwork-form/context choice;
- understandable style direction selection;
- a small set of priorities (readability, flow/dynamism, compactness, complexity, surface fit);
- palette and finish controls;
- sensible defaults and advanced-settings disclosure;
- clear preflight feedback for unsupported letters/operations.

Do not expose every low-level parameter in the first view. Avoid unexplained jargon. Provide concise help and visual examples only where assets are original or rights-cleared.

Priorities are preferences, never hard-constraint overrides. Preserve separate diagnostic dimensions; do not invent one magic quality score. Use calibrated ranges only. If a preference is not mapped to a tested operation, do not present it as an active control.

**Acceptance**
- a novice can complete the brief without opening advanced settings;
- keyboard access, focus order, responsive layout and clear error states work;
- changing palette never changes the structural candidate signature;
- user choices survive request serialization and reload.

## C08-C — Four proposal comparison and selection

Reuse the deterministic four-concept generator (C04) and canonical project model. Do not implement a parallel random generator.

Each proposal:
- is a canonical immutable branch with seed and resolved brief;
- has a neutral construction preview and optional finished preview;
- reports actual structural/compositional differences;
- carries glyph maturity, compatibility and validation status;
- can be selected, duplicated, regenerated or reopened.

Proposal differences must be explained from measured candidate features, e.g. mass rhythm, width distribution, spacing, baseline, composition strategy or valid relationship distribution. Never claim differences absent from candidate data.

If four valid, sufficiently diverse concepts cannot be produced, show an honest partial/failure state; never pad with recolours.

**Acceptance**
- identical request/version/seed reproduces the same proposal set;
- four proposals pass the diversity contract;
- palette-only differences score no structural diversity;
- selecting a proposal creates an editable branch and preserves siblings;
- generated candidates and selection survive save/reload.

## C08-D — Progressive authoring levels

Expose three progressive levels without gating capabilities:
1. **Creator:** brief, generation, comparison and selection.
2. **Studio:** word-level and supported per-glyph refinement, relationships, layers, revisions, save/export.
3. **Writer Lab:** supported glyph/component/contour/anchor/relationship authoring and personal recipe authoring.

The levels are views of the same canonical project, not separate editors or state stores. Switching levels must preserve selection, history, geometry and project revision.

Controls appear only when the relevant operation is registered, calibrated where needed, tested and permitted by glyph maturity. Unsupported controls are not displayed as functional.

Assistance modes remain Off / Suggest / Preview. No silent auto-apply.

**Acceptance**
- Creator → Studio → Writer Lab → Creator round trip preserves canonical state;
- a single-glyph edit does not mutate unrelated glyphs;
- undo/redo and save/load preserve branch lineage;
- invalid operations reject atomically;
- assistance changes require explicit user acceptance.

## C08-E — Artwork context and game handoff

Connect artwork forms and surface context to the game-facing artifact model without collapsing them into style presets.

For this release:
- implement only forms and surfaces supported by the current engine;
- keep Tag/handstyle, full Bombing-session orchestration, advanced Characters and complex Wildstyle interlocking explicitly limited/deferred unless their own acceptance gates pass;
- a Piece/Throw-up proposal can be handed off as an artwork artifact with source word, form, grammar, surface, palette, geometry, layers, provenance, maturity and version metadata;
- game activity context such as Bombing may later orchestrate multiple artworks and placements, but do not implement an unrequested mission/placement system in this ticket.

**Acceptance**
- saved/exported game artwork preserves the creative brief and canonical geometry;
- no format/activity label is serialized as a letterform grammar;
- unsupported future modes are marked unavailable/deferred, not simulated.

## Required tests and proof

At minimum:
- contract/schema tests for all creative-brief axes;
- regression tests for the taxonomy distinctions above;
- short/long/repeated-letter word fixtures;
- supported and unsupported glyph/style/form combinations;
- four-way structural diversity and deterministic replay;
- neutral-preview versus colour/finish invariance;
- branch selection and sibling immutability;
- Creator/Studio/Writer Lab state continuity;
- edit rejection, undo/redo, save/reload and export round trips;
- browser tests for the complete novice journey.

Create proof sheets for a short name, a long name, repeated letters, mixed narrow/wide letters, one Throw-up context, one Piece context and one surface-fit context.

Do not use a Tag or Bombing fixture to claim full functionality unless the underlying gesture/activity model exists.

## Scope and sequence

C08 is inserted **after C02–C05 and before C07**. The existing 1.0 release cap remains binding. Do not postpone alphabet, grammar or relationship foundations merely to build a polished front end.

Immediate work:
1. Complete the next unfinished dependency package in the approved C02 → C03 → C04 → C05 order.
2. Keep its implementation aligned with the Creator-first request model and taxonomy.
3. Once C05 is complete, execute C08-A through C08-E in dependency order.
4. C07 then performs final app/archive integration and release hardening.

If repository evidence proves one or more dependencies already complete, report that evidence and skip them.

## Required report

Return:
1. Status: complete / partial / blocked.
2. Commit SHA and changed files.
3. Capability matrix before and after.
4. Commands run and exact test totals.
5. Proof artifacts and hashes/paths.
6. Acceptance criteria passed/failed.
7. Remaining calibration/maturity gaps.
8. Next package and blockers.

Never claim the Creator journey is complete from a static UI mock-up. It must generate real canonical proposals, preserve state, support real edits and pass browser tests.
