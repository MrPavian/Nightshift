# NIGHTSHIFT 0.7A — T01 Reconnaissance Report and Implementation Plan

**Ticket:** 0.7A-T01 — Repository/runtime reconnaissance
**Date:** 2026-11-14
**Author role:** Claude (implementation)
**Status:** T01 complete. D-011 confirmed by the owner on 2026-11-14 ("it must run with Three.js"); T02 has started — see §8.

## 1. What was inspected

- `AGENTS.md`, `README.md`, `CONTRIBUTING.md`
- `docs/PROJECT_BRIEF.md`, `docs/ARCHITECTURE.md`, `docs/DECISIONS.md`, `docs/ROADMAP.md`, `docs/AI_HANDOFF.md`, `docs/CHANGELOG.md`
- `docs/CLAUDE_IMPLEMENTATION_BRIEF_0_7.md` (sections 1–7), `docs/GENERATOR_SYSTEM_RESPONSIBILITIES.md` (§7 interface seams)
- `docs/CLAUDE_TICKET_PACK_0_7A_01.md`, `docs/CLAUDE_TICKET_PACK_0_7B_01.md`, `docs/CLAUDE_TICKET_PACK_BLACKBOOK_01.md`
- `research/SPECIFICATION_INTEGRATION_AUDIT_01.md` (findings AUD-01 – AUD-05)
- `contracts/glyph-construction-pipeline.v1.json`
- `prototypes/nightshift_art_engine_v06.html` (full source)
- Runtime environment: Node and npm availability, npm registry reachability

Not yet read in full and required before the ticket that depends on them: `contracts/glyph-parameter-contract.v1.json`, `contracts/glyph-geometry-validation.v1.json`, `research/ABGRS_GLYPH_CONSTRUCTION_IMPLEMENTATION_SPEC_01.md`, `contracts/abgrs-glyph-construction.v1.json`, `research/GLYPH_DATA_CONTRACT_A_Z.md`, `contracts/editor-interaction.v1.json`, `contracts/proof-sheet-fixtures.v1.json`. T02–T07 must each start by reading their listed contracts.

## 2. Actual repository state

| Item | Finding |
|---|---|
| Source tree | None. The repository holds documentation (`docs/`), research (`research/`), JSON contracts (`contracts/`) and one prototype (`prototypes/`). |
| Package/build setup | None: no `package.json`, lockfile, bundler, TypeScript config or test runner. |
| Tests | None. Regression *cases* exist as Markdown/JSON specifications only. |
| CI | None (`.github/` absent). |
| Application entry point | Only `prototypes/nightshift_art_engine_v06.html`. |
| Three.js usage | v0.6 imports `three@0.160.0` as an ES module from jsDelivr; it renders a wall plane textured with an SVG-rasterised canvas. Three.js plays no part in editing. |
| Local runtime | Node 22.23.4, npm 10.9.9; the npm registry is reachable. Chromium + Playwright are pre-installed in this cloud environment (not a repository dependency). |

### 2.1 v0.6 prototype facts relevant to the import (code observations, not visual review)

- File: 90 lines of minified inline HTML/CSS/JS, one `<script type="module">`.
- SHA-256 of the file at commit `585715d`: `2b5a6be891a9b98b8c6d930c57ca79b4f183bf373713a9cd93d4514bf4a5bc6d`. T02 must re-hash at import time and record the commit it read from.
- `M` holds the five custom records as `[outerPath, innerPaths[]]`: A (1 inner), B (2 inner), G (0), R (1), S (0). Confirms brief §4.
- `F` holds 21 provisional single-string paths (C, D, E, F, H–Q, T–Z). **R and S are absent from `F`** because they exist in `M`; any letter missing from both falls back to `F.N`. (Corrected from "19" in the first version of this report.)
- Provisional D, O, P, Q encode counters as additional subpaths inside one string and are drawn with `fill-rule="nonzero"` (because `holes` is empty for non-custom letters). Their counters therefore depend on subpath winding direction. Whether every such subpath winds opposite to its outer contour is **unverified**; the T02/T04 importer must record winding explicitly rather than inherit it.
- Custom counters use `evenodd` for fill and are then overpainted with the fixed paper colour `#eee9dc` (confirms the audit finding; T05 must not repeat this).
- Path vocabulary in use: absolute `M`, `L`, `Q`, `Z` only. No cubic, arc or relative commands occur in the glyph data, which keeps the legacy parser small. The canonical model must still support cubic segments (pipeline contract).
- G's outer contour is a single closed polygon whose opening between the bowl and the spur lies in the outline itself. That makes the AUD-01 "exterior-connected aperture" geometrically plausible, but it is **not proven** here; T03/T04 decide classification and otherwise record `interpretation-required`.
- Glyph design space is roughly a 0–110 × 0–152 unit box, with letters translated by `(-50, -70)` at render time. Those numbers are prototype layout facts, not calibrated metrics.
- Seeds come from a character-code sum plus a counter; `remix()` uses unseeded `Math.random()`. Nothing in v0.6 is reproducible enough to serve as a determinism baseline.

## 3. Proposed tooling (D-011, pending owner confirmation)

AGENTS.md requires a documented reason before adding a build pipeline or dependency. The production generator described by D-009/D-010 needs typed data contracts, deterministic unit and geometry tests, and a real Three.js module dependency. None of those are practical as a single inline HTML file.

| Need | Proposal | Reason | Rejected alternative |
|---|---|---|---|
| Language | **TypeScript**, strict mode | The contracts are large and ID-heavy (glyph/variant/contour/segment/node IDs, diagnostics, commands); compile-time checks catch contract drift. | Plain JS with JSDoc types: workable, but weaker enforcement across ~10 modules. |
| Dev server / bundling | **Vite** | Native ES modules, minimal config, serves the editor shell and bundles Three.js. No framework is implied. | No bundler (import maps + CDN): reproducibility depends on a CDN and can't run Node tests on the same modules. |
| Unit / geometry tests | **Vitest** | Shares Vite's TS transform; runs the Three.js-free core in Node; fast deterministic tests. | Node's built-in `node:test`: viable, but needs a separate TS step. |
| Render / interaction tests | **Playwright** (as a dev dependency, version pinned to whatever the environment provides) | Needed for T05–T07: real WebGL, SVG vs. scene comparison, proof-sheet capture. | Headless-gl in Node: unreliable parity with real browsers. |
| 3D | **three**, exact version pinned at install | Required by D-009. | — |
| UI framework | **None** | Not justified yet; the editor shell is small. Revisit only with a dedicated decision. | React/Svelte: adds a dependency with no current requirement. |
| Geometry library | **None for T02–T04**; own curve/contour code | Exact snapshot import, stable IDs and "no silent repair" need full control. Flattening error must be measured and reported. | Paper.js / Clipper: may be considered later for boolean ops (0.8 overlap); would need its own decision. |

Exact package versions are chosen and pinned in the lockfile when T02 runs `npm install`; this report deliberately does not fix version numbers in advance.

## 4. Module boundaries

Proposed layout (new files only; `prototypes/` is untouched):

```
package.json, tsconfig.json, vite.config.ts      # tooling (after D-011 confirmation)
src/
  core/                    # pure TS: no DOM, no three.js
    ids.ts                 # stable ID types and constructors
    schema/                # versioned canonical record types (glyph, variant, contour, segment, node, provenance, maturity)
    geometry/              # VectorGeometry: segments (line/quad/cubic), contours, flattening with error bound, bbox, area, winding
    legacy/                # v0.6 snapshot (verbatim strings + hash) and SVG-path → canonical importer (M/L/Q/Z)
    registry/              # GlyphRegistry: A–Z records, 5 authored-contour + 21 provisional
    topology/              # semantic graph overlay, counter/aperture/channel declarations (T03)
    validation/            # GlyphValidator + DiagnosticRunner, diagnostic codes from contracts (T04)
    commands/              # EditCommandBus: typed commands, expected revision, atomic apply, undo/redo patches (T07)
    svg/                   # SvgInterchange: canonical → SVG, report unsupported semantics (T05)
    project/               # ProjectSerializer: versioned JSON (T07 save/reload)
  editor/
    three/                 # ThreeEditorAdapter: stable-ID scene objects derived from canonical state (T05/T07)
    shell/                 # minimal HTML/TS application shell
tests/
  unit/                    # Vitest, Node
  fixtures/                # glyph/pair/word fixtures transcribed from contracts
  browser/                 # Playwright: renderer, SVG parity, interaction, proof capture
tools/
  extract-v06-snapshot.ts  # reads the prototype file, emits the snapshot + SHA-256
```

`StyleGrammarRegistry`, `CompositionSolver` and `RelationshipGraph` (responsibility map §7) are out of scope for 0.7A and are created in 0.7B/0.8A.

**Boundary rule:** nothing under `src/core/` may import `three` or touch the DOM. A Vitest test will scan `src/core/**` imports and fail on violations. That enforces D-003/D-010 without adding a lint dependency.

## 5. Ticket-by-ticket plan

| Ticket | Concrete first deliverable | Key risk |
|---|---|---|
| T02 Registry + import | Tooling scaffold; `tools/extract-v06-snapshot.ts`; canonical schema; importer for M/L/Q/Z; registry with `a/b/g/r/s.master` at `authored-contour`, 21 provisional; byte-exact snapshot test; serialize/deserialize ID round-trip test. | Extracting from minified HTML: parse the `M`/`F` object literals with a strict, tested pattern, failing loudly if the source changes. |
| T03 Semantic overlay | Component proposals per the A/B/G/R/S spec; `provisional-unmapped` where ambiguous; G aperture state classified or `interpretation-required`. | Mapping components onto polygon edges without guessing. |
| T04 Validator | Closure, degeneracy, self-intersection, planar topology, negative-space connectivity; uncalibrated checks reported as `calibration-required`. | Robust segment intersection on curves: flatten with a recorded tolerance, report approximation error. |
| T05 Renderer | One derived triangulation feeding Three.js; SVG from the same canonical revision; light/dark background tests proving real holes. | Triangulating holes correctly (three's `ShapeUtils`/`Shape.holes` vs. own earcut call): verify against the validator's topology. |
| T06 Proof sheets | Playwright-captured plates with a manifest (revision, versions, seed, hashes); pair/word fixtures marked partial. | Pixel output varies across GPUs; hash canonical geometry and manifests, store images as evidence, not as equality checks. |
| T07 Command loop | Selection by stable ID; preview, commit, reject; undo/redo; save/reload. Per AUD-02, all geometry-changing parameters stay disabled until calibrated. | Picking an operation that is legitimately enabled. A non-geometric, already-specified operation (e.g. glyph placement/transform in the project) may be the only honest candidate. **Owner/spec confirmation needed.** |

## 6. Open questions for the owner

1. **D-011 tooling**: confirm TypeScript + Vite + Vitest + Playwright, with no UI framework. Without confirmation T02 cannot add `package.json`.
2. **Source location**: is a top-level `src/` acceptable, or should production code live under a versioned folder (e.g. `engine/0.7/`) to mirror the prototype-versioning rule (D-007)? Recommendation: top-level `src/` with git tags per build; D-007 is satisfied because `prototypes/` stays untouched.
3. **T07 operation**: which single edit may be enabled before any parameter is calibrated (see §5)?

## 7. Acceptance check for T01

| Criterion (ticket pack) | Result |
|---|---|
| Plan names actual paths and existing tooling | Yes: §2 lists what exists (nothing beyond docs, contracts and one HTML file); §4 names new paths. |
| No framework or test runner assumed without repository evidence | Yes: none exists; tooling is a *proposal* (§3) awaiting confirmation. |
| No v0.6 source file overwritten | Yes: only `docs/` files were added or edited in this ticket. |
| Conforms to D-009 and the responsibility map | Yes: canonical core is Three.js-free; Three.js is the editor adapter; all edits go through `EditCommandBus`. |

**Next ticket:** 0.7A-T02, blocked on D-011 confirmation.

## 8. T02 progress report (2026-11-14)

**Status: complete for the registry/import scope.** A first Three.js diagnostic viewport was added ahead of T05 so the canonical data can be inspected in the real editor surface; it draws outlines only and makes no negative-space claim.

### Files
- `package.json`, `package-lock.json`, `tsconfig.json`, `vite.config.ts`, `index.html`, `.gitignore`
- `tools/v06-extract.ts`, `tools/extract-v06-snapshot.ts`, `tools/winding-report.ts`
- `src/core/schema/types.ts` — schema 1.0 with documented deviations (nullable uncalibrated metrics, `unclassified` contour role, stable segment IDs, `apertureStatus`)
- `src/core/geometry/path.ts` — strict M/L/Q/Z parser and byte-exact formatter
- `src/core/geometry/measure.ts` — exact signed area (line/quadratic/cubic) and exact quadratic bounds
- `src/core/legacy/v06-snapshot.ts` (generated), `src/core/legacy/import.ts`
- `src/core/registry/registry.ts`, `src/core/registry/serialize.ts`
- `src/editor/main.ts`, `src/editor/three/glyph-scene.ts`
- `tests/unit/*.test.ts`

### Pinned dependencies
`three` 0.187.0; dev: `typescript` 7.0.2, `vite` 8.3.8, `vitest` 5.1.0, `@types/three` 0.187.0, `@types/node` 22.20.5. Playwright is not yet a project dependency; browser checks used the environment's pre-installed Playwright and are not yet committed tests (planned for T05).

### Tests run
- `npm test`: 4 files, 23 tests, all passing — snapshot equals a fresh extraction of the untouched prototype (SHA-256 checked); byte-exact parse→format round trip for all 26 glyphs; strict rejection of unsupported commands; A–Z maturity inventory (5 authored-contour, 21 provisional); master-only variants; counter declarations A1/B2/R1, none for G/S; G aperture `interpretation-required`; no calibrated metrics invented; provenance on every glyph; deterministic import and serialisation; duplicate-ID and schema-version rejection; exact area against numerical integration (quadratic and cubic); `src/core` free of three.js, DOM and Node imports.
- `tsc --noEmit`: clean. `vite build`: succeeds (single chunk ≈ 500 kB because of three.js; code splitting deferred).
- Headless Chromium (1280×800 and 390×844): 26 glyph objects, 35 line loops (26 outer + 4 authored counters + 5 provisional extra subpaths), stable glyph IDs on scene objects, clicking G and A shows the correct canonical record, no page or console errors (only SwiftShader ReadPixels performance warnings caused by screenshotting).

### New finding for T04/T05 (measured, exact signed area, +y down)
| Glyph | Contours (role: winding) |
|---|---|
| A | outer: cw · counter: **cw** |
| B | outer: cw · counters: ccw, ccw |
| R | outer: cw · counter: ccw |
| D | outer: **ccw** · subpath 2: cw |
| O, P | outer: cw · subpath 2: ccw |
| Q | outer: cw · subpath 2: ccw · subpath 3 (tail): **cw, overlapping the outer** |

Consequences: A's counter only appears because v0.6 uses `evenodd`; under `nonzero` it would be filled. The renderer must derive holes from the validated topology (declared counters / planar analysis), never from winding alone. Q's tail is a second, overlapping filled shape, so Q is not a single simple contour plus counter; T04 must report the overlap rather than union it silently.

### Not done / deferred
- No semantic components (T03), no validator (T04), no filled rendering (T05), no editing (T07).
- Display polylines in the viewport sample curves at 16 steps for drawing only; canonical data stays exact.
