# Style Card — Simple / Straight Letters

**ID:** simple-straight | **Version:** 1.0.0  
**Primary axis:** Letterform grammar  
**Maturity:** Draft. The category is documented in museum and practitioner material; template variants are NIGHTSHIFT design abstractions.

## Definition and intent
Simple/Straight lettering prioritizes immediately inspectable letter construction. “Simple” does not mean generic or devoid of character: serif details, angular cuts, slant, overlap and colour may occur, but the word remains readily legible. Straight letters use a clear structural skeleton and controlled stroke mass.

Keep this family distinct from Blockbuster: a Straight alphabet is a letterform approach; Blockbuster may additionally describe scale, coverage and economical composition.

## Shared visual signature
- Clear skeleton-to-contour relationship.
- Strong stems, bars, bowls and diagonals.
- Controlled and deliberate spacing.
- Low-to-moderate abstraction.
- Character comes from proportion, terminals, rhythm and selected details—not effects.

## Templates

### T1 — Classic Straight
**Intent:** clean, readable, mostly orthogonal construction.  
**Construction:** establish skeleton; set family stem weight; build bars and bowls; tune counters; align baseline and cap height without forcing equal widths.  
**Parameters:** stem mass, bar thickness, width class, baseline variation, counter scale.  
**Tests:** A, B, G, M, R, S; words MIND, RISK.

### T2 — Condensed Straight
**Intent:** narrow, vertical rhythm with robust internal openings.  
**Construction:** compress widths glyph-by-glyph; preserve diagonal angles and counter widths; allow wider glyphs where anatomy requires.  
**Parameters:** condensation, minimum counter width, stem mass, tracking, glyph width overrides.  
**Guardrails:** do not scale every glyph horizontally by the same factor; avoid pinhole counters.  
**Tests:** WIDE, MARS, GHOST.

### T3 — Serif / Extended Simple
**Intent:** readable straight construction with authored serifs, bars or restrained terminals.  
**Construction:** build the base glyph first; add serifs as structural terminals; ensure serif direction and mass are consistent; check joins at small size.  
**Parameters:** serif length, serif mass, bracket tension, terminal cut, ornament budget.  
**Guardrails:** serifs must support rhythm and identity, not become unrelated decoration.  
**Tests:** A, E, F, I, T; word KRAFT.

### T4 — Hollow Straight
**Intent:** clear outline-only presentation of a Straight skeleton.  
**Construction:** preserve a stable centreline or front-face contour; offset the outline; resolve corners and counters; keep the fill absent.  
**Parameters:** outline weight, inner offset, corner join, counter clearance.  
**Guardrails:** Hollow is a rendering/presentation mode, not a new letterform grammar.  
**Tests:** A, B, O, R; compare filled and hollow output.

## Word composition
Straight does not mean mechanically aligned. Allow controlled slant, variable width, slight baseline movement and deliberate overlaps. The word should read before any colour or dimensional treatment.

## Failure modes
- GENERIC_SANS — default font-like geometry with no authored character.
- MECHANICAL_GRID — every glyph forced to identical width and alignment.
- COUNTER_PINCH — compression damages negative spaces.
- SERIF_NO_ANCHOR — serifs added without structural logic.
- HOLLOW_TOPOLOGY_ERROR — offset contours self-intersect or close counters.

## Acceptance tests
- Same word rendered in T1–T4; T4 must preserve T1/T2/T3 geometry.
- Compare with Bubble and Blockbuster in monochrome.
- Inspect at full size and thumbnail.
- Test letters with difficult anatomy: B, G, M, R, S, W.

## Evidence and inference
**Source-supported:** Simple Style can include round or angular letters, serifs, slant and overlap while remaining quickly legible; Straight is commonly contrasted with more abstract interlocking forms.  
**NIGHTSHIFT inference:** template families, parameter model and acceptance suite.  
**Open:** boundaries between Straight, Simple, Block and local terms vary.

Sources: SOURCES.md S1, S4, S5, S15.
