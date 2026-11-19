# NGA Chalfant Cross-Object Comparison 01

**Status:** catalogue-description comparison; not a direct glyph-anatomy review  
**Date:** 2026-11-19  
**Corpus:** seven NGA records by Henry Chalfant now represented in the local manifest (NGA-HC-001–007).  
**Use:** research direction for original lettering grammar studies. Not a style classification dataset.

## Evidence boundary

The NGA records provide object metadata and automatically generated visual descriptions. The NGA states that media for these objects is not available for download and directs users to contact the museum about image usage. Therefore:

- The notes below describe only what the catalogue text reports.
- No precise glyph skeleton, counter, terminal, join, slant, rhythm or letter spacing is asserted.
- No specimen is assigned to Bubble, Simple/Straight, Blockbuster, Throw-up or Wildstyle solely from a broad catalogue description.
- These records are useful for composition, hierarchy and layer separation; they are not yet sufficient to train a convincing letterform generator.

## Object comparison

| Object | Catalogue-reported visual evidence | Useful design question | Not established |
|---|---|---|---|
| [Mad Seen](https://www.nga.gov/artworks/173342-mad-seen) (1980) | Large orange/pink MAD SEEN lettering, black outline, three-dimensional effect; white wavy upper contour transitioning to yellow flame-like motif; cartoon figure and secondary writing. | How should a generator keep the primary word dominant while treating motif, character and tags as separate compositional layers? | Exact letter construction; whether the piece belongs to a named style family. |
| [Hand of Doom by Seen](https://www.nga.gov/artworks/173387-hand-doom-seen) (1980) | Lettering shares a wide horizontal train-car field with a large hand/dagger motif, hooded figure and additional graphic elements. | How can illustrated narrative and lettering coexist without collapsing into one undifferentiated effect stack? | Detailed glyph anatomy and consistent alphabet rules. |
| [Stop the Bomb by Lee](https://www.nga.gov/artworks/173382-stop-bomb-lee) (1979) | Large message lettering, anti-war symbols and secondary slogans across a train-car composition. | What layout system supports long message text while retaining a strong visual hierarchy? | Exact glyph geometry and the precise relation between letter style and message format. |
| [Dondi](https://www.nga.gov/artworks/173385-dondi) (1980) | Catalogue description reports large circular abstract forms, a cartoon-like hand, text elements and a broad illustrated composition. | How can circular forms, hand imagery and lettering be treated as independent but coordinated visual systems? | Exact text silhouette, letter sequence and construction. |
| [Quik](https://www.nga.gov/artworks/173373-quik) (1980) | Large letters and abstract patterns; pink, blue, black and white; sparkling highlights; smaller tags and train context. | Should highlights be a post-lettering material layer rather than part of the base glyph grammar? | Actual highlight placement, glyph anatomy and style classification. |
| [Lee](https://www.nga.gov/artworks/173381-lee) (1980) | Sky-blue field, mountain/cloud shapes, red root- or vein-like lines and bold message text. | How can background drawing and lettering remain distinct systems with controlled overlap? | Exact letterforms and whether the piece is a useful exemplar of a specific lettering family. |
| [Passion by Zephyr](https://www.nga.gov/artworks/173339-passion-zephyr) (1981) | Overlapping letters and imagery, a cracked heart, a yellow text panel and an illustrated skull. | How can a composition engine reserve zones for lettering, narrative illustration and editorial text? | Exact letter anatomy and the original work's complete spatial relationships. |

## Cross-object findings (provisional)

### 1. Separate the lettering engine from the composition engine

The catalogue descriptions repeatedly report lettering sharing the train-car field with figures, symbols, slogans, background shapes and secondary tags. This supports a modular composition model:

1. primary lettering block;
2. fill and internal texture;
3. outline / dimensional treatment;
4. secondary motif or illustration;
5. background field;
6. secondary writing and tags;
7. substrate constraints (windows, doors, seams, route signs).

This is a composition architecture hypothesis, not a claim that all seven objects use the same construction.

### 2. Effects must not substitute for letterform grammar

3D treatment, highlights, outlines and colour transitions are reported in some descriptions. These are rendering treatments. They do not tell us how the letters themselves are built. The generator should therefore produce a recognisable, coherent letter skeleton before applying any such treatment.

### 3. Narrative pieces are not clean alphabet specimens

Several records are described as complex narrative or message compositions. They are valuable for studying hierarchy and layering, but poor evidence for isolated alphabet rules until the actual lettering can be inspected and separated from surrounding imagery.

### 4. No style labels yet

The descriptions do not justify calling any of these Bubble, Throw-up, Blockbuster, Simple/Straight or Wildstyle. Keep `candidate_grammar_tags` empty until direct image review supports a defensible classification.

## Generator implications

- Keep glyph construction, word layout, composition layers and rendering treatment as separate modules.
- Make effects optional and downstream from glyph construction.
- Support long horizontal message layouts separately from compact name pieces.
- Allow illustration and text panels to occupy explicit composition zones.
- Preserve a substrate mask for train windows, doors, seams and signage when building a train-car composition mode.
- Do not bake artist names, exact letter sequences, signature motifs or photographed compositions into presets.

## Next inspection queue

Priority order for obtaining usable visual evidence:

1. Request image access / usage guidance from NGA for all seven records.
2. Inspect at least one complete image per record at sufficient resolution to trace *structural observations* in notes (not to copy the work).
3. Record glyph skeleton, stroke logic, counter shape, terminals, joins, slant, width rhythm, overlap and spacing independently of colour/effects.
4. Only then assign style-family labels or derive original construction hypotheses.
5. Acquire additional specimens specifically for the five target families; this NGA subset is composition-rich but does not yet provide a balanced style corpus.

## Sources

- [NGA — Henry Chalfant artist index (29 works)](https://www.nga.gov/artists/40960-henry-chalfant/artworks)
- [NGA — Mad Seen](https://www.nga.gov/artworks/173342-mad-seen)
- [NGA — Hand of Doom by Seen](https://www.nga.gov/artworks/173387-hand-doom-seen)
- [NGA — Stop the Bomb by Lee](https://www.nga.gov/artworks/173382-stop-bomb-lee)
- [NGA — Dondi](https://www.nga.gov/artworks/173385-dondi)
- [NGA — Quik](https://www.nga.gov/artworks/173373-quik)
- [NGA — Lee](https://www.nga.gov/artworks/173381-lee)
- [NGA — Passion by Zephyr](https://www.nga.gov/artworks/173339-passion-zephyr)
