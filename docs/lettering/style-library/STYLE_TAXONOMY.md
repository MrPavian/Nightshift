# NIGHTSHIFT Style Taxonomy

Status: working taxonomy for design and research, not a universal historical classification. Version 2.0.0.

## 1. Four independent dimensions

| Dimension | Question | Examples |
|---|---|---|
| Letterform grammar | How is one glyph built? | bubble, straight/block, angular, blackletter-derived |
| Composition grammar | How do glyphs interact? | isolated, compact, interlocking, shared contour |
| Practice / format context | What kind of writing/work is it? | tag, throw-up, piece, panel, wholecar, blockbuster context |
| Rendering treatment | How is the geometry presented? | flat, outline, inline, 3D, chrome, stencil, drips |

These dimensions interact but must not be collapsed into one style enum.

## 2. Working taxonomy

| Label | Primary dimension | Working definition | Caution |
|---|---|---|---|
| Bubble | Letterform | Rounded, inflated massing with softened corners and protected counters | Not identical to Throw-up |
| Block / Straight | Letterform | Broad, squared or angular construction | Not every straight-letter piece is a Blockbuster |
| Blockbuster | Format/context; sometimes letterform descriptor | Large-scale, economical, block-like lettering/composition | Terminology varies |
| Simple / Straight | Letterform | Readable, low-abstraction construction; can include serifs, slant and overlap | Simple does not mean generic |
| Angular | Letterform | Faceted, sharp or clipped contour logic | Broad descriptor, not necessarily one scene category |
| Blade | NIGHTSHIFT template family | Tapered, directional terminal treatment | Operational subfamily; practitioner validation needed |
| Wildstyle | Primarily composition | Interlocking, directional, extended and abstracted lettering | Not simply illegible or random arrows |
| Semi-Wildstyle | Composition | Reduced interlocking/extension complexity with clearer letter evidence | Scene term; operational templates remain NIGHTSHIFT inference |
| Tag | Practice/work format | Name/signature inscription | Not synonymous with handstyle |
| Handstyle | Lettering/movement practice | Individualized written movement and rhythm | Not a font |
| Throw-up | Practice/work format | Simplified, economical graffiti work format | Often bubble-derived, not definitionally bubble |
| Piece | Work format | Developed graffiti composition | Can use many letterform grammars |
| Traditional / Old-School | Historical/contextual umbrella | Retrospective label for diverse earlier practices and forms | Never one universal alphabet |
| Blackletter / Old English | Script-derived letterform | Family including Textura, Rotunda, Schwabacher and Fraktur | Old English is imprecise as a universal label |
| Calligraffiti | Hybrid practice/letterform | Calligraphic script logic combined with graffiti lettering/composition | Diverse practices; name source script where possible |
| Anti-Style / Experimental | Experimental grammar | Deliberate resistance to polished or conventional form | Contested term; not random bad lettering |
| 3D / Extrusion | Rendering | Added spatial depth | Does not define front-face construction |
| Chrome | Rendering | Metallic fill/reflection treatment | Not a letterform grammar |
| Hollow / Outline | Rendering/presentation | Unfilled or contour-led presentation | Not a distinct letterform grammar |
| Drips | Rendering/effect | Flowing paint marks | Can be accidental or intentional |

## 3. Terms that must not be confused
- Tag is the inscription/work; handstyle concerns individualized lettering and movement.
- Bubble is a letterform family; Throw-up is a practice/format.
- Block is a construction grammar; Blockbuster may describe a format or block-like letters.
- Wildstyle and Semi-Wildstyle are composition approaches, not merely effect presets.
- 3D, chrome, hollow, palette and drips are treatments, not letterform grammars.
- Getting Up and Bombing are practice/activity concepts, not letterform styles.
- Blackletter is a broad script family; Textura, Rotunda, Schwabacher and Fraktur are distinct historical forms.
- “Old-school” is a retrospective umbrella, not a single historical style.

## 4. Combinations
A generated study should select independent values, for example:
- Straight + Throw-up + Hollow
- Bubble + Piece + 3D
- Angular + Semi-Wildstyle + Flat monochrome
- Blackletter-derived + Piece + Outline
- Handstyle + Tag + Monoline treatment

The data model should preserve these as separate fields.

## 5. Historical caution
Terminology is scene-, period- and source-dependent. This is an operational NIGHTSHIFT model, not a claim to settle historical disagreement. Public historical claims require their own source, geography and period. Operational labels such as Blade, Graphic Semi-Wild and Raw Experimental must be identified as NIGHTSHIFT templates unless practitioner sources validate them.
