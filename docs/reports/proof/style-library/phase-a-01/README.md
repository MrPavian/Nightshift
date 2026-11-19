# Style Library — Phase A proof run

Run: `run.style-library-phase-a-01.a61ed113ba4c`
Brief: [CLAUDE_TASK_PHASE_A_PROOF_PLATES_01](../../../../lettering/style-library/CLAUDE_TASK_PHASE_A_PROOF_PLATES_01.md)

Neutral, monochrome comparison of the style grammars that the C03 resolver implements today. **This is an automated proof, not an approval. Human review is pending.**

## Plates

| File | Content |
|---|---|
| `plates/glyph-comparison.svg` | A/B/G/R/S × Neutral, Straight, Bubble, Blockbuster, one uniform scale |
| `plates/thumbnails.svg` | the same grid at 0.18 × |
| `plates/pair-context.svg` | pair fixtures whose letters are all in A/B/G/R/S |
| `plates/word-context.svg` | ABRA first; the other word fixtures contain C02 masters |
| `report/operations.json` | per glyph and style: resolver status, every operation with reason and parameters, geometry hash, validation |
| `manifest.json`, `checksums.json` | inputs, versions, specimens, artifact hashes |
| `review/review-template.json` | blank review records; `review/ratings.json` is human-owned and never overwritten |

## Resolver status per style (all glyphs in this run)

| Style | applied | unchanged | partial | fallback |
|---|---:|---:|---:|---:|
| neutral | 0 | 19 | 0 | 0 |
| straight | 9 | 10 | 0 | 0 |
| bubble | 19 | 0 | 0 | 0 |
| blockbuster | 19 | 0 | 0 | 0 |
| wildstyle | 0 | 0 | 19 | 0 |

## Measured: counter area relative to Neutral

The resolver only checks that the *number* of counters stays the same. Their size is measured here, not gated (1 = same area as the neutral master; glyphs without an enclosed counter are left out).

| Glyph | straight | bubble | blockbuster |
|---|---:|---:|---:|
| A | 1 | 0.16 | 0.44 |
| B | 1.02 | 0.19 | 0.46 |
| D | 1.02 | 0.39 | 0.61 |
| O | 1 | 0.44 | 0.63 |
| Q | 1 | 0.44 | 0.56 |
| R | 1.02 | 0.2 | 0.47 |

Wildstyle is *partial* on purpose: its interlocking step is skipped because the relationship solver (C04) is missing. It is recorded in the report but not drawn.

## Rendering rules

Solid black front-face silhouettes on a plain light background; counters are real holes. No outline, inline, depth, highlights, chrome, texture, drips, gradient or marks. All styles share one scale per plate, so authored proportions are kept.

## Limitations

- Only Neutral, Straight, Bubble and Blockbuster (= Straight letterform + Block-fit composition) exist in the resolver. Parameters are uncalibrated.
- No joins or relationship solving; pairs and words use a fixed gap (Bubble: bounce placement).
- All 26 uppercase glyphs are authored-contour masters since C02. The fixture contract still labels some fixtures "partial-provisional-coverage"; the manifest records those labels next to the current maturity.
- The Creator graffiti engine (D-017) uses separate skeletons and is not part of this run.
- Review decisions: pass / fail / needs-revision / unsure / cannot-assess; rubric scores also allow cannot-judge. Pairwise tie / neither comes with the calibration slice.

## Reproduce

```bash
npm ci
node tools/proof-style-plates.mjs          # writes this directory
node tools/proof-style-plates.mjs --check  # fails if anything here is stale
```
