# Changelog

## Build 0.6 — Full Alphabet / Glyph Relationships

- Added A–Z glyph addressing.
- Carried forward authored contour masters for A, B, G, R and S.
- Added provisional geometric bases for remaining letters.
- Added four style-profile variants and basic word-level spacing/overlap.
- Added Solid, Fade, Chrome and Split fill treatments.
- Retained SVG export, local blackbook archive and Three.js wall preview.

### Known limitations

- Only five letters have authored contour masters.
- The other 21 letters are provisional bases.
- Style families are early visual profiles, not yet complete historical/style grammars.
- Current letter bridges are mostly decorative; they are not genuine contour joins.
- Diagnostics such as join count and sketch estimate are heuristic, not geometric quality measurements.

## Project initialization

- Added project README, architecture and roadmap documentation.


## Documentation and collaboration foundation

- Added `AGENTS.md` for AI coding-agent instructions.
- Added `CONTRIBUTING.md` for human and AI collaboration.
- Added project brief, AI handoff, style taxonomy/research framework and decision log.
- Expanded the roadmap with concrete 0.7 work packages and release gates.
- Linked onboarding documentation from the repository README.


## THE BLACKBOOK ARCHIVE — project definition

- Added the archive masterprompt and a dedicated phased roadmap.
- Established the research library under `research/` as the editorial source of truth and the in-game archive as its presentation layer.
- Added archive onboarding links to the README and AI handoff.


## Research library — first populated pass

- Added the research index, source/evidence methodology and rights-handling rules.
- Added initial source-backed notes on NYC history, lettering styles, practices/formats, writers/crews, visual references and glyph construction.
- Marked provisional definitions and open research gaps rather than presenting them as settled universal terminology.


## Research deepening — Synthesis 01

- Added a cross-linked research synthesis connecting early New York writing, Bronx oral histories, tag/throw-up/piece distinctions, subway-car formats, selected style terminology and generator implications.
- Added and attributed further primary/institutional and scholarly sources: Joe Austin, Bronx County Historical Society oral histories, Anna Waclawek, Abram Coetsee and MFA Boston.
- Recorded disputed/secondary attributions and open primary-source verification tasks rather than presenting them as settled fact.


## Research deepening — five specialist dossiers

- Added source-led dossiers on PHASE 2 and bubble lettering; TRACY 168, Wild Style and inter-letter connections; RAMMELLZEE and KASE 2; 3D and blockbuster lettering; and women writers in early New York.
- Distinguished historical crew/name usage from later visual style terminology.
- Preserved disagreements around invention/priority claims and documented underrepresentation.
- Added explicit generator design inferences while keeping them separate from historical evidence.
- Cross-linked the new dossiers through the research index and related files.


## Research deepening — subway transition and Europe

- Added a source-led account of New York’s Clean Car/Clean Train campaign, the spring 1989 graffiti-free declaration and the continued cultural life of writing beyond subway cars.
- Added a regional account of 1980s European style writing, focusing on Amsterdam, Paris, Cologne-Düsseldorf and Hamburg.
- Distinguished documented policy milestones from broader cultural claims and attributed retrospective firsts.
- Documented transnational circulation through media, travel, exhibitions, crews and writer contacts.
- Updated the research index and cross-links.


## Research deepening — lettering, blackbooks and aerosol practice

- Added a structural vocabulary and composition model for graffiti lettering, based on Daniel Berio’s computational research and qualified as analytical rather than universal practitioner terminology.
- Added a dossier on blackbooks as sketch space, peer-learning environment, social object and archive, using Janice Rahn’s ethnography and Getty documentation.
- Added a material-culture dossier on aerosol cans, valves, caps, spray patterns and surface interaction, distinguishing manufacturer retrospectives from ethnographic and academic sources.
- Added explicit NIGHTSHIFT data-model and generator implications without presenting them as historical facts.
- Updated the research index.


## Research deepening — pair logic and handstyle movement

- Added a contextual model for letter-pair compatibility, anchor zones, connection types, occlusion and whole-word validation.
- Added a handstyle dossier covering gesture trajectories, stroke order, velocity, motor dynamics and gesture-first versus shape-first generation.
- Grounded movement-centric findings in Daniel Berio and Frederic Fol Leymarie’s computational research; explicitly labelled pair-logic rules as NIGHTSHIFT engineering hypotheses.
- Updated the research index and related-file links.


## Research deepening — alphabet test matrix and glyph variants

- Added a 26-letter structural test matrix and per-glyph construction checklist.
- Defined synthetic regression words, glyph-level and word-level acceptance criteria, provenance fields and a staged implementation sequence.
- Grounded computational methods in Berio et al.'s StrokeStyles and AutoGraff research while clearly separating NIGHTSHIFT design inference from historical claims.


## Research deepening — semantic glyph construction library

- Added a technical specification for semantic glyph graphs, stroke primitives, junction/topology relationships, counters/apertures, width profiles and connection anchors.
- Defined per-glyph graph templates, an authoring workflow, validation requirements and a staged path from the five existing authored masters to a complete alphabet.
- Grounded computational concepts in StrokeStyles, Sketching and Layering Graffiti Primitives, and AutoGraff; distinguished NIGHTSHIFT engineering proposals from historical claims.


## Build 0.6 implementation audit — glyphs and SVG layers

- Audited the actual prototype glyph maps and SVG render pipeline.
- Recorded counter/fill-rule and render-layer inconsistencies, background-colored counter patches, decorative bridge/join diagnostics, and the distinction between presentation presets and structural style grammars.
- Added a normalized glyph-data proposal, remediation sequence and render-layer regression matrix. No prototype code was changed in this audit commit.


## Architecture decision — Claude-led integrated Three.js generator

- Recorded the project owner's decision to delegate production generator implementation to Claude with Three.js integrated into the actual generator workflow.
- Clarified that Build 0.6 is a reference prototype, not the final architecture; do not build another HTML/JSON-only generator as the end product.
- Retained editable vector geometry and SVG interoperability, with HTML as a possible shell and JSON as a possible project-data format.
- Updated contributor guidance, architecture, project brief, roadmap and AI handoff so future implementation briefs align with this direction.


## Autonomous research workflow

- Added a persistent autonomous work prompt for the ChatGPT research/specification role, defining uninterrupted deliverables through the A–Z glyph contract, system responsibility map, Claude implementation brief and review package.
- Linked the work prompt from the AI handoff so future sessions can resume the same workflow without re-establishing instructions.


## Glyph master specifications — A, B, G, R, S

- Added detailed source-code-grounded specifications for the five existing custom contour records.
- Defined per-letter semantic construction proposals, identity invariants, counter/aperture handling, candidate anchors, variant families and isolated/pair/word test cases.
- Explicitly separated verified v0.6 code facts from engineering proposals and unverified visual quality; no visual certification is claimed.


## Normalized glyph data contract — A–Z

- Added a versioned conceptual contract separating semantic glyph graphs, editable vector contours, counters/apertures, metrics, anchors, style variants, maturity/provenance and derived render state.
- Defined deterministic regeneration, structured validation issues, SVG/Three.js synchronization principles and migration requirements for the v0.6 legacy glyph data.
- Kept uncalibrated measurements explicitly pending rather than inventing production metrics.


## Generator responsibility map

- Defined subsystem ownership and interfaces for semantic glyph construction, style grammar, composition solving, integrated Three.js editing, vector/SVG interchange, project persistence and diagnostics.
- Resolved the D-003/D-009 architecture relationship: Three.js is a first-class live editor surface, while canonical semantic/vector state remains authoritative and edits flow through model commands.


## Glyph review package and Claude handoff

- Added the A–Z review package with maturity inventory, pair/word-context matrices, style-family proof requirements, automated checks and human review criteria.
- Added the phased Claude implementation brief for Build 0.7, including canonical model, topology, integrated Three.js editor, composition solver, SVG/persistence, test coverage and explicit release gates.


## Research deepening — initial style grammar specifications

- Added a four-family style grammar dossier for Bubble/Throw-up, Blockbuster, Straight Letter and Wildstyle Study.
- Grounded the terminology and structural observations in Gottlieb's expert-classification research, Macdonald's ethnography, Joe Austin's historical study and DAIM's practitioner interview.
- Explicitly documented disagreement over letterform versus piece-style categories.
- Separated letterform grammar, composition grammar, practice/form context, surface and rendering treatment in the product model.
- Added construction parameters, constraints, failure states and acceptance tests while marking implementation rules as NIGHTSHIFT design inference.
- Updated the central style taxonomy and Claude handoff references.


## Style grammar compatibility and parameter contract

- Added independent profile axes for letterform grammar, composition grammar, practice/form context, surface and rendering.
- Defined compatibility levels, parameter ownership and dependency graphs for Bubble, Straight/Block, Compact, Block-fit and Interlocking behavior.
- Distinguished hard topology/identity constraints from soft preferences and specified override/validation behavior.
- Defined explicit preset serialization and compatibility test fixtures.


## 2026-11-14 — A/B/G/R/S construction handoff

- Added a Claude-ready glyph-specific implementation specification and machine-readable contract.
- Documented exact v0.6 contour counts, provisional component proposals, topology distinctions, anchor review requirements and registered operation IDs.
- Specified topology-consistent rendering, typed Three.js edits, acceptance fixtures and maturity gates.
- No production glyph geometry, visual review, calibration or implementation is claimed by this documentation update.


## 2026-11-14 — Specification integration audit and work order

- Added a persistent ChatGPT research/specification work order with dependency-ordered deliverables and role boundaries.
- Audited the A/B/G/R/S handoff against the glyph parameter, construction and geometry contracts.
- Verified all 25 registered parameter operations have matching semantics and declared write targets.
- Clarified G's intended aperture identity versus unresolved legacy-import classification; the aperture-width operation now has explicit classification and calibration preconditions.
- No runtime implementation or visual approval is claimed.


## 2026-11-14 — Claude 0.7A implementation ticket pack

- Broke the first A/B/G/R/S implementation slice into seven dependency-ordered tickets with explicit acceptance criteria and failure behavior.
- Separated repository reconnaissance, legacy import, semantic mapping, geometry validation, topology-correct rendering, proof sheets and the first Three.js command loop.
- Linked the ticket pack from the roadmap, implementation brief and research index. No implementation completion is claimed.


## 2026-11-14 — A–Z, style grammar and solver/generator work packages

- Added a staged A–Z glyph authoring plan with neutral construction briefs, topology risks, wave priorities and maturity gates.
- Added a first supported style grammar slice with independent axes, resolver-only behavior and honest capability statuses.
- Added relationship solver and procedural generator integration readiness with safe relationship phases and deterministic four-concept acceptance.
- Added machine-readable alphabet authoring contract and Claude ticket pack 0.7B/0.8A.
- Marked specification work packages W02.1–W02.5 complete in the ChatGPT work order. No additional glyph geometry, production implementation or visual approval is claimed.


## 2026-11-14 — BLACKBOOK ARCHIVE information architecture and pilot

- Added archive audiences, multi-axis taxonomy, navigation, entry layout, learning paths, capability-based generator links and UX brief.
- Added six source-linked editorial pilot drafts: handstyle, bubble lettering, Wildstyle, wholecar, aerosol caps and letter anatomy.
- Added Claude implementation tickets for content schema/pipeline, search/navigation, visual learning, generator bridge and ingame integration.
- Pilot content remains draft; claim-level source verification and image-rights review are explicitly outstanding.


## 2026-11-14 — BLACKBOOK ARCHIVE research deepening

- Added a six-record NYC source register with source limitations, inspected scope, access dates and rights cautions.
- Added a historical evidence map covering multiple origins, writing culture vs. policy, the 1989 transit-fleet milestone, blackbook preservation and institutional recognition.
- Added six further draft archive entries on writing, blackbooks, Clean Train, sequential train photography, preservation networks and institutional recognition.
- Added archive regression cases for historical nuance, source integrity, image rights, search, navigation and capability-gated generator handoff.
- Chalfant Smithsonian record remains provisional because direct page retrieval failed; no image rights are inferred. No archive runtime or tests are claimed as implemented/executed.



## 2026-11-14 — Cross-domain test preparation

- Added glyph-level stress cases for A/B/G/R/S counters, apertures, joins and identity.
- Added 12 pair-level relationship probes, eight controlled word fixtures, grammar isolation tests and generator determinism/rejection tests.
- Extended proof-sheet recommendations for negative-space masks, clearance, maturity, grammar isolation and rejected candidates.
- Test cases are prepared for Claude implementation; no execution or maturity promotion is claimed.



## 2026-11-14 — Martha Cooper and German graffiti research

- Added a dedicated Martha Cooper dossier and identified the Martha Cooper Library at URBAN NATION as a core research gateway for rare books, fanzines and 1980s/1990s graffiti periodicals.
- Added a German scene history dossier with a substantial Dortmund/Ruhrgebiet section, alongside Berlin, Hamburg, Munich, Cologne/Düsseldorf and eastern Germany.
- Added a source-attributed writer/crew register covering Too Strong, ATOM ONE / Der Lange, Pure Doze / DOZE, Silo Nation, TUF/TRD, ODEM, DAIM and Ma'Claim participants.
- Clarified that Silo Nation is treated as a hip-hop community/network and jam culture, not automatically as a graffiti crew; ATOM ONE and Pure Doze are separate people.
- All entries remain research drafts. Crew memberships, dates and image rights require further item-level verification.



## 2026-11-14 — German scene Blackbook content and QA

- Added nine German-scene archive drafts: Dortmund Style, Silo Nation, Too Strong, ATOM ONE / Der Lange, Pure Doze / DOZE, DAIM, Ma'Claim, ODEM and Martha Cooper Library.
- Added twelve regression fixtures covering entity distinctions, regional scene coverage, aliases, source confidence and rights handling.
- Kept Silo Nation distinct from graffiti crews and ATOM ONE distinct from Pure Doze.
- Content and tests remain editorial/test-design deliverables, not runtime implementation or publication approval.



## 2026-11-14 — Additional German scene research

- Added research on Stylefile as a German publication platform, 1UP, Berlin Kidz, MOSES & TAPS, LOOMIT, OZ and CAN2.
- Added six Blackbook draft entries and ten further archive regression fixtures.
- Added City of OZ and scholarly context to avoid flattening OZ's work into sensationalist press accounts.
- DARKO, VANDALZ and THE FÖNS are recorded as unresolved leads only; no unverified profiles or crew affiliations were invented.




## 2026-11-14 — German publication and archive bibliography

- Added a publication-level source map for *EINE STADT WIRD BUNT*, DECADES Vol. 1, Stylefile and the Martha Cooper Library.
- Indexed five Stylefile issue records at differing evidence levels; explicitly preserved the conflicting Stylefile 1 date rather than silently reconciling it.
- Added ten publication, OPAC, provenance and rights regression fixtures.
- Specific Martha Cooper Library holdings remain unclaimed until exact OPAC records are inspected.



## 2026-11-14 — Hamburg magazine bibliography

- Added source-graded serial-publication records for Daily Bombs, Dosenspuk, Beastie Boyz, BACKSPIN, Sketches and Rock 'n' Roller.
- Preserved the BACKSPIN 1993/1994 date conflict and title spelling variants pending primary issue inspection.
- Added Hamburg-specific archive regression fixtures.



## 2026-11-14 — Berlin DECADES trilogy bibliography

- Added separate bibliographic records for all three DECADES volumes (1990–2020).
- Recorded publisher-listed portrait subjects and historical framing with attribution.
- Added regression tests preventing the trilogy from being flattened or its curated name lists treated as complete rosters.


## 2026-11-14 — 0.7A-T01/T02: canonical glyph registry (first production code)

- Added the T01 reconnaissance report and implementation plan (`docs/IMPLEMENTATION_PLAN_0_7A.md`) and decision D-011 (browser-native ES modules, Node test runner, dependency-free canonical model).
- Added `tools/extract-v06-paths.mjs` and the hash-verified legacy snapshot `data/legacy/v06-glyph-paths.json` (exact v0.6 path strings with line locators).
- Added the canonical glyph registry (`src/glyph/`): A/B/G/R/S as `x.master` at `authored-contour`; 21 letters as `x.provisional`, reference-only. Stable glyph/variant/contour/segment/node/negative-space IDs.
- A/B/R inner paths imported as provisional counters (B: upper/lower by measured position); S `none-in-master`; G `apertureStatus: interpretation-required` with no synthesized geometry.
- Added a schema/integrity validator (maturity requires passed reviews; legacy geometry drift and snapshot hash checks).
- New measured findings: A's counter has the same winding as its outer contour; D/O/P/Q carry undeclared multi-subpath topology.
- Tests: 22 passing (`npm test`). The v0.6 prototype is unchanged.

### Known limitations

- No geometry/topology validation yet (self-intersection, containment, clearance): ticket T04.
- No semantic components, anchors or calibrated metrics yet: T03 and later calibration.
- No renderer or editor yet; the modules have not been run in a browser.


## 2026-11-14 — 0.7A-T03: semantic overlays and topology declarations

- Added the A/B/G/R/S semantic overlay (`data/semantic/abgrs-semantic-overlay.v1.json`, `src/glyph/semantic-overlay.js`): contract component proposals with stable IDs, junction candidates, identity-invariant and counter-protection constraints, declared topology signatures.
- Only counter boundaries are mapped to geometry; all other components are `provisional-unmapped` with reviewable candidate segments and a stated basis. Geometry is unchanged.
- G aperture: explicit `interpretation-required` record with observations and blockers; `glyph.G.set-aperture-width` is gated and cannot commit.
- Generated identity/topology report: `docs/reports/T03_TOPOLOGY_REPORT.md` (`npm run report:topology`).
- Added a headless-browser smoke test (`npm run test:browser`); the model runs unchanged in Chrome with identical geometry hashes.
- Tests: 37 passing.


## 2026-11-14 — 0.7A-T04: geometry validator vertical slice

- Added the geometry validator (`src/glyph/validate-geometry.js`) running all 10 contract stages, with certified curve flattening, exact line predicates, Jordan-curve crossing certificates, containment, fill-rule evaluation, negative-space classification, clearance measurement (closest points, error bound, filled/unfilled side) and identity checks.
- Validator profile `data/validator-profiles/legacy-v06.v1.json`: numerical parameters only; no calibrated thresholds, so clearance is measured and reported, never passed or failed.
- Results: A/B/G/R/S pass all hard checks; 25/26 letters pass; provisional Q fails with an undeclared crossing (tail). G's unfilled space is proven exterior-connected; its aperture stays unclassified. A's counter needs `evenodd`.
- Contract fixtures implemented as tests (render parity deferred to T05; channel corridor analysis deferred).
- Semantic overlay 1.1.0 records the G connectivity proof.
- Report: `docs/reports/T04_VALIDATION_REPORT.md` (`npm run report:validation`). Tests: 61 passing.


## 2026-11-14 — 0.7A-T05: topology-correct monochrome renderer

- One derived render model (outer contours + declared counter holes, re-oriented for fill-rule independence) feeds SVG fill/outline and Three.js meshes (`src/render/`, `src/editor/three-glyph.js`).
- Holes are genuine: no background-colour painting. Invalid (Q) or undeclared (D/O/P) topology is refused with structured errors.
- Raster proof in headless Chrome: counters show light, dark and textured surfaces exactly in SVG and Three.js; silhouettes agree outside a 1-px edge band; the legacy paper-colour patch is detected as a negative control. Proof sheet and manifest in `docs/reports/proof/T05/` (`npm run proof:render`).
- Added `three@0.187.0` as a pinned dependency used only in `src/editor/` (D-012).
- Tests: 72 passing.


## 2026-11-14 — 0.7A-T06: proof sheets, review package and test page

- Proof run `run.0.7A-T06.1693b6ee52ef` in `docs/reports/proof/T06/`: manifest per contract, checksums, per-glyph validation reports, SVG plates (glyph identity + thumbnails, semantic/topology diagnostics, 12 pair and 8 word fixtures). `npm run proof:run`.
- Mixed fixtures are marked `partial-provisional-coverage`; unrenderable provisional letters (D, O, Q) appear as explicit missing slots with reasons.
- Review records (`src/proof/review.js`): protocol rubric enforced, review stored separately from automated results, maturity only proposed, never applied.
- Build-free test & review page `review/index.html` (live A–Z, SVG + Three.js viewer, word tester, plates, review form with JSON export).
- GitHub Actions CI (`.github/workflows/ci.yml`): unit tests, artifact freshness checks, headless-browser tests.
- Tests: 86 passing.



## Research deepening — Martha Cooper Library catalogue verification

- Added an exact-title OPAC record check for *Eine Stadt wird bunt* (MCL 0003815) and Katrin Kaiser's *Graffiti in der gesellschaftlichen Kontroverse* (MCL 0003386).
- Recorded catalogue metadata and displayed holding status separately from inspected publication content and image reuse rights.
- Documented the MCL's closed-stack/reference-library access model and the live OPAC server limitation encountered during this pass.
- Left serial-title holdings unconfirmed pending exact-title/issue searches against a functioning catalogue.

- Follow-up exact-title search identified the MCL holding *Stylefile — blackbook — sessions* (record 0003185, 2003); classified as a book, not a *Stylefile Magazin* issue.


## Research deepening — Hamburg periodical network and Stylefile continuity

- Added a source-graded dossier linking Daily Bombs, Dosenspuk, Beastie Boyz and Backspin through editor/writer biographies published by EINE STADT WIRD BUNT.
- Recorded Daily Bombs #13 as a late-2025 issue reported in January 2026, without implying continuous publication since 1992.
- Verified Stylefile #61 (2025 COMEBACKfile) and #62 (ROBOTfile, release 2026-11-01) against official publisher product pages; documented the publisher's own account of the 2025 trademark restart.
- Kept retrospective zine catalogues at discovery/secondary evidence level and added issue-level verification and image-rights tasks.


## Research deepening — Dortmund Style and Ruhrgebiet

- Added a source-backed dossier on Dortmund writing from 1983 onward, TUF, the 1987 *Da kukse wa* publication, block-letter tendencies, trainwriting context and the 1994–1998 compositional development recalled by ATOM ONE.
- Translated the evidence into a provisional Dortmund Block grammar study with explicit hypothesis labels, calibration questions and human-review gates.
- Preserved distinctions among crew, person, publication, style and hip-hop network; no image reuse rights are inferred.


## Research deepening — Dortmund visual corpus and archive access

- Mapped *Da kukse wa* (1987) as a period piece / wall / scene document and *ALL SURFACE* (2022) as a separate tag / handstyle corpus.
- Added VR-009 to the visual-reference database with item-level rights cautions and a prohibition on copying identifiable tags or pieces into generator templates.
- Recorded the Dortmund U / ILOVEGRAFFITI digital access route and its current browser-verification limitation; no image inspection or reuse is claimed.


## Research deepening — Dortmund tagging archive and bibliographic verification

- Added a bibliography and provenance dossier for *ALL SURFACE* and *Da kukse wa* using the Deutsche Nationalbibliografie and institutional Dortmunder U / Stiftung Historische Museen Hamburg records.
- Preserved the *ALL SURFACE* page-count discrepancy (238 pages in the DNB vs. 244 in specialist retail and museum event descriptions) instead of silently selecting one.
- Strengthened reprint provenance for *Da kukse wa* while keeping the retailer's “identical except preface” claim uncollated.
- Clarified that the Amsterdam influence narrative is an attributed account and that tag contributors must not be conflated with TUF membership.


## Research deepening — Dortmund scholarly style analysis and oral-history source map

- Added the official Springer records for Harald Hinz's Dortmund local-style chapter and Rahel H. Grothus's longitudinal MASON analysis in *Dirty Hands* (2022).
- Recorded the accessible summary's three formal attributes (sharp contours, consistent stem thickness, opaque fill) as a provisional, non-universal style hypothesis.
- Extracted dated first-person source leads cited by Hinz (SHARK, 30 January 2020; Krell/COLE/CHANA, 14 February 2020; David Radon, 9 December 2020) without inventing interview content.
- Added Laura Maria Lintzen's 2025 ethnography as a current, broader German scene-history source; full chapters remain access-limited.
- No images, signatures or copyrighted chapter figures were copied; full-text inspection and practitioner review remain open.


## Research deepening — Dortmund oral-history documentary access

- Recovered accessible English-subtitled video routes for *The Rise of Graffiti Writing — Dortmund, Berlin & Frankfurt* and *Writing on Trains: Dortmund & Frankfurt*.
- Cross-checked the documentary trail against Harald Hinz's 2022 chapter, which cites SHARK's 30 January 2020 communication and the series.
- Added an episode access map and a timecoded claim-verification protocol; no interview statements are quoted or inferred before viewing.


## Research deepening — Dortmund MASON longitudinal publication corpus

- Added source mapping for *Graffiti Dortmund: Die Kunst der Sachbeschädigung* (1996), *MASON — The Essence of Writing 1986–2019* (2020) and Grothus's 2022 longitudinal study.
- Added VR-010 with bibliographic metadata, access routes and item-level rights cautions.
- Kept the individual MASON corpus separate from city-level style claims; no third-party Issuu upload or preview was treated as licensed source material.


## Research deepening — Dortmund oral history and visual chronology

- Added ATOM ONE #040 and TWISTER / JEZUS / PRIDE #059 as first-person interview source routes, with their editorial topic summaries and transcription limitations.
- Identified *IRON CITY — Graffiti Dortmund* (2002) as a key regional visual chronology covering advertised material from 1983 through the early 2000s.
- Added VR-011 and a source-graded dossier; kept audio claims and image-level observations unverified until direct inspection.
- Clarified that Episode 21's description and the separately linked “Writing on Trains” YouTube upload are not yet proven to be the same numbered episode.


## Research deepening — Dortmund trainwriting contemporary sources, 1997–1999

- Inspected *BOMBER* magazine #14 (October–December 1997), including its review of *Rolling Thunder 001* and *King of the Line*.
- Inspected the dated *Endstation* #14 report “Dortmund - Haupt Bahn Hof” (8 March 1999), preserving its claims about 1996–1999 activity and 1998 security / cleaning changes as attributed reporter statements.
- Located an MCL catalogue search result for *IRON CITY* (2002), but the catalogue server was unavailable on opening; current holding status remains unconfirmed.
- Added VR-012 and a contemporary-source dossier; no photographs were copied and no unverified totals were promoted to facts.



## Research deepening — Dortmund moving-image archive and media access

- Added a provenance dossier for *Rolling Thunder 001*, *King of the Line* and the unresolved *Graffiti Dortmund 1994* film lead.
- Located a current specialist retailer listing for a used *Rolling Thunder 001* VHS, with seller-supplied MASmedia / SHARK TV production metadata; cross-checked its 40-minute Dortmund trainwriting description against the 1997 *BOMBER* review.
- Recorded the *King of the Line* ISBN lead and separated contemporary interface description from secondary catalogue metadata.
- Preserved the 1994 Google Video reference as an unresolved historical link; no surviving copy or original ID is claimed.
- Added VR-013. No media has been watched, copied, digitized or cleared for reuse.



## Research deepening — Dortmund publication bibliography and visual corpus

- Added a source-audited dossier distinguishing *Da kukse wa* (1987), *Graffiti Dortmund: Die Kunst der Sachbeschädigung* (1996), *IRON CITY* (2002), the MASON retrospective (2020) and *RIO — The Process of Writing* (2023).
- Recorded the 1996 title's unresolved 80-page (ILOVEGRAFFITI 2009) versus 160-page (retail catalogue) discrepancy; no extent was silently selected.
- Documented the low-resolution Issuu preview trail without treating historical free viewing as a license or current access guarantee.
- Added VR-014; page-level visual inspection and item-level image permissions remain outstanding.



## Research deepening — *Da kukse wa* 2020 reprint access

- Verified original 1987 publication roles and interviewees against Marianne Brentzel's author page and excerpt.
- Confirmed the 2020 reprint / online brochure provenance through the official Dortmunder U *I WAS HERE* exhibition page.
- Located a current specialist-retailer listing for the 36-page German A4 landscape second edition (€75, listed in stock at time checked); page count and “identical except preface” remain seller claims pending collation.
- Added VR-015 and a dedicated access dossier; no images were copied and no reproduction rights inferred.


## Research deepening — Dortmund 1987 local writing glossary

- Extracted the six-term “Writer-ABC” from Marianne Brentzel's official *Da kukse wa* excerpt: black-book, charakter, getting fame, piece, tag and whole car.
- Mapped terms to distinct archive/practice, figurative, motivation, artwork/lettering and train-format concepts; no universal definitions or generator parameters inferred.
- Added a dedicated glossary dossier, cross-reference in GRAFFITI_FORMATS.md and VR-016.


## Research deepening — Dortmund *ALL SURFACE* tagging and handstyle corpus

- Added a dedicated dossier for *ALL SURFACE – Tagging in Dortmund* (2022), recording publisher metadata, advertised 1980s/1990s tag corpus and attributed SHARK / Amsterdam recollection with explicit evidence limits.
- Added VR-017 and an item-level inspection protocol separating tags/handstyles from pieces and train formats.
- Identified Stadtarchiv Dortmund / Archive.NRW as a contextual photograph, film and press archive route; recorded the online CC BY-SA 4.0 statement without assuming that a specific graffiti holding exists or that off-site items share that license.
- No book pages or images copied; no signature cloning or reuse rights inferred.


## Research deepening — INGRID database and Dortmund image corpus route

- Identified the DFG-funded University of Paderborn / KIT INGRID database as a free scholarly access route with more than 100,000 annotated graffiti records on the official project page and explicit Dortmund coverage in research literature.
- Preserved corpus-size snapshots from DBIS and a 2023 research article rather than forcing one total; added a stratified Dortmund query and item-level rights protocol.
- Recorded the JavaScript-only database interface and timed-out SPARQL endpoint as access limitations; no Dortmund records or images were inspected.
- Added VR-018 and a separate MK&G Dortmund urban-photography context route (VR-019); explicitly did not claim graffiti content or reuse rights for those contextual photographs.


## Research deepening — INGRID ontology, annotation and licensing

- Inspected the official INGRID ontology and illustrated research manual; documented its dimensions for graffiti type, lettering style, design elements, context, materiality, technique, language/function, chronology and provenance.
- Recorded the human annotation method and the manual's explicit caution about ambiguity in style and genre labels.
- Clarified the 2023 article's licensing report: original images CC BY-SA 4.0, generated metadata CC0, knowledge graph CC BY 4.0, subject to current item-level credit and license checks.
- Added a proposed INGRID-to-NIGHTSHIFT crosswalk as a research aid only; no editor implementation or record-level visual analysis is claimed.


## INGRID promoted to P1 — corpus coverage, rights and editor research workflow

- Promoted INGRID to NIGHTSHIFT's foundational research stream rather than treating it as one source among many.
- Added the INGRID → NIGHTSHIFT ontology crosswalk and Dortmund-first research workflow, including image-level distinctions, annotation depth, missingness, near-duplicate handling and stratified sampling.
- Corrected corpus metrics: official page approx. 150,000 images / 99,962 annotated as of July 2023; 2023 article approx. 136,000 photographs across nine named cities including Dortmund; July 2022 graph snapshot 130,689 graffiti resources / 178 cities / 682,748 image files. These are distinct snapshots and units.
- Clarified public subset and license layers (images CC BY-SA 4.0, metadata CC0, graph CC BY 4.0 in the 2023 paper); commercial product use requires written rights clarification.
- No Dortmund query result count or record-level visual sample is claimed yet.


## 2026-11-14 — INGRID Dortmund SPARQL query pack (W02.32)

- Inspected the official INGRID-KG SPARQL query catalogue and its documented examples for city/date, type, style, carrier medium, technique, colour and lettering text.
- Added six Dortmund-adapted SPARQL templates: corpus count, recording-year distribution, type distribution, lettering-style distribution, technique × medium and a manual-inspection sample.
- Recorded the endpoint execution failure in the current research client as an access limitation, not as endpoint downtime; no Dortmund result counts are claimed.
- Added explicit safeguards for recording date vs. creation date, missing annotation values, collection bias, and type/style distinctions.


## 2026-11-14 — INGRID query audit and C01 kickoff

- Re-audited the Dortmund SPARQL query pack against the official INGRID-KG query catalogue (examples 18, 20–23, 31–32) and the upstream `dice-group/Ingrid` RDF converter.
- Identified a namespace discrepancy between the catalogue's `grfo:` query examples and the converter's `grfp:` annotation-property namespace. Marked dependent queries provisional pending live graph confirmation.
- Recorded two public-endpoint access failures and local DNS failure; no result counts are claimed.
- Opened GitHub issue #4 for Claude's C01 / 0.7A-T07 canonical Three.js edit loop, with required behavior and acceptance criteria.
