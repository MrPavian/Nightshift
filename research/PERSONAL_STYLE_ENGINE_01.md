# Personal Style Engine 01 — Recipe Grammar, Blending and Application

**Status:** design specification / not implemented.  
**Purpose:** define how NIGHTSHIFT stores, combines, applies and evolves original user-authored visual languages.  
**Dependencies:** style grammar specifications, compatibility/parameter contract, glyph variant matrix, relationship solver, creative workflow contract.

## 1. Design goal

The Personal Style Engine should make a user's visual language reusable without reducing it to a filter. A style is a coordinated set of construction and composition preferences that affects actual glyph variants, proportions, rhythm, anchors and relationship choices.

A style recipe is not:
- a colour palette;
- a rendering preset;
- a single style-family enum;
- a flattened image;
- a copy of a named writer's signature or a specific protected artwork.

A recipe is a versioned, inspectable set of rules and preferences. It can guide new generation, but it cannot bypass glyph identity, topology, geometry or compatibility validation.

## 2. Style identity: a multi-axis profile

Keep the axes independent, consistent with `STYLE_GRAMMAR_COMPATIBILITY_AND_PARAMETERS.md`:

1. **Letterform grammar:** bubble, straight, hybrid, authored variant set.
2. **Composition grammar:** neutral, compact, block-fit, interlocking, or future authored grammar.
3. **Practice/form context:** none, tag, throw-up, piece, panel, wholecar.
4. **Surface/context:** blackbook, wall, train-car, paper, custom.
5. **Rendering/finish:** fill, outline, inline, depth, highlight, texture.

A recipe can combine axes, but each selection and version remains explicit. Context and rendering are not allowed to silently rewrite letterform construction.

## 3. Recipe model

Each recipe has:
- stable `recipeId`, human-readable name and description;
- schema and recipe version;
- parent recipe/version when derived from another recipe;
- creation/update metadata and user-authored provenance;
- explicit grammar-axis selections and compatibility policy;
- parameter rules with scope, value, lock state and priority;
- glyph variant preferences and exclusions;
- relationship preferences and allowed/discouraged types;
- optional rendering preferences;
- preview specimen and notes;
- compatibility report and migration history.

### Parameter rule shape

A rule identifies:
- stable parameter ID from a registered contract;
- scope: global, glyph-class, glyph-ID, word-position, pair-context or composition;
- target selector and optional condition;
- value or bounded preference (not an arbitrary untyped property);
- lock state;
- priority and conflict policy;
- source (base grammar, recipe, project override, instance override).

Only parameters registered to an owning subsystem can be stored. Unknown IDs are preserved as unsupported metadata during import, but are not applied.

## 4. Precedence and resolution

Resolve effective values in a deterministic stack:

1. Glyph identity and topology invariants (hard constraints; never overridden).
2. Authored variant constraints and declared compatibility.
3. Base grammar defaults.
4. Selected recipe rules.
5. Project-level overrides.
6. Glyph-instance and relationship overrides.
7. Rendering preferences, applied only in the finish pipeline.

A higher-priority user override may supersede a lower-priority soft preference, but never a hard invariant. A locked recipe rule resists ordinary project-level changes; it does not become a way to bypass validation. The UI must explain a lock conflict and let the user unlock or choose another compatible variant.

### Conflict policies

Use explicit policies:
- `reject`: do not apply recipe if a hard conflict exists;
- `skip-with-report`: apply compatible rules and list skipped rules;
- `preview-alternatives`: propose compatible alternatives for user approval.

Do not silently average conflicting values. Parameter blending is permitted only for parameters whose registry explicitly declares a meaningful interpolation operation and calibrated domain. Variant IDs, topology choices, relationship types and categorical grammar selections are not numerically blended.

## 5. Combining and blending styles

Provide three distinct operations; do not call all of them “blend”.

### A. Combine axes
Select one letterform grammar and a different composition grammar, plus context/surface/finish. Example: straight letterforms with an interlocking composition grammar. This is a valid multi-axis composition when compatibility permits it.

### B. Merge recipes
Merge two recipes into a new recipe draft. User chooses a source for conflicting rules or selects an explicit conflict policy. Preserve source lineage. The merge must produce a conflict report before saving.

### C. Interpolate compatible numeric preferences
Where the parameter registry explicitly supports interpolation, create a new numeric preference between two compatible recipes. The result is a new recipe; source recipes remain unchanged. No interpolation across topology, variant identity, categorical grammar, or relationship type.

The interface should show which values were inherited, selected, interpolated, skipped or overridden.

## 6. Glyph-specific style application

A recipe is not forced uniformly onto every letter. It may define:
- preferred variant families per glyph;
- parameter rules scoped to glyph classes or individual glyph IDs;
- per-position rhythm rules (e.g. opening/central/final letter);
- pair-context relationship preferences;
- protected exceptions.

When a recipe is applied to a word:
1. Resolve grammar axes and recipe rules.
2. Query compatible glyph variants for each letter.
3. Generate candidate constructions without mutating the source project.
4. Validate each glyph and whole-word composition.
5. Produce an application report: applied, skipped, experimental, conflicting.
6. Show a preview branch.
7. Commit only after user acceptance.

Do not fabricate a variant if no compatible authored variant exists. Mark the gap and offer a neutral fallback or leave the glyph unchanged, according to the selected conflict policy.

## 7. Style DNA and variation

A style recipe should be recognizable across different words while allowing controlled variation. Separate:
- **invariants:** locked or strongly preferred traits that define the recipe;
- **tendencies:** soft preferences that may vary within declared bounds;
- **exceptions:** explicit per-glyph or per-context departures;
- **finish:** independent rendering preferences.

A recipe may define a variation budget for a generation run. The budget controls how far soft preferences may drift; it must not alter hard invariants or introduce unreviewed topology changes. Every generated result records the resolved values and seed so it can be reproduced.

Variation should be distributed intentionally: not every letter needs the same width, terminal or mass treatment. Avoid a global uniform transform that makes a word look like a font filter.

## 8. Learning from user edits

The first production version should support explicit capture, not hidden behavioural learning.

- User may select “Save current decisions as recipe” from a project or selected glyph set.
- The engine proposes candidate rules based on the actual differences from base grammar.
- User reviews, edits and confirms the proposed rule list.
- The recipe records which traits were inferred from the current project and which were explicitly authored.
- Do not silently update recipes when a user edits artwork.
- Do not infer a permanent preference from a single one-off override.

Later opt-in learning can be considered separately, with transparent controls and a clear history.

## 9. Recipe lifecycle

- **Draft:** editable, not automatically offered as a recommended profile.
- **Active:** user-approved and available for new projects.
- **Deprecated:** retained for old projects, not suggested for new work.
- **Incompatible:** cannot currently resolve under the installed generator/contract versions; import and display remain possible.

Save creates a new immutable recipe version. Editing an active recipe creates a new version, not a mutation of old projects. Projects store recipe ID/version plus a resolved parameter snapshot. Recipe migration must be explicit and report changed, removed and unsupported rules.

## 10. UI requirements

### Personal Style Library
Show recipe name, specimen, axes summary, version, status and last-used metadata. Support create, duplicate, rename, edit, compare, export/import and archive.

### Recipe editor
Use sections:
- Identity and notes;
- Letterform and composition axes;
- Glyph preferences;
- Rhythm and proportion;
- Relationship preferences;
- Variation and locks;
- Finish;
- Compatibility and provenance.

Offer simple high-level controls first; expose detailed registered parameters in the advanced inspector. Every control must identify whether it changes construction, composition, context or rendering.

### Apply flow
Applying a recipe opens a preview branch with a concise report. Never replace current artwork in place. Let the user compare before/after and accept or discard.

## 11. Compatibility and rights

- Reuse the compatibility levels Native / Supported / Experimental / Unsupported from the existing contract.
- Experimental application requires a visible warning and validation report.
- Unsupported combinations are not auto-applied.
- Keep research references and source uncertainty in educational metadata.
- Do not ship or recommend a preset that imitates a named writer's signature, exact alphabet or identifiable work.
- Users may save original combinations and their own authored work. Imported recipe data must carry provenance and a rights declaration; missing provenance is marked unknown, not assumed clear.

## 12. Acceptance criteria

1. A recipe serializes each grammar axis independently and versionedly.
2. Rendering preferences cannot mutate canonical glyph geometry.
3. Parameter rules use registered IDs and declared scopes.
4. Resolution is deterministic and follows the precedence stack.
5. Hard glyph/topology invariants cannot be overridden by recipe rules.
6. Conflicts produce a report and obey the selected explicit policy.
7. Merge creates a new draft and preserves both source recipes.
8. Numeric interpolation is allowed only for registered, calibrated parameters.
9. Topology, variant identity and categorical axes are never numerically blended.
10. Applying a recipe creates a preview branch and never mutates source artwork.
11. Per-glyph incompatibility is reported; missing variants are not fabricated.
12. Projects preserve recipe version and resolved-value snapshot.
13. Saving a recipe from edits requires user review and confirmation.
14. Editing a recipe creates a new version; historical projects remain unchanged.
15. Export/import preserves provenance and marks unknown rights status.
16. The same recipe, project input and seed reproduce the same result under the recorded engine version.

## 13. Implementation sequence

**Slice 1 — Recipe schema and resolver:** versioned recipe records, registered parameter references, deterministic precedence, conflict report.

**Slice 2 — Save/apply workflow:** explicit capture from artwork, reviewable draft, preview branch, accept/discard.

**Slice 3 — Glyph-aware application:** per-letter variant preference, compatibility report, exceptions and relationship preferences.

**Slice 4 — Merge and controlled interpolation:** conflict UI, lineage, registry-declared interpolation only.

**Slice 5 — Library lifecycle:** compare, version, migration, import/export, archive.

Do not implement hidden preference learning or automatic recipe mutation in these slices.
