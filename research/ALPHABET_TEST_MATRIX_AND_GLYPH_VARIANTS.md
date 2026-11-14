# Alphabet Test Matrix and Glyph Variants

**Status:** Research-to-design specification  
**Scope:** NIGHTSHIFT procedural lettering engine and Blackbook Archive  
**Evidence distinction:** Computational methods below are source-backed; the proposed test matrix, acceptance criteria and data model are NIGHTSHIFT design decisions, not a historical taxonomy of graffiti alphabets.

## 1. Why a test alphabet is needed

A generator that accepts any A–Z input is not necessarily an alphabet system. It may only be a collection of unrelated outlines. A credible lettering engine must preserve recognizable letter identity while allowing controlled variation, stylistic consistency and word-level composition.

The current NIGHTSHIFT prototype has authored contour masters for A, B, G, R and S; the other 21 letters are provisional geometric bases. Those provisional forms are useful for interface coverage but must not be treated as production-quality glyphs or as historically representative examples.

The test alphabet is therefore a validation instrument. It should reveal structural weaknesses before the engine is expanded into more elaborate styles.

## 2. What the research supports

### 2.1 Glyphs can be decomposed into stroke structures

Berio, Fol Leymarie, Asente and Echevarria describe a method for segmenting font outlines into overlapping and intersecting strokes. Their approach uses geometric information from the glyph outline, interior and surrounding space, including medial-axis structure, convex/concave features, links and junction types. The resulting stroke structures can support multiple stylizations while retaining recognizable similarity to the source glyph.

**NIGHTSHIFT implication:** a glyph should not be represented only as one closed SVG path. Maintain a semantic construction layer—strokes, junctions, counters and relationships—from which one or more visible contours can be generated.

This does not mean that the paper's segmentation output is a historically authentic graffiti construction. It is a computational method for analyzing and transforming glyph geometry.

### 2.2 Letter structure can be a scaffold, not a fixed visual result

In *Graffitized alphabets*, Berio describes extracting plausible stroke structures from font glyphs, simplifying and abstracting them, then using them as scaffolds for combinations of strokes and visual elements. His thesis also discusses stylizing pre-defined letter motor plans and concatenating consecutive letter plans to create ligatures.

**NIGHTSHIFT implication:** use a stable structural seed to preserve identity, then allow the style grammar to modify stroke shape, width, connection, overlap and gesture. Do not make every style a completely unrelated hand-drawn alphabet unless that is an intentional authored exception.

### 2.3 A single input glyph can support multiple outputs

The StrokeStyles work demonstrates multiple path-based stylizations from a common stroke representation. It also discusses structural modifiers at junctions and extensions. This is useful evidence for separating a glyph's underlying structure from its rendered appearance.

**NIGHTSHIFT implication:** store structural identity separately from style-specific geometry and rendering. A style profile should be able to affect the same glyph without destroying its core topology.

### 2.4 Movement and static geometry are complementary

AutoGraff's movement-centric approach models traces as the result of drawing motion. Other parts of the work recover stroke structures from vector outlines. These are complementary routes: one begins with movement, the other with an existing shape.

**NIGHTSHIFT implication:** support both:
- **Gesture-first:** movement trace is authored or generated; a contour is derived from it.
- **Structure-first:** a glyph skeleton or outline is authored; gesture-like properties are inferred or layered on as a separate representation.

Neither mode should silently pretend to be the other.

## 3. The alphabet test matrix

The matrix below is an engineering test plan. It groups letters by structural challenges, not by historical graffiti style and not by a claim that all writers construct letters this way.

| Test group | Letters | Primary structural challenge | What the engine must prove |
|---|---|---|---|
| Open curves | C, G, J, S | Open terminals, curved direction changes | Terminals remain intentional; curves do not collapse into generic loops |
| Closed counters | A, B, D, O, P, Q, R | Enclosed negative spaces | Counters remain open/closed as intended after expansion, overlap and effects |
| Multi-stem structures | E, F, H, I, L, T | Parallel bars, crossbars, terminal hierarchy | Bars align and connect without accidental merging |
| Diagonals and branching | K, M, N, V, W, X, Y, Z | Acute junctions, diagonals, crossing order | Diagonal joins remain legible and do not create fragile slivers |
| Mixed topology | A, G, P, R, Q | Combination of counters, terminals and branches | More than one structural rule survives simultaneous modification |

The grouping intentionally overlaps: a letter can belong to several challenge classes. Q and G should be treated as special cases rather than assumed to be simple O/C variants.

## 4. Per-letter structural checklist

This is a neutral checklist for authored glyph masters. It describes geometric questions, not mandatory visual solutions.

| Letter | Structural checks |
|---|---|
| A | Apex stability; crossbar placement; triangular counter; leg asymmetry; optional open apex must be an explicit variant |
| B | Spine-to-bowl relation; upper/lower bowl distinction; two counters; junction and overlap order |
| C | Open counter; terminal direction; opening width; curve continuity |
| D | Spine-to-bowl transition; one counter; bowl balance; terminal treatment |
| E | Three-bar hierarchy; spine length; terminal alignment; middle-bar proportion |
| F | Two-bar hierarchy; open upper structure; terminal balance |
| G | C-like opening plus internal bar/terminal logic; avoid accidental conversion to C or O |
| H | Two stems and crossbar; crossbar height; stem alignment; optional asymmetry |
| I | Distinguish simple stem from bars/serifs; preserve intentional simplicity; avoid forced ornament |
| J | Descender direction; upper terminal; curve-to-stem transition |
| K | Stem and two diagonals; branch junction; crossing order; acute negative spaces |
| L | Stem-to-foot transition; foot length and terminal |
| M | Multiple stems/diagonals; central valley; width control; avoid collapsed interior gaps |
| N | Two stems and diagonal; diagonal direction; junction integrity |
| O | Closed counter; contour balance; controlled asymmetry; avoid a generic perfect ellipse |
| P | Spine and upper bowl; single counter; lower termination; bowl attachment |
| Q | O-like counter plus tail; tail origin and direction; tail must not destroy counter |
| R | P-like bowl plus leg; leg origin and direction; counter preservation |
| S | Continuous directional curve; upper/lower mass balance; terminal flow; avoid arbitrary pinching |
| T | Crossbar hierarchy; stem alignment; top width; terminal treatment |
| U | Open top; continuous base curve; parallel stem balance; base curvature |
| V | Converging diagonals; bottom vertex; acute negative space |
| W | Repeated diagonals; central valleys; width and rhythm; prevent excessive compression |
| X | Crossing diagonals; intersection order; four-arm balance; preserve distinct negative spaces |
| Y | Upper fork and descending stem; junction placement; lower-stem continuity |
| Z | Top/bottom bars and diagonal; corner integrity; diagonal clearance |

A glyph master may have several authored variants, but every variant must declare which structural properties it preserves and which it deliberately changes.

## 5. Variant model: what can vary safely?

Avoid a single generic “distortion” parameter. Variation should be expressed through named, inspectable operations.

### 5.1 Structural variation
- **Proportion:** width/height ratio, stem thickness, bowl size.
- **Topology:** open/closed counter, split/merged stroke representation, branch arrangement. Topology changes require explicit variant identity.
- **Junction:** T-, Y-, L-like connection relationships and local overlap order.
- **Terminal:** blunt, angled, tapered, extended, rounded or otherwise authored endpoint.
- **Curvature:** curve tension, corner radius, directional transition.
- **Counter:** size, position, shape and minimum clearance.

### 5.2 Stylistic variation
- **Bar treatment:** straight, curved, tapered, segmented or expanded.
- **Weight distribution:** uniform, directional or locally emphasized.
- **Slant and axis:** controlled lean and baseline relation.
- **Extension:** external additions with declared attachment points.
- **Interlock:** connection to neighboring letters, with occlusion order and collision checks.
- **Surface/rendering:** outline, fill, inline, highlight, extrusion, texture and material effects.

Style variation should be bounded by a profile's grammar. A profile can permit some operations, discourage others and prohibit operations that destroy its intended character. The profile should not be described as a historical style unless the relevant research supports that attribution.

## 6. Test-word set

A useful test suite must test more than one letter at a time. Use a fixed set of synthetic strings selected for structural coverage. These are test strings, not claims about actual writers or crews.

| Test string | Why it is included |
|---|---|
| ABRA | Mixed counters, diagonals and bowls |
| BOMB | Repeated bowls and multiple counters |
| GHOST | Open curve, branching, multi-stem and terminal variety |
| KRAZE | Diagonal junctions, bowl/leg relation and open curve |
| MIND | Multi-stem rhythm, diagonal and bowl |
| NYX | Diagonal-heavy short word with crossing structures |
| RISK | Bowl/leg plus multiple diagonal connections |
| SQUE | Counter/tail interaction, curves and terminals |
| WAVE | Repeated diagonals followed by open curve |
| ZERO | Diagonal, curve, counter and terminal contrast |

Do not hard-code these strings as the only benchmark. Add random sequences only after deterministic regression strings pass; random generation is useful for fuzz testing but poor as the sole quality measure.

## 7. Acceptance criteria

A glyph or word composition should be evaluated on separate dimensions. Do not collapse them into a single “quality score” until the individual measurements are understood.

### Glyph-level checks
1. **Identity:** independent reviewers can identify the intended letter at the intended display size.
2. **Topology:** required counters and openings remain intact.
3. **Contour validity:** no unintended self-intersections, zero-area fragments or invalid paths.
4. **Junction integrity:** intended joins connect; near-misses remain intentional.
5. **Clearance:** narrow gaps do not collapse after stroke expansion or outline generation.
6. **Variant declaration:** every topology-changing variant is explicit and reproducible.

### Word-level checks
1. **Pair continuity:** joins match declared anchors and connection types.
2. **Negative-space rhythm:** gaps and counters remain visually distinct across the word.
3. **Silhouette:** the word has a coherent overall mass rather than a row of disconnected glyphs.
4. **Legibility range:** the output can be judged at both close-up and intended in-game viewing distance.
5. **Style consistency:** modifications follow one coherent profile rather than unrelated per-letter effects.
6. **Layer correctness:** fills, outlines, overlaps and occlusion order produce the intended front-to-back structure.

### Regression protocol
- Keep a baseline render for every test glyph and test word.
- Re-run the same seeds after geometry or grammar changes.
- Record engine version, glyph variant IDs, style profile ID, seed and test result.
- Include both automated geometry checks and human visual review.
- A passing geometry test does not prove historical authenticity or aesthetic quality.

## 8. Suggested data model

Illustrative schema, not a committed API contract:

```js
{
  glyphId: "A",
  variantId: "A.structural.open-apex.01",
  provenance: {
    kind: "original_design",
    sourceRefs: [],
    rightsStatus: "original"
  },
  identity: {
    expectedCharacter: "A",
    requiredFeatures: ["two_primary_legs"],
    optionalFeatures: ["crossbar", "counter"]
  },
  structure: {
    strokes: [],
    junctions: [],
    counters: [],
    terminals: [],
    anchors: []
  },
  allowedOperations: [
    "proportion",
    "terminal",
    "curvature",
    "extension"
  ],
  constraints: {
    preserveCounter: false,
    preserveApex: true,
    minClearance: 0
  },
  renderLayers: [],
  testCases: ["ABRA", "WAVE"]
}
```

Important distinctions:
- `glyphId` identifies the character.
- `variantId` identifies one authored structural solution.
- `styleProfileId` should live at the composition/style layer, not be baked into the glyph's identity.
- `provenance` records whether a glyph is original, derived from a licensed typeface, based on a documented reference, or otherwise sourced.
- `constraints` are validation rules, not aesthetic judgements.

## 9. Implementation sequence for NIGHTSHIFT

1. **Freeze the five authored masters** (A, B, G, R, S) as versioned baselines; document their structural features and current limitations.
2. **Add semantic metadata** to those masters: strokes, counters, junctions, terminals and anchors. Do not infer all metadata from SVG automatically if the result is unreliable.
3. **Build diagnostic overlays** for counters, anchors, junctions, collision zones and clearance.
4. **Author the remaining 21 letters** as explicit structural masters. Do not promote the existing provisional bases without review.
5. **Add controlled variants** for high-value letters, beginning with letters that expose different topology classes (for example C, E, K, M, O, T, W and X).
6. **Run the fixed test-word set** through every supported style profile.
7. **Add gesture-first generation** as a separate path, using motor-plan/trajectory data rather than pretending a static outline is a movement trace.
8. **Only then expand advanced joins and style-specific grammar.**

## 10. Research cautions and open questions

- A computational decomposition of a font glyph is not proof of how a graffiti writer would construct that letter.
- A typeface alphabet is a useful source of structural variation, but a font's visual conventions should not be mistaken for graffiti practice.
- Historical styles are not universal parameter presets. They emerged in particular places, periods, social networks and individual practices.
- Do not call a generated result “authentic” merely because it contains arrows, extensions, overlaps or a chrome fill.
- Do not use a real writer's name as a style preset. Use documented broad structural principles and original NIGHTSHIFT design profiles.
- Visual references require provenance and rights metadata; a screenshot found online is not automatically a reusable game asset.

Open research tasks:
1. Compare Berio's stroke decomposition with hand-authored graffiti letter skeletons, noting where font-derived assumptions fail.
2. Build a rights-cleared reference set for all 26 letters, with multiple examples where possible and clear period/place/style metadata.
3. Conduct a structured review with knowledgeable practitioners; record disagreement rather than averaging it away.
4. Define measurable thresholds for counter clearance, collision and legibility using the actual SVG pipeline.
5. Test whether gesture-first and structure-first modes can share a common representation without losing their distinct provenance.

## 11. Sources

1. Berio, Daniel; Fol Leymarie, Frederic; Asente, Paul; Echevarria, Jose. “StrokeStyles: Stroke-based Segmentation and Stylization of Fonts.” *ACM Transactions on Graphics* 41(3), Article 28, 2022. DOI: https://doi.org/10.1145/3505246. Supports geometric decomposition of glyphs into overlapping/intersecting strokes, junction analysis and multiple stylizations.
2. Berio, Daniel. “Graffitized alphabets.” RSS 2021 Workshop on Robotics x Arts, 2021. https://sites.gatech.edu/robotic-art-workshop/2021/07/07/graffitized-alphabets/. Describes extracting and abstracting plausible stroke structures from font glyphs as scaffolds for generative designs.
3. Berio, Daniel. *AutoGraff: towards a computational understanding of graffiti writing and related art forms*. PhD thesis, Goldsmiths, University of London, 2021. https://doi.org/10.25602/GOLD.00029999. Covers stroke primitives, movement models, stylization and recovering structures from vector geometry.
4. Berio, Daniel; Fol Leymarie, Frederic. “Computational Models for the Analysis and Synthesis of Graffiti Tag Strokes.” https://doc.gold.ac.uk/autograff/post/papers/Berio-CAE2015.pdf. Supports movement and flow as important aspects of tag analysis; its scope is tags, not a universal account of piece construction.
5. AutoGraff Research Project. “Generative Models of Graffiti Form.” https://www.doc.gold.ac.uk/autograff/. Describes the movement-centric approach and its distinction from explicit shape definition.

## 12. Evidence and design status

- **Source-backed computational methods:** stroke decomposition, medial-axis/shape analysis, junctions, stylization from common structure, movement-centric modelling.
- **NIGHTSHIFT design inference:** test matrix, test strings, data model, acceptance criteria, implementation sequence and variant operation list.
- **Not claimed:** a universal A–Z graffiti alphabet, a canonical construction for each letter, or a historical classification of all graffiti styles.
