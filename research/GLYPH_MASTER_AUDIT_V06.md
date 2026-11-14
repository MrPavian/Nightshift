# Glyph Master Audit — NIGHTSHIFT ART ENGINE 0.6

**Audit target:** `prototypes/nightshift_art_engine_v06.html`  
**Audited baseline:** repository main, fetched during this audit  
**Scope:** actual glyph data and SVG generation path, not the intended future architecture  
**Status:** implementation audit and remediation specification

## 1. Executive summary

Build 0.6 exposes all 26 Latin letters, but the code contains two distinct glyph systems:

- `M`: five custom path records for A, B, G, R and S. Each record stores an outer path and an optional list of inner paths.
- `F`: 21 provisional path strings for the remaining letters. Some strings contain multiple SVG subpaths, including intended counters, but the data model does not declare those counters separately.

The renderer then chooses one fill rule based on whether the glyph came from `M` and has a non-empty `holes` array. This is not a reliable way to encode topology. It also uses the outer path alone for outline, inline and highlight layers, even where the fill uses a combined path.

**Main conclusion:** the immediate blocker is not the absence of more decorative style controls. It is inconsistent representation of glyph topology across data and render layers. Fix the glyph data contract and the SVG rendering pipeline before expanding advanced joins or style grammar.

## 2. What the code actually does

### 2.1 Glyph data

The custom map `M` contains:
- A: one outer path and one inner path.
- B: one outer path and two inner paths.
- G: one outer path and no inner paths.
- R: one outer path and one inner path.
- S: one outer path and no inner paths.

The provisional map `F` contains the remaining 21 letters as SVG path strings. Several of those strings include multiple subpaths in the same `d` attribute. In particular D, O, P and Q contain apparent interior subpaths intended to act as counters, but those subpaths are not represented as counter metadata.

The prototype comment and interface correctly label these as provisional bases. They should remain provisional until the geometry and topology are audited and the glyphs are authored/reviewed.

### 2.2 Fill-rule selection

The current `glyph()` function effectively does this:

- if the letter comes from `M`, use its `holes` list;
- concatenate outer path and inner paths;
- choose `evenodd` only when `holes.length > 0`;
- otherwise choose `nonzero`.

This couples fill semantics to the storage location of the glyph, not to its actual topology. A glyph in `F` can contain a counter but still receive `nonzero`.

**Finding G-01 — Counter topology is not explicit across the alphabet.**  
Severity: high.  
Impact: intended holes in provisional glyphs may fill incorrectly depending on path winding and fill rule. The current data contract cannot reliably state which subpaths are counters, apertures or independent components.

### 2.3 Fill and negative-space painting

After filling the combined path, the renderer separately paints custom `holes` using a hard-coded paper color `#eee9dc`.

**Finding G-02 — Counter color is coupled to the paper background.**  
Severity: high.  
Impact: counters are not true transparent negative space. They will be wrong when the background is not the paper color, when the art is placed on a different surface, or when a counter should reveal a lower layer or wall material. It also creates a mismatch between the SVG artwork and the intended compositing model.

### 2.4 Outline, inline and highlight layers

The main fill and depth layers use the combined path, but outline, inline and highlight paths use only `d`, the outer path.

**Finding G-03 — Render layers do not share one contour topology.**  
Severity: high.  
Impact: inner counter boundaries are omitted from outlines and inline treatments. This makes the same glyph structurally different depending on the selected render options.

### 2.5 Extrusion/depth

Depth uses the combined path and the same fill rule as the main fill. Therefore, any topology error in the fill data is also repeated in the depth layer.

**Finding G-04 — Depth inherits counter/fill errors.**  
Severity: medium-high.  
Impact: extrusion may close or fill negative spaces that should remain open. The depth implementation has no explicit policy for counter walls, side faces or occlusion.

### 2.6 Connection and diagnostic claims

The UI displays an “Active letter joins” number, but the code computes it from word length, overlap and a style bonus. The SVG also draws a bridge curve based on style and overlap, not on actual glyph anchors or contour intersections.

**Finding G-05 — Join count is a heuristic, not a geometry measurement.**  
Severity: high for user trust; medium for current prototype.  
Impact: the displayed count can imply valid letter joins where no structural connection has been tested. The bridge is decorative and should not be described as a real contour join.

The current sketch-time estimate is also a heuristic. It is not a measurement of drawing time, movement complexity or geometry operations.

### 2.7 Style labels versus construction behavior

The selected styles mostly affect scale, slant, stroke outline width, corner joins and additional decorative bridge/arc elements. The style selector does not yet define a complete per-style construction grammar.

**Finding G-06 — Style profiles are presentation/layout presets, not complete style grammars.**  
Severity: medium-high.  
Impact: the names Bubble/Throw-up, Blockbuster, Straight Letters and Wildstyle study risk promising more historical and structural specificity than the code currently implements.

### 2.8 Determinism

Initial concept generation uses a seed-derived pseudo-random function, but `remix()` adds `Math.random()` to the seed. The remix operation is therefore not reproducible from a previously known seed unless the resulting seed is saved.

**Finding G-07 — Remix seed generation is not fully reproducible from prior state.**  
Severity: medium.  
Impact: reproducibility is possible after storing the new seed, but the random seed transition itself is not deterministic from the previous seed and action alone.

## 3. Per-master audit: current custom glyphs

The following is a code-level structural inventory, not a visual quality certification. A proper visual review still needs rendered samples at multiple sizes and with all render-layer combinations.

| Glyph | Current path data | Declared negative spaces | Initial audit note |
|---|---|---:|---|
| A | One closed outer contour + one inner path | 1 | Apex, crossbar-like region and triangular counter need visual validation after skew/scale |
| B | One outer contour + two inner paths | 2 | Two-counter structure is explicitly represented; test whether both remain clear under outline/depth |
| G | One outer contour | 0 | Internal bar/opening logic is embedded in one contour; define terminals/aperture and test C-like ambiguity |
| R | One outer contour + one inner path | 1 | Bowl counter is explicit; leg-to-bowl junction and counter clearance need validation |
| S | One outer contour | 0 | Continuous silhouette; verify upper/lower mass, narrow neck and terminal flow |

### A — required master review

- Identify the two principal legs and apex region.
- Determine whether the crossbar is a separate structural component or integrated contour feature.
- Declare the counter boundary and protected clearance.
- Add candidate anchors only after testing the terminal directions.
- Test narrow and wide variants without collapsing the counter or changing the character identity unintentionally.

### B — required master review

- Declare the spine and upper/lower bowl relationships.
- Store two counter IDs separately.
- Ensure both counters remain negative space in fill, outline, inline, highlight and depth.
- Test upper/lower bowl asymmetry and width changes.
- Validate that the middle waist does not collapse after stroke expansion.

### G — required master review

- Explicitly declare the opening/aperture and its terminal pair.
- Record the internal bar/terminal feature and its attachment to the bowl.
- Ensure it remains distinguishable from C and O in small-size tests.
- Do not invent a counter if the chosen construction has an open aperture instead.

### R — required master review

- Declare spine, bowl, leg and their junction relationships.
- Protect the bowl counter.
- Test leg attachment and angle variants.
- Ensure the leg does not close the counter or merge with the bowl into an unreadable mass.

### S — required master review

- Divide the path into meaningful directional segments or a gesture trace if appropriate.
- Record upper/lower terminal directions and the narrow transition region.
- Test local width variation without pinching or accidental self-overlap.
- Preserve a separate gesture representation if movement is later introduced.

## 4. Immediate renderer corrections

These are recommended changes, not yet applied to the prototype.

### R-01 — One normalized glyph data contract

Every glyph should use one common record regardless of whether it is authored or provisional:

```js
{
  id: "B",
  status: "authored", // authored | provisional | deprecated
  version: 1,
  components: [
    { id: "B.outer", role: "outer_contour", path: "..." },
    { id: "B.counter.upper", role: "counter", path: "..." },
    { id: "B.counter.lower", role: "counter", path: "..." }
  ],
  topology: {
    fillRule: "evenodd",
    counterIds: ["B.counter.upper", "B.counter.lower"],
    apertureIds: [],
    connectedComponentCount: 1
  },
  anchors: [],
  constraints: {
    protectedCounterIds: ["B.counter.upper", "B.counter.lower"]
  }
}
```

Do not treat the illustrative schema as a final runtime contract until tested against the existing code.

### R-02 — Separate artwork geometry from background

Counters should be actual negative space in the SVG composition, not paper-colored patches. Use compound paths with a consistent fill rule or an explicitly validated boolean geometry pipeline. Background/surface belongs to the composition layer.

### R-03 — Derive all render layers from the same topology

Fill, outline, inline, highlight, extrusion and export must receive the same normalized contour/counter model. Each layer may choose which component boundaries to render, but it must do so explicitly.

### R-04 — Add geometry diagnostics

Minimum first checks:
- parse/validate SVG path data;
- detect unintended self-intersections where feasible;
- verify expected counter and aperture count;
- detect zero-area or near-zero fragments;
- measure minimum clearances;
- verify exported SVG visually matches the Three.js texture source;
- compare each render-layer combination.

### R-05 — Rename heuristic UI diagnostics

Until geometry validation exists:
- “Active letter joins” should be labelled “Join opportunities” or removed;
- “Sketch estimate” should be labelled “Complexity estimate”;
- neither value should imply a measured fact.

### R-06 — Separate style grammar from render presets

Use separate objects for:
- glyph structural variant;
- style grammar (construction transformations);
- composition rules;
- render preset (fill, outline, inline, chrome, texture, extrusion).

A chrome fill must not alter glyph topology. A Wildstyle-inspired study profile must define structural behavior and remain labelled as an original study, not as an authentic writer preset.

## 5. Recommended implementation order

1. Freeze the v0.6 prototype and preserve it unchanged.
2. Create a new v0.7 prototype rather than overwriting v0.6.
3. Normalize the five custom glyphs into one shared data contract.
4. Normalize the 21 provisional glyphs without promoting their status.
5. Fix fill-rule/counter semantics and remove paper-colored counter patches.
6. Make outline/inline/highlight/depth consume the same topology-aware geometry.
7. Add a glyph diagnostic panel with status, counters, apertures, components and validation.
8. Add tests for each glyph and render-layer combination.
9. Only then build true anchor-based letter joins.
10. Expand authored glyph coverage and style grammar after the pipeline is stable.

## 6. Regression matrix

Every authored glyph should be rendered in the following combinations:

| Test | Fill | Outline | Inline | Depth | Purpose |
|---|---:|---:|---:|---:|---|
| T01 | on | off | off | off | Base fill topology |
| T02 | on | on | off | off | Outer and counter outlines |
| T03 | on | off | on | off | Inline follows declared boundaries |
| T04 | on | off | off | on | Depth preserves counters |
| T05 | on | on | on | on | Combined layer integrity |
| T06 | fade/chrome/split | on | on | on | Render treatments do not alter topology |
| T07 | solid | on | on | off | Different surface/background colors |
| T08 | solid | off | off | off | Transparent negative space in SVG export |

Run at baseline size, reduced size and after the maximum permitted slant/scale/overlap transforms.

## 7. Evidence and interpretation

### Directly observed in the prototype
- The two separate glyph maps and their contents.
- Conditional fill-rule selection based on the custom `holes` array.
- Hard-coded paper-color painting for custom inner paths.
- Outline/inline/highlight using only the main path string.
- Depth using the combined path.
- Decorative bridge paths and heuristic join/time diagnostics.
- Style profiles modifying visual transforms and presentation rather than a full structural grammar.

### Research-supported context
- Stroke-based glyph decomposition can recover useful but sometimes nontraditional stroke structures from font outlines; the method is not guaranteed to match a writer's perceived construction in every case. Berio et al. explicitly discuss cases where inferred segmentation deviates from perceived structure and cases where thick glyphs cause difficulty.
- Graffiti-like vector construction can use non-global layering and self-overlap as part of the vector paths themselves.
- AutoGraff describes both procedural stroke primitives and recovery of structures from vector geometry, with the goal of integrating generative graffiti into digital design and game/movie environments.

### NIGHTSHIFT design inference
- The normalized data contract, remediation priorities, validation tests, and release sequence are proposed engineering decisions.
- The five custom masters need visual review; this audit does not certify their aesthetic or historical quality.
- No claim is made that any of the existing glyphs represent a canonical or historically authentic form.

## 8. Sources

1. Berio, Daniel; Fol Leymarie, Frederic; Asente, Paul; Echevarria, Jose. “StrokeStyles: Stroke-Based Segmentation and Stylization of Fonts.” *ACM Transactions on Graphics* 41(3), 2022. https://doi.org/10.1145/3505246. Especially relevant: method limitations and discussion of inferred structures that may differ from perceived/ground-truth construction.
2. Berio, Daniel; Asente, Paul; Echevarria, Jose; Fol Leymarie, Frederic. “Sketching and Layering Graffiti Primitives.” *Expressive 2019*. https://doi.org/10.2312/exp.20191076.
3. Berio, Daniel. *AutoGraff: Towards a Computational Understanding of Graffiti Writing and Related Art Forms*. PhD thesis, Goldsmiths, University of London, 2021. https://research.gold.ac.uk/id/eprint/29999/1/COM_thesis_BerioD_2021.pdf.
4. Berio, Daniel; Fol Leymarie, Frederic. “Computational Models for the Analysis and Synthesis of Graffiti Tag Strokes.” *Computational Aesthetics*, 2015. https://doi.org/10.2312/exp.20151177.

## 9. Audit disposition

**Do now:** normalize glyph topology and fix layer consistency.  
**Do next:** add diagnostic overlays and regression tests.  
**Do later:** anchor-based joins, additional authored masters and full style grammars.

**Do not:** add more decorative bridges, chrome treatments or random complexity controls as a substitute for the structural fixes above.
