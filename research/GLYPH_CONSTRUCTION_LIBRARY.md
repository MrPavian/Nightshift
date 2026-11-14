# Glyph Construction Library — Structural Primitives, Topology and Authoring Rules

**Status:** Technical design specification informed by computational graphics research  
**Audience:** NIGHTSHIFT generator, SVG authoring, Blackbook Archive and future contributors  
**Important:** This is an original engineering model. It is not a universal historical account of how graffiti writers construct letters.

## 1. Purpose

The glyph library is the layer between the alphabet test matrix and the procedural style engine. It defines what a letter is made of before style, color, outline, extrusion or surface effects are applied.

For every glyph, the library must record: (1) structural parts that preserve character identity; (2) their topological relationships; (3) protected negative spaces; (4) valid connections to neighboring letters; and (5) transformations that preserve identity.

A glyph is not just an SVG path. It is a semantic construction that can produce one or more contours.

## 2. Research basis and limits

Berio et al.'s *StrokeStyles* describes automatic decomposition of font glyph outlines into overlapping and intersecting strokes. Its analysis combines the glyph outline, interior and exterior medial axes, concave/convex outline features, links and junctions. The paper defines seven junction types: half, Y, T, L, stroke end, protuberance and null. These labels describe features of the inferred medial-axis/stroke graph; they are not a ready-made taxonomy of graffiti letter joins.

The work demonstrates that a glyph can be represented as strokes with spines, variable width profiles and structural relations, then reconstructed or stylized while remaining recognizable. It also demonstrates overlapping stroke areas and stylizations that include graffiti-like layering.

Berio et al.'s *Sketching and Layering Graffiti Primitives* focuses more specifically on graffiti-like vector construction. It describes fold-culling and non-global layering/self-overlap, where paths encode intended layering rather than relying on artificial masks or artwork splits.

Berio's *AutoGraff* thesis separately addresses stroke primitives and motor models for drawing gestures, as well as recovering stroke structures from vector outlines. This supports maintaining both movement-oriented and shape-oriented representations.

**Limits:** these are computational methods and authored demonstrations. They do not prove that writers universally construct letters using the same primitives, nor do they define a single authentic alphabet. NIGHTSHIFT uses them as technical inspiration only.

## 3. Core representation: semantic graph plus geometry

Use two linked layers.

### Layer A — Semantic construction graph

- **Stroke:** an elongated structural component.
- **Spine:** a centerline or path describing a stroke's course.
- **Width profile:** local thickness along a spine.
- **Junction:** a relationship region where structural components meet, branch, cross or terminate.
- **Counter:** an enclosed negative-space region.
- **Aperture:** an intentional opening between terminals or around a partial enclosure.
- **Terminal:** a structural endpoint with position, direction and treatment.
- **Anchor:** a candidate connection zone exposed to neighboring glyphs.
- **Extension:** an optional added form attached to a declared structural point.
- **Layer relation:** front/back ordering for overlapping parts.

### Layer B — Geometric realization

- spine paths and control points;
- width samples or profile functions;
- expanded stroke outlines;
- closed contour paths;
- counter and aperture geometry;
- clipping/boolean results where required;
- path ordering and render-layer metadata.

Do not discard Layer A after exporting SVG. It is required for editing, variant generation, debugging and reliable joins.

## 4. Primitive vocabulary

These are neutral engineering terms, not claims about historical writer vocabulary.

| Primitive | Function | Key parameters |
|---|---|---|
| Stem | Main vertical or near-vertical structural stroke | axis, length, width profile, lean |
| Bar | Horizontal or near-horizontal stroke | direction, span, thickness, terminal |
| Diagonal | Oblique stroke | angle, length, endpoint relation, width |
| Bowl | Curved structural region attached to another part | curvature, extent, attachment zones |
| Arc | Open curved stroke or contour segment | start/end tangent, sweep, curvature |
| Loop | Closed or nearly closed stroke path | closure, winding, interior clearance |
| Crossbar | Bar that intersects or bridges other parts | height, intersection type, continuity |
| Leg | Descending or branching stroke | direction, origin junction, terminal |
| Tail | Extension beyond the core body | origin, trajectory, clearance, layer |
| Terminal | End treatment of any stroke | shape, angle, taper, radius |
| Counter | Negative-space region | topology, area, centroid, minimum clearance |

A primitive may be reused in multiple glyphs, but its role and attachment topology must be recorded per glyph. A bowl in B is not interchangeable with a counter or an independent O-shaped glyph.

## 5. Junctions and topology

### 5.1 Junctions are not decorative intersections

A junction describes how structural parts relate. It must be explicit in the semantic graph before a style profile changes local geometry.

For the first implementation, NIGHTSHIFT can use a compact engineering vocabulary:

- **Endpoint:** one structural part terminates.
- **Continuation:** two segments form one continuous structural path.
- **Branch:** one part branches into two or more directions.
- **Crossing:** paths pass through the same region; front/back or over/under order must be declared.
- **Attachment:** a secondary part attaches to a primary part without becoming the same stroke.
- **Overlap:** two expanded areas occupy shared visual space, with an explicit layer relation.
- **Near-contact:** parts approach but intentionally remain separate.

These are NIGHTSHIFT graph labels, not a replacement for the seven medial-axis junction types in *StrokeStyles*. If importing a StrokeStyles-like segmentation, retain its source junction classification in a separate field.

### 5.2 Topology constraints

Each glyph variant should declare:
- number of required counters;
- whether each counter is closed or open;
- required apertures;
- required connected components;
- intended crossings and their order;
- permitted branch/junction changes;
- whether a topology-changing variant is a separate glyph variant.

The engine must never silently convert a closed counter into an open gap or merge two components because an outline effect expanded too far.

## 6. Construction recipes as graph templates

The following are baseline structural templates for identity and validation. They are not the only possible letterforms and should not constrain expressive authoring to one typeface model.

| Glyph family | Structural graph template | Critical negative space / risk |
|---|---|---|
| A | two legs + apex junction + optional crossbar | triangular counter; open apex only in a declared variant |
| B | spine + upper bowl + lower bowl | two counters; avoid accidental single cavity |
| C | open arc | aperture between terminals |
| D | spine + one bowl | one counter |
| E | spine + three bars | open spaces between bars |
| F | spine + two bars | upper/middle bar hierarchy |
| G | open bowl/arc + internal bar or terminal feature | opening distinct from C/O |
| H | two stems + crossbar | side apertures above/below crossbar |
| I | one stem, optionally bars/terminals | preserve intentional simplicity |
| J | stem + curved/angled descender | terminal and descender direction |
| K | stem + upper diagonal + lower diagonal | branch junction and acute spaces |
| L | stem + foot | corner and terminal clearance |
| M | multiple stems/diagonals | central valley and interior gaps |
| N | two stems + diagonal | two junctions and diagonal direction |
| O | closed loop/bowl | one counter |
| P | spine + upper bowl | one counter; lower region remains open |
| Q | O-like loop + tail | tail must not destroy counter |
| R | spine + upper bowl + leg | counter and leg junction |
| S | continuous curved path or connected curve segments | directional continuity; avoid unintended pinching |
| T | stem + crossbar | upper junction and side balance |
| U | two stems + bottom curve | open upper aperture |
| V | two diagonals meeting | vertex and interior angle |
| W | repeated diagonal sequence | two valleys; rhythm and width |
| X | two crossing diagonals | crossing order and four negative-space regions |
| Y | upper fork + descending stem | branch junction and lower continuity |
| Z | upper bar + diagonal + lower bar | two corners and diagonal clearance |

Treat these as graph templates, not literal path instructions. Each master must be authored and visually reviewed.

## 7. Counter and aperture system

Counters and apertures are first-class geometry, not empty pixels left over after drawing.

For each negative-space region store:
- stable ID;
- region type (counter or aperture);
- boundary reference;
- expected topology (closed/open);
- minimum clearance target;
- optional preferred aspect ratio;
- protected status;
- allowed overlap zones.

### Validation

1. Inspect the negative-space region after final contour expansion.
2. Check that its topology matches the glyph variant declaration.
3. Measure minimum clearance to nearby contours.
4. Re-run checks after outline, inline, extrusion and overlap operations.
5. Flag any effect that closes an aperture or collapses a counter.
6. Provide a diagnostic overlay showing protected regions and failed clearances.

Do not apply one universal minimum counter size. The acceptable threshold depends on output scale, surface and viewing distance. Establish empirical thresholds from NIGHTSHIFT's actual renderer and target display sizes.

## 8. Width profiles and contour expansion

A stroke should support a width function along its spine rather than one global thickness.

Suggested width-profile controls:
- base width;
- local width samples;
- taper at start/end;
- local emphasis zones;
- corner/junction behavior;
- optional asymmetry across the spine;
- smoothing policy.

Expansion must be geometry-aware:
- joins should not create unintended spikes;
- caps should respect terminal declarations;
- self-overlap should be intentional and ordered;
- small fragments should be detected rather than silently discarded;
- final contours must remain valid for SVG export.

For a first reliable implementation, use deterministic expansion from authored spine paths and width profiles. Do not attempt automatic recovery of all structural strokes from arbitrary SVG outlines before authored-master workflow is stable.

## 9. Anchors and connection-ready glyphs

Each glyph variant may expose zero or more anchors. An anchor is a semantic zone, not just a coordinate.

Store:
- anchor ID;
- anchor role (entry, exit, branch, extension root, open edge);
- position;
- tangent/direction;
- permitted connection types;
- required clearance;
- counter-protection zones;
- style-profile permissions.

Anchor coordinates should be derived from authored geometry or maintained alongside it. If geometry changes, anchors must be revalidated. A stale anchor is worse than no anchor because it can create plausible-looking but structurally invalid joins.

See [Letter-Pair Connections and Word Flow](LETTER_PAIR_CONNECTIONS_AND_WORD_FLOW.md) for pair-level candidate generation and whole-word evaluation.

## 10. Authoring workflow

For each glyph master:

1. Choose the intended character identity. Record deliberate ambiguity or alternate form.
2. Draw the semantic skeleton using a small number of meaningful paths.
3. Assign primitive roles: stems, bars, bowls, diagonals, arcs, loops, legs and tails.
4. Define junctions: endpoint, continuation, branch, crossing, attachment or near-contact.
5. Declare negative spaces before expansion.
6. Set width profiles.
7. Generate contours deterministically.
8. Add terminals and extensions, keeping them separate from core identity.
9. Define anchors.
10. Run tests for identity, topology, contour validity, clearance, pair compatibility and word silhouette.
11. Save provenance: author, date, version, reference IDs, rights status and whether the form is original or derived.
12. Freeze a versioned baseline. Any structural change creates a new version or variant ID.

## 11. Suggested data structure

Illustrative object; adapt to the actual implementation language and schema.

~~~js
{
  glyphId: "R",
  variantId: "R.master.01",
  version: 1,
  provenance: {
    kind: "original_design",
    creator: "NIGHTSHIFT",
    sourceRefs: [],
    rightsStatus: "original"
  },
  identity: {
    character: "R",
    requiredFeatures: ["spine", "upper_bowl", "leg"],
    counters: [{ id: "R.counter.1", topology: "closed" }]
  },
  construction: {
    primitives: [
      { id: "r.spine", type: "stem" },
      { id: "r.bowl", type: "bowl" },
      { id: "r.leg", type: "leg" }
    ],
    junctions: [
      { id: "r.j1", type: "attachment", members: ["r.spine", "r.bowl"] },
      { id: "r.j2", type: "branch", members: ["r.spine", "r.leg"] }
    ],
    anchors: [],
    negativeSpaces: []
  },
  geometry: {
    spines: [],
    widthProfiles: [],
    contours: [],
    renderOrder: []
  },
  constraints: {
    preserveCounterIds: ["R.counter.1"],
    permittedTopologyChanges: [],
    minimumClearanceProfile: "display-default"
  },
  tests: ["RISK", "ABRA"]
}
~~~

Separate glyphId, variantId, styleProfileId and renderPresetId. A chrome treatment should not create a new glyph identity; a changed counter topology usually should create a new structural variant.

## 12. NIGHTSHIFT implementation plan

### Stage 1 — Make the existing five masters inspectable
- Freeze A, B, G, R and S as versioned baseline masters.
- Add semantic primitive, junction, counter and anchor metadata.
- Build a diagnostic view that can toggle skeletons, contours, counters, anchors and layer order.
- Record known limitations per master.

### Stage 2 — Build the geometry validator
- Detect invalid/self-intersecting paths where the geometry library permits.
- Check counter and aperture topology.
- Measure clearances and flag collapsed gaps.
- Verify SVG export and Three.js preview use the same contour source.
- Keep diagnostic output separate from aesthetic scoring.

### Stage 3 — Author the remaining alphabet
- Prioritize letters introducing missing structural classes: C, D, E, H, K, M, O, T, U, V, W, X and Y.
- Complete A–Z before building a large pair-connection matrix.
- Do not promote provisional polygons into masters without structural review.

### Stage 4 — Introduce controlled variants
- Add proportion, curvature, width and terminal variants first.
- Add topology-changing variants only with explicit IDs and tests.
- Keep extensions and decorative add-ons separate from the core graph.
- Add style grammar only after the base alphabet passes structural tests.

### Stage 5 — Connect glyphs and compose words
- Generate candidate joins from anchors.
- Validate counter protection and contour collision.
- Add overlap and interlock only with explicit layer order.
- Evaluate complete words, not just isolated glyph pairs.

## 13. Acceptance criteria

A glyph master is ready when:
- its semantic graph is documented;
- the expected character is recognizable at target size;
- all counters/apertures are declared and preserved;
- junctions and crossings have explicit relationships;
- contour geometry is valid;
- anchors are current and pass clearance checks;
- SVG export preserves structure;
- Three.js preview matches the SVG source;
- a deterministic test record exists;
- provenance and rights metadata are present.

A style profile is not ready merely because the glyph looks visually elaborate. It must demonstrate consistent construction behavior across multiple letters and words.

## 14. Sources

1. Berio, Daniel; Fol Leymarie, Frederic Fol; Asente, Paul; Echevarria, Jose. “StrokeStyles: Stroke-Based Segmentation and Stylization of Fonts.” *ACM Transactions on Graphics* 41(3), Article 28, 2022. https://doi.org/10.1145/3505246. Primary technical basis for glyph-to-stroke decomposition, medial-axis analysis, junctions, width profiles and structurally aware stylization.
2. Berio, Daniel; Asente, Paul; Echevarria, Jose; Fol Leymarie, Frederic. “Sketching and Layering Graffiti Primitives.” *Expressive* 2019. https://doi.org/10.2312/exp.20191076. Supports graffiti-like vector stroke primitives, fold-culling and non-global layering/self-overlap.
3. Berio, Daniel. *AutoGraff: Towards a Computational Understanding of Graffiti Writing and Related Art Forms*. PhD thesis, Goldsmiths, University of London, 2021. https://research.gold.ac.uk/id/eprint/29999/1/COM_thesis_BerioD_2021.pdf. Supports stroke primitives, movement models and recovery of structure from vector outlines.
4. Berio, Daniel; Fol Leymarie, Frederic. “Computational Models for the Analysis and Synthesis of Graffiti Tag Strokes.” *Expressive* 2015. https://doi.org/10.2312/exp.20151177. Supports the role of movement dynamics in tag stroke modelling; scope is tag strokes and should not be generalized to every piece.

## 15. Evidence vs. NIGHTSHIFT design inference

**Supported by cited research:** glyph outlines can be decomposed into stroke structures; stroke spines and width profiles can support reconstruction and stylization; medial-axis and junction analysis can describe structural relationships; graffiti-like vector work can use non-global layering and self-overlap; movement and shape representations can be treated as related but distinct computational paths.

**NIGHTSHIFT design inference:** primitive vocabulary, compact junction graph, A–Z graph templates, counter protection workflow, anchor schema, authoring sequence, validation gates and implementation stages.

**Not claimed:** that these primitives are the only way to construct letters; that every writer uses this vocabulary; that a generated glyph is historically authentic; or that computational font decomposition recovers a writer's actual drawing process.
