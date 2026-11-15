# C06 — THE BLACKBOOK ARCHIVE MVP: report

**Status:** implemented on branch `claude/c06-lexicon` as a **complete German edition**, as the owner decided on 2026-11-15. A complete English edition is planned after C07 (`docs/BLACKBOOK_ARCHIVE_ROADMAP.md`, section “Sprachausgaben”). **Owner editorial and visual approval: pending.** No entry is marked `approved-for-archive`.
**Sequencing:** run directly after C01 under the owner-approved override of 2026-11-15 (issue #7, `docs/FINAL_ROADMAP_AND_WORK_ORDER_01.md` §7). C02–C05 are deferred, not cancelled.

## What was built

| Part | Files |
|---|---|
| Entry sources (editorial truth) | `research/archive/de/entries/*.md` (28), `research/archive/de/TIMELINE.md`, `research/archive/de/LEARNING_PATHS.md`, `research/archive/README.md` |
| Parser, validator, build | `src/archive/parse.js`, `src/archive/build.js`, `tools/archive-build.mjs` |
| Generated data | `data/archive/archive.v1.de.json` (deterministic; `npm run archive:check` in CI) |
| Original diagrams | `src/archive/diagrams.js`: 7 SVGs rendered at build time; letter anatomy and negative space come from NIGHTSHIFT's canonical A/B/G/S |
| Archive UI | `archive/index.html`, `archive/app.js`, `archive/app.css`, `archive/sw.js`, `archive/fonts/` (Barlow, SIL OFL) |
| Editor bridge | `src/bridge/editor-bridge.js`, `src/archive/capabilities.js`, receivers in `review/app.js` and `editor/editor.js`; contract in `docs/EDITOR_BRIDGE_CONTRACT_01.md` |
| Tests and proof | `tests/archive.test.js` (26 tests), `tools/archive-smoke.mjs`, `docs/reports/proof/C06/` |
| Deployment | `.github/workflows/deploy-pages.yml` publishes `archive/`; the site root links archive, review page and editor |

## Content counts

**Entries by type (28):**

| Type | Count |
|---|---|
| Scene | 7 |
| Practice | 5 |
| Concept | 5 |
| History | 4 |
| Construction | 2 |
| Format | 1 |
| Media | 1 |
| Object | 1 |
| Person | 1 |
| Style | 1 |

**By region:**

| Region | Entries |
|---|---|
| New York City | 7 tagged; 13 entries rest on the NYC claim ledger or source register |
| Philadelphia | 1 |
| Amsterdam / Netherlands | 1 |
| Paris / Seine-Saint-Denis | 1 |
| São Paulo / Brazil | 1 |
| Peking, Shanghai, Chengdu | 1 |
| Dortmund / Ruhrgebiet | 3 |
| Hamburg | 1 |
| No region (practices, concepts, construction) | 12 |

**Claims (110, all written in German):**

| Claim kind | Count |
|---|---|
| Scholarly interpretation | 54 |
| Editorial synthesis | 24 |
| Institutional account | 16 |
| NIGHTSHIFT design inference | 12 |
| Practitioner account | 4 |

21 claims name an NYC ledger claim as their basis. No claim is an unverified lead.

**Other content:** 32 cited sources and 20 timeline events. There are 5 learning paths:

- Vom Namen zur Kultur (10 stations)
- Wie Writing reiste (7)
- Einen Buchstaben lesen (5)
- Writing in Deutschland (5)
- Wie das Archiv erinnert (6)

**Status and rights:** all 28 entries are `source-checked`. 10 entries carry `original-diagram` image rights and 18 carry `none`.

## Source verification for this edition

- **Ledgers and dossiers:** NYC entries cite the claim ledger (NYC-001…012; NYC-011 is not used because it has no evidence-use line). Philadelphia, the international scenes and women's history cite the source lists of their dossiers. Where the pilot drafts said more than their sources support, the entries say less.
- **German scenes:** the German dossier is a synthesis, so its key statements were checked against the primary pages before use.
  - Dortmund, Dortmund Style and Hall of Fame were checked against Florian Deckers' KWI Essen text (2022), using the repository PDF of DE-03.
  - Hamburg was checked against the CSMC project and artist pages (DE-12, DE-13).
  - Statements that could not be checked were left out: Dortmund's "black and silver", the size of the Reisser archive, Cologne 1979, and the Berlin crews.
- **Doc-backed claims:** `doc:` sources (research documents and the editorial framework) back only editorial-synthesis and design-inference claims. The validator enforces this.

## Commands and results

| Command | Result |
|---|---|
| `npm test` | 125 pass, 0 fail |
| `node tools/archive-build.mjs --check` | Archive data up to date |
| `node tools/archive-smoke.mjs` | ARCHIVE-PASS: 42 views at 360 px with no errors and no horizontal overflow; 28/28 claim sheets open with a source; alias search ("pichacao" finds São Paulo); empty-search state; 4/4 bridge targets accept the request, select glyph/tab/word and show the return link |
| `node tools/editor-smoke.mjs --capture` | EDITOR-PASS, 13/13 steps; re-run because `editor/editor.js` gained the bridge receiver |
| `node tools/review-smoke.mjs` | REVIEW-PAGE-PASS |

**Bug fixed during the German rewrite:** the parser stored the section “How to recognize it” under `recognize`, but the UI looked for `howToRecognize`, so that section was never shown. A test now checks that the UI renders every section key the data contains.

**Proof artifacts:** `docs/reports/proof/C06/manifest.json` holds the SHA-256 of the data, UI, bridge and seven screenshots (home, entry, search, timeline and path on a phone; entry and scenes on desktop). `tests/archive.test.js` fails if any input changes after the proof run.

## Acceptance (issue #7)

| Criterion | Result |
|---|---|
| Validated schema, references and source links | **Pass**: build validator plus 24 tests, including negative cases |
| 25–35 coherent entries; substantial NYC foundation plus contrasting global cases | **Pass**: 28 entries; NYC foundation plus Philadelphia, Amsterdam, Paris, São Paulo, China, Dortmund/Ruhrgebiet and Hamburg |
| Claim-level provenance; independent evidence, editorial and rights states | **Pass** |
| Timeline, scene navigation, at least two learning paths | **Pass**: 20 events, scenes view, 5 paths with progress |
| Useful search and navigation without dead ends | **Pass**: aliases, type and region filters, empty states; every entry is reachable and links onward (tested) |
| Polished, responsive, accessible UI | **Pass**, technically: phone and desktop checked, keyboard focus, skip link, `lang` marking, reduced motion respected, dialog for claims. **Visual approval by the owner is pending.** |
| Content generated from the research library | **Pass**: the JSON is a build output, checked in CI |
| Offline access | **Pass**, implemented: service worker plus bundled fonts and data. Offline needs one online visit first. Verified by file test, not by a scripted offline browser run. |
| Bridge contract documented and versioned; active links real; future ones not faked | **Pass**: contract 1.1.0; 4 verified capabilities; 3 shown as unavailable (C03, C04, C05) |
| No placeholders, unsupported claims or unlicensed images | **Pass**: validator and tests; no `<img>` anywhere; diagrams are original |
| Women integrated | **Pass**: Lady Pink sits in the NYC chapter, exhibitions, timeline and a path; the China chapter includes China Graffiti Girls; a separate entry covers archival gaps, linked from the main chapters |
| ≥ 3 genuine bidirectional archive/editor links | **Deferred to C07** under the override. C06 delivers 4 forward links with working return links. |

## Alignment with the 30-entry launch plan

`research/BLACKBOOK_ARCHIVE_CONTENT_PILOT_01.md` became mandatory C06 reading while this edition was being built (main, 2026-11-15). The table maps the plan to the current edition. It is **not yet aligned**; this is the main open item of C06.

| Plan entry | This edition | State |
|---|---|---|
| history.modern-name-writing | same ID (+ concept.public-inscription) | covered |
| history.philadelphia-new-york | scene.philadelphia + history.modern-name-writing | covered across two entries |
| history.nyc-subway-era | format.subway-train | covered as a format entry |
| history.global-circulation | same ID | covered |
| history.after-subway | history.clean-train-campaign | partial |
| history.blackbook-to-digital | — | missing |
| scene.philadelphia, scene.amsterdam, scene.sao-paulo | same IDs | covered |
| scene.paris-banlieue | same ID | covered |
| scene.new-york-city | history.modern-name-writing | no own scene entry |
| practice.tag-handstyle | practice.tag + practice.handstyle | covered (split) |
| format.throw-up, format.piece-burner | practice.piece | partial (combined) |
| style.pixacao-tag-reto | scene.sao-paulo | inside the scene entry |
| learning.blackbook | object.blackbook | covered, different ID |
| documentation.graffiti-photography, person.henry-chalfant | practice.sequential-train-photography, media.style-wars-and-subway-art | covered as practice, no person entry |
| archive.provenance-rights | concept.reading-the-evidence | covered, different ID |
| glossary.writer-writing-graffiti | concept.writing-and-graffiti | covered, different ID |
| person.lady-pink | same ID | covered |
| practice.getting-up, format.panel-wholecar, style.bubble-blockbuster-straight, style.wildstyle, material.aerosol-system, person.cornbread, person.topcat-126, person.martha-cooper | — | missing |
| method.local-terms-uncertainty | concept.local-terms | covered, different ID (`method` is not an entry type) |
| Path 3 “How the archive remembers” | path.how-the-archive-remembers | covered |

These entries in this edition are not in the plan:

- concept.public-inscription
- history.institutional-recognition
- concept.visibility-and-archival-gaps
- scene.china
- scene.dortmund
- style.dortmund-style
- scene.hamburg
- practice.hall-of-fame
- construction.letter-anatomy
- construction.negative-space
- history.clean-train-campaign
- media.style-wars-and-subway-art

The German entries rest on primary-checked sources, as plan item F6 requires.

**Proposed alignment (owner decision):**

- Adopt the plan's IDs where they differ, and keep the old IDs as aliases.
- Add the missing plan entries that the sources support. The person entries need page-level sources before any "first" or influence claim.
- Merge or drop extras to stay within 35.
- Use ChatGPT's Entry Drafts 01/02 as input, re-checked at source level.

## Gaps and open decisions

0. **30-entry plan alignment** (see above):
   - The plan IDs were adopted where the ID scheme allows; `concept.local-terms` and the archive-memory path were added.
   - Eight plan entries are still missing. Most need sources that are not yet in a parseable research register: wildstyle, bubble, aerosol, Martha Cooper, CORNBREAD/TOPCAT person pages.
1. **Owner review:** editorial approval of all 27 entries, and visual approval of the archive design.
2. **Language:** decided. The German edition is complete; the English edition is on the roadmap after C07.
3. **German scenes not yet included:** Berlin, Cologne/Düsseldorf and Munich. Their sources (DE-02, DE-04, DE-08, DE-09) could not be checked in this session.
4. **Dortmund Style:** the published description is short. A construction study needs dated examples from several writers; the INGRID and Dortmund corpus work in `research/` is the route.
5. **No `documented-fact` claims yet:** dated primary records (for example MTA documents for 1989) are still open. Museum statements are labelled as institutional accounts.
6. **Offline:** not exercised by an automated offline browser test.
7. **Earlier pilot drafts:** not edited. `research/archive/README.md` explains their relationship to this edition.
8. **Open outside C06, not touched here:**
   - The editor freeze reported on the phone has a partial fix on `claude/fix-editor-freeze` and is unfinished.
   - PR #6 (C02 wave 1) is unmerged.

## Maturity changes

- No glyph maturity changed.
- Archive: from "not implemented" to "first edition, source-checked, owner review pending".

## Next package

**C02**, the C–Z neutral glyph authoring pipeline, per the owner-approved order. PR #6 holds wave 1 and awaits design approval. The unfinished editor-freeze fix should be completed early in C02, because C02 depends on the editor.
