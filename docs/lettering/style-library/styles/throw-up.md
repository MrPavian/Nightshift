# Style Card — Throw-up / Bomb Format

**ID:** throw-up | **Version:** 1.0.0  
**Primary axis:** Practice / work format; often paired with Bubble or Simple letterform grammar  
**Maturity:** Draft. Format traits are source-supported; templates and numeric controls are NIGHTSHIFT inference.

## Definition and scope
A Throw-up (also called a flop in some contexts) is a simplified, quickly executed graffiti work format, commonly using a compact name or abbreviation, strong outline and limited fill treatment. It is not a synonym for Bubble lettering: rounded bubble forms are common, but a throw-up can use other simplified letter constructions. Usage varies by place and period.

NIGHTSHIFT models only the visual format. It does not provide instructions for illegal placement or evading detection.

## Format invariants
- Reduced detail and economical internal construction.
- Compact word silhouette.
- Strong outline or hollow presentation is common.
- Fill may be absent, sparse or simple; colour count is often limited.
- Readability and rapid visual recognition are priorities.
- Letterform grammar and rendering remain separately selectable.

## Templates

### T1 — Rounded Throw-up
**Letter grammar:** Bubble-derived, inflated massing.  
**Format:** compact, two- or three-letter abbreviation; strong outer contour; simple fill or hollow interior.  
**Parameters:** inflation, outline weight, counter clearance, glyph overlap, fill complexity.  
**Guardrails:** do not let every glyph become an oval; keep the format compact without crushing counters.  
**Tests:** BZ, KO, MR; then a five-letter fictional name.

### T2 — Straight Throw-up
**Letter grammar:** Simple/Straight or broad block construction.  
**Format:** compact and bold, with fewer curves and a clear outline.  
**Parameters:** stem mass, corner cut, outline weight, word density, counter scale.  
**Guardrails:** distinguish from a large Blockbuster; scale and economy, not just rectangularity, define this format template.  
**Tests:** AX, REX, MIND.

### T3 — Hollow / Outline Throw-up
**Letter grammar:** selectable Bubble or Straight.  
**Format treatment:** unfilled or minimally filled body with a prominent contour.  
**Parameters:** outline weight, inner line offset, counter protection, secondary mark density.  
**Guardrails:** Hollow describes presentation, not a separate underlying letterform grammar. Keep inner and outer contours topologically valid.  
**Tests:** BOMB, GHOST, SQUE.

## Construction sequence for the library
1. Choose a letterform grammar (Bubble or Straight).
2. Build a compact, recognizable word silhouette.
3. Apply format-level simplification.
4. Choose outline/hollow/fill presentation.
5. Inspect counters, joins and spacing in monochrome.
6. Only then test a limited colour treatment.

## Failure modes
- THROWUP_EQUALS_BUBBLE — format collapsed into one letterform family.
- FORMAT_SCALE_DRIFT — template becomes a full developed piece or blockbuster.
- COUNTER_COLLAPSE — compactness closes counters.
- EFFECT_DEPENDENCE — colour/outline hides weak letter construction.
- DETAIL_CREEP — embellishments defeat the simplified format.

## Acceptance tests
- Render the same name in T1 and T2; both should read as throw-up format while having distinct letter grammar.
- Render T1 as filled and hollow; geometry must remain identical.
- Test 2-, 3- and 5-letter names.
- Compare with Bubble card and Blockbuster card.

## Evidence and inference
**Source-supported:** museum and ethnographic accounts describe throw-ups as simplified, economical, often quickly executed formats; outlines, limited fill and bubble-derived forms occur, but terminology is not uniform.  
**NIGHTSHIFT inference:** three templates, parameters and test suite.  
**Open:** regional differences in the use of “throw-up”, “flop”, “outline” and “bomb”.

Sources: SOURCES.md S1, S6, S10, S14.
