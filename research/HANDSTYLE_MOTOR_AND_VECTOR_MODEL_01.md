# NIGHTSHIFT — Handstyle, Motor Plans and Vector Generation (W02.37)

**Date:** 2026-11-14  
**Priority:** P1 — editor architecture research  
**Status:** Evidence-led technical research and proposed design contract; not yet implemented.

## 1. Executive decision

Handstyles must not be generated as decorative fonts or as static outlines with random wobble. A tag is a performed, name-centred writing practice. Its visual result is shaped by stroke order, movement, tool, surface, speed, repetition and individual decisions.

For NIGHTSHIFT, use a two-level representation:

1. **Structural / motor plan:** a sparse, editable sequence of ordered movement targets and path segments.
2. **Stylistic / rendering layer:** parametric stroke primitives that interpret that plan as a marker or aerosol trace.

This architecture is directly aligned with Daniel Berio's *AutoGraff* research (Goldsmiths PhD, 2021), which proposes a structural motor plan and a stylistic set of parameterized stroke primitives. Berio distinguishes calligraphic stylisation suitable for tags from outline stylisation suitable for pieces. It is a strong technical foundation, not a licence to reproduce any writer's signature.

## 2. Evidence base

### A — Computational graffiti research

Daniel Berio, *AutoGraff: towards a computational understanding of graffiti writing and related art forms* (PhD thesis, Goldsmiths, University of London, 2021):
- proposes a sparse motor plan made from ordered vertices / polylines;
- separates that structural plan from parameterized stroke primitives;
- models calligraphic tag-like traces and outline-based piece construction as different stylisation families;
- explores movement primitives, speed profiles, vector geometry recovery, stroke rendering, variation and animation;
- discusses reconstructing plausible movement from vector traces when original movement data is absent.

Source: https://research.gold.ac.uk/id/eprint/29999/

### A — Practice-theory / linguistic research

Doris Tophinke, “In den tiefsten Winkeln unserer Betonwälder tanzten die Namen ein farbenfrohes Fest … Zur praktischen Kultur des Szene-Graffiti” (2016; corpus of Mannheim graffiti, 1998–2014):
- describes graffiti production as embodied, situated and materially conditioned practice;
- connects graphic style with the movement dynamics of making;
- notes that graffiti production involves the whole body and differs from ordinary handwriting;
- treats social context, tools, surfaces and repeated practice as integral to understanding the artefact.

Source: https://doi.org/10.1515/9783110451542-016  
Open text: https://ids-pub.bsz-bw.de/files/10060/Tophinke_In_den_tiefsten_Winkeln_unserer_Betonw%C3%A4lder_JB2015.pdf

### A/B — Dortmund visual history

- *ALL SURFACE — Tagging in Dortmund in the 1980s and 1990s* (Holger Wiese / Tobias Sawitzki, 2022): more than 500 photographs according to the editorial description, concentrated on marker and aerosol tags. The book is a rare visual record of everyday handstyles and tagging culture.
- Bibliographic caution: listings disagree on page count (244 vs 288); use 244 as the editor/publisher description and record the discrepancy rather than silently choosing one.
- The editorial account attributes a strong Dutch / Amsterdam influence to the mid-1980s Dortmund tagging culture, particularly after SHARK's visit. Treat this as attributed scene history pending page-level corroboration.
- *Da kukse wa — Dortmunder Graffiti* (1987) and *IRON CITY — Graffiti Dortmund* (2002) provide additional chronology and visual context.
- MASON / RIO publications provide a separate study of geometric reduction, line precision and large-scale composition; do not conflate this individual practice with the whole Dortmund scene.

Sources:
- https://hitzerot.com/shop/all-surface/
- https://www.legrandj.eu/products/all-surface-tagging-in-dortmund-in-den-1980er-und-1990er-jahren
- https://www.mariannebrentzel.de/da-kukse-wa-leseprobe.html
- https://hitzerot.com/shop/iron-city/
- https://shop.mason.de/product/rio-the-process-of-writing

## 3. Product principle: separate four things

Do not collapse these layers into a single “style” slider.

| Layer | Stores | Must not store |
|---|---|---|
| Name / letter sequence | User-authored string, glyph order, language/script | Writer identity or real-world alias imitation |
| Structural plan | Ordered stroke paths, targets, joins, lifts, direction | Paint texture, colour, glow |
| Stroke behaviour | Width profile, pressure/opacity proxy, speed profile, curvature, overlap order | Letter identity or city style |
| Surface / rendering | Marker or aerosol simulation, edge, opacity, bleed, grain, substrate response | Changes to canonical stroke topology |

The generator must preserve user intent and editable provenance. Style is not a texture filter.

## 4. Proposed canonical data model

Use a serializable, deterministic model. Names and IDs below are illustrative only.

### HandstyleProject
- projectId
- seed
- text
- glyphSequence[]
- structuralPlan[]
- toolProfile
- movementProfile
- surfaceProfile
- renderProfile
- sourceMode: authored | generated | inferred
- attribution: original-user-content | synthetic-original
- version

### StrokePlan
- strokeId (stable)
- order (integer)
- startTargetId
- endTargetId
- controlPoints[]
- direction
- penState: down | lift
- role: stem | loop | connector | terminal | flourish | crossbar
- confidence (only for inferred plans)
- provenance

### StrokeStyle
- widthBase
- widthVariation
- opacityBase
- opacityVariation
- curvatureBias
- speedProfile
- overlapOrder
- capStyle
- joinStyle

### ToolProfile
- marker
- aerosol
- paint-marker
- digital-pen

Tool profile affects edge, width, opacity and surface response; it does not rewrite the structural plan.

## 5. Movement model — practical implementation levels

Do not begin by implementing the full Sigma-Lognormal model. Build in layers.

### Level 0 — deterministic vector strokes
- Ordered Bezier / polyline paths.
- Stable point IDs and editable control handles.
- Fixed width and cap/join styles.
- Correct stroke order and lift transitions.

### Level 1 — authored movement variation
- Speed / width envelope along each stroke.
- Smooth but not over-smoothed curvature.
- Controlled slant and spacing variation.
- Small seeded variation that is reproducible and never destroys glyph identity.

### Level 2 — motor-plan playback
- Store a sparse sequence of virtual targets.
- Animate stroke progression using a plausible speed profile.
- Allow overlapping movement primitives where the model supports it.
- Keep geometry and playback timing distinct from paint rendering.

### Level 3 — inferred motor plan (research prototype)
- Given an original, rights-cleared user-provided trace, infer plausible stroke segmentation and movement.
- Label recovered kinematics as inferred, never as recorded fact.
- Do not infer or store the identity of a real writer.
- Do not build a dataset of named writers' tags or train a signature imitation model.

Berio's Sigma-Lognormal work is a candidate research path for Level 2/3. It models trajectories as the temporal superposition of movement primitives with lognormal speed profiles. NIGHTSHIFT should only adopt it after a small benchmark shows a visible benefit over simpler Bezier timing curves.

## 6. Handstyle parameters — human-readable controls

Expose a compact set first; advanced values remain in the inspector.

| Parameter | Effect | Guardrail |
|---|---|---|
| Slant | Overall directional lean | Keep baseline and glyph skeleton stable |
| Width | Horizontal expansion / compression | Preserve counters and joins |
| Rhythm | Relative timing and spacing between strokes | Avoid uniform mechanical spacing |
| Flow | Smoothness / continuity of movement | Do not equate smooth with authentic |
| Stroke mass | Base width and variation | Keep letter identity legible |
| Letter spacing | Gap / overlap between glyphs | Avoid accidental tangencies |
| Connection | Optional joins between adjacent strokes | Explicitly represent real joins vs visual crossings |
| Variation | Seeded micro-variation | Deterministic and reversible |
| Tool | Marker / aerosol profile | Tool affects rendering, not name topology |

No numerical “authenticity score”. These controls describe editable visual properties, not cultural legitimacy.

## 7. Acceptance tests

### Geometry / semantics
- Each stroke has stable ID and explicit order.
- Lifts are represented; separate strokes must not be silently connected.
- A crossing is not automatically a join.
- Glyph sequence and stroke plan are separate but linked.
- Undo / redo restores exact geometry and parameters.

### Variation / determinism
- Same seed + same project + same version produces identical output.
- Different seeds create bounded, explainable variation.
- Variation cannot collapse letter recognition, create self-intersections or close required negative spaces.
- A user can freeze individual strokes / glyphs while varying others.

### Rendering
- Marker and aerosol profiles change stroke appearance, not structural paths.
- Rendering changes do not dirty canonical geometry.
- Exported SVG retains editable paths and metadata.
- Playback animation can be disabled without changing final geometry.

### Rights / attribution
- No named writer's tag, alias or piece is used as a preset, training target or trace template.
- Historical visual references remain external research records unless rights are cleared.
- User-authored traces remain user-controlled content.
- Inferred motion is labelled inferred, not historically observed.

## 8. Proof sheets required before implementation is called complete

1. **Motor plan:** same original abstract word represented as ordered paths with IDs, directions and lifts.
2. **Tool comparison:** same path rendered as marker, aerosol and digital pen; geometry unchanged.
3. **Movement comparison:** fixed timing vs smooth movement profile vs seeded variation.
4. **Spacing / rhythm:** one word at three spacing profiles with counters and negative-space checks.
5. **Repeatability:** identical seed output side by side; changed seed output beside it.
6. **Editability:** select one stroke, move one target, commit, undo, redo, save and reload.
7. **SVG round-trip:** export / re-import with IDs and stroke order preserved.

Each proof sheet records build, schema version, seed, parameters, test outcome and reviewer.

## 9. Recommended implementation ticket for Claude

**HST-01 — Build canonical handstyle motor-plan slice**

Scope:
1. Define serializable HandstyleProject, StrokePlan, StrokeStyle and ToolProfile schemas.
2. Implement deterministic ordered vector strokes with stable IDs and pen lifts.
3. Add a minimal editor view to select and edit stroke targets.
4. Add marker and aerosol render profiles without changing canonical paths.
5. Add seeded bounded variation and exact undo / redo.
6. Export / import SVG while preserving path order and project metadata.
7. Produce the seven proof sheets above.

Out of scope:
- learning or cloning named writers;
- automatic scraping or ingestion of archival images;
- full Sigma-Lognormal implementation;
- procedural throw-up / piece generation;
- real-world tagging or illegal placement guidance.

Acceptance: all geometry, determinism, rendering-separation, rights and proof-sheet tests above pass. Report files changed, tests, proof sheets, defects and next slice.

## 10. Research conclusion

The Dortmund archive gives us unusually strong local material to understand tags as a visual and social practice. Computational research provides a credible model for turning hand movement into editable vector data. Practice theory prevents us from reducing the phenomenon to an outline or a paint texture.

The NIGHTSHIFT opportunity is to combine these insights in an original, user-authored handstyle tool: structural plan first, movement second, material rendering third. This can become a genuinely distinct subsystem rather than a cosmetic mode inside the Piece Generator.
