# NIGHTSHIFT — Graffiti Letterform Grammar Research 01

**Status:** research baseline / design brief; not implementation approval  
**Branch:** `research/graffiti-letterform-grammars-01`  
**Purpose:** replace generic geometric font transformations with distinct, reference-led graffiti lettering grammars.

## 1. Why this work exists

The Phase-A proof plates demonstrate that the current resolver can transform the authored neutral glyph masters. They do not demonstrate convincing graffiti style.

Owner feedback on Phase A (19 Nov 2026): the result is acceptable as a technical proof but, apart from the Bubble direction, remains far from graffiti. Straight and Blockbuster read too much like geometrically modified display lettering.

**Decision:** Phase A remains a technical proof only. It is not a stylistic approval, and no style is promoted to `generator-ready` by this document.

The core failure is architectural: a generic neutral alphabet is being treated as the visual ceiling, while styles are expressed as operations such as chamfer, inflate, widen or fit. Graffiti styles need their own letterform logic, proportions, rhythm and construction rules. Effects such as outline, fill, chrome, shadow and extrusion must remain separate rendering treatments.

## 2. Evidence and terminology

The sources below are not interchangeable authorities. Museum and academic material is used for broad distinctions and historical framing; specialist/community material is useful for visual vocabulary and practical interpretation. Individual artists' work remains the primary visual evidence for a later, carefully curated reference set.

### 2.1 Museum and academic sources

1. **Kunstmuseum Stuttgart — _Wände | Walls: Graffiti im Kessel_ (brochure, German/English).**  
   URL: https://www.kunstmuseum-stuttgart.de/sites/default/files/2021-04/waendewalls_graffiti_im_kessel_broschuere_webversion.pdf  
   Useful distinctions:
   - Tag: writer signature / acronym.
   - Throw-up: quickly executed lettering, commonly outline-led and sparsely filled.
   - Simple Style: may be round, angular, tilted, overlapping or embellished, but remains immediately readable.
   - Semi-Wildstyle: complex-looking composition and graphic additions, but less interwoven and generally more readable than Wildstyle.
   - Wildstyle: tightly interwoven letters and connective elements; readability can become difficult for outsiders.
   **Design consequence:** Straight/Simple cannot be defined as merely unmodified neutral typography; Wildstyle is not a bag of arrows; Throw-up is a practice/format as well as a visual form.

2. **Oxford Research Encyclopedia — Graffiti.**  
   URL: https://academic.oup.com/edited-volume/41333/chapter/352362769  
   Useful framing: tag, throw-up and piece are distinct practices/forms; a throw-up is not simply a generic bubble font, and pieces allow a wider range of elaborate letter construction.
   **Design consequence:** separate practice/format context from letterform grammar.

3. **Marta R. Bisceglia — _Graffiti in China_, glossary and historical discussion.**  
   URL: https://cris.unibo.it/retrieve/handle/11585/1005801/03dc0df6-e9fc-45f0-8d11-566312747809/Graffiti-in-China-1-1.pdf  
   Useful vocabulary includes Blockbuster/Block, Bubble Style and 3D as distinct concepts/treatments. The glossary describes Blockbuster as large square/rectangular block letters used for fast, broad coverage, and 3D as a dimensional treatment that can be applied to letterforms.
   **Design consequence:** Blockbuster needs a purpose-built broad block grammar and composition; 3D is not a letterform family.

4. **_Graffiti Archaeography_ (Western Sydney University research repository).**  
   URL: https://researchers.westernsydney.edu.au/files/94853086/uws_15396.pdf  
   Useful distinctions between pieces, Wildstyle, Semi-Wildstyle, Blockbusters and Throw-ups; notes that Blockbusters are simplified pieces and Throw-ups are speed-oriented, outline-led forms.
   **Design consequence:** speed, scale and execution context should be represented explicitly rather than encoded as arbitrary shape filters.

### 2.2 Specialist / community-oriented reference sources

5. **Thomas Dürst — _Style Writing: eine kleine Stilkunde_ (2020, updated 2023).**  
   URL: https://duerst.eu/blog/20-01-07_Graffiti-Stilkunde.htm  
   Useful German-language overview of terms such as Tag, Throw-Up, Piece, Masterpiece, Silverpiece, Blockbuster, Schraffo, Semi-Wildstyle, Simple Style, Wildstyle, Hollow and Bubble Style. Use as a terminology cross-check, not as the sole taxonomy.

6. **Hip Hop Education Archive — Graffiti.**  
   URL: https://thehiphoparchive.org/elements/graffiti  
   Useful overview of tagging, throw-ups, Wildstyle, blackbook work and can control. Use as contextual support, not a formal style specification.

7. **Graphitti Archive — Visual Language.**  
   URL: https://shadowban.co.uk/websites/Graphitti-Archive/  
   Useful practical visual prompts: handstyle rhythm and stroke direction; bubble soft shapes and repeated curves; block/straight silhouette and proportion; Wildstyle connections and extensions. Treat as a secondary interpretive resource.

## 3. Revised architecture: four independent layers

A style preset must not collapse all of these into one label.

1. **Letterform grammar** — how each letter is constructed: skeleton, mass, bowls, stems, terminals, counters, joins, asymmetry, axis and rhythm.
2. **Composition grammar** — how letters interact in a word: spacing, baseline, scale rhythm, overlap, connections, crossings, flow and hierarchy.
3. **Practice / format context** — tag, throw-up, piece, blockbuster scale, blackbook study, etc. Context constrains time, scale, simplification and execution logic; it does not automatically dictate one alphabet.
4. **Rendering treatment** — fill, outline, inline, shadow, extrusion/3D, chrome, highlights, drips, texture and background. These do not create a convincing letterform by themselves.

## 4. First design targets

These are design hypotheses to validate against visual references and practitioner review. They are not yet implementation-ready specifications.

### A. Bubble / Softie — retain as promising, rebuild safely

**What must read:** inflated, elastic, rounded letter masses with intentional glyph-specific character. The result must not look like a generic rounded font or a uniform oval inflation.

**Letterform features**
- Bowl shapes and outer contours have controlled, glyph-specific tension.
- Stems and joins are thick, but necks remain deliberate and readable.
- Counters are designed shapes, not leftover holes after offsetting.
- Terminals and transitions are rounded with variation; avoid identical corner radii everywhere.
- Width and height vary by glyph role while maintaining a coherent family rhythm.

**Composition features**
- Compact, close word rhythm can be used, but letters must not merge into one untraceable blob.
- Overlap is not the default; every intentional contact needs explicit relationship semantics and geometric validation.

**Negative examples:** uniform dilation; circularising every glyph; pinhole counters; sealed G apertures; identical letter widths; indiscriminate Bounce overlap.

**Priority specimens:** A B C G O R S U; words BUBBLE, GHOST, SOUL.

### B. Simple / Straight — redesign as graffiti lettering, not font cleanup

**What must read:** confident, hand-built, readable graffiti letters with strong silhouette, deliberate proportions and writerly rhythm. “Simple” means less complex than Wildstyle, not typographically plain.

**Letterform features**
- Individual letter proportions are designed, not inherited mechanically from a neutral font.
- Stems may lean, taper, widen, pinch or carry controlled extensions.
- Bars and joints have deliberate overshoots, offsets and directional tension.
- Counters are active design shapes; they need not be typographic defaults.
- Selected serifs, cuts, hooks or terminals may establish a consistent handstyle vocabulary.
- Repeated features create family resemblance, while glyph-specific construction avoids a cloned-font appearance.

**Composition features**
- Readable at first glance, but not mechanically typeset.
- Baseline, cap height, slant and spacing can vary in a controlled rhythm.
- Slight interlocking or near-contact may be explored only where the style grammar supports it; do not fake complexity with random overlap.

**Negative examples:** merely chamfering a neutral outline; global horizontal scaling; identical stems and widths; no silhouette change; font-like even spacing.

**Priority specimens:** A E G K M R S; words ABRA, KRAFT, MIND.

### C. Blockbuster / Block — purpose-built block construction plus format logic

**What must read:** large, broad, square/rectangular and economical lettering designed to occupy a surface efficiently. It is not just Straight with a fit-box or thicker outline.

**Letterform features**
- Broad, squared letter masses with robust, economical construction.
- Glyphs may be deliberately condensed or expanded according to word fit, but retain individual anatomy.
- Bars, stems and corners use a consistent block-building logic.
- Counters are simple, robust and sized for distance legibility.
- Slant and perspective are optional variants, not mandatory decorations.

**Composition / context features**
- Word-level width and height planning is central.
- Shared cap height, baseline and block rhythm; spacing is compensated for the actual glyph silhouette.
- Design for large-scale coverage and quick execution, while maintaining legibility.

**Negative examples:** simply thickened Straight; every letter forced into the same rectangle; arbitrary slant; collapsed counters; a word compressed by non-uniform scaling.

**Priority specimens:** A E H M R; words POWER, TRAIN, KRAFT.

### D. Throw-up — format grammar, not a synonym for Bubble

**What must read:** fast, bold, compact, economical name lettering with a recognisable silhouette. Bubble-derived forms are common, but not the only possible construction.

**Letterform features**
- Reduced detail and a small number of strong shapes.
- High visual mass and fast-to-read silhouette.
- Rounded or block-derived constructions can be separate variants.
- Outline-led / hollow presentation is a treatment or execution variant, not automatically a separate alphabet.

**Composition / context features**
- Compact word shape and repeatable letter rhythm.
- Clear outline path and manageable internal spaces.
- Fill and outline remain separate rendering/execution layers.

**Negative examples:** a polished multi-layer piece mislabeled as throw-up; treating all throw-ups as identical bubbles; using chrome or colour to hide weak letterforms.

**Priority specimens:** B O M R S; words BOMB, GHOST, RISK.

### E. Wildstyle / Semi-Wildstyle — relationship-led, not decoration-led

**What must read:** a designed network of letters and connections, not isolated glyphs with random arrows.

**Letterform features**
- Underlying letter skeleton remains documentable even when partially obscured.
- Extensions originate from explicit glyph anchors and have a structural purpose.
- Directional flow, terminal logic and negative-space channels are coordinated across the word.

**Composition features**
- Explicit graph of attachments, overlaps, crossings, continuations and near-contacts.
- Every crossing has a layer/order rule.
- Each connection has stable glyph/feature anchors and a geometric clearance/topology check.
- Semi-Wildstyle keeps more of the base letters legible and uses fewer joins; Wildstyle permits denser interlocking and abstraction.

**Negative examples:** arbitrary arrows; unanchored spikes; decorative lines mistaken for connections; overlapping bounds without contour checks; illegibility caused by accidental collisions.

**Priority specimens:** AR, BA, RA, ABRA, KRAZE, GHOST.

## 5. Reference collection protocol

Do not ask a model to invent the style from its name alone. Build a reference set before drafting construction rules.

For every target grammar, collect:
- 12–20 visual examples from multiple writers / regions / decades where possible.
- At least 4 close-up crops where letter anatomy is visible.
- At least 4 whole-word examples to inspect rhythm and composition.
- At least 2 examples with simpler letter combinations and 2 with difficult counters/joins.
- Source URL, creator attribution where known, date/region if known, access date and rights/usage note.
- A short feature annotation: silhouette, skeleton, stem mass, counter shape, terminals, slant, spacing, connections, distinctive recurring features.
- A counterexample / failure case where a superficial imitation misses the style.

**Rights and ethics:** use images as internal analytical references with provenance. Do not copy an artist's signature, distinctive piece, exact word composition or proprietary artwork into generated templates. Build original letter systems from shared structural observations. Before redistributing images or embedding them in public docs, verify license/permission; otherwise link to source and keep descriptive notes.

## 6. Visual evaluation protocol

Each style must be rendered in two separate views:
1. **Letter anatomy sheet:** fixed glyph set, monochrome silhouettes, identical scale, no effects.
2. **Word composition sheet:** same test words across styles, natural word rhythm, plus relationship/collision report where relevant.

Review criteria (score each 0–4; allow `cannot-judge` and `neither`):
- Immediate style recognition.
- Distinctiveness from neutral / ordinary display typography.
- Internal consistency across glyphs.
- Glyph-specific anatomy (not one global filter).
- Word rhythm and composition.
- Readability appropriate to the style.
- Counter / aperture integrity.
- Faithfulness to reference features without copying a specific artist.

**Hard rule:** technical tests can reject broken geometry; they cannot certify that a result looks like graffiti. Practitioner/owner review is required for stylistic maturity.

## 7. Work sequence

1. Complete the reference corpus for Bubble, Simple/Straight, Block/Blockbuster and Throw-up first.
2. Write annotated letterform grammar cards with positive and negative examples.
3. Create hand-authored prototype alphabets / specimen sketches that prove the grammar before automation.
4. Compare at least two distinct construction hypotheses per family.
5. Only then design parameterised generators and geometric safety gates.
6. Re-run monochrome proof sheets; do not introduce rendering effects to compensate for weak construction.
7. Add Semi-Wildstyle and Wildstyle after relationship graph and contour topology work is ready.
8. Keep Tag/Handstyle separate: it requires stroke / gesture modelling, not filled glyph polygons.

## 8. Immediate next tasks

- [ ] Create a provenance-tracked reference corpus, starting with Bubble, Simple/Straight, Block/Blockbuster and Throw-up.
- [ ] Audit existing family cards against the grammar/layer model; mark taxonomy errors and underspecified terms.
- [ ] Produce original annotated specimen studies for A/B/G/R/S and the word ABRA, with at least two design hypotheses per target style.
- [ ] Add owner/practitioner review choices: pass, needs-revision, fail, neither, cannot-judge.
- [ ] Keep all new style concepts at `documented-draft` until visual review.
- [ ] Keep the C03 Bubble/Bounce safety issue separate from the broader visual redesign.

## 9. Research limitations

This document is a first research baseline, not an exhaustive global history or a substitute for writer/practitioner review. Graffiti terminology varies by place, generation and community. The categories overlap, and a style label may describe letterform, composition, practice context or a mixture. Future cards must preserve that uncertainty rather than force a false universal taxonomy.
