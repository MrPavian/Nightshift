# NIGHTSHIFT Glyph Review Package — A–Z

**Status:** Test and visual-review specification  
**Purpose:** Repeatable review of glyph identity, geometry, style variation and word composition.  
**Scope:** Initial authored-contour set A/B/G/R/S plus staged A–Z expansion.  
**Important:** Test strings are synthetic engineering fixtures, not claims about historical writers or crews.

## 1. Review status model

Track status per glyph and per variant:
- provisional;
- authored-contour;
- semantic-reviewed;
- render-reviewed;
- context-reviewed;
- production-approved;
- deprecated.

A glyph can pass automated geometry checks and still require human visual review. Do not infer visual approval from a green test suite.

## 2. A–Z inventory matrix

| Letter | Main structural challenge | Critical topology | Required identity checks | Initial maturity |
|---|---|---|---|---|
| A | Apex, legs, crossbar | Counter or explicit open-apex variant | Apex stability, crossbar hierarchy, leg balance | authored-contour |
| B | Spine and two bowls | Two counters in current master | Upper/lower bowl distinction, waist, counter separation | authored-contour |
| C | Open curve | Aperture between terminals | Terminal direction, opening width, curve continuity | provisional |
| D | Spine and bowl | One counter | Bowl-to-spine transition, balance | provisional |
| E | Three bars and spine | No required counter | Bar hierarchy, terminal alignment | provisional |
| F | Two bars and spine | No required counter | Open upper structure, bar balance | provisional |
| G | Open bowl and internal bar | Aperture, not assumed counter | C/G distinction, bar attachment, opening protection | authored-contour |
| H | Two stems and crossbar | No required counter | Crossbar height, stem relation | provisional |
| I | Simple stem or barred form | Variant-dependent | Intentional simplicity, no forced ornament | provisional |
| J | Stem and descender | Open terminal/curve | Descender direction, upper terminal | provisional |
| K | Stem and diagonals | Branching negative spaces | Junction integrity, crossing order | provisional |
| L | Stem and foot | No required counter | Foot transition, terminal length | provisional |
| M | Multiple stems/diagonals | Interior channels | Central valley, width control | provisional |
| N | Two stems and diagonal | Interior channel | Diagonal direction, junction integrity | provisional |
| O | Closed bowl | One counter | Controlled asymmetry, counter preservation | provisional |
| P | Spine and upper bowl | One counter | Bowl attachment, lower termination | provisional |
| Q | Bowl and tail | Counter plus tail | Tail origin, counter protection | provisional |
| R | Spine, bowl and leg | One counter | Leg attachment, counter clearance | authored-contour |
| S | Continuous directional curve | No counter in current master | Mass balance, neck, terminal flow | authored-contour |
| T | Crossbar and stem | No required counter | Bar hierarchy, stem alignment | provisional |
| U | Two stems and base curve | Open top | Base continuity, stem balance | provisional |
| V | Converging diagonals | Acute interior region | Vertex and negative-space stability | provisional |
| W | Repeated diagonals | Multiple valleys | Rhythm, compression, valley clarity | provisional |
| X | Crossing diagonals | Crossing junction | Crossing order and four-arm balance | provisional |
| Y | Fork and descending stem | Branch junction | Fork identity and stem continuity | provisional |
| Z | Two bars and diagonal | Corner transitions | Diagonal clearance, corner integrity | provisional |

The maturity column reflects the current documented baseline only. Do not change it without implementation/review evidence.

## 3. Pair-context matrix

Use these pairs to reveal anchor and spacing problems. Run each pair:
- with neutral spacing;
- with controlled overlap;
- with slant;
- with the intended style grammar;
- at thumbnail and full size.

| Pair | Main risk |
|---|---|
| AV | Apex-to-diagonal collision |
| AR | Apex/leg rhythm and counter clearance |
| BA | Bowl-to-apex transition |
| BR | Two counter-bearing glyphs in sequence |
| GO | G aperture versus O counter distinction |
| GR | G bar/opening near R bowl/leg |
| RA | R leg near A leg/counter |
| RO | Diagonal leg beside closed bowl |
| SA | S terminal flow into A apex |
| SB | S lower mass beside B spine/bowls |
| GS | Open aperture beside continuous curve |
| NS | Multi-stem rhythm into continuous curve |

A pair is not automatically a real join. Report candidate anchors, accepted relationships, overlap and collision separately.

## 4. Word-context matrix

| Test word | Structural coverage | Review emphasis |
|---|---|---|
| ABRA | Mixed counter, diagonal and bowl forms | Rhythm and counter preservation |
| BOMB | Repeated bowls and multiple counters | Repetition without mechanical duplication |
| GHOST | Open curve, aperture, multi-stem and terminal variety | G/S distinction and terminal flow |
| KRAZE | Diagonal junctions, bowl/leg, open curve | Dense mixed topology |
| MIND | Multi-stem rhythm and diagonal | Width and spacing variation |
| NYX | Diagonal-heavy short word | Crossing and acute negative spaces |
| RISK | Bowl/leg and multiple diagonal connections | R leg and S flow |
| SQUE | Curves, aperture and bowl/tail topology | Open/closed negative-space distinctions |

Some words contain provisional letters. Their results must be labelled as partial coverage; they must not be used to certify the entire word as production-ready.

## 5. Style-family proof matrix

For each supported glyph, render the same input under each style grammar that claims support:
- Bubble / Throw-up;
- Blockbuster;
- Straight Letter;
- Wildstyle study.

A style family passes only if it changes construction/composition behavior in a deliberate way:
- glyph proportions and structural variants;
- weight distribution and contour expansion;
- corner/curve/terminal logic;
- counter/aperture behavior;
- neighbor relationships and overlap;
- word rhythm and silhouette.

Palette, outline width, slant and decoration changes alone do not pass.

Wildstyle study must be evaluated as a composition grammar with controlled interlock and legibility trade-offs, not as arrows layered over unchanged letters.

## 6. Visual proof-sheet specification

Each proof-sheet run must include:
- engine build and schema version;
- glyph ID and variant ID;
- maturity/provenance;
- style grammar and version;
- project seed and deterministic operation parameters;
- background/surface type;
- scale and transform settings;
- render-layer toggles;
- automated validation result;
- human reviewer, date and outcome.

Required panels:
1. Plain silhouette on neutral light background.
2. Semantic component overlay with labels.
3. Counter/aperture/negative-space overlay.
4. Fill + outline.
5. Fill + outline + inline + highlight.
6. Depth enabled.
7. Dark and textured surface.
8. Thumbnail row.
9. Pair-context examples.
10. Word-context examples.

Generate sheets at consistent dimensions and camera framing. Use the same glyph scale for comparison, and include a separate normalized view when comparing proportions.

## 7. Automated acceptance checks

### Geometry
- all required contours parse;
- closure and fill-rule declarations are valid;
- no unintended self-intersections;
- counter and aperture IDs resolve;
- protected negative spaces meet minimum clearance;
- anchors have valid direction vectors;
- no degenerate segments beyond documented tolerance.

### Rendering
- all layers use consistent topology;
- counters reveal the actual surface;
- no paper-colour patching;
- no unintended contour seams;
- outline and depth do not close protected apertures;
- thumbnail silhouette remains distinct.

### Composition
- collision detection reports measured intersections;
- counter occlusion is reported;
- accepted joins map to relationship graph entries;
- decorative extensions are not counted as joins;
- manual overrides survive regeneration.

### Reproducibility
- same project, engine version and seed produce identical canonical geometry;
- generated proof sheets include reproducibility metadata;
- remix actions derive their next state deterministically or persist the resolved seed and parameters.

## 8. Human visual review checklist

For each glyph/variant, reviewer records pass/fail/needs-revision:
- Is the letter recognizable at intended complexity?
- Does its silhouette feel intentional rather than mechanically generic?
- Are its counters/apertures clearly designed?
- Are terminals and junctions coherent?
- Does the style identity exist in construction, not only decoration?
- Does the glyph remain balanced at thumbnail size?
- Does it behave well next to more than one neighbor?
- Are any overlaps intentional and structurally supported?
- Does the word retain deliberate rhythm and negative-space channels?
- Does SVG output match the editor view?

A failed review should identify the exact component, contour, anchor or context causing the issue.

## 9. Open research and review gaps

The following require additional work before historical or aesthetic claims are made:
- primary-source evidence for specific regional/period construction conventions;
- multiple attributed references per proposed style grammar;
- practitioner terminology differences for terminals, connections and structural parts;
- visual review of the five v0.6 paths in a controlled proof sheet;
- evidence for any claimed lineage or origin of individual style features;
- rights and provenance for all external visual references.

The current research library supports a careful structural and computational model, but it does not establish one universal graffiti alphabet or one universal construction method.

## 10. Release gate for the first supported style subset

A glyph/variant set can enter a supported first style release only when:
- every glyph has stable ID and maturity;
- semantic components and topology are declared;
- automated geometry/render tests pass;
- proof sheets are generated and inspected;
- pair and word contexts pass or have explicit documented limitations;
- SVG matches the live editor view;
- deterministic project save/reload succeeds;
- review records identify who approved it and which build was reviewed.
