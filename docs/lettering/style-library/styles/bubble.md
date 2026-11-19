# Style Card — Bubble Lettering

**ID:** bubble | **Version:** 1.0.0 | **Primary axis:** Letterform grammar  
**Related context:** Throw-up / Bomb may use Bubble, but is not identical.  
**Maturity:** Draft. Broad family traits are source-supported; numerical ranges and detailed constraints are NIGHTSHIFT inference.

## Definition and intent
Bubble lettering builds glyphs as rounded, inflated masses. Its character comes from silhouette, body volume, softened transitions and counter geometry—not glossy fill, white highlights or thick outlines. Historical sources also use “softie” for rounded forms. Bubble describes construction; Throw-up describes a simplified practice/work format.

## Visual signature
- Continuous, inflated outer contour.
- Rounded external corners and softened terminals.
- Heavy body mass with controlled glyph-specific variation.
- Compact but open counters and apertures.
- Sufficient material at necks and bridges.
- Buoyant rhythm without turning every glyph into an oval.

## Construction
1. Draw a recognizable glyph skeleton.
2. Identify strokes, bowls, bars, diagonals and terminals.
3. Expand the skeleton into a body with controlled mass.
4. Round corners according to component role.
5. Construct counters as deliberate negative shapes.
6. Check necks, bridges and tight joins.
7. Refine the contour; inspect in monochrome.

## Parameters
| Parameter | Meaning | Dependency |
|---|---|---|
| inflationAmount | Expansion from skeleton | Preserve glyph identity and counter topology |
| cornerRoundness | Curvature at corners | Apex, terminals and junctions need different treatment |
| terminalRoundness | Roundness of stroke ends | Apply by terminal role |
| strokeMass | Relative body thickness | Coupled to counter clearance |
| counterPreservation | Minimum negative-space clearance | Hard constraint for enclosed counters |
| neckStrength | Minimum bridge width | Prevent fragile/pinched joins |
| glyphWidthVariation | Width variation across alphabet | Avoid uniform oval alphabet |
| overlapTolerance | Word-level overlap budget | Requires pair validation |

Parameters are coupled; increasing mass requires counter and neck revalidation. Do not expose unrestricted independent sliders.

## Letter-specific notes
- A: soften apex without turning it into a dome; preserve crossbar/counter relationship.
- B: keep bowls and counters distinct; retain waist.
- G: preserve aperture and internal bar.
- O: avoid a perfect capsule if the alphabet needs more authored character.
- R: preserve leg attachment and directional exit.
- S: maintain waist and flowing transition.
- U: maintain two uprights and continuous bottom curve.

These are NIGHTSHIFT constraints, not universal recipes.

## Word composition
Favor compact rhythm, not identical widths. Overlap is optional and must preserve negative spaces. Touching contours must be intentional and recorded. Throw-up context may imply speed/economy, but palette, fill and outline remain separate choices.

## Rendering separation
Must pass as a black silhouette on white with no extra outline, highlights, shadow, extrusion, drips or texture. Optional treatments may be added only after the silhouette passes.

## Failure modes
- Every glyph becomes a circle/oval.
- Counters collapse or become pinholes.
- All terminals receive identical round caps.
- A/B/R lose internal structure.
- S waist or G aperture closes.
- Neighbouring letters fuse without a declared relationship.
- Effects create the only visible style difference.

## Acceptance tests
Test A, B, G, O, R, S, U; inspect full size and thumbnail; check counter topology and neck width; compare with Straight/Block; test BA, BR, GO, GS, SA and SB; inspect one monochrome word before colour.

## Evidence and inference
Source-supported: rounded/inflated softie forms are distinguished from squarer blockbuster forms; ethnographic accounts associate bubble forms with some throw-ups.
NIGHTSHIFT inference: parameters, topology constraints, glyph invariants, test pairs and numeric ranges.
Open: regional/period variations and practitioner validation.

Sources: SOURCES.md S1–S7.


## Template variants

### T1 — Classic Inflated
- **Intent:** rounded, buoyant mass with a balanced counter.
- **Construction:** expand the skeleton with moderate, glyph-specific inflation; round outer corners; preserve bridges and apertures.
- **Parameters:** inflationAmount, cornerRoundness, strokeMass, counterPreservation.
- **Guardrail:** avoid uniform ovalization.
- **Tests:** A, B, G, O, R, S, U; BUBBLE, GHOST.

### T2 — Softie / Organic
- **Intent:** more elastic, uneven and hand-authored rounded forms.
- **Construction:** vary bowl tension, width and terminal mass by glyph; retain a consistent family rhythm rather than identical geometry.
- **Parameters:** bowlElasticity, widthVariation, terminalRoundness, asymmetryBudget.
- **Guardrail:** organic variation must not damage glyph anatomy.
- **Tests:** B, C, G, S, U; SOUL, MARS.

### T3 — Compact Bubble
- **Intent:** tighter, denser forms with reinforced internal openings.
- **Construction:** reduce overall width and spacing selectively; strengthen necks; revalidate counters after every mass increase.
- **Parameters:** compactness, neckStrength, counterClearance, overlapTolerance.
- **Guardrail:** compactness cannot be achieved by collapsing counters or fusing letters.
- **Tests:** A, B, R, S, O; RISK, BOMB.

All three are NIGHTSHIFT templates, not historical substyles with universal definitions.
