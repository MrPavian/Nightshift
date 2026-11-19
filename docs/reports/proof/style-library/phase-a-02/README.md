# Style Library — Phase A-02: Bubble and Bounce safety

Run: `run.style-library-phase-a-02.312d68901550`
Brief: [CLAUDE_TASK_C03_BUBBLE_BOUNCE_GATES_01](../../../../lettering/style-library/CLAUDE_TASK_C03_BUBBLE_BOUNCE_GATES_01.md) · Issue #24

Before/after proof for the Bubble counter-safety gate and the Bounce collision check. **Automated evidence only. Maturity: rendered, measured-uncalibrated, owner-review-required.** Phase A-01 stays frozen next to this run.

## Bubble: inflation distance and smallest counter (relative to the neutral master)

| Glyph | inflation | area ratio | opening ratio |
|---|---|---|---|
| A | 9 → 5 | 0.164 → 0.415 | 0.407 → 0.663 |
| B | 9 → 5 | 0.172 → 0.441 | 0.356 → 0.642 |
| G | 9 → 9 | — → — | — → — |
| R | 9 → 5 | 0.203 → 0.465 | 0.419 → 0.676 |
| S | 9 → 9 | — → — | — → — |

## Bounce: contact class of adjacent letters

| Fixture | before (preferred placement) | after | after result |
|---|---|---|---|
| AR | intersection | safe | moved-to-safe |
| BA | intersection | safe | moved-to-safe |
| BR | intersection | safe | moved-to-safe |
| GR | intersection | safe | moved-to-safe |
| RA | intersection | safe | moved-to-safe |
| SA | intersection | safe | moved-to-safe |
| SB | intersection | safe | moved-to-safe |
| GS | intersection | safe | moved-to-safe |
| ABRA | intersection, intersection, intersection | safe, safe, safe | moved-to-safe, moved-to-safe, moved-to-safe |

## Files

- `plates/glyph-before-after.svg`, `plates/pairs-before-after.svg`, `plates/word-before-after.svg`
- `report/negative-space.json`: per glyph, before and after: operations with every candidate and its reason codes, counter area/opening/wall clearance, aperture status
- `report/placement.json`: per pair and word: placement, contact class, clearance and error bound, fallback, authorisation
- `manifest.json`, `checksums.json`

## Limitations

- Floors are provisional, reject-only and uncalibrated.
- Mixed inflation distances make words uneven in mass.
- Aperture throat width is not evaluable; no channels or relationships are declared.
- Bounce now avoids contact; real letter connections need C04.

## Reproduce

```bash
node tools/proof-style-plates.mjs          # writes phase-a-02, verifies phase-a-01 checksums
node tools/proof-style-plates.mjs --check
```
