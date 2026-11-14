# Procedural Variant Generator Core 01 — Candidate Search, Diversity and Quality

**Status:** engineering design specification; not implemented.  
**Purpose:** define how NIGHTSHIFT produces four reproducible, structurally distinct lettering concepts without relying on uncontrolled randomness or cosmetic variation.  
**Dependencies:** A–Z grammar application matrix, glyph parameter contract, geometry validator, relationship solver, creative workflow and Personal Style Engine.

## 1. Generator principles

The generator is a constrained candidate-search system, not a random distortion filter.

It must:
- preserve glyph identity and topology;
- use only registered operations and authored variants;
- respect grammar compatibility and recipe locks;
- generate exactly four concepts per request;
- make the four concepts meaningfully different in construction and/or composition;
- reproduce results from recorded inputs, engine versions and seeds;
- expose why a candidate was accepted, rejected or ranked;
- never sacrifice hard validity merely to increase diversity.

No numerical weights, thresholds or parameter bounds are invented here. They must be calibrated against authored geometry and reviewed fixtures.

## 2. Inputs and immutable generation request

A generation request snapshots:
- normalized source text and glyph sequence;
- grammar-axis selections and versions;
- active style recipe ID/version and resolved snapshot, if any;
- per-glyph variant availability and maturity;
- project constraints, canvas/surface context and composition bounds;
- user locks and explicit overrides;
- generator, schema, glyph-library, grammar and solver versions;
- root seed and generation-policy version.

Changing any input creates a new request fingerprint. A previous request remains reproducible and immutable.

## 3. Candidate representation

A candidate is a canonical project branch, not a rendered bitmap. Its record includes:
- candidate ID and parent request ID;
- deterministic candidate seed and named random-stream states;
- selected glyph variants and registered operation IDs;
- resolved parameter values and provenance (base grammar, recipe, project, instance);
- per-glyph semantic/vector revisions;
- word transforms and layout;
- relationship graph and solver reports;
- hard validation results and soft diagnostic vector;
- structural feature signature for diversity comparison;
- renderer/proof metadata.

Meshes, SVG, textures and thumbnails are derived artifacts and do not define candidate identity.

## 4. Deterministic random streams

Use a specified, versioned seeded PRNG implementation. Do not use ambient `Math.random()`, wall-clock time, platform-dependent iteration order or unrecorded entropy.

Derive independent named streams from the root seed and stable labels:
- `variant-selection`
- `glyph-parameter-choice`
- `word-layout`
- `relationship-candidates`
- `controlled-asymmetry`
- `candidate-retry`

This prevents a change in one subsystem from shifting every other random choice. Each stream is keyed by request fingerprint, candidate slot, subsystem label and stream-version.

The four concept slots receive deterministic candidate seeds derived from the root seed and slot ID. Candidate retries use a deterministic retry counter. Persist the PRNG algorithm/version and seed derivation scheme.

A seed guarantees repeatability only within the recorded engine and dependency versions. Cross-version migrations must be explicit and may not claim byte-identical geometry unless verified.

## 5. Candidate generation pipeline

### Stage 0 — Preflight
- Validate input text and glyph coverage.
- Resolve all grammar axes, recipes, locks and compatibility.
- Check glyph maturity and available authored variants.
- Report unsupported/provisional letters before expensive generation.
- Select an explicit fallback policy: neutral fallback, unchanged glyph or experimental preview.

### Stage 1 — Build glyph construction plans
For each character:
- resolve its stable glyph ID and current/master variant;
- retrieve the A–Z grammar application rules;
- select only compatible authored variants and registered operations;
- calculate dependencies and affected validation classes;
- preserve hard identity/topology invariants.

No geometry is mutated at this stage. The output is an inspectable operation plan.

### Stage 2 — Instantiate candidate glyphs
- Apply registered operations to a candidate canonical model.
- Use calibrated parameter domains and declared interpolation only.
- Resolve glyph-specific variation rather than applying one global transform.
- Recompute metrics and anchors where declared.
- Validate each glyph atomically.

A failed glyph operation rejects that operation or candidate according to its declared failure policy; it must never leave partially mutated canonical state.

### Stage 3 — Word layout
- Generate a small set of layout strategies from the selected composition grammar.
- Vary spacing, advance, baseline rhythm, scale rhythm and slant only within declared domains.
- Do not use layout transforms to disguise weak glyph construction.
- Preserve user locks and per-glyph overrides.

### Stage 4 — Relationship solving
- Generate pair candidates from actual anchors.
- Include deliberate open separation as a first-class candidate.
- Apply only relationship types available in the current rollout phase.
- Validate local pairs and then the whole word.
- Persist rejected alternatives and reason codes for explainability.

### Stage 5 — Canonical validation
Run glyph geometry/topology validation, anchor validation, pair checks, whole-word checks and surface-fit constraints. Hard failures disqualify the candidate. Soft diagnostics remain separate dimensions.

### Stage 6 — Feature extraction
Compute a versioned structural feature signature from canonical data, including:
- glyph variant and operation distribution;
- normalized glyph proportions and mass profiles;
- word width/height and rhythm descriptors;
- spacing and baseline pattern;
- relationship-type distribution and graph topology;
- negative-space and overlap descriptors;
- composition density and silhouette descriptors.

Do not use palette, texture, lighting or camera framing as primary diversity features.

### Stage 7 — Rank and select four
Use hard validity as a gate, then multi-objective quality and diversity selection. Return exactly four concepts or a transparent generation failure; never pad with cosmetic duplicates.

## 6. Quality model: a vector, not a magic score

Keep the following dimensions separate:
1. **Identity and legibility:** intended characters remain recognizable at relevant scales.
2. **Topology and geometry:** counters, apertures, channels, joins and contours are valid.
3. **Grammar coherence:** operations follow the selected grammar and recipe constraints.
4. **Composition:** word rhythm, silhouette, spacing and relationship logic are intentional.
5. **Negative-space quality:** counters and inter-letter channels remain distinct and balanced.
6. **Structural originality:** candidate is not a near-duplicate of its siblings or source master.
7. **Surface fit:** composition respects selected canvas/context without distortion.
8. **Review maturity:** authored/provisional status is visible; unreviewed geometry is not falsely certified.

Hard validity dimensions are pass/fail gates. Soft dimensions are reported as a vector with evidence and diagnostics. Do not collapse all dimensions into one opaque score. If a UI needs sorting, expose the selected sorting preference and retain the underlying vector.

No candidate can compensate for a hard topology failure with a high aesthetic score.

## 7. Four-way diversity selection

D-006 requires exactly four concepts. The four should represent distinct, defensible design directions rather than random noise.

Use a deterministic selection strategy:
1. Generate a bounded candidate pool using the request's policy.
2. Remove candidates that fail hard validation or compatibility.
3. Deduplicate canonical-equivalent candidates.
4. Compute pairwise structural distance from versioned feature signatures.
5. Select a four-item set that balances quality and mutual diversity.
6. Apply deterministic tie-breaking by candidate ID.

Diversity dimensions may include:
- different compatible glyph variant choices;
- different mass/width distribution;
- different word rhythm and layout strategy;
- different relationship graph topology;
- different composition density and negative-space pattern.

A palette-only or effect-only difference has zero structural-diversity credit. Small coordinate noise is not a meaningful difference. If the pool cannot provide four candidates meeting minimum diversity and quality gates, return a clear failure report with the best available candidates marked incomplete; do not invent a fourth.

Diversity thresholds and feature weights must be calibrated with a reviewed human-labelled corpus. Until calibrated, expose raw descriptors and avoid claiming that a mathematical distance equals visual quality.

## 8. Candidate pool and search budget

The candidate pool size and retry budget are versioned policy settings, not hidden constants. The engine should stop when:
- four candidates pass hard validation and pairwise diversity criteria;
- the configured search budget is exhausted;
- no further distinct candidates can be produced from available authored variants.

Record total attempts, rejection counts by diagnostic code, deduplication count, pool policy and stop reason. Do not silently relax hard constraints or diversity thresholds to force four results.

## 9. Controlled variation policy

Variation sources are explicit and grammar-aware:
- choose among compatible authored variants;
- choose calibrated parameter values within declared domains;
- vary per-letter mass/width/terminal choices under recipe tendencies;
- vary word layout and relationship graph;
- use controlled asymmetry where supported by a registered operation.

Respect style recipe invariants, locks and exceptions. A variation budget may affect soft tendencies only. It cannot unlock topology changes, exceed calibrated ranges or bypass maturity gates.

## 10. Failure handling and explainability

Every rejected candidate or operation records:
- stable diagnostic code;
- affected glyph/component/anchor/relationship IDs;
- failed stage;
- measured value and threshold where applicable;
- hard/soft classification;
- recovery options where safe.

Common outcomes include:
- insufficient authored glyph coverage;
- no compatible variant for one or more glyphs;
- uncalibrated parameter domain;
- topology/identity failure;
- invalid relationship or whole-word collision;
- candidate pool exhausted;
- four-way structural diversity not achieved.

The UI should explain whether the limitation comes from missing authored content, incompatible grammar, hard geometry constraints or search exhaustion.

## 11. Reproducibility and persistence

Persist:
- normalized input and request fingerprint;
- all relevant engine/schema/library/grammar/solver versions;
- root seed and seed derivation version;
- candidate slot seeds and random stream versions;
- resolved operation IDs and parameter values;
- candidate pool/search policy and attempt count;
- accepted/rejected candidate IDs and reason codes;
- selected four candidates and their structural signatures;
- canonical geometry and relationship graph snapshots.

Do not rely on a seed alone when external assets or changing registries can affect generation. Snapshot the resolved inputs.

## 12. Acceptance tests

1. Same request fingerprint, versions and root seed reproduce the same canonical candidate set.
2. Named random streams remain isolated: adding a draw in one stream does not change another stream's output.
3. Every applied operation exists in the relevant registry.
4. No uncalibrated production parameter is silently randomized.
5. Every candidate passes hard glyph and whole-word validation.
6. Candidate rejection leaves canonical source project unchanged.
7. Exactly four concepts are returned only when four pass the declared quality/diversity gates.
8. Four concepts differ structurally; finish-only and micro-noise differences fail.
9. Pairwise structural signatures and descriptors are inspectable.
10. Hard validity and soft quality dimensions remain separate.
11. Search exhaustion is reported honestly; thresholds are not silently relaxed.
12. Style recipe locks, overrides and invariants survive generation.
13. Candidate seeds and resolved parameters reproduce the same result under recorded versions.
14. Provisional glyph maturity is visible and cannot be promoted by generation.
15. Rejected alternatives and diagnostic reasons are persisted for explainability.

## 13. Implementation sequence

**Slice A — Deterministic request and seed service:** immutable request fingerprint, versioned PRNG, named streams and reproducibility tests.

**Slice B — Candidate operation planner:** glyph-specific plans from the A–Z matrix; no geometry mutation until plan review passes.

**Slice C — Validated candidate builder:** registered operations and glyph-level atomic validation, initially A/B/G/R/S only.

**Slice D — Word candidate builder:** layout and Phase-1 relationship candidates, whole-word validation.

**Slice E — Diversity and selection:** feature signatures, duplicate detection, four-way selection, honest exhaustion report.

**Slice F — Quality diagnostics and proof harness:** multi-dimensional reports, deterministic proof sheets, human review capture.

Do not implement advanced learning, unbounded mutation or opaque AI scoring in the first generator core.
