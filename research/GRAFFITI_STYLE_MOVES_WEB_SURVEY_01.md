# Graffiti style moves: web survey and design rules 01

**Status:** research notes plus design inference. The engine translation is implemented as `src/style/graffiti-engine.js` 0.1.0.
**Date:** 2026-11-18
**Author:** Claude (AI), at the owner's request: research graffiti alphabets on the web, analyse styles, imitate them.
**Evidence type:** contemporary tutorial and teaching sites (practitioner-oriented secondary sources, not historical sources), the owner's Academy reference set (`assets/design/reference/academy-uppercase/`), and NIGHTSHIFT design inference. No artwork by identifiable writers was copied or traced, and no writer is used as a preset.

## Limits of this survey

- The image search displayed images to the owner but returned only their titles to the AI. The visual analysis therefore rests on:
  - written tutorials;
  - the owner's 26 Academy sheets, which the AI viewed in full resolution;
  - general background knowledge.
- No regional analysis and no historical dating. The Dortmund rules (CLAUDE.md §5) are unaffected: this note claims no Dortmund style.

## What the sources agree on (summarised, with sources)

1. **Build order:** first the skeleton lines, then blocks/bars around them, then style elements (serifs, enlarged parts), then fill, then 3D blocks. Source: graffiti-empire.com, per-letter tutorials (D, M, T).
2. **Bars:** letters are built from bars of consistent width. Style sits on top of a skeleton that still reads on its own. Sources: urbancanvas article on Wildstyle structure; theartistblock.ink.
3. **Basic moves for style:** tilt and taper (lean, top thinner than bottom), extrusions (a bar runs past its normal end) and serifs (extra strokes at bar ends). Source: theartistblock.ink, step-by-step R tutorial.
   - A straight-letter tutorial (S1VE, via a recap) adds tabs, extended lines and cut corners.
   - The same tutorial makes consistency across the letters of a name the core of a style.
4. **Arrows** are structural, not decoration. Use few, keep their direction consistent, and connect them to something. Too many arrows, or arrows pointing every which way, look messy. Source: urbancanvas.
5. **Overlaps** create depth and close gaps, but must not cover the structure of a letter. Source: theartistblock.ink, „Basics to Overlapping Graffiti“.
6. **Bubble letters:**
   - often overlapping;
   - little space between planks (E, F, M, N);
   - only round edges, no right angles;
   - counters shrunk to dots or lines;
   - letters taller than wide;
   - shadow as an offset copy;
   - highlights on the side facing the light.

   Source: graffiti-empire.com, bubble-letter tutorial.
7. **Throw-up** is often described as rounded and squeezed together, heavily outlined, with few colours (wikiHow „Do a Throwie“, graffitifun.com). CLAUDE.md still applies: a throw-up does not have to be round or two-coloured.
8. **Semi-Wildstyle** sits between Straight and Wildstyle: small extensions, light interlocking, arrows at bar ends. Source: graffitifun.com, letter styles.

## Translation into the engine (NIGHTSHIFT design inference)

| Rule | Implementation |
|---|---|
| Skeleton → bars | `src/style/skeletons.js`: centre lines A–Z, with named free ends (terminals) and crossbars |
| Bar width per style | Bubble 58 (round bars), Straight 30, Blockbuster 40, Semi-Wild 28 (in cap-height units of 140) |
| Serifs, cuts, kicks, arrows | Moves that may only sit on free bar ends. Kicks and arrows only on outer ends; arrows never point down; feet kick along the baseline |
| Few, consistent moves | Each proposal picks one move set (e.g. „Pfeile + Kicks“). Only those moves recur through the word; at most 2 per letter (Semi-Wild: 3) |
| Geteilte Balken (split bars) | Crossbars of A, E, F, H can split into two offset halves (Semi-Wild) |
| Bubble | Round, very wide bars; letters narrowed; drop-shaped ends; overlap in the word |
| Overlap and 3D | 3D lies behind all letters; later letters overlap earlier ones; outline before fill |
| Highlights | Short white lines on the side of each bar facing the light (top left) |

## Not implemented

- True interlocking and shared bars between letters (Wildstyle): C04.
- Taper (bars getting thinner towards the top).
- Gradients, connectors between letters, characters.
- Tags/handstyle: HST-01.
- Calibration against reviewed reference pieces, and any assessment of quality by a human.

## Sources

- graffiti-empire.com: „How to draw graffiti bubble letters“ and the letter pages D, M, T
- theartistblock.ink: „How to do graffiti step by step“, „Basics to Overlapping Graffiti“
- urbancanvas-u6.pages.dev: „Wildstyle graffiti lettering structure“
- graffitifun.com: „Understanding graffiti letter styles“, „Graffiti letters“
- recapio.com: summary of S1VE, „How To Draw Graffiti Letters Tutorial – Basic Straight Piece“
- wikiHow (mirror): „Do a Throwie“
