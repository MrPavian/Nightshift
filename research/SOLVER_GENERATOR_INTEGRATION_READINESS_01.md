# NIGHTSHIFT Relationship Solver and Generator — Integration Readiness 01

**Status:** Dependency and implementation-readiness specification; not implementation.  
**Purpose:** Align glyph construction, relationship solving and four-concept generation into one safe vertical slice.

## 1. Dependency truth

The generator cannot safely create meaningful word concepts until:
- canonical glyph instances and variants resolve by stable IDs;
- editable vector geometry and topology validation are reliable;
- metrics and anchors are measured/validated;
- pair relationships are explicit graph records;
- whole-word geometry is validated after local edits;
- generation inputs, versions and seeds are reproducible.

A menu that displays four previews is not proof of a functioning generator.

## 2. Relationship rollout gates

### Phase 1 — Safe adjacency
Allowed:
- open separation;
- near-touch;
- terminal-to-terminal only where both anchors declare compatible roles and directions.

Required:
- stable anchor IDs and validity envelopes;
- candidate generation deterministic from stable instance/anchor/type/solver version;
- local pair validation;
- counter/aperture protection;
- channel diagnostics;
- open separation retained as a valid outcome.

### Phase 2 — Controlled overlap
Add only after Phase 1 passes:
- bar continuation;
- overlap with explicit occlusion order;
- extension bridge with an explicit semantic extension component.

Required:
- local and non-adjacent collision checks;
- whole-word negative-space validation;
- no hidden mutation of glyph masters;
- explicit relationship graph edge and reversible transform patch.

### Phase 3 — Advanced weaving
Add only after topology and human review:
- shared strokes;
- interlock.

Required:
- shared component graph;
- planar topology and crossing validation;
- occlusion/crossing order;
- counter/aperture/channel protection;
- experimental grammar gate and proof review.

No Phase 3 relationship should be used to make an invalid Phase 1 or Phase 2 result appear connected.

## 3. Minimal generator vertical slice

### Inputs
- one normalized word;
- canonical glyph IDs and current variant IDs;
- maturity and compatibility status;
- grammar-axis selections;
- project locks and overrides;
- optional recipe snapshot;
- canvas/surface constraints;
- root seed and versioned generator dependencies.

### Pipeline
1. Preflight every glyph; report unsupported/provisional capability.
2. Resolve glyph-specific operation plan without mutation.
3. Instantiate a candidate canonical branch using only registered, calibrated operations.
4. Create layout candidates without distorting protected identity.
5. Generate safe Phase 1 pair relationship candidates from real anchors.
6. Validate each pair and then the entire word.
7. Extract structural feature signatures from canonical geometry and relationship graph.
8. Rank by hard gates first, then separate quality dimensions.
9. Select structurally distinct concepts; do not count finish/camera/noise as diversity.
10. Persist full canonical snapshots, operation provenance, diagnostics, seeds and engine versions.

### Output
Each concept is an immutable, editable canonical branch with:
- stable concept/project ID;
- glyph/variant revisions;
- layout transforms;
- relationship graph;
- resolved operation plan and provenance;
- hard validation results;
- quality vector and warnings;
- deterministic seed and engine version;
- proof manifest reference.

## 4. Four-concept contract

The established product target is exactly four concepts when four candidates satisfy declared validity and meaningful-diversity gates.

If fewer than four pass:
- return a transparent generation failure/partial result;
- include best valid candidates and rejection diagnostics;
- do not relax topology, identity or geometry gates;
- do not pad with palette, texture, lighting or micro-coordinate variants.

Candidate difference must be measured from structural signatures: glyph variant/parameters, component geometry, layout rhythm, relationship graph, negative-space topology and composition silhouette. Finish is excluded.

## 5. Generator quality and explainability

Keep separate dimensions:
- identity/legibility;
- topology/geometry;
- grammar coherence;
- composition;
- negative-space quality;
- structural originality;
- surface fit;
- review maturity.

Hard failures are gates, not weighted penalties. Soft preferences remain visible as a vector. Do not invent production weights or thresholds before a reviewed comparison corpus exists.

Persist rejected candidate reason codes and resolved inputs so the generator can explain why a candidate was not selected.

## 6. Determinism

Use the established six isolated PRNG streams:
- variant-selection;
- glyph-parameter-choice;
- word-layout;
- relationship-candidates;
- controlled-asymmetry;
- candidate-retry.

Do not use ambient randomness, timestamps or unstable iteration order. Same request fingerprint, root seed, stream version and engine versions must reproduce the same canonical candidates.

## 7. Required regression fixtures

Retain canonical pairs:
AV, AR, BA, BR, GO, GR, RA, RO, SA, SB, GS, NS.

Retain canonical words:
ABRA, BOMB, GHOST, KRAZE, MIND, NYX, RISK, SQUE.

Mixed fixtures remain partial while any participating glyph is provisional. Add targeted fixtures for:
- intentional open separation;
- near-touch without false merge;
- valid/invalid terminal direction;
- G aperture preservation;
- counter occlusion rejection;
- overlap order;
- non-adjacent collision;
- local edit invalidation;
- stale revision rejection;
- deterministic replay;
- structural near-duplicate rejection;
- fewer-than-four valid candidates.

## 8. Claude implementation sequence

1. Canonical glyph import and validator (0.7A).
2. Metrics/anchor resolution and proof outputs.
3. Relationship Phase 1.
4. Relationship Phase 2 only after Phase 1 review.
5. Generator preflight and deterministic seed service.
6. Glyph-specific candidate planner and canonical branch builder.
7. Word layout and safe relationship integration.
8. Structural feature extraction and four-way selection.
9. Proof/review/calibration integration.
10. Phase 3 relationships only after explicit gates.

## 9. Acceptance

- No relationship bypasses glyph/whole-word validation.
- Open separation is first-class.
- Candidate IDs are deterministic and stable.
- Local edits invalidate only dependent relationships but always trigger required whole-word checks.
- Rejected commands/candidates leave canonical state unchanged.
- Four concepts are structurally distinct or generation reports why not.
- Finish/camera variation never counts as structure.
- Partial glyph maturity remains visible in every result.
- Every result can be regenerated from persisted inputs and versions.
