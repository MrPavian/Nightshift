# NIGHTSHIFT — Final Roadmap and Joint Work Order 01

**Date:** 2026-11-14  
**Status:** Binding project plan from this revision onward  
**Target:** NIGHTSHIFT 1.0 — finished, usable editor + BLACKBOOK ARCHIVE MVP  
**Owners:** Claude (implementation), ChatGPT (research/specification/QA), project owner (final creative approval)

---

## 1. The decision: this project must reach a finish line

NIGHTSHIFT has accumulated a substantial research library, technical contracts and implementation specifications. The next phase is not to keep expanding those indefinitely. It is to convert the existing work into one finished, coherent product.

The release target is **NIGHTSHIFT 1.0**. Work is complete when the release gates in §8 pass, the known limitations are documented, and a tagged release candidate is delivered.

After 1.0:
- only release-blocking defects and maintenance are in scope by default;
- new styles, archive chapters, game systems and experimental features require an explicit post-1.0 decision;
- research is closed when it is sufficient to support the shipped claims and editor behavior, not when every historical question has been answered;
- no new document is created unless it resolves a named blocker, supports a release requirement, or records a verified result.

This is a finite release plan, not a promise to implement every idea in the research library.

## 2. Product definition for 1.0

NIGHTSHIFT 1.0 is a browser-first, vector-first graffiti lettering workbench with an integrated Three.js editing/presentation surface and a compact, source-backed BLACKBOOK ARCHIVE.

### Required user journey

1. Enter a word/name.
2. Choose a supported lettering grammar.
3. Generate four reproducible structural concepts.
4. Select a concept and refine the composition.
5. Select and edit individual letters.
6. Adjust safe spacing/relationship options and supported fills/layers.
7. Inspect honest geometry, maturity and legibility diagnostics.
8. Save and reopen a versioned project.
9. Export SVG and PNG.
10. Open related BLACKBOOK ARCHIVE entries while working.

### 1.0 supported style scope

- **Bubble / Throw-up-inspired lettering:** distinct rounded construction grammar.
- **Straight / Simple lettering:** distinct angular/controlled construction grammar.
- **Blockbuster / Block-fit:** compact block construction and fit behavior; clearly distinguished from generic Straight lettering.
- **Wildstyle study:** relationship/composition study with explicit limitations. It is not advertised as a complete automatic interlocking/wildstyle generator in 1.0.

The first three must have visibly different monochrome construction behavior, not merely color, slant or finish differences. Wildstyle remains a constrained study mode unless the advanced topology gates are genuinely passed.

### Alphabet maturity

- All A–Z characters must be renderable and usable in words.
- Every glyph must have an explicit maturity state and provenance.
- No generic fallback is labelled an authored master.
- Release target: a complete neutral A–Z construction set; style-specific variants are enabled only for glyphs that have authored, validated and visually reviewed variants.
- Unsupported glyph/style combinations must be visibly reported, not silently substituted.

### Relationships

1. 1.0 requires validated spacing, safe adjacency, near-touch and explicitly permitted terminal relationships.
2. Whole-word collision, counter/aperture and negative-space checks are mandatory.
3. Controlled overlap is optional only if it passes the same whole-word validation.
4. Shared strokes, interlocking and complex weaving are not 1.0 requirements. They remain post-1.0 unless implementation and review demonstrate they are safe without weakening validation.

### Explicit non-goals for 1.0

- Full game / crew simulator integration.
- Online accounts, cloud sync or multiplayer.
- Mobile-native app packaging.
- Full A–Z variants for every possible style.
- A universal automatic graffiti-style classifier.
- Writer identity ranking, signature imitation or one-click cloning.
- Exhaustive graffiti history or complete world-scene coverage.
- Complex shared-stroke Wildstyle / advanced weaving if not safely validated.
- Bundling INGRID source photographs as product assets without item-level clearance.

## 3. Workstream ownership

### ChatGPT — research, specification and independent QA

ChatGPT owns:
- maintain one prioritized evidence/research backlog;
- complete the finite INGRID/Dortmund research pass (§5);
- resolve documentation contradictions and keep one authoritative release plan;
- prepare only implementation-ready Claude tickets;
- audit Claude's reports, contracts, test evidence and release claims;
- inspect proof sheets and compare output against the acceptance rubric where image artifacts are available;
- maintain changelog, release checklist and deferred-work list;
- report blockers plainly; never claim tests, browser actions, visual reviews or database queries that were not actually performed.

ChatGPT does **not** own production code implementation and does not certify visual quality from a text description.

### Claude — production implementation and release engineering

Claude owns:
- complete the canonical vector/glyph model and integrated editor;
- implement the style resolver, word composition and supported relationship solver;
- implement editing, undo/redo, project persistence and export;
- implement the BLACKBOOK ARCHIVE MVP and its content pipeline;
- write and run unit, integration and browser tests;
- generate deterministic proof sheets and release artifacts;
- fix all release-blocking defects;
- prepare a reproducible 1.0 release candidate with build/run instructions.

Claude must not replace a hard validation gate with a heuristic score or claim a feature from a visible control alone.

### Project owner — final creative authority

The owner:
- supplies final visual/creative approval on proof sheets and the release candidate;
- decides only genuine product-direction changes or unresolved trade-offs;
- does not need to re-approve already settled architecture and scope.

## 4. Finite implementation roadmap

The existing 0.7A work is the foundation. Continue from its actual repository status, not from old roadmap assumptions.

### Phase 1 — Close 0.7A (editor foundation)

**Starting state documented 2026-11-14:** T01–T06 complete; T07 not started.

Tasks:
- complete the validated Three.js edit command loop (preview, commit, reject, undo/redo);
- ensure canonical model is the only source of truth;
- save/reload preserves geometry, stable IDs and revisions;
- finish the A/B/G/R/S proof review; preserve G aperture uncertainty if it cannot be resolved;
- close all blocking geometry/topology defects.

Exit gate:
- `npm test` and `npm run test:browser` pass;
- A/B/G/R/S render identically in canonical SVG and Three.js paths;
- one registered edit operation completes the full validated command cycle;
- proof artifacts and known limitations are recorded.

### Phase 2 — Complete the usable alphabet and style grammar

Tasks:
- author neutral glyph masters C–Z in prioritized waves;
- retain exact provenance and per-glyph maturity;
- complete the A–Z registry and topology validation;
- implement the style resolver and registered operation plans;
- implement and visually differentiate Bubble, Straight and Blockbuster where glyph support is reviewed;
- retain Wildstyle as a constrained study mode unless relationship gates justify more;
- create A–Z proof sheets, word specimens and a human review ledger.

Exit gate:
- every A–Z glyph is renderable and has an honest maturity state;
- no unsupported glyph/style combination silently passes as complete;
- supported style variants change monochrome construction;
- all release word fixtures pass topology and composition checks;
- visual review is recorded, not inferred from automated tests.

### Phase 3 — Relationship solver and procedural generation

Tasks:
- stable anchor registry with validity/provenance;
- deterministic seed and four structurally distinct concepts;
- safe adjacency, spacing, near-touch and approved terminal relations;
- whole-word collision, negative-space and counter/aperture validation;
- local overrides and reversible graph-backed edits;
- optional controlled overlap only after explicit validation;
- diagnostics separate measured geometry from heuristic readability or gameplay estimates.

Exit gate:
- same seed and project inputs reproduce the same four concepts;
- concepts are structurally different, not recolors;
- invalid edits reject atomically;
- undo/redo and dependency invalidation work;
- no hard gate can be bypassed to force a result.

### Phase 4 — Blackbook workflow and project portability

Tasks:
- per-letter and word-level editing;
- layer/fill controls that do not corrupt canonical topology;
- versioned project JSON with migration/version checks;
- save, reopen, duplicate and rename projects;
- SVG and PNG export;
- deterministic thumbnails/proof output;
- useful empty, error and recovery states.

Exit gate:
- a user can create, save, reopen and export a complete word without data loss;
- SVG/PNG match the editor's committed revision;
- project format is documented and round-trip tested.

### Phase 5 — BLACKBOOK ARCHIVE MVP (owner-approved early execution after C01)

**Sequencing exception (2026-11-15):** Execute this phase immediately after C01, before C02–C05. C02–C05 are temporarily deferred, not cancelled. The archive must be independently useful and must not depend on unfinished editor functionality. Prepare a versioned editor-bridge contract and connect only to capabilities verified in the current code. Do not fake future controls or duplicate editor logic. Resume C02 → C03 → C04 → C05 after this phase; C07 completes final bidirectional integration.

Do not attempt the full encyclopedia roadmap. Deliver a coherent, finite first edition.

Required:
- archive home, categories, search and entry detail;
- stable entry IDs and validated source references;
- 25–35 curated entries drawn from already researched material;
- at least two usable learning paths (e.g. history → style → construction; practice/format → material → generator);
- visual comparisons using original diagrams or rights-cleared assets;
- clear distinction between historical facts, practitioner accounts, scholarly interpretation and design inference;
- a versioned editor-bridge contract and links only to currently implemented, verified editor capabilities; future C02–C05-dependent actions remain honestly unavailable until implemented; C07 completes and tests at least three genuine bidirectional links;
- local/offline availability for bundled content.

Not required:
- exhaustive writer/crew biographies;
- global coverage;
- complex social graph visualizations;
- unlock/progression systems;
- large-scale image hosting.

Exit gate:
- no placeholder or unsupported claims in published entries;
- all entry links and source references validate;
- search/navigation have no dead ends;
- archive can be used offline for bundled content;
- at least three entries lead to a relevant editor study or construction view.

### Phase 6 — Creator-first experience (C08)

**Goal:** turn the validated generator and editing capabilities into one approachable creative journey.

Requirements:
- Creator is the default entry: name → creative brief → four proposals → choose → refine → save/export/game artwork.
- Keep practice/activity, artwork form, letterform grammar, composition grammar, surface/format, priorities and rendering independent.
- Provide progressive Creator, Studio and Writer Lab views of the same canonical project.
- Expose only implemented, tested and maturity-compatible controls.
- Preserve deterministic structural diversity, proposal branching, validation and user ownership of edits.
- Keep Tag/handstyle, full Bombing orchestration, advanced Character systems and complex Wildstyle interlocking limited/deferred unless their own gates pass.

**Authority:** [Creator-First Product Vision 01](NIGHTSHIFT_CREATOR_FIRST_PRODUCT_VISION_01.md), [Generator Knowledge Translation 01](../research/GENERATOR_KNOWLEDGE_TRANSLATION_01.md), [Claude Ticket C08](CLAUDE_TICKET_C08_CREATOR_FIRST_STUDIO_01.md).

**Exit gate:** a novice can complete a real supported creative brief, compare four valid structural proposals, select one, refine it through the supported editor, and save/reopen/export without losing state. Browser tests cover the complete journey. No mock proposals or cosmetic duplicates.

### Phase 7 — Integration, hardening and release

Tasks:
- integrate editor and archive in one coherent application shell;
- verify responsive desktop/tablet behavior and keyboard operation;
- check performance on a representative mid-range device;
- test project migration, corrupted/invalid files and recovery;
- audit licensing, attribution, source credits and bundled assets;
- complete accessibility and content QA;
- fix all P0/P1 release blockers;
- create release notes, known-issues list and tagged 1.0 candidate.

Exit gate:
- all §8 release criteria pass;
- fresh checkout can be installed and run using documented steps;
- test report and proof artifacts are reproducible;
- owner approves the final visual/creative review;
- version is tagged and frozen.

## 5. Finite INGRID research assignment (ChatGPT-led)

INGRID is P1 foundational research, but it must have a defined finish.

### Deliverables

1. **Dortmund corpus inventory:** run or attempt the documented Q01–Q06 queries; record exact query, endpoint/UI, timestamp, counts and failures.
2. **Coverage and missingness report:** separate recording date from artwork creation date; distinguish unannotated/unknown/not applicable; document source-collection bias.
3. **Visual sample:** target 30–50 accessible Dortmund records if access and rights permit, stratified by decade × type × source collection. If the accessible sample is smaller, use the actual number and explain why.
4. **Style development synthesis:** identify recurring cross-writer/period patterns and contradictions; do not infer universal rules from one writer or collection.
5. **Editor learning requirements:** translate only evidence-supported findings into a small list of candidate grammar/parameter hypotheses for human review.
6. **Rights/provenance ledger:** record item-level license and credit for anything visually inspected or retained. Metadata-only research remains distinct from image reuse.

### Stop conditions

- If the public endpoint/EasyDB is inaccessible after two documented access attempts using available routes, record the blocker and switch to published ontology/article/manual evidence plus accessible Dortmund publications.
- Do not spend unlimited time reverse-engineering an undocumented endpoint.
- Do not claim a Dortmund count or visual trend without executed query results / inspected records.
- No INGRID photograph is bundled into NIGHTSHIFT solely because it is visible in a research interface.
- The INGRID workstream closes when the six deliverables are complete or explicitly marked blocked with evidence and a documented fallback.

## 6. Finite ChatGPT research/specification sequence

ChatGPT proceeds in this order and stops expanding the research library when the release needs are met:

1. Close the INGRID Dortmund research pass under §5.
2. Audit existing research claims used by the shipped 25–35 archive entries and supported editor grammars.
3. Produce a concise **Style Grammar Evidence Matrix**: claim → evidence → confidence → supported editor behavior → limitation.
4. Produce the final **A–Z Visual Review Pack** and record actual visual review status.
5. Audit all contracts against the implemented interfaces after Claude's reports are available.
6. Prepare final QA checklist, release notes and deferred-work register.
7. Verify all final repository changes and close the work order.

No further general history dossiers are added unless a named release blocker depends on them.

## 7. Finite Claude implementation sequence

**Owner-approved execution order (2026-11-15):**

1. **C01 — 0.7A-T07 editor command loop.**
2. **C06 — BLACKBOOK ARCHIVE MVP, independently usable, with a versioned editor-bridge contract.** C02–C05 do not block this package. Only verified existing editor capabilities may be linked; future capabilities must not be faked or duplicated.
3. **C02 — C–Z neutral glyph authoring and review pipeline.**
4. **C03 — style resolver and supported Bubble/Straight/Blockbuster variants.**
5. **C04 — safe relationship solver and deterministic four-concept generator.**
6. **C05 — blackbook editing, project persistence and export.**
7. **C07 — final bidirectional archive/editor integration, hardening, test report and 1.0 release candidate.**

This is a deliberate sequencing override, not a scope reduction or cancellation of C02–C05.

**Archive languages (owner decision 2026-11-15):** C06 ships a complete German edition. A complete English edition is a planned follow-up after C07; see `docs/BLACKBOOK_ARCHIVE_ROADMAP.md`, section “Sprachausgaben”.

The detailed Claude handoff is in [CLAUDE_FINAL_RELEASE_TICKET_PACK_01.md](CLAUDE_FINAL_RELEASE_TICKET_PACK_01.md). Claude must report a package as complete only when its acceptance evidence exists.

## 8. NIGHTSHIFT 1.0 release checklist

All items are required unless explicitly marked not applicable with a reason.

### Product
- [ ] A–Z input and rendering, with maturity shown honestly.
- [ ] Bubble, Straight and Blockbuster supported as distinct construction grammars on reviewed glyph coverage.
- [ ] Wildstyle clearly labelled as a constrained study, not falsely advertised as complete.
- [ ] Four deterministic, structurally distinct concepts.
- [ ] Safe word relationships and whole-word topology validation.
- [ ] Per-letter editing and word-level composition.
- [ ] Undo/redo.
- [ ] Versioned save/load.
- [ ] SVG and PNG export.
- [ ] Integrated Three.js editor/presentation.
- [ ] BLACKBOOK ARCHIVE MVP with 25–35 reviewed entries and two learning paths.

### Engineering
- [ ] Unit, integration and browser tests pass.
- [ ] No P0/P1 defects remain.
- [ ] Deterministic proof sheets and run manifests exist.
- [ ] Fresh-checkout install/run instructions verified.
- [ ] Export and persistence round-trip tests pass.
- [ ] Performance and responsive checks recorded.

### Research, ethics and content
- [ ] Shipped historical/style claims have traceable evidence and confidence.
- [ ] INGRID findings are reported with coverage/missingness limitations.
- [ ] No identifiable writer signature cloning.
- [ ] Every bundled image/asset has a documented rights basis.
- [ ] Source credits and attributions are present.
- [ ] Known limitations and deferred work are explicit.

### Release
- [ ] Owner completes visual/creative sign-off.
- [ ] Changelog and release notes updated.
- [ ] 1.0 release candidate tagged.
- [ ] Final test report and artifact manifest committed.

## 9. Definition of done and project closure

NIGHTSHIFT 1.0 is complete when:
1. every required release checklist item is checked or explicitly waived by the owner;
2. all P0/P1 defects are fixed;
3. the fresh-checkout build, tests and exports are reproducible;
4. the owner has approved the final visual/creative review;
5. the release candidate, documentation, known limitations and deferred-work list are committed and tagged.

At that point, the active roadmap is closed. No new phase starts automatically. The project can be called **NIGHTSHIFT 1.0 complete** without pretending that graffiti culture, historical research or future creative possibilities have been exhausted.

## 10. Working rules from this revision

- One authoritative roadmap: this document.
- One implementation handoff for Claude: the linked final ticket pack.
- One active ChatGPT work order: this document's §5–§7.
- Existing research/contracts remain reference material; they do not all become 1.0 features.
- Every task has an owner, output, acceptance gate and stop condition.
- No duplicate specifications, speculative features or endless research expansion.
- Report actual progress, blockers and uncompleted work plainly.


## Execution log — 2026-11-14

### ChatGPT research / QA
- [x] Rechecked current 0.7A implementation report and confirmed the documented handoff point is T07; implementation source for the command bus / T07 interaction is not yet present at the inspected paths.
- [x] Inspected the official INGRID-KG query catalogue and upstream RDF converter. Updated the Dortmund query pack with the documented examples and an explicit `grfo:` vs `grfp:` namespace reconciliation warning.
- [x] Attempted public SPARQL endpoint access via catalogue link and direct query URL; both failed in the current research client. Local runtime DNS also failed. No Dortmund result counts are claimed.
- [x] Created GitHub issue [#4 — C01 / 0.7A-T07](https://github.com/MrPavian/Nightshift/issues/4) with the implementation requirements and acceptance tests for Claude.

### Next actions
- Claude: implement C01 against issue #4 and return the required test/proof report.
- ChatGPT: continue INGRID schema reconciliation through published source artifacts and prepare a fallback dataset-access path; resume empirical city analysis when endpoint or EasyDB access is available.
