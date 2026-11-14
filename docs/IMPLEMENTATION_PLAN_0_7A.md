# NIGHTSHIFT 0.7A — Implementation Plan and Reconnaissance Report

**Ticket:** 0.7A-T01 (reconnaissance) · includes the completion report for 0.7A-T02  
**Author:** Claude (implementation role per D-009)  
**Date:** 2026-11-14  
**Status:** T01 complete · T02 complete · T03 complete · T04–T07 not started

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
4. **Three.js enters at T05/T07 as a pinned npm dependency, confined to `src/editor/`.** A dev server/bundler (likely Vite) will be proposed with that ticket, not before.
5. **Legacy geometry is a generated, verifiable snapshot.** `tools/extract-v06-paths.mjs` reads the immutable v0.6 file and writes `data/legacy/v06-glyph-paths.json` with per-path SHA-256 hashes and line locators. Tests re-extract and compare byte-for-byte.

## 3. Module map (responsibility seams from `GENERATOR_SYSTEM_RESPONSIBILITIES.md` §7)

| Seam | Module | Status |
|---|---|---|
| GlyphRegistry | `src/glyph/registry.js` | **T02 done** |
| (legacy migration) | `src/glyph/import-v06.js`, `tools/extract-v06-paths.mjs` | **T02 done** |
| GlyphValidator (schema layer) | `src/glyph/schema.js` | **T02 done** (schema/reference/maturity/snapshot integrity) |
| VectorGeometry | `src/geometry/svg-path.js` | parse/serialize/bounds done; flattening + error bounds in T04 |
| GlyphValidator (geometry/topology) | `src/geometry/topology.js`, `src/glyph/validate-geometry.js` | T04 |
| Semantic graph overlay | `src/glyph/semantic-overlay.js`, `data/semantic/abgrs-semantic-overlay.v1.json` | **T03 done** |
| SvgInterchange | `src/render/svg.js` | T05 |
| ThreeEditorAdapter | `src/editor/three-adapter.js` | T05/T07 |
| EditCommandBus | `src/model/commands.js` | T07 |
| ProjectSerializer | `src/project/serializer.js` | T07 (registry serialization already round-trips) |
| DiagnosticRunner / proof sheets | `src/proof/` | T06 |
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

- **T04 — geometry validator.** Adaptive flattening with error bounds, segment intersection, planar topology and containment. Risk: robust predicates without a library. Mitigation: exact arithmetic is possible for the line-only parts of the legacy data, plus conservative error-bounded checks for quadratics.
- **G aperture (AUD-01).** Because G is a single closed, simple(-looking) contour without holes, every unfilled region inside its silhouette is connected to the exterior if T04 proves the contour simple. That proves exterior connectivity but **not** the semantic aperture boundary or a measurement line. The plan is to report connectivity as measured and keep `apertureStatus: interpretation-required` until an aperture boundary is authored and reviewed.
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
