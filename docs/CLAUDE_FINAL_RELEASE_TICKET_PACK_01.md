# NIGHTSHIFT 1.0 — Claude Final Release Ticket Pack 01

**Owner:** Claude — production implementation  
**Authority:** subordinate to `FINAL_ROADMAP_AND_WORK_ORDER_01.md`  
**Status:** ordered implementation sequence; not evidence of completion  
**Rule:** inspect current repository state before each package. Do not repeat completed work.

## Owner-approved sequencing override — 2026-11-15

The original C01 → C02 → C03 → C04 → C05 → C06 → C07 order has one explicit exception: **after C01, execute C06 immediately.** C02–C05 are temporarily deferred, not cancelled. C06 must be independently useful and must not wait for the editor packages. Build a versioned editor-bridge contract and integrate only capabilities verified to exist. Do not fake future controls, duplicate editor logic or claim unfinished features. After C06, resume C02 → C03 → C04 → C05, then C07 completes real bidirectional integration and release hardening. This override is owner-approved and supersedes conflicting sequencing language in older C06 text.

## Mandatory first action

Read:
- `AGENTS.md`
- `docs/FINAL_ROADMAP_AND_WORK_ORDER_01.md`
- `docs/IMPLEMENTATION_PLAN_0_7A.md`
- `docs/CLAUDE_TICKET_PACK_0_7A_01.md`
- `docs/CLAUDE_TICKET_PACK_0_7B_01.md`
- relevant contracts under `contracts/`
- relevant research specifications linked from the roadmap.

Then inspect git status, current branch, package scripts and actual test results. Reconcile documentation with the live code. Do not assume a ticket is unfinished if the code already proves it complete.

## C01 — Close 0.7A-T07

**Goal:** complete the first real canonical Three.js editing loop.

Requirements:
- stable-ID selection;
- transient preview;
- typed command submission against expected revision;
- atomic validation/rejection;
- canonical-state scene rebuild;
- undo/redo through canonical patches;
- save/reload preserving IDs, geometry and revision;
- camera/lighting/view changes do not dirty artwork.

Acceptance:
- at least one calibrated, registered structural operation completes preview → commit → undo → redo;
- stale revision and invalid geometry reject without mutation;
- preview cancellation restores committed state;
- Node and browser tests cover the same canonical model;
- no direct mesh mutation becomes persistent state.

Do not invent or enable uncalibrated controls. Resolve G aperture only if evidence and geometry permit; otherwise preserve its unresolved status.

## C02 — Complete neutral A–Z construction

**Goal:** all 26 letters are usable without misrepresenting maturity.

Requirements:
- author C–Z in staged waves from `research/A_Z_GLYPH_AUTHORING_AND_PRIORITY_PLAN_01.md`;
- each glyph has semantic construction, explicit topology, stable IDs, provenance, validator report and neutral proof;
- preserve A/B/G/R/S source masters and review status;
- do not use a font fallback or generic path and label it authored;
- expose provisional/reviewed/validated status in the UI.

Acceptance:
- A–Z render, serialize and export;
- counters/apertures are correctly classified or explicitly unresolved;
- no unreviewed glyph receives reviewed/production status;
- word fixtures exercise the complete alphabet;
- all failures have actionable diagnostics.

## C03 — Style grammar resolver and initial supported variants

**Goal:** styles change letter construction, not just appearance.

Implement:
- deterministic resolver and compatibility output;
- Bubble/Throw-up-inspired construction;
- Straight/Simple construction;
- Blockbuster/Block-fit construction;
- Wildstyle study mode with honest limitations.

Acceptance:
- Bubble, Straight and Blockbuster show different monochrome geometry on supported glyphs;
- only authored/validated operations are enabled;
- resolver reports skipped operations and reasons;
- style family, composition grammar, practice/form context and rendering remain separate axes;
- Wildstyle is never represented as fully interlocking unless advanced relationship gates pass.

## C04 — Safe relationships and four-concept generation

Implement:
- deterministic seed service;
- four structural candidates, not recolors;
- stable anchor registry with provenance and validity;
- safe spacing, separation, near-touch and approved terminal relations;
- graph-backed reversible relationships;
- whole-word collision, counter/aperture and negative-space validation;
- local overrides and dependency invalidation;
- controlled overlap only if fully validated.

Acceptance:
- identical inputs/seeds reproduce identical candidates;
- four concepts differ by measured structural features;
- invalid edits reject atomically;
- no hard topology gate is bypassed to fill a four-result set;
- quality/readability heuristics are clearly separated from measured geometry.

## C05 — Editing workflow, persistence and export

Implement:
- word and per-letter editing;
- layer/fill controls derived from canonical vector state;
- undo/redo;
- versioned project JSON, migrations and validation;
- save/open/duplicate/rename;
- SVG and PNG export;
- deterministic thumbnails and proof manifests.

Acceptance:
- create → edit → save → reload → edit → export round-trip passes;
- export matches committed revision;
- corrupted/unsupported project files fail safely with useful messages;
- no user edit is lost on style/word-level recomputation.

## C06 — BLACKBOOK ARCHIVE MVP (execute immediately after C01 under the owner-approved sequencing override)

**Dependency rule:** C02–C05 are temporarily deferred and do not block this package. Build the archive independently. Prepare versioned bridge contracts for future editor features; connect only verified capabilities already implemented. Do not fake controls, duplicate editor logic or claim unavailable features.

**Goal:** deliver a polished, source-backed, visual graffiti lexicon that introduces modern hip-hop writing from its New York emergence through international circulation, distinct regional adaptations and contemporary global practice. This is a curated launch edition, not an exhaustive encyclopedia of every country or writer.

**Read first:** `docs/BLACKBOOK_ARCHIVE_GLOBAL_EDITORIAL_FRAMEWORK_01.md`, `docs/BLACKBOOK_ARCHIVE_INFORMATION_ARCHITECTURE_01.md`, `docs/BLACKBOOK_ARCHIVE_ROADMAP.md`, `docs/CLAUDE_TICKET_PACK_BLACKBOOK_01.md`, `research/BLACKBOOK_ARCHIVE_CONTENT_PILOT_01.md` (30-entry editorial launch plan, learning paths, source register and review gates), and the relevant `research/` dossiers.

Implement the existing archive phases and scope:
- archive home, global search, categories, filters and entry detail;
- 25–35 curated, reviewed launch entries (quality over count);
- linked content for historical periods/events, places/scenes, practices, lettering/composition styles, formats/surfaces, techniques/materials, people/crews, glossary and visual references;
- New York as a substantial historical foundation, followed by selected contrasting international scene chapters and contemporary context;
- a navigable timeline and at least two guided learning paths;
- stable IDs, source records, claim-level evidence labels, editorial states and rights metadata;
- original diagrams or rights-cleared visual assets;
- a documented, versioned editor-bridge contract; connect only to editor capabilities that are verified as implemented at the time of C06; record future C02–C05-dependent links as unavailable rather than simulating them;
- bundled offline access.

**Editorial and visual quality requirements:**
- The research library is the editorial source of truth; generate archive data from it. No separately maintained duplicate database.
- Research dossiers are source material, not automatically publishable entries. Publish only claim-checked, edited content.
- Separate documented facts, practitioner accounts, scholarly interpretations and NIGHTSHIFT design inferences.
- Distinguish NYC emergence from older/different traditions of public inscription; do not claim all graffiti began in New York.
- International chapters must describe local chronology, terminology and adaptation; do not portray the world as a one-way copy of NYC.
- Present short accessible introductions with expandable depth, strong visual hierarchy, original diagrams, readable typography, timeline/scene navigation and connected entries. Avoid an admin-panel appearance or decorative grunge that harms legibility.
- Do not embed external archive images without item-level rights clearance. Keep evidence quality, editorial approval and image rights as independent states.
- Never clone identifiable writer signatures or turn people/crews into generator presets.

**Acceptance criteria:**
- schema, references, source links and content validation pass;
- all public claims have traceable sources and visible evidence treatment;
- 25–35 entries form a coherent, genuinely useful launch edition with New York foundation and several contrasting global scenes;
- timeline and two learning paths work end-to-end;
- search and navigation have no dead ends;
- visual design is polished, responsive and accessible;
- all active editor links target real, verified capabilities; unavailable future links are honestly marked unavailable; the final requirement for at least three genuine bidirectional archive/editor links is completed and tested in C07 after C02–C05;
- no placeholder text, unsupported claims or unlicensed embedded images;
- content is generated from the research library, not duplicated manually.

## C07 — Integration and release hardening

Requirements:
- integrate editor and archive into one application;
- responsive desktop/tablet behavior and keyboard operation;
- representative mid-range device performance check;
- project migration and recovery tests;
- asset/license/attribution audit;
- fix all P0/P1 defects;
- update documentation, changelog and known issues;
- produce reproducible 1.0 candidate and tagged release.

Acceptance:
- fresh checkout install/run documented and verified;
- unit, integration and browser suites pass;
- SVG/PNG and project round trips pass;
- proof sheets and test manifests committed;
- no release-blocking defect remains;
- owner has an explicit visual/creative sign-off path.

## Required report after every package

Return exactly:
1. Status: complete / partial / blocked.
2. Commit SHA and changed files.
3. Commands run and exact test totals.
4. Proof artifacts and hashes/paths.
5. Acceptance criteria passed/failed.
6. Remaining defects and calibration gaps.
7. Glyph/style maturity changes (if any).
8. Next package and any blocker.

Never report complete from compilation alone. Never claim human visual approval that has not occurred.

## Stop rule

Do not add features outside the 1.0 master roadmap. If a requested feature is outside scope, add it to a concise post-1.0 deferred list and continue the current package. Do not broaden scope without owner approval.
