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

