# Proof-Sheet and Test-Fixture Infrastructure 01

**Status:** production-oriented specification and fixture manifest; no proof images have been generated or visually approved by this document.  
**Purpose:** define reproducible specimen generation for glyph, pair, word, grammar and calibration reviews.  
**Authority:** preserve the existing review inventory and maturity states in `GLYPH_REVIEW_PACKAGE_A_Z.md`; apply the comparison discipline in `VISUAL_CALIBRATION_AND_COMPARATIVE_EVALUATION_01.md`.

## 1. Deliverable boundary

A proof-sheet run is a reproducible render job over canonical project snapshots. It is not the source of truth for glyph geometry and does not itself grant visual approval.

Canonical semantic/vector project data remains authoritative. Three.js render output, SVG previews, masks, diagnostic overlays and proof images are derived artifacts. Every specimen must resolve to the exact canonical revision and deterministic inputs that produced it.

This document defines the run manifest and fixture inventory. It does not claim the current prototype can generate these sheets.

## 2. Run identity and reproducibility

Each run has:
- stable run ID and schema version;
- source repository revision and canonical project snapshot reference;
- glyph-library, grammar, generator, solver, validator and renderer versions;
- root seed and seed-derivation version;
- fixture ID and specimen IDs;
- resolved operations and parameters (including provenance);
- camera, scale, background, lighting and render-layer profile;
- validation report reference;
- output artifact paths and content hashes;
- generation timestamp as metadata only, never as a seed input.

A rerun with identical canonical input, engine/dependency versions, seed and render profile must reproduce canonical geometry and specimen identity. Pixel-identical output is expected only where the renderer/runtime profile is itself pinned; otherwise record renderer environment and compare canonical geometry separately.

## 3. Proof-sheet families

Use the eight families in the visual-calibration contract:
- parameter sweep;
- topology and negative space;
- grammar comparison;
- pair context;
- word context;
- finish isolation;
- thumbnail resilience;
- boundary regression.

A family may produce multiple pages. Never squeeze unrelated scales or contexts into one misleading normalized comparison.

## 4. Standard panel profiles

### Neutral construction profile
- plain silhouette on neutral light background;
- fixed camera and normalized glyph framing;
- no palette, texture, outline, inline, highlight or depth effects;
- full-size and thumbnail output;
- same scale for direct comparison, plus separately labelled normalized view when needed.

### Semantic diagnostic profile
- stable component IDs and roles;
- contour and segment identity;
- anchors and direction vectors;
- counter, aperture and channel masks shown distinctly;
- junction/relationship graph;
- measured clearances and geometry diagnostics.

### Finish profile
- fill + outline;
- fill + outline + inline + highlight;
- depth;
- dark/textured surface.
Canonical geometry must remain identical across finish-only specimens. Finish changes do not count as structural diversity.

### Context profile
- pair specimens with fixed neighbor, spacing and transform controls;
- word specimens with fixed input, baseline and layout conditions;
- relationship type and accepted/rejected solver outcome shown separately;
- partial maturity coverage explicitly labelled.

## 5. Fixture inventory

Use the exact synthetic test inventory from `GLYPH_REVIEW_PACKAGE_A_Z.md`:
- Pairs: AV, AR, BA, BR, GO, GR, RA, RO, SA, SB, GS, NS.
- Words: ABRA, BOMB, GHOST, KRAZE, MIND, NYX, RISK, SQUE.

These are engineering fixtures, not historical crew names or claims. Several letters remain provisional. A fixture containing provisional glyphs must report partial coverage and cannot certify the whole word or grammar as production-ready.

The initial authored-contour set is A/B/G/R/S. Keep this maturity baseline unchanged unless implementation and review evidence supports a transition.

## 6. Fixture execution matrix

For each applicable fixture, run:
1. neutral baseline;
2. controlled overlap where relevant;
3. slant where relevant;
4. each grammar that actually claims compatibility;
5. full-size and thumbnail;
6. geometry and topology diagnostics;
7. save/reload and deterministic replay where persistence exists.

Do not force a relationship into a pair. Open separation is a valid outcome. Candidate anchors, accepted relationships, overlap and collision are separate result fields.

For grammar comparisons, hold rendering constant. A grammar comparison passes only when structural or compositional behavior changes intentionally; palette, outline, slant or decoration alone are insufficient.

## 7. Blind-review support

The run manifest may assign reviewer-facing specimen aliases distinct from internal specimen IDs. Keep the alias mapping in a restricted review mapping file so reviewers do not see parameter values or candidate ranking during blind comparison.

The review artifact records:
- reviewer-facing specimen IDs;
- rubric criterion and 0–3 score;
- comparative choice (A/B/tie/neither/cannot-judge);
- rationale and defect references;
- reviewer identity/role and date;
- confidence only if explicitly collected.

Preserve raw ratings. Do not auto-average away critical failures or reviewer disagreement.

## 8. Artifact and storage layout

Recommended logical layout (implementation may map this to repository artifacts, object storage or CI artifacts):
- `runs/<run-id>/manifest.json`
- `runs/<run-id>/specimens/<specimen-id>/canonical-snapshot.json`
- `runs/<run-id>/specimens/<specimen-id>/validation.json`
- `runs/<run-id>/plates/<plate-id>.png`
- `runs/<run-id>/plates/<plate-id>.svg` (when vector output is part of the test)
- `runs/<run-id>/review/ratings.json`
- `runs/<run-id>/review/blind-map.json` (restricted)
- `runs/<run-id>/checksums.json`

Do not commit large generated image batches by default. Keep fixture definitions, manifests, small curated review artifacts and CI summaries in Git; store bulky render outputs as build artifacts with durable references and hashes.

## 9. Release and maturity gates

- Geometry tests may pass while visual review remains pending.
- A proof sheet generated successfully is not a reviewed proof sheet.
- A glyph maturity transition requires the existing stage-specific evidence and explicit reviewer decision.
- Any required identity/topology score 0 triggers defect review.
- Provisional glyphs remain provisional in mixed-word reports.
- Production approval requires required glyph, pair, word, rendering and persistence evidence; no single sheet substitutes for the full gate.

## 10. Acceptance criteria

1. Every run has a versioned, immutable manifest.
2. Every specimen resolves to a canonical snapshot and deterministic inputs.
3. All eight proof-sheet families are addressable by stable IDs.
4. The exact existing pair and word fixtures are represented.
5. Provisional coverage is visible and cannot silently certify a whole fixture.
6. Neutral, semantic, finish and context profiles are independently reproducible.
7. Finish-only comparisons prove canonical geometry is unchanged.
8. Blind-review aliases do not replace canonical specimen IDs.
9. Validation reports and proof artifacts are linked by stable IDs and hashes.
10. Visual approval and maturity transitions require explicit human decisions.
11. Large generated batches are stored as artifacts, not indiscriminately committed.
12. Generated output is never represented as reviewed until reviewers have actually inspected it.

## 11. Implementation order

**A — Manifest and fixture loader:** parse run contract and resolve stable fixture IDs.

**B — Canonical specimen exporter:** snapshot project state and all resolved operation/seed metadata.

**C — Neutral and diagnostic plates:** render silhouette, semantic overlays and negative-space masks.

**D — Context plates:** render pair and word fixture matrices with partial-maturity labels.

**E — Finish and thumbnail plates:** verify render-only changes do not mutate canonical geometry.

**F — Review capture and calibration integration:** blind aliases, ratings, defect links and calibration records.

Do not build a decorative contact-sheet generator before canonical snapshot identity, deterministic replay and validation reports are reliable.
