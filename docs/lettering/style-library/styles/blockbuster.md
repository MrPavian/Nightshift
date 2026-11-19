# Style Card — Blockbuster / Block Letter Construction

**ID:** blockbuster | **Version:** 1.0.0  
**Primary axis:** Block / straight letterform grammar; optional Blockbuster format context.  
**Maturity:** Draft. Terminology is inconsistent; exact metrics are NIGHTSHIFT inference.

## Definition and intent
Separate Block construction from Blockbuster context:
- Block / straight grammar: broad, squared or angular letter construction.
- Blockbuster context: large-scale, economical, high-coverage organization of lettering, as the term is used in some accounts.

Some sources use Blockbuster for the letter shapes; others for broader format/piece characteristics. Preserve that ambiguity rather than forcing one universal definition.

## Visual signature
- Strong straight and angular segments.
- Broad, stable stroke masses.
- Square, clipped or minimally softened corners.
- Deliberate horizontal bars and vertical stems.
- Large, protected counters and internal channels.
- Coherent word block without identical glyph widths.

## Construction
1. Establish skeleton and component hierarchy.
2. Set family-level stroke mass.
3. Expand into broad strokes, prioritizing straight/angular construction where the glyph permits.
4. Define bar/stem intersections and corner treatment.
5. Construct generous counters and internal channels.
6. Adjust each glyph width to preserve identity and rhythm.
7. Inspect the flat silhouette before depth or fill.

Do not force curved letters into rectangles. Squared construction is a tendency, not a ban on bowls or curves.

## Parameters
| Parameter | Meaning | Dependency |
|---|---|---|
| widthClass | Narrow / standard / broad | Per-glyph override |
| stemMass | Main body thickness | Coupled to counter scale |
| cornerTreatment | Square / clipped / minimally softened | Per-junction role |
| barAlignment | Horizontal bar relationship | Preserve glyph anatomy |
| counterScale | Internal negative-space size | Hard minimum clearance |
| baselineDiscipline | Allowed vertical variation | Composition setting |
| capHeightConsistency | Height variation across word | Do not distort anatomy |
| wordBlockDensity | Packing of word silhouette | Not equal to geometric overlap |
| surfaceFitMode | Fit target composition rectangle | Preserve glyph proportions |

## Letter-specific notes
- A: strong diagonals and clear crossbar; apex may be flat, clipped or pointed by variant.
- B: bowls remain distinct; squared bowls still differentiate upper/lower proportions.
- D/O: curves or facets remain necessary; do not replace with a plain rectangle.
- G: aperture and bar remain explicit.
- M/W: diagonal rhythm must remain distinguishable; avoid repeated rectangular zigzags.
- R: leg attaches to bowl/waist deliberately.
- S: preserve directional flow; angular transitions must be controlled.

These are NIGHTSHIFT constraints, not claims about every historical Blockbuster.

## Context and composition
A Blockbuster context may propose a strong word block, compact but legible spacing, consistent height/baseline logic and economical detail. It does not require roller fill, monochrome, 3D or a wholecar.

## Rendering separation
Must pass as a flat monochrome front-face silhouette. Fill, outline, inline, shadow, extrusion, chrome and texture are optional. Depth must not alter front-face geometry.

## Failure modes
- Every glyph becomes the same rectangle.
- Counters compressed to maximize mass.
- Bars/stems intersect without hierarchy.
- Mechanical identical advance widths.
- Excessive clipping removes identity.
- Extrusion creates the only sense of weight.
- Large-scale format confused with letter construction.

## Acceptance tests
Test A, B, D, G, M, O, R, S, W; inspect thumbnail and simulated distance; check counters and junctions; compare with Bubble; compare flat and 3D front faces; fit a word block without arbitrary glyph distortion.

## Evidence and inference
Source-supported: historical/scholarly accounts distinguish rounded softies from squarer/sharp-edged blockbuster forms; expert classification research records disagreement about whether Blockbuster describes letterform or piece style.
NIGHTSHIFT inference: split between Block grammar and Blockbuster context, parameter model, constraints and tests.
Open: period/region-specific practices and practitioner validation.

Sources: SOURCES.md S1–S7.


## Template variants

### T1 — Broad Block
- **Intent:** robust, squared letter construction with generous counters.
- **Construction:** build broad stems and bars; use square or clipped joins; adjust each glyph width independently.
- **Parameters:** stemMass, counterScale, cornerTreatment, barAlignment.
- **Tests:** A, B, E, M, R; POWER, TRAIN.

### T2 — Angled Block
- **Intent:** block construction with a controlled slant or directional rhythm.
- **Construction:** set a shared word angle; retain stable vertical/horizontal relationships inside glyphs; compensate spacing for the slant.
- **Parameters:** globalSlant, localAngleOverride, stemMass, spacingCompensation.
- **Guardrail:** do not shear glyphs so far that counters and bars lose their anatomy.
- **Tests:** A, K, M, N, W; KRAFT, MIND.

### T3 — Monumental Blockbuster Context
- **Intent:** a large, economical word-block presentation using a chosen Block/Straight grammar.
- **Construction:** choose a base grammar; establish word block proportions; simplify secondary detail; keep glyph widths anatomy-driven.
- **Parameters:** blockAspectRatio, density, capHeight, outlineHierarchy, detailBudget.
- **Guardrail:** scale and coverage are context properties, not proof of a separate letterform grammar.
- **Tests:** same word at normal and monumental layout scale.

These templates distinguish letter construction from format/context. They are operational NIGHTSHIFT variants.
