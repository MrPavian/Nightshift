# Rendering Treatments — Independent Layer Library

Rendering is not letterform grammar. Select treatments after the base glyph and composition pass monochrome silhouette review.

## Treatment catalogue

| Treatment | Layer | What it changes | What it must not change |
|---|---|---|---|
| Flat / Solid | Fill | Front-face colour or value | Glyph contour and counters |
| Hollow | Presentation | Removes fill; emphasizes contour | Underlying glyph geometry |
| Outline | Contour | Adds one or more contour strokes | Structural stroke mass |
| Inline | Interior detail | Adds inset line inside front face | Counter topology |
| Shadow | Rendering | Adds offset tonal layer | Front-face anatomy |
| 3D / Extrusion | Depth | Adds projected side faces | Front-face silhouette |
| Chrome / Metallic | Material | Adds reflection bands and value shifts | Letter construction |
| Gradient | Fill | Varies value/colour across face | Geometry |
| Drips | Effect | Adds paint-flow marks | Structural terminals or counters |
| Texture | Material | Adds grain, wear or surface variation | Glyph identity |
| Stencil | Production/presentation | Uses bridges and cut-out logic | Unintended loss of letter identity |

## Template notes

### Hollow / Outline
- Keep contour offset stable and corner-aware.
- Resolve inner and outer joins independently.
- Check narrow counters after offsetting.
- Hollow is a presentation mode; it can be paired with Bubble, Straight, Angular or other grammars.

### 3D / Extrusion
- Define a projection vector and depth.
- Maintain one consistent projection across the word unless intentionally authored otherwise.
- Resolve side-face overlaps and occlusion order.
- Never let extrusion hide a broken front-face silhouette.

### Chrome / Metallic
- Define a coherent light environment before placing reflection bands.
- Reflection shapes follow surface orientation and plane changes.
- Chrome is a material treatment, not a letterform style or evidence of historical authenticity.

### Drips
- Separate intentional drips from accidental-looking contour defects.
- Drips must not close counters, merge adjacent glyphs or disguise weak joins.
- Do not automatically apply a drip to every terminal.

### Stencil
- Bridges are structural supports for disconnected islands.
- Bridge placement must preserve readability and be intentional.
- Stencil is a production constraint, not a graffiti letterform family.

## Acceptance gates
1. Base silhouette passes without any treatment.
2. Treatment is stored as a separate layer/configuration.
3. Disabling treatment restores the exact base geometry.
4. Treatment cannot silently alter counters or glyph joins.
5. Effects are tested on curved and angular glyphs.
