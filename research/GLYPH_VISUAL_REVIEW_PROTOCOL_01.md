# Glyph Visual Review Protocol 01 — A–Z

**Status:** Review protocol / engineering specification  
**Scope:** Latin uppercase A–Z, with initial authored-contour masters A/B/G/R/S  
**Purpose:** Make glyph review repeatable, explainable and useful for implementation.  
**Boundary:** This protocol defines NIGHTSHIFT tests. It does not claim a universal graffiti alphabet or universal historical construction rules.

## 1. Review principles

1. Review the silhouette before fill, outline, depth or decoration.
2. Review identity before style complexity.
3. Review enclosed counters, open apertures and open channels as different topology types.
4. Review a glyph alone, at thumbnail size, in pair contexts and in words.
5. Separate automated geometry results from human visual judgement.
6. A passing test does not prove historical authenticity.
7. A glyph is not production-approved merely because it renders without errors.

Use the maturity states already defined in `GLYPH_REVIEW_PACKAGE_A_Z.md`. Do not advance maturity without evidence and a recorded review.

## 2. Review stages and gates

| Stage | Required evidence | Gate |
|---|---|---|
| Source integrity | stable ID, source snapshot, provenance | source is traceable |
| Semantic construction | component graph, roles, junctions | identity-bearing parts are represented |
| Topology | contours, counters, apertures, channels | declared topology matches geometry |
| Geometry | intersections, clearances, bounds, anchors | no unresolved critical geometry defect |
| Silhouette | neutral render at full and thumbnail size | recognizable and intentional |
| Style construction | same glyph under supported grammars | construction changes, not just decoration |
| Context | pair and word proof sheets | no unintended collisions or loss of identity |
| Rendering | fill/outline/inline/highlight/depth/surface | all passes agree on topology |
| Persistence | save/reload, deterministic regeneration | canonical geometry is stable |
| Human approval | reviewer, date, build, artifact and decision | explicit approval for that stage |

A failure blocks only the affected gate and dependent release claims. Record defects rather than silently lowering test coverage.

## 3. Per-glyph review record

Every glyph/variant review stores:
- glyph ID and character;
- variant ID;
- schema and generator version;
- maturity before and after review;
- source/provenance references;
- style grammar and parameter snapshot;
- deterministic seed and operation sequence;
- automated test report;
- proof-sheet artifact references;
- reviewer and date;
- pass / fail / needs-revision for each criterion;
- defect IDs, severity, affected component/contour/anchor;
- explicit rationale for any waiver.

## 4. A–Z identity and topology checklist

Use the following as the initial review focus. It is derived from the existing A–Z review inventory; do not reinterpret it as a claim that every letter must use one fixed construction.

| Glyph | Primary identity focus | Topology / negative-space focus | Confusion or stress comparison |
|---|---|---|---|
| A | apex, two legs, cross-structure | enclosed counter or explicitly named open-apex variant | Λ-like silhouette; V |
| B | spine, upper and lower bowls, waist | two independently protected counters in current master | P; repeated B forms |
| C | open curve and terminal direction | exterior-connected aperture | G; O |
| D | spine-to-bowl transition | enclosed counter | O; 0-like oval |
| E | spine and three-bar hierarchy | open right-side structure | F |
| F | spine and two-bar hierarchy | open right-side structure | E |
| G | open bowl, internal bar, terminals | protected aperture, not assumed counter | C; O |
| H | two stems and crossbar | crossbar placement and side channels | N; I |
| I | simple stem or authored barred form | no forced counter; variant-specific | l-like or bar confusion |
| J | upper terminal and descender | open terminal/curve continuity | U |
| K | spine and branching diagonals | junction integrity and branch channels | R; X |
| L | stem and foot | open structure; foot transition | I; T |
| M | multi-stem/diagonal rhythm | central valley and interior channels | N; W |
| N | two stems and diagonal | diagonal junctions and interior channel | M; H |
| O | closed bowl | one protected counter | C; G; D |
| P | spine and upper bowl | one protected counter; lower open region | R; B |
| Q | bowl and tail | protected counter plus tail attachment | O; G |
| R | spine, bowl and diagonal leg | protected counter and leg clearance | P; K |
| S | continuous directional curve | no counter in current master; neck clearance | 5-like experimental ambiguity |
| T | crossbar and stem | open lower structure | F; L |
| U | paired stems and base curve | open top; base continuity | J; V |
| V | converging diagonals | acute interior region | A; Y |
| W | repeated diagonal rhythm | multiple valleys and channel widths | M; V |
| X | crossing diagonals | crossing order and four-arm balance | K |
| Y | fork and descending stem | branch junction and stem continuity | V; T |
| Z | two bars and diagonal | corner transitions and diagonal clearance | N; 2-like experimental ambiguity |

Confusion comparisons are test prompts, not assertions that the letters are inherently ambiguous. The reviewer must record whether a comparison is a real failure for the tested variant.

## 5. Automated geometry checks

### 5.1 Required hard failures
- malformed segment data or invalid references;
- duplicate stable IDs;
- required contour closure violated;
- declared counter missing or no longer enclosed;
- declared aperture unintentionally closed;
- protected negative-space clearance below configured minimum;
- unintended self-intersection;
- degenerate segment beyond configured tolerance;
- relationship references missing components or anchors;
- a rejected model command partially mutates canonical state.

### 5.2 Warnings / review-required
- unusually narrow but still valid neck/channel;
- large glyph width or mass imbalance against the variant's own limits;
- anchor with marginal clearance;
- style parameter near a configured boundary;
- visual similarity score indicating possible confusion;
- geometry valid but unreviewed in a required context.

Thresholds must be calibrated and stored by glyph/variant or grammar. Do not invent one global clearance or balance threshold for all A–Z.

### 5.3 Topology distinctions
- **Counter:** enclosed negative-space region.
- **Aperture:** opening connected to the exterior, bounded by terminals or contour structure.
- **Channel:** negative space between components or neighboring glyphs.
- **None:** an explicit declaration that the reviewed variant has no counter/aperture of that type.

G and S must remain valid first-class cases without being forced into a counter-only schema.

## 6. Human visual review rubric

Score each dimension 0–3 and include a short rationale.

| Score | Meaning |
|---:|---|
| 0 | broken / unreadable / structurally invalid |
| 1 | weak / inconsistent / needs revision |
| 2 | functional / intentional with known limitations |
| 3 | strong / clear / robust across required contexts |

Dimensions:
1. **Identity:** recognizable without effects.
2. **Silhouette:** deliberate contour and mass distribution.
3. **Topology:** counters/apertures/channels read as intended.
4. **Junctions:** attachments and crossings look intentional.
5. **Style construction:** grammar is visible in structure, not only rendering.
6. **Thumbnail resilience:** identity survives reduced scale.
7. **Pair behavior:** works with more than one neighbor.
8. **Word rhythm:** spacing, width sequence and negative-space rhythm are coherent.
9. **Surface behavior:** placement respects obstacles and boundaries.
10. **Render consistency:** SVG and Three.js viewport agree.

A numerical average cannot override a critical failure. Identity or topology score 0 blocks approval. Any score 1 requires a defect note and explicit reviewer decision.

## 7. Required test passes

### Pass A — Isolated neutral
- neutral silhouette;
- full-size and thumbnail;
- normalized comparison view;
- no effects or surface texture.

### Pass B — Semantic and topology
- component-role overlay;
- junction and anchor overlay;
- counter/aperture/channel masks;
- measured clearances and topology diagnostics.

### Pass C — Style construction
- same glyph across each compatible grammar;
- rendering held constant;
- structural parameter differences displayed;
- unsupported combinations explicitly marked.

### Pass D — Pair contexts
Start with the established set: AV, AR, BA, BR, GO, GR, RA, RO, SA, SB, GS, NS. Add each glyph's nearest identity-confusion pair from the A–Z matrix. Show neutral spacing and candidate overlap/connection separately.

### Pass E — Word contexts
Use ABRA, BOMB, GHOST, KRAZE, MIND, NYX, RISK and SQUE. Mark words containing provisional glyphs as partial-coverage tests. Do not certify the full word from only the five authored-contour masters.

### Pass F — Render and surface
- fill;
- outline;
- inline;
- highlight;
- depth;
- light/dark/textured surfaces;
- thumbnail;
- fictional panel/surface obstacles.

### Pass G — Reproducibility
- save/reload;
- identical project + engine version + seed;
- canonical geometry hash comparison;
- SVG export compared with editor vector composition;
- undo/redo round-trip.

## 8. Style comparison controls

For fair comparison:
- hold glyph IDs and review scale constant;
- hold rendering constant while comparing construction grammars;
- hold geometry constant while comparing render treatments;
- record grammar compatibility as native/adaptable/experimental/unsupported;
- do not force every glyph to support every grammar;
- do not use palette, outline width, slant or arrows alone as proof of a new grammar.

Wildstyle study is evaluated primarily through composition relationships and negative-space management. Bubble is a rounded letterform grammar. Throw-up remains a practice/form context. Blockbuster and Straight Letter overlap but should not be collapsed into one universal category.

## 9. First review batch: A/B/G/R/S

Prioritize the existing authored-contour masters:
- **A:** verify apex/crossbar semantics, counter clearance and the explicitly named open-apex variant if authored.
- **B:** verify upper/lower counter separation, waist strength and independent bowl controls.
- **G:** verify aperture semantics, terminal direction and distinction from C/O at thumbnail size.
- **R:** verify counter clearance from the leg and the bowl-to-leg junction.
- **S:** verify neck width, directional continuity and terminal tangents; do not invent stroke order from the closed outline.

Do not promote these masters until proof sheets have been inspected. The existing source audit says visual balance, self-intersection robustness, anchor feasibility and style coherence are not yet verified.

## 10. Release decision record

A release decision must list:
- included glyphs and variants;
- excluded/provisional glyphs;
- supported grammar combinations;
- failed or waived tests;
- unresolved defects;
- human reviewers and review date;
- generator/schema version;
- proof-sheet and regression artifact references.

A partial supported alphabet is acceptable if its limits are explicit. A visually inconsistent full alphabet is not a better release.

## 11. Relationship to existing specifications

This protocol operationalizes, and does not replace:
- `GLYPH_REVIEW_PACKAGE_A_Z.md` — inventory, pair/word fixtures and release gate;
- `GLYPH_DATA_CONTRACT_A_Z.md` — canonical semantic/vector data model;
- `GLYPH_MASTER_SPECIFICATIONS_A_B_G_R_S.md` — current five-master observations and candidate semantic decomposition;
- `STYLE_GRAMMAR_SPECIFICATIONS_01.md` — grammar-specific construction distinctions;
- `STYLE_GRAMMAR_COMPATIBILITY_AND_PARAMETERS.md` — compatibility and parameter ownership;
- `VISUAL_CONSTRUCTION_BRIEF_01.md` — implementation and proof-sheet requirements.
