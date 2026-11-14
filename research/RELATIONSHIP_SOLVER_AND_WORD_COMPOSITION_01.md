# Relationship Solver and Word Composition Contract 01

**Status:** engineering design specification; not implemented functionality.  
**Scope:** pair relationships, anchor matching, overlap/interlock graph and whole-word validation.

## 1. Purpose and source boundary

This contract operationalizes the existing research dossier `LETTER_PAIR_CONNECTIONS_AND_WORD_FLOW.md`: proximity, scale rhythm, angle rhythm, connection opportunity, counter protection, occlusion, negative-space channel and flow continuation remain separate analysis dimensions. The source dossier explicitly says there is no universal historical pair rulebook; NIGHTSHIFT candidate rules are engineering hypotheses, not historical facts.

The solver proposes possible relationships. It must not treat every close pair as a connection or force a connection where deliberate separation works better.

## 2. Relationship types

| Type | Meaning | Implementation phase |
|---|---|---:|
| Open separation | Deliberate gap; no joining geometry | 1 |
| Near-touch | Contours approach but remain disjoint | 1 |
| Terminal-to-terminal | Compatible terminals meet or align | 1 |
| Bar continuation | Authored bars read as a continuation but retain source identity | 2 |
| Overlap | Contours overlap with explicit front/back order; no semantic merge implied | 2 |
| Extension bridge | Separate authored extension links declared roots; never a glyph stroke | 2 |
| Shared stroke | Two glyphs reference a shared semantic/vector component | 3 |
| Interlock | Multiple parts weave with explicit crossings and validated channels | 3 |

Store relationship type separately from the geometry used to realize it. A decorative arrow or bridge is not automatically a structural join.

## 3. Anchor model

An anchor is a semantic usable zone, not a point. Each anchor requires stable IDs for its glyph instance and variant, role/type, position, direction, usable zone, clearance profile, allowed relationship types, compatibility tags and source confidence.

Rules:
- Direction must be nonzero and normalized for comparison.
- Authored versus derived direction retains provenance.
- Allowed types and compatibility tags are explicit; no wildcard compatibility by default.
- Stable IDs survive regeneration unless the authored anchor identity changes.
- Anchors on provisional glyphs are advisory, not production-grade join authorization.

## 4. Candidate generation

For each adjacent pair:
1. Enumerate outgoing/incoming anchors.
2. Filter by each anchor's allowed relationship types.
3. Evaluate direction and position envelopes.
4. Construct a reversible candidate transform or relationship geometry.
5. Run local pair geometry/topology validation.
6. Store structured measurements and pass/fail reasons.

Do not use a 26×26 pair matrix as the sole compatibility source. Curated preferences may influence ranking but never bypass geometry validation. Candidate IDs must be deterministic from stable instance, anchor, type and solver-version IDs—not array position or random numbers.

## 5. Evaluation: hard gates and soft measurements

**Hard gates:** valid references; both anchors permit the type; transforms remain within constraints; no unintended collision; counters/apertures remain valid; calibrated channel clearance passes; crossing order is explicit; glyph identity remains intact.

**Soft measurements:** anchor position error, direction alignment, pair silhouette, scale rhythm, flow continuity and preferred negative-space rhythm.

Use a transparent vector of metrics or a declared lexicographic/weighted preference profile. Show component measurements and trade-offs. Never let a high soft score override a hard failure. Experimental combinations may be previewed with warnings but must not be silently promoted to supported.

## 6. Canonical relationship graph

The composition graph contains glyph instances, semantic components, anchors and extension components. Relationship edges store stable relationship ID, type, source/target anchor and instance IDs, geometry references, transform patch, occlusion order, status, solver version, validation report reference, user override and provenance.

Graph validation must reject dangling references, contradictory layer-order cycles and duplicate active edges where the anchor pair is not declared multi-edge capable. Extension bridges remain separate components. Shared-stroke relationships require shared semantic component references.

## 7. Pair-to-word solver

Run in stages:
1. Initialize glyph advances and transforms.
2. Propose adjacent-pair candidates.
3. Select pair relationships under local hard constraints.
4. Build the complete word relationship graph.
5. Check non-adjacent collisions and occlusion cycles.
6. Recompute channels and protected negative spaces across the whole word.
7. Evaluate word silhouette, rhythm and legibility as separate metrics.
8. Persist accepted edges and manual overrides reversibly.

A local edit invalidates relationships incident to the edited glyph and global checks affected by changed bounds/geometry. Preserve unrelated accepted edges when they still validate; report every invalidated edge.

## 8. Three.js interaction

Selecting an anchor or edge resolves to stable model IDs. Dragging previews an ephemeral candidate only. Pointer release emits one typed relationship command with expected composition revision. Manual accept/reject decisions persist as explicit overrides with rationale and are revalidated after dependent edits. Undo/redo replays canonical graph patches through the normal validator.

The viewport must explain why a candidate passed or failed, including affected anchors/components and measured metrics. Never persist direct mesh mutation, count a decorative bridge as a join, silently delete an override or mutate a glyph master to force a connection.

## 9. Staged implementation

**Phase 1 — Safe adjacency:** open separation, near-touch and terminal-to-terminal. Build anchor candidates for A/B/G/R/S and pair proof sheets.

**Phase 2 — Controlled overlap:** bar continuation, overlap and extension bridge. Requires explicit occlusion order, extension semantic components and whole-word collision/channel checks.

**Phase 3 — Advanced weaving:** shared strokes and interlock. Requires shared component graph, planar topology/crossing validation, human visual review and experimental grammar gate.

Do not start Phase 3 until the geometry validator and first five glyphs have passed the required review gates.

## 10. Diagnostics and tests

The machine-readable contract defines stable relationship diagnostic codes. Implement tests for intentional separation, near-touch without false merge, compatible terminals, direction mismatch, counter occlusion, G aperture closure, bar continuation, independent extension bridge, overlap order, non-adjacent collision, occlusion cycle, local-edit invalidation, deterministic candidates and undo/redo.

## 11. Acceptance criteria

- Candidate pairs derive from anchors and context, not a hardcoded pair table.
- Deliberate open separation is a valid explicit choice.
- Relationship type is separate from geometric realization.
- Every accepted edge has stable IDs and a validation report.
- Decorative bridges are never counted as true glyph joins.
- Hard topology/identity constraints outrank soft composition preferences.
- Pair decisions are checked again in whole-word context.
- Three.js editing commits typed commands to canonical graph patches.
- Manual overrides survive save/load and are revalidated after dependency changes.
- Phase 1 works before shared strokes and interlocking are attempted.

This is a specification, not an implemented solver.
