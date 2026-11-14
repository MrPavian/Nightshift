# NIGHTSHIFT Specification Integration Audit 01

**Date:** 2026-11-14  
**Status:** Initial audit; specification-only, no production implementation assessed  
**Scope:** A/B/G/R/S construction handoff and its upstream contracts  
**Reviewed:** `ABGRS_GLYPH_CONSTRUCTION_IMPLEMENTATION_SPEC_01.md`, `GLYPH_MASTER_SPECIFICATIONS_A_B_G_R_S.md`, `GLYPH_DATA_CONTRACT_A_Z.md`, `contracts/glyph-parameter-contract.v1.json`, `contracts/glyph-geometry-validation.v1.json`, `contracts/glyph-construction-pipeline.v1.json`, `contracts/abgrs-glyph-construction.v1.json`, and the relevant roadmap/Claude brief sections.

## 1. Executive result

The overall architecture is coherent: canonical semantic/vector state is authoritative; Three.js is a live editor adapter; edits use typed commands; topology and visual maturity are separate; and proof output is derived evidence rather than approval.

The parameter registry passes a structural completeness check:
- 25 operation IDs are declared across A/B/G/R/S.
- All 25 have matching operation-semantics entries.
- No extra or missing operation IDs were found.
- Every operation write-set points to a parameter declared for that glyph.
- S correctly has six parameters and five operations because terminal start/end tangents are written together by one operation.

One material semantic inconsistency remains around G's aperture. A smaller set of implementation-order clarifications should be made before Claude codes Slice 1.

## 2. Findings

### AUD-01 — G aperture is both mandatory and unresolved

**Severity:** High  
**Affected:** `contracts/glyph-parameter-contract.v1.json`, `research/GLYPH_MASTER_SPECIFICATIONS_A_B_G_R_S.md`, `research/ABGRS_GLYPH_CONSTRUCTION_IMPLEMENTATION_SPEC_01.md`, `contracts/abgrs-glyph-construction.v1.json`

The parameter contract currently states as a master identity invariant that G "has an exterior-connected aperture". The glyph-specific construction handoff correctly records that v0.6 contains one closed outer path and no hole array, and says aperture classification may remain interpretation-required if exterior connectivity cannot be robustly established.

These statements are not yet aligned. The source contour may encode an opening through its silhouette, but source code facts alone do not prove the exact semantic aperture boundary or a measurable aperture width.

**Resolution:** Separate the intended G identity rule from import-time evidence status:
1. The intended G master topology includes an exterior-connected opening that distinguishes it from C/O.
2. The imported legacy record may remain `apertureStatus: interpretation-required` until planar topology and component mapping establish the opening.
3. The aperture-width operation must be unavailable for canonical commit until an aperture entity, measurement line and validated boundary mapping exist.
4. If geometry analysis cannot establish the aperture, preserve the snapshot and raise a review diagnostic; do not synthesize geometry.

This is a contract clarification, not a change to the historical/source facts.

### AUD-02 — The first slice and the first editable milestone need an explicit gate boundary

**Severity:** Medium  
**Affected:** `contracts/glyph-construction-pipeline.v1.json`, `research/GLYPH_CONSTRUCTION_PIPELINE_01.md`, `research/ABGRS_GLYPH_CONSTRUCTION_IMPLEMENTATION_SPEC_01.md`

The construction pipeline says Slice 1 imports snapshots and declares semantic topology; Slice 2 introduces registered operations after calibration. The A/B/G/R/S brief follows that sequencing. The parameter contract contains the complete future operation registry, which could be misread as authorization to expose all controls immediately.

**Resolution:** Claude must implement and validate operation registration in the model layer, but keep geometry-changing UI controls disabled until the individual parameter has a calibrated interval and validated derivation. Slice 1 must not mutate geometry.

### AUD-03 — G's parameter naming implies a measurement that is not yet defined

**Severity:** Medium  
**Affected:** `contracts/glyph-parameter-contract.v1.json`, `research/ABGRS_GLYPH_CONSTRUCTION_IMPLEMENTATION_SPEC_01.md`

`apertureWidth` is a registered parameter, but the precise measurement line/direction and boundary ownership are not yet defined. The construction spec lists aperture width at a declared measurement line as a metric, which is directionally correct but not enough to implement a stable parameter.

**Resolution:** Before enabling this control, define the measurement construction (reference line or cross-section, endpoints, local coordinate frame, measurement error) and prove it remains meaningful under the supported G variants. Do not invent coordinates now.

### AUD-04 — Variant inventory is correctly staged, but the master registry is not an implementation schedule

**Severity:** Low  
**Affected:** `research/MASTER_GLYPH_VARIANT_MATRIX_01.md`, `research/ABGRS_GLYPH_CONSTRUCTION_IMPLEMENTATION_SPEC_01.md`

The variant matrix contains many named variants. The A/B/G/R/S handoff correctly says Slice 1 creates only master variants and does not auto-generate alternatives.

**Resolution:** Claude should load/validate variant metadata if needed, but implement no alternate geometry until the master is stable and reviewed. Topology-changing variants remain separately authored.

### AUD-05 — Existing mixed pair/word fixtures are partial coverage by design

**Severity:** Low  
**Affected:** `GLYPH_REVIEW_PACKAGE_A_Z.md`, `PROOF_SHEET_AND_TEST_FIXTURE_INFRASTRUCTURE_01.md`, `ABGRS_GLYPH_CONSTRUCTION_IMPLEMENTATION_SPEC_01.md`

The canonical pair/word inventory includes letters outside A/B/G/R/S. The new handoff correctly labels those fixtures partial where provisional glyphs remain.

**Resolution:** Preserve the fixture inventory. Report per-glyph coverage and do not let a passing partial fixture certify the entire pair/word or grammar.

## 3. Verified structural checks

| Check | Result |
|---|---|
| Parameter operation IDs declared | 25 |
| Operation semantics entries | 25 |
| Missing semantics entries | 0 |
| Extra semantics entries | 0 |
| Operation writes to undeclared glyph parameter | 0 |
| Master glyph records in A/B/G/R/S contract | 5 |
| Canonical pair fixtures | 12 |
| Canonical word fixtures | 8 |
| Initial maturity | authored-contour |

The operation registry check was performed by parsing the current JSON contract and comparing each operation's declared write set to the owning glyph's parameter list. It does not test runtime geometry derivation.

## 4. Claude implementation implications

Before implementation:
- Resolve AUD-01 in the parameter contract wording and enforce the import-time unresolved state.
- Add an explicit aperture-classification precondition to the G aperture-width operation.
- Keep all numeric operations non-committing until calibration is approved.
- Preserve exact legacy source paths and do not auto-repair.
- Keep A/B/R counters, G aperture and S no-counter state distinct.
- Generate neutral/diagnostic proof output before any effects or alternate variants.

## 5. Not assessed

This audit does not establish:
- that the original contours are geometrically valid;
- that G's opening can be classified by the current path representation;
- that semantic component mappings are correct;
- that anchors or metrics are visually useful;
- that any glyph is render-reviewed or production-approved;
- that Claude's runtime implementation exists or passes tests.

Those require actual source/runtime inspection, validator execution and human review of generated proof artifacts.
