# Generator System Responsibility Map

**Status:** Architecture and implementation interface specification for Claude  
**Applies to:** NIGHTSHIFT production generator with integrated Three.js interaction  
**Related decisions:** D-003, D-005, D-009  
**Canonical principle:** semantic glyph data and editable vector geometry are authoritative; Three.js is an integrated interaction/rendering environment whose edits are committed back to canonical model state.

## 1. Resolve the apparent architecture tension

The original architecture decision D-003 states that SVG/vector geometry is the source of truth and Three.js is used for 3D presentation. The later owner decision D-009 requires Three.js to be integrated into the actual generator workflow, not limited to a detached preview.

These statements are compatible when responsibilities are explicit:

- **Canonical model:** semantic construction graph, editable vector geometry, glyph metrics, anchors, composition graph, style parameters and project data.
- **Three.js interaction surface:** live view, hit testing, selection, manipulation handles, scene-aware transforms, material/surface context, camera and spatial presentation.
- **Command boundary:** Three.js interactions emit edit commands against canonical model entities. The model validates and commits those commands. The renderer then reflects the committed result.
- **Derived representations:** SVG output, Three.js meshes, textures, thumbnails and diagnostic overlays are generated from canonical state.

Three.js is therefore a first-class part of the real editor workflow without becoming a competing, opaque source of truth. SVG is not the only semantic model, and Three.js is not merely a detached wall-preview pane.

## 2. System map

| Subsystem | Owns | Must not own |
|---|---|---|
| Glyph construction model | Semantic components, contours, counters, apertures, metrics, anchors, variants | Scene camera, lighting, wall mesh |
| Style grammar | Construction constraints, allowed variants, proportion/terminal/weight rules | Palette-only effects masquerading as style |
| Composition engine | Word layout, pair relationships, overlap graph, negative-space and legibility diagnostics | Destructive direct mutation of glyph masters |
| Three.js editor/runtime | Interactive viewport, picking, handles, spatial scene, material response, live rendering | Sole authoritative copy of glyph geometry |
| Vector geometry/export | Editable paths, contour topology, SVG serialization/import | Scene-specific camera or lighting state |
| Project persistence | Versioned snapshots, seeds, overrides, migration and autosave | Derived transient mesh buffers as only saved state |
| Diagnostics/test harness | Geometry validation, render comparisons, reproducibility and reports | Unmeasured quality claims |

## 3. Canonical data flow

```text
Project + Seed
    |
    v
Glyph Registry <---- Style Grammar
    |
    v
Glyph Instances
    |
    v
Composition Graph / Relationship Solver
    |
    v
Validated Canonical Vector + Semantic State
    |                         |
    |                         +----> Diagnostics / Test Harness
    |
    +----> SVG / Vector Export
    |
    +----> Three.js Scene Adapter
                 |
                 v
        Interactive Editor View
                 |
        User selects / drags / edits
                 |
                 v
          Edit Command
                 |
                 v
      Model Validation + Commit
                 |
                 +----> Updated canonical state
                 +----> Updated SVG/render output
                 +----> Project persistence
```

The Three.js view can be the main live editing surface. The command boundary ensures that each edit becomes a durable model operation rather than a mutation trapped inside a mesh.

## 4. Responsibility contracts

### 4.1 Glyph construction model

**Owns**
- Stable glyph IDs and variant IDs.
- Semantic component graph: stems, bars, diagonals, bowls, arcs, loops, legs, terminals and junctions.
- Explicit counter, aperture and channel semantics.
- Editable vector segments and contour topology.
- Base metrics and measurement metadata.
- Authored/derived anchors and clearance constraints.
- Glyph maturity, provenance and review records.

**Inputs**
- Glyph registry records.
- Authored master/variant definitions.
- Style grammar constraints where a style-aware construction is requested.

**Outputs**
- Validated glyph instances.
- Editable vector geometry.
- Semantic-to-geometry references.
- Validation issues.

**Must not**
- Read Three.js object transforms as canonical glyph metrics.
- Hide counters in raster textures.
- infer stroke order from a closed contour without explicit evidence/authoring.
- promote provisional glyphs to reviewed status automatically.

### 4.2 Style grammar

**Owns**
- Structural construction parameters and ranges.
- Permitted and discouraged operations.
- Terminal, corner, curvature and weight logic.
- Counter/aperture behavior constraints.
- Style-specific variant selection and composition preferences.
- Legibility trade-offs.

**Must not**
- Be a palette or outline preset with a style name.
- Claim a canonical historical recipe from a broad label.
- Override glyph identity invariants without declaring a separate variant.

The initial Bubble/Throw-up, Blockbuster, Straight Letter and Wildstyle study families need individual grammar documents and reference evidence before being called complete.

### 4.3 Composition engine / relationship solver

**Owns**
- Word-level advance and baseline layout.
- Neighbor candidate generation.
- Anchor-to-anchor relationship proposals.
- Overlap and occlusion ordering.
- Contour collision detection.
- Counter/aperture protection.
- Negative-space channels and pockets.
- Word silhouette and legibility diagnostics.
- Reversible relationship graph and local overrides.

**Inputs**
- Glyph instances and metrics.
- Anchor metadata.
- Style grammar constraints.
- User-approved transforms and overrides.

**Outputs**
- Composition graph.
- Proposed/accepted relationships.
- Layout transforms.
- Geometry diagnostics with measured values and warnings.

**Must not**
- Count a decorative bridge as a real join.
- mutate authored glyph masters when only a word instance needs adjustment.
- equate a heuristic score with a measured geometric property.

### 4.4 Three.js editor and renderer

**Owns**
- Main interactive viewport and scene graph.
- Camera, lights, surface/wall geometry and material response.
- Selection and hit testing.
- Interactive transform/shape handles.
- Scene-aware editing affordances.
- Mesh generation from validated vector topology.
- Efficient updates, object lifecycle and render caches.
- Optional 3D depth/extrusion and in-scene composition presentation.

**Inputs**
- Canonical glyph/composition state.
- Validated vector geometry.
- Scene/surface/material configuration.
- Diagnostic overlays.

**Outputs**
- Rendered view.
- User interaction events converted to model edit commands.
- View-only state such as camera orbit and zoom.

**Must not**
- Treat raw mesh vertex edits as the only saved geometry.
- store canonical counters solely as texture holes.
- make scene transforms silently alter base glyph metrics.
- replace the semantic construction model with generic Three.js Shapes.

### 4.5 Vector geometry and SVG interoperability

**Owns**
- Conversion from canonical editable geometry to SVG.
- SVG import and supported-geometry parsing.
- Contour winding/fill-rule normalization.
- Preservation of counters, apertures and component metadata where possible.
- Export fidelity tests.

**Inputs**
- Canonical vector state and composition transforms.
- Layer/fill configuration.

**Outputs**
- SVG document and optional semantic metadata/sidecar.
- Import diagnostics and editability warnings.

**Must not**
- serialize only a flattened screenshot/texture when vector export is requested.
- rely on browser/scene runtime state to reconstruct the composition.
- silently discard unsupported geometry or semantic metadata.

### 4.6 Project persistence

**Owns**
- Project schema version and engine/generator version.
- Source word, selected glyph IDs and variants.
- Per-instance overrides and transforms.
- Composition relationship graph.
- Style grammar and palette/layer settings.
- Seed and deterministic operation parameters.
- Canonical geometry snapshots where required.
- Autosave, load, migration and integrity checks.

**Must not**
- persist only transient Three.js mesh buffers.
- depend on current UI control values to recreate a saved project.
- omit generator version when procedural operations can change over time.

### 4.7 Diagnostics and test harness

**Owns**
- Schema validation.
- Geometry/topology checks.
- Counter/aperture clearance.
- Self-intersection and collision checks.
- Reproducibility checks.
- SVG round-trip comparisons.
- Three.js-versus-vector render comparisons.
- Test word and pair-context suites.
- Visual proof-sheet generation and review records.

**Must not**
- claim artistic quality from geometry metrics alone.
- label estimated sketch time as measured drawing time.
- present unreviewed glyphs as production-approved.

## 5. Edit command contract

All edits from the Three.js editor should be expressed as commands against stable model IDs. Suggested command envelope:

```ts
interface ModelEditCommand {
  commandId: string;
  projectId: string;
  target: {
    glyphId?: string;
    variantId?: string;
    instanceId?: string;
    componentId?: string;
    anchorId?: string;
    relationshipId?: string;
  };
  operation:
    | "set-instance-transform"
    | "move-anchor"
    | "adjust-component-parameter"
    | "edit-vector-segment"
    | "set-relationship"
    | "set-layer-property"
    | "change-variant";
  payload: Record<string, unknown>;
  baseRevision: number;
  source: "three-editor" | "vector-editor" | "composition-solver" | "inspector";
}
```

The model layer must:
1. resolve target IDs;
2. check base revision/conflicts;
3. apply the operation to a working copy;
4. run relevant validation;
5. accept, reject or accept-with-warning;
6. commit canonical state and increment revision;
7. emit change events for renderer, diagnostics and persistence.

Undo/redo should operate on model commands or reversible patches, not snapshots of opaque Three.js scene state.

## 6. Synchronization and performance

- Canonical model revisions are authoritative.
- Derived Three.js objects carry stable IDs back to model entities.
- Rebuild only affected glyph/component meshes where safe; otherwise rebuild the affected composition group.
- Cache derived meshes by geometry hash + renderer version + relevant material settings.
- Camera movement and viewport resizing do not dirty canonical geometry.
- Geometry edits invalidate SVG, diagnostics and render caches for affected entities.
- Persistence stores canonical state and versioned project metadata; caches may be discarded and regenerated.

## 7. Required interface seams

Claude should create explicit modules/interfaces for:
- `GlyphRegistry`
- `GlyphValidator`
- `VectorGeometry`
- `StyleGrammarRegistry`
- `CompositionSolver`
- `RelationshipGraph`
- `EditCommandBus`
- `ThreeEditorAdapter`
- `SvgInterchange`
- `ProjectSerializer`
- `DiagnosticRunner`

These are responsibility names, not a requirement to adopt a particular framework or package structure.

## 8. Acceptance tests

### Canonical model
- Editing a glyph component changes canonical vector geometry and increments its revision.
- Reloading the project restores the same glyph graph, contours and IDs.
- No Three.js dependency is required to validate a glyph master.

### Three.js interaction
- Selecting a visible mesh resolves to the correct glyph/component/instance ID.
- Dragging a handle submits a model edit command.
- A rejected geometry edit leaves canonical state and scene state consistent.
- Camera/lighting changes do not modify saved glyph geometry.
- The editor viewport is the live working surface, not a detached preview-only feature.

### Vector fidelity
- SVG export reflects the current canonical composition.
- Counter/aperture topology is visible through to the underlying surface.
- SVG re-import preserves editable geometry or reports exact unsupported/lost semantics.
- A Three.js-rendered view and SVG output agree on glyph silhouette and placement within declared tolerances.

### Composition
- Real joins require accepted geometry/anchor relationships.
- Decorative extensions do not increment join count.
- Counter occlusion is detected.
- Relationship overrides survive regeneration and reload.

### Determinism and persistence
- Same saved project + engine version + seed produces identical canonical geometry.
- A changed engine version is recorded and migration behavior is explicit.
- Undo/redo restores canonical state and derived view.

## 9. Non-goals for the first production slice

- Full 3D mesh sculpting as the only way to edit letters.
- Real-time collaborative editing.
- Cloud account sync.
- Full historical simulation of every regional style.
- Automatic invention of historically authoritative glyph forms.
- Complex particle, paint-drip or surface weathering systems before glyph editing works.
- Replacing vector editability with raster textures.

## 10. Implementation sequence

1. Implement canonical glyph contract and registry.
2. Import legacy A/B/G/R/S as reference records and create semantic review tooling.
3. Implement vector geometry validation and topology.
4. Implement one complete reviewed glyph workflow end-to-end.
5. Implement Three.js viewport as the live editor adapter with ID-based selection and command-based edits.
6. Implement composition solver and relationship graph.
7. Implement SVG interchange and project persistence.
8. Add proof-sheet and regression harness.
9. Expand the alphabet and style grammars based on review results.

Do not build advanced materials/effects before the first end-to-end glyph edit, validation, render and export loop is reliable.

## 11. Definition of done

The architecture is accepted when a user can select a glyph in the Three.js editor, make a structural edit, see the canonical vector model update, receive geometry diagnostics, undo/redo the edit, save/reload the project and export a matching editable SVG. The Three.js scene is a real editor surface; the canonical semantic/vector model remains durable and inspectable.
