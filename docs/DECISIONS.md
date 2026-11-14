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

