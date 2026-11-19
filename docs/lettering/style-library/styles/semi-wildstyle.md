# Style Card — Semi-Wildstyle

**ID:** semi-wildstyle | **Version:** 1.0.0  
**Primary axis:** Composition / relationship grammar  
**Maturity:** Draft. The category is described by museum and academic material; NIGHTSHIFT templates formalize a graduated complexity model.

## Definition and intent
Semi-Wildstyle occupies a middle ground between clearly readable Simple/Straight lettering and densely interwoven Wildstyle. It can look complex through selected extensions and graphic elements, while letters remain more open and connections are less frequent or less convoluted. It is not merely “Wildstyle with fewer arrows”.

## Shared visual signature
- Letter skeleton remains readily traceable.
- A limited number of planned extensions and overlaps.
- Directional flow across the word.
- Less frequent interlocking than Wildstyle.
- Negative-space channels remain open and legibility is generally higher.

## Templates

### T1 — Open Semi-Wild
**Intent:** recognizable letters with a small number of anchored extensions.  
**Construction:** build Straight base; add one or two anchor-based directional elements; classify joins; keep most glyph boundaries open.  
**Parameters:** extension budget, connection density, abstraction budget, flow bias, counter protection.  
**Tests:** AR, BA, GHOST, RISK.

### T2 — Connected Semi-Wild
**Intent:** selective letter-to-letter connections and overlaps.  
**Construction:** lay out independent glyphs; identify compatible anchors; create a relationship record for each join; declare crossing order; recheck counters.  
**Parameters:** accepted join count, join types, overlap depth, crossing policy, minimum gap.  
**Tests:** AB, RA, SQUE, KRAZE.

### T3 — Graphic Semi-Wild
**Intent:** more elaborate composition with restrained secondary structures.  
**Construction:** preserve a readable base; add a small set of framing, directional or echo elements; distinguish structural joins from decorative marks; verify that secondary forms do not dominate.  
**Parameters:** secondary element budget, frame density, directional flow, glyph visibility, negative-space protection.  
**Tests:** MIND, VANTA, GHOST.

## Relationship model
Every connection is classified as attachment, overlap, crossing, continuation, near-contact or shared contour. Every crossing stores layer order. An extension stores its anchor. Decorative elements are explicitly non-structural.

## Failure modes
- WILDSTYLE_LITE — complexity reduced only by deleting random arrows.
- UNANCHORED_EXTENSION — graphic form has no glyph origin.
- UNDECLARED_CROSSING — overlap order is ambiguous.
- LETTER_BOUNDARY_LOSS — semi-wild composition fuses into one mass.
- DECORATION_DOMINANCE — secondary elements obscure the word.

## Acceptance tests
- Same word in Simple, Open Semi-Wild, Connected Semi-Wild and Wildstyle.
- Count and inspect all accepted joins; no undeclared intersections.
- Letters remain traceable without colour or 3D.
- The three templates form a coherent progression, not unrelated presets.

## Evidence and inference
**Source-supported:** museum material describes Semi-Wildstyle as complex in appearance but with less convoluted letters, fewer connecting elements and greater legibility than Wildstyle.  
**NIGHTSHIFT inference:** T1–T3, relationship data model, parameters and tests.  
**Open:** regional and practitioner-specific boundaries between semi-wild and wild.

Sources: SOURCES.md S1, S5, S10.
