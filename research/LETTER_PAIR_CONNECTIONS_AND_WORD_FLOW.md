# LETTER-PAIR CONNECTIONS AND WORD FLOW

**Scope:** how adjacent letters can be analyzed as a composition rather than independent glyphs.  
**Status:** engineering-oriented synthesis grounded in graffiti computation research. Proposed pair rules are NIGHTSHIFT design hypotheses, not historical universal rules.

## 1. Why pair-level logic matters

A word can contain individually convincing letters and still fail as a piece if transitions between them feel arbitrary. Berio’s *AutoGraff* treats graffiti lettering as a system of reusable strokes and dynamic drawing gestures; its research aim includes interactive and procedural generation of stylized letters. The research notes also describe looping, interlocking and compositional operations. [A]

Berio and Leymarie’s paper on computational models for graffiti tag strokes argues that movement dynamics are central to stylistic quality. It uses a motor-control model to generate and manipulate curves with handwriting-like movement. [A]

Neither source supplies a universal table saying which letter pairs should connect. The pair logic below is a proposed way for NIGHTSHIFT to operationalize structural analysis, not a recovered historical rulebook.

## 2. Analyze a pair in layers

For adjacent glyphs A and B, inspect these independent relationships:

1. **Proximity:** are their silhouettes close enough to read as a single word?
2. **Scale rhythm:** do height, width and visual mass relate coherently?
3. **Angle rhythm:** do dominant axes reinforce, alternate or deliberately contrast?
4. **Connection opportunity:** are there compatible terminals, bars or anchor zones?
5. **Counter protection:** would a proposed join close an important counter or aperture?
6. **Occlusion:** which shape visually sits in front, and is that ordering intentional?
7. **Negative-space channel:** does the gap between letters remain deliberate?
8. **Flow continuation:** does the eye move naturally from one glyph to the next?

A connection is not automatically desirable. Separation can be a valid compositional choice.

## 3. Connection types for an editor

These are neutral engineering labels, not historical style names:

- **Near-touch:** two contours approach without touching.
- **Terminal-to-terminal:** a terminal visually meets a terminal on the neighboring glyph.
- **Bar continuation:** a structural bar appears to continue across the pair.
- **Shared stroke:** two glyph constructions use a common structural segment.
- **Overlap:** contours cross or occupy shared space without necessarily merging.
- **Interlock:** parts weave through or around one another; requires explicit front/back ordering.
- **Extension bridge:** an added extension links the pair; it must not be mistaken for a structural letter stroke.
- **Open separation:** no join; a deliberate gap defines the rhythm.

Store the connection type separately from the geometry that implements it. The same visible result may be achieved by different constructions.

## 4. Pair compatibility is contextual

Do not hard-code rules such as “A always connects to B” or “O never connects to T”. A pair’s compatibility depends on:
- selected glyph variant;
- terminal location and direction;
- style grammar;
- word spacing and scale;
- intended overlap depth;
- neighboring letters on both sides;
- counter and negative-space constraints;
- overall silhouette.

For example, the right side of one A construction may expose a useful outgoing terminal, while another A variant may not. A pair matrix can rank opportunities, but final geometry must validate them.

## 5. Proposed data structure

For each glyph variant, define:
- entry anchors: candidate incoming connection zones;
- exit anchors: candidate outgoing zones;
- anchor type: terminal, bar-end, corner, extension-root or open edge;
- direction: tangent/vector at the anchor;
- clearance: local space required to preserve counters and silhouette;
- compatibility tags: abstract structural descriptors;
- style constraints: which style grammars permit or discourage the anchor.

For each pair:
- candidate links: possible anchor combinations;
- link type: near-touch, continuation, shared stroke, overlap, interlock, bridge or separation;
- transform: translation, scale, rotation and local deformation;
- occlusion order: explicit front/back relation;
- validation: geometry, counter, collision and readability checks.

Do not store a giant hand-authored 26×26 matrix as the sole source of truth. Generate candidate pairs from anchor compatibility and evaluate them in context. A small curated preference table may bias the result, but it should not replace geometric validation.

## 6. Composition evaluation

Use several explainable measurements rather than one opaque “graffiti score”:

- **Contour integrity:** unintended intersections, gaps and self-crossings.
- **Counter integrity:** preserved interior spaces and apertures.
- **Pair continuity:** how well adjacent glyphs relate in scale and direction.
- **Negative-space rhythm:** variation and balance of inter-letter gaps.
- **Word silhouette:** distribution of mass and overall shape.
- **Legibility:** human-readable recognition at target display size.
- **Style consistency:** whether transformations belong to the selected construction grammar.

A high complexity score should not automatically mean a good piece. Make trade-offs visible in the editor.

## 7. Suggested implementation order

1. Build anchor metadata for the five authored contour masters first.
2. Render anchor overlays in a diagnostic mode.
3. Implement near-touch and terminal-to-terminal candidates.
4. Add true bar continuation only when both underlying contours support it.
5. Add overlap with explicit occlusion and collision tests.
6. Add shared strokes/interlocks after the topology model is reliable.
7. Evaluate whole-word rhythm across multiple words, not only a single demonstration string.

The remaining 21 provisional glyphs should not be treated as authoritative inputs for a full connection system until their contours are authored and tested.

## 8. Sources

1. Daniel Berio, *AutoGraff: Towards a Computational Understanding of Graffiti Writing and Related Art Forms*, PhD thesis, Goldsmiths, 2021: https://research.gold.ac.uk/id/eprint/29999/1/COM_thesis_BerioD_2021.pdf
2. Daniel Berio and Frederic Fol Leymarie, “Computational Models for the Analysis and Synthesis of Graffiti Tag Strokes”: https://doc.gold.ac.uk/autograff/post/papers/strokes/
3. Daniel Berio, “Graffitized alphabets”, Robotics x Arts Workshop (2021): https://sites.gatech.edu/robotic-art-workshop/2021/07/07/graffitized-alphabets/

## 9. Related research

- [Graffiti Letter Anatomy and Composition](GRAFFITI_LETTER_ANATOMY_AND_COMPOSITION.md)
- [Glyph Construction Guide](GLYPH_CONSTRUCTION_GUIDE.md)
- [Wildstyle, TRACY 168 and Letter Connections](WILDSTYLE_TRACY168_AND_LETTER_CONNECTIONS.md)
- [3D and Blockbuster Lettering](THREE_D_AND_BLOCKBUSTER_LETTERING.md)
