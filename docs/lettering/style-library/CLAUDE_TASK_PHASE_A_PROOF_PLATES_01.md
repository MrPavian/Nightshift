# Claude Task — Phase A: Neutral Style Proof Plates

**Priority:** next implementation slice for the Style Reference Library  
**Scope:** current implemented subset only; do not implement new style families in this task.  
**Read first:** `CLAUDE.md`, `AGENTS.md`, `docs/STATUS.md`, `docs/lettering/style-library/PROOF_IMPLEMENTATION_PLAN_01.md`, `research/PROOF_SHEET_AND_TEST_FIXTURE_INFRASTRUCTURE_01.md`, `research/VISUAL_CALIBRATION_AND_COMPARATIVE_EVALUATION_01.md`, `contracts/style-resolver.v1.json`.

## Objective

Produce a reproducible, honest, monochrome proof run for the currently implemented core grammars. Existing `tools/proof-styles.mjs` is not sufficient as-is: its word plate applies outline/depth/highlight treatments to Bubble and Blockbuster, so it is not a neutral grammar comparison.

## In scope

1. Neutral baseline.
2. Straight / Simple.
3. Bubble.
4. Blockbuster = Straight + Block-fit.
5. Wildstyle request only as an explicitly skipped relationship-composition diagnostic; do not depict or label it as interlocked.
6. Authored-contour glyphs A/B/G/R/S as the primary review set.
7. ABRA as the primary authored-subset word fixture. Other word fixtures may be included only with visible partial/provisional coverage labels.
8. Existing pair fixtures only where their coverage and glyph maturity permit a meaningful comparison.

## Required output

Create a new versioned proof run under `docs/reports/proof/style-library/phase-a-01/` (or the repository's established immutable run convention if one is already implemented). Include:

- `manifest.json` with source revision, contract/resolver/validator/renderer versions, fixture IDs, specimen IDs, resolved operations and parameters, render profile, validation references and artifact hashes;
- isolated glyph comparison SVG plate;
- pair-context SVG plate;
- ABRA word-context SVG plate;
- thumbnail comparison plate;
- machine-readable operation/validation report;
- concise README explaining coverage, limitations and how to reproduce.

Keep SVG plates reasonably small. Do not commit large raster batches unless the project convention requires them.

## Rendering constraints

- Plain neutral-light background.
- Solid black front-face silhouette.
- No outline, inline, depth, highlights, chrome, texture, drips, gradient or decorative marks.
- Fixed orthographic/normalized comparison settings, plus a separately labelled native view where useful.
- Same glyph source revision and consistent render dimensions across styles.
- Show Neutral, Straight, Bubble and Blockbuster in a clear grid.
- For Wildstyle, show a diagnostic note that interlocking is skipped because C04 is unavailable; do not create fake arrows or joins.

## Required checks

- Geometry validation per specimen.
- Preserve canonical master geometry; derived outputs remain derived/reference-only.
- Verify finish is disabled in all primary comparison plates.
- Preserve the exact resolver status and reason for each operation.
- Verify that Blockbuster is represented as Straight + Block-fit.
- Verify that Wildstyle relationship composition is skipped, not passed.
- Record geometry hashes and stable specimen IDs.
- Provisional glyphs/words remain visibly partial and cannot be reported as fully certified.
- Re-run relevant tests and report exact commands/results. Do not invent test results.

## Review artifact

Add a blank human-review template using the existing review protocol. Do not populate ratings, choose winners or promote maturity. Include tie / neither / cannot-judge options if the current review schema supports them.

## Do not do

- Do not add uncalibrated controls to the production UI.
- Do not label a proof sheet “approved”.
- Do not treat visual rendering as human approval.
- Do not change canonical glyph masters to make a style pass.
- Do not add Tag/Handstyle, Blackletter, Calligraffiti, Semi-Wildstyle or Anti-Style operations in this phase.
- Do not implement Wildstyle interlocking without the C04 relationship solver.
- Do not silently expand the scope into a broad refactor.

## Acceptance criteria

1. All four implemented core comparisons are monochrome and effect-free.
2. A/B/G/R/S are included with maturity metadata.
3. ABRA is included with its current coverage stated honestly.
4. Every specimen is traceable to exact inputs and hashes.
5. Wildstyle limitation is explicit in both visual plate and report.
6. Blockbuster axis composition is correct.
7. Geometry and relevant regression tests pass.
8. README reproduces the run.
9. Human review remains pending.
10. Update `docs/STATUS.md`, `TEMPLATE_INDEX.md` and changelog as required by repository convention.

## Handover

Open a focused PR. In the PR description report: changed files, exact commands and test results, proof artifact paths, unresolved issues, and a clear statement that no human visual approval has occurred.
