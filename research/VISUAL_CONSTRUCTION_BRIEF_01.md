# Visual Construction Brief 01 — Evidence-led lettering and composition

**Audience:** Claude implementation agent  
**Purpose:** Translate the rights-aware research library into measurable construction and review requirements.  
**Status:** Design specification, not implemented functionality or an exhaustive historical survey.

## 1. Non-negotiable boundaries
- Do not copy or trace a recognizable artist's tag, signature, individual piece or protected photograph.
- Do not bundle archival images unless item-level permission/license covers the intended use.
- Use references to study broad principles. Record provenance and rights status in the visual reference database.
- Separate source observation, historical interpretation and NIGHTSHIFT design inference.
- Letter identity and topology outrank effects.
- A counter is enclosed negative space; an aperture opens to the exterior. Never fake either with a paper-coloured patch.
- Three.js is the live editor surface; canonical semantic/vector data remains authoritative.

## 2. Construction layers

### A — Glyph identity
Every glyph retains a recognizable skeleton before styling:
- principal stems and diagonals;
- bowls and shoulders;
- terminals and crossbars;
- counters and apertures;
- baseline/cap-height metrics;
- semantic component roles and stable IDs.

Style parameters may alter proportions within declared bounds, but must not silently erase identity-critical structure.

### B — Shape grammar
Represent style as parameterized construction rules, not post-render filters. Parameters include:
- width/height proportions;
- stem mass and width profile;
- corner radius/angularity;
- terminal treatment;
- bowl/shoulder tension;
- slant and directional bias;
- counter shape and clearance;
- aperture location and throat;
- extension/ornament attachment anchors.

Bounds may be glyph-specific. A single global slider is not assumed safe.

### C — Topology and negative space
Validate contour closure/winding, self-intersections, counter containment/clearance, aperture continuity, counter/aperture occlusion, inter-letter channel width, accidental merges and disconnected fragments. Diagnostics identify stable IDs and provide repair guidance where possible. All render layers consume the same validated topology.

### D — Pair and word composition
Relationships are explicit and typed:
- independent spacing;
- proximity without contact;
- controlled overlap;
- shared alignment/axis;
- connection/bridge;
- interlock;
- extension crossing another glyph.

Each relationship records glyph/component IDs, anchors, geometric validation and automatic/manual status. Decorative lines are never counted as joins.

Solver order:
1. place from metrics and baseline/cap-height;
2. generate candidate anchor relationships;
3. score legibility, rhythm and negative-space continuity;
4. reject topology-breaking candidates;
5. preserve manual overrides through deterministic regeneration;
6. explain accepted/rejected relationships.

### E — Surface constraints
Surface geometry influences placement, scale and composition, not the glyph skeleton. For subway-car studies, model seams, windows, doors, car ends and frame limits as explicit obstacles/regions. Support panel, multi-panel and whole-surface formats. Use fictional, non-trademarked environment geometry.

### F — Execution and rendering
Keep fill, outline, inline, highlight, shadow/depth, spray softness and optional wear separate from semantic construction. Rendering must not alter topology, identity, anchors or canonical geometry.

## 3. Grammar-specific criteria
These are broad, non-exclusive construction families, not universal historical definitions.

### Bubble / rounded letterform
- Rounded transitions are constructed into contours, not simulated only by blur.
- Avoid turning every glyph into the same inflated capsule.
- Counters remain legible at thumbnail scale.
- Curvature and width variation are letter-aware.
- Throw-up is a practice/form context, not merely a rounded-outline preset.

### Blockbuster / Straight Letter
- Prioritize recognition, strong block mass and coherent alignment.
- Make vertical/horizontal structure and terminals deliberate.
- Avoid generic geometric-font regularity; controlled irregularity is valid.
- Test at distance and against panel boundaries.
- Do not conflate letterform grammar with all large-scale or wholecar practice.

### Wildstyle / complex composition study
- Treat interlocking as a composition/relationship grammar, not an obligatory outline style.
- Connections/extensions have explicit anchors and validated geometry.
- Preserve an underlying readable skeleton.
- Keep negative-space channels intentional; prevent accidental tangencies and closed apertures.
- Support staged complexity.
- Do not reproduce signature devices from a named artist's individual work.

## 4. Three.js editor requirements
Expose selection by stable glyph/component ID, component bounds, anchor handles, counter/aperture overlays, pair relationship visualization, collision/clearance warnings and surface obstacle overlays.

Every edit must:
1. create a typed command referencing stable IDs;
2. validate against canonical constraints;
3. commit or reject atomically;
4. update the Three.js scene from committed state;
5. participate in undo/redo and persistence.

Camera, lighting, zoom and viewport overlays must not dirty geometry.

## 5. Required deterministic proof sheets

### Sheet A — Glyph anatomy
For each glyph: neutral silhouette, semantic component map, stems/bowls/terminals/anchors, metrics/bounds, counter/aperture classification, maturity/provenance.

### Sheet B — Negative-space stress
Light/dark/textured backgrounds, counter/aperture mask, clearance measurements, thumbnail/full-size views and topology failure fixtures.

### Sheet C — Pair relationships
Use AV, AR, BA, BR, GO, GR, RA, RO, SA, SB, GS, NS. Show independent baseline, candidate relationship, anchor IDs, overlap/intersection state, channel widths and accepted/rejected reason.

### Sheet D — Word rhythm
Use ABRA, BOMB, GHOST, KRAZE, MIND, NYX, RISK, SQUE. Show widths/spacing, baseline/cap-height, word silhouette, negative-space channels, overrides, seed and repeat result.

### Sheet E — Grammar comparison
Compare the same glyphs under Bubble, Blockbuster/Straight and Wildstyle composition study while holding rendering constant. Then hold geometry constant and vary rendering to prove separation.

### Sheet F — Surface constraints
Use fictional subway-car/panel geometry for single panel, multi-panel and whole-surface compositions. Show windows, doors, seams and end boundaries as obstacles. No real logos or copied historic artwork.

Every sheet includes build, schema, seed, glyph IDs, parameters and review status.

## 6. Acceptance criteria
- Glyph remains identifiable without effects.
- Counters/apertures have correct topology.
- No unintended self-intersection or accidental merge.
- Pair relationships are graph-backed and geometry-validated.
- No decorative bridge is reported as a real join.
- Word rhythm is measurable and repeatable.
- Surface constraints do not silently deform glyph skeletons.
- Rendering does not alter canonical geometry.
- Three.js selection/edit maps to stable IDs.
- Save/reload and deterministic seed reproduce canonical geometry.

A human must inspect proof sheets before a glyph is marked render-reviewed. Record reviewer, date, build, seed, outcome and defects.

## 7. First implementation slice
Do not expand the alphabet or add advanced paint effects first:
1. load A, B, G, R, S with maturity status;
2. display semantic/vector structure in Three.js;
3. select a component by stable ID;
4. edit one supported structural parameter;
5. validate topology and negative space;
6. commit/reject through canonical model command;
7. undo/redo;
8. export proof sheet and editable SVG;
9. save/reload and verify deterministic output.

## 8. Claude report
Report files/modules changed, model/command contract, tests and pass/fail counts, proof sheets, human review status, known defects and the next smallest vertical slice. Compilation or a static screenshot alone is not production readiness.


## 9. Handstyle subsystem cross-reference

Handstyles are a separate construction and interaction family, not a rounded / simplified Piece Generator mode. Use the evidence-led model in [HANDSTYLE_MOTOR_AND_VECTOR_MODEL_01](HANDSTYLE_MOTOR_AND_VECTOR_MODEL_01.md).

The canonical representation separates:
- user-authored name / glyph sequence;
- ordered structural motor plan with stable stroke IDs and explicit lifts;
- parametric stroke behaviour (width, opacity, curvature, speed profile);
- tool / substrate rendering (marker, aerosol, digital pen).

Do not infer a real writer's identity, trace named signatures, or use archival tags as presets. Preserve the distinction between recorded movement and inferred movement. Build deterministic vector strokes first; only then consider movement playback and more advanced motor models.

**Acceptance additions:** stable stroke IDs; explicit pen lifts; crossings distinct from joins; same-seed determinism; bounded seeded variation; marker/aerosol rendering that does not mutate canonical paths; SVG round-trip preserving path order and metadata.
