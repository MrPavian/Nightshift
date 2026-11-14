# NIGHTSHIFT 0.7A — Claude Implementation Ticket Pack 01

**Status:** Ready for implementation planning  
**Audience:** Claude coding agent  
**Prerequisite:** Read `docs/CLAUDE_IMPLEMENTATION_BRIEF_0_7.md`, `research/ABGRS_GLYPH_CONSTRUCTION_IMPLEMENTATION_SPEC_01.md`, `research/SPECIFICATION_INTEGRATION_AUDIT_01.md`, and the linked JSON contracts.  
**Scope:** First A/B/G/R/S import and monochrome editor foundation.  
**Non-goal:** This packet does not claim that any ticket is implemented.

## Delivery rules

- Preserve Build 0.6 as an immutable reference.
- Work in dependency order; do not start a later ticket while an earlier hard gate is failing.
- Every persistent edit flows through the canonical model and typed command pipeline.
- Do not invent parameter bounds, geometry tolerances or anchor coordinates.
- Do not silently repair source geometry.
- Keep maturity at `authored-contour` until the documented human review gates are met.
- Each ticket must report files changed, tests run, exact results, known limitations and deferred work.

## Ticket 0.7A-T01 — Repository/runtime reconnaissance

**Goal:** Establish the actual production implementation environment before selecting libraries or build tooling.

**Tasks**
- Inspect repository structure, package/build setup, current prototype boundaries and existing tests.
- Identify the intended application entry point and current Three.js usage.
- Confirm how the existing v0.6 source is preserved and referenced.
- Propose module boundaries for registry, geometry, topology, validation, commands, editor adapter, SVG and persistence.
- Record dependencies and trade-offs before adding packages.

**Acceptance**
- A concise implementation plan names actual paths and existing tooling.
- No framework or test runner is assumed without repository evidence.
- No v0.6 source file is overwritten.
- Architecture conforms to D-009 and the responsibility map.

**Deliverable:** reconnaissance report and implementation plan.

## Ticket 0.7A-T02 — Canonical glyph registry and legacy snapshot import

**Depends on:** T01.

**Goal:** Load the five existing custom glyphs as canonical records without changing their source geometry.

**Tasks**
- Create versioned glyph registry records for A/B/G/R/S.
- Import exact outer/inner path data and retain a source snapshot/hash.
- Create only master variants: `a.master`, `b.master`, `g.master`, `r.master`, `s.master`.
- Add stable glyph, variant, contour, segment and node IDs.
- Add provenance, revision and maturity fields.
- Record A/B/R inner contours as provisional counters; S as no counter; G aperture as classified only if topology analysis proves exterior connectivity, otherwise `interpretation-required`.
- Keep the other 21 letters provisional; do not fabricate authored masters.

**Acceptance**
- Imported path strings match the source snapshots exactly.
- Import is deterministic and repeatable.
- No source path is normalized, repaired or simplified in place.
- Stable IDs survive serialize/deserialize.
- Maturity remains `authored-contour`.
- G is not assigned a synthetic counter or unproven aperture boundary.

**Deliverable:** registry/import module, migration test and import report.

## Ticket 0.7A-T03 — Semantic graph overlays and topology declaration

**Depends on:** T02.

**Goal:** Attach provisional semantic component proposals without altering legacy geometry.

**Tasks**
- Add the A/B/G/R/S component proposals from the glyph-specific construction spec.
- Link components to contour/segment IDs only where mapping is unambiguous.
- Mark ambiguous mappings `provisional-unmapped`.
- Declare required connectivity and identity invariants.
- Distinguish counters, apertures and channels in the schema and diagnostics.
- For G, support an explicit unresolved classification and report why the aperture is not yet proven.

**Acceptance**
- No semantic mapping silently changes contour coordinates.
- Required components have stable IDs.
- A/B/R counter counts match the imported source.
- G aperture state is either geometrically classified or explicitly unresolved.
- S has no enclosed counter in the master.
- Identity/topology reports are structured and traceable to affected IDs.

**Deliverable:** semantic graph adapter, topology declarations and per-glyph reports.

## Ticket 0.7A-T04 — Geometry validator vertical slice

**Depends on:** T02 and T03.

**Goal:** Execute the declared validation pipeline on imported glyphs.

**Tasks**
- Implement schema/reference integrity, contour closure, degeneracy, self-intersection and planar topology checks.
- Implement negative-space classification and connectivity signatures.
- Add measured bounds/areas/clearances where computable, retaining units and approximation error.
- Keep uncalibrated threshold checks in a distinct unresolved/calibration-required state.
- Implement the diagnostic codes from the contracts.
- Reject invalid candidate edits atomically; import diagnostics must not mutate source snapshots.

**Acceptance**
- Valid and invalid fixtures cover all five glyph topology cases.
- G unresolved aperture is not falsely reported as a passing classified aperture.
- No silent repair or fragment deletion occurs.
- Diagnostics include code, severity, affected IDs, measurements where available and calibration status.
- Tests are deterministic.

**Deliverable:** validator module, unit/geometry fixtures and test report.

## Ticket 0.7A-T05 — Topology-correct monochrome renderer

**Depends on:** T04.

**Goal:** Render the same canonical topology consistently before any finish effects.

**Tasks**
- Build one derived render representation from validated vector topology.
- Ensure A/B/R counters reveal the actual underlying surface.
- Ensure G aperture reveals the underlying surface when classified; unresolved aperture must be visibly flagged in diagnostic mode.
- Ensure S has no phantom counter.
- Remove fixed paper-colour counter painting from the new renderer path.
- Keep fill, outline and SVG silhouette topology-consistent.
- Do not prioritize extrusion, chrome, drips or texture polish.

**Acceptance**
- Light and dark backgrounds show genuine negative space.
- Renderer and SVG use the same canonical revision and agree on silhouette.
- No render pass substitutes a background-colour patch for a hole.
- Invalid topology produces a structured failure/diagnostic, not a misleading render.

**Deliverable:** monochrome renderer, SVG comparison tests and captured proof artifacts.

## Ticket 0.7A-T06 — Neutral proof sheets and review package

**Depends on:** T03, T04 and T05.

**Goal:** Produce reproducible evidence for human review, without auto-promoting glyph maturity.

**Tasks**
- Generate neutral silhouette and semantic/topology diagnostic plates for A/B/G/R/S.
- Include stable specimen IDs, source revision, generator/validator/renderer versions, seed and artifact hashes.
- Add canonical pair fixtures AV, AR, BA, BR, GO, GR, RA, RO, SA, SB, GS, NS.
- Add canonical word fixtures ABRA, BOMB, GHOST, KRAZE, MIND, NYX, RISK, SQUE.
- Mark mixed fixtures partial wherever provisional letters appear.
- Capture review status separately from automated pass/fail.

**Acceptance**
- Identical canonical inputs and pinned render settings reproduce specimen identity and canonical geometry.
- All proof outputs link to a manifest and validation report.
- No generated sheet automatically changes maturity.
- Human reviewer can record pass/fail, score, rationale and defects.

**Deliverable:** proof run manifest, fixture runner, proof artifacts and review report.

## Ticket 0.7A-T07 — First end-to-end editor command loop

**Depends on:** T02–T05; only calibrated operations may be enabled.

**Goal:** Prove one supported structural edit from Three.js interaction through canonical state and back.

**Tasks**
- Bind visible glyph/component selection to stable canonical IDs.
- Implement transient preview and typed command submission.
- Use expected revision and atomic validation.
- Rebuild derived scene state from committed canonical state.
- Implement undo/redo through canonical patches.
- Keep all uncalibrated parameter controls disabled/non-committing.
- Do not use direct Three.js mesh mutation as persistence.

**Acceptance**
- One approved operation can be previewed, committed, rejected and undone/redone.
- Stale revisions reject without changing canonical state.
- Rejected preview restores the committed scene.
- Save/reload preserves canonical geometry and IDs.
- Camera, zoom and lighting do not dirty artwork.

**Deliverable:** live editor interaction demo and transaction tests.

## Ticket dependency order and release gate

`T01 → T02 → T03 → T04 → T05 → T06 → T07`

T07 may be prototyped earlier only if it does not bypass the canonical model or validator; it cannot be called complete until its dependencies pass.

**0.7A first-slice release gate:** imported editable monochrome A/B/G/R/S, topology-correct negative space, stable IDs, structured diagnostics, deterministic proof artifacts and at least one complete validated Three.js edit loop. If any part is missing, report a partial milestone.

## Claude completion report

For each ticket, return:
- status: not started / partial / complete / blocked;
- implementation files and modules;
- tests run and pass/fail counts;
- proof artifact references and hashes;
- known defects and calibration gaps;
- maturity state per glyph;
- exact next ticket.

Never report a ticket complete from compilation alone.

## Execution status

| Ticket | Status | Report |
|---|---|---|
| T01 | complete (report) | `docs/IMPLEMENTATION_PLAN_0_7A.md` |
| T02 | complete (registry/import scope) + early Three.js diagnostic view | `docs/IMPLEMENTATION_PLAN_0_7A.md` §8 |
| T03–T07 | not started | — |
