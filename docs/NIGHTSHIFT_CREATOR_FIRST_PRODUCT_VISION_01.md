# NIGHTSHIFT — Creator-First Product Vision 01

**Status:** Owner-confirmed product direction, 2026-11-15  
**Authority:** Product direction for the 1.0 editor, subject to explicit owner decisions and the finite release scope.  
**Implementation owner:** Claude  
**Research/specification and independent QA:** ChatGPT

## 1. Product thesis — teach the writer

NIGHTSHIFT is a graffiti creative system that behaves like a knowledgeable virtual writer: the user gives it a name and a creative brief; the system proposes original lettering/artwork concepts; the user selects, develops and may eventually construct the work entirely by hand.

The editor is not primarily a drawing application with a generator bolted on. It is a **creator-first generative studio with progressively deeper authoring tools**.

The “virtual writer” is a product metaphor for a deterministic, research-informed system of glyph knowledge, grammar rules, composition strategies, validated operations and user-authored preferences. Do not imply that the system has human cultural experience or that a style label guarantees historical authenticity.

The first interaction must be understandable without graffiti or vector-editing expertise:
1. Enter a word/name.
2. Choose the desired artwork/practice context.
3. Choose one or more compatible style directions.
4. Set a few understandable creative priorities.
5. Choose colours and finish.
6. Generate and compare multiple proposals.
7. Select one and refine it, or go deeper into complete manual construction.

## 2. Progressive creative depth

The product has three progressive levels. They are presentation/complexity levels, not unlock gates. A user may move between them at any time without losing work.

### Creator — brief to proposals
The default entry point. Keep the first screen focused and welcoming:
- word/name input and character support feedback;
- artwork/practice context selection using plain-language labels;
- style direction selection with short visual/structural explanations;
- a small set of understandable priorities;
- palette and finish controls;
- Generate action;
- four comparable, structurally distinct proposals;
- concise explanation of how proposals differ;
- select, save, regenerate and branch actions.

Do not expose the full parameter inventory on the first screen. Offer sensible defaults and optional advanced settings. Explain unsupported combinations before generation.

### Studio — refine a proposal
The selected proposal becomes an editable branch. The user can:
- adjust word-level rhythm, scale, spacing, slant and composition;
- select and edit individual letters where glyph maturity and operation registry permit it;
- inspect and choose valid relationship suggestions;
- alter fills, outlines, backgrounds, layers and supported finish properties;
- compare revisions, revert, save, duplicate and export.

The four source proposals remain recoverable. Editing one must not mutate siblings or the original request.

### Writer Lab — author from the structure up
An expert environment for:
- editing glyph components, contours and nodes;
- creating or revising original glyph variants;
- working with anchors and explicit relationships;
- authoring composition and personal style recipes;
- inspecting topology, counters, apertures and negative space;
- saving/versioning reusable recipes and exporting only original or appropriately licensed data.

Only validated, registered operations may commit to canonical project state. Do not display controls as functional before the operation and persistence path exist.

## 3. Keep the creative dimensions independent

A creative brief is a combination of orthogonal axes, not one overloaded “style” dropdown.

| Dimension | Meaning | Examples |
|---|---|---|
| Source text | Name/word | MRPAVIAN |
| Practice/activity | What the writer is doing in game/cultural context | tagging, bombing, writing |
| Artwork form | Kind of result | tag, throw-up, piece |
| Letterform grammar | How individual letters are constructed | bubble/rounded, straight/angular, block, hybrid, authored |
| Composition grammar | How the word is organized | neutral, compact, block-fit, interlocking study |
| Surface/format | Where and at what scale | blackbook, wall, panel, wholecar, paper |
| Priorities | Preferred trade-offs | legibility, flow, compactness, complexity, surface fit |
| Rendering/finish | Presentation of approved geometry | fill, outline, inline, highlights, depth, texture, palette |

These are product axes. Historical terminology is variable and must remain contextual.

### Taxonomy rules that affect the UI

- **Tag:** can refer to the written mark and to the act of tagging. It is fundamentally name/handstyle-led. Do not generate it by shrinking a piece alphabet. A credible tag workflow needs a gesture/stroke-based handstyle model. If that capability is not implemented, label it as a study/unavailable.
- **Throw-up:** an artwork form often associated with quick, simplified lettering and often rounded forms. It is not synonymous with Bubble. Bubble grammar may be selected independently where compatible.
- **Piece:** a developed lettering composition, not one fixed style or complexity threshold.
- **Burner:** an evaluative/cultural description for a particularly strong piece in some contexts, not a separate geometry grammar or guaranteed quality tier. It may appear as an editorial descriptor, never as a magic preset or score.
- **Bombing:** an activity/context, not a letterform grammar or singular artwork format. In game context it may describe a session or sequence involving multiple marks/artwork forms and surfaces. Do not model it as a “Bombing font”.
- **Panel / wholecar / wall:** surface and coverage formats. They constrain layout and presentation; they must not silently distort glyph identity.
- **Character:** an optional figurative/compositional element, separate from lettering grammar.

Where a term has multiple practitioner meanings, show a short contextual explanation rather than forcing a universal definition.

## 4. User priorities must produce understandable trade-offs

Creator should offer a compact set of priorities:
- **Readability** — preserve clear recognition of the entered name.
- **Flow / dynamism** — favor directional rhythm and movement.
- **Compactness** — use space efficiently and keep the word tight.
- **Complexity** — allow more elaborate structure and relationships within validated capability.
- **Surface fit** — favor a composition suited to the selected canvas or vehicle area.

Do not expose arbitrary numeric sliders until behavior is calibrated and explainable. A priority is a preference, not permission to break hard geometry rules. Hard validation always wins. Explain conflicts such as compactness reducing inter-letter negative space.

Keep quality dimensions separate in the underlying model. A single user-facing preference must not collapse identity, topology, grammar coherence, composition, negative-space quality and maturity into one opaque score. If the engine cannot fulfill a priority with available glyphs/operations, report the limitation and offer a valid alternative.

## 5. Colour and finish are not structural style

Palette, fill, outline, inline, highlights, depth and texture are rendering/finish decisions. They must not define letterform grammar, count as structural diversity, repair invalid glyph construction, or change canonical geometry unless the user invokes an explicit validated geometry operation.

Show proposals under comparable neutral preview conditions as well as their chosen finish so the user can compare construction fairly.

## 6. Proposal generation and selection

Retain D-006 and the existing deterministic generator contract:
- Generate exactly four proposals when four valid, sufficiently distinct candidates can be produced.
- Proposals are canonical project branches, not just rendered images.
- They must differ in measurable construction/composition features, not merely colour, texture, outline or tiny coordinate noise.
- Record the creative brief, grammar/recipe versions, glyph maturity, generator version, root seed and candidate seeds.
- Preserve the original proposal set. Selecting one creates an editable branch.
- If four valid, sufficiently diverse candidates cannot be produced, return an honest actionable failure/partial state. Never pad with cosmetic duplicates or weaken hard validation.

Each proposal should have a compact explanation derived from actual candidate data, such as broader letter proportions, tighter rhythm, more open spacing or stronger directional flow.

## 7. Research knowledge becomes executable design knowledge

The research library remains the editorial source of truth. The generator consumes reviewed, versioned design rules derived from research; it does not consume raw historical text as code.

Keep separate:
1. documented historical fact;
2. practitioner account;
3. scholarly interpretation;
4. NIGHTSHIFT design inference;
5. implemented and tested engine behavior.

Key translations:
- Bubble is a rounded letterform grammar; Throw-up is a distinct artwork/practice context.
- Straight and Blockbuster overlap in terminology but are not assumed identical in the product model.
- Wildstyle is a constrained composition/relationship study, not a promise of full automatic interlocking.
- Aerosol/cap/paint/surface knowledge belongs to material and rendering simulation, not glyph identity.
- Letter anatomy and graph relationships are engineering representations, not universal descriptions of how every writer consciously works.

Do not use named writers or crews as selectable presets. Do not reproduce identifiable signatures or specific artworks. Use broad, sourced structural principles and original constructions.

## 8. Architecture implications

The canonical semantic/vector project model remains the source of truth. Three.js is the interactive editing/presentation surface; meshes are derived. All edits commit through typed, validated commands.

A versioned creative brief/request should snapshot:
- normalized word and glyph sequence;
- artwork/practice/surface axes;
- selected letterform and composition grammars;
- priority preferences and explicit locks;
- palette/finish settings;
- recipe IDs/versions and resolved snapshots;
- glyph/operation maturity and compatibility report;
- generator/schema/grammar/solver versions and deterministic seed.

A proposal stores its resolved choices and canonical geometry. The selected proposal branches into an editable project. Manual edits must not be overwritten by regeneration or assistance without preview and explicit acceptance.

Reuse and reconcile existing specifications/contracts before creating new ones:
- research/CREATIVE_WORKFLOW_AND_STYLE_AUTHORING_01.md
- research/PROCEDURAL_VARIANT_GENERATOR_CORE_01.md
- research/PERSONAL_STYLE_ENGINE_01.md
- research/STYLE_GRAMMAR_COMPATIBILITY_AND_PARAMETERS.md
- research/THREEJS_EDITOR_INTERACTION_AND_UX_01.md
- contracts/creative-workflow.v1.json
- contracts/procedural-variant-generator.v1.json
- contracts/personal-style-engine.v1.json

Do not create parallel competing contracts or duplicate databases.

## 9. 1.0 scope and sequencing

The full vision is broader than what can responsibly ship in one release. Preserve the finite 1.0 plan and implement in dependency order.

For 1.0:
- make Creator the default path through genuinely supported capabilities;
- deliver the supported letterform/composition scope and four-concept generation with honest maturity/compatibility reporting;
- allow a selected concept to enter validated editing/persistence/export;
- surface Tag, full Bombing-session orchestration, advanced Character systems, complete Wildstyle interlocking and other unsupported capabilities as limited studies or clearly marked future work.

Do not inflate release scope by adding UI labels. Show the intended creative direction without promising unimplemented functionality.

## 10. Product acceptance checklist

- A novice can enter a name and reach four useful proposals without learning vector terminology.
- The brief exposes understandable form/style/priority/colour choices with safe defaults.
- Each selected axis is represented independently in saved project data.
- Unsupported text/style/form combinations are reported before or during generation.
- Proposals differ structurally and can be compared in neutral and finished views.
- Selection creates an editable branch and preserves siblings.
- The user can progressively enter Studio and Writer Lab without losing work.
- Assistance is opt-in, previewable and never silently overwrites manual work.
- All accepted changes pass canonical validation and survive save/reload/export.
- Historical labels, design inferences and implementation maturity are not conflated.
