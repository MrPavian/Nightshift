# NIGHTSHIFT — Cross-Domain Test Fixtures 02

**Status:** specification/test design only; no runtime execution claimed.  
**Depends on:** GLYPH_REVIEW_PACKAGE_A_Z.md, MASTER_GLYPH_VARIANT_MATRIX_01.md, RELATIONSHIP_SOLVER_AND_WORD_COMPOSITION_01.md, PROCEDURAL_VARIANT_GENERATOR_CORE_01.md, VISUAL_CALIBRATION_AND_COMPARATIVE_EVALUATION_01.md and PROOF_SHEET_AND_TEST_FIXTURE_INFRASTRUCTURE_01.md.

## 1. Fixture principles

- Fixtures are synthetic engineering probes, not historical graffiti examples or claims about authentic writer practice.
- Preserve the existing canonical pair and word inventory. This pack adds stress cases; it does not replace or silently rename existing fixtures.
- Every mixed fixture records glyph maturity. A/B/G/R/S are currently authored-contour; the remaining 21 letters remain provisional.
- A fixture containing any provisional glyph can test integration and failure handling, but cannot certify the whole specimen as production-ready.
- A failed relationship is a valid result. Never force a join merely to satisfy a fixture.
- Run neutral monochrome geometry before grammar or finish comparisons.
- Every stochastic-looking generation path must be deterministic from a recorded seed and engine version.

## 2. Glyph-level stress fixtures

| ID | Glyph | Probe | Expected invariant |
|---|---|---|---|
| GX-A01 | A | stance narrow / wide | recognizable A skeleton and one protected counter |
| GX-A02 | A | crossbar high / low | crossbar remains connected; counter stays valid |
| GX-A03 | A | open apex topology study | separately named topology variant; no silent conversion from master |
| GX-B01 | B | upper/lower bowl balance | two counters remain distinct and open/closed state is explicit |
| GX-B02 | B | waist open/tight | no unintended bowl merge or counter collapse |
| GX-B03 | B | angular vs rounded bowls | grammar changes do not alter letter identity |
| GX-G01 | G | aperture wide/tight | exterior-connected aperture remains distinct from counter |
| GX-G02 | G | bar high/low/extended | bar attachment and aperture classification remain valid |
| GX-G03 | G | terminal angular/rounded | no false closure of aperture |
| GX-R01 | R | leg angle and length | bowl counter remains protected; leg joins intended stem/junction |
| GX-R02 | R | bowl wide/narrow | counter remains valid at supported bounds |
| GX-R03 | R | straight-leg study | distinct named variant; no hidden topology change |
| GX-S01 | S | upper/lower mass bias | continuous contour identity retained; no invented counter |
| GX-S02 | S | neck open/tight | narrow channel/neck does not self-intersect or collapse |
| GX-S03 | S | angular/curved flow | silhouette remains recognizably S; no inferred stroke-order claim |

**Expected failure behavior:** invalid geometry is rejected atomically with stable diagnostic codes; no silent auto-repair, no partial commit, no direct mesh mutation.

## 3. Pair-level relationship stress fixtures

The existing 12 canonical pairs remain: AV, AR, BA, BR, GO, GR, RA, RO, SA, SB, GS, NS.

Add these synthetic probes:

| ID | Pair | Focus | Expected |
|---|---|---|---|
| PX-01 | AB | counter clearance beside next glyph | preserve A counter and B bowls; open separation accepted |
| PX-02 | AG | aperture facing neighboring mass | aperture remains exterior-connected |
| PX-03 | AS | terminal proximity | near-touch only if clearance gate passes |
| PX-04 | BG | two different negative-space structures | no counter/aperture confusion |
| PX-05 | BR | bowl/leg silhouette competition | no unintended overlap through either counter |
| PX-06 | GS | aperture plus open S neck | both negative spaces remain legible |
| PX-07 | RG | diagonal leg near aperture | solver must reject unsafe aperture occlusion |
| PX-08 | RS | diagonal leg / terminal rhythm | near-touch or separation; no forced bridge |
| PX-09 | SG | terminal directed toward aperture | contact only if anchor directions and clearance permit |
| PX-10 | AA | repeated identical glyphs | spacing rhythm can vary without changing glyph identity |
| PX-11 | BB | dense repeated bowls | counter collision is a hard failure |
| PX-12 | SS | repeated curves | avoid tangency/self-intersection and accidental shared contour |

For pairs involving provisional letters in the canonical set, report partial maturity coverage. Add explicit cases for open separation, near-touch, terminal contact, bar continuation, overlap and interlock only when the required topology/anchor maturity exists.

## 4. Word-level composition fixtures

Keep the existing words ABRA, BOMB, GHOST, KRAZE, MIND, NYX, RISK and SQUE.

Add controlled integration words:

| ID | Word | Main coverage | Maturity note |
|---|---|---|---|
| WX-01 | ABGRS | all five authored-contour masters | suitable first authored-subset integration probe; not proof of natural-language/style authenticity |
| WX-02 | BRAGS | authored B/R/A/G/S | all letters are in authored subset; use as full A/B/G/R/S coverage |
| WX-03 | GRABS | G/R/A/B/S order permutation | same subset, different pair contexts |
| WX-04 | SUGAR | S/G/A/R authored; U provisional | partial coverage |
| WX-05 | RABBIT | R/A/B authored; I/T provisional | partial coverage |
| WX-06 | GHOST | G/S authored; H/O/T provisional | partial coverage; cross-check canonical fixture |
| WX-07 | STRAIGHT | S/R/A authored; T/I/G/H provisional | partial coverage; long-word rhythm |
| WX-08 | BLACKBOOK | B/A authored; remaining letters provisional | partial coverage; archive vocabulary and repeated B/K context |

The word list is a test vocabulary, not a claim about historical tags or writers' names. Keep canonical and extension fixture IDs distinct.

## 5. Grammar comparison fixtures

| ID | Input | Comparison | Pass condition |
|---|---|---|---|
| GRM-01 | A/B/G/R/S masters | neutral vs Bubble | structural rounding is explicit; no palette-only difference |
| GRM-02 | A/B/G/R/S masters | neutral vs Straight | structural simplification/angle logic is explicit; identity preserved |
| GRM-03 | A/B/G/R/S word | Straight vs Wildstyle Study | Wildstyle changes composition/relationships, not merely ornament |
| GRM-04 | fixed word/surface | Blockbuster context | scale/coverage context changes without distorting glyph geometry |
| GRM-05 | fixed geometry | finish variants | canonical geometry hashes remain identical |
| GRM-06 | same recipe | apply to supported and unsupported glyphs | resolver reports per-glyph compatibility; no fabricated variant |

Do not label a grammar “native” until the relevant glyph and context specimens have been authored and human-reviewed. Keep rendering constant during structural comparisons.

## 6. Generator determinism and diversity

| ID | Test | Expected |
|---|---|---|
| GEN-01 | same immutable request + same seed + same engine versions | same canonical candidate set and ordering |
| GEN-02 | same request, change only finish palette | no structural-diversity credit |
| GEN-03 | same request, change only camera/lighting | no structural-diversity credit |
| GEN-04 | four concepts requested, fewer than four pass gates | explicit partial failure; no relaxed thresholds |
| GEN-05 | retry budget exhausted | stable rejection diagnostics and reproducible manifest |
| GEN-06 | lock one glyph variant | locked glyph unchanged; other streams remain isolated |
| GEN-07 | change only relationship seed stream | glyph candidate identity unaffected |
| GEN-08 | save/reload and replay | canonical snapshot and seed metadata preserved |

## 7. Proof-sheet additions

Add the following plates to the existing proof-sheet families:
- A/B/G/R/S negative-space plate: counters, aperture and channel shown with distinct masks.
- Pair clearance plate: PX-01–PX-12 with anchor directions, closest-clearance measurement and solver outcome.
- Word maturity plate: WX-01–WX-08 with provisional glyphs visibly flagged.
- Grammar isolation plate: GRM-01–GRM-06 with fixed camera, scale and finish.
- Determinism plate: identical reruns and canonical geometry hashes.
- Rejection plate: rejected candidates shown with diagnostics, not silently omitted.

## 8. Acceptance and execution record

This pack is ready for implementation as fixture data, but it has not been executed. Claude should:
1. map fixture IDs to stable canonical IDs;
2. ensure all expected outcomes are machine-assertable where possible;
3. preserve maturity and partial-coverage metadata;
4. emit deterministic manifests and rejection diagnostics;
5. keep human visual review as a separate gate;
6. report exact executed IDs, pass/fail counts and known skips.

No fixture passing can independently promote a glyph to production-approved.