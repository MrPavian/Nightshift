# A–Z Style Grammar Application Matrix 01

**Status:** NIGHTSHIFT design specification; not implementation or visual approval.  
**Scope:** uppercase Latin A–Z, with a first-pass mapping from each glyph's neutral structural checklist to style-grammar operations.  
**Source basis:** `ALPHABET_TEST_MATRIX_AND_GLYPH_VARIANTS.md`, `GLYPH_DATA_CONTRACT_A_Z.md`, `STYLE_GRAMMAR_SPECIFICATIONS_01.md`, `STYLE_GRAMMAR_COMPATIBILITY_AND_PARAMETERS.md`, `MASTER_GLYPH_VARIANT_MATRIX_01.md`.  
**Boundary:** the structural descriptions below are adapted from the existing NIGHTSHIFT test matrix. The style-specific application rules are design hypotheses requiring authored geometry and visual review. They are not universal graffiti rules.

## 1. Purpose

This document connects the existing A–Z structural inventory to the style grammar system. It answers a practical question: when a grammar is selected, what should change for a particular letter, and what must remain protected?

The engine must not apply one global distortion to all letters. It must resolve a glyph-specific operation plan using:
- glyph identity and current authored variant;
- selected letterform grammar;
- composition grammar;
- recipe and project overrides;
- neighboring glyphs and relationship context;
- hard topology/identity constraints.

## 2. Non-negotiable separation

- Bubble and Straight are letterform construction grammars.
- Blockbuster is represented through straight/block letterform tendencies plus relevant block-fit / scale / coverage context; do not create a fake exclusive Blockbuster alphabet.
- Wildstyle Study is primarily a composition/relationship grammar. It may work with straight, rounded or hybrid glyphs.
- Throw-up, piece, panel and wholecar remain practice/form or surface contexts, not mandatory letterform grammars.
- Fill, outline, chrome, depth and texture are rendering treatments and cannot make a neutral glyph count as a structurally different style.

## 3. Per-glyph application matrix

The table identifies protected structure and candidate grammar behavior. “Candidate” means the engine may propose an authored or registered operation; it does not imply that a corresponding production variant already exists.

| Glyph | Neutral structural basis | Protected identity / topology | Bubble candidate behavior | Straight / Block candidate behavior | Wildstyle composition candidate behavior |
|---|---|---|---|---|---|
| **A** | apex; two legs; crossbar; triangular counter | protect apex and two-leg identity; preserve counter unless named topology variant | round/soften apex and terminals; controlled mass expansion; counter clearance | straighten or clip apex/junctions; disciplined stem and crossbar hierarchy | diagonal leg rhythm; crossbar/leg anchor candidates; interlock only after counter-safe validation |
| **B** | spine; upper/lower bowls; two counters | preserve spine attachment and two distinct counters | round bowls independently; retain upper/lower distinction | square bowl transitions; align spine and bar hierarchy | bowl/spine anchors and selective overlaps; protect both counters |
| **C** | open curve; two terminals; open aperture | preserve open aperture and terminal direction | continuous rounded curve; soften terminals without closing opening | controlled straight/curved segments; clipped terminals | terminal-led extensions and open-channel flow; no forced closure |
| **D** | spine; bowl; one counter | preserve spine-to-bowl connection and counter | round bowl and transition; maintain broad negative space | straight spine and squared bowl transitions | bowl-to-neighbor overlaps with counter protection |
| **E** | spine; upper/middle/lower bars | preserve three-bar hierarchy and bar attachments | softened bar ends and junctions; optional bar curvature | straight bar alignment and deliberate length hierarchy | bar continuation candidates; avoid merging all bars into one mass |
| **F** | spine; upper/middle bars; open lower side | preserve open lower structure and bar order | rounded terminals; softened junctions | straight bar hierarchy; strong top/mid alignment | bar continuation and terminal extensions; keep open side legible |
| **G** | open bowl; aperture; internal bar/terminal | preserve G-specific aperture and bar logic; do not collapse to C/O | rounded bowl while retaining aperture and bar distinction | squared bowl and controlled terminal/bar geometry | aperture-safe terminal connections; no channel blockage |
| **H** | two stems; crossbar | preserve two stems and crossbar connection | round transitions while keeping crossbar legible | parallel stem and crossbar alignment | crossbar continuation and stem overlaps; preserve interior gap |
| **I** | stem; optional bars/serifs are authored choices | preserve intentional simplicity; do not invent ornament by default | rounded terminal treatment only where authored | straight stem; optional bars remain explicit variant traits | extension only from declared anchors; avoid forced joins |
| **J** | upper terminal; descending stem; curved foot | preserve descender direction and curve-to-stem transition | smooth lower curve and terminal rounding | angular or clipped transition with clear descender | tail/terminal flow into next glyph; avoid false shared stroke |
| **K** | stem; upper/lower diagonals; branch junction | preserve branch junction and distinct diagonal arms | soften acute junctions without closing negative wedges | straight diagonals and controlled branch angle | branch anchors and crossing order; validate wedge clearances |
| **L** | stem; foot; terminal | preserve stem-to-foot connection and foot direction | round inside/outside corner selectively | square foot and stem; proportion foot intentionally | foot continuation or terminal extension; avoid decorative bridge |
| **M** | multiple stems/diagonals; central valley | preserve central valley and distinct stems | round valleys and outer shoulders without collapsing gaps | straight stems/diagonals; consistent but not identical widths | valley/diagonal anchors; preserve internal channels during overlap |
| **N** | two stems; diagonal connector | preserve diagonal direction and both junctions | soften diagonal-to-stem transitions | straight stems and diagonal with clear junction hierarchy | diagonal continuation candidates; no ambiguous crossing |
| **O** | closed contour; one counter | preserve enclosed counter and non-generic silhouette | rounded mass with controlled asymmetry; counter clearance | squared/rectilinear contour option; maintain counter | counter-safe overlap; no crossing through protected counter |
| **P** | spine; upper bowl; one counter; open lower termination | preserve single counter and bowl attachment | round upper bowl; maintain open lower structure | square bowl/spine transition; disciplined bar | bowl and terminal relationships; protect counter |
| **Q** | O-like closed contour; counter; tail | preserve counter and explicit tail origin/direction | round contour while keeping tail distinct | squared contour and controlled tail attachment | tail may connect outward only from declared anchor; counter protected |
| **R** | spine; bowl; diagonal leg; one counter | preserve counter, bowl and leg attachment | round bowl; keep leg directional and distinct | square bowl; clear leg angle and junction | leg/neighbor anchor opportunities; protect counter and leg junction |
| **S** | continuous directional curve; upper/lower mass | preserve continuous flow and neck; no counter assumed for current master | smooth curve tension; maintain upper/lower distinction | angular-flow authored variant; preserve continuous directional read | terminal-led flow; interlock must not pinch neck |
| **T** | top crossbar; descending stem | preserve crossbar/stem junction and hierarchy | round terminals and soften junction | straight top bar and vertical stem alignment | bar continuation and top/bottom anchors; avoid accidental extra stem |
| **U** | two stems; continuous base; open top | preserve open top and continuous base | round base transition and terminal treatment | straight stems with controlled base geometry | open-terminal flow and base adjacency; don't close opening |
| **V** | two diagonals; converging vertex | preserve vertex and diagonal distinction | soften vertex without rounding into U | straight diagonals; controlled acute angle | vertex clearance and diagonal continuation; avoid fragile slivers |
| **W** | repeated diagonals; central valleys | preserve multiple valleys and distinct diagonal rhythm | round valleys while retaining repeated structure | straight diagonal rhythm; manage overall width | valley-aware interlocks; preserve internal channels |
| **X** | crossing diagonals; central intersection | preserve crossing order and four-arm identity | soften central junction; preserve four arms | straight diagonals with explicit crossing/over-under choice | explicit crossing order; no implicit shared stroke |
| **Y** | upper fork; lower stem; branch junction | preserve fork and descending stem continuity | round fork transition while retaining branch identity | straight fork arms and stem alignment | fork anchors and stem flow; explicit crossing order if overlapped |
| **Z** | top/bottom bars; diagonal connector | preserve bar/diagonal attachments and corner integrity | soften corners and terminals without losing diagonal | straight bars and diagonal with controlled junctions | bar continuation and diagonal flow; preserve corner clearance |

## 4. Operation families and ownership

A style grammar may request only registered operations owned by the relevant subsystem.

| Operation family | Examples | Owner | Hard checks |
|---|---|---|---|
| Proportion | width profile, height relation, bowl/leg balance | glyph variant | identity, bounds, anchor recalculation |
| Mass | stem profile, local weight, mass bias | glyph/component | counter and channel clearance |
| Curvature | curve tension, corner/terminal treatment | glyph/component | degeneracy, self-intersection, topology |
| Bar/junction | bar length/height, branch angle, junction treatment | semantic component | attachment and component graph |
| Negative space | counter shape/clearance, aperture opening, channel width | glyph topology | protected negative-space invariants |
| Layout | advance, spacing, baseline rhythm, slant | composition | collision, word silhouette, surface fit |
| Relationship | near-touch, terminal join, overlap, interlock | relationship solver | anchors, crossing order, whole-word validation |
| Finish | fill, outline, inline, depth, texture | rendering | renderer parity; no canonical geometry mutation |

A parameter must have one owner. A grammar can express a preference, but it cannot directly mutate another subsystem's canonical state.

## 5. Per-glyph capability and maturity rules

The existing prototype has individually authored contour masters only for A, B, G, R and S; the other 21 bases remain provisional according to the current project audit. Therefore:

- Do not present the 21 provisional glyphs as reviewed production masters.
- Do not claim the matrix creates style variants by itself.
- A grammar request for a glyph without a compatible authored variant must return a transparent status: neutral fallback, unchanged glyph or an explicitly marked experimental preview, according to the selected conflict policy.
- Never fabricate a topology-changing variant from a generic slider.
- The first A/B/G/R/S candidate controls must follow `MASTER_GLYPH_VARIANT_MATRIX_01.md` and the parameter/geometry contracts.
- The remaining 21 glyphs need explicit semantic masters before broad A–Z style claims.

## 6. Word-level grammar resolution

Resolve each word in this order:

1. Read canonical glyph IDs, current variant IDs and maturity.
2. Resolve letterform grammar against each glyph's declared compatibility.
3. Produce glyph-specific construction requests from this matrix and registered parameters.
4. Validate each glyph candidate (identity, topology, geometry, anchors).
5. Resolve composition grammar and relationship candidates from actual anchors.
6. Validate the entire word, including non-adjacent collisions and negative-space channels.
7. Apply surface/format constraints.
8. Apply rendering as a derived finish stage.
9. Persist resolved operation IDs, values, skipped operations, warnings, seed and generator version.

If any hard check fails, reject the affected candidate atomically. Do not silently deform a neighboring letter to make an invalid join work.

## 7. Controlled variation, not uniform font filtering

Variation is intentionally distributed:
- a recipe may preserve one letter's master while allowing more freedom in another;
- width rhythm may vary by glyph class and word position;
- terminals and junctions may differ according to local structure;
- composition density may increase in selected regions rather than uniformly;
- a deliberate exception is stored as an explicit override.

The same recipe applied to two different words should preserve its recognizable tendencies without forcing identical per-letter geometry. Deterministic seeds control only declared variable choices; they do not override locked recipe rules or authored exceptions.

## 8. Proof and regression matrix

Every grammar/glyph proof run records:
- engine/schema/grammar version;
- glyph and variant IDs, maturity and provenance;
- operation IDs and resolved values;
- project seed and recipe version;
- automated identity/topology/geometry/anchor results;
- human review state and proof-sheet reference.

Required comparisons:
1. neutral master silhouette;
2. Bubble silhouette without finish effects;
3. Straight/Block construction silhouette without finish effects;
4. Wildstyle composition on a fixed word, showing relationship graph and negative-space diagnostics;
5. same construction with rendering switched on, proving finish does not masquerade as grammar;
6. pair and whole-word contexts from the existing A–Z review package.

Use the fixed test words from the alphabet matrix: ABRA, BOMB, GHOST, KRAZE, MIND, NYX, RISK, SQUE, WAVE and ZERO. Retain the established pair fixtures and include repeated letters and narrow/wide transitions. Automated passes do not replace human visual review.

## 9. Acceptance criteria

1. Every A–Z glyph has a stable identity and an explicit structural checklist.
2. Every grammar operation maps to a registered parameter or authored variant.
3. Protected counters, apertures, channels, branches and open terminals survive the relevant grammar transformation.
4. Bubble and Straight produce different monochrome construction geometry, not merely different finishes.
5. Blockbuster behavior is expressed through straight/block construction plus composition/format context, not a contradictory exclusive family.
6. Wildstyle changes relationship/composition behavior and does not merely add arrows or decorative bridges.
7. Missing/provisional glyph capability is visible and never falsely marked production-approved.
8. Same project, grammar, recipe, engine version and seed reproduce the same canonical result.
9. Whole-word validation runs after local glyph and relationship changes.
10. Proof sheets include neutral, construction-only and finish views.
11. Human review status remains separate from automated geometry validation.
12. All operation provenance and skipped/incompatible rules are persisted.

## 10. Implementation sequence

**Slice A — Resolver only:** map grammar axes to per-glyph candidate operation plans; do not mutate geometry.

**Slice B — A/B/G/R/S:** connect only reviewed/registered controls from the existing master variant matrix and parameter contract.

**Slice C — Remaining 21 glyph masters:** author semantic construction and neutral proof sheets before grammar expansion.

**Slice D — Pair and word composition:** apply Wildstyle Study through relationship candidates, with whole-word validation.

**Slice E — Controlled style variation:** recipes, locks, exceptions and deterministic seed-based variation.

Do not advance a slice because a menu or slider exists. Require canonical model behavior, validation, persistence and visual proof.
