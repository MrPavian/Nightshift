# Capability matrix 01 — repository reconciliation for C08

**Date:** 2026-11-15. **Purpose:** the mandatory first action of C08 (`docs/CLAUDE_TICKET_C08_CREATOR_FIRST_STUDIO_01.md`): what actually exists, measured against the Creator-first vision (D-014).
**Basis:** main at `af1a956` (including `CLAUDE.md` and the archive styleguide), plus the open branches named below. Each row is judged by code and tests, not by documents.

**Status categories:**
- **tested:** implemented and covered by automated tests or proofs.
- **branch:** implemented and tested on an unmerged branch.
- **spec:** specified in `docs/`, `research/` or `contracts/`; no production code.
- **unavailable:** neither implemented nor fully specified for 1.0.

## Engine and editor

| Capability | Status | Evidence |
|---|---|---|
| Canonical glyph registry, hash-verified v0.6 import (A–Z) | tested | `src/glyph/`, `tests/glyph-registry.test.js` |
| Semantic component overlays A/B/G/R/S | tested | `src/glyph/semantic-overlay.js`, `data/semantic/` |
| Geometry/topology validator (closure, intersections, counters, identity) | tested | `src/glyph/validate-geometry.js`, `tests/geometry-validator.test.js`, T04 report |
| Topology-correct SVG and Three.js renderer (monochrome) | tested | `src/render/`, `src/editor/three-glyph.js`, T05 |
| Proof sheets, review page, review records | tested | `src/proof/`, `review/`, T06 proof |
| Editor command loop: `contour.move-node`, preview/commit/reject, undo/redo, save/load | tested | `src/model/`, `editor/`, T07 proof |
| Editor responsiveness on hard drags (fix for the reported phone freeze) | branch `claude/fix-editor-freeze` | `tools/editor-perf.mjs`: 4,312 validations, worst 177 ms (previously up to 37 s); editor self-test steps `farDragKeepsGlyph` and `burstCoalesced` |
| Authored masters A, B, G, R, S | tested (geometry); **human review pending** | `docs/reports/proof/T06/review/` |
| Authored masters C, D, O, P, Q (C02 wave 1) | branch `claude/c02-wave1-cdopq`, PR #6 | waiting for owner design approval |
| Authored masters for the other 16 letters (C02 waves 2–4) | unavailable | still provisional v0.6 bases (`reference-only`) |
| Parameter operations (width, weight …) | spec, registered **disabled** | `contracts/glyph-parameter-contract.v1.json`; not calibrated (D-013) |
| Letterform grammars Bubble / Straight / Block (C03) | spec | `contracts/az-style-grammar-application.v1.json`, `research/STYLE_GRAMMAR_*` |
| Composition grammars, relationship solver, anchors (C04) | spec | `contracts/relationship-solver.v1.json` |
| Deterministic four-concept generator with diversity contract (C04) | spec | `contracts/procedural-variant-generator.v1.json` |
| Blackbook/artwork project model, branches, export (C05) | spec; only glyph-store save/load exists | `contracts/creative-workflow.v1.json` |
| Creative brief with independent axes (C08-A) | spec | `contracts/creative-workflow.v1.json`; product vision §3 |
| Rendering finish: fill, outline, inline, palette | unavailable | monochrome only |
| Tag / handstyle (gesture-based) | spec (HST-01, issue #5) | must stay "study/unavailable" (vision §3) |
| Bombing as activity/session, Characters, full Wildstyle interlocking | unavailable | deferred per vision §9 |

## Archive (C06)

| Capability | Status | Evidence |
|---|---|---|
| Blackbook archive, German edition: 28 entries, 111 claims, timeline, 5 paths, offline | branch `claude/c06-lexicon`, PR #8 | `docs/reports/C06_BLACKBOOK_ARCHIVE_REPORT.md`, `tools/archive-smoke.mjs` |
| Editor bridge 1.1.0, four verified capabilities with return link | branch `claude/c06-lexicon`, PR #8 | `docs/EDITOR_BRIDGE_CONTRACT_01.md` |
| Alignment with the 30-entry launch plan | partial: 8 plan entries missing | C06 report, alignment section |

## Consequences for the sequence (C02 → C03 → C04 → C05 → C08 → C07)

1. **C01** is complete. The phone freeze was a C01 defect and is fixed on `claude/fix-editor-freeze`. That branch should be merged first, because C02–C05 depend on the editor.
2. **C06** is complete as a package (PR #8). It is not merged; the owner's editorial and design approval is pending. Gap: 8 entries from the 30-entry plan.
3. **C02** is the next unfinished package.
   - Wave 1 is waiting for approval in PR #6.
   - Waves 2–4 (16 letters) are open and must be ready for every Creator name: the vision requires honest preflight feedback for unsupported letters (C08-A).
4. **C03–C05** have no code yet. They are built against the Creator-first axes:
   - Letterform grammar ≠ artwork form ≠ surface.
   - Throw-up ≠ Bubble.
   - Burner and Bombing are never grammars.
   - Palette never counts as structural diversity.
5. **C08** can only start with a real generator, after C04 and C05. Building the Creator view before that would produce exactly the mock-ups the vision forbids.

## Conflicts with documents added on 2026-11-15

These conflicts are open and need an owner decision; they are mirrored in `CLAUDE.md` §7.

- **Priority order.** Issue #9 sets the Creator-first order (C02 → C08). `CLAUDE.md` names the archive reference views as P1.
- **C06 UI vs. `BLACKBOOK_ARCHIVE_STYLEGUIDE_01.md`.** The C06 UI differs from the styleguide in five points:
  - light environment instead of dark ink with paper sheets;
  - one colour per entry type, which the styleguide forbids;
  - no monospaced metadata face;
  - 5 instead of 9 navigation sections;
  - no "Visual Archive" or "Tools & Materials" section.
- **C06 content vs. the German drafts 01–06 and `BLACKBOOK_ARCHIVE_CLAIM_SOURCE_MATRIX_01.md`.** Two parallel German content bases exist and must be merged.

## Addendum — 19 November 2026 (resolver 1.1, Issue #24)

This addendum updates single rows; the rest of the matrix keeps its 15 November baseline.

| Capability | State | Evidence |
|---|---|---|
| Letterform grammars Bubble / Straight / Block (C03) | implemented subset, uncalibrated (resolver 1.1.0, contract 1.2.0) | `src/style/resolver.js`, `tests/style-resolver.test.js`, proof runs `docs/reports/proof/style-library/phase-a-01/` (frozen) and `phase-a-02/` |
| Bubble counter safety | implemented: provisional reject-only floors (counter area ≥ 40 %, opening ≥ 60 % of the neutral master); every candidate logged with reason codes; aperture throat not evaluable | `src/style/negative-space.js`, `tests/style-safety.test.js` |
| Bounce collision safety | implemented: transformed-contour contact test (intersection / tangency / too-close / safe / authorised overlap), deterministic step-to-safe fallback, placement report; overlap only via declared relationship | `src/style/render.js` (`layoutWordWithReport`), `tests/style-safety.test.js` |
| Letter connections / relationship solver (C04) | not implemented | Bounce avoids contact; it does not design joins |
