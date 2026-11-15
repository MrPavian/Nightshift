# C02 — Neutral A–Z Glyph Authoring Report

**Package:** C02 (`docs/CLAUDE_FINAL_RELEASE_TICKET_PACK_01.md`) · **Plan:** `research/A_Z_GLYPH_AUTHORING_AND_PRIORITY_PLAN_01.md`
**Status:** Waves 1–3 authored (24/26 letters), owner review pending · Wave 4 (J, U) open

## Wave 3 — K, M, N, V, W, X, Y, Z (2026-11-15)

### Construction
- **Constructed, not drawn by eye.** `tools/lib/wave3-construction.mjs` builds every outline from stroke edges.
  - Each diagonal has two exactly parallel edges at a perpendicular thickness of 25 units; stems are 26 and bars 23, as in the family.
  - Notches, branch points and crossings are computed as intersections of lines; coordinates are rounded to whole units.
  - A test proves that the committed paths are identical to the construction.
- **Measured thickness:** the masters hold 24.2–26.1 units on the diagonals. The v0.6 bases varied from 19.6 to 28 (M 21.6–22.5, W 19.6–26.7); V and X there had no parallel edges at all.

| Glyph | Decision |
|---|---|
| K | Spine 26; arm from the spine (y=60) to the top right (74–105); leg from the branch point (63, 66) to the bottom right (76–106) |
| M | Stems 10–36 / 78–104; diagonals from the inner top corners meet on the axis; valley at y=89 |
| N | Stems as H; one diagonal from the top of the left stem to the foot of the right stem |
| V | Symmetric about x=52; flat foot 40–64 on the baseline |
| W | Two Vs with one slope; middle apex at cap height (52–74), inner notches at y=66, middle valley at y=83 |
| X | Two full-height strokes crossing at the centre; four computed notches |
| Y | Arms meet at y=50; stem 39–65, identical to T |
| Z | Bars as E; diagonal from the top right to the bottom left |

### Semantics and identity
- Overlay 1.4.0 adds components for spine/stems, arm, leg, diagonals, apex, foot, crossing strokes and bars. The components partition every outline exactly once (tested).
- Junction kinds include `branch` (K, Y) and `crossing` (X).
- Identity: `single-required-connected-contour`, `no-unintended-self-intersection` and `no-enclosed-counter` are decided by geometry. The distinctions (K↔R↔X, M↔N↔W, V↔U↔Y, X↔K↔Y, Z↔N↔S) stay with human review.

### Results
- All eight pass every hard check. **24 of 26 letters** have authored masters; only J and U (wave 4) are still provisional.
- Proof run `run.0.7A-T06.da171a9bbfcd`. **All six word fixtures** (ABRA, BOMB, GHOST, KRAZE, MIND, NYX) now consist only of authored masters (`authored-subset`).
- Tests: `npm test` 123/123 (new: `tests/authored-wave3.test.js` with 5 tests); browser SMOKE, REVIEW-PAGE and EDITOR-PASS. T07 editor proof: 13/13.

### Maturity
K, M, N, V, W, X, Y, Z: `provisional` → `authored-contour` (no review).

## Wave 2 — E, F, H, I, L, T (2026-11-15)

Order follows Issue #9 and the owner decision of 2026-11-15: the archive comes first, then C02 → C08. Wave 2 builds on wave 1 (stacked on PR #6) and duplicates no work.

### Source and provenance
- Authoring snapshot: `data/glyphs/authored/c02-wave2.v1.json` (1.0.0). Every path is stored verbatim with its SHA-256 hash. Provenance is `claude-authored`; the paths are not traced from fonts, artworks, photos or writers. Review is **pending**.
- The v0.6 base of each letter stays as a reference-only second variant.

### Construction decisions (bar and stem systems)
The v0.6 bases were geometrically usable but did not match the authored family: stems were 27–28 units, bars 25–27, and middle-bar heights varied. Wave 2 normalises them:

| Glyph | Decision |
|---|---|
| E | Spine 26; top bar 8–31 to x=92; middle bar 59–81, shortened to x=80; foot bar 109–132 to x=94 |
| F | E without the foot bar; top and middle bar identical to E (tested: same outline up to the foot) |
| H | Two full-height stems, 26 each; crossbar in the same 59–81 band as E/F |
| I | Stem 26, centred, with symmetric terminal bars (x=14–72), so I keeps a readable width in words |
| L | Spine 26; foot bar 109–132 at E's foot-bar height |
| T | Top bar 8–31, x=6–98; centred stem 39–65 |

### Semantics and identity
- Overlay 1.3.0 adds component proposals (spine/stem, top/middle/foot bar, terminals, crossbar) and junctions. All components are `provisional-unmapped`, with candidate segments; every reference points to existing geometry (tested).
- New, decidable identity check `no-enclosed-counter`: exactly one outer contour and no counter. It separates E/F/H/I/L/T from B, P and A by geometry. The distinctions (E↔F↔B, H↔A↔N, I↔T↔L) stay `…-review`, which means human review.

### Results
- All six pass every hard check. Identity: `single-required-connected-contour`, `no-unintended-self-intersection` and `no-enclosed-counter` all `passed`.
- 16 of 26 letters have authored masters: A B C D E F G H I L O P Q R S T.
- Proof run `run.0.7A-T06.71bcd23f82f6`. GHOST now consists only of authored masters (`authored-subset`). BOMB, KRAZE, MIND and NYX still contain provisional letters from waves 3–4.
- The editor picks the editable letters dynamically from the registry, so the six new masters are directly editable. T07 editor proof: 13/13 steps.
- Tests: `npm test` 118/118; `npm run test:browser` SMOKE, REVIEW-PAGE and EDITOR-PASS.

### Maturity
E, F, H, I, L, T: `provisional` → `authored-contour` (no review).

### Open
- Owner review of waves 1 and 2 (PR #6, this PR).
- Wave 3 (K M N V W X Y Z: diagonals, branches, valleys, crossings) and wave 4 (J, U).
- After merging with C06: the C06 test compares the bridge glyph list against a fixed `EDITABLE` list. Since wave 1 that list is dynamic, so `BRIDGE_GLYPHS` must follow the registry.

## Wave 1 — C, D, O, P, Q (2026-11-15)

### Source and provenance
- Authoring snapshot: `data/glyphs/authored/c02-wave1.v1.json` (version 1.0.0). Every path is stored verbatim with a SHA-256 hash; imported contours reproduce it byte-for-byte (tested).
- Provenance `claude-authored`: original line/quadratic contours drawn by Claude to match the A/B/G/R/S family. They are not traced or derived from any font, artwork, photograph or identifiable writer. Human review is **pending**.
- Each record keeps its v0.6 provisional base as a **reference-only second variant** (`x.provisional`), so nothing from the prototype is lost.
- Importer: `src/glyph/import-authored.js`. The registry builds from `src/glyph/inputs.js`, and Node and browser use the same input list.

### Construction decisions
| Glyph | Family decision | Topology |
|---|---|---|
| C | Chamfered, sibling of G and O: arcs ending in horizontal terminals with vertical end caps, no bar | one **aperture**, classified, with an authored mouth construction between the inner terminal corners (48 units, uncalibrated) |
| O | Chamfered closed bowl; the counter repeats the chamfers | one enclosed counter |
| D | Straight spine with a curved bowl like B and R | one enclosed counter |
| P | R's spine and bowl without a leg; open lower structure | one enclosed counter |
| Q | O plus an explicit tail leaving the lower-right chamfer outward, as part of the outer contour; descends to y=145 | one enclosed counter; the tail never touches it |

Stroke and wall thickness stay in the family range (counter walls 22–25 units; A/B/R: 16–25). The validator checks that range against A/B/R (tested).

### Semantics and identity
- Component proposals follow the plan's §4 briefs (C: upper/lower terminal and arc; D: spine, bowl, spine-bowl junction; O: outer bowl; P: spine, upper bowl, lower termination; Q: outer bowl, tail, tail junction) and are added to the semantic overlay (v1.2.0).
- As for A/B/G/R/S, only counter boundaries are `mapped`. All other components are `provisional-unmapped` with candidate segments that cover each outer contour exactly once; this partition is ready for semantic review. In C, the left wall is shared by both arcs and is assigned to the upper arc provisionally.
- The validation contract has no identity profiles for these letters yet, so the overlay supplies them (`source` says so). New checks: `bowl-spine-attachment`, `open-lower-structure`, `tail-attached`, `tail-counter-clearance` (need reviewed mapping or calibration → `not-evaluable`), and `distinction-from-…-review` (human review → `not-evaluable`).

### Results (validator `legacy-v06@1.0.0`)
- C, D, O, P and Q pass every hard check, with one connected component each. Counters are certified enclosed; C's aperture is certified exterior-connected (`aperture-exterior-connected: passed`).
- C, G and O stay topologically distinct (0 counters + classified aperture / unresolved aperture + bar / 1 counter; tested).
- **All 26 letters now pass hard validation and render.** The v0.6 Q defect remains documented on the legacy reference variant.
- Proof run `run.0.7A-T06.4ca5f41d2531`: identity and semantic plates for all 10 authored masters; every pair and word fixture renders without missing slots.
- Two fixtures, `pair-go` and `pair-ro`, now consist only of authored masters: their coverage rises from `partial-provisional-coverage` (fixture contract) to `authored-subset`. The manifest records both under `coverage.contractCoverageChanges`. The other words still contain provisional letters, which render grey.

### Maturity
C, D, O, P, Q: `provisional` → `authored-contour` (authored master exists; **no review**). No glyph is `semantic-reviewed` or higher. The UI marks new masters as „Master·neu“ with their provenance.

### Open
- Human review of C, D, O, P, Q (and A/B/G/R/S): review form on the test page.
- Add identity profiles for C/D/O/P/Q to `contracts/glyph-geometry-validation.v1.json` (research side), so they no longer come only from the overlay.
- Waves 2–4: E F H I L T · K M N V W X Y Z · J U.
