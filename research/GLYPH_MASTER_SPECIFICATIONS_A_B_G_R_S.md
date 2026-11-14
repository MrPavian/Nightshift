# Glyph Master Specifications — A, B, G, R, S

**Status:** Engineering specification draft for Claude implementation  
**Target baseline:** Build 0.6 reference prototype  
**Prototype source:** `prototypes/nightshift_art_engine_v06.html` (blob SHA `af48dcda40851efd99e8d7298627442789405e01`)  
**Purpose:** Turn the five existing custom contour records into reviewable semantic glyph masters.  
**Evidence boundary:** The source-code facts below were verified from the prototype. Semantic decomposition, proposed anchors, constraints and variant families are NIGHTSHIFT engineering proposals. No rendered proof sheet has yet been visually inspected; therefore this document does not certify visual quality.

## 1. Shared specification rules

### 1.1 What “master” means here

The current code calls A, B, G, R and S custom contour masters because they have individually authored path strings. That is a useful inventory distinction, not proof that they are complete semantic glyph records. The prototype stores no semantic component graph, no explicit metrics object, no anchor metadata, no variant provenance and no per-glyph validation results.

A production master is not complete until:
- the letter identity and its structural components are declared;
- all enclosed counters and intentional apertures are represented explicitly;
- topology is independent of render-layer styling;
- metrics and anchors are measurable and documented;
- at least one rendered review sheet has been inspected at multiple scales and backgrounds;
- glyphs pass isolated, pair and word-context tests;
- its maturity status and revision are stored.

### 1.2 Coordinate and topology conventions

The v0.6 paths use an approximately 0–110 local coordinate system and are transformed by the renderer. This is an observed implementation convention, not a production coordinate standard.

For the normalized contract, use a declared local coordinate frame with:
- baseline and cap-height reference lines;
- glyph advance bounds distinct from visible contour bounds;
- closed fill contours with explicit winding/fill-rule semantics;
- counters represented as negative-space regions, not painted background-colour patches;
- apertures represented separately from enclosed counters;
- semantic components that may map to multiple contour segments.

Do not infer a semantic stroke order from the current path command order. A closed outline does not uniquely reveal the original gesture or construction sequence.

### 1.3 Shared renderer requirements

Every master must be tested with identical topology across:
- base fill;
- outer outline;
- inline;
- highlights;
- depth/extrusion;
- slant and non-uniform scale;
- small-size thumbnail rendering;
- at least one light and one dark surface.

The current prototype builds a combined path for fill/depth, but outlines, inline and highlights are drawn from the outer path only. Explicit holes are painted with the fixed paper colour `#eee9dc`. This is not true transparent negative space and will fail on arbitrary surfaces. All five glyphs must use a single validated contour/topology model for every render pass.

### 1.4 Maturity labels

Use these labels in the implementation:
- **authored-contour:** individually authored contour exists, semantic review incomplete;
- **semantic-reviewed:** component graph, counters/apertures and metrics reviewed;
- **render-reviewed:** all render passes and surface tests inspected;
- **context-reviewed:** pair and word-context tests passed;
- **production-approved:** owner-approved for production use.

The five glyphs begin at **authored-contour**, not production-approved.

---

## 2. A — Apex / two-leg construction

### 2.1 Current source representation

- Stored in `M.A`.
- One closed outer path and one separately stored inner path.
- The outer path contains the two rising legs, apex region, outer shoulders and lower terminals.
- The inner path is a closed triangular-like counter.
- Renderer selects even-odd fill because the custom record has a non-empty hole array.

### 2.2 Semantic construction proposal

Required semantic roles:
- left leg;
- right leg;
- apex/upper junction;
- crossbar or crossbar-like structural region;
- counter boundary.

The current outline alone does not establish whether the crossbar should be treated as an independent bar, an integrated contour transition or a style-specific construction. Preserve this as an authoring decision and expose it in the glyph graph rather than hard-coding an assumption.

### 2.3 Identity invariants

A variant should remain recognizably A while preserving:
- two principal rising sides converging toward an upper apex region;
- a deliberate internal negative space or explicitly declared open-apex variant;
- a cross-structure or deliberate alternative that distinguishes it from a generic Λ-like form;
- stable lower support/terminal logic.

An open apex or counter topology change must be a separately named variant, not a random contour perturbation.

### 2.4 Counter and topology

- Declare one counter ID for the current closed-counter construction.
- Protect its minimum clearance from the outer contour and any crossbar.
- If a style variant opens the apex or converts the counter to an aperture, declare the topology change explicitly.
- Do not simulate the counter by drawing the paper colour over the fill.

### 2.5 Proposed metrics and anchors

Record measurable values rather than fixed arbitrary numbers:
- apex position and apex angle;
- left/right leg thickness profiles;
- crossbar vertical position and thickness;
- counter area and minimum clearance;
- left/right side-bearing bounds.

Candidate anchors, to be validated from geometry:
- left lower entry;
- right lower exit;
- left/right upper shoulder zones;
- optional crossbar-side connection zones.

Anchor positions should be stored in normalized local coordinates with an associated direction vector, allowed connection roles and clearance envelope. They are proposals, not currently existing data.

### 2.6 Variants to explore

- narrow / wide stance;
- high / low crossbar;
- asymmetric leg weight;
- rounded versus angular apex;
- controlled open-apex construction.

Each variant must retain its own counter/aperture declaration and test record.

### 2.7 Required tests

- Isolated: A at nominal, narrow and wide proportions.
- Pair: AV, AR, AT, BA.
- Word: ABRA, KRAZE, NIGHTSHIFT.
- Stress: maximum slant, maximum allowed overlap, outline + inline + depth simultaneously.
- Verify counter remains visible and does not collapse at thumbnail size.

### 2.8 Risks and review questions

- The current path's counter shape and crossbar relationship need visual review.
- Extreme slant may alter perceived apex balance.
- A wide or low crossbar can reduce counter clarity.
- Do not assume both legs are symmetrical; asymmetry may be intentional.

**Status:** authored-contour; semantic graph, anchors and visual review pending.

---

## 3. B — Spine / two-bowl construction

### 3.1 Current source representation

- Stored in `M.B`.
- One closed outer path and two separately stored inner paths.
- The outer path describes a left spine and connected upper/lower bowl silhouette.
- Two closed counter paths are explicitly present.
- Renderer uses even-odd fill for the combined fill/depth path, then paints the two counters with paper colour.

### 3.2 Semantic construction proposal

Required semantic roles:
- primary spine;
- upper bowl;
- lower bowl;
- upper counter;
- lower counter;
- waist / bowl transition junction.

The upper and lower bowls should be independently addressable for proportion, curvature and weight adjustments while preserving a coherent outer contour.

### 3.3 Identity invariants

A variant should preserve:
- one dominant spine;
- two distinguishable bowl masses attached to the spine;
- two intentional counters in the current two-counter family;
- a readable waist transition between upper and lower bowl regions.

One-counter or open-bowl versions are possible authored variants, but must declare their changed topology and must not be silently substituted for the current master.

### 3.4 Counter and topology

- Declare `B.counter.upper` and `B.counter.lower` as separate negative-space regions.
- Validate each counter independently after outline expansion and depth offset.
- Ensure the waist does not pinch either counter or merge both into one accidental cavity.
- Counter boundaries must participate in fill, outline, inline, highlights and depth through a consistent topology model.

### 3.5 Proposed metrics and anchors

Measure:
- spine thickness profile;
- upper/lower bowl width and height;
- waist position and width;
- counter areas and minimum clearances;
- outer left/right extents and advance width.

Candidate anchors:
- spine upper/lower zones;
- upper-right terminal zone;
- lower-right terminal zone;
- waist-side transition zone.

Connection anchors must not be placed inside protected counter clearances.

### 3.6 Variants to explore

- upper bowl smaller/larger than lower bowl;
- compressed versus expanded waist;
- angular versus rounded bowl transitions;
- open terminal treatment as a separate topology variant;
- directional weight bias between upper and lower bowls.

### 3.7 Required tests

- Isolated: B at small size, narrow width and heavy outline.
- Pair: BA, BR, BO, MB.
- Word: BOMB, ABRA, B-S test string where punctuation is later supported.
- Stress: two counters with maximum overlap, depth and inline enabled.
- Verify the counters remain separate and legible in every render pass.

### 3.8 Risks and review questions

- Two counters can collapse under heavy outline/depth.
- Bowl asymmetry must be intentional and reviewable.
- A narrow waist can create a fragile neck or visually split the letter.
- Do not let neighboring letters occlude either counter without an explicit solver warning/override.

**Status:** authored-contour; semantic decomposition, independent counter validation, anchors and visual review pending.

---

## 4. G — Open bowl / internal bar / terminal construction

### 4.1 Current source representation

- Stored in `M.G`.
- One closed outer path and an empty hole array.
- The opening and internal bar/terminal logic are encoded within a single closed contour.
- The prototype therefore has no separately declared counter or aperture metadata for G.

### 4.2 Semantic construction proposal

Required semantic roles:
- C-like outer bowl/arc;
- upper terminal;
- lower terminal;
- internal bar;
- bar-to-bowl attachment;
- opening/aperture region.

Do not automatically classify the G opening as a counter. It is an aperture/opening bounded by terminals and internal structure. Whether the negative region is represented as an explicit aperture polygon, a contour notch or a compound boundary is a data-model decision to make explicit.

### 4.3 Identity invariants

A G variant should preserve:
- a recognizably curved, open bowl family;
- a deliberate opening with distinguishable terminal directions;
- internal bar/terminal logic that separates it from C;
- enough structure to avoid reading as O at reduced size.

The exact bar position and opening direction can vary by authored variant. No universal G construction is asserted.

### 4.4 Aperture and topology

- Declare at least one aperture/opening semantic region or equivalent terminal-pair relation.
- Identify which contour edges bound the opening.
- Protect the gap from closure during outline expansion, slant, overlap and depth.
- Do not invent a closed counter merely to fit a generic schema.

### 4.5 Proposed metrics and anchors

Measure:
- bowl curvature and width;
- opening width at a defined measurement line;
- upper/lower terminal directions;
- internal bar length, angle and attachment point;
- aperture area/clearance where a closed region representation is available.

Candidate anchors:
- upper terminal;
- lower terminal;
- outer-right bowl zone;
- bar terminal / bar attachment zone.

Only expose an anchor if it has a valid direction and clearance envelope.

### 4.6 Variants to explore

- open versus tighter aperture;
- bar high/mid/low;
- bar short/extended;
- angular versus rounded terminal cuts;
- asymmetric bowl tension.

Every variant must be checked against C and O confusion at small size.

### 4.7 Required tests

- Isolated: G at thumbnail and full size; compare side-by-side with C and O.
- Pair: GA, GO, GR, NG.
- Word: GHOST, NIGHTSHIFT.
- Stress: heavy outline, maximum slant, neighboring overlap near the opening.
- Verify the opening remains open and the bar remains visibly attached as intended.

### 4.8 Risks and review questions

- The current single-contour path obscures the intended semantic segmentation.
- A small or occluded aperture can turn G into C or O.
- The bar may be misread as a decorative bridge unless it is part of the glyph construction graph.
- A future renderer must preserve the opening without paper-colour painting.

**Status:** authored-contour; aperture semantics, component graph, anchors and visual review pending.

---

## 5. R — Spine / bowl / diagonal leg construction

### 5.1 Current source representation

- Stored in `M.R`.
- One closed outer path and one separately stored inner path.
- The outer path describes a left spine, upper bowl, bowl-to-leg transition and descending diagonal leg.
- One closed bowl counter is explicit.
- The current outline/inline/highlight passes draw only the outer path, not the counter boundary.

### 5.2 Semantic construction proposal

Required semantic roles:
- primary spine;
- upper bowl;
- bowl counter;
- leg;
- bowl-to-leg junction;
- upper and lower terminals.

The leg should be independently addressable so its angle, length and attachment can vary without accidentally changing the bowl counter.

### 5.3 Identity invariants

A variant should preserve:
- one primary vertical spine;
- one upper bowl attached to the spine;
- one protected bowl counter in the current family;
- a distinct descending leg emerging from the bowl/waist region.

A straight-legged or highly stylized alternate may be explored, but must be a named authored variant with explicit junction logic.

### 5.4 Counter and topology

- Declare one protected counter ID.
- Identify the bowl-to-leg junction separately from the counter boundary.
- Preserve a minimum counter-to-leg clearance.
- Validate counter visibility after outline, inline, highlights, depth, slant and overlap.
- Do not allow the leg to create an accidental closed pocket or sever the bowl.

### 5.5 Proposed metrics and anchors

Measure:
- spine thickness;
- bowl height/width and counter area;
- leg origin, angle, length and thickness profile;
- bowl-to-leg junction angle;
- advance width and side bearings.

Candidate anchors:
- upper spine;
- lower spine;
- bowl outer-right zone;
- leg terminal;
- optional waist junction zone.

The leg terminal anchor should have an outgoing direction vector and a collision envelope.

### 5.6 Variants to explore

- steep versus shallow leg;
- long versus compact leg;
- rounded versus angular bowl;
- narrow versus wide bowl;
- asymmetrical spine/bowl weight.

### 5.7 Required tests

- Isolated: R at nominal, narrow bowl and steep leg.
- Pair: RA, RO, BR, AR.
- Word: ABRA, KRAZE, RISK.
- Stress: leg near next glyph, maximum overlap, depth and outline.
- Verify the counter remains open and the leg reads as a structural part of R.

### 5.8 Risks and review questions

- The current leg may crowd the counter after transforms.
- The bowl-to-leg junction can become a weak or over-thickened knot.
- A neighboring glyph may collide with the diagonal leg before the nominal advance boundary.
- The current path does not declare which segment is the leg; semantic segmentation is required.

**Status:** authored-contour; semantic graph, counter clearance, anchors and visual review pending.

---

## 6. S — Continuous directional curve

### 6.1 Current source representation

- Stored in `M.S`.
- One closed outer path and an empty hole array.
- The silhouette encodes upper and lower directional turns, a narrower middle transition and two terminal regions.
- No enclosed counter is declared.

### 6.2 Semantic construction proposal

Required semantic roles:
- upper terminal;
- upper curve / upper mass;
- middle transition / narrow neck;
- lower curve / lower mass;
- lower terminal.

The semantic model should allow either a gesture trace or a structure-first segment graph. Do not infer stroke order solely from the current closed outline. If a gesture trace is later added, store it as a distinct representation with provenance and do not silently derive it as historical fact from the contour.

### 6.3 Identity invariants

A variant should preserve:
- continuous directional flow from upper to lower terminal;
- a visible reversal or opposing curve progression;
- a deliberate narrow transition region;
- distinct upper and lower mass balance.

The S should not become two unrelated lobes, a generic lightning bolt or an arbitrary zigzag unless such a topology is explicitly authored as a separate experimental variant.

### 6.4 Counter and topology

- No enclosed counter is declared in the current master.
- Declare any intentional aperture only if a future variant actually introduces one.
- Validate self-intersections and minimum neck width.
- Ensure fill-rule behavior is deterministic even without holes.
- Do not treat an empty hole array as a complete topology description.

### 6.5 Proposed metrics and anchors

Measure:
- upper/lower mass area ratio;
- narrowest neck width;
- upper/lower terminal tangent directions;
- curvature continuity and inflection locations;
- left/right extents and advance width.

Candidate anchors:
- upper terminal;
- upper outer curve;
- middle transition zone;
- lower outer curve;
- lower terminal.

Anchor direction vectors should follow local tangent direction. Avoid anchors at the narrowest neck unless a specific connection use case is validated.

### 6.6 Variants to explore

- upper-heavy / lower-heavy mass;
- wide / compact S;
- tight / open middle transition;
- angular / flowing curvature;
- terminal cuts with different directions.

### 6.7 Required tests

- Isolated: S at thumbnail/full size, compact and wide.
- Pair: SA, SB, GS, NS.
- Word: GHOST, NIGHTSHIFT, SQUE (with remaining letters marked provisional).
- Stress: heavy outline, high slant, overlap near the neck.
- Verify no accidental self-intersection, pinched neck or terminal collision.

### 6.8 Risks and review questions

- The closed contour does not reveal an authoritative stroke order.
- A narrow neck may collapse under outline expansion.
- A highly angular variant may lose the intended directional S flow.
- Neighbor anchors should be placed on stable outer regions, not fragile inflection points.

**Status:** authored-contour; segment graph/gesture decision, metrics, anchors and visual review pending.

---

## 7. Cross-master test and review matrix

| Test dimension | A | B | G | R | S | Pass condition |
|---|---:|---:|---:|---:|---:|---|
| Isolated silhouette | ✓ | ✓ | ✓ | ✓ | ✓ | Letter identity survives thumbnail and full-size views |
| Topology declared | ✓ | ✓ | ✓ | ✓ | ✓ | Counters/apertures are explicit; “none” is also explicit |
| Fill consistency | ✓ | ✓ | ✓ | ✓ | ✓ | All passes use identical validated topology |
| Outline/inline boundary | ✓ | ✓ | ✓ | ✓ | ✓ | Counter/aperture edges behave intentionally |
| Depth | ✓ | ✓ | ✓ | ✓ | ✓ | No counter fill, sliver or occlusion defect |
| Slant/scale | ✓ | ✓ | ✓ | ✓ | ✓ | Identity and protected spaces survive allowed transforms |
| Light/dark surface | ✓ | ✓ | ✓ | ✓ | ✓ | No paper-colour patches; real negative space |
| Pair contexts | ✓ | ✓ | ✓ | ✓ | ✓ | Anchors do not force collisions or accidental joins |
| Word contexts | ✓ | ✓ | ✓ | ✓ | ✓ | Whole-word rhythm and negative spaces remain deliberate |
| Deterministic regeneration | ✓ | ✓ | ✓ | ✓ | ✓ | Same project data and seed reproduce same geometry |

### Required proof-sheet panels

1. Five glyphs as plain silhouettes on a neutral light background.
2. Same glyphs with counters/apertures highlighted as diagnostic overlays.
3. Fill + outline + inline + highlight combination.
4. Depth enabled.
5. Small thumbnail row.
6. Dark-surface row.
7. Pair-context samples.
8. Word-context samples.

Each sheet must include glyph ID, variant ID, maturity, schema version and seed where procedural variation is involved. Human visual review must be recorded separately from automated geometry validation.

## 8. Source-code findings versus design proposals

### Verified from v0.6 source
- A, B, G, R and S are stored in the custom `M` map.
- A, B and R each have a non-empty explicit hole array (one, two and one paths respectively).
- G and S have empty hole arrays and each use a single outer path.
- Fill/depth use the combined path; outline/inline/highlight use only the outer path.
- Explicit holes are painted with fixed `#eee9dc`.
- The local glyph transform applies per-letter translation, scale and slant.
- The style selector changes scale/transform and render treatment; it does not supply a semantic glyph construction grammar.
- No semantic component graph, per-glyph anchors or explicit metrics object is present in the five records.

### NIGHTSHIFT engineering proposals
- The semantic decompositions in Sections 2–6.
- Protected counter/aperture metadata.
- Candidate anchors and their direction/clearance semantics.
- Named variant families and invariants.
- Maturity labels and the proof-sheet acceptance process.

### Not yet verified
- Whether the current paths are visually balanced or aesthetically successful.
- Whether all five remain recognizable under every current style/transform combination.
- Exact contour self-intersections, winding behavior and offset robustness.
- Whether the proposed anchor zones are geometrically feasible in the current paths.
- Whether the five masters form a coherent style family; the current prototype does not yet implement full style grammars.

## 9. Handoff requirements for Claude

Claude should not simply wrap the five existing SVG path strings in a new object and call them complete masters. The implementation should:
1. import the legacy paths as reference geometry;
2. preserve them as immutable source snapshots for comparison;
3. create semantic component and topology metadata;
4. provide a diagnostic editor view for counters, apertures, anchors and bounds;
5. make every render pass consume the same validated topology;
6. support named authored variants;
7. generate proof sheets and test reports;
8. keep the master status at `authored-contour` until human review gates are passed.

**Next dependency:** define the normalized A–Z glyph contract that can represent these five cases and all remaining letters without forcing G's aperture or S's continuous contour into a counter-only model.
