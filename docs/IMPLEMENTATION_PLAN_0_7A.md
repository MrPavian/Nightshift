# NIGHTSHIFT 0.7A — Implementation Plan and Reconnaissance Report

**Ticket:** 0.7A-T01 (reconnaissance) · includes the completion report for 0.7A-T02  
**Author:** Claude (implementation role per D-009)  
**Date:** 2026-11-14  
**Status:** T01–T07 complete (0.7A first-slice gate met, see §12)

## 1. Repository reconnaissance (facts at commit `585715d`)

| Area | Finding |
|---|---|
| Runtime / build | None. No `package.json`, bundler, framework, lint or test runner existed before this change. |
| Implementation | One standalone file, `prototypes/nightshift_art_engine_v06.html` (≈20 KB, minified inline CSS/JS, ES module). |
| Three.js usage | `three@0.160.0` imported from jsDelivr; used only for a wall-preview plane textured from an SVG-rendered canvas (`init3D`, `updateWall`). Not an editor surface. |
| Glyph data | Table `M` (lines 26–32): A/B/G/R/S as `[outerPath, holePaths[]]`. Table `F` (lines 33–54): 21 provisional combined path strings. All paths use only absolute `M L Q Z`. |
| Rendering facts | Custom glyphs with holes use `evenodd`, all others `nonzero`; holes are additionally painted `#eee9dc`. Outline/inline/highlight stroke the outer path only. |
| Randomness | `Math.random()`-free sine hash `rnd()` per seed, but the seed sequence uses a global counter (`++seq`); remix is not reproducible across sessions. |
| Specifications | `docs/` (brief, architecture, decisions D-001…D-009, Claude briefs/ticket packs), `research/` (~60 documents) and `contracts/` (14 machine-readable JSON contracts). |

### Newly measured geometry facts (from the T02 importer)

- **A's counter has the same orientation as its outer contour** (both clockwise in the y-down frame). B's and R's counters are opposite to their outer contours. v0.6 hides this because it renders A with `evenodd`. The T05 renderer must derive holes from declared topology, not from winding. Recorded as `IMPORT_COUNTER_SAME_WINDING`.
- **D, O, P have an inner subpath opposite to the outer**, so v0.6's `nonzero` fill does open their holes. **Q's tail subpath has the same orientation as the outer contour** and overlaps it. None of this is declared topology. Recorded as `IMPORT_UNDECLARED_SUBPATH_TOPOLOGY`.
- Analytic visible bounds of the five masters: A `8,8–96,132`; B `10,8–101,132`; G `5,8–98,132`; R `10,8–103,132`; S `5,8–99,133` (legacy units, y down). These are measurements, not calibrated metrics.

## 2. Technical decisions (recorded as D-011)

1. **Plain browser-native ES modules (JavaScript + JSDoc), no framework, no transpiler.** The same modules run in Node (tests, tools) and in the browser (editor). This follows AGENTS.md ("small, understandable, browser-native modules") and keeps the canonical model inspectable.
2. **Tests with Node's built-in runner (`node --test`).** No test dependency. `npm test`.
3. **No runtime dependencies in the canonical model.** Path parsing, exact bounds, signed area and SHA-256 are implemented in-house (small, fully tested). A computational-geometry library will be evaluated in T04 only if robust intersection/planar-topology code proves impractical; any addition is recorded first.
4. **Three.js is a pinned npm dependency confined to `src/editor/`** (D-012, `three@0.187.0`); browser pages use an import map, no bundler.
5. **Legacy geometry is a generated, verifiable snapshot.** `tools/extract-v06-paths.mjs` reads the immutable v0.6 file and writes `data/legacy/v06-glyph-paths.json` with per-path SHA-256 hashes and line locators. Tests re-extract and compare byte-for-byte.

## 3. Module map (responsibility seams from `GENERATOR_SYSTEM_RESPONSIBILITIES.md` §7)

| Seam | Module | Status |
|---|---|---|
| GlyphRegistry | `src/glyph/registry.js` | **T02 done** |
| (legacy migration) | `src/glyph/import-v06.js`, `tools/extract-v06-paths.mjs` | **T02 done** |
| GlyphValidator (schema layer) | `src/glyph/schema.js` | **T02 done** (schema/reference/maturity/snapshot integrity) |
| VectorGeometry | `src/geometry/svg-path.js`, `flatten.js`, `area.js`, `predicates.js` | **done** (parse/serialize, exact bounds/area, certified flattening) |
| GlyphValidator (geometry/topology) | `src/geometry/topology.js`, `src/glyph/validate-geometry.js`, `data/validator-profiles/legacy-v06.v1.json` | **T04 done** |
| Semantic graph overlay | `src/glyph/semantic-overlay.js`, `data/semantic/abgrs-semantic-overlay.v1.json` | **T03 done** |
| Render topology | `src/render/render-model.js` | **T05 done** |
| SvgInterchange (export side) | `src/render/svg.js` | **T05 done** (import side later) |
| ThreeEditorAdapter | `src/editor/three-glyph.js` (meshes) + `editor/editor.js` (interaction) | **T07 done** |
| EditCommandBus | `src/model/editor-store.js`, `src/model/operations.js` | **T07 done** |
| ProjectSerializer | `EditorStore.save()/load()` | **T07 done** |
| DiagnosticRunner / proof sheets | `src/proof/` (`specimens.js`, `plates.js`, `run.js`, `review.js`), `tools/proof-run.mjs` | **T06 done** |
| StyleGrammarRegistry, CompositionSolver, RelationshipGraph | — | 0.7B / 0.8A |

Shared helpers: `src/core/sha256.js`, `src/core/stable-json.js`, `src/glyph/ids.js`.

## 4. Schema choices made within the glyph data contract

`research/GLYPH_DATA_CONTRACT_A_Z.md` §14 allows implementation details; these are the choices and deliberate extensions:

- **Uncalibrated numbers are `null`, not invented.** `unitsPerEm`, `baselineY`, `capHeightY`, `advanceWidth`, side bearings and `capHeight` are `null` with `calibrated: false`. The validator requires numbers once `calibrated` is true. Only analytic `visibleBounds` are filled.
- **Coordinate frame `legacy-v06`, y down,** exactly as in the source. No coordinate conversion happens at import (conversion would violate "preserve exact"). A y-up production frame can be introduced later as a derived representation.
- **Contour role `unclassified`** was added for extra subpaths of provisional letters whose topology is undeclared (D/O/P/Q), instead of guessing `counter` or `detail`.
- **Topology status fields:** `counterStatus` (`none-in-master | provisional-declared | validated | undeclared`), `apertureStatus` (`none-declared | interpretation-required | classified | undeclared`), `analysisStatus`. `connectedComponentCount` is `null` until T04 measures it.
- **Negative-space records carry `status: provisional`.**
- **Segment and node IDs** (`glyph.A.contour.outer.seg.03`, `…node.03`) are assigned once from the immutable snapshot order. Edits must keep existing IDs and mint new ones; never renumber.
- **Variant IDs:** `x.master` for A/B/G/R/S, `x.provisional` for the 21 provisional bases (so a provisional base is never named like an authored master).
- **`geometryHash`** = SHA-256 of the stable JSON of the variant geometry, for cache keys and drift detection.
- **Contour `winding` and exact `signedArea`** are recorded (orientation as seen in the y-down frame).

## 5. Next tickets and known risks

- **G aperture (AUD-01).** T04 proved that G's unfilled space is exterior-connected (simple contour, no holes). The semantic aperture boundary and the width measurement line (AUD-03) still need authoring and review, so `apertureStatus` stays `interpretation-required`.
- **Browser execution:** covered by `npm run test:browser` (headless Chrome loads the registry from the same JSON files; geometry hashes match Node). Added in T03.

## 6. T02 completion report

| Item | Result |
|---|---|
| Status | **complete** |
| Files | `package.json`, `tools/extract-v06-paths.mjs`, `data/legacy/v06-glyph-paths.json`, `src/core/sha256.js`, `src/core/stable-json.js`, `src/geometry/svg-path.js`, `src/glyph/ids.js`, `src/glyph/import-v06.js`, `src/glyph/schema.js`, `src/glyph/registry.js`, `tests/core.test.js`, `tests/glyph-registry.test.js` |
| Tests | `npm test`: **22 passed, 0 failed** (Node 22.23.4) |
| Exactness | Every imported contour re-serializes byte-for-byte to its legacy path string; the snapshot re-extracts identically; the v0.6 prototype file is unchanged (hash pinned in the snapshot). |
| Determinism | Repeated import and registry serialization are identical. |
| Stable IDs | Glyph, variant, contour, segment, node and negative-space IDs survive serialize → deserialize. |
| Topology | A: 1 counter · B: 2 counters (upper/lower by measured position) · R: 1 counter · S: `none-in-master` · G: no counter, `apertureStatus: interpretation-required`, no synthesized geometry. |
| Maturity | A/B/G/R/S `authored-contour`; 21 others `provisional`, `reference-only`. No review records; validator rejects maturity claims without passed reviews. |
| Not verified | Geometric validity (self-intersection, containment, clearance) — that is T04. Browser execution. Any visual quality. |
| Next | **0.7A-T03** semantic graph overlays and topology declarations. |

## 7. T03 completion report

| Item | Result |
|---|---|
| Status | **complete** |
| Files | `data/semantic/abgrs-semantic-overlay.v1.json`, `src/glyph/semantic-overlay.js`, `src/glyph/load-node.js`, `src/glyph/schema.js` (semantic reference checks), `src/glyph/registry.js` (`GlyphRegistry.build`), `tools/report-topology.mjs`, `docs/reports/T03_TOPOLOGY_REPORT.md`, `tools/browser-smoke.mjs`, `tests/browser/smoke.html`, `tests/semantic-overlay.test.js` |
| Tests | `npm test`: **37 passed, 0 failed** · `npm run test:browser`: **SMOKE-PASS** (headless Chrome) |
| Geometry | Unchanged: geometry hashes and legacy snapshots are identical before and after the overlay (tested). Overlaid glyphs move to revision 2 with a `derived` provenance record. |
| Components | Exactly the contract proposals (A 5, B 6, G 6, R 5, S 5) with stable IDs `glyph.X.component.*`. |
| Mapping | Only topologically determined counter boundaries are `mapped` (A 1, B 2, R 1). All positive-mass components are `provisional-unmapped` with reviewable `candidateGeometryRefs` and a stated geometric basis; candidates partition each outer contour (every segment proposed exactly once). G `aperture-boundary` is `pending-classification`. |
| Junctions | Declared per contract invariants with `position: null` and candidate node references; no coordinates invented. |
| Constraints | Identity invariants copied verbatim from the parameter contract plus `preserve-counter` per counter, all `declared-unverified`; G `preserve-aperture` is `pending-classification`. |
| Topology | Declared signatures (connected components = 1, required counters/apertures, junctions, fill rule) are `declared-unverified`. Reports keep counters, apertures and channels separate. |
| G | `TOPO_APERTURE_UNRESOLVED` warning with blockers; `glyph.G.set-aperture-width` is gated (`commitAllowed: false`); the validator rejects attempts to open the gate while unclassified. |
| Needs human review | All `candidateGeometryRefs` (component boundaries are interpretations), junction kinds, and the G aperture observation. |
| Not verified | Any geometric property (connectivity, containment, self-intersection, clearance) — that is T04. |
| Next | **0.7A-T04** geometry validator vertical slice. |

## 8. T04 completion report

| Item | Result |
|---|---|
| Status | **complete** (vertical slice; channel corridor analysis and render parity deferred, see below) |
| Files | `src/geometry/flatten.js`, `src/geometry/predicates.js`, `src/geometry/topology.js`, `src/geometry/area.js`, `src/glyph/validate-geometry.js`, `data/validator-profiles/legacy-v06.v1.json`, `tools/report-validation.mjs`, `docs/reports/T04_VALIDATION_REPORT.md`, `tests/fixtures/geometry-fixtures.js`, `tests/geometry-validator.test.js` |
| Tests | `npm test`: **61 passed, 0 failed** (≈3 s) · `npm run test:browser`: **SMOKE-PASS** |
| Pipeline | All 10 contract stages run in order and report `passed / failed / measured-uncalibrated / partial / not-run`. Nothing is silently passed. |
| Numerics | Curves are flattened adaptively with a **certified** error bound (convex-hull argument, tested). Line geometry uses exact orientation predicates. Near-contacts closer than the bound trigger refinement (≤ 3 rounds); crossings between contours are certified by a Jordan-curve node-straddle test; anything still undecidable is an error (`GEO_INTERSECTION_UNCERTAIN`), never a pass. |
| Legacy result | A, B, G, R, S pass every hard check: certified simple contours, A/B/R counters are enclosed bounded faces, one connected component each. 25 of 26 letters pass; **Q fails** (`VAL_UNDECLARED_CROSSING`: its tail crosses the outer ring and counter, undeclared). |
| G | Proven: all unfilled space is exterior-connected (`GEO_UNFILLED_SPACE_EXTERIOR_CONNECTED`). The aperture entity remains unclassified (`TOPO_APERTURE_UNRESOLVED` warning); the identity check `aperture-exterior-connected` is `not-evaluable`, not passed. The overlay (v1.1.0) records this evidence and drops the resolved blocker. |
| Fill rule | A's counter is reproduced only by `evenodd`; under `nonzero` it would be filled (`GEO_FILL_RULE_SENSITIVE`). B and R work under both. |
| Clearance | Measured with closest-point pair, segment IDs, error bound and side (filled wall vs unfilled gap). E.g. A counter wall 17, A legs 26, G wall 18, G pocket under the bar 12 (unfilled). All `uncalibrated` → `VAL_UNCALIBRATED`; no pass/fail. With an approved threshold the rule "distance − error bound ≥ threshold" applies (fixture-tested, incl. near-clearance warning). |
| Identity checks | Geometry-decidable checks pass (`counter-enclosed`, `two-distinct-bounded-counters`, `single-required-connected-contour`, `no-unintended-self-intersection`). Mapping-dependent checks are `not-evaluable` with reasons. |
| Contract fixtures | counter.enclosed ✓, counter.merged ✓, aperture.open ✓, aperture.closed ✓, channel.corridor (partial: never a counter; corridor analysis deferred), self-intersection ✓, declared-crossing ✓, clearance.pass ✓, clearance.fail ✓, anchor.invalid ✓, determinism ✓, render-parity → T05. |
| Atomicity | `checkCandidate()` validates a candidate record and returns `commitAllowed`; the committed record is untouched (tested with a counter moved outside the glyph). |
| Not done | Channel corridor analysis; render parity (T05); anchors (none declared yet); calibrated thresholds (need human calibration records). |
| Next | **0.7A-T05** topology-correct monochrome renderer (SVG first), then Three.js. |

## 9. T05 completion report

| Item | Result |
|---|---|
| Status | **complete** |
| Files | `src/render/render-model.js`, `src/render/svg.js`, `src/editor/three-glyph.js`, `tools/proof/render-proof.html`, `tools/render-proof.mjs`, `tools/lib/headless.mjs`, `docs/reports/proof/T05/render-proof.png`, `docs/reports/proof/T05/manifest.json`, `tests/render.test.js`; validator report now exposes certified face points; decision D-012 |
| Tests | `npm test`: **72 passed, 0 failed** · `npm run test:browser`: **SMOKE-PASS** · `npm run proof:render`: **PROOF-PASS** |
| One topology | A single render model (outer + declared holes) feeds SVG fill, SVG outline and Three.js meshes. Holes come from declared counters, never from source winding. Derived contours are re-oriented (outer clockwise, holes counter-clockwise), so the compound path is correct under **both** `evenodd` and `nonzero` (tested by re-validating the derived geometry). A's same-winding counter is reversed in the derived copy only. |
| No paint patches | The SVG output contains exactly the ink, optional surface and `none`; no paper-colour or background-colour hole painting (tested). |
| Structured refusal | Glyphs that fail hard validation (Q) → `RENDER_INVALID_TOPOLOGY` with the validator errors; glyphs with undeclared subpath roles (D, O, P) → `RENDER_UNDECLARED_TOPOLOGY`; a stale or foreign validation report is rejected. 22/26 letters render. |
| Three.js parity (Node) | Triangulated mesh area equals canonical area exactly for polygon glyphs and within perimeter × flattening tolerance for curved ones; certified probe points: filled faces covered, counters uncovered; meshes carry canonical IDs in `userData`. |
| Raster proof (Chrome, SwiftShader WebGL) | For A/B/G/R/S on light, dark and textured surfaces: every counter probe shows the exact surface pixel and every filled probe shows ink, in SVG and in Three.js (36/36 probes). SVG vs Three.js silhouettes differ in **0 pixels outside a 1-px edge band** (edge-band differences 0–84 px from rasterisation rules). Negative control: the v0.6 paper-colour patch is detected on dark and textured surfaces. |
| Proof artifacts | `docs/reports/proof/T05/render-proof.png` (proof sheet incl. diagnostic column with G's unresolved-aperture flag) and `manifest.json` (input hashes, render settings, per-glyph geometry hash and results, review `pending`). A test fails if the proof's geometry hashes no longer match the registry. |
| Maturity | Unchanged (`authored-contour`). Automated proof does not count as render review. |
| Not done | Extrusion/depth, inline, highlights and other finish passes (explicit non-goals of T05); SVG import; the stroke-outline pass is in SVG only. |
| Next | **0.7A-T06** neutral proof sheets and review package (pair/word fixtures). |

## 10. T06 completion report

| Item | Result |
|---|---|
| Status | **complete** |
| Files | `src/proof/specimens.js`, `src/proof/plates.js`, `src/proof/run.js`, `src/proof/review.js`, `tools/proof-run.mjs`, `docs/reports/proof/T06/` (manifest, checksums, 4 plates, 16 validation reports, review template, `ratings.json`), `review/index.html`, `review/app.js`, `tools/review-smoke.mjs`, `.github/workflows/ci.yml`, `tests/proof.test.js`, `tests/review-page.test.js` |
| Tests | `npm test`: **86 passed, 0 failed** · `npm run test:browser`: SMOKE-PASS + REVIEW-PAGE-PASS · `npm run proof:render`: PROOF-PASS |
| Run | `run.0.7A-T06.1693b6ee52ef`. Manifest has every field `contracts/proof-sheet-run.v1.json` requires; `sourceRevision` is the SHA-256 of the serialized registry (content-addressed, so re-running after a commit does not churn). No timestamps or randomness are inputs (`rootSeed: 0`, documented). |
| Plates | `glyph-identity` (A/B/G/R/S native + 0.18× thumbnail), `semantic-topology` (component proposals coloured per candidate segment, counters, junction candidates, G aperture flag, validator summary), `pair-context` (12 pairs), `word-context` (8 words). SVG, viewable directly on GitHub. Every plate carries the run ID and its specimen IDs. |
| Fixtures | All 12 pairs and 8 words from `contracts/proof-sheet-fixtures.v1.json`; computed coverage equals the contract coverage for every fixture (tested). |
| Partial coverage | Provisional letters render grey; letters that cannot be rendered (D, O: undeclared topology; Q: invalid topology) keep their slot as a red dashed **missing — provisional** box with the reason in the manifest. Nothing is dropped silently. |
| Layout | `neutral-naive-layout/1.0.0`: fixed 12-unit gap between visible bounds. Labelled on every context plate; it is not designed spacing (no relationship solver yet). |
| Reproducibility | Identical inputs reproduce run ID, specimen IDs, plates and hashes byte-for-byte; changing one glyph's geometry changes only the specimens that contain it (tested). CI checks that committed artifacts are current. |
| Review | Review records are separate from automated results (`review/ratings.json`, human-owned, never overwritten by the runner). Validation implements the protocol rubric: 10 dimensions 0–3 or cannot-judge; identity/topology 0 or an open critical defect blocks `pass`; any score 1 needs a defect; stale geometry or a foreign run is rejected. `proposeMaturity()` only returns a proposal (`applied: false`). |
| Not implemented (declared in manifest) | parameter-sweep, grammar-comparison, finish-isolation, boundary-regression proof families; blind-review aliases. |

## 11. Test & review page

`review/index.html` runs the real pipeline in the browser without a build step: live A–Z grid (import → validation → render, with refusal reasons), detail view with SVG (light/dark/texture, diagnostics) and a rotatable Three.js viewport, a word tester (naive layout), the committed T06 plates, and the review form (exports `ratings.json`). Three.js comes from `node_modules` on localhost and from the pinned jsDelivr copy (`three@0.187.0`) elsewhere; a test keeps both versions equal.

Run locally: `npm install`, then serve the repository root (e.g. `python3 -m http.server`) and open `http://localhost:8000/review/`.

## 12. T07 completion report

| Item | Result |
|---|---|
| Status | **complete** |
| Files | `src/model/operations.js`, `src/model/editor-store.js`, `editor/index.html`, `editor/editor.js`, `tools/editor-smoke.mjs`, `tests/editor-store.test.js`; review page links to the editor; Pages workflow deploys `editor/`; decision D-013 |
| Tests | `npm test`: **98 passed, 0 failed** · `npm run test:browser`: SMOKE-PASS, REVIEW-PAGE-PASS, **EDITOR-PASS** (13/13 scripted steps incl. real PointerEvents) |
| Operation | `contour.move-node` (D-013): no numeric bounds, accepted only if all hard validator checks pass. All 20+ parameter operations of the parameter contract are registered **disabled** (`CMD_OPERATION_DISABLED`) and shown as disabled controls. Provisional glyphs → `OP_NOT_EDITABLE`. |
| Commands | Envelope per `contracts/editor-interaction.v1.json` (`command_id`, `operation_id`, `target_ids`, `expected_revision`, `payload`, `source_interaction_id`). Malformed → `CMD_BAD_ENVELOPE`; stale revision → `CMD_REVISION_CONFLICT`; invalid candidate → `CMD_VALIDATION_FAILED` with validator diagnostics. Rejections leave canonical state and history byte-identical (tested). |
| Patches | Operations return canonical patches on authored fields only; the store recomputes geometry hash, visible bounds and revision. History entries carry the contract fields plus the patch. Undo/redo replay patches through the validator and commit new, monotonic revisions; a full undo restores the exact legacy geometry hash and empty `deliberateChanges`. A drag is one command. |
| Preview | Built through the same candidate path, marked provisional, never persisted; invalid previews draw the candidate outline dashed red with the would-be rejection codes. Release commits; Escape/pointer-cancel restore the committed scene. |
| Scene | Rebuilt from the committed record (or the preview candidate) on every change; scene root carries glyph ID, revision and geometry hash; handles carry node IDs; no mesh is ever written back. Camera, zoom and pan live in a separate view state (tested not to dirty the model). |
| Selection | Glyph › contour › node breadcrumb with stable IDs and the semantic component proposals that reference the node's segment. Selection survives scene rebuild and project reload. |
| Input | Mouse and touch drag; drag on empty space pans; wheel/buttons zoom; arrow keys/buttons nudge by one unit as the drag alternative; selected handle is larger with an extra ring (not colour-only). |
| Save/reload | `EditorStore.save()/load()` round-trips canonical geometry, IDs and revisions exactly; browser storage and file download. |
| Not done | Component-level (semantic) operations, multi-select, anchors, blackbook/wall views, history persistence across reloads, tutorial system. |

### 0.7A first-slice release gate

| Requirement | State |
|---|---|
| Imported editable monochrome A/B/G/R/S | ✓ |
| Topology-correct negative space | ✓ (T04/T05) |
| Stable IDs | ✓ |
| Structured diagnostics | ✓ |
| Deterministic proof artifacts | ✓ (T05/T06) |
| At least one complete validated Three.js edit loop | ✓ (T07) |

Maturity of every glyph is unchanged (A/B/G/R/S `authored-contour`, others `provisional`). Human review of A/B/G/R/S is still pending.
