# C03: Style grammar resolver: report

**Status:** partial. Bubble, Straight and Blockbuster are implemented as geometry changes for all 26 letters. Wildstyle is a study mode without interlocking. Owner review is pending.
**Date:** 2026-11-18
**Branch:** `claude/c03-style-resolver`, stacked on C02 wave 4 (#13)

## What exists now

| Part | File |
|---|---|
| Contract (axes, presets, operations, parameter policy) | `contracts/style-resolver.v1.json` |
| Resolver | `src/style/resolver.js` |
| Polygon operations (offset, loop removal, rounding, chamfer, corner clipping) | `src/style/polygon.js` |
| Proof sheets and report | `tools/proof-styles.mjs` → `docs/reports/proof/C03/` |
| Tests | `tests/style-resolver.test.js` (7 tests) |

## How a style works

A style request has separate axes, as in `contracts/az-style-grammar-application.v1.json`:

- **Letterform** changes geometry: `neutral`, `straight` or `bubble`.
- **Composition** changes geometry: `neutral`, `block-fit` or `interlocking`.
- **Practice context** (`throw-up`, `piece`, …) and **rendering** (`outline`, `depth`, …) never change geometry. Tests check this.

The presets are combinations of these axes:

| Preset | Letterform | Composition | Result for A–Z |
|---|---|---|---|
| Straight / Simple | straight | neutral | 13 changed, 13 unchanged, with a reason (right angles only) |
| Bubble | bubble | bounce (word only) | 26 changed |
| Blockbuster | straight | block-fit | 26 changed |
| Wildstyle (study) | straight | interlocking | 26 partial: interlocking skipped (C04 missing), letterform shown only |

Every operation runs on the authored master, which is never modified. Each step is validated:

- the hard checks of `validate-geometry.js` pass;
- the number of counters is unchanged;
- the glyph is still one connected part.

The resolver tries the parameter candidates in order and keeps the first that passes. If none passes, the step is reported as skipped with a German reason. The result is a derived record (`reference-only`, variant ID `x.style-<preset>`) plus a report. The report lists every operation with its status (`applied`, `unchanged`, `skipped`), its parameters and its reason.

## Operations

- **Straight:** curves become three straight pieces (a chamfered corner), and outer corners sharper than 80° are clipped by 5 units. Letters with right angles only (E, F, H, I, L, T, …) stay the same. The report says so; nothing is faked.
- **Bubble (v2, 18.11., after owner feedback that v1 was „just thicker“):**
  - Inflate: the mass grows with a mitred offset of 9 units (candidates 9, 7, 5, 3). Counters shrink to slits, and loops are removed.
  - Swell: each outer side between two convex corners bulges outward along a sine arc (14 % of its length, at most 12 units). Gaps between arms and legs (E, H, M, W) stay open.
  - Smooth: Chaikin, three passes.
  - In the word, the composition `bounce` makes letters tilt (−3°/+4°), shift (+5/−6 units) and overlap by 12 %. This is placement only; the glyph geometry stays the same, which is tested.
- **Blockbuster:** the Straight result is thickened by a mitred offset (5 or 3 units), then fitted to the block: cap height 8–132, width at least 75 % of that height.

The parameters are grammar defaults for the authored family, whose strokes are 23–26 units. They are **not calibrated** against reviewed reference pieces, and the contract says so.

## Honest limits

- **Wildstyle** shows only the Straight letterform. Interlocking, connections and arrows need the relationship solver (C04). Nothing is reported as interlocked.
- **Straight** has only a small effect on this family, because the authored masters are already mostly straight.
- **Bubble** shrinks counters a lot: those of A, B and R become small. They stay open, which is validated, but no human has judged how they look.
- There is no style switch in the editor or studio yet. Wiring that up belongs to C08 (Creator-first). There is no UI either, so no mobile or desktop proofs.
- There is no per-glyph protection of identity-specific details such as the aperture of G or C. Only hard geometry and the counter count are checked. Distinctions that are `-review` checks stay with a human.

## Rendering

`src/style/render.js` paints a resolved glyph on the rendering axis: fill, outline, 3D depth and highlights. The highlights are derived from the shape: points whose normal faces the light, pulled inward. `layoutWord` places glyphs in the word. Neither function changes geometry.

## Proofs

- `docs/reports/proof/C03/bubble-vorher-nachher.svg` and `.webp`: neutral, Bubble v1, Bubble v2 as a shape, and Bubble v2 in the word with outline, 3D and highlights.

- `docs/reports/proof/C03/style-grammar-A-Z.svg` and `.webp`: all five presets for A–Z, monochrome, with a status mark per letter.
- `docs/reports/proof/C03/style-word-fixtures.svg` and `.webp`: the six word fixtures in every preset.
- `docs/reports/proof/C03/resolver-report.json`: status, geometry hash and operations per letter and preset.
