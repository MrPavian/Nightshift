# THE BLACKBOOK ARCHIVE — Joint Work Order & Delivery Plan 01

**Status:** Binding work order for the archive workstream, aligned with NIGHTSHIFT 1.0 and C06.  
**Owners:** ChatGPT — research/editorial specification/independent QA. Claude — implementation/content pipeline/UI/tests. Project owner — final editorial and visual approval.  
**Repository:** `MrPavian/Nightshift`  
**Primary implementation issue:** https://github.com/MrPavian/Nightshift/issues/7

## 1. Current repository baseline (audited 2026-11-15)

### Existing specifications
- Global editorial framework and historical narrative arc.
- Information architecture, audiences, taxonomy, navigation and entry layout.
- Archive roadmap with phases A–H.
- C06 implementation ticket and 30-entry editorial launch plan.
- Research README with evidence and editorial rules.
- Existing research dossiers across NYC, Philadelphia, regional/global scenes, Ruhrgebiet/Dortmund, handstyle, materials, lettering, media and archival provenance.

### Existing content
- 30-entry curated launch register: six clusters (history/circulation 6; scenes 5; practices/styles/formats 8; materials/learning/documentation 4; people/cultural actors 5; glossary/editorial method 2).
- Six editorial copy drafts across two documents:
  1. emergence of modern name-writing;
  2. Philadelphia;
  3. women in the writing scene;
  4. New York subway writing;
  5. global circulation and local adaptation;
  6. the blackbook.
- These six are drafts, not publication-approved entries. The 30-entry register is a target and editorial scope, not 30 finished articles.
- The existing 6-record content pilot demonstrates a record shape but does not replace claim-level verification.

### Implementation status
The inspected specifications explicitly state that no archive UI/content pipeline implementation is claimed yet. The C06 issue is open in the inspected repository state. Do not assume that a visible prototype, working search, timeline, map, offline mode or editor bridge exists until Claude proves it against the current branch.

## 2. Gap assessment — what is still missing

### P0 — Must be resolved before publication
1. **Claim-level source audit:** six drafts need exact source/page/section references for each historical claim; broad bibliography alone is insufficient.
2. **Editorial decisions:** no draft is approved. Resolve every review checklist item and assign editorial/evidence/rights states independently.
3. **Structured content model:** stable IDs, aliases, typed relations, date claims, source records, claim ledger, evidence state, editorial state and image-rights metadata must validate.
4. **Publishable entry coverage:** 24 of the 30 launch entries have no full editorial draft in the inspected draft documents.
5. **Visual rights and original diagrams:** no item-level image clearance is evidenced by the six drafts; create original teaching diagrams and keep external images link-only unless cleared.
6. **Timeline data:** the content plan needs typed events and date confidence, not just dates embedded in prose.
7. **Regional balance:** the launch list includes Philadelphia, NYC, Amsterdam, Paris and São Paulo, but does not yet include a dedicated Germany/Ruhrgebiet scene entry despite substantial research already existing. Decide whether to add/replace an entry in the 30-entry cap; do not silently expand the count.
8. **Terminology integrity:** distinguish practice, letterform grammar, composition grammar, artwork format, surface, material, and cultural/evaluative descriptors throughout content and UI.

### P1 — Required for a convincing archive experience
- Working global search including aliases and local terminology.
- Faceted filters with removable active states.
- A genuinely navigable timeline with parallel regional tracks and uncertainty markers.
- Scene/region pages and comparison views.
- At least three end-to-end learning paths.
- Original interactive diagrams with static fallbacks.
- Related-entry navigation with typed relationship labels.
- Responsive, accessible archive UI with robust back/forward navigation.

### P2 — Only if 1.0 scope and schedule permit
- Favorites, reading history and personal collections.
- Advanced relationship graph visualization.
- Audio/video player integrations.
- Additional regions beyond the curated launch edition.
- Elaborate 3D or animated archive presentation.

## 3. Binding design authority

The first six existing article drafts have now been audited in [Editorial Audit 01](../research/BLACKBOOK_ARCHIVE_EDITORIAL_AUDIT_01.md). Treat its per-entry corrections and publication blockers as the current editorial review instructions. The six entries remain drafts until those checks are resolved.


Claude must implement [BLACKBOOK_ARCHIVE_STYLEGUIDE_01.md](BLACKBOOK_ARCHIVE_STYLEGUIDE_01.md) together with:
- [Global Editorial Framework 01](BLACKBOOK_ARCHIVE_GLOBAL_EDITORIAL_FRAMEWORK_01.md)
- [Information Architecture 01](BLACKBOOK_ARCHIVE_INFORMATION_ARCHITECTURE_01.md)
- [Content Pilot 01](../research/BLACKBOOK_ARCHIVE_CONTENT_PILOT_01.md)
- [Blackbook Archive Roadmap](BLACKBOOK_ARCHIVE_ROADMAP.md)
- [C06 issue #7](https://github.com/MrPavian/Nightshift/issues/7)

The styleguide is the visual/interaction authority. If older archive notes conflict with it, follow the styleguide unless the project owner explicitly changes direction. The editorial framework remains authoritative for historical framing, evidence and rights.

## 4. Role split

### ChatGPT — research, editorial preparation and independent QA
I own:
- maintain the finite gap register and prioritization;
- audit the six existing drafts claim by claim against the cited source material;
- prepare publishable editorial drafts for the 24 remaining launch entries in prioritized batches;
- deepen the Germany/Ruhrgebiet scene comparison and recommend a 30-entry register adjustment;
- produce original diagram briefs and interaction/learning specifications;
- define test cases for search, aliases, timeline dates, regional comparison, related-entry integrity, accessibility and rights states;
- review Claude's schema, data, UI, tests and completion reports;
- flag unsupported claims, taxonomy drift, false precision and fake functionality.

I do not own production implementation or claim browser/accessibility tests unless actually run. I do not approve final editorial or creative quality on the owner's behalf.

### Claude — implementation and release engineering
Claude owns:
- inspect live repo and reconcile existing implementation before writing code;
- build the versioned schema, source/claim model and deterministic research-to-archive pipeline;
- implement archive navigation, search, filters, entry pages, timeline, scenes, learning paths and original diagrams;
- implement responsive/accessibility behavior and offline packaged content;
- implement editor bridge only for verified capabilities;
- create and run unit, schema, integration, browser, accessibility and content-integrity tests;
- produce proof artifacts, exact test totals and changed-file/commit report.

Claude must not invent content, rights clearance, generator features, timeline dates or completed functionality.

### Project owner
- final visual approval against the styleguide and proof build;
- final editorial approval for public/archive copy;
- resolves only genuine content selection or design trade-offs that cannot be decided from existing agreements.

## 5. Work sequence and gates

### Stage 0 — Repository reconciliation (Claude, first)
- Inspect current branch, issue #7, all archive files, current code and latest commits.
- Report what is actually implemented, what is only specified and what is missing.
- Identify current C06 ticket progress and do not repeat completed work.
**Gate:** concise verified baseline with paths, commit and runnable commands.

### Stage 1 — Lock content model and editorial register (ChatGPT + Claude)
- ChatGPT audits the 30-entry register for balance, taxonomy and coverage; proposes a single bounded revision if necessary.
- Claude defines/validates the canonical schema and stable IDs.
- Agree on source, claim, date, relation, rights and publication-state contracts.
**Gate:** schema validation and one end-to-end sample entry generated from research source material.

### Stage 2 — Editorial content completion (ChatGPT leads, Claude integrates)
Priority batch A:
- audit and finalize the six existing drafts;
- add dedicated Ruhrgebiet/Germany entry or explicitly document why another launch entry is replaced;
- complete the core glossary and style/practice distinctions.
Priority batch B:
- remaining NYC/Philadelphia history and people entries;
- regional comparison entries;
- materials, documentation, blackbook and provenance entries.
Priority batch C:
- final people/crew entries only where first-person or institutional evidence is sufficient.
**Gate:** 25–35 reviewed entries, target 30; each with claim-level provenance, editorial state, evidence state and rights state. No filler entries to hit the number.

### Stage 3 — Content pipeline (Claude)
- Convert approved Markdown/source records deterministically to archive data.
- Validate IDs, aliases, required fields, typed relations, source references, date claims and status rules.
- Exclude draft/unapproved entries from production bundle by default.
- Add broken-link and orphan-entry checks.
**Gate:** reproducible build; validation report; no duplicate IDs or dangling references.

### Stage 4 — Core archive UX (Claude)
Implement in this order:
1. global shell/navigation and Discover;
2. search, aliases and filters;
3. standard entry page and sources/evidence panels;
4. related-entry navigation and learning paths;
5. timeline with date confidence and regional lanes;
6. scenes and regional comparisons;
7. visual archive and rights-aware image presentation.
**Gate:** all core flows work on desktop and mobile; no placeholder controls or dead ends.

### Stage 5 — Visual learning and interaction (ChatGPT specs, Claude build)
- Implement original diagrams: letter anatomy; Bubble/Straight/Block comparison; composition relations; format/surface; aerosol system.
- Add keyboard/touch interaction and static labelled fallback.
- Add compare mode only where the concepts are genuinely comparable.
**Gate:** diagrams teach a specific concept, preserve taxonomy and work without hover.

### Stage 6 — Accessibility, offline and performance (Claude)
- WCAG 2.2 AA audit; keyboard-only pass; reduced-motion pass; mobile reflow.
- Package/cache archive data and local assets for offline reading.
- Verify deep links, back/forward and scroll restoration.
**Gate:** test report with defects and fixes; offline behavior verified, not assumed.

### Stage 7 — Generator bridge and final integration (Claude, later dependency)
- Keep bridge contracts capability-based and versioned.
- Enable only links to implemented, verified editor capabilities.
- Final bidirectional integration belongs to C07 after C02–C05 are complete.
**Gate:** at least three real bidirectional links tested against real capabilities; otherwise show no active link.

### Stage 8 — Editorial and visual release review (ChatGPT + owner)
- ChatGPT audits claims, citations, taxonomy, links, statuses and test evidence.
- Owner reviews visual direction, representative entries and learning flow.
- Claude fixes release-blocking defects and prepares release candidate.
**Gate:** sign-off checklist complete; unresolved limitations listed explicitly.

## 6. Acceptance test matrix

### Content and trust
- Every factual claim in published copy has a source record and traceable citation.
- No unsupported “first”, “invented by”, universal or single-origin claims.
- Date types and uncertainty survive data conversion.
- Editorial, evidence and image-rights states remain independent.
- No unlicensed image is bundled.
- No duplicate stable IDs, missing aliases or broken related-entry references.
- Women and underdocumented participants are integrated into main histories, not tokenized.

### Navigation and learning
- Search finds exact titles, aliases, local terms and alternate spellings.
- Filters can be removed and do not destroy the current query.
- Every published entry has a path back to its parent view and meaningful next links.
- Three learning paths work from first step to completion.
- Timeline events open correct entries and represent uncertain dates honestly.
- Regional comparisons do not imply that scenes are copies of NYC.

### UI and accessibility
- Desktop, tablet and mobile layouts are usable.
- Keyboard navigation reaches every control and shows focus.
- No hover-only information or colour-only meaning.
- Reduced motion and static diagram alternatives work.
- Text contrast, zoom/reflow, image alt text and heading hierarchy are checked.
- No visible control is inert.

### Technical and release
- Deterministic content build and schema validation pass.
- Search, timeline, routes, offline and editor bridge have automated or documented manual tests.
- Exact commands, test totals, build version and commit SHA are reported.
- No placeholder content or dead routes remain.

## 7. Reporting format

Every Claude report must state:
1. status: complete / partial / blocked;
2. commit SHA and changed files;
3. features implemented versus only specified;
4. exact commands and test totals;
5. content counts by type and region;
6. schema, provenance, rights and link validation totals;
7. screenshots/proof artifacts;
8. accessibility and offline results;
9. known gaps and owner approvals still required;
10. next smallest valid task.

## 8. Stop conditions and scope protection

- Do not exceed the curated 30-entry launch target without replacing an entry or explicit owner approval.
- Do not create more research dossiers unless they fill a named launch gap.
- Do not build an advanced 3D archive room before search, entry reading and timeline work.
- Do not fake archive-to-generator links.
- Do not publish a draft because its UI card looks finished.
- Do not use images without item-level rights evidence.
- Do not claim global completeness; describe the edition as curated and selective.
- If source access is insufficient, publish a narrower qualified entry or defer it.

## 9. Immediate next actions

1. **Claude:** reconcile C06 against the current repository and implement the schema/content pipeline first; do not start with decorative UI.
2. **ChatGPT:** audit the six existing drafts and prepare the next prioritized batch of launch entries, including the Ruhrgebiet/Germany coverage decision.
3. **Claude:** after the first validated content pipeline, build the core archive shell, search, entry pages and navigation.
4. **ChatGPT:** review each implemented stage against the acceptance matrix and supply precise corrections.
5. **Owner:** approve the visual direction and editorial sample before the full 30-entry bundle is treated as final.
