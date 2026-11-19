# Style Template Proof Implementation Plan 01

**Status:** implementation brief / gap audit. No new proof run or human visual approval is claimed by this document.  
**Date:** 2026-11-19  
**Authority:** `contracts/style-resolver.v1.json`, `research/STYLE_GRAMMAR_SPECIFICATIONS_01.md`, `research/PROOF_SHEET_AND_TEST_FIXTURE_INFRASTRUCTURE_01.md`, `research/VISUAL_CALIBRATION_AND_COMPARATIVE_EVALUATION_01.md`.

## 1. Purpose

Turn the 38 documented NIGHTSHIFT templates into honest, reproducible visual specimens. A template is not a rendered preset, and a rendered proof is not an approved design. This plan prevents invented coverage and keeps existing canonical glyph maturity unchanged.

## 2. Existing implementation audit

The current resolver contract is `nightshift.style-resolver@1.1.0`, status `implemented-subset`. The resolver source reports `style-resolver/1.0.0`.

### Actually represented by current resolver
- Neutral baseline.
- Straight / Simple letterform operations: curve chamfer and sharp-corner clipping.
- Bubble letterform operations: contour inflation, side swelling and smoothing.
- Blockbuster composition: thickening and fitting into a block.
- Bounce composition: word placement only.
- Wildstyle request: interlocking explicitly skipped because C04 relationship solver is unavailable.

### Not implemented as distinct construction templates
Tag / Handstyle; Throw-up context as a generator option; Angular / Blade; Semi-Wildstyle; Old-School; Blackletter; Calligraffiti; Anti-Style / Experimental; and the individual variants T1/T2/T3 of every card.

Important: Throw-up is already represented as an allowed practiceContext value in the contract, but it does not currently alter geometry or have a dedicated visual format renderer. It must not be counted as a distinct rendered template.

### Current proof generator limitations
`tools/proof-styles.mjs` renders five presets across the registered uppercase glyphs and word fixtures. Its word sheet applies Bubble and Blockbuster finish treatments, so it is not a neutral monochrome grammar comparison. The A–Z sheet is monochrome but only covers the five existing presets. The current Wildstyle sheet is a fallback/straight glyph study, not an interlocked composition; the script itself prints this caveat.

The existing word fixture list is ABRA, BOMB, GHOST, KRAZE, MIND and NYX in the generated report. The canonical fixture contract additionally includes RISK and SQUE and pair tests. Some letters are provisional. Mixed-word results must preserve partial-coverage labels.

## 3. Proof phases

### Phase A — honest baseline plates (can use current engine)
1. A/B/G/R/S isolated glyphs: Neutral, Straight, Bubble, Blockbuster.
2. Fixed pair fixtures: AR, BA, BR, GR, RA, SA, SB, GS; only where source maturity supports the test.
3. Word fixtures: ABRA first; other words explicitly labelled partial where provisional glyphs occur.
4. Same camera, monochrome fill, neutral light background, no outline, no depth, no highlights, no texture.
5. Full-size and thumbnail views.
6. Resolver operation report, geometry hashes and validation result on every specimen.

### Phase B — template decomposition (new operations, one template at a time)
Each template must map to:
- an operation ID and owning axis;
- parameters with units, valid range, dependencies and provenance;
- required glyph features / compatibility;
- deterministic operation order;
- geometry and topology validation;
- failure reason and neutral fallback behavior;
- specimen IDs and acceptance fixtures.

Do not create a preset alias that simply points to an existing operation while claiming a new visual style.

### Phase C — composition and context
- Implement relationship graph and C04 before any interlocked Wildstyle or Connected Semi-Wild claim.
- Add word-level context only after isolated glyphs pass.
- Throw-up remains a format/context selection; define its presentation constraints separately from Bubble geometry.
- Tag / Handstyle needs an authored stroke/gesture representation. Do not infer ductus from existing static outline masters.

### Phase D — script/hybrid and experimental families
- Blackletter requires a distinct script-derived glyph library and historical terminology mapping; it cannot be created by adding spikes to existing A–Z masters.
- Calligraffiti requires named script-source features and a separate movement model.
- Anti-Style/Experimental must preserve declared transformation intent and traceability; random distortion is not a valid implementation.
- Old-School needs source-scoped historical specimens and should not be encoded as one universal alphabet.

## 4. Standard specimen matrix

| Plate | Scope | Required output | Status |
|---|---|---|---|
| P01 Neutral baseline | A/B/G/R/S | silhouette + metadata | Existing infrastructure; regenerate under neutral settings |
| P02 Core grammar comparison | A/B/G/R/S | Neutral vs Straight vs Bubble vs Blockbuster | Partially represented; word sheet currently includes effects |
| P03 Bubble parameter sweep | A/B/G/R/S | conservative levels, counters and neck diagnostics | Not yet a calibrated sweep |
| P04 Straight operation comparison | A/B/G/R/S | curve/corner changes and unchanged cases | Resolver operation report exists; needs clean plate |
| P05 Block fit | A/B/G/R/S | front-face geometry, no depth | Existing operation; inspect geometry-only |
| P06 Pair context | AR/BA/BR/GR/RA/SA/SB/GS | neutral and supported compositions | Existing fixtures; do not infer missing joins |
| P07 Word context | ABRA + partial words | neutral and supported compositions | Existing fixtures; partial coverage required |
| P08 Finish isolation | same canonical specimens | flat vs outline/depth/highlight | Existing render function; geometry hashes must match |
| P09 Thumbnail resilience | same specimens | fixed small display sizes | Not yet evidenced for all templates |
| P10 Wildstyle relationship | pairs/words | anchors, joins, crossing order | Blocked by C04 |
| P11 Tag/Handstyle | authored stroke samples | monoline, broad-nib, brush gesture | Blocked by stroke representation |
| P12 Script/hybrid | sourced script glyph set | Textura/Fraktur/Calligraffiti studies | New glyph data required |
| P13 Experimental | named transformations | controlled irregularity/deconstruction | New operation family required |

## 5. Rendering rules

- Grammar comparison uses solid monochrome front-face silhouettes.
- No outline, extrusion, chrome, shadow, highlight, drips, texture or gradient in the primary comparison.
- Skeleton, construction, semantic diagnostic and final silhouette are separate views.
- Rendering treatments are tested separately and must not alter canonical geometry.
- Keep normalized comparison and native-size specimen views; label them.
- Do not make all specimens the same width if that erases authored glyph proportions.

## 6. Maturity and review

Each specimen/template uses these states independently:
- documented;
- implemented;
- rendered;
- geometry-validated;
- compared;
- practitioner-reviewed;
- calibrated;
- generator-ready.

No state is inferred from another. A geometry pass is not a visual pass. A proof image is not a review. No automated process may promote a glyph or template to approved.

## 7. Required deliverables for the next implementation PR

1. Resolver contract extension for one narrowly scoped slice, with version bump where required.
2. Deterministic operations and unit tests.
3. A neutral proof plate and operation report for the slice.
4. Fixture and maturity metadata preserved.
5. Before/after geometry hashes and finish-isolation check.
6. Update `TEMPLATE_INDEX.md` with per-template maturity.
7. Update `docs/STATUS.md` and changelog.
8. No bulk image assets unless curated and rights-cleared; prefer SVG proof plates and CI artifacts.

## 8. Recommended implementation order

1. Improve core neutral proof sheets for the existing four renderable families.
2. Calibrate Bubble and Straight on authored-contour A/B/G/R/S only.
3. Correctly represent Blockbuster as Straight + Block-fit composition, not a separate alphabet.
4. Implement C04 relationship solver before Semi-Wildstyle and Wildstyle connections.
5. Implement Throw-up as a context/presentation layer, independent of letterform.
6. Add Tag/Handstyle only after a gesture/stroke data model exists.
7. Build Blackletter and Calligraffiti as distinct sourced glyph/script projects.
8. Add Experimental templates with explicit transformation records.
9. Revisit Old-School only through bounded, source-specific historical studies.

## 9. Known blockers / decisions
- Owner visual review of C02 masters remains outstanding.
- Bubble/straight numerical parameters are not calibrated.
- Wildstyle interlocking is unavailable until C04.
- Static glyph contours cannot prove handstyle ductus.
- Blackletter, calligraphic and historical references require specialist/source review.
- Provisional C02 letters cannot silently certify full word fixtures.
