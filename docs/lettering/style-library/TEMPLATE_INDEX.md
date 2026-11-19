# NIGHTSHIFT Template Index

Complete collection: [TEMPLATE_CATALOG.md](TEMPLATE_CATALOG.md) (38 templates across 12 families) and [templates.json](templates.json) (machine-readable registry). Templates are design hypotheses until rendered, compared and practitioner-reviewed. Current capability mapping: see [PROOF_IMPLEMENTATION_PLAN_01.md](PROOF_IMPLEMENTATION_PLAN_01.md). The resolver implements only a subset of Neutral, Straight, Bubble and Blockbuster operations; presence in this index does not imply code support.

## Letterform grammars
| Style card | Template | Distinguishing construction |
|---|---|---|
| Bubble | Classic Inflated | Rounded mass, soft corners, protected counters |
| Bubble | Softie / Organic | Uneven, glyph-specific inflation and elastic bowls |
| Bubble | Compact Bubble | Tighter massing with reinforced necks and apertures |
| Blockbuster | Broad Block | Broad squared construction |
| Blockbuster | Angled Block | Clipped corners and directional slant |
| Blockbuster | Monumental Blockbuster Context | Large-scale word-block context; format remains separate |
| Simple / Straight | Classic Straight | Clear skeleton, controlled mass |
| Simple / Straight | Condensed Straight | Narrow rhythm with protected counters |
| Simple / Straight | Serif / Extended | Readable base with structural terminals |
| Simple / Straight | Hollow Straight | Straight geometry with separate outline-only presentation |
| Angular / Blade | Faceted Angular | Segment-based contours |
| Angular / Blade | Blade / Tapered | Directional tapered terminals |
| Angular / Blade | Cut / Shard | Controlled notches and contour cuts |
| Blackletter | Textura-Inspired | Dense vertical rhythm and broken arches |
| Blackletter | Fraktur-Inspired | Varied broken strokes and selected curves |
| Blackletter | Contemporary Hybrid | Selected blackletter features adapted to graffiti composition |

## Composition grammars
| Style card | Template | Distinguishing construction |
|---|---|---|
| Wildstyle | Open Wildstyle | Visible skeleton, few planned joins |
| Wildstyle | Interlocked Wildstyle | Multiple declared joins and crossings |
| Wildstyle | Abstract Wildstyle | Higher transformation with declared traceability |
| Semi-Wildstyle | Open Semi-Wild | Readable base with limited extensions |
| Semi-Wildstyle | Connected Semi-Wild | Selective joins and declared crossing order |
| Semi-Wildstyle | Graphic Semi-Wild | Restrained secondary structures |
| Anti-Style / Experimental | Raw / Unpolished | Controlled irregularity |
| Anti-Style / Experimental | Deconstructed / Fragmented | Documented component displacement |
| Anti-Style / Experimental | Abstract / Illegible-by-Design | Explicit abstraction and traceability |

## Practice and format templates
| Style card | Template | Distinguishing construction |
|---|---|---|
| Tag / Handstyle | Monoline Handstyle | Single-weight rhythm |
| Tag / Handstyle | Broad-Nib / Flatline | Directional thick/thin contrast |
| Tag / Handstyle | Brush / Gestural | Elastic weight and tapered terminals |
| Throw-up | Rounded Throw-up | Bubble-derived format |
| Throw-up | Straight Throw-up | Bold simple/straight format |
| Throw-up | Hollow / Outline Throw-up | Format plus outline-only presentation |
| Traditional / Old-School | Early Simple Outline | Historical study template |
| Traditional / Old-School | Classic Softie | Rounded historical study family |
| Traditional / Old-School | Classic Straight / Block | Broad simple historical study family |
| Traditional / Old-School | Classic Piece Treatment | Work-format layer over chosen grammar |

## Hybrid templates
| Style card | Template | Distinguishing construction |
|---|---|---|
| Calligraffiti | Broad-Nib Calligraffiti | Broad-edge contrast + graffiti-scale composition |
| Calligraffiti | Pointed / Brush Calligraffiti | Elastic gestural strokes |
| Calligraffiti | Script-Hybrid Calligraffiti | Named script features translated into original lettering |

## Orthogonal rendering treatments
Hollow, outline, inline, fill, 3D/extrusion, chrome, shadow, drips, texture and stencil are selected independently. See [RENDERING_TREATMENTS.md](RENDERING_TREATMENTS.md).

## Template maturity and engine support
| Family | Documentation | Current engine support |
|---|---|---|
| Bubble | 3 templates documented | Base Bubble operation exists; variants not separate/calibrated |
| Straight / Simple | 4 templates documented | Base Straight operations exist; variants not separate/calibrated |
| Blockbuster | 3 templates documented | Straight + Block-fit composition exists; no separate alphabet |
| Wildstyle | 3 templates documented | Relationship/interlocking operation unavailable pending C04 |
| Tag / Handstyle | 3 templates documented | No gesture/stroke renderer |
| Throw-up | 3 templates documented | Context enum exists; dedicated presentation renderer absent |
| All other families | Documented only | No distinct generator operations |

- **Documented:** card and construction hypothesis exist.
- **Rendered:** representative glyphs and words exist.
- **Compared:** controlled monochrome comparison completed.
- **Practitioner-reviewed:** terminology and form reviewed by a knowledgeable practitioner.
- **Generator-ready:** parameter ranges calibrated and regression tests pass.

No template in this index should be assumed generator-ready merely because it is documented.
