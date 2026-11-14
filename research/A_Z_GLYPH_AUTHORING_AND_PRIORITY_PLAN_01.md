# NIGHTSHIFT A–Z Glyph Authoring and Priority Plan 01

**Status:** Construction planning specification; no new glyph masters authored or visually approved by this document.  
**Basis:** Existing A–Z review inventory, data contract, grammar application matrix and current A/B/G/R/S source audit.  
**Purpose:** Establish a defensible order and consistent authoring brief for the remaining 21 glyphs.

## 1. Scope and evidence boundary

The current source-backed authored-contour set is A/B/G/R/S. The other 21 letters remain provisional. The structural descriptions below preserve the existing NIGHTSHIFT review inventory; they are not claims that every historical writer used one canonical form.

This plan does not invent coordinates, path strings, stroke order, numeric metrics, production anchors or universal style rules. Candidate semantic components are addressable design proposals. They become canonical only after an authoring record, topology validation and human review.

## 2. Authoring principles

1. Establish neutral identity before applying a style grammar.
2. Represent positive components and negative-space regions separately.
3. Distinguish enclosed counters, exterior-connected apertures and open channels.
4. Store the original authored construction and every variant as versioned geometry.
5. Do not infer gesture order from closed contours.
6. Define anchor zones from measured geometry; never hardcode unreviewed coordinates.
7. Validate at isolated glyph, pair, word and thumbnail scales.
8. Treat alternate topology as a separately named authored variant.
9. Keep maturity per glyph and per variant; never promote automatically.
10. A fallback glyph may support text entry/layout preview but cannot certify a full style or generator result.

## 3. Proposed authoring waves

Priority is based on topology coverage, structural diversity and usefulness for pair/word fixtures—not historical importance.

### Wave 0 — Existing authored-contour masters
A, B, G, R, S.

Work: preserve exact snapshots, resolve semantic mapping, classify topology, validate geometry, generate neutral proof output. These five are not yet production-approved.

### Wave 1 — Core topology and bowl families
C, O, D, P, Q.

Why first:
- C introduces a clearly exterior-connected opening without an enclosed counter.
- O introduces a closed contour with one counter.
- D and P introduce attached bowl/spine structures with different termination logic.
- Q adds a tail whose attachment must remain explicit.

This wave broadens the topology vocabulary needed by the solver and tests C/G/O distinctions.

### Wave 2 — Bar and stem systems
E, F, H, I, L, T.

Why:
- Establishes single/multiple bar hierarchies and stem-to-bar junctions.
- Provides simple forms for testing deliberate separation, bar continuation and terminal handling.
- I is intentionally kept simple; do not invent ornament to make it appear complex.

### Wave 3 — Diagonal and branch systems
K, M, N, V, W, X, Y, Z.

Why:
- Adds acute vertices, multiple valleys, diagonal junctions and crossing-order problems.
- These are high-risk for negative-space collapse and advanced interlocking.
- X and Y require explicit junction/crossing semantics; do not treat overlap as a generic visual effect.

### Wave 4 — Descender and curve completion
J, U.

Why:
- Adds descender/foot continuity and open-top/base-curve behavior.
- Completes the neutral alphabet inventory and extends terminal/curve test coverage.

The wave order is a planning queue, not a rigid creative restriction. If a dependency or a failed review indicates another glyph should precede it, record the reason and update the queue.

## 4. Per-glyph neutral construction briefs

All component names below are proposed semantic roles, not verified segmentation of an existing path.

| Glyph | Candidate positive components | Protected negative space / topology | Identity and validation focus |
|---|---|---|---|
| C | upper terminal, upper arc, lower arc, lower terminal | exterior-connected aperture | opening direction/continuity; C/G/O distinction |
| D | spine, bowl, spine-bowl junction | one enclosed counter | attached bowl, counter clearance, spine continuity |
| E | spine, upper bar, middle bar, lower bar | no required counter | three-bar order, attachment, hierarchy |
| F | spine, upper bar, middle bar | open lower side; no required counter | upper/middle distinction, open lower structure |
| H | left stem, right stem, crossbar | interior channel | two stems remain distinct; crossbar attachment |
| I | stem; optional top/bottom bars only in explicit variants | no required counter | preserve intentional simplicity; variant-specific bar traits |
| J | upper terminal, descending stem, curved foot | open terminal/curve region | descender direction, foot-to-stem transition |
| K | spine, upper diagonal, lower diagonal, branch junction | two branch-side negative-space regions | junction integrity, distinct diagonal arms |
| L | stem, foot, stem-foot junction | no required counter | foot direction and attachment |
| M | outer stems, inner diagonals, central valley | interior channels | valley identity, distinct stems, width rhythm |
| N | left stem, diagonal connector, right stem | interior channel | diagonal direction and both junctions |
| O | outer bowl | one enclosed counter | closed contour, counter preservation, silhouette distinction |
| P | spine, upper bowl, lower termination | one enclosed counter | bowl attachment, open lower structure |
| Q | outer bowl, tail, tail junction | one enclosed counter | explicit tail origin/direction; counter protection |
| T | top bar, descending stem, junction | no required counter | crossbar/stem hierarchy and attachment |
| U | left stem, base curve, right stem | exterior-connected top opening | open top, continuous base, stem balance |
| V | left diagonal, right diagonal, vertex | acute interior region | vertex integrity, no fragile sliver |
| W | diagonal arms, valleys | multiple interior channels | repeated valley rhythm and distinct arms |
| X | diagonal arms, central crossing/junction | crossing-dependent negative regions | explicit crossing order, four-arm identity |
| Y | upper fork arms, lower stem, branch junction | fork-side negative regions | fork identity and descending continuity |
| Z | upper bar, diagonal connector, lower bar | corner transition regions | bar/diagonal attachments and corner integrity |

## 5. Required record for each authored glyph

Each new glyph master must include:
- stable glyph and variant IDs;
- immutable authoring source snapshot and provenance;
- semantic component graph with mapping confidence;
- editable vector contours and stable segment/node IDs;
- explicit topology signature and negative-space entities;
- measured metrics with units, method, error and calibration status;
- candidate anchors with derivation and validation status;
- identity invariants and named failure diagnostics;
- authored-contour maturity until review;
- neutral proof specimen IDs and isolated/pair/word fixture coverage.

If a semantic component cannot be mapped unambiguously, retain it as a proposed unmapped component. Do not distort geometry to force a tidy graph.

## 6. Topology and risk register

| Risk class | Glyphs | Required guard |
|---|---|---|
| Enclosed counter | B, D, O, P, Q, R (A as authored) | containment, counter identity, calibrated clearance |
| Exterior aperture | C, G, U | exterior connectivity and terminal/opening continuity |
| Branch/acute junction | A, K, V, Y, Z | junction connectivity, local degeneracy and identity |
| Multiple channels/valleys | M, N, W, X, Y | channel continuity and non-collapse |
| Crossing order | X, potentially advanced K/Y/Z variants | explicit crossing/occlusion graph; no implicit join |
| Tail/descender | J, Q | origin, direction, attachment and collision validation |
| Bar hierarchy | E, F, H, T | semantic attachment and distinct bar roles |

These are validation priorities, not claims that every candidate shape necessarily has a specific topological defect.

## 7. Authoring and review loop

For every glyph:
1. Write a neutral structural brief.
2. Author one intentional master contour.
3. Add semantic component proposals without mutating the contour.
4. Run geometry and topology validation.
5. Measure bounds, negative-space regions and candidate anchors.
6. Generate neutral silhouette and diagnostic proof plates.
7. Review at full size and thumbnail.
8. Test the canonical pair fixtures that contain the glyph.
9. Test at least two word contexts with different neighbors where the fixture inventory allows.
10. Record defects, disagreements and unresolved mappings.
11. Only then create structural variants.
12. Create topology-changing variants separately and review them independently.

## 8. Alphabet coverage gates

- **Neutral coverage:** all 26 glyphs have intentional authored masters and truthful maturity labels.
- **Semantic coverage:** all required components and topology entities have reviewed mappings.
- **Grammar coverage:** each claimed glyph/grammar combination has a real authored operation or variant and monochrome proof.
- **Pair coverage:** each supported pair relationship has anchor and whole-pair validation.
- **Word coverage:** test words contain no silent provisional fallback in a claimed production result.
- **Production approval:** requires the established human review, persistence, deterministic regeneration and renderer parity gates.

A fully populated alphabet registry is not equivalent to a production-ready alphabet.

## 9. Initial authoring acceptance

1. All 26 letters have a stable ID and neutral structural checklist.
2. Only A/B/G/R/S retain authored-contour status until evidence supports further transitions.
3. No new master is represented as source-derived unless its actual authoring provenance is recorded.
4. Counter/aperture/channel distinctions are explicit.
5. Every new master has neutral proof and topology report before style variants.
6. Pair/word fixture coverage and partial maturity are visible.
7. No numeric geometry bounds or anchor coordinates are invented.
8. No glyph is production-approved by schema completeness alone.
