# GRAFFITI LETTER ANATOMY AND COMPOSITION

**Scope:** structural components and compositional relationships useful for studying and constructing graffiti lettering.  
**Status:** research-to-design synthesis. Technical vocabulary is descriptive; it is not presented as a universal historical lexicon used identically by all writers.

## 1. Why anatomy matters

A graffiti piece is not simply a conventional font with decoration applied. Daniel Berio’s doctoral thesis *AutoGraff* (Goldsmiths, University of London, 2021) describes letterforms assembled from reusable visual building blocks, including elongated geometric “sticks” and rounded “softies”. It discusses arrows, stars, hearts and bars/doodads as elements used to customize forms, improve compositional balance and increase dynamism. It also describes overlapping, looping, interlocking structures and extrusion effects. [A: doctoral research]

Berio’s account connects visual description with computational construction. It is not a universal style manual: it is one research model informed by selected writers, prior literature and the author’s own system.

## 2. A practical vocabulary for the archive

Use these as explanatory terms. Where a term has multiple meanings in practitioner speech, preserve the source-specific definition.

- **Stroke / bar:** a visual segment or mass contributing to the construction of a letter. In graffiti discussion, “bar” may refer to a structural stroke element; do not assume it means the same thing in every style.
- **Stem:** a principal upright or diagonal structural part of a letter. This is a typographic/analytic term that can help describe a form; it is not necessarily writers’ own vocabulary.
- **Crossbar:** a stroke crossing or connecting other parts of a letter, as in E, A or H.
- **Terminal:** an ending of a stroke or form.
- **Counter:** an enclosed or partly enclosed interior region of a letter, such as the inner space in O, P or A.
- **Aperture:** an opening into a partly enclosed counter, relevant to forms such as C, G and e.
- **Join / connection:** a point or region where structural parts meet, overlap or visually continue.
- **Extension:** a part that projects beyond the basic letter structure. It may contribute direction, rhythm or identity, but can also obscure recognition.
- **Arrow / doodad:** a decorative or directional element. Berio lists arrows, stars, hearts and bars among common additional elements; these are not mandatory parts of every piece.
- **Outline:** a contour that defines the outer boundary of a letter mass or composition.
- **Inline / highlight / extrusion:** rendering treatments that may add internal line, light or apparent depth. They should be kept distinct from the underlying glyph skeleton.

## 3. Letter identity, structure and style

A useful analytical distinction is:

1. **Letter identity:** what makes the form recognizable as A, B, C, etc.
2. **Construction:** how strokes, masses, counters and connections form that letter.
3. **Style grammar:** how those components are shaped, proportioned and related.
4. **Composition:** how multiple letters interact in a word or piece.
5. **Rendering:** outline, fill, highlights, shadow and depth.

These layers influence one another, but should not be collapsed into one parameter. A chrome fill does not make a letter Wildstyle; a 3D extrusion does not create a new letter skeleton.

## 4. Word-level composition

Berio describes stylized pieces as overlapping, looping and interlocking, with visual additions used to improve balance and movement. From this, the archive can explain several composition questions:

- **Rhythm:** the sequence of widths, heights, angles and visual weights across the word.
- **Flow:** the perceived directional movement created by slant, repeated angles, extensions and connections.
- **Balance:** the distribution of visual mass across the composition.
- **Compression / expansion:** changes in spacing and proportions to make a word function as one composition.
- **Overlap:** where adjacent letters or elements share visual territory.
- **Legibility:** how clearly the name can be recognized by a viewer with different levels of familiarity.
- **Negative space:** the empty regions between and inside letter masses. This is an analytical design concept; the cited thesis does not define it as a universal writer term.

These are useful analytical categories, not a fixed recipe or quality score.

## 5. Sketch-to-surface process

Berio’s thesis describes a common sequence: preliminary pen or marker sketch on paper; transfer to a larger surface; fill and color; final outline; and optional extrusion/highlights. The process is a useful model, but not every writer works in this order or from a paper sketch.

Janice Rahn’s ethnographic study documents writers keeping black books to sketch ideas, collect signatures and tags from other writers, test combinations and prepare for larger pieces. It also records differing attitudes toward working from sketches versus painting from memory. [A: ethnographic research]

## 6. NIGHTSHIFT data model — design inference

Recommended separation:

- glyph_skeleton: primary letter identity and structural paths
- stroke_components: bars, stems, crossbars, terminals and other segments
- counter_regions: enclosed and open negative spaces
- connections: joins between components and adjacent letters
- extensions: optional projections with attachment points
- composition_layout: spacing, scale, slant, overlap and word-level balance
- style_grammar: bubble, blockbuster, straight-letter study, wildstyle study, etc.
- render_layers: fill, outline, inline, highlight, shadow, extrusion

Each component should retain provenance: authored by NIGHTSHIFT, derived from a generic construction rule, or adapted from a rights-cleared reference. Never encode a named writer’s signature as a reusable preset.

## 7. Generator tests worth implementing

1. **Recognition test:** can the base letter still be identified before decorative additions?
2. **Counter preservation:** are important interior spaces open and non-collapsed?
3. **Join validity:** do connected components actually touch or overlap as intended?
4. **Collision distinction:** can intentional overlaps be distinguished from accidental geometry intersections?
5. **Word rhythm:** do adjacent glyphs share a coherent scale and directional movement?
6. **Negative-space inspection:** are internal and inter-letter gaps visually intentional?
7. **Layer independence:** can fill, outline and depth change without corrupting the glyph skeleton?

These are proposed engineering checks, not historical rules.

## 8. Sources

1. Daniel Berio, *AutoGraff: Towards a Computational Understanding of Graffiti Writing and Related Art Forms*, doctoral thesis, Goldsmiths, University of London, 2021. Especially chapter 1, pp. 22–26: https://research.gold.ac.uk/id/eprint/29999/1/COM_thesis_BerioD_2021.pdf
2. Janice Rahn, “Painting Without Permission: An Ethnographic Study of Hip-Hop Graffiti Culture”, *Material Culture Review*: https://journals.lib.unb.ca/index.php/MCR/article/download/17784/22155?inline=1

## 9. Related research

- [Lettering Styles](LETTERING_STYLES.md)
- [Wildstyle, TRACY 168 and Letter Connections](WILDSTYLE_TRACY168_AND_LETTER_CONNECTIONS.md)
- [3D and Blockbuster Lettering](THREE_D_AND_BLOCKBUSTER_LETTERING.md)
- [PHASE 2 and Bubble Lettering](PHASE_2_AND_BUBBLE_LETTERING.md)
- [Glyph Construction Guide](GLYPH_CONSTRUCTION_GUIDE.md)
