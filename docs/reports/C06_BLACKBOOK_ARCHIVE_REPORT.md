# C06 — THE BLACKBOOK ARCHIVE MVP: report

**Status:** implemented on branch `claude/c06-lexicon`. **Owner editorial and visual approval: pending.** No entry is marked `approved-for-archive`.
**Sequencing:** run directly after C01 under the owner-approved override of 2026-11-15 (issue #7, `docs/FINAL_ROADMAP_AND_WORK_ORDER_01.md` §7). C02–C05 are deferred, not cancelled.

## What was built

| Part | Files |
|---|---|
| Entry sources (editorial truth) | `research/archive/entries/*.md` (27), `research/archive/TIMELINE.md`, `research/archive/LEARNING_PATHS.md`, `research/archive/README.md` |
| Parser, validator, build | `src/archive/parse.js`, `src/archive/build.js`, `tools/archive-build.mjs` |
| Generated data | `data/archive/archive.v1.json` (deterministic; `npm run archive:check` in CI) |
| Original diagrams | `src/archive/diagrams.js`: 7 SVGs rendered at build time; letter anatomy and negative space come from NIGHTSHIFT's canonical A/B/G/S |
| Archive UI | `archive/index.html`, `archive/app.js`, `archive/app.css`, `archive/sw.js`, `archive/fonts/` (Barlow, SIL OFL) |
| Editor bridge | `src/bridge/editor-bridge.js`, `src/archive/capabilities.js`, receivers in `review/app.js` and `editor/editor.js`; contract in `docs/EDITOR_BRIDGE_CONTRACT_01.md` |
| Tests and proof | `tests/archive.test.js` (24 tests), `tools/archive-smoke.mjs`, `docs/reports/proof/C06/` |
| Deployment | `.github/workflows/deploy-pages.yml` publishes `archive/`; the site root links archive, review page and editor |

## Content counts

**Entries by type (27):**

| Type | Count |
|---|---|
| Scene | 7 |
| Practice | 5 |
| Concept | 5 |
| History | 3 |
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
| Beijing, Shanghai, Chengdu | 1 |
| Dortmund / Ruhrgebiet | 3 |
| Hamburg | 1 |
| No region (practices, concepts, construction) | 11 |

**Claims (96):**

| Claim kind | Count |
|---|---|
| Scholarly interpretation | 44 |
| Editorial synthesis | 22 |
| Institutional account | 15 |
| NIGHTSHIFT design inference | 11 |
| Practitioner account | 4 |

11 of the claims come from the NYC claim ledger. No claim is an unverified lead.

**Other content:** 32 cited sources, 20 timeline events and 4 learning paths. The paths are:

- From a name to a culture (9 stations)
- How writing travelled (8)
- Reading a letter (4)
- Writing in Germany: Dortmund and Hamburg (5)

**Status and rights:** all 27 entries are `source-checked`. 10 entries carry `original-diagram` image rights and 17 carry `none`.

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
| `npm test` | 123 pass, 0 fail |
| `node tools/archive-build.mjs --check` | Archive data up to date |
| `node tools/archive-smoke.mjs` | ARCHIVE-PASS: 40 views at 360 px with no errors and no horizontal overflow; 27/27 claim sheets open with a source; alias search ("pichacao" finds São Paulo); empty-search state; 4/4 bridge targets accept the request, select glyph/tab/word and show the return link |
| `node tools/editor-smoke.mjs --capture` | EDITOR-PASS, 13/13 steps; re-run because `editor/editor.js` gained the bridge receiver |
| `node tools/review-smoke.mjs` | REVIEW-PAGE-PASS |

**Proof artifacts:** `docs/reports/proof/C06/manifest.json` holds the SHA-256 of the data, UI, bridge and seven screenshots (home, entry, search, timeline and path on a phone; entry and scenes on desktop). `tests/archive.test.js` fails if any input changes after the proof run.

## Acceptance (issue #7)

| Criterion | Result |
|---|---|
| Validated schema, references and source links | **Pass**: build validator plus 24 tests, including negative cases |
| 25–35 coherent entries; substantial NYC foundation plus contrasting global cases | **Pass**: 27 entries; NYC foundation plus Philadelphia, Amsterdam, Paris, São Paulo, China, Dortmund/Ruhrgebiet and Hamburg |
| Claim-level provenance; independent evidence, editorial and rights states | **Pass** |
| Timeline, scene navigation, at least two learning paths | **Pass**: 20 events, scenes view, 4 paths with progress |
| Useful search and navigation without dead ends | **Pass**: aliases, type and region filters, empty states; every entry is reachable and links onward (tested) |
| Polished, responsive, accessible UI | **Pass**, technically: phone and desktop checked, keyboard focus, skip link, `lang` marking, reduced motion respected, dialog for claims. **Visual approval by the owner is pending.** |
| Content generated from the research library | **Pass**: the JSON is a build output, checked in CI |
| Offline access | **Pass**, implemented: service worker plus bundled fonts and data. Offline needs one online visit first. Verified by file test, not by a scripted offline browser run. |
| Bridge contract documented and versioned; active links real; future ones not faked | **Pass**: contract 1.0.0; 4 verified capabilities; 3 shown as unavailable (C03, C04, C05) |
| No placeholders, unsupported claims or unlicensed images | **Pass**: validator and tests; no `<img>` anywhere; diagrams are original |
| Women integrated | **Pass**: Lady Pink sits in the NYC chapter, exhibitions, timeline and a path; the China chapter includes China Graffiti Girls; a separate entry covers archival gaps, linked from the main chapters |
| ≥ 3 genuine bidirectional archive/editor links | **Deferred to C07** under the override. C06 delivers 4 forward links with working return links. |

## Gaps and open decisions

1. **Owner review:** editorial approval of all 27 entries, and visual approval of the archive design.
2. **Language:** the UI is German and entry text is English (D-014, proposed). German entry text is an open decision.
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
