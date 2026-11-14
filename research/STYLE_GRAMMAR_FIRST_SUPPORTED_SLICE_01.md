# NIGHTSHIFT Style Grammar — First Supported Slice 01

**Status:** Resolver and release-scope specification; not implemented functionality or visual approval.  
**Depends on:** Style Grammar Specifications 01, Compatibility & Parameter Contract, A–Z Style Grammar Application Matrix, A/B/G/R/S contracts.

## 1. Purpose

Define the first honest, testable style capability. The product must expose creative combinations without pretending every letter or grammar is already authored. A selected style is a set of independent construction and composition rules, not a cosmetic filter.

## 2. Keep the axes separate

- **Letterform grammar:** Bubble, Straight, Hybrid, Authored.
- **Composition grammar:** Neutral, Compact, Block-fit, Interlocking.
- **Practice/form context:** Tag, Throw-up, Piece, Panel, Wholecar, None.
- **Surface:** Blackbook, Wall, Train-car, Paper, Custom.
- **Rendering:** Fill, outline, inline, highlights, depth, texture.

Blockbuster is not an exclusive alphabet. In NIGHTSHIFT it is expressed as straight/block letterform tendencies plus block-fit, scale and coverage context. Wildstyle Study is a composition/relationship grammar and may operate on straight, rounded or hybrid glyphs. These are product modelling decisions, not universal historical definitions.

## 3. First-slice capability matrix

| Axis | First slice | Required behavior | Not yet claimed |
|---|---|---|---|
| Letterform: authored/neutral | Supported for A/B/G/R/S | Preserve exact master; no hidden geometry changes | Full A–Z authored coverage |
| Letterform: Bubble | Resolver proposal / experimental preview only where a real authored operation exists | Roundness/mass intent mapped to registered glyph operations; monochrome comparison | A complete Bubble alphabet |
| Letterform: Straight | Resolver proposal / experimental preview only where a real authored operation exists | Angular/linear construction intent; distinct geometry, not finish | A complete Straight alphabet |
| Letterform: Hybrid | Conditional on explicit per-glyph authored choices | Resolve glyph-specific compatible variants | Automatic mixing on unsupported glyphs |
| Composition: Neutral | Supported | readable adjacency and deliberate open separation | automatic interlocking |
| Composition: Compact | Candidate layout only within validated bounds | spacing/advance and channel diagnostics | uncalibrated packing controls |
| Composition: Block-fit | Later after surface/layout metrics | fit word silhouette without distorting glyph identity | forced per-letter stretch |
| Composition: Interlocking | Experimental, staged | actual anchors, relationships and whole-word validation | decorative bridge generator |
| Practice/form | Metadata/context only | preserve independent selection | practice context silently mutating glyph skeleton |
| Surface | Presentation context | coordinate view and export context | surface changing canonical glyph geometry |
| Rendering | Independent derived stage | consistent topology across fill/outline/SVG | effects counted as structural style variation |

## 4. Resolver behavior

The resolver produces an inspectable operation plan. It does not mutate geometry.

Inputs:
- glyph IDs, variant IDs and maturity;
- letterform and composition grammar IDs/versions;
- practice context and surface;
- personal style recipe and version, if present;
- project and instance overrides;
- compatibility declarations;
- registered operation IDs and calibration status;
- neighboring glyphs and pair context.

Outputs per glyph:
- resolved base variant;
- requested operation IDs;
- operation values only when sourced from an approved profile/calibration;
- skipped operations and reason codes;
- compatibility status;
- topology/identity constraints;
- maturity and review limitations.

Conflict policies must remain explicit: reject, skip-with-report or preview-alternatives. No silent fallback that pretends a provisional glyph was styled.

## 5. Grammar behavior by construction

### Bubble
Candidate tendencies: rounded transitions, softened terminals, mass expansion and glyph-specific bowl/curve balance. The system must protect counters, apertures, channels and junctions. Bubble must be distinguishable in monochrome silhouette/geometry before finish effects are applied.

### Straight
Candidate tendencies: linear or angular segment relationships, deliberate corner/junction treatment, stem/bar hierarchy and controlled width profiles. Straight is not simply a thick outline or rectangular background. It must preserve the letter's identity and negative spaces.

### Hybrid
Hybrid is an explicit per-glyph combination of authored rounded and angular traits. It is not a free global interpolation between arbitrary paths. Each mixed construction must declare its component/variant provenance and validation.

### Blockbuster
Represent as a coordinated profile across straight/block construction, block-fit composition, scale/coverage context and surface. Preserve glyph proportions and identity. Any actual glyph deformation must be an explicitly registered, calibrated operation.

### Wildstyle Study
Apply primarily at pair/word level through anchors, extensions, overlaps, crossing order and channels. Begin with open separation, near-touch and terminal-to-terminal candidates. Advanced shared strokes/interlocks remain gated by topology and human review. Arrows and decorative flourishes are not a substitute for relationships.

## 6. First safe combinations

| Combination | Initial status | Reason |
|---|---|---|
| Authored + Neutral | Supported | Baseline and review reference |
| Bubble + Neutral | Experimental per authored glyph only | Requires actual monochrome geometry/variant |
| Straight + Neutral | Experimental per authored glyph only | Requires actual monochrome geometry/variant |
| Bubble + Compact | Experimental | Both glyph and spacing/channel constraints must pass |
| Straight + Block-fit | Deferred until layout calibration | Needs surface/advance constraints |
| Straight + Interlocking | Experimental composition preview | Depends on valid anchors and relationship solver |
| Bubble + Interlocking | Experimental composition preview | Must preserve rounded identity and counters |
| Hybrid + Neutral/Compact | Conditional | Per-glyph authored combination required |
| Any letterform + Wildstyle Study | Composition experiment only | Relationship grammar remains separate |
| Any grammar + any finish | Supported only as derived render | Finish must not change canonical geometry |

Do not market a combination as fully supported merely because it can be selected in the UI.

## 7. Parameter ownership and precedence

Use the established precedence:
1. glyph identity/topology invariants;
2. authored variant;
3. letterform grammar;
4. composition grammar;
5. practice/form and surface constraints;
6. validated user overrides;
7. rendering.

Parameter ownership remains singular:
- glyph geometry → glyph variant/letterform construction;
- word advance/spacing → composition;
- anchor connections/overlap → relationship solver;
- surface bounds → format/surface;
- fill/outline/depth/texture → renderer.

A lower layer cannot silently override a higher invariant.

## 8. Proof requirements

Every claimed combination must have:
- neutral master silhouette;
- grammar construction silhouette with same camera and scale;
- semantic/topology overlay;
- pair and word context where relevant;
- same geometry under finish-only variations;
- identity/topology diagnostics;
- deterministic inputs and artifact hashes;
- separate human visual review.

Bubble and Straight must differ in construction, not merely colour or outline. Wildstyle must show actual relationship graph behavior. Blockbuster must demonstrate composition/surface behavior without treating it as a separate alphabet.

## 9. First-slice acceptance

1. Resolver outputs a deterministic operation plan and does not mutate geometry.
2. Every requested operation maps to a registered operation or is explicitly skipped/rejected.
3. Uncalibrated controls cannot commit geometry.
4. Provisional glyphs are visibly marked and cannot certify a complete style result.
5. Bubble and Straight comparisons use monochrome geometry.
6. Blockbuster and Wildstyle remain on their correct independent axes.
7. Finish-only changes leave canonical geometry hash unchanged.
8. Whole-word validation follows any relationship edit.
9. Compatibility and skipped-rule explanations are persisted.
10. No universal/historical style claims are inferred from NIGHTSHIFT's product categories.
