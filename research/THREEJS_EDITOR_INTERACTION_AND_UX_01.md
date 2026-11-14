# Three.js Editor Interaction and Progressive Creative UX 01

**Status:** design specification; not implemented functionality.

## 1. Product principle: easy to enter, hard to exhaust

NIGHTSHIFT must feel like a creative instrument, not a technical control panel. A new player should make a satisfying, recognisable word quickly. An experienced player must be able to construct individual letterforms and complex compositions without an artificial ceiling.

Use progressive disclosure, not feature removal:
- **Start:** a small set of visual controls and direct manipulation.
- **Explore:** reveal structural controls when a relevant glyph, component or tool is selected.
- **Master:** expose anchors, relationship graphs, topology-aware operations and detailed diagnostics without replacing the direct workflow.

Do not lock advanced capabilities behind arbitrary player levels. Complexity is revealed by context, user choice and tool mode, not grind rewards.

## 2. Three working spaces, one project

### Blackbook
A calm, primarily 2D-feeling drawing surface hosted by the Three.js editor. Priorities: lettering, silhouette, spacing, colour studies, layers, sketch/reference layers and quick iteration. Perspective and material effects are subdued by default.

### Studio / construction view
The precision workspace for glyph anatomy and composition. It exposes component hierarchy, anchors, contours, negative-space diagnostics, relationship graph and exact transform values. It remains visual-first: selecting a component reveals only relevant controls.

### Wall / spatial composition
A Three.js scene for placing the same editable composition in a spatial environment. Camera, lighting, wall transform, surface and viewing distance are scene state, not glyph geometry.

These are views over one project, not separate editors or file formats. Switching views must not flatten, rasterize or duplicate artwork.

## 3. Progressive tool model

### Level 1 — Quick lettering
Always available in the default workspace:
- enter/edit text and choose a starting construction family or master glyph;
- select a word or letter;
- move, scale, rotate and adjust spacing;
- adjust overall width/height and slant;
- choose fill, outline and a small number of finish controls;
- undo/redo and save.

Prefer direct manipulation with contextual handles. Presets are editable starting points, never substitutes for geometry.

### Level 2 — Shape and structure
Appears when a glyph/component is selected or Shape mode is active:
- edit stem, bowl, bar, leg and terminal proportions;
- move supported semantic anchors;
- adjust curve tension and terminal treatment where defined;
- inspect counters, apertures and channels;
- choose and compare named variants;
- inspect local pair spacing and connection opportunities.

Show only parameters supported by the selected glyph and variant. Never show a universal panel full of irrelevant or disabled sliders.

### Level 3 — Connections and composition
Appears in Connect mode or when a relationship is selected:
- near-touch and terminal contact;
- bar continuation;
- overlap and extension bridge;
- shared-stroke and interlock workflows only when topology and review gates permit;
- control occlusion order and negative-space channels;
- inspect whole-word collision, rhythm and silhouette diagnostics.

Explain why a proposed connection is unavailable: incompatible anchor, protected counter, insufficient clearance, invalid topology or conflicting layer order.

### Level 4 — Advanced authoring
An explicit advanced workspace, not the default:
- semantic component graph;
- contour/segment-level editing;
- custom anchor authoring and direction/clearance metadata;
- relationship graph inspection;
- calibrated numeric input;
- topology-aware variant authoring;
- diagnostic thresholds and validation reports;
- deterministic seed and reproducibility controls.

Advanced mode exposes more control, not fewer safeguards. It must not bypass validation.

## 4. Selection model and hierarchy

Selectable entity kinds:
1. project/composition;
2. word;
3. glyph instance;
4. semantic component;
5. contour or segment;
6. anchor;
7. relationship edge;
8. surface/scene object.

Every selectable entity resolves to a stable canonical ID. Three.js meshes, lines, handles and hit proxies reference these IDs; transient scene UUIDs are never persisted as identity.

Selection behavior:
- click selects the topmost eligible entity under the pointer;
- repeated click or modifier cycling moves through overlapping eligible entities;
- hierarchy breadcrumbs show the selection path;
- Escape steps to the parent selection, then clears;
- multi-select is explicit and visually distinguishable;
- selection does not imply edit mode.

Default priority is contextual: glyph selection in Quick mode; semantic component selection in Shape mode; anchors/relationship edges in Connect mode; segment selection only in precision mode. Do not make tiny handles the default hit target when the user intends to select a whole letter.

## 5. Direct manipulation and handles

Handle families:
- transform: move, rotate, scale;
- shape: registered semantic parameters only;
- anchor: position plus direction/clearance cues;
- relationship: endpoints, bridge/path controls and ordering where supported;
- contour: segment nodes and curve controls in precision mode.

A handle communicates what it changes before drag. Hover/focus can show a concise label and affected entity. Use distinct visual grammar for handle types; do not rely on colour alone.

Drag lifecycle:
1. pointer down resolves a stable target and captures the starting model revision;
2. pointer movement updates a temporary preview candidate;
3. preview diagnostics run at an appropriate cadence;
4. pointer release submits one typed command/transaction;
5. canonical model validates and commits atomically;
6. renderer updates derived objects from committed state;
7. rejection restores the committed view and explains the blocking diagnostic.

Cancel/Escape restores the pre-drag state. A drag creates one undo step, not hundreds. Multi-entity edits form one transaction when they represent one user intention.

Never write canonical state directly from a Three.js event handler. Never persist mesh-vertex edits as the source of truth.

## 6. Tools and modes

Keep the primary toolbar small and stable:
- Select
- Move/Transform
- Shape
- Connect
- Draw/Contour
- Layers
- View

Modes change selection priority, visible handles and contextual inspector content. The toolbar must not become a catalogue of every operation. Contextual actions appear beside the selected entity or in a compact inspector.

Tool switching preserves selection where valid. If a tool cannot operate on the selected entity, explain why and offer the closest relevant mode.

## 7. Contextual inspector, not slider-heavy

The inspector has three compact sections:
- **Essentials:** the few controls most relevant to the selected item;
- **Structure:** component/anchor/relationship-specific controls;
- **Details:** numeric values, IDs, provenance and diagnostics.

Use human language and meaningful labels. Numeric fields remain available for precision and accessibility. Group controls by visible effect, not internal code modules.

Use before/after comparison for variant choices. Preset changes are reversible model commands and must not overwrite authored geometry without confirmation.

## 8. Live diagnostics without creative interruption

Three presentation levels:
- **Quiet:** small status indicator; no overlay unless a problem affects the current operation.
- **Contextual:** highlight only the affected counter, anchor, edge, collision or channel.
- **Inspection:** full diagnostic overlay and issue list.

Hard blockers (identity, invalid topology, forbidden self-intersection, required clearance failure, invalid anchor reference) prevent commit. Soft guidance (spacing rhythm, flow, balance, style compatibility) informs but does not prevent experimentation unless the user explicitly requests a constrained operation.

Preview diagnostics are provisional. Label them as preview. On commit, run the authoritative validator. Diagnostics identify affected stable IDs and explain the reason in plain language, with technical detail expandable.

Do not obscure the composition because of one local warning.

## 9. Layers and overlays

Separate canonical composition layers from editor-only overlays.

Composition layers may include glyph fill, outline, inline/highlight, depth/extrusion, shadow, sketch/reference and surface treatment. Visibility, lock and ordering are user-facing controls. Layer operations state whether they affect semantic geometry, appearance or scene-only state.

Editor overlays include selection, bounds, anchors, handles, relationship edges, counter/aperture/channel guides, collision/clearance diagnostics, grid and rulers. Overlays are not exported unless explicitly requested.

A locked layer is inspectable but not editable by default. Hiding a layer never deletes its data.

## 10. Undo, redo and history

Undo/redo operates on canonical commands and transactions, not snapshots of Three.js scene objects. Each history entry records command/operation IDs, affected stable IDs, reversible patch data, model revisions, readable description and validation result.

Coalesce continuous pointer movement into one transaction. Camera, zoom, orbit and temporary overlay visibility do not enter geometry history. Appearance changes and scene placement may have separate undoable command categories.

Readable entries should say “Widened B lower bowl” or “Connected R leg to A terminal”, not internal function names. Undo/redo must revalidate and preserve deterministic replay.

## 11. Blackbook ↔ Wall continuity

The same glyph instances, semantic graph, relationship graph, style parameters and vector geometry persist across views. Only view-specific state changes:
- Blackbook: camera framing, paper/background, page guides and sketch visibility;
- Studio: camera, overlay visibility and inspector layout;
- Wall: camera, lighting, wall/surface transform, environment and spatial placement.

Editing a letter in either view updates the same canonical project. Wall perspective must never feed back into glyph coordinates unless the user invokes an explicit composition transform.

## 12. Input, accessibility and tablet use

Support pointer/mouse and touch through a shared interaction abstraction. Essential operations must not depend on hover. Provide discoverable keyboard shortcuts and remapping potential. Every drag operation has a non-drag alternative through inspector fields or step controls.

On touch devices, separate camera navigation from object editing, make mode state clear before a gesture, use forgiving hit regions calibrated through usability testing, and provide immediate undo. Do not require precision multi-touch for core workflows.

Use focus indicators, labels and shape/pattern cues in addition to colour. Do not assume desktop-only hover behavior.

## 13. Performance and determinism

Prioritize responsive direct manipulation. Simplified preview geometry may be used during active drag, but must not be presented as committed state. Rebuild exact geometry and authoritative diagnostics on commit.

Cache derived geometry by canonical revision and relevant rendering parameters. Invalidate only affected glyphs, relationships and word-level diagnostics. Keep stable ID mapping through rebuilds. The same project version, parameters and seed must reproduce canonical geometry.

## 14. Implementation order

Use the machine-readable contract at contracts/editor-interaction.v1.json.

1. Stable selection and hierarchy.
2. Transform handles and one-command drag transactions.
3. Contextual inspector and basic glyph structural operations.
4. Preview diagnostics and commit validation.
5. Layers and editor overlays.
6. Undo/redo and readable history.
7. Blackbook/Wall shared-project continuity.
8. Connect mode and relationship handles.
9. Advanced contour/anchor authoring and touch refinement.

Do not implement every advanced mode before the simple loop is enjoyable. Do not hardcode the simple loop in a way that blocks the semantic model.

## 15. Usability acceptance tests

A first-time user can:
- enter a short word and create a readable composition without opening advanced panels;
- select a whole letter without accidentally selecting a handle;
- discover how to widen or slant a letter through direct manipulation;
- undo/redo a drag as one action;
- understand a blocked connection from a plain-language explanation.

An experienced user can:
- select a semantic component, anchor and relationship edge by stable identity;
- create a controlled connection and inspect whole-word consequences;
- enter precision mode and edit supported contour/anchor data;
- inspect diagnostics without losing visual context;
- switch Blackbook/Wall without flattening or duplicating artwork.

Technical acceptance:
- no canonical edit bypasses the command/validation pipeline;
- all selectable rendered objects map to stable IDs;
- rejected commands restore the previous committed scene;
- undo/redo and save/reload preserve canonical state;
- view state does not dirty glyph geometry;
- all interaction fixtures pass.

## 16. Design boundary

NIGHTSHIFT rewards experimentation, not one “correct” graffiti style. Diagnostics explain consequences; they do not dictate taste. Presets teach possibilities; they do not define a ceiling. The first good result should be easy; the hundredth distinctive result should remain possible.


## 17. Optional, adaptive in-game tutorial — never a feature lock

The tutorial is a companion that follows the player's progress through the game. It teaches tools in context as the player encounters new creative challenges, but it never owns permission to use those tools.

**Non-negotiable rule:** every editor feature is available from the beginning, regardless of tutorial state, career rank, chapter or playtime. Tutorial progression changes what is explained, suggested or highlighted; it never unlocks or disables editor functionality.

### Guidance modes

Offer three clear choices in settings and during first launch:

- **Guided:** step-by-step introductions, optional practice prompts and contextual explanations. The player can skip any step and continue working.
- **Adaptive:** the editor notices relevant milestones (for example, first selected glyph, first structural edit, first connection, first layer stack) and offers a short, dismissible tip. It avoids repeating concepts the player already uses confidently.
- **Off:** no unsolicited tutorial prompts. A searchable/reopenable help index remains available unless the player explicitly disables help entirely.

A separate **Advanced controls visibility** setting controls whether the full toolset is shown immediately or contextual controls are kept compact. It is independent from tutorial mode. This prevents the false choice between “learn slowly” and “use everything now”.

### Settings model

Expose settings in onboarding and in the editor at any time:
- Tutorial: Guided / Adaptive / Off.
- Tool layout: Compact / Full.
- Contextual hints: On / Off.
- Practice prompts: On / Off.
- Replay completed lessons: available from Help.
- Reset tutorial progress: resets teaching state only, never projects or artwork.

Suggested defaults for a first session: Adaptive tutorial, Compact tool layout, contextual hints on. These are defaults, not restrictions. A player can choose Guided + Full tools, Off + Compact, or Off + Full; every combination remains valid.

### Tutorial as a progression companion

Organize lessons around real creative milestones, not arbitrary levels:
1. Make a first tag/word and navigate the Blackbook.
2. Adjust letter width, height, slant and spacing.
3. Shape a glyph component and understand counters/apertures.
4. Build pair relationships and manage overlap/negative space.
5. Work with layers, outlines, inline and depth.
6. Construct more complex style grammars and inspect diagnostics.
7. Move the same editable piece into a wall/spatial composition.

The game may introduce these ideas through missions, crew feedback, commissions or a new surface/context. The tutorial prompt is attached to the relevant task and can be dismissed, postponed or opened as a practice exercise. It must never block the main task or force the player to complete a lesson before using the associated tool.

### Hint behavior

- One prompt at a time; never stack tutorial popups.
- Explain one action and its visible result, not a long technical lecture.
- Prefer highlighting the relevant tool/handle over modal dialogs.
- Provide “Try it”, “Not now” and “Don't show this again” actions where appropriate.
- A skipped lesson remains available in Help.
- Re-offer a hint only when context makes it useful; respect dismissed/disabled preferences.
- Advanced users can inspect all lessons from the help index without changing their tutorial state.

### Progress and privacy

Store tutorial completion, dismissed hints and settings separately from canonical artwork. Tutorial state must not affect generated geometry, deterministic seeds, project exports or validation. Resetting tutorial progress must not reset a project. If settings are project-specific, allow a user-level default and a per-project override.

### Acceptance tests

- A brand-new profile can select Guided, Adaptive or Off during onboarding.
- The user can change tutorial mode and tool layout at any time without restarting.
- Full tool access is available with every tutorial setting.
- A skipped lesson never blocks its feature or the active mission.
- Completed lessons can be replayed without changing project data.
- Tutorial prompts do not appear when Off is selected.
- Resetting tutorial progress leaves artwork, saves and seeds unchanged.
- Tutorial events do not alter canonical model revision.
