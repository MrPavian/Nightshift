# Visual Analysis 04 — Edec Sketch, King 157 Blue Boxcar, Sane Production

**Date:** 2026-11-19  
**Source:** Letterform Archive, *Subscription to Mischief* — Community Service  
**Review status:** three individual image views opened and inspected. No source image copied into NIGHTSHIFT. Rights remain link-only.

## 1. Edec — Edec Sketch (circa 1994)

Source: https://exhibitions.letterformarchive.org/mischief/artworks/edec-sketch

Catalogue facts: Edec (writer), circa 1994, ink on paper, Miami; 11 × 8.5 inches.

### Direct visual observations
- A wide horizontal multicolour piece occupies most of the sheet.
- The central letter masses are angular and interlocking, with large polygonal faces.
- Strong dimensional side planes / extrusions create depth beneath and beside the front faces.
- Several small stars, arrows, doodles and tags sit around the main piece.
- The main word is not confidently transcribed from the image.

### Construction hypotheses
- Separate the front-face silhouette from the extrusion geometry; do not bake depth into the glyph skeleton.
- Generate shared overlaps between neighbouring glyphs at the word level.
- Keep small arrows, stars and tags as optional composition decorations, not mandatory letter anatomy.
- Preserve a common baseline and overall word envelope while allowing individual glyphs to interlock.

### Limits
This is one sketch, not a named style sample. Angularity and dimensional sides do not by themselves prove Wildstyle or Blockbuster. It is useful evidence for a broad 3D piece construction workflow, but not a confirmed family grammar.

## 2. King 157 — King 157 Blue Boxcar (1995)

Source: https://exhibitions.letterformarchive.org/mischief/artworks/king-157-blue-boxcar

Catalogue facts: King 157, 1995, photograph in Gilroy, California; 6 × 4 inches. The Archive describes a King 157 piece with many arrows and thin bars on a blue freight train.

### Direct visual observations
- A large multicolour geometric piece spans the blue boxcar side.
- Main letter bodies are angular, with straight segments, sharp directional corners and heavy outlines.
- Thin bars and arrow forms extend around or between the main letter masses.
- Tags appear on the ladder / hardware to the left and elsewhere on the car.
- The displayed photograph crops part of the rightmost piece; the complete word is not available in this view.
- Train stencils, ladder, seams and undercarriage remain visible around the artwork.

### Construction hypotheses
- Treat main letter bodies, thin bars and arrows as distinct systems with explicit attachment points.
- Allow bar extensions to pass behind or through selected glyph zones without replacing the core silhouette.
- Provide a substrate mask for freight-car hardware, stencils and panel geometry.
- Preserve a hierarchy between the primary piece and incidental tags.

### Limits
Do not call this Wildstyle simply because arrows and extensions are visible. We need more examples and a direct reading of the letter construction before assigning a family.

## 3. Sax / Sane — Sane Production (1990)

Source: https://exhibitions.letterformarchive.org/mischief/artworks/sane-production

Catalogue facts: Sax (photographer), Sane (writer), 1990, photograph in New York; 4.25 × 13 inches.

### Direct visual observations
- The image is a wide photograph showing a multi-piece wall production.
- The upper zone contains pale lettering with dark outlines and red accents.
- Lower pieces use different fill and outline treatments, including dark masses, white internal structures and orange/red outlines.
- Figures and smaller text occupy gaps and spaces around the main pieces.
- Several distinct letter systems coexist in the same wall composition.

### Composition insight
This is a strong reference for a **multi-piece production layout**, not for one alphabet. The wall can be modelled as several independently authored pieces sharing one surface, with figures and secondary text filling the interstitial spaces.

### Limits
Do not merge the separate pieces into one style. The photograph's width and the different letter systems make it a composition-level reference only.

## Cross-reference findings

### A. Piece geometry and dimensional treatment are separate
Edec's sketch makes the distinction especially clear: front faces can be understood separately from side planes and shadows. A credible generator should first create the two-dimensional letter construction, then add dimensional geometry as a controlled transformation.

### B. Arrows and bars are optional extension systems
King 157's freight piece provides direct visual evidence of thin bars and arrows around a geometric piece. These should be attachable, controllable extensions, not default decorations that automatically turn every style into pseudo-Wildstyle.

### C. A production is not an alphabet
Sane Production shows multiple pieces and visual systems sharing a wall. This should inform a production-composition module, not a single style preset.

## NIGHTSHIFT implementation implications

1. Keep glyph silhouette, word-level overlap, extrusion, outline, fill and extensions as separate parameters.
2. Build a 3D/extrusion layer that can be switched off without changing the base letter skeleton.
3. Add optional bar/arrow extension anchors, disabled by default.
4. Add a production-layout mode that arranges multiple independent pieces and optional figures on one wall.
5. Model freight-train substrate geometry separately from lettering.
6. Do not assign any of these three objects to Bubble, Throw-up, Blockbuster or Wildstyle yet.

## Evidence status after this pass

- Three additional image records inspected: Edec Sketch, King 157 Blue Boxcar, Sane Production.
- Total corpus: 33 item-level records.
- Total individually inspected objects: 9 (including five correspondence records, Iz the Wiz Throw-up, and these three).
- Explicit archive-labelled Throw-up specimens: 1 (Iz the Wiz).
- No rights to reproduce source images have been established.
