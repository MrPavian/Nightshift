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


## 13. Research update — Calligraphy and embodied lettering (15 November 2026)

New dossier: `research/CALLIGRAPHY_GRAFFITI_LETTERING_FOUNDATIONS_01.md`. Treat calligraphy as a distinct foundation area for letter construction and handstyle research, not as a synonym for graffiti or a single decorative style. Separate visible letterform from ductus/movement, tool behavior, handstyle and presentation layers. Daniel Berio's 2021 AutoGraff dissertation is a key research bridge for tag flow, repetition, muscle memory and calligraphic practice; Alice Mazzilli (2025) offers a theoretical account of cursive rhythm and stylewriting; the 2020 *Handstyle as social meaning* study cautions that handstyle also carries social/evaluative meaning. Nib angle, pressure and contrast cannot be transferred mechanically to aerosol. Static images do not establish stroke order, speed or tool movement. For MrPavian, study form and movement separately, compare a controlled calligraphic exercise with a free handstyle exercise, then transfer only abstract, original principles into throw-up/block/piece exploration. Research context only; no identifiable writer copying and no authorization to interrupt active implementation.


## 14. Letter Construction Academy — new production standard (15 November 2026)

A new structured learning stream has been established: **NIGHTSHIFT Letter Construction Academy**. It develops letter knowledge systematically from basic construction through alphabet, numerals, calligraphy/ductus and original graffiti lettering interpretation.

**Binding production file:** `docs/lettering/MASTER_CONTROL_PROMPT_01.md`

**Archived visual overview:** `assets/design/letter-construction-academy-overview.svg`

The master prompt defines a consistent nine-part study for each character:
A) Grundform; B) Buchstabenanatomie; C) Proportionen und Raster; D) Konstruktionsanalyse; E) Formvariationen; F) Formcharakter; G) Kalligrafie und Duktus; H) Graffiti-Transfer; I) Lernkontrolle.

Production rules:
- Use the master prompt for every individual letter and numeral study. Do not improvise a new layout or omit sections.
- Begin with uppercase A–Z, then lowercase a–z and numerals 0–9, unless the owner explicitly changes the sequence.
- The A is the first reference character; validate its study before treating it as the final visual benchmark for the series.
- Keep neutral construction separate from style interpretation. Form, ductus/movement, tool behavior and presentation effects are separate dimensions.
- Use German labels, light neutral paper, subtle grid, black primary drawing, violet construction lines and yellow guides.
- Preserve anatomy specific to each character; never force all glyphs into one identical geometric recipe.
- Do not infer stroke order or movement from a static contour. Do not copy identifiable writers, signatures, crews or existing pieces.
- The nine-section template is a production requirement for the Academy, not a claim that every letter shares the same construction logic.

This Academy is a new educational/editorial workstream. It complements the existing generator glyph specifications and the earlier `LETTERING_LEARNING_VIEW_PRODUCTION_BRIEF_01.md`; it does not silently replace or authorize changes to the generator architecture or active implementation tasks. Before implementation, inspect the current app and ask whether the owner has assigned a concrete integration task.

**Recent commits:** master prompt `c1ef3a171e4f29ad4ea005c4f567dcbbc2d3c71f`; visual overview `5cca1e26f13b972cd1bb33aa44852367a489fa7a`.


### First Academy study — A (15 November 2026)

Created the first nine-section study asset:
- `assets/design/letter-study_A_01.svg`

This is the first structured SVG study and a layout/content prototype, not yet a final validated teaching reference. The visual image-generation experiment is illustrative; its text and diagrams require human editorial review. In particular, verify all anatomy labels, proportions and construction sequence before using it as a canonical reference. Keep the master prompt authoritative and correct this first study before scaling to B–Z.


### A study — first QA correction pass (15 November 2026)

The initial A prototype was reviewed against the master prompt and corrected in `assets/design/letter-study_A_01.svg`:
- anatomy labels now distinguish left/right diagonal strokes, apex, crossbar, counter/negative space and feet/terminals;
- construction analysis now depicts five stages rather than showing fewer diagrams while naming five steps;
- the variation panel now contains five distinct schematic variants;
- proportion language explicitly treats width and crossbar position as design choices, not universal ratios;
- movement/ductus inference is qualified rather than implied as fact.

Latest SVG commit after proportion-panel reflow and visibly differentiated variation geometry: `2032b556cc1b25d4373de0c798f5aa07120d3992` (subsequently verified at blob `bda38d5ecd160c63122db078dda4402890af6340`).

This is a content-structure correction pass, not yet a full visual/rendering sign-off. Before A becomes the canonical benchmark, inspect the rendered SVG at actual A4 landscape size, check label collisions/clipping and verify that the diagrams communicate the five construction stages unambiguously. Do not scale the study to B until that review is complete.


**Second QA pass:** proportion panel labels and diagram were rearranged to avoid the long explanatory line running beyond the panel; the five form variants now visibly differ (narrow, wide, slanted, raised crossbar, organic crossbar). Structural checks confirm all nine sections, expanded anatomy labels and qualified ductus language. A rendered print-size visual inspection is still outstanding; do not describe the sheet as fully print-approved yet.


### A study — graffiti-led redesign (15 November 2026)

Owner feedback clarified that the Academy must teach graffiti lettering as its destination, not present a typography/calligraphy worksheet with a small graffiti-transfer panel. The previous A study is superseded by a graffiti-led redesign.

- `docs/lettering/MASTER_CONTROL_PROMPT_01.md` updated to version 1.1. Graffiti lettering is now the explicit educational destination; the nine sections give substantial weight to original graffiti letterform variations, handstyle and practical graffiti application.
- `assets/design/letter-study_A_01.svg` redesigned as a Graffiti Lettering Lab sheet. The three application directions are presented as parallel exercises, not a Tag → Throw-up → Piece progression.
- Master prompt commit: `930ef1c9553c7efcd03c729b6e6bed5d74f34e38`.
- A study SVG commit: `63aba05c04b7c3c2aeb77ffbc1af689dbf4b4181`.

This is a new content/layout direction, not print approval. The current SVG still requires exact rendered-size visual inspection and further refinement of the graffiti examples: ensure they read as distinct, convincing original letter constructions rather than schematic placeholders. Do not begin B until the owner has reviewed and approved A.


### Owner-approved visual direction — blackbook reference (15 November 2026)

The owner explicitly selected the supplied gritty nine-panel graffiti infographic as the preferred Academy reference. This supersedes the sterile/light technical worksheet look of the previous SVG prototype.

**New binding visual standard:** `docs/lettering/GRAFFITI_ACADEMY_VISUAL_STYLE_STANDARD_01.md`  
**Updated master prompt:** `docs/lettering/MASTER_CONTROL_PROMPT_01.md`, version 1.2.

Visual requirements:
- A4 landscape; expressive NIGHTSHIFT masthead and character-study title.
- Three-column × three-row arrangement of nine numbered panels, plus header and footer.
- Warm distressed paper / concrete-like texture; bold black marker headings and outlines.
- Yellow highlighter as the dominant accent; violet/purple for construction lines, arrows and selected paint accents.
- Original graffiti blackbook character, controlled spray splashes and drips; never sacrifice legibility.
- Panels 5 and 8 must contain substantial original graffiti lettering, not typed glyphs or token decorative effects.
- Panel 8 for A should include clearly distinct throw-up-oriented, block-style and piece/Wildstyle-oriented design directions. They are parallel approaches, not a mandatory progression.

**Factual corrections required when translating the reference into teaching content:**
- Treat all percentage ratios as example values for the drawn letter, not universal proportions.
- Do not use “X = Mittellinie” as a generic uppercase-A guide. Explain guides by function; x-height belongs to lowercase proportion systems.
- Do not state that an A universally consists of three main movements. Static diagrams do not establish stroke count/order, pressure, speed, tool angle or aerosol process.
- Correct and character-specific anatomy takes priority over literal copying of errors in the reference image.

The approved image is the visual target, not a license to copy other artists' work. All graffiti letterforms must remain original fictional designs. The previous A SVG is not yet a faithful implementation of this new look and must be redesigned against the visual standard. Keep the owner approval gate: do not scale to B until A is reviewed and approved.

**Style-standard commit:** `2c8e3714121e23fe854b21f3d5b39a427d03f765`  
**Master-prompt v1.2 commit:** `589b41a0119b48091bdd72c7ddcaf71a360e712d`.


### A study — first blackbook-style SVG implementation (15 November 2026)

The owner asked to proceed with the approved graffiti blackbook reference. A new vector-first implementation has replaced the previous sterile A study in `assets/design/letter-study_A_01.svg`.

**Implemented in the current SVG:**
- A4 landscape vector canvas (297 × 210 mm; 1680 × 1188 viewBox).
- NIGHTSHIFT masthead, A study title, master-reference panel and footer.
- Nine numbered learning panels in a three-column / three-row composition.
- Warm paper, speckle/grain overlay, bold black marker-style panel bars, yellow numbered markers, violet construction lines and restrained edge paint.
- Neutral A construction, anatomy, character-specific proportions, five form variations, form-character comparison, calligraphy/tool comparison and practical learning tasks.
- Three original, visually differentiated graffiti directions in panel 8: throw-up-oriented, block-style and piece/Wildstyle-oriented.
- Construction panel revised to show five explicit stages: skeleton, stroke body, crossbar, contour and fill.
- Editable SVG text and vector paths; no external image dependencies.

**Commits:**
- Initial blackbook redesign: `759403376d4db46b3b72a544a59dc5439f07ad67`
- Five-stage construction clarification: `77ca12ccdfa4f2e5ef897741e467b44d0ae3122b`

**QA status: PARTIAL — not print-approved.**
- Repository file was re-fetched after the update and current blob confirmed.
- Structural content is present: nine numbered panels, three graffiti directions and five construction stages.
- Exact rendered visual inspection at A4 and 100% has not yet been completed in this session. Therefore do not claim print readiness or owner approval.
- Before handoff, render the exact current SVG (not a reconstruction), inspect text collisions/clipping, anatomy leader targets, panel 4 sequence, graffiti silhouettes and print contrast. If needed, adjust text sizing and panel 8 composition.
- Check that the paper texture filter renders acceptably in target SVG/PDF renderers; provide a clean print variant with texture disabled if it compromises output.
- Do not proceed to B until the owner has reviewed and approved the A sheet.


### A study — print test and first visual QA (15 November 2026)

The current A SVG was fetched from the repository, rendered at 1680 × 1188 (A4 landscape ratio) and visually inspected. The first render exposed two clear layout issues: panel 6 heading exceeded its available width, and the panel 8 footer rule collided with the captions. The piece/Wildstyle example also read too abstractly.

**Corrections committed:**
- Panel 6 heading reduced to fit its bar.
- Panel 8 separator line removed to protect the labels and footer note.
- Piece/Wildstyle A redrawn with a clearer A silhouette, internal counter and directional extensions.

**Latest A SVG commit:** `f6a4ad3494ecb8e78ee9c6872731ff6ab63a2539`  
**Current SVG blob:** `0ae4a9042f49561a1f7e27600daca94bc20f70bf`

**Visual QA result: first layout test passed after corrections, but A is not yet owner-approved or final print-approved.**
- Nine-panel hierarchy, title/header, panel borders and footer remain legible in the rendered proof.
- Panel 6 heading now fits.
- Panel 8 captions are no longer crossed by a rule.
- Graffiti panel presents three distinguishable A directions; piece/Wildstyle silhouette is more legible.
- At this scale, panel 8 footer note sits close to the lower border; keep an eye on it in PDF/export.
- The five-step construction panel still needs a stronger didactic distinction between stages 4 (contour) and 5 (filled final form); inspect and refine before approval.
- Anatomy leader lines and labels should receive a final close-up check at 100%.
- The grain filter is subtle; test in the actual PDF export path and retain a clean print variant if filter support or contrast is inconsistent.

Next: perform a 100% crop inspection of panels 2, 4 and 8, refine the construction sequence and graffiti examples if necessary, then export a print proof. Do not start B before owner approval.


### Owner reference set A–Z and work split (16 November 2026)

The owner handed over the complete approved uppercase reference set (26 sheets, developed with ChatGPT and approved by the owner). It is stored as a style and layout reference in `assets/design/reference/academy-uppercase/`: `A.webp`–`Z.webp`, plus `manifest.json` with the original PNG hashes and a `README.md` stating what the set may and may not be used for.

- The set is a visual and compositional target only. It is **not** a factual source: its generated texts contain known errors, which the studies must correct.
- It is not to be traced and not to be shipped as a product asset.
- **Owner decisions, 16 November 2026:**
  - Claude rebuilds the A study (`assets/design/letter-study_A_01.svg`) against this reference first, then continues with C03.
  - ChatGPT works in parallel on lowercase letters and numerals.
- The approval gate stays: B–Z studies only after the owner explicitly approves A.
