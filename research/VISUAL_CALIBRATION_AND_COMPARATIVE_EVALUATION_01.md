# Visual Calibration and Comparative Evaluation 01

**Status:** design and evaluation specification; not implementation or evidence of reviewed glyph quality.  
**Purpose:** turn visual review into a repeatable calibration process for generator parameters, structural diversity and quality diagnostics.  
**Depends on:** `GLYPH_VISUAL_REVIEW_PROTOCOL_01.md`, `GLYPH_REVIEW_PACKAGE_A_Z.md`, `PROCEDURAL_VARIANT_GENERATOR_CORE_01.md`, `GLYPH_PARAMETER_DEPENDENCY_CONTRACT_01.md`, `GLYPH_GEOMETRY_VALIDATION_CONTRACT_01.md`.

## 1. Why calibration is a separate activity

The existing review protocol defines what to inspect and how to record a human review. This document defines how to use repeated, controlled comparisons to calibrate generator parameters and evaluation thresholds.

Do not derive production values from intuition, a single attractive sample, or a numeric average across unrelated criteria. Every calibrated value must point to a versioned evidence set and a documented decision.

This process evaluates NIGHTSHIFT's authored constructions. It does not establish historical authenticity or universal graffiti rules.

## 2. Calibration units

Calibrate at the narrowest defensible scope:
- glyph + variant + parameter;
- glyph + variant + protected feature (counter, aperture, channel, junction);
- grammar + operation family;
- glyph pair + relationship type;
- test word + composition context;
- surface/context where the measurement genuinely depends on it.

Do not transfer a threshold from one letter to the whole alphabet without evidence. A clearance value for an A counter does not automatically apply to an S neck or a G aperture.

## 3. Controlled comparison protocol

Each experiment changes one declared factor or one pre-registered interaction set.

A comparison batch must:
1. Freeze source glyph/project revision, engine build, grammar and renderer versions.
2. Freeze camera, scale, background, lighting and render-layer settings.
3. Include a neutral baseline and a set of controlled parameter levels or authored variants.
4. Change only the declared parameter(s); keep all other resolved values constant.
5. Render silhouette-only plates before effect/render plates.
6. Include isolated glyph, pair and word contexts where the parameter can affect composition.
7. Randomize presentation order for human reviewers without changing specimen IDs in the underlying record.
8. Include repeated baseline specimens to detect inconsistent rating.
9. Record all seeds, operations, values, dimensions and proof artifact hashes.

Use paired A/B comparisons when asking which of two candidates better preserves identity, improves rhythm or creates a clearer construction. Use absolute 0–3 rubric scores from the existing review protocol for gate decisions. Do not combine the two methods into one untraceable score.

## 4. Parameter sweep design

For a parameter with a calibrated domain:
- begin with the authored master and conservative candidate levels;
- choose levels from measured geometry and registered bounds, not arbitrary pixel values;
- include boundary-adjacent samples only when geometry validation can safely evaluate them;
- test interactions only after the individual parameter behavior is understood;
- preserve the exact operation sequence and resolved values.

For coupled parameters (e.g. bowl width and counter clearance), use a small factorial or staged one-factor-at-a-time design with explicit interaction follow-up. Do not assume independence when the dependency contract says one parameter invalidates another.

Topology-changing choices are not numeric sweeps. Compare separately authored, named variants with explicit topology declarations.

## 5. Human evaluation procedure

Use the existing 0–3 rubric in `GLYPH_VISUAL_REVIEW_PROTOCOL_01.md`; retain its dimensions and critical failure rules. Add the following comparative prompts as separate observations:
- Which specimen reads more clearly as the intended letter at thumbnail size?
- Which silhouette has more intentional mass distribution?
- Which preserves the relevant counter/aperture/channel more robustly?
- Which construction better expresses the selected grammar without relying on rendering effects?
- Which pair/word arrangement has better rhythm while preserving identity?
- Is the difference meaningful, or merely coordinate noise/cosmetic finish?

Reviewers must be allowed to choose **tie**, **neither**, or **cannot judge**. Do not force a winner.

For each rating, store reviewer role/ID, date, specimen IDs, prompt, choice, confidence (if collected), rationale and defect references. Do not treat one reviewer's preference as objective truth.

## 6. Reviewer disagreement and evidence sufficiency

- Preserve individual ratings; never overwrite them with an average.
- Report agreement and disagreement by criterion and specimen set.
- A disagreement is a signal for further inspection, not an invitation to hide outliers.
- If identity or topology receives a 0 from any reviewer, route the specimen to explicit defect review; do not auto-approve by majority.
- If reviewers disagree materially on style construction or composition, retain the result as contested/needs-review and gather another controlled comparison.
- Define minimum reviewer counts per release gate in project policy; do not invent a universal sample size in this specification.
- Record reviewer experience/context where voluntarily supplied and relevant; do not infer expertise from a score.

## 7. Turning review into calibrated parameter bounds

A parameter's calibrated status requires:
1. A defined semantic meaning and owning subsystem.
2. A registered operation and dependency list.
3. A controlled sweep with stable source and renderer.
4. Automated geometry/topology measurements across tested values.
5. Human review in required isolated/pair/word contexts.
6. A documented acceptable interval and known failure boundaries.
7. A calibration record with evidence artifact references, reviewers, engine versions and date.
8. A regression fixture at accepted boundaries and immediately outside them.

Bounds must be conservative. If the evidence supports only a subset of the tested interval, calibrate that subset. Values outside the calibrated interval remain unavailable for production controls or are explicitly marked experimental.

Calibration does not mean “the most popular value.” It means a defensible operating domain that passes hard constraints and has adequate human review evidence.

## 8. Calibrating geometry thresholds

For clearance, collision, curvature and topology-related measurements:
- store the measured quantity, units, approximation method and error bound;
- store the threshold scope (glyph/variant/feature/context);
- account for curve approximation error in the pass condition;
- keep hard geometry thresholds separate from soft aesthetic observations;
- never lower a hard threshold merely to make a preferred candidate pass;
- preserve failed boundary specimens as regression fixtures.

A hard clearance pass must account for measurement uncertainty as defined in the geometry validation contract. An uncalibrated required threshold blocks production approval; it must not be silently replaced with a global default.

## 9. Calibrating generator diversity and ranking

Build a reviewed comparison corpus with:
- clear structural differences;
- near-duplicates;
- cosmetic-only differences;
- meaningful layout/relationship differences;
- valid but stylistically weak outputs;
- hard-invalid outputs.

Reviewers label whether pairs are meaningfully different in construction/composition and separately rate quality dimensions. Use this corpus to evaluate structural feature signatures and candidate ranking.

Do not optimize one scalar to match an unreviewed aesthetic notion. Keep hard gates first and quality dimensions separate. Calibrate feature weights/thresholds only when they show stable correspondence to reviewed comparisons. Retain the corpus version and decision rationale.

## 10. Calibration record schema

Every calibration record includes:
- stable calibration ID and status (draft / reviewed / approved / superseded);
- parameter or threshold ID and owning subsystem;
- exact scope (glyph, variant, feature, grammar, relationship, context);
- source revision and baseline specimen;
- tested values/variants and deterministic seeds;
- engine, schema, renderer and contract versions;
- automated metrics, units, error bounds and hard diagnostics;
- human rubric scores and comparative choices;
- reviewer disagreement summary;
- accepted interval/threshold, if approved;
- excluded values and observed failure modes;
- proof-sheet and regression-fixture references;
- decision owner, date, rationale and supersession link.

No production calibration exists until an approved record is attached to the relevant parameter/threshold registry entry.

## 11. Proof plate families

Create consistent plates for:
1. **Parameter sweep:** same glyph/variant, controlled values, monochrome silhouette.
2. **Topology and negative space:** component overlay, counter/aperture/channel masks and measured clearances.
3. **Grammar comparison:** same glyph under compatible construction grammars, same finish.
4. **Pair context:** fixed neighbors and spacing with candidate relationship changes.
5. **Word context:** fixed test words with controlled layout/grammar differences.
6. **Finish isolation:** identical canonical geometry under different rendering layers, proving finish is not counted as structural diversity.
7. **Thumbnail resilience:** same normalized specimens at target display sizes.
8. **Boundary regression:** accepted edge values and rejected values immediately outside the calibrated domain.

Each plate must include metadata and specimen IDs, but labels should not bias blind comparative review. Keep a separate mapping from blinded IDs to source values.

## 12. Acceptance criteria

1. Every production parameter bound has an approved calibration record.
2. Every geometry threshold has explicit scope, units and error treatment.
3. No uncalibrated parameter is silently exposed as a production slider.
4. Comparison batches change only declared factors.
5. Camera, renderer and specimen metadata are controlled and reproducible.
6. Human reviewers can select tie/neither/cannot judge.
7. Individual ratings and disagreement are preserved.
8. Identity/topology score 0 triggers explicit defect review, never majority auto-approval.
9. Generator diversity corpus distinguishes structural, layout, cosmetic and near-duplicate pairs.
10. Ranking/threshold calibration is traceable to reviewed specimens.
11. Calibration evidence is versioned and regression fixtures are retained.
12. Calibration never upgrades glyph maturity without the existing review gates.

## 13. Implementation sequence

**Slice A — Proof specimen manifest:** stable IDs, fixed render conditions, metadata and artifact hashing.

**Slice B — Review capture:** existing 0–3 rubric plus blinded pairwise comparison and tie/neither/cannot-judge options.

**Slice C — Calibration registry:** parameter/threshold scope, status, accepted bounds, evidence links and supersession.

**Slice D — Parameter sweep harness:** deterministic sweeps and boundary regression fixtures.

**Slice E — Diversity corpus:** labelled structural/cosmetic/near-duplicate comparisons and ranking evaluation.

**Slice F — Release gate integration:** production controls and generator policies consume only approved calibration records.

Do not automate aesthetic approval from rubric averages. Human review remains an explicit gate.
