# Glyph Construction Guide — Translating Research into the Generator

> This document turns documented visual observations into engineering questions. These are design inferences, not claims that every historical writer followed the same rules.

## 1. The central principle

A graffiti lettering generator must construct letters and word compositions, not typeset a font and decorate it. Effects are downstream of the letter skeleton and composition.

## 2. Glyph anatomy to represent

Each glyph should be describable through:
- **Skeleton:** primary directional structure / stroke path that makes the letter recognizable.
- **Contours:** one or more closed vector boundaries derived from the skeleton and style-specific expansion.
- **Counters:** enclosed or semi-enclosed negative spaces (e.g. interior spaces) that must remain intentional.
- **Terminals:** stroke endings and directional cuts.
- **Joints:** intersections and transitions between structural segments.
- **Metrics:** cap height, baseline, advance width, side bearings and overshoot where relevant.
- **Anchors:** semantic connection zones for neighbors, extensions, overlaps and shared contours.
- **Negative space:** internal counters and inter-letter gaps, evaluated at both glyph and word level.

## 3. Style grammar is not decoration

A style profile should define construction behavior:
- proportion ranges and skeleton variants;
- stroke expansion / contour behavior;
- corner and curve logic;
- counter design and preservation;
- terminal treatment;
- neighbor connection rules;
- extension / arrow grammar;
- permitted complexity and legibility tradeoffs;
- composition rhythm.

Color, fade, chrome, highlights, drips and 3D depth are presentation layers, not substitutes for style grammar.

## 4. Word-level composition

A word is a relationship system. The engine should reason about:
- pairwise letter compatibility;
- overlap candidates and occlusion;
- shared contour candidates;
- baseline and cap-height rhythm;
- word silhouette;
- counter visibility;
- negative-space channels;
- extension paths and directional flow;
- local readability after transformations.

A bridge drawn over two letters is not a real join unless the underlying contours, anchors and visual topology support that connection.

## 5. Research-to-engine workflow

For each style family:
1. collect dated, attributed visual references;
2. identify recurring structural traits across multiple examples;
3. distinguish traits that are period-/writer-specific from broader patterns;
4. define a style grammar hypothesis;
5. implement a small glyph subset;
6. test in multiple words and scales;
7. compare to references without copying any one writer's signature;
8. revise the hypothesis and record uncertainty.

## 6. Current evidence-derived design notes

- Early signature development included thickening and contrasting outlines in examples described by the SCHIRN account as signature-pieces (early 1972). This suggests the engine should model line/signature and expanded outlined form as related but distinct construction states, rather than a single font toggle. [B]
- Chalfant's train documentation and the Bronx Museum's archive description show why the surface cannot be abstracted away: train windows, doors, car boundaries and multi-panel composition are part of the recorded work. The editor should eventually support surface-aware layout. [A]
- Wildstyle terminology has a more specific crew/name history than its later generalized usage. The engine should label its own profile as a study/interpretation and document which structural principles it implements, rather than claiming a canonical Wildstyle recipe. [B]

## 7. Quality checks

- Glyph silhouette readable at intended complexity.
- Counters remain open or close intentionally.
- Letter identity survives word-level overlap.
- No accidental contour collisions or disconnected fragments.
- Negative-space channels remain visually deliberate.
- SVG geometry and preview match.
- A style variant changes construction, not just color/effects.
- All procedural variation is deterministic from a saved seed.

## Sources

- SCHIRN Kunsthalle, Katrin Görler, “Eine kurze Geschichte des Stylewriting” (2013): https://www.schirn.de/schirnmag/eine-kurze-geschichte-des-stylewriting/. [B]
- The Bronx Museum, Henry Chalfant: Art vs. Transit, 1977–1987: https://bronxmuseum.org/exhibition/henry-chalfant-art-vs-transit-1977-1987/. [A]
- KIT thesis on Style Writing, repository record/PDF: https://publikationen.bibliothek.kit.edu/1000079409/6209138. [B]
