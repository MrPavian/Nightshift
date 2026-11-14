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
