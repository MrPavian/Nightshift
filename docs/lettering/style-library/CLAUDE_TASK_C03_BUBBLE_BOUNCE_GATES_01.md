# Claude Task — C03 Bubble Negative-Space Gates and Bounce Collision Safety

**Date:** 19 November 2026  
**Priority:** P1 — blocks Bubble/Bounce calibration and generator readiness  
**Status:** implementation handoff; not implemented  
**Related:** GitHub Issue #24, Phase-A proof PR #22  
**Read first:** `CLAUDE.md`, `AGENTS.md`, `docs/STATUS.md`, `contracts/style-resolver.v1.json`, `contracts/glyph-geometry-validation.v1.json`, `src/style/resolver.js`, `src/style/render.js`, `src/glyph/validate-geometry.js`, `src/geometry/topology.js`, `data/validator-profiles/legacy-v06.v1.json`, `tests/style-resolver.test.js`.

## 1. Verified current implementation

This brief is based on the current `main` source inspected on 2026-11-19.

### Bubble

- `src/style/resolver.js` local `check()` accepts a derived glyph when validator hard checks pass, the number of bounded counters matches the master, and connected components equal one.
- The Bubble branch tests `distanceCandidates` in order and accepts the first candidate that passes that gate.
- `src/glyph/validate-geometry.js` already reports exact counter area, counter-wall clearance measurements, measurement error bounds, and an explicit `uncalibrated` status when no approved profile threshold exists.
- `data/validator-profiles/legacy-v06.v1.json` has an empty `thresholds` array and `calibrationStatus: none-approved`. Do not invent a calibrated threshold.
- Aperture connectivity is classified, but the validator explicitly reports unresolved aperture throat measurement where its boundary definition is missing. Do not claim that every aperture has a certified minimum width.

### Bounce

- `src/style/render.js` `layoutWord()` applies the per-letter tilt and vertical shift and then sets the next x-step to `b.w * (1 - overlapRatio)`.
- It does not transform the actual contours for collision testing, does not classify tangencies vs intersections, and does not check whether negative-space channels between adjacent glyphs remain open.
- `tests/style-resolver.test.js` currently asserts that Bounce letters overlap. That test encodes the current behaviour, not the required safety property; replace it with explicit assertions for safe spacing and controlled, declared relationships.

## 2. Required design

### 2.1 Preserve measurements and calibration honesty

Use the validator's existing outputs first; avoid creating a parallel geometry measurement system.

For every declared counter, report at least:
- neutral master area;
- derived area;
- area ratio derived/master;
- minimum counter-wall clearance and its error bound, where available;
- calibration status and any approved threshold reference.

For every declared aperture, report:
- exterior connectivity;
- throat/minimum-width measurement only if its boundary definition is actually available;
- otherwise `not-evaluable` with a concrete reason.

Do not use area ratio alone as a universal pass criterion. It is a useful regression signal, not a substitute for local clearance or practitioner judgement.

### 2.2 Safe Bubble candidate selection

- Keep candidate search deterministic.
- A candidate that collapses a declared counter, merges counters, closes a required aperture, creates a hard geometry error, or violates an approved clearance threshold must be rejected.
- If the validator only has uncalibrated clearance measurements, report the geometry as `measured-uncalibrated`; do not turn an unapproved numeric guess into a production pass.
- If no candidate meets the available hard invariants, return an explicit skipped/fallback reason. Never force the strongest Bubble candidate through.
- The owner/practitioner review is required before calibration status can be promoted.

### 2.3 Safe Bounce word placement

Work in `src/style/render.js` where final positions are calculated.

- Construct the exact 2D transform used for each glyph (translation, rotation about the same centre, and any scale/skew already represented by the caller).
- Test adjacent transformed glyph contours, not only bounding boxes.
- Distinguish:
  1. positive-area contour intersection;
  2. boundary tangency / near-contact within numerical error;
  3. safe visual proximity;
  4. an explicitly declared relationship that permits a specific overlap.
- No overlap is permitted by default. A non-zero overlap parameter is only a candidate preference; it is not permission to fuse letters.
- An intentional pair relationship must identify both stable glyph-instance IDs, relationship type, permitted contact/overlap region, and layer/order semantics. If that relationship model is not available, reject the overlapping placement and fall back to a safe gap.
- Preserve inter-letter negative-space channels where declared. A channel is not a counter; do not count it as one.
- Return a deterministic placement report: accepted/rejected candidate, pair IDs, measured contact/clearance, error bound, relationship authorization, and fallback reason.
- Keep neutral layout behaviour unchanged.

## 3. Test plan

### Bubble glyph fixtures

For A/B/G/R/S:
- master geometry hash remains unchanged;
- deterministic output for identical input;
- no new topology/intersection errors;
- required counter count and IDs preserved;
- counter area and clearance metrics are emitted;
- aperture status is honest (certified, uncalibrated, or not-evaluable);
- rejected candidates include stable reason codes;
- no candidate is called calibrated or generator-ready without human review.

Include at least one synthetic regression fixture with a counter that remains technically enclosed but is made arbitrarily small. The old count-only gate must fail this test.

### Bounce pair and word fixtures

- AR, BA, BR, GR, RA, SA, SB, GS and ABRA.
- Verify actual transformed contours for each adjacent pair.
- A deliberately excessive overlap candidate is rejected or safely reduced.
- A declared relationship permits only the exact authorized pair and region.
- Undeclared tangency, intersection, or channel closure is rejected.
- Same inputs produce byte-identical placement and report.
- Neutral layout remains unchanged.

### Proof artifacts

Generate a new immutable run beside Phase A, not over it:
`docs/reports/proof/style-library/phase-a-02/`

Include:
- before/after monochrome glyph plates;
- before/after pair and ABRA word plates;
- per-glyph operations and negative-space metrics;
- per-pair collision/clearance report;
- manifest, source revision, versions, fixtures and hashes;
- clear maturity labels: `rendered`, `measured-uncalibrated`, `owner-review-required`.

Do not overwrite `review/ratings.json` from the earlier run or any human-authored review file.

## 4. Contract and versioning

- Update resolver version and contract version only when behaviour/schema actually changes.
- Update the capability matrix and template index with precise scope.
- Keep Bubble and Bounce uncalibrated pending visual/practitioner review.
- Do not mark any of the 38 templates `generator-ready`.
- Do not claim Wildstyle interlocking; C04 relationship solver remains a separate dependency.

## 5. Acceptance and reporting

Required:
1. Unit tests and all existing regression tests pass.
2. Proof generation and every established `--check` command pass.
3. Browser smoke and editor performance checks pass if affected.
4. New proof artifacts are reproducible and hash-verified.
5. Exact commands, test totals, commit SHA, changed files, and known limitations are reported.
6. No human approval is implied by automated checks.

If any requirement cannot be completed without owner review or missing relationship semantics, stop at a safe, explicit uncalibrated/unsupported state and report the blocker. Do not fabricate a pass.

## 6. Next sequence after this task

After Bubble/Bounce safety is proven and owner-reviewed, proceed in separate slices:
1. Straight variants (including a clear explanation when a glyph is unchanged).
2. Blockbuster construction/composition variants.
3. Throw-up presentation context, separate from Bubble letterform grammar.
4. Angular/Blade geometry operations.
5. Semi-Wildstyle composition operations.
6. Handstyle motor-plan subsystem (HST-01; stroke order, lifts and editable centreline paths, not font-like wobble).
7. Blackletter and Calligraffiti as distinct script/gesture systems.
8. Anti-style experimental grammar.
9. Wildstyle interlocking only after C04 relationship solver exists.

Do not batch these into one large implementation PR. Each family needs its own fixtures, proofs, capability state and review gate.
