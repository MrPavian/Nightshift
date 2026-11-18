# NIGHTSHIFT — Claude Project Briefing & Working Agreement

**Repository:** https://github.com/MrPavian/Nightshift  
**Project:** NIGHTSHIFT / THE BLACKBOOK ARCHIVE  
**Last maintained:** 2026-11-15  
**Owner:** MrPavian  
**Purpose of this file:** canonical, continuously maintained handover for Claude. Read this file before every new task and update it when project state materially changes.

> This file is the current project briefing, not a replacement for the detailed specifications linked below. If a task-specific instruction conflicts with this file, follow the current explicit instruction from the project owner. If two specifications conflict, report the conflict rather than silently choosing.

---

## 1. Mission and product vision

NIGHTSHIFT combines two related but distinct products:

1. **THE BLACKBOOK ARCHIVE:** a premium German-language digital blackbook, cultural knowledge archive and editorial learning environment for graffiti writing.
2. **NIGHTSHIFT Piece Generator / Editor:** an original procedural lettering and composition tool informed by research, with editable geometry and a strong creative workflow.

The archive should feel like a carefully curated blackbook inside a modern research studio: editorial, visually literate, source-aware, accessible and culturally grounded. It is **not** a generic wiki, admin dashboard, graffiti moodboard or faux-grunge scrapbook.

The archive must help:
- beginners understand terms and relationships quickly;
- experienced users explore regional histories, visual construction and material culture;
- readers inspect sources, uncertainty, chronology and rights;
- the generator team translate supported research into abstract, original design principles.

The long-term ambition is a coherent, high-quality product, not a pile of disconnected pages or features. Prioritize depth, clarity, accuracy and consistency over feature count.

## 2. Binding hierarchy and design direction

Read and obey these files before changing archive UI, shared components, content presentation or learning views:

1. `docs/BLACKBOOK_ARCHIVE_STYLEGUIDE_01.md` — **binding visual and interaction authority**.
2. `docs/production/PRODUCTION_STANDARD_01.md` — production process, quality gates and handover requirements.
3. `docs/production/ARCHIVE_DESIGN_SYSTEM_01.md` — operational design tokens and shared archive patterns.
4. Task-specific production briefs and templates, including:
   - `docs/production/LETTERING_LEARNING_VIEW_PRODUCTION_BRIEF_01.md`
   - `docs/production/ARTICLE_PAGE_TEMPLATE_01.md`
   - `docs/production/KNOWLEDGE_MODEL_AND_RELATIONSHIP_GRAPH_01.md`
   - `docs/production/ARTWORK_BRIEF_TEMPLATE_01.md`
   - `docs/production/UI_WIREFRAME_TEMPLATE_01.md`
   - `docs/production/TECHNICAL_SPEC_TEMPLATE_01.md`
   - `docs/production/ACCEPTANCE_TEST_TEMPLATE_01.md`

If a current explicit owner decision conflicts with an older document, the owner decision wins. Styleguide conflicts must be surfaced.

### Non-negotiable visual/product rules

- Every visible UI string is German (de-DE). Original graffiti terms, names, quotations, book titles and proper nouns remain in their historically correct form and are explained where needed.
- Dark ink/charcoal foundation, warm readable paper/content surfaces where appropriate, disciplined typography, generous spacing and restrained accent use.
- Editorial clarity and real information hierarchy. No random spray textures, faux-grunge, decorative graffiti fonts in navigation, generic neon overlays or meaningless badges.
- No fake search, dead buttons, inert filters, decorative controls presented as functional, or placeholder interactions in a claimed finished feature.
- Desktop, tablet and mobile must be considered from the start. Keyboard, touch, focus visibility, contrast, reduced motion and static fallbacks matter.
- A first-time visitor should understand where to start in 10 seconds, find and understand a term in 30 seconds, and follow a meaningful connection in 2 minutes.

## 3. Historical, editorial and cultural rules

Accuracy is a core product feature. Always distinguish:

- documented historical fact;
- practitioner testimony / recollection;
- scholarly interpretation;
- contemporary media framing;
- direct visual observation;
- NIGHTSHIFT design inference.

Never present an inference as a historical fact. Scope every claim to its source, place, period and evidence strength. Preserve contradictions and uncertainty.

### Taxonomy: keep dimensions separate

Distinguish:
- practice/activity (tagging, bombing, Getting Up);
- work/formats (tag, throw-up, piece, panel, wholecar);
- lettering and composition grammar (handstyle, bubble forms, Wildstyle, connections);
- material and technique (aerosol, marker, caps, stencil);
- documentation and circulation (blackbooks, photography, zines, video);
- people, crews, institutions, scenes, regions, periods and events.

Do not impose a universal progression such as Tag → Throw-up → Piece. Do not treat Getting Up or Bombing as lettering styles. A tag and a handstyle are related but not identical concepts. A throw-up need not be two-colour or bubble-shaped. Burner is often evaluative praise and its use varies; do not publish it as a fixed lettering category without stronger evidence. Wildstyle must be distinguished as historical name/crew association, ethos/identity and later visual grammar; do not invent a single origin date or inventor.

Regional histories must not be flattened into an NYC-only origin story. The Ruhrgebiet and other local scenes deserve independent evidence and context.

### Rights and originality

- Publicly viewable does not mean reusable.
- Track evidence status, editorial status and rights/license status independently.
- Do not copy historical photographs, scans, tags, writer signatures, crew marks or protected artworks into the product without item-specific rights clearance.
- Do not create writer-cloning presets or reproduce identifiable signatures.
- Use original fictional lettering, synthetic glyphs, commissioned diagrams and invented packaging/brands.
- Do not infer stroke order, speed, cap type, spray distance or working process from static images.

## 4. Current project structure and important documents

### Core editorial and production system

- `docs/BLACKBOOK_ARCHIVE_STYLEGUIDE_01.md`
- `docs/production/PRODUCTION_STANDARD_01.md`
- `docs/production/ARCHIVE_DESIGN_SYSTEM_01.md`
- `docs/production/ARTICLE_PAGE_TEMPLATE_01.md`
- `docs/production/KNOWLEDGE_MODEL_AND_RELATIONSHIP_GRAPH_01.md`
- `docs/production/LETTERING_LEARNING_VIEW_PRODUCTION_BRIEF_01.md`
- `docs/production/ARTWORK_BRIEF_TEMPLATE_01.md`
- `docs/production/UI_WIREFRAME_TEMPLATE_01.md`
- `docs/production/TECHNICAL_SPEC_TEMPLATE_01.md`
- `docs/production/ACCEPTANCE_TEST_TEMPLATE_01.md`

### Archive editorial drafts and source controls

- `research/BLACKBOOK_ARCHIVE_ENTRY_DRAFTS_GERMAN_01.md` through `_06.md` — German editorial drafts; remain drafts until reviewed.
- `research/BLACKBOOK_SAMPLE_ARTICLE_TAG_HANDSTYLE_01.md` — sample article, draft status.
- `research/BLACKBOOK_ARCHIVE_EDITORIAL_AUDIT_01.md`
- `research/BLACKBOOK_ARCHIVE_CLAIM_SOURCE_MATRIX_01.md` — central claim/source control for drafts 01–06.
- `research/README.md` — research library index and editorial method.

### Generator and lettering research/specification

The research library contains the glyph and generator specifications, contracts and proof infrastructure. Relevant documents include:
- `research/GENERATOR_KNOWLEDGE_TRANSLATION_01.md`
- `research/HANDSTYLE_MOTOR_AND_VECTOR_MODEL_01.md`
- `research/HANDSTYLE_PROOF_SHEET_SPEC_01.md`
- `research/LETTER_PAIR_CONNECTIONS_AND_WORD_FLOW.md`
- `research/HANDSTYLE_GESTURE_AND_MOTOR_DYNAMICS.md`
- `research/GLYPH_CONSTRUCTION_LIBRARY.md`
- `research/GLYPH_MASTER_AUDIT_V06.md`
- `research/GLYPH_MASTER_SPECIFICATIONS_A_B_G_R_S.md`
- `research/MASTER_GLYPH_VARIANT_MATRIX_01.md`
- `research/GLYPH_PARAMETER_DEPENDENCY_CONTRACT_01.md`
- `research/GLYPH_GEOMETRY_VALIDATION_CONTRACT_01.md`
- `research/RELATIONSHIP_SOLVER_AND_WORD_COMPOSITION_01.md`
- `research/PERSONAL_STYLE_ENGINE_01.md`
- `research/PROCEDURAL_VARIANT_GENERATOR_CORE_01.md`
- `research/VISUAL_CALIBRATION_AND_COMPARATIVE_EVALUATION_01.md`
- `research/PROOF_SHEET_AND_TEST_FIXTURE_INFRASTRUCTURE_01.md`
- `research/GLYPH_CONSTRUCTION_PIPELINE_01.md`
- `research/STYLE_GRAMMAR_SPECIFICATIONS_01.md`
- `research/STYLE_GRAMMAR_COMPATIBILITY_AND_PARAMETERS.md`

Machine-readable contracts live under `contracts/`, including:
- `ingrid-research-record.v1.schema.json`
- `relationship-solver.v1.json`
- `creative-workflow.v1.json`
- `personal-style-engine.v1.json`
- `az-style-grammar-application.v1.json`
- `procedural-variant-generator.v1.json`
- `visual-calibration.v1.json`
- `proof-sheet-fixtures.v1.json`
- `glyph-construction-pipeline.v1.json`
- `editor-interaction.v1.json`
- `glyph-geometry-validation.v1.json`
- `glyph-parameter-contract.v1.json`

Do not assume a specification is implemented. Check the current code and tests.

### Design assets

- `assets/design/lettering-learning-view-master.svg`
- `assets/design/article-tag-handstyle-analysis.svg`

These are original educational/design assets. Preserve their source files and integrate them rather than recreating duplicates.

## 5. Current research stream: Dortmund / Ruhrgebiet

Dortmund is the current regional pilot, not the boundary of the research programme. The plan is Dortmund → Ruhrgebiet → NRW → national comparison.

Recent additions (15 November 2026):

1. `research/BLACKBOOK_ARCHIVE_CLAIM_SOURCE_MATRIX_01.md` — claim-level evidence, source scope, caveats, editorial readiness and rights controls.
2. `research/DORTMUND_1983_1991_SOURCE_AUDIT_01.md` — source-critical account of *Da kukse wa* (1987), its local Writer-ABC, 1989 media framing, KWI interpretation and INGRID holdings.
3. `research/DORTMUND_STYLE_VISUAL_CODING_RUBRIC_01.md` — visual coding method; no Dortmund style grammar has been established from a new image sample.
4. `research/DORTMUND_VISUAL_CORPUS_AND_SOURCE_ACCESS_01.md` — source access map, updated with current access verification and limitations.
5. `research/INGRID_DORTMUND_SPARQL_QUERY_PACK_01.md` — Dortmund query templates, ontology/converter namespace discrepancies and execution log.

### Current source/corpus state

- **Da kukse wa (1987 / 2020 reprint):** official Dortmunder U *I WAS HERE* 360° route says the brochure can be browsed online. The route was identified, but the viewer could not be opened in the research session due to a browser verification layer. No page-level visual coding has been performed.
- **ALL SURFACE (2022):** specialist listings describe a 244-page Dortmund tag/handstyle book covering the 1980s/1990s, with hundreds of photographs. This is a strong acquisition/inspection lead, not a visual sample. No page-level coding has been performed.
- **IRON CITY (2002):** specialist catalogue describes a 128-page chronology spanning 1983–2002; a Martha Cooper Library / URBAN NATION catalogue route exists. Actual item consultation/availability is unconfirmed. No page-level coding has been performed.
- **INGRID:** published corpus and metadata documentation include Dortmund. The public SPARQL endpoint could not be queried through the available research environment. Query pack has no returned Dortmund result rows. Do not invent counts, distributions or trends.
- **New access follow-up (15 November, second pass):** a full digital documentation route for *Da kukse wa* was found at https://aphoristhma.wordpress.com/da-kukse-wa/; the page explicitly reserves authors'/publisher's rights. Treat it as restricted research access, not a reuse license. The Martha Cooper Library catalogue has an *Iron City* entry, but its live server returned a connection warning, so consultation/availability remains unconfirmed. Current *ALL SURFACE* retail listings confirm an acquisition route but disagree on page count (244 vs. 288); verify against a physical copy. No pages were visually coded and no images were copied in this pass. Details: `research/DORTMUND_VISUAL_CORPUS_AND_SOURCE_ACCESS_01.md`.
- **Dortmund–Amsterdam research dossier (15 November):** `research/DORTMUND_AMSTERDAM_TRANSFER_AND_RUHRGEBIET_01.md` separates Amsterdam's pre-existing late-1970s/early-1980s tagging history, Dortmund's 1987 contemporary documentation and Deckers's later claim about SHARK's mid-1980s Amsterdam visit. The precise influence mechanism and visual effects remain unverified. No shared visual grammar or generator preset is supported. Treat as editorial context; no UI/schema task is implied.
- Historical source wording such as the local 1987 “getting fame” should be retained and attributed; do not silently modernize it to “Getting Up”.
- The KWI description of Dortmund lettering as blocky/clear is a scholarly characterization to test against images, not a universal style rule or mandatory generator preset.

### Visual coding method

Use `research/DORTMUND_STYLE_VISUAL_CODING_RUBRIC_01.md`. Keep:
- visible observation;
- source caption / metadata;
- editorial interpretation;
- rights status

as distinct fields. Sample across date × format × collection, avoid only selecting famous writers, mark duplicates/multiple views, record counterexamples, and do not infer movement or technique from still images.

**No new Dortmund-specific visual frequency or style rule may be claimed until a documented, rights-aware page-level sample has actually been inspected.**

## 6. What has been handed over to Claude

GitHub Issue #7 is the coordination thread:
https://github.com/MrPavian/Nightshift/issues/7

Comments already posted by the project owner / research coordinator include:

- Production standard, templates and lettering learning brief:
  https://github.com/MrPavian/Nightshift/issues/7#issuecomment-6892507431
- Global design system:
  https://github.com/MrPavian/Nightshift/issues/7#issuecomment-6892541819
- Article template and Tag/Handstyle sample article:
  https://github.com/MrPavian/Nightshift/issues/7#issuecomment-6892561342
- Knowledge model and relationship graph:
  https://github.com/MrPavian/Nightshift/issues/7#issuecomment-6892607158
- Claim/source matrix:
  https://github.com/MrPavian/Nightshift/issues/7#issuecomment-6892665336
- Dortmund 1983–1991 source audit:
  https://github.com/MrPavian/Nightshift/issues/7#issuecomment-6892775197
- Dortmund visual coding rubric:
  https://github.com/MrPavian/Nightshift/issues/7#issuecomment-6892826290
- Dortmund source access verification:
  https://github.com/MrPavian/Nightshift/issues/7#issuecomment-6892835718

The research notes are editorial/research context. They are **not** permission to interrupt an active UI task, migrate schemas, redesign navigation or invent new components. Only implement research-derived UI/schema changes when explicitly assigned.

## 7. Current implementation status — verify, do not assume

As of this briefing update, the latest visible Issue #7 comments and recent commit list contained the research coordinator's comments and research commits. No newer Claude implementation report was verified in that check.

Therefore:
- Do not claim a feature is implemented based only on a brief/spec.
- Before starting work, inspect the current default branch, recent commits, open PRs and Issue #7 comments.
- Identify the current active implementation task and whether Claude has already changed files.
- Do not overwrite or duplicate ongoing work.
- If the owner says a task has been skipped or reprioritized, preserve that decision and report the dependency/risk rather than silently reverting it.

## 8. Working priorities

Use this order unless the owner explicitly changes it:

### P0 — protect and stabilize the product foundation
- Read this file and the binding styleguide/production standard.
- Inspect current implementation, architecture and existing components before coding.
- Avoid duplicate design systems, duplicate templates, parallel data models and unnecessary dependencies.
- Preserve working functionality and backward compatibility.

### P1 — archive reference implementations
- Complete or audit the lettering learning view against its production brief.
- Complete or audit the sample article page against the article template.
- Consolidate shared components only after both reference pages have been reviewed.
- Keep the German UI, responsive behavior, keyboard/touch support and source panels consistent.

### P1 — knowledge model
- Audit the actual current schema and content model against `KNOWLEDGE_MODEL_AND_RELATIONSHIP_GRAPH_01.md`.
- Report existing fields, missing fields and a backward-compatible recommendation.
- Do not perform schema migration or auto-create relationships without explicit approval.

### P1 — research-led content quality
- Use the claim/source matrix before promoting drafts.
- Keep draft content in draft status until claims, sources, editorial quality and rights have been checked.
- Keep Dortmund visual research separate from implementation until the owner assigns a concrete translation task.

### P2 — later archive features
- Timeline, scene maps, relationship graph UI, richer visual archive and expanded regional comparisons follow after the core reference views and shared patterns are stable.
- Do not build empty shells or speculative features merely to make the roadmap look busy.

## 9. Required workflow for every Claude task

At the start:
1. Read `CLAUDE.md`.
2. Read the relevant binding specification and task brief.
3. Inspect current branch, working tree, latest commits, open PRs and relevant Issue #7 discussion.
4. State the exact task, assumptions, dependencies and files likely to change.
5. Check whether an existing component, schema or asset already solves the problem.

During work:
- Prefer small, coherent, reviewable changes.
- Do not introduce new dependencies or architectural patterns without explaining why.
- Keep all visible UI text German.
- Preserve source provenance and rights metadata.
- Do not use copyrighted or identifiable writer material as a generator reference.
- Keep research notes, UI requirements and implemented behavior distinct.
- Add tests for behavior and regression risks.

Before reporting completion:
- Run the relevant tests and build; report exact commands and results.
- Inspect console/build output and data integrity.
- Verify desktop, tablet and mobile.
- Verify keyboard and touch operation, focus, contrast and reduced-motion behavior where relevant.
- Capture useful screenshots/proofs.
- Report changed files, commit SHA, test results, known issues and deferred items.
- Update this `CLAUDE.md` if project status, priorities, decisions, file inventory or handoff links have materially changed.
- Update the relevant README/index and add a concise status comment to Issue #7 when the task changes shared project state.

## 10. Mandatory completion report format

Every implementation handoff must include:

1. **Status:** complete / partial / blocked.
2. **What changed:** concise explanation of user-visible and technical behavior.
3. **Files changed:** exact repository paths.
4. **Commit:** full SHA and link.
5. **Tests:** exact commands, pass/fail counts and skipped tests with reasons.
6. **Proofs:** desktop/tablet/mobile evidence where UI changed.
7. **Accessibility:** keyboard, focus, touch, contrast and reduced-motion checks.
8. **Known limitations:** bugs, assumptions, unverified content and follow-up work.
9. **Next recommended task:** one concrete next step.

Never say “done” when only a design/specification exists or when tests/proofs are missing.

## 11. Maintenance rule for this briefing

This is a living handover document, not a one-time prompt.

Whenever new research, design, code, assets, tests, architectural decisions or priorities are added:
- update the relevant section here;
- list newly created or materially changed files;
- record commit SHAs and issue/PR links;
- update the current state and next priorities;
- remove or mark superseded information rather than letting contradictory instructions accumulate;
- preserve dated history where useful.

At the beginning of each new session, use this file as the first orientation point, then verify the live repository state. This file can be stale between updates; the repository and latest owner instructions remain authoritative.


## 12. Research update — SHARK / Amsterdam source chain (15 November 2026)

The Dortmund–Amsterdam dossier has a new section 7. The *ALL SURFACE* publisher description attributes to SHARK a mid-1980s Amsterdam visit, the observation of a fully bombed city and the ambition to bring that citywide visibility to Dortmund. Treat this as a retrospective account attributed to SHARK, not a verified verbatim primary-source transcript: the page does not identify the original interview, interviewer or date. KWI note 4 points to Markus Wiese, *Iron City: Graffiti Dortmund* (2002), for Dortmund history but does not identify a separate source for the Amsterdam anecdote. Mark Gmehling's 2015 interview provides independent context about Dortmund's early scene visibility, not corroboration of the visit. The underlying SHARK testimony and the precise visual/social mechanisms remain open.

New/updated research file: `research/DORTMUND_AMSTERDAM_TRANSFER_AND_RUHRGEBIET_01.md` (section 7). Research index updated. No images copied or coded; no rights status changed; no generator preset or visual grammar authorized. Continue implementation priorities independently; this research note is context, not an instruction to interrupt active UI work.


## C03 — Style grammar resolver (18 November 2026, Claude)

Branch `claude/c03-style-resolver`, stacked on the C02 waves (#6 → #11 → #12 → #13).

- **Implemented:** `src/style/resolver.js` and `src/style/polygon.js`, with contract `contracts/style-resolver.v1.json`.
- **Results for all 26 authored masters:**
  - Bubble and Blockbuster change the monochrome geometry of every letter.
  - Straight changes 13 letters (curves and sharp corners). The other 13 have right angles only; they are reported unchanged, with that reason.
  - Wildstyle is a study mode. The interlocking step is skipped with a reason, because it needs C04.
- **Axes stay separate:** practice context and rendering never change geometry. Blockbuster = straight letterform + block-fit composition.
- **Guarantees:**
  - Masters are never mutated. Derived records are `reference-only`.
  - Every step is validated: hard checks pass, the counter count is unchanged, and the glyph is one connected part.
  - The parameters are uncalibrated grammar defaults.
- **Proofs and docs:** `docs/reports/proof/C03/`, `docs/C03_STYLE_RESOLVER_REPORT.md`, `tests/style-resolver.test.js`.
- **Not done:** a style switch in the editor or studio UI (C08), identity-specific checks such as the G/C apertures (only hard checks and counter count are checked), and human review of how the shapes look.
