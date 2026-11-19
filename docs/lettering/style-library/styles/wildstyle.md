# Style Card — Wildstyle

**ID:** wildstyle | **Version:** 1.0.0  
**Primary axis:** Composition / relationship grammar, with glyph-level transformations.  
**Maturity:** Draft. Broad concepts are source-supported; detailed parameters are NIGHTSHIFT inference.

## Definition and intent
Wildstyle is treated as complex lettering/composition in which glyphs may interlock, extend, cross, share directional movement and become abstracted. Complexity is structural and relational. It is not simply illegibility, random arrows or decorative spikes. The term has a specific history associated with TRACY 168 and a crew name; later usage generalized. Do not claim one universal origin date, inventor or fixed alphabet.

## Visual signature
- Directional flow across the word.
- Interlocking glyph structures and planned overlaps.
- Extensions emerging from components or directional terminals.
- Sharp, tapered or arrow-like forms where structurally motivated.
- Planned shared contours and crossings.
- Deliberate negative-space channels.
- Variable readability, but not accidental loss of glyph evidence.

## Construction
1. Draw each glyph skeleton and component graph.
2. Place glyphs in a word layout without interlocks.
3. Mark anchors: terminals, bars, diagonals, bowls and directional exits.
4. Build a word-level relationship graph.
5. Classify joins: attachment, overlap, crossing, continuation, near-contact or shared contour.
6. Add extensions from explicit anchors; label decorative marks separately.
7. Define crossing order and contour continuity.
8. Protect counters, apertures and negative-space channels.
9. Review the whole word in monochrome.
10. Add finish only after geometry passes.

## Parameters
| Parameter | Meaning | Dependency |
|---|---|---|
| interlockDepth | Extent of structural interweaving | Respect glyph topology |
| connectionDensity | Accepted relationships per word | Not arrow count |
| extensionComplexity | Complexity of anchor-based extensions | Every structural extension needs origin |
| directionalFlow | Coherence of local/global vectors | Evaluate at word level |
| abstractionBudget | Deviation from base skeleton | Constrained by legibility mode |
| negativeSpaceProtection | Protected counters/channels | Hard geometry constraint |
| legibilityMode | Open / balanced / abstract | Must expose intentional construction |
| crossingPolicy | Allowed crossings and layer order | No undeclared intersections |
| sharedContourPolicy | Disabled / candidate / accepted | Both glyphs must accept |

Complexity must not be a single random slider.

## Legibility modes
- Open: clear letter boundaries, few connections, most skeleton evidence retained.
- Balanced: selected interlocks and extensions, word-level flow prominent.
- Abstract: stronger overlap and transformation, but intentional negative-space channels and documented structure remain.

These are NIGHTSHIFT operational modes, not historical substyles.

## Letter-specific invariants
- A: retain apex, diagonals and crossbar evidence.
- B: preserve bowl separation and counter topology.
- G: protect aperture and internal bar.
- R: preserve leg origin and directional role.
- S: maintain waist and directional continuity.
- W/M: preserve distinct diagonal rhythm; do not turn them into identical zigzags.
- X/Y/Z: control crossing order and terminal direction.

## Word-level relationship model
Each relationship stores source/target glyph, source/target anchor, relationship type, contour/layer order, clearance constraints, geometry-vs-presentation status and accepted/candidate/rejected state. An unclassified intersection is a defect. If no valid join exists, show a candidate warning rather than inventing a bridge.

## Rendering separation
Must be identifiable in flat monochrome. It does not require arrows everywhere, chrome, 3D, multiple colours or maximum abstraction. Finish reinforces but cannot create the grammar.

## Failure modes
- Random arrows/spikes unrelated to anatomy.
- Crossings without front/back order.
- Counters/apertures accidentally closed.
- Every glyph fused into one mass.
- Complexity measured by extension count.
- Same preset applied without letter-specific adaptation.
- Colour/chrome/3D doing all the stylistic work.

## Acceptance tests
Compare same word in Straight/Block, Bubble and Wildstyle monochrome. Test AB, AR, BA, RA, GHOST, KRAZE, SQUE and a dense word. Every accepted join has a relationship record; every extension has an anchor or decorative label; crossings have layer order; negative-space topology passes; Open/Balanced/Abstract modes differ coherently; manual edits survive regeneration.

## Evidence and inference
Source-supported: scholarly and practitioner sources describe complex letter structure, movement, interlocking and differing abstraction; expert classification cautions against equating Wildstyle with illegibility.
NIGHTSHIFT inference: relationship graph, parameters, legibility modes, anchor rules, geometry checks and tests.
Open: exact regional/period grammar and practitioner review.

Sources: SOURCES.md S1, S4, S5, S8, S9.


## Template variants

### T1 — Open Wildstyle
- **Intent:** introduce directional extensions and selected connections while keeping the skeleton easy to trace.
- **Construction:** retain independent glyphs as a base; add a small number of anchored extensions; declare every join.
- **Parameters:** extensionComplexity, connectionDensity, abstractionBudget, negativeSpaceProtection.
- **Tests:** AB, AR, BA, RA, GHOST.

### T2 — Interlocked Wildstyle
- **Intent:** dense structural relationships across several glyphs.
- **Construction:** build a word-level relationship graph; classify attachments, overlaps, crossings, continuations, near-contacts and shared contours; set crossing order.
- **Parameters:** interlockDepth, acceptedJoinCount, crossingPolicy, sharedContourPolicy.
- **Tests:** KRAZE, SQUE, MIND, dense five-letter fictional name.

### T3 — Abstract Wildstyle
- **Intent:** stronger abstraction while retaining deliberate anchors and negative-space logic.
- **Construction:** document base glyph evidence; select intentional transformations; preserve protected channels; label any purely decorative marks.
- **Parameters:** abstractionBudget, glyphTraceability, directionalFlow, negativeSpaceProtection.
- **Guardrail:** do not claim readability where letter evidence has intentionally disappeared.
- **Tests:** same word in Open, Balanced and Abstract modes.

These are NIGHTSHIFT operational modes, not universal historical substyles.
