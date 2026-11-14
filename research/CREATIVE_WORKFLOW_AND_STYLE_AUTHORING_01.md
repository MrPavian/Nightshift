# Creative Workflow and Style Authoring 01

**Status:** design specification / not implemented.  
**Scope:** the complete authoring journey from a word prompt to a saved, editable NIGHTSHIFT piece.

## 1. Product intent

The editor should feel immediate at the beginning and remain capable as the writer develops a more deliberate visual language. A new user can enter a word and compare four useful concepts without learning the whole construction system. An experienced user can take control of individual glyphs, anchors, relationships, layers and geometry.

The workflow is progressive in complexity, not gated by unlocks. Tutorial mode and Compact/Full layout remain independent settings; neither changes what the user is allowed to create.

## 2. End-to-end journey

1. **Start a project.** Enter a word or short text, choose a canvas/context, and optionally choose a starting grammar profile. Keep the first screen focused: text, Generate, and a small set of meaningful starting choices.
2. **Generate four concepts.** Return exactly four structurally distinct concepts (D-006). They must differ in meaningful construction and/or composition, not merely palette, outline or effects. Each concept records its seed, source settings, grammar parameters and generator version.
3. **Compare.** Present all four at comparable scale and neutral preview conditions. Show concise differences such as glyph stance, width rhythm, mass distribution, spacing and relationship strategy. Do not claim one is historically authentic merely because it has a style label.
4. **Choose and branch.** Selecting a concept creates an editable branch. The four source concepts remain recoverable; edits never silently overwrite siblings or the original generated result.
5. **Refine the word.** Adjust word-level rhythm, scale, spacing, slant and composition. Re-run whole-word validation after local edits.
6. **Refine individual glyphs.** Select a letter and choose a named reviewed variant where available, or edit its permitted structural parameters. Preserve glyph identity and topology unless the user explicitly selects a separately authored topology variant.
7. **Build relationships.** Inspect contextual connection candidates from the relationship solver. Accept, reject or manually adjust them. The writer may choose deliberate separation. Pair suggestions are always rechecked in whole-word context.
8. **Develop style.** Combine compatible letterform and composition grammars, then tune their parameters. Save a reusable style recipe when a coherent language emerges.
9. **Finish and export.** Review the piece in Blackbook/Studio/Wall views, inspect diagnostics, save a versioned project, and export SVG/PNG or the appropriate in-game artwork package.

## 3. Four-concept generation

### Required behavior
- Exactly four concepts per Generate action.
- Each concept has a stable concept ID and deterministic seed.
- Reopening or regenerating with the same generator version, input and seed reproduces the same canonical result.
- The four concepts must be meaningfully distinct across construction/composition dimensions.
- Shared input settings are visible; per-concept deviations are inspectable.
- A concept can be duplicated into a new branch before experimentation.
- Generate again creates a new concept set/version; it does not destroy earlier sets.

### Diversity dimensions
The generator may vary:
- glyph variant selection and structural proportions;
- width/height and mass rhythm across the word;
- baseline, slant and spacing strategy;
- anchor compatibility and relationship candidates;
- composition grammar and negative-space distribution.

Palette, background, texture, outline and effects may enrich comparison but cannot be the only source of diversity.

### Diversity validation
A concept-set validator should compare canonical feature summaries, not screenshots alone. It should detect near-identical outputs and request a new candidate using a deterministic alternate seed. Do not use an arbitrary visual-difference score as the sole quality measure. A human review fixture should include short words, repeated letters, narrow/wide combinations and difficult pairs.

## 4. Editing levels and assistance

Assistance is optional and can be changed at any time. It must never overwrite a manual decision without an explicit preview and confirmation.

| Mode | Behavior |
|---|---|
| **Off** | No proactive design suggestions or automatic edits. Diagnostics and explicit tools remain available. |
| **Suggest** | Offer contextual candidates, explain the trade-off, and wait for the user to apply one. |
| **Preview** | Allow a proposed change to be previewed as a reversible candidate; commit only after explicit acceptance. |

No silent auto-apply mode is required for the first production slice. If a later mode is proposed, it needs a separate owner decision and must remain opt-in.

Suggestions may include alternative glyph variants, spacing, anchor pairings, connection types, negative-space improvements and composition adjustments. Every suggestion identifies affected objects, expected benefits, possible costs and validation results.

## 5. Glyph editing

- Selecting a letter focuses its stable glyph-instance ID in the Three.js viewport and inspector.
- The inspector separates **Essentials** (high-impact controls), **Structure** (component/anchor controls) and **Details** (precision parameters).
- Controls appear only when supported by the selected glyph/variant; unavailable operations are not presented as working controls.
- Each edit is a typed command with expected revision, preview state, validation result and atomic commit.
- Rejected edits restore the last committed geometry.
- Topology changes require an explicitly named topology variant and the relevant review gate.
- Undo/redo is command-based and a continuous drag should normally form one user-level history action.
- A user can revert a glyph to its master or to a prior project-history state without resetting unrelated letters.

## 6. Relationships and word composition

The relationship solver proposes candidates; it does not dictate style. The writer can preserve open separation, choose among valid connections, or create a manual relationship through supported tools.

- Relationship type and geometric realization remain separate.
- Pair-level candidates are contextual to glyph variant, anchors, transforms and neighboring letters.
- Whole-word checks protect counters, apertures, channels, legibility and collision constraints.
- Hard failures block commit; soft rhythm/flow observations remain advisory.
- Manual overrides are stored explicitly and revalidated when dependent geometry changes.
- A decorative line or bridge is never represented as a structural join unless the canonical relationship and geometry actually connect.

Follow `contracts/relationship-solver.v1.json`.

## 7. Style profiles and personal library

A saved style is a **recipe**, not a flattened image and not a single exclusive style-family enum.

A style recipe may include:
- selected letterform grammar(s) and composition grammar;
- compatible parameter values and variant preferences;
- spacing, rhythm, slant and mass tendencies;
- relationship preferences and allowed connection types;
- optional rendering preferences, stored separately from construction;
- provenance, author, version, compatibility notes and preview specimen.

### Save and apply
- Save the current configuration as a named personal recipe.
- Apply a recipe to a new word as starting guidance; never silently rewrite the source project.
- Show compatibility per glyph/variant and explain unsupported or experimental combinations.
- Allow a recipe to be duplicated, renamed, revised and versioned.
- Store recipe version and generator compatibility so later engine changes do not silently reinterpret old work.
- Allow selected parameters to be locked while others remain open to variation.
- A recipe can be shared/exported as data only where its contents are original or appropriately licensed.

### Recipe versus artwork
A recipe stores reusable rules and preferences. An artwork/project stores actual glyph variants, geometry, relationships, layers, transforms, seed and history. Saving a recipe must not replace or erase the source artwork; saving artwork must not automatically create a global recipe.

### Cultural and rights boundary
Do not offer presets that clone a named writer's signature, exact letterforms or a specific protected piece. Historical references can inform broad, documented construction principles; personal recipes should be original combinations and user-authored choices. Keep source attribution and uncertainty visible in educational/reference contexts.

## 8. Project persistence and branching

Persist at minimum:
- project ID, schema version, generator version and timestamps;
- source text and canvas/context;
- deterministic seed and generation settings;
- four-concept set and chosen branch relationship;
- canonical glyph instances, variants, semantic/vector geometry, metrics and anchors;
- composition graph, transforms, layers and style recipe references;
- user overrides, diagnostics snapshot and command history or replayable history metadata;
- export metadata and review/maturity status.

Branching rules:
- Generated concepts are immutable snapshots.
- Editing creates a new project revision.
- Duplicate/branch creates a new branch ID with a parent revision reference.
- Undo/redo changes the active revision through validated commands.
- A recipe is referenced by ID and version; projects retain a resolved snapshot of applied values so future recipe edits cannot mutate old artwork.

## 9. View continuity

Blackbook, Studio and Wall are views of the same project. Switching views must not fork geometry or lose selection/history. Wall context may add spatial presentation and surface constraints, but should not silently modify the blackbook construction.

## 10. Acceptance criteria

1. Entering a valid word and pressing Generate returns exactly four concepts.
2. The four concepts differ in measurable construction/composition features; palette-only differences fail.
3. Each concept can be reopened from its seed and settings under the recorded generator version.
4. Choosing a concept preserves all sibling concepts and creates an editable branch.
5. A single glyph can be edited without unintentionally changing unrelated glyphs.
6. Every accepted edit commits through typed validation; rejected edits leave canonical state unchanged.
7. Relationship suggestions can be ignored; deliberate open separation remains valid.
8. A pair-level accepted relationship is revalidated in full-word context.
9. Off, Suggest and Preview assistance modes behave as specified; none silently overwrites user work.
10. A style recipe can be saved, versioned, duplicated and applied to a new project without mutating its source artwork.
11. Applied recipe values are snapshotted into project state.
12. Blackbook/Studio/Wall show the same canonical artwork.
13. Tutorial and Compact/Full settings do not gate capabilities or affect artwork determinism.
14. Project save/load preserves geometry, variants, relationships, seed, branch lineage and recipe references.
15. Exported SVG matches the committed canonical composition.

## 11. Implementation sequence

**Slice A — Concept generation and branching**
- Input form, four deterministic concept records, meaningful diversity checks, comparison view, immutable snapshots and chosen branch.

**Slice B — Core refinement**
- Word-level controls, per-glyph selection, supported structural parameter operations, command history and save/load.

**Slice C — Relationship authoring**
- Solver candidate presentation, explicit accept/reject, manual override and whole-word validation.

**Slice D — Assistance**
- Off/Suggest/Preview behavior, explanations, candidate previews and user-confirmed commits.

**Slice E — Personal style library**
- Recipe schema, compatibility checks, versioning, parameter locks, application to new work.

Do not treat a visible UI control as implementation complete until the canonical behavior, persistence and acceptance fixtures pass.
