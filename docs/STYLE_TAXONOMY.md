# Graffiti Style Taxonomy & Research Framework

This document is a working vocabulary and research framework, not a definitive history. Terms vary by city, period, crew and practitioner. Do not treat the categories below as mutually exclusive or as a universal classification system.

## 1. Separate practice, format and lettering style

A common design mistake is to put every graffiti term into one dropdown. They describe different dimensions:

- **Practice / mark type:** tag, throw-up, piece, stencil, poster, sticker, mural, character.
- **Scale / placement format:** panel, wholecar, end-to-end, trackside wall, rooftop, street wall.
- **Lettering grammar:** bubble, blockbuster, straight letter, wildstyle, 3D, abstract.
- **Execution / finish:** outline, inline, fill, highlights, forcefield, drop shadow, chrome effect, drips.
- **Context / scene:** borough, crew, era, surface, local tradition and subcultural setting.

The engine should model these dimensions separately. A wholecar is not a lettering style; a burner is not simply a colour preset; a character is not a letter family.

## 2. Working glossary

The descriptions below are practical starting points for product modelling. Each needs source-backed refinement before being presented as authoritative history.

### Tags
A writer's personal written mark. Usually compact and optimized around gesture, rhythm, economy and recognizable handstyle. The engine should eventually have a dedicated handstyle/gesture system, not merely shrink a piece font.

### Throw-ups / throwies
Fast, compact, often rounded or simplified letter compositions, commonly using a limited number of forms and a clear outline/fill relationship. Avoid assuming all throw-ups share one exact bubble alphabet.

### Pieces
More developed letter compositions with greater attention to structure, fill, outline, depth, extensions and overall design. A piece is a broad format of developed graffiti writing, not one fixed style.

### Burners
A term used for especially strong, striking or accomplished pieces; usage is contextual. Do not encode it as a single fixed visual recipe or a numerical quality rank.

### Wildstyle
A complex lettering approach involving interlocking, interwoven and highly articulated letter structures. Arrows and extensions alone do not make a design wildstyle. The engine needs letter skeleton, overlap logic, directional flow and controlled legibility trade-offs.

### Blockbuster
Large, broad, often highly legible lettering associated with covering substantial surfaces efficiently. Research its historical use and local variations before locking down geometry rules.

### Straight letters
A broad descriptor for more direct, structured and comparatively readable letter construction. It should not be treated as one universal canonical alphabet.

### Bubble lettering
Rounded, inflated letter construction. It can appear in tags, throw-ups and pieces; it is a construction characteristic that may overlap with other categories.

### 3D lettering
Letterforms with explicit dimensional construction, extrusion or perspective. Distinguish structural 3D geometry from a simple offset drop shadow.

### Characters
Figurative elements that can accompany lettering or exist independently. Character systems should support silhouette, pose, expression, line weight and integration with the composition.

### Stencils
Images or lettering designed around cut-out shapes and bridges that preserve islands. This is a production technique and graphic language, not a synonym for street art generally.

### Street art
A broad umbrella often used for public-facing visual practices beyond graffiti writing, including murals, paste-ups, posters, stencils and other interventions. Avoid using it as a replacement term for all graffiti.

### Wholecars / panels / end-to-ends
These describe train-car or train-surface formats and coverage patterns, not letter styles. Model the canvas/surface format separately from the lettering grammar.

## 3. Historical research requirements

For every style family or historical claim, record:

- Exact claim or design observation.
- Place and approximate period.
- Primary source or credible institutional source.
- Artist/practitioner terminology where available.
- Source author/institution and publication date.
- Whether the point is documented fact, practitioner recollection, scholarly interpretation or design inference.
- What structural feature it implies for the engine.

Prefer archives, museum collections, oral histories, interviews, books from credible publishers and carefully contextualized practitioner sources. Social posts and unsourced image aggregations can be discovery leads, not final authority.

## 4. Visual analysis template

For each reference, describe the construction rather than merely the vibe:

- Letter skeleton and stroke logic.
- Width/height proportions.
- Counter shape and size.
- Terminals and corner treatment.
- Baseline and cap-height behavior.
- Slant and directional flow.
- Inter-letter spacing and overlap.
- Negative-space pockets.
- Outline hierarchy and fill organization.
- Extensions, connections and their structural role.
- Readability and intended viewing distance.
- Surface/format context.
- Date/place/source attribution and confidence.

## 5. Engine modelling recommendation

Represent a composition with independent layers:

1. **Practice/format context** — tag, throw-up, piece, panel, wholecar, stencil etc.
2. **Lettering grammar** — bubble, blockbuster, straight letter, wildstyle and future families.
3. **Glyph construction** — individual contours, counters, metrics and anchors.
4. **Word relationships** — overlap, spacing, connection and directional rhythm.
5. **Finish** — fills, outlines, inline, depth, highlights and texture.
6. **Figurative/graphic elements** — characters and supporting motifs.
7. **Surface presentation** — paper/blackbook, wall, train-car panel or other target.

A selected format should constrain available options where appropriate without forcing every artwork into a rigid template.


## 6. Current NIGHTSHIFT grammar specification

See [Style Grammar Specifications 01](../research/STYLE_GRAMMAR_SPECIFICATIONS_01.md) for the evidence-led construction rules, parameters, failure states and acceptance tests for Bubble/Throw-up, Blockbuster, Straight Letter and Wildstyle Study.

The dossier explicitly distinguishes source observations from NIGHTSHIFT design inference. Its cross-grammar model separates letterform, composition, practice/form, surface and rendering axes. Do not simplify these into one exclusive style selector in the production data model.
