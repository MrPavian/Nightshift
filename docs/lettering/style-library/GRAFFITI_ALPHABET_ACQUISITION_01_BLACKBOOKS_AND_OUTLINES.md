# Graffiti Alphabet Acquisition 01 — Blackbooks, Ink Outlines and Letter Taxonomy

**Status:** research source map, not a completed visual specimen review  
**Date:** 2026-11-19  
**Purpose:** build a broad, provenance-aware corpus of actual graffiti alphabets and repeated letterforms for NIGHTSHIFT's original letter construction engine.

## Executive finding

The best next move is not to collect more random finished graffiti photographs. It is to harvest **blackbook pages, monochrome ink outlines and repeated alphabet specimens**. Those expose the construction of letters much more clearly than finished wall photographs, where fill, colour, shadows, background and photography can obscure the skeleton.

This pass identifies several high-yield collections. It does not claim that their pages have already been visually inspected. Each archive is a lead until an individual page is opened, credited and analysed.

## Priority A — directly useful blackbook and outline archives

### 1. Full Time Artists — Blackbook Sketches
https://www.fulltimeartists.com/graffiti/graffiti_blackbooks.php

The archive describes hundreds of blackbook pages from physical sketchbooks, by FTA crew members and writers from San Jose, San Francisco and elsewhere. The works range from 1991 to the present and include multiple drawing media.

**Why this is valuable:** high volume of hand-drawn pieces and sketches. A good source for comparing the same letter across different writers and for seeing how sketches evolve before a wall piece.

**Harvest plan:**
- Record each page's writer credit, page/image URL and date if provided.
- Identify the exact visible word only when legible.
- Isolate repeated glyphs (A, E, K, M, N, R, S, T, O) across writers.
- Record skeleton, counter, terminals, joins, overlap and baseline separately.
- Keep the page as a whole as context; never crop away attribution/provenance in the research record.

### 2. Full Time Artists — Ink Outlines
https://www.fulltimeartists.com/graffiti/ink_outlines.php

The archive describes hundreds of monochrome outlines extracted from sketchbooks. They were made with rapidograph pens, inkers, permanent markers and ballpoints; some served as blueprints for full-scale spray pieces.

**Why this is especially valuable:** monochrome outlines reduce the distraction of fill colour and effects. They are likely the best source in this set for tracing the *logic* of a letter construction without copying the actual artwork.

**Harvest priority:** very high. Start with full-word outlines where the outer contour and internal counters remain visible.

### 3. Rijksmuseum — Boris Tellegen / DELTA, Blackbook I
https://www.rijksmuseum.nl/en/collection/object/Blackbook-I--5ee1ac7c85cbe5a1b873b4649201df2a

Museum metadata identifies *Blackbook I*, 1986–1992, by Boris Tellegen (DELTA), object RP-T-2021-450. The record lists many related page objects. The Rijksmuseum describes Tellegen's work as having distinctive 3D-looking letters. The main book image is unavailable because of copyright, so individual page records must be checked.

**Why this is valuable:** a coherent body of work from one writer over a defined period. It may let us study evolution, repeated glyphs and how dimensional letter construction is built from a consistent underlying system.

**Caution:** 3D appearance is a rendering treatment, not proof of a particular style family. Do not classify every page as Wildstyle or Blockbuster.

### 4. Dutch Graffiti Library — Blackbooks
https://dutch-graffiti-library.nl/collection/blackbooks/

The collection lists named books and periods, including *Eras* (1990–2020), described as containing sketches of tags, throw-ups and pieces. It also describes the blackbook as a place where writers develop personal style and exchange sketches and signatures.

**Why this is valuable:** potentially broad European/Dutch material and multiple periods. Useful for avoiding an archive that is too narrowly New York / US-centric.

**Caution:** individual records and images still need to be opened; this is not yet a visually verified specimen source.

## Priority B — taxonomy and digital stroke data

### 5. Evan Roth — Graffiti Taxonomy: New York / Paris
https://www.moma.org/collection/works/147174

MoMA describes Roth's work as a comparative taxonomy of graffiti tag letterforms, regional styles, commonalities and deviations. The Paris study selected ten frequent letters and compared eighteen tags in upper- and lowercase forms, from simple to ornate. The New York taxonomy was described as ongoing.

**Why this matters:** it provides a useful method: compare the same glyph across many writers, rather than treating a finished word as one indivisible style. It is a methodology reference, not a ready-made alphabet library.

### 6. 000000book — GML archive
https://jamiedubs.com/blackbook/

The archive describes more than 75,000 digital graffiti tags, with GML stroke data, replay and metadata.

**Why this matters:** tag strokes can reveal stroke order, rhythm, speed and gesture. This is not a source for complete piece alphabets, but could inform a separate handstyle/tag engine.

**Caution:** check data/API licence and contributor permissions before use. Do not assume that publicly accessible GML is licensed for commercial reuse.

## Priority C — useful but not primary construction references

### 7. Full Time Artists — Graffiti Fonts collection
https://www.fulltimeartists.com/graffiti_fonts/

The vendor describes a large collection of digital graffiti typefaces and named families such as Burner, WildStyle, Cali Cholo, FatCap, UniWide and others.

**Use:** vocabulary, historical comparison and a list of visual directions to investigate.

**Do not use as the ground truth:** commercial graffiti fonts are already interpreted digital products. They can flatten individual letter construction into a font system and may not preserve how writers actually build letters. Check licences before any use.

## Taxonomy and working principles

A museum education guide from Kunstmuseum Stuttgart distinguishes:
- **Simple Style:** can be round, angular, tilted, overlapping or colourful, but remains quickly legible.
- **Throw-up:** speed-oriented, commonly one or two contrasting colours, with simple or absent fill.
- **Semi-Wildstyle:** visually complex, with added graphic elements, but fewer interconnections and greater legibility than Wildstyle.
- **Wildstyle:** tightly interwoven letter structures and elaborate connectors such as arrows; legibility may be low.

These descriptions are useful working definitions, not universal laws. Writers' terminology and local traditions vary. A style label should be attached only when the source uses it or the visual evidence is strong and clearly marked as an analysis hypothesis.

## What we should extract from every alphabet/page

For every page, record the following independently:

1. **Provenance:** writer, source, page/object ID, date, place, medium, photographer/archive credit, URL and rights status.
2. **Text:** exact word only if legible; otherwise mark as unreadable or uncertain.
3. **Glyph anatomy:** stem direction, stroke sequence hypothesis, width/height ratio, slant, terminals, corners, curves, counters and negative space.
4. **Letter joins:** overlap, shared strokes, interlock, ligatures, bridges and connectors.
5. **Word rhythm:** baseline, cap-height variation, spacing, compression, expansion and repeated motifs.
6. **Style mechanics:** bubble inflation, block massing, outline layering, extensions, arrows, 3D extrusion and shadow direction — each kept as a separate layer.
7. **Execution:** pen/spray, outline-first or fill-first only when the source supports it; do not infer paint order from a static image.
8. **Confidence:** direct observation vs. interpretation vs. unknown.
9. **Rights:** link-only by default; no image copying, tracing or training-data assumption.

## Comparative design for the corpus

We should build a letter matrix rather than just a folder of references.

| Letter | Writers / specimens | What to compare |
|---|---|---|
| A, E, O, R, S | first priority | common letters, counters, curves, terminals |
| K, M, N, T | first priority | diagonals, joins, bars and interlocking |
| B, D, P, G | second priority | bowl/counter construction and asymmetry |
| C, F, H, I, L, U, V, W, X, Y, Z | second priority | less frequent forms and family-specific solutions |

The same letter should be compared across at least 10 independent writers before we call a shape a recurring convention. A single writer's repeated forms are evidence of that writer's personal grammar, not of a universal style.

## NIGHTSHIFT implications

Do not create one generic alphabet and add filters. Build a library of **construction rules and parameters**:
- per-letter skeletons and alternate glyph variants;
- family-specific width, height, slant, curvature and terminal behaviour;
- word-level overlap and interlock rules;
- counter and negative-space preservation;
- optional extensions and connectors;
- independent outline, fill, shadow and extrusion layers;
- a legibility dial that changes letter construction, not merely blur or distortion.

The first implementation should remain an experimental engine beside the current editor. No production editor replacement is implied by this research.

## Source verification and rights notes

- Full Time Artists states that the displayed work is owned by FTA or the original author and prohibits unauthorized duplication/distribution.
- Rijksmuseum's Blackbook I page explicitly says its main image is unavailable due to copyright.
- MoMA's object record is a methodological reference; no tracing or copying.
- Dutch Graffiti Library access does not itself grant reproduction rights.
- GML public availability does not establish a commercial reuse licence.

## Next research actions

1. Inspect and index the highest-quality Full Time Artists ink-outline pages first.
2. Select blackbook pages that contain several complete letters or multiple versions of the same letter.
3. Open Rijksmuseum related page objects and verify which individual pages expose images.
4. Inspect Dutch Graffiti Library book records for high-resolution page imagery and artist/date metadata.
5. Build a first cross-writer matrix for A, E, K, M, N, O, R, S and T.
6. Only after the matrix has enough independent examples, write family-specific grammar specifications.
