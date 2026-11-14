# HANDSTYLE PROOF SHEET SPEC 01

Status: implementation-ready design contract  
Subsystem: NIGHTSHIFT handstyle / motor-plan layer  
Depends on: canonical project model and command loop (C01 / issue #4)  
Related: HANDSTYLE_MOTOR_AND_VECTOR_MODEL_01.md, VISUAL_CONSTRUCTION_BRIEF_01.md

## Purpose

Prove that NIGHTSHIFT can represent, edit, render and vary a handstyle as an ordered performed stroke plan, rather than treating it as a font with random distortion. This is a small engineering proof, not a finished graffiti-style generator and not a reconstruction of any named writer.

## Research basis

AutoGraff describes a movement-centric model: shape is generated from a dynamic movement model, with structural stroke plans and parametric stroke primitives. Its 2015 tag-stroke paper specifically argues that movement dynamics contribute strongly to stylistic quality and describes interactive construction, curve reconstruction and controlled variation. The 2019 Sketching and Layering Graffiti Primitives paper adds fold-aware stylisation and non-global layering/self-overlap in vector output.

NIGHTSHIFT should borrow the separable representation and testable rendering ideas, not copy AutoGraff's complete Sigma-Lognormal implementation. The first proof should use deterministic geometric primitives and explicit stroke order.

## Proof scope

Use only abstract test glyphs and synthetic stroke paths. No real writer names, signatures, archival traces, or identifiable pieces.

### Test glyph set

- I: one vertical stroke; baseline control for width, slant and cap behaviour.
- L: two strokes with an explicit lift; tests sequencing and corner handling.
- S: one continuous curved stroke; tests curve handles and pressure/width profile.
- A: two diagonals plus crossbar; tests explicit crossings and layering.
- R: stem, bowl and leg; tests mixed curve/line construction and overlap order.

These glyphs are engineering fixtures, not a proposed style alphabet.

## Canonical data contract

Each stroke has a stable ID and an ordered list of geometric samples/segments. A stroke records:
- id
- glyphId
- order
- segments (line / quadratic / cubic)
- startCap, endCap
- widthProfile (normalised samples, not a baked mesh)
- toolProfileId
- liftBefore (explicit pen/tool lift)
- layerGroup
- optional timingProfile (reserved; not required for first proof)

The glyph records its advance width, baseline, x-height, bounding box and ordered stroke IDs. The project owns a deterministic seed and a versioned style parameter object.

Do not encode crossings as joins. A crossing is a relationship between strokes plus an explicit draw/layer order. Do not infer a pen lift from a geometric gap when the user can represent it explicitly.

## Minimal editable parameters

- global slant
- glyph width / proportion
- stroke width
- width-profile intensity
- spacing
- stroke order
- connection policy (none / explicit)
- controlled variation amount
- tool profile (round marker / chisel marker / aerosol-outline proxy)

For the first proof, tool profiles change rendering only; they must not rewrite canonical centreline geometry.

## Required interaction sequence

1. Load the fixture project containing I, L, S, A and R.
2. Select one stroke by stable ID.
3. Edit a control point or width-profile sample through a typed command.
4. Preview without mutating canonical state.
5. Commit against the expected project revision.
6. Undo and redo the exact patch.
7. Save, reload and verify IDs, stroke order, geometry and seed.
8. Change camera, zoom and lighting; verify the artwork revision remains unchanged.

This must use the same canonical command path as other NIGHTSHIFT editing. No special direct mesh mutation path.

## Proof sheets / evidence artifacts

Produce six deterministic sheets (SVG preferred, PNG preview optional):

1. 01-STRUCTURE — each fixture glyph with stroke IDs and order labels.
2. 02-MOTOR-PLAN — centreline paths, direction arrows, explicit lifts and control points.
3. 03-WIDTH-PROFILE — same path with constant width vs sampled width profile.
4. 04-CROSSING-LAYERS — A and R with crossing order and non-global overlap shown clearly.
5. 05-SEEDED-VARIATION — one fixture rendered with seed 17, 42 and 73; variation bounded and repeatable.
6. 06-ROUNDTRIP — before/after SVG export-import overlay and machine-readable equality report for canonical geometry.

Every sheet must state build/fixture version and seed where applicable. The sheets are evidence, not decorative marketing art.

## Acceptance criteria

- Same fixture + same parameters + same seed produces byte-stable canonical geometry and visually identical output.
- Different seeds vary only the explicitly permitted parameters and remain inside declared bounds.
- Stroke IDs and order survive edit, undo, redo, save/reload and SVG round-trip.
- Explicit lifts remain lifts; crossings remain crossings; neither is silently converted to a join.
- Width-profile edits do not alter centreline coordinates.
- Tool-profile changes do not alter canonical geometry.
- Preview cancellation leaves the project revision and canonical hash unchanged.
- Invalid edits and stale revisions reject atomically.
- Camera, zoom and lighting do not dirty the artwork.
- Node and browser tests cover the same fixtures and command semantics.

## Suggested implementation order

1. Fixture schema and deterministic fixture generator.
2. SVG centreline renderer with constant width.
3. Sampled width-profile renderer.
4. Stroke selection and typed control-point edit.
5. Preview / commit / undo / redo via canonical commands.
6. Explicit crossing and layer-order rendering.
7. Seeded bounded variation.
8. Save/reload and SVG round-trip tests.
9. Six proof sheets and completion report.

## Explicit non-goals

- Full Sigma-Lognormal motor-control simulation.
- Learning a named writer's style.
- Importing or scraping archival images.
- Automatic inference of identity or authorship.
- Any guidance for real-world tagging, access, evasion or illegal placement.
- A full alphabet or polished production preset library.

## Completion report

Record commit SHA, changed files, exact test commands and totals, fixture version, proof-sheet paths, canonical hash comparisons, passed/failed criteria, and known limitations. Do not mark complete based only on screenshots.
