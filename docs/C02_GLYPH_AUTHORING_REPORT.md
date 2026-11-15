# C02 — Neutral A–Z Glyph Authoring Report

**Package:** C02 (`docs/CLAUDE_FINAL_RELEASE_TICKET_PACK_01.md`) · **Plan:** `research/A_Z_GLYPH_AUTHORING_AND_PRIORITY_PLAN_01.md`
**Status:** Wave 1 (C, D, O, P, Q) complete · Waves 2–4 not started

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
