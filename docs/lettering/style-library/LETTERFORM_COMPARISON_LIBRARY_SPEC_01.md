# Letterform Comparison Library — Product and Data Specification 01

**Status:** Research/product specification; implementation not started.  
**Owner split:** ChatGPT — research records, observation quality, editorial QA. Claude — schema/pipeline, archive UI, tests and integration. Project owner — final product and visual approval.  
**Target product:** THE BLACKBOOK ARCHIVE inside NIGHTSHIFT.  
**Language:** de-DE for all visible UI and editorial text.

## 1. Product decision

The Letterform Comparison Library is a first-class, browsable research area inside the existing Blackbook Archive. It is not a second standalone website, a detached moodboard, or a replacement for the archive's current visual archive.

It extends the existing **Stile & Buchstaben** and **Bildarchiv** areas with a dedicated comparison experience:

- **Fundstücke:** browse inspected archival objects, blackbook pages, outlines, zines and publication spreads.
- **Buchstabenvergleich:** compare the same confidently identified glyph across independent specimens.
- **Konstruktionsvergleich:** compare structural features such as rounded/angular mass, counters, bar logic, overlap, extensions and negative-space channels.
- **Wort- und Paarbeziehungen:** compare pair rhythm, attachment points, overlaps and word-level flow only where the visible evidence supports it.
- **Erkenntnisse:** show carefully scoped construction hypotheses and their evidence, uncertainty and possible generator relevance.

The library should make the research useful to archive readers, lettering learners, researchers and NIGHTSHIFT's generator work. It must not turn a writer's identity or a specific artwork into a generator preset.

## 2. Relationship to the existing archive

The existing /archive/ application, src/archive/ deterministic builder, research/archive/de/ editorial entries and data/archive/archive.v1.de.json remain the canonical archive product and publishing pipeline.

The comparison library should be integrated into the existing archive:
- place it under **Stile & Buchstaben**, with discoverable links from **Bildarchiv** and relevant construction entries;
- do not add a separate top-level application or duplicate the archive shell;
- reuse the current German navigation, design system, source/evidence panels, responsive behavior and route conventions;
- add a dedicated comparison route and entry type only if the current schema cannot represent the feature cleanly;
- retain the existing research manifest as the source register for its current item-level corpus. Do not manually duplicate source metadata into a second editable register.

Suggested user-facing route labels: **Buchstaben vergleichen**, **Fundstücke**, **Vergleichslabor**. Final wording is subject to the existing archive styleguide.

## 3. Core user journeys

### A. Browse the collection
1. Open Stile & Buchstaben → Buchstaben vergleichen.
2. Browse cards/list records for individually inspected objects.
3. Filter by letter, candidate grammar, visible construction feature, period, place, medium, source type, review state and rights state.
4. Open an object record to read what is actually visible, what is inferred, and what remains unknown.
5. Open the original institution/source in a new tab where permitted.

### B. Compare one letter across specimens
1. Select a glyph A–Z.
2. Show only specimens where that glyph is explicitly transcribed and sufficiently legible.
3. Select two or more independent observations.
4. Compare proportions, skeleton, counters, terminals, stroke/bar structure, slant, symmetry/asymmetry, negative space and confidence.
5. Open provenance and original source for each specimen.

Do not infer an unseen letter from a partially legible word. Do not silently treat an unreadable/cropped glyph as a valid comparison sample.

### C. Compare construction ideas
Allow comparison by observable structural features, not only by named style:
- rounded ↔ angular;
- open ↔ closed counters;
- simple ↔ interlocking construction;
- compact ↔ extended proportions;
- isolated ↔ connected forms;
- flat outline ↔ dimensional treatment;
- regular ↔ irregular rhythm.

These are descriptive axes, not quality scores or universal style definitions.

### D. Learn and transfer
An observation may link to an original NIGHTSHIFT teaching diagram or a generator study. A generator action is visible only when its capability is implemented and validated. The source artwork itself is never used as geometry to trace or clone.

## 4. Data model requirements

Keep three entities separate:

1. **Source object** — the archive object/publication/page and its provenance.
2. **Visual observation** — what was directly seen on that specific object.
3. **Comparison finding** — a cross-object interpretation with explicit evidence and limits.

Minimum source-object fields:
- stable specimen ID;
- source record ID and item URL;
- archive title, creator/writer credit, photographer/publisher credit;
- date and date confidence;
- place and place confidence;
- object/page/issue identifier;
- medium/execution format;
- rights status and permitted display mode;
- visual review status and access date.

Minimum visual-observation fields:
- observation ID and specimen ID;
- visible text exactly as read, plus transcription confidence;
- individually identified glyphs (A–Z) with legibility/confidence;
- letter anatomy observations;
- word/pair/composition observations;
- structural feature tags;
- direct-observation vs interpretation label;
- confidence and reviewer note.

Minimum comparison-finding fields:
- stable finding ID;
- compared observation IDs;
- comparison axis;
- concise finding;
- evidence basis;
- confidence;
- counterexample/limitation;
- generator relevance (none / research lead / study candidate / validated capability);
- editorial state.

Do not use a single broad candidate-grammar-tags field as a substitute for glyph-level observations. A style label on an object does not prove that every visible glyph belongs to that grammar.

## 5. Evidence and quality gates

Maintain independent states for:
- source/provenance verification;
- visual inspection quality;
- glyph transcription confidence;
- interpretation confidence;
- editorial approval;
- image rights.

Recommended visual states:
- catalogue_metadata_only
- image_preview_seen
- hi_fi_image_opened_and_inspected
- physical_item_inspected

A specimen can be browsable as an object while being ineligible for glyph comparison. For example, a magazine cover, multi-piece production, unreadable/cropped word, or small photo montage may be a useful composition/reference record but not a glyph-level sample.

Comparison eligibility requires:
- image/page actually inspected at sufficient size;
- specific glyph identity confidently transcribed;
- observation tied to exact specimen and source;
- limitations documented;
- no claim that exceeds the visible evidence.

No ranking, score, “best writer” metric, or universal style classifier. Do not collapse historical source terminology and NIGHTSHIFT's descriptive tags.

## 6. Image rights and presentation

Publicly viewable is not the same as reusable.

- Keep unlicensed archival images link-only.
- Do not hotlink, mirror, scrape or bundle images unless item-specific terms permit it.
- For link-only objects, use typographic records and original NIGHTSHIFT-authored diagrams; provide a clear **Originalquelle öffnen** link.
- Show archival images inside the library only where item-level rights explicitly allow that display.
- Keep rights status visible and independent from evidence quality.
- Never trace or recreate exact signatures, tags, wordforms or protected artworks.

## 7. Pilot scope and honest launch

The current graffiti reference manifest has 39 item-level records and 15 individually inspected objects. That does not mean there are 15 usable alphabet specimens: several are letters/correspondence, editorial covers, multi-piece productions or image-index spreads, and many exact glyph sequences are not confidently legible.

Therefore use two distinct pilot counts:
- **Object browser pilot:** may include every correctly documented inspected object, with its limitations.
- **Glyph comparison pilot:** only includes observations that pass the glyph eligibility gate.

Before a public glyph-comparison launch, build a small, high-quality set of at least 20 eligible glyph observations across multiple independent sources and several letters. If the evidence does not support 20, launch the object browser first and label the glyph comparison as a developing research view. Never pad counts with unqualified specimens.

## 8. Suggested UI structure

### Collection landing
- short purpose statement and corpus counters (objects inspected / glyph observations eligible / comparison findings);
- browse by letter A–Z;
- browse by observable construction feature;
- recently inspected objects;
- clear explanation of evidence and rights labels.

### Object detail
- title, attribution, date/place, source and rights;
- original-source link;
- observed visible text and glyph list;
- direct observations;
- interpretations and limits;
- related specimens and eligible glyph observations.

### Glyph comparison
- persistent selected-glyph heading;
- side-by-side comparison cards with identical observation fields;
- visible differences and shared features;
- confidence/provenance on each card;
- responsive stacking on mobile;
- keyboard/touch accessible selection and filtering.

### Construction comparison
- compare structural features without asserting a named style;
- use original diagrams or permitted images only;
- explain why a comparison is valid and where it breaks down.

## 9. Technical implementation sequence — Claude handoff

### Gate 0 — Claude architecture review (can begin once this specification is accepted)
- inspect current main/working branch and the live /archive/ implementation;
- map the current archive route, data builder, schema and tests;
- recommend the smallest compatible extension;
- identify whether comparison records belong in the existing archive schema or a typed sidecar consumed by the existing builder;
- do not write UI or migrate data in this gate.

**Deliverable:** a short architecture decision record with exact files, schema strategy, route proposal, migration risks and test plan.

### Gate 1 — data contract and pipeline
- implement a versioned schema for object observations, glyph observations and comparison findings;
- validate IDs, provenance, eligibility, rights and relation integrity;
- build one end-to-end fixture from a genuinely eligible glyph observation;
- keep the current manifest backwards compatible or provide a deterministic migration.

**Deliverable:** schema, validator, fixture, tests and reproducible build output.

### Gate 2 — object browser
- integrate the browsable collection under Stile & Buchstaben / Bildarchiv;
- real search and filters only;
- object detail with source, evidence and rights;
- use the current archive design system and navigation.

**Deliverable:** working desktop/mobile object browser populated by existing inspected records, without falsely claiming glyph eligibility.

### Gate 3 — glyph and construction comparison
- activate only when the eligible glyph pilot exists;
- compare two or more independent observations;
- show direct observations separately from cross-object interpretation;
- include confidence, source and limits.

**Deliverable:** working comparison flows, tests and screenshots.

### Gate 4 — learning and generator bridge
- add links to original teaching diagrams and supported generator capabilities;
- no writer presets, artwork cloning or direct source tracing;
- verify every bridge capability before enabling its action.

**Deliverable:** capability-gated links and end-to-end tests.

## 10. Acceptance criteria

- Existing Blackbook Archive routes and content continue to work.
- Collection is discoverable from Stile & Buchstaben and Bildarchiv.
- All visible UI is German.
- Search and filters return correct records and can be cleared.
- Object browsing works even when no glyph is eligible.
- Glyph comparisons include only explicitly identified, sufficiently legible glyphs.
- Every observation links to its exact provenance and rights state.
- Unlicensed images are not embedded or bundled.
- Direct observation, interpretation and generator inference remain distinct.
- No writer/artwork cloning or style ranking.
- Desktop, tablet and mobile layouts pass.
- Keyboard, focus, touch, reduced motion and static fallback are checked.
- Existing archive, build and browser tests pass; new tests cover schema, filtering, comparison eligibility, rights and deep links.
- Claude reports exact commands, test totals, changed files, screenshots and remaining limitations.

## 11. Division of work

**ChatGPT / research**
- continue source acquisition and page-by-page visual inspection;
- create precise glyph-level observations only when legible;
- maintain provenance, confidence, evidence and rights;
- produce comparison findings and original diagram briefs;
- independently review Claude's implementation and data integrity.

**Claude / implementation**
- architecture review, schema and validation;
- deterministic pipeline integration;
- archive browsing and comparison UI;
- tests, accessibility, responsive behavior and release artifacts.

**Project owner**
- approve scope, visual direction and final editorial/presentation quality.

**Immediate next step:** ChatGPT completes a small eligible glyph-observation pilot while Claude performs Gate 0 architecture review in parallel. Full UI implementation begins only after the schema decision and pilot records are accepted.
