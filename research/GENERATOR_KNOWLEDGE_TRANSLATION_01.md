# Generator Knowledge Translation 01 — From Graffiti Research to Engine Rules

**Status:** Research synthesis and design inference; not a claim of completed implementation.  
**Purpose:** Consolidate the recent research pass into actionable rules for the NIGHTSHIFT creator, generator and authoring tools.  
**Editorial authority:** The source dossiers linked below remain the evidence base. This document is a crosswalk, not a replacement for them.

## 1. Evidence discipline

Every engine rule below is a NIGHTSHIFT design inference informed by research. It must not be presented as a universal historical rule. Preserve the distinction between:
- documented historical evidence;
- practitioner recollection and terminology;
- scholarly interpretation;
- NIGHTSHIFT's own product taxonomy;
- implemented, tested engine behavior.

A research entry being present in the repository does not make it publication-approved or prove that a related generator feature exists.

## 2. Core product taxonomy

The generator must not model every graffiti term as one interchangeable style preset.

| Research concept | Product axis | Engine interpretation |
|---|---|---|
| Tag / handstyle | practice + gesture-led artwork | Stroke/gesture construction and personal rhythm; never a reduced piece font |
| Throw-up | artwork form / practice context | A compact, quickly executed composition; may use Bubble or another compatible grammar |
| Piece | artwork form | A developed lettering composition; no mandatory single grammar or complexity threshold |
| Burner | cultural/evaluative descriptor | Optional contextual descriptor, not a generator grammar, numerical score or guaranteed tier |
| Bombing | activity/session context | May orchestrate multiple marks, forms and surfaces in game context; not a font or single artwork form |
| Bubble | letterform grammar | Rounded/inflated letter construction |
| Straight / Simple | letterform grammar | More direct, controlled/angular construction; broad working category, not one universal school |
| Blockbuster | contested term spanning letterform and composition/coverage descriptions | NIGHTSHIFT separates Block/straight construction from Block-fit/large-coverage composition |
| Wildstyle | historically variable term; NIGHTSHIFT composition study | Relationships, interlocking tendencies, extensions, directional flow and negative-space control; constrained by actual topology capability |
| Panel / wholecar / end-to-end | surface/coverage format | Surface bounds and composition constraints; do not distort glyph identity |
| 3D | rendering / dimensional construction | Separate from Blockbuster and from simple drop-shadow treatment |
| Aerosol / caps / paint | medium/material/execution | Rendering/material system, not glyph grammar |
| Character | figurative/compositional content | Optional independent component alongside lettering |

Terminology varies by time, place and practitioner. UI labels should offer concise context and avoid false universal definitions.

## 3. Tag and handstyle: gesture is not outline geometry

Research on handstyle, gesture and motor dynamics supports a distinct gesture-first model. A tag is not merely a piece rendered smaller. It depends on movement, stroke order, rhythm, direction, speed-related simplification, joins and individualized terminals.

NIGHTSHIFT implications:
- preserve a distinction between a written mark and the act of tagging;
- represent a gesture-based tag through ordered strokes/trajectories, stable stroke IDs, lifts and crossings where the model supports them;
- do not claim authentic handstyle from a static contour alphabet;
- if the production gesture model is not available, Tag must be labelled as a study or unavailable;
- personal style recipes may preserve original user-authored gesture/lettering preferences, but must not clone a named writer's signature.

Source dossiers:
- [Handstyle, Gesture and Motor Dynamics](HANDSTYLE_GESTURE_AND_MOTOR_DYNAMICS.md)
- [Handstyle, Motor Plans and Vector Generation](HANDSTYLE_MOTOR_AND_VECTOR_MODEL_01.md)
- [Blackbooks, Sketchbooks and Peer Learning](BLACKBOOKS_SKETCHBOOKS_AND_PEER_LEARNING.md)

## 4. Bubble, Throw-up, Piece and Burner

The research supports a clean separation:
- Bubble describes a rounded letterform approach.
- Throw-up describes an artwork/practice form often associated with simplified, quick lettering and commonly rounded forms, but not defined by one mandatory bubble alphabet.
- Piece describes a more developed composition; there is no universal complexity threshold.
- Burner is an evaluative term used in some practitioner contexts for a particularly strong piece, not a separate construction grammar.

NIGHTSHIFT implications:
- allow Bubble + Throw-up, Bubble + Piece and other compatible combinations;
- form/context may influence density, finish defaults and composition constraints, but cannot silently replace the selected letterform grammar;
- do not create a "Burner mode" that merely increases effects or displays an unsupported quality score.

Source dossiers:
- [Graffiti Formats & Practices](GRAFFITI_FORMATS.md)
- [PHASE 2 and Bubble Lettering](PHASE_2_AND_BUBBLE_LETTERING.md)
- [Style Grammar Specifications 01](STYLE_GRAMMAR_SPECIFICATIONS_01.md)
- [Style Grammar Compatibility & Parameters](STYLE_GRAMMAR_COMPATIBILITY_AND_PARAMETERS.md)

## 5. Straight, Blockbuster and 3D

Historical and practitioner classifications do not always agree whether Blockbuster, Straight, Wild or Dimensional describe a letterform, a whole piece or a production approach.

NIGHTSHIFT implications:
- keep Straight/Block construction rules separate from Block-fit composition and surface coverage;
- require visibly different monochrome construction for supported Straight and Block variants;
- permit dimensional rendering independently of the front-face letter grammar;
- do not treat extrusion, shadow or colour as proof of a distinct letterform style;
- describe internal profiles as NIGHTSHIFT product categories, not universal historical classifications.

Source dossiers:
- [3D and Blockbuster Lettering](THREE_D_AND_BLOCKBUSTER_LETTERING.md)
- [Style Grammar Specifications 01](STYLE_GRAMMAR_SPECIFICATIONS_01.md)
- [Style Grammar Compatibility & Parameters](STYLE_GRAMMAR_COMPATIBILITY_AND_PARAMETERS.md)

## 6. Wildstyle: relationships are the grammar, but scope must remain honest

Wildstyle terminology has at least three historically entangled meanings: name/crew association, ethos/attitude and the later broad visual category of complex interconnected lettering. TRACY 168 and WANTED are strongly associated with early use of the name, but sole invention of the visual grammar is not established. PHASE 2 is associated with early complex letter ideas; the development was collective and retrospective accounts differ.

Visual tendencies discussed in the research include:
- fusion or close integration of letter structures;
- interlocking and overlapping;
- extensions and directional flow;
- bars, arrows and other elements that may be structural or decorative;
- layered outlines and controlled occlusion;
- deliberate negative-space channels;
- variable legibility, not obligatory illegibility.

NIGHTSHIFT implications:
- model letter relationships as a graph with explicit semantics, not random decorative arrows;
- distinguish shared structure, continuation, interlock, overlap, extension and crossing where the solver supports them;
- preserve letter identity and counter/aperture topology;
- validate pair candidates again in whole-word context;
- keep Wildstyle as a constrained study until advanced topology is genuinely safe;
- do not advertise full automatic interlocking merely because the UI has a Wildstyle label.

Source dossiers:
- [Wildstyle, TRACY 168 and Letter Connections](WILDSTYLE_TRACY168_AND_LETTER_CONNECTIONS.md)
- [Letter-Pair Connections and Word Flow](LETTER_PAIR_CONNECTIONS_AND_WORD_FLOW.md)
- [Graffiti Letter Anatomy and Composition](GRAFFITI_LETTER_ANATOMY_AND_COMPOSITION.md)
- [Style Grammar Specifications 01](STYLE_GRAMMAR_SPECIFICATIONS_01.md)

## 7. Aerosol, caps, paint and surface are a separate material system

Aerosol output is the combined behavior of container/pressure, propellant, paint formulation, valve, actuator/cap, movement, distance, angle, surface and environmental conditions. A cap name does not imply one universal spray width. Writers historically adapted caps from other aerosol products before specialist graffiti products became commercially available; manufacturer retrospectives must be treated as interested sources.

NIGHTSHIFT implications:
- separate material/render behavior from semantic glyph construction;
- use generic, fictional material profiles rather than real-brand presets or packaging;
- keep cap profile, paint profile, surface profile, spray motion and layer stack independent;
- do not use a spray simulation to alter canonical letter geometry;
- treat exact physical spray behavior as a later calibrated simulation, not as something already established by historical sources.

Source dossier:
- [Aerosol Technology, Caps and Paint Practice](AEROSOL_TECHNOLOGY_CAPS_AND_PAINT_PRACTICE.md)

## 8. Letter anatomy and composition

Terms such as stem, bar, bowl, terminal, junction, counter, aperture, channel and anchor provide an analytical vocabulary for authoring and validation. They are useful engineering representations, not universal claims about how every writer consciously constructs letters.

NIGHTSHIFT implications:
- preserve per-glyph identity invariants and actual negative spaces;
- keep glyph construction, word layout, relationship graph and rendering separate;
- use anchor candidates only when their provenance and validity are known;
- never infer stroke order from a closed outline alone;
- expose the simplest high-impact controls first and deeper component controls in the expert authoring level.

Source dossiers:
- [Glyph Construction Guide](GLYPH_CONSTRUCTION_GUIDE.md)
- [Graffiti Letter Anatomy and Composition](GRAFFITI_LETTER_ANATOMY_AND_COMPOSITION.md)
- [Glyph Construction Library](GLYPH_CONSTRUCTION_LIBRARY.md)
- [Letter-Pair Connections and Word Flow](LETTER_PAIR_CONNECTIONS_AND_WORD_FLOW.md)

## 9. Mapping to the creator workflow

The default experience should be:

**Name → Creative Brief → Four Proposals → Choose → Refine → Save/Export/Game Artwork**

The brief should keep separate:
- source word;
- practice/activity context;
- artwork form;
- letterform grammar;
- composition grammar;
- surface/format;
- priorities (readability, flow, compactness, complexity, surface fit);
- rendering/palette;
- optional personal style recipe and locks.

Priorities are preferences, not hard-constraint overrides. Colour and finish do not count as structural proposal diversity. A proposal must be a reproducible canonical project branch, not merely a thumbnail.

The three authoring depths are:
- Creator: brief, generation, comparison, selection;
- Studio: word-level and supported per-letter refinement;
- Writer Lab: full supported glyph/component/contour/anchor/relationship authoring and personal recipe authoring.

They are progressive views of the same canonical project, not separate state stores or unlock tiers.

## 10. Implementation crosswalk

| Research/design source | Engine subsystem | Current implementation claim |
|---|---|---|
| Style grammar dossiers | Style grammar registry/resolver | Implemented only when live code and tests prove it |
| Handstyle/gesture dossiers | Gesture/stroke authoring | Do not claim available from contour editing alone |
| Pair logic/Wildstyle dossiers | Relationship solver | Constrained to registered and validated relationship types |
| Aerosol/material dossier | Finish/material renderer | Conceptual design only until calibrated implementation exists |
| Creator workflow spec | Creative brief and progressive UX | Design specification; not a shipped flow by itself |
| Variant generator spec | Deterministic candidate search | Must pass reproducibility and structural-diversity tests |
| Personal Style Engine | Recipe storage/application | Must preserve recipe version and resolved project snapshot |

The authoritative implementation contracts remain:
- [Creative Workflow and Style Authoring](CREATIVE_WORKFLOW_AND_STYLE_AUTHORING_01.md)
- [Procedural Variant Generator Core](PROCEDURAL_VARIANT_GENERATOR_CORE_01.md)
- [Personal Style Engine](PERSONAL_STYLE_ENGINE_01.md)
- [Style Grammar Compatibility & Parameters](STYLE_GRAMMAR_COMPATIBILITY_AND_PARAMETERS.md)

## 11. Open research and calibration questions

- Expand period-specific and practitioner evidence for throw-up terminology and regional variants.
- Continue comparing historical use of Blockbuster and Straight without forcing one universal taxonomy.
- Improve dated primary-source evidence for the semantic shift in “Wild Style”.
- Calibrate handstyle gesture and stroke models with original, user-authored examples and reviewed fixtures.
- Do not specify numerical aerosol spray widths without controlled source/setup evidence.
- Calibrate all priority ranges and diversity thresholds against reviewed proof sets; do not invent weights.

