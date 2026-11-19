# NIGHTSHIFT Style Reference Library

Version 2.1.0 — complete documented working collection. Twelve style/context cards and 38 individual templates; practitioner review pending.

## Purpose
A source-aware, construction-first library for original NIGHTSHIFT graffiti lettering. It is not a moodboard. Each family card translates observable form into construction rules, templates, parameters, constraints, failure states and acceptance tests.

## Start here
- [TEMPLATE_CATALOG.md](TEMPLATE_CATALOG.md) — complete human-readable collection of all 38 templates, including intent, construction, parameters, guardrails and acceptance probes.
- [templates.json](templates.json) — machine-readable registry with stable IDs, axes, maturity and engine-status labels.
- [TEMPLATE_INDEX.md](TEMPLATE_INDEX.md) — compact family/template index and engine support snapshot.
- [STYLE_TAXONOMY.md](STYLE_TAXONOMY.md) — separates letterform, composition, practice/context and rendering.
- [STYLE_COMPARISON_MATRIX.md](STYLE_COMPARISON_MATRIX.md) — controlled comparison of core grammars.
- [RENDERING_TREATMENTS.md](RENDERING_TREATMENTS.md) — hollow, outline, fill, 3D, chrome, drips and other non-letterform treatments.
- [QUALITY_CONTROL.md](QUALITY_CONTROL.md) — visual acceptance gates.
- [PROOF_IMPLEMENTATION_PLAN_01.md](PROOF_IMPLEMENTATION_PLAN_01.md) — audit of what the current engine can actually render and staged implementation plan.
- [references/SOURCES.md](references/SOURCES.md) — research source register.
- [references/IMAGE_REFERENCE_INDEX.md](references/IMAGE_REFERENCE_INDEX.md) — external alphabet references and rights notes.
- [../../../research/STYLE_GRAMMAR_SPECIFICATIONS_01.md](../../../research/STYLE_GRAMMAR_SPECIFICATIONS_01.md) — existing generator-oriented grammar baseline; preserve and extend rather than duplicate.

## Style cards
| Card | Primary axis | Templates |
|---|---|---:|
| Bubble | Letterform | 3 |
| Blockbuster / Block | Letterform + format context | 3 |
| Wildstyle | Composition | 3 |
| Tag / Handstyle | Inscription + movement | 3 |
| Throw-up | Work format | 3 |
| Simple / Straight | Letterform | 4 |
| Angular / Blade | Letterform | 3 |
| Semi-Wildstyle | Composition | 3 |
| Traditional / Old-School | Historical umbrella / mixed | 4 |
| Old English / Blackletter | Script-derived letterform | 3 |
| Calligraffiti | Hybrid letterform / movement | 3 |
| Anti-Style / Experimental | Experimental grammar | 3 |
| **Total** | **12 families** | **38** |

The templates are documented design hypotheses, not practitioner-approved definitions or generator-ready presets.

## Core modelling rule
Do not encode styles as one flat list of mutually exclusive presets. Keep separate axes:
1. Letterform grammar — how an individual glyph is built.
2. Composition grammar — how glyphs interact in a word or piece.
3. Practice / format context — tag, throw-up, piece, panel, wholecar, etc.
4. Rendering treatment — fill, outline, inline, depth, chrome, texture, drips.

A single output may combine one choice from several axes. For example: Straight letterform + Throw-up format + Hollow treatment.

## Evidence labels
Every rule is Source observation, Cross-source synthesis, NIGHTSHIFT design inference, or Open question. Do not present engineering rules as historical facts. Operational subfamilies such as Blade, Raw or Graphic Semi-Wild are explicitly NIGHTSHIFT working templates unless a source supports the term.

## Rights and originality
External reference sheets are discovery aids. Public visibility is not a reuse license. Do not commit third-party images without item-level rights clearance. Do not clone identifiable writers, crews, tags, signatures or existing pieces. Build original fictional letterforms.

## Review and implementation sequence
1. Practitioner/editor review of taxonomy and cards.
2. Create monochrome comparison sheets for all templates.
3. Validate a representative glyph test set before full A–Z rollout.
4. Test word pairs and dense words for spacing, counters and joins.
5. Calibrate numerical parameters from rendered examples, not intuition alone.
6. Only then expose templates as selectable generator presets.

## Maturity
The expanded cards define a research and design baseline. They do not claim that every style is historically settled, and they do not imply that all templates have been implemented in the generator. See the maturity labels and engine-status map in the catalog.
