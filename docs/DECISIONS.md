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

