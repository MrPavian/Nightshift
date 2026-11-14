# NIGHTSHIFT Editor Workspace Layout 01

**Status:** product/UX specification; not implemented.  
**Depends on:** `THREEJS_EDITOR_INTERACTION_AND_UX_01.md`, `contracts/editor-interaction.v1.json`, glyph/relationship contracts.

## 1. Layout goals

The workspace must make the artwork the visual centre. Controls should support the current task without competing with the piece. The layout must serve both a new player using compact controls and an experienced writer who enables the full toolset.

Core rules:
- The canvas/viewport receives the largest share of available space.
- The primary tool rail remains short and stable.
- Contextual controls appear only for the current selection/tool.
- Full mode exposes depth and precision, not a different editing model.
- No modal dialog for routine actions.
- Every panel can be collapsed; panel visibility is view state, not artwork data.
- Never require the user to understand internal terms before making a basic edit.

## 2. Main workspace regions

### A. Top application bar
Contains project name/status, save state, undo, redo, view switcher (Blackbook / Studio / Wall), tutorial/help access and settings. Avoid duplicating tool actions already present in the canvas toolbar.

Save status must distinguish saved, saving and unsaved changes. A failed save must be visible and actionable.

### B. Primary viewport
The live Three.js working surface. It displays the composition, selection feedback, active handles and enabled overlays. The viewport must remain interactive in Blackbook and Wall views.

In Blackbook, use a page-like framing and quiet background. In Studio, show construction guides as requested. In Wall, show the spatial surface and camera. Do not create separate flattened artwork copies for these views.

### C. Left tool rail
Compact, persistent actions:
- Select
- Transform
- Shape
- Connect
- Draw / Contour
- Layers
- View / navigation

Tool labels appear on hover/focus or in expanded rail mode. On narrow screens, use a collapsible bottom/side tool strip with the same tool semantics.

### D. Context inspector
A contextual panel on the right in wide layouts; collapsible drawer on narrow layouts. It shows:
1. selection breadcrumb and entity name;
2. Essentials;
3. Structure;
4. Details / diagnostics.

When nothing is selected, show project-level essentials (word, starting style family, palette and composition settings) rather than a blank inspector. When multiple entities are selected, show only common supported operations and a clear selection count.

### E. Bottom timeline / history strip
A compact, optional strip for readable command history, recent actions and project snapshots. It must not become a video-editing timeline. Default state can be collapsed; undo/redo remain available in the top bar and keyboard shortcuts.

## 3. Compact and Full tool layouts

These are presentation modes, not capability modes.

### Compact
- short tool rail with familiar labels/icons;
- inspector defaults to Essentials;
- advanced sections remain discoverable through contextual “More controls” affordance;
- diagnostics remain quiet unless relevant;
- layers panel starts collapsed.

### Full
- same viewport and tool semantics;
- expanded tool rail with labels;
- Structure and Details sections can remain visible;
- layer stack and diagnostic list can stay open;
- exact numeric values and advanced controls are easier to reach.

Switching Compact/Full never changes project data, tool availability, selected geometry, or tutorial state. No feature is disabled in Compact mode; it is merely less prominent.

## 4. Responsive behavior

### Wide desktop
Viewport centre, left tool rail, right inspector, top bar and optional bottom history. Avoid fixed panel widths in the contract; tune through actual responsive testing.

### Tablet landscape
Viewport remains dominant. Inspector may collapse to a drawer. Tool rail remains accessible. Touch targets and camera/edit gesture separation are prioritized.

### Tablet portrait / narrow viewport
Use a focused canvas with collapsible tool and inspector drawers. Do not permanently reserve large side columns. Important actions (undo, redo, selection mode, view switch) remain reachable without covering the active edit target.

The app must not assume hover. Long-press or explicit mode selection may expose contextual actions, but must not trigger destructive edits.

## 5. First-session flow

1. Start in Blackbook with a clean sample page and a short, editable starter word or empty prompt. Do not force a lengthy cutscene.
2. Offer the tutorial choice: Adaptive, Guided or Off.
3. Offer tool layout: Compact or Full.
4. Make it clear that every feature is available regardless of these choices.
5. Let the player begin immediately; the first hint appears only when relevant or requested.

The user can change these settings later without restarting or losing work.

## 6. Contextual tutorial placement

Tutorial hints should be anchored to the relevant tool/region, not displayed as blocking centre-screen modals. A hint may dim unrelated chrome slightly, but the artwork remains visible and interactive.

Recommended prompt anatomy:
- short title;
- one-sentence explanation;
- one suggested action;
- Try it / Not now / Don't show again.

A guided lesson may offer a practice copy or reversible exercise, but must never overwrite the player's active piece. Lesson state is stored separately from project state.

## 7. Inspector content rules

The inspector is selection-aware:
- no selection: project and word setup;
- word selected: layout, global style axes, palette and whole-word diagnostics;
- glyph selected: transforms, variant, supported structural controls;
- semantic component selected: only the controls for that component;
- anchor selected: position, direction, clearance and compatibility;
- relationship selected: type, endpoints, path/overlap and validation;
- scene surface selected: material, placement, lighting and camera context.

Do not show controls that do not apply. A control must identify whether it changes glyph geometry, composition relationships, appearance or scene state.

## 8. Interaction feedback

Use restrained, consistent feedback:
- selected object: clear outline/handles;
- active tool: persistent active state;
- preview: visually distinct from committed geometry;
- hard blocker: local highlight plus concise explanation;
- soft warning: quiet indicator and optional inspection;
- successful commit: subtle confirmation, not a blocking toast.

Do not communicate status by colour alone. Use iconography, labels, shape and text as appropriate.

## 9. Layout acceptance checks

- The piece remains the dominant visual element in all three views.
- A first-time user can find Select, Transform, Undo and Tutorial without searching menus.
- Compact and Full expose identical functionality.
- Inspector content changes with selection and never presents irrelevant controls.
- Tablet layouts keep core actions reachable and do not depend on hover.
- Tutorial prompts do not cover the active edit target or block the workflow.
- Switching views or layouts does not mutate canonical artwork.
- Panel open/closed state does not create geometry history entries.

## 10. Implementation note

This document defines hierarchy and behavior, not pixel-perfect measurements. Do not invent fixed dimensions before the actual viewport and target-device tests exist. Implement a responsive layout with a dominant Three.js viewport, stable tool semantics and contextual inspector. Keep all panel layout state separate from canonical project state.
