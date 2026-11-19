# Decision Log — NIGHTSHIFT

This is the current record of explicit project direction and architecture decisions. Add dated entries when a meaningful decision is made. Do not silently reverse these decisions.

## D-001 — New York setting
**Decision:** The wider graffiti crew simulator uses a New York setting.  
**Implication:** Environmental references, scene design and cultural research should be grounded in NYC and its boroughs, while avoiding generic movie stereotypes.

## D-002 — Isometric, grounded game presentation
**Decision:** The wider game is intended to use an isometric view and a realistic, restrained representation of urban spaces.  
**Implication:** The art engine must work as a blackbook editor first and later support artwork presentation in believable game environments.

## D-003 — Hybrid graphics architecture
**Decision:** Use SVG/vector geometry as the source of truth and Three.js for 3D presentation.  
**Implication:** Geometry editing and generation must not depend on the Three.js scene.

## D-004 — Historical style foundation
**Decision:** Graffiti style development should be historically informed.  
**Implication:** Do not reduce styles to arbitrary presets. Document sources, periods, locations and uncertainty.

## D-005 — Letter-first development priority
**Decision:** Prioritize authentic letter construction over visual effects and feature breadth.  
**Implication:** Build 0.7 focuses on glyph quality, metrics, counters and style-specific structure.

## D-006 — Four generated concepts
**Decision:** The Generate action should return four concepts.  
**Implication:** Variants must differ structurally and be reproducible from stored seeds/parameters; cosmetic recolors do not count as distinct concepts.

## D-007 — Preserve version history
**Decision:** Keep versioned prototype files in the repository.  
**Implication:** Do not overwrite the last known-good standalone prototype when adding a new build.

## D-008 — Original fictional assets
**Decision:** Use original fictional marks and assets in the game world rather than real-world brand logos, copied signatures or recognizable branded packaging.  
**Implication:** Keep cultural atmosphere through architecture, surface, local detail and original graphic language.

D-009 — Claude-led Three.js generator implementation
**Decision:** The production generator implementation will be developed with Claude, with Three.js as an integrated part of the generator rather than as a separate wall-preview add-on. The current standalone HTML prototype is a reference/prototype, not the target implementation architecture.
**Implication:** Research and specifications should define behavior, geometry, data contracts and acceptance criteria; Claude will implement the generator. Do not spend effort building another HTML/JSON-only generator as the final product. HTML may still serve as an application shell and JSON may still serve as a project/data format where useful, but neither is the generator architecture by itself. Three.js should participate in the actual interactive composition/rendering workflow. Preserve editable vector geometry and SVG export/interoperability unless a later decision changes that requirement.


D-010 — Canonical semantic/vector model with integrated Three.js editor
**Decision:** The canonical source of truth is the semantic/vector project model, including glyph structure, editable geometry, topology, metrics, anchors, variants and composition relationships. Three.js is the live interactive editor and spatial renderer; its scene objects and meshes are derived and all edits commit through typed, validated commands. SVG is an interchange/export format, not the sole canonical model.
**Clarification:** This qualifies the earlier wording in D-003. “Vector geometry is canonical” means editable vector geometry inside the canonical semantic project model; it does not mean an SVG document or transient Three.js mesh is the whole project model. D-009 remains in force.

D-011 — Browser-native module stack for the 0.7 production code
**Decision:** Production code is written as plain ES modules (JavaScript with JSDoc), runnable unchanged in the browser and in Node. Tests use Node's built-in runner (`npm test`). The canonical model (`src/core`, `src/geometry`, `src/glyph`) has no runtime dependencies and no DOM/Three.js imports. Three.js is added as a pinned npm dependency confined to `src/editor/` when the editor tickets (0.7A-T05/T07) start; a dev server/bundler is proposed with that ticket.
**Implication:** Legacy v0.6 geometry is consumed only through the generated, hash-verified snapshot `data/legacy/v06-glyph-paths.json` (`npm run extract:v06`). Any new dependency needs a documented reason first. See `docs/IMPLEMENTATION_PLAN_0_7A.md`.

D-012 — Three.js dependency and no bundler for 0.7A
**Decision:** Three.js is a pinned npm dependency (`three@0.187.0`, exact version in `package.json`/`package-lock.json`). It is imported only from `src/editor/`. Browser pages resolve the bare `three` import with an import map pointing at `node_modules/three/build/three.module.js`; no bundler or dev-server dependency is added. Headless-Chrome tooling (`tools/lib/headless.mjs`) serves the repository with a minimal built-in Node static server.
**Implication:** The canonical model, validator and SVG renderer stay dependency-free. A bundler is reconsidered only when the editor application (T07) needs production packaging. The v0.6 prototype keeps its own CDN import of three@0.160.0 and is unaffected.

D-013 — First enabled editor operation: `contour.move-node`
**Decision:** The first operation enabled in the editor is `contour.move-node`, which moves one on-curve contour node of an editable authored master (A/B/G/R/S). It has no numeric parameter bounds; a candidate is accepted only if it passes every hard check of the geometry validator (closure, degeneracy, certified intersections, containment, counter enclosure, identity checks that geometry can decide). All parameter operations from `contracts/glyph-parameter-contract.v1.json` stay registered but disabled until calibrated, as ticket 0.7A-T07 requires. Provisional reference-only glyphs cannot be edited.
**Implication:** Edits record a `deliberateChanges` entry and a new revision; reviews tied to the old geometry hash become stale automatically. Clearance is still measured but not enforced (no calibrated thresholds), so a move can make walls thinner without being rejected. The owner may revoke or restrict this operation before calibrated parameter operations exist.
**Status:** confirmed by the project owner on 2026-11-15, including the known gap that wall thickness is not enforced until clearance thresholds are calibrated.


## D-014 — Creator-first graffiti studio
**Decision:** NIGHTSHIFT's editor is a creator-first generative graffiti studio with progressively deeper authoring levels. The default journey is name → creative brief → four structurally distinct proposals → selection → refinement → save/export/game artwork. The virtual-writer metaphor describes a deterministic, research-informed system of glyph knowledge, grammar rules, composition strategies, validated operations and user-authored preferences.
**Implication:** Keep practice/activity, artwork form, letterform grammar, composition grammar, surface/format, user priorities and rendering/finish as independent axes. Creator is the novice entry level; Studio supports refinement; Writer Lab supports full authoring. Tag requires gesture-based handstyle construction and must not be simulated by shrinking a piece font. Throw-up is not synonymous with Bubble; Piece is not one style; Burner is an evaluative descriptor; Bombing is an activity/session context; Panel/Wholecar are surface formats. Unsupported capabilities must be reported honestly. The existing finite 1.0 scope and dependency order remain binding; C08 is scheduled after C02–C05 and before C07.
**Status:** owner-confirmed product direction, 2026-11-15. See [Creator-First Product Vision 01](NIGHTSHIFT_CREATOR_FIRST_PRODUCT_VISION_01.md), [Generator Knowledge Translation 01](../research/GENERATOR_KNOWLEDGE_TRANSLATION_01.md) and [Claude Ticket C08](CLAUDE_TICKET_C08_CREATOR_FIRST_STUDIO_01.md).

## D-016 — Early Creator 0.1 before C04/C05 (owner decision 2026-11-18)
**Decision:** The owner chose to bring a first, deliberately small Creator page forward instead of waiting for C04, C05 and C07. The page lets the user enter a word, pick an artwork form, a style, priorities and colours, get four proposals, choose one and export it as SVG, PNG or JSON for the game. It only offers what actually works.
**Context:** The owner sees the editor as a robot that is taught to make graffiti. A user should be able to enter a name, choose styles, priorities and colours, and pick from several proposals, with the option to co-design all the way to full manual authoring.
**Implications:**
- In Creator 0.1 the four proposals differ in word composition: spacing, slant, baseline, proportion and size rhythm. Glyph shapes come from the C03 style resolver.
- Per-letter variants and letter connections follow with C04. Editing follows with Studio/C05.
- Tag (HST-01) and Wildstyle are shown as unavailable, with a reason.
- Bombing is not offered as a style. Whether Tag goes into 1.0 is still an open owner question.
- C04 → C05 → C07 → C08 remain the plan. Creator 0.1 is replaced by the full C08 Creator, not extended in parallel.

## D-017 — Graffiti engine on letter skeletons for the Creator (2026-11-18)
**Decision:** After owner feedback that the C03 styles were „just thicker letters, not a style“, and an owner request to research graffiti alphabets and imitate the styles, the Creator now builds artwork with the graffiti engine. It follows the tutorial method: skeleton, then bars, then style moves (serifs, cuts, kicks, arrows, split bars), then fill and 3D.
**Implications:**
- Creator artwork comes from `src/style/skeletons.js` and `src/style/graffiti-engine.js`. Both are original constructions, not traced from any source.
- The editable glyph masters (C02) and the C03 resolver stay in place for the editor.
- Skeleton and master are not linked yet. This is a second geometry source and a deliberate interim step. The link (skeleton ↔ master, or generating the masters from skeletons) has to be settled with C04/C05.
- Research basis: `research/GRAFFITI_STYLE_MOVES_WEB_SURVEY_01.md`.
