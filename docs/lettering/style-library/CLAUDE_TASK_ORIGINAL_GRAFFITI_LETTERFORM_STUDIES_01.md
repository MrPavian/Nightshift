# Claude Task — Original Graffiti Letterform Studies 01

**Priority:** after / alongside review of PR #25  
**Research basis:** `GRAFFITI_LETTERFORM_GRAMMAR_RESEARCH_01.md`, `GRAFFITI_VISUAL_REFERENCE_INDEX_01.md`  
**Goal:** prove that NIGHTSHIFT can design recognisable, original graffiti letterforms before writing another procedural style filter.

## Non-negotiable premise

The current neutral masters are not the target alphabet. Do not start by applying chamfer, inflate, widen, skew, extrude or decorate to the existing masters. Those operations may later be useful as local tools, but they are not a style grammar.

Do not copy any artist's tag, exact word, signature, identifiable piece, or distinctive composition from the reference sources. Study shared structural principles and create original forms.

## Scope

Create original, monochrome, front-face studies for four target directions:

1. Bubble / Softie
2. Simple / Straight (graffiti lettering, not generic typography)
3. Blockbuster / Block (purpose-built block grammar and scale context)
4. Throw-up (practice/format logic; include both rounded and block-derived letter hypotheses)

Wildstyle and Semi-Wildstyle are analysis-only in this slice. Do not fake interlocking before C04 relationship solving exists. Tag/Handstyle is excluded because it requires stroke/gesture modelling.

## Required design work

For each target direction:
- Create at least **two distinct construction hypotheses** (A and B), not just two parameter values.
- Each hypothesis must state its letter skeleton logic, mass logic, counter logic, terminals, characteristic asymmetry, width/height rhythm and word-composition logic.
- State what makes it recognisably different from neutral display lettering.
- Include positive and negative design criteria.
- Annotate how the design was informed by the cited reference corpus; do not attribute invented features to a named artist.
- Identify glyph-specific exceptions; no single global transform should be able to explain the whole alphabet.

### Minimum glyph and word fixtures

- Bubble: A B C G O R S U; BUBBLE, GHOST, SOUL.
- Simple/Straight: A E G K M R S; ABRA, KRAFT, MIND.
- Blockbuster: A E H M R; POWER, TRAIN, KRAFT.
- Throw-up: B O M R S; BOMB, GHOST, RISK.

Every word must use the same authored word spelling across the alternatives. Use monochrome silhouettes first. Keep fill, outline, shadow, 3D, chrome, highlights, drips and backgrounds disabled.

## Deliverables

Create a versioned study directory:
`docs/reports/design/graffiti-letterforms/study-01/`

Include:
- `README.md` — purpose, scope, limitations, reproduction instructions.
- `design-hypotheses.md` — two distinct construction hypotheses per style, with explicit differences.
- `reference-annotations.md` — source IDs from the visual reference index, observed features, confidence and what must not be copied.
- `plates/letter-anatomy.svg` — glyph comparisons in a consistent grid.
- `plates/word-composition.svg` — word comparisons at consistent viewing scale.
- `review/review-template.json` — one rating per style/hypothesis, including pass, needs-revision, fail, neither, cannot-judge and notes.
- `manifest.json` — source revision, study version, glyph/word fixtures, hypothesis IDs, render settings and artifact hashes.

SVG is acceptable for this first study. It must be original authored geometry, not a screenshot of a generator or a traced photo.

## Evaluation gates

A study is not successful merely because it looks more complex.

Review every hypothesis against:
1. Immediate graffiti-style recognition.
2. Strong, distinctive silhouette.
3. Internal consistency across glyphs.
4. Glyph-specific construction (not one global effect).
5. Word rhythm and spacing.
6. Readability appropriate to its category.
7. Counter and aperture integrity.
8. Difference from the existing neutral masters.
9. Originality: no copied artist-specific signature or piece.

Mark any uncertain claim or weak specimen explicitly. Do not pick a winner automatically.

## Technical boundaries

- Do not alter canonical glyph masters.
- Do not modify the production resolver or style contract in this study.
- Do not label any hypothesis `generator-ready`.
- Do not infer approval from SVG generation.
- Keep geometry checks and visual review separate.
- If a fixture is unsupported, report it; do not silently omit it.

## Handover

Open a focused draft PR. Report the exact files, how each shape was authored, what was learned from each reference, unresolved design problems, and exact commands/results for any checks actually run. Do not claim visual approval.
