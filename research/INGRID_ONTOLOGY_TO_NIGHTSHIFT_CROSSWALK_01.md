# INGRID → NIGHTSHIFT — Ontology Crosswalk and Research Workflow (W02.31)

**Date:** 2026-11-14  
**Status:** research specification; not implemented in the editor.  
**Priority:** P1 — foundational research stream.

## 1. Why INGRID is foundational

**Geographic scope:** Dortmund is the pilot, not the boundary. Research expands outward through the Ruhrgebiet, NRW and then national comparison scenes. See [INGRID Regional Research Scope — Ruhrgebiet → NRW → Germany](INGRID_REGIONAL_RESEARCH_SCOPE_01.md).

INGRID is not simply a source of reference pictures. It is a curated, interdisciplinary, annotated research corpus with a formal ontology, image provenance, chronology, location, graffiti type, material/technique, lettering style, design elements and contextual relationships. It enables comparative questions that isolated books and image searches cannot answer reliably.

For NIGHTSHIFT, use INGRID in two complementary ways:

1. **Graffiti literacy:** learn how real writing practices, forms, visual grammars, materials, contexts and regional histories vary.
2. **Editor research:** identify which distinctions the generator must model independently, which are optional design elements, and where a proposed style rule lacks evidence.

INGRID's own ontology must remain INGRID's. NIGHTSHIFT should build a versioned crosswalk, not copy its terminology into production without critical review.

## 2. Verified data model — essential distinctions

### 2.1 Four linked image levels

INGRID distinguishes:

- **Foto:** photograph-level information, including capture date, capture place and image source; text for all visible graffiti may be recorded here.
- **Graffiti:** one annotated graffiti object; the central analysis level.
- **Teilgraffiti:** a component / crop of a larger graffiti, such as a dedication or comment.
- **Fotostrecke:** linked images documenting the same wall, room or related scene.

**NIGHTSHIFT consequence:** never count photographs, graffiti objects, parts and photo-series as interchangeable samples. A single piece may have multiple photos; a photo may show several works; one work may contain several annotated sub-elements. Analysis must deduplicate and preserve parent-child links.

### 2.2 Basic vs deep annotation

The search guide distinguishes baseline annotation from deep annotation.

Baseline fields include:
- original photo vs crop;
- image level;
- item / lettering transcription and all visible text;
- motif;
- writer / crew pseudonym;
- self-written date, where present;
- graffiti type;
- embedding / extension;
- place and source collection;
- photo capture date;
- technique for some collections.

Deep annotation can additionally include:
- technique, carrier medium and surface;
- context relation;
- theme and communicative function;
- language and linguistic construction;
- sign type and directionality;
- lettering style and figure style;
- design elements and colors.

**NIGHTSHIFT consequence:** store annotation depth / completeness per record. Do not treat a missing value as “none”. It may mean not annotated, not visible, unknown, not applicable or unavailable in that collection. Preserve the source's distinction wherever possible.

### 2.3 Visual / cultural categories

INGRID's ontology distinguishes:
- graffiti type: Tag(s), Throw Up, Piece/Writing/Style, Character, Comment, Stencil, Sketch and other forms;
- lettering style: e.g. Bubble Style, Simple Style, Tag Style, Wild Style;
- design elements: e.g. Arrows, Breaks, Bubbles, Crowns, Drips, Highlights, Quotes;
- directionality: horizontal, vertical, diagonal or other;
- figure style: flat, linear, modelling;
- context: isolated, aggregated, integrated or environment-related;
- technique, carrier medium and surface;
- theme, function, language and linguistic construction.

**Critical distinction:** type ≠ style ≠ design element ≠ technique ≠ format/surface ≠ context. A tag is a form/type, Tag Style is a lettering-style label, a crown is a design element, a marker is a technique/tool, a train is a carrier medium, and “integrated” describes a relationship to surrounding work. These must not become one overloaded style preset.

## 3. Annotation quality and interpretation

The illustrated manual says capture date/location come from image contributors, while other annotation values are derived by annotators inspecting the photographs. It describes a normal two-person interdisciplinary annotation workflow (linguistics and art history) and explicitly acknowledges interpretive ambiguity, especially around style and genre terms.

Implications:
- retain whether a field is contributor-supplied, annotator-derived or system-generated where this provenance is available;
- preserve annotation status and depth;
- distinguish source label from our own visual reading;
- do not assume every record has equal annotation completeness;
- treat style labels as expert-coded evidence, not objective ground truth;
- where a style category is ambiguous, record the ambiguity instead of forcing a class.

## 4. INGRID-KG and image relationships

The 2023 *Scientific Data* paper describes a public RDF knowledge graph with persistent graffiti resource identifiers, city, provenance, image and crew relationships, plus exact/near-duplicate image links. It provides downloadable RDF data, an ontology, metadata and a public image subset.

This creates several useful research possibilities:
- count and compare records by city, year, collection, type and style label;
- follow a graffiti object to its image resource and provenance;
- detect multiple views / near-duplicates and avoid double-counting;
- inspect how a crew or writer alias is represented without assuming that all pseudonyms identify a real person;
- join city-level graffiti data with external urban / infrastructure knowledge where appropriate.

Do not assume that a similarity link means the same physical artwork without checking the paper's near-duplicate definition and the underlying records.

## 5. Rights: three different layers

Published sources describe distinct licenses:
- **Original images:** CC BY-SA 4.0.
- **Generated annotations / metadata:** CC0.
- **INGRID knowledge graph:** CC BY 4.0.

The University of Paderborn's current collection page says the images and annotations may be used under the indicated licenses for scientific purposes. The 2023 paper describes the licensing and contributor agreements for public use. For NIGHTSHIFT, this means:
- metadata-based statistical and historical research is the safest route, with CC0 attribution / provenance still recorded as good scholarly practice;
- any image used in a commercial editor, marketing, training corpus, demo, screenshot or redistributed asset needs a specific item-level license review and legal assessment;
- CC BY-SA 4.0 is not a blanket “free asset” license; attribution, share-alike and third-party rights conditions matter;
- where the institutional wording says “scientific purposes”, ask the INGRID team / rights holder for written clarification before commercial product use;
- do not assume every database image is publicly downloadable; only a subset is public under differing source agreements.

No INGRID image is to be bundled into NIGHTSHIFT merely because it appears in a research interface.

## 6. Dortmund-first query programme

The first empirical objective is to establish the actual Dortmund sample and its limits, not to start drawing style conclusions.

### Stage A — corpus inventory

Run the following searches in the official EasyDB interface and record exact result counts, date/time, filters and sort order:

1. City = Dortmund; all types; all years.
2. Dortmund × capture decade (1980s, 1990s, 2000s, 2010s).
3. Dortmund × graffiti type (Tag(s), Throw Up, Piece/Writing/Style, Character, Comment, Sketch).
4. Dortmund × lettering style (Tag Style, Simple Style, Bubble Style, Wild Style and all other available labels).
5. Dortmund × technique / carrier medium / surface.
6. Dortmund × collection / source inventory.
7. Dortmund × annotation status / depth.

Record the exact UI field name and selectable value. Do not invent category combinations the interface does not support.

### Stage B — coverage and missingness report

For each result set, record:
- result count;
- number of unique graffiti object IDs vs photo IDs, where available;
- date range and missing-date count;
- source collection distribution;
- annotation status / depth;
- style/type category counts;
- missing / unknown / not-applicable fields;
- whether images are original photographs or crops;
- availability of public image and its license / attribution.

Do not use raw result counts as prevalence rates unless the sample construction and collection bias are understood.

### Stage C — stratified visual study

Select a manageable sample by period × type × source collection, not just by the first search results. For each record:
- capture stable system ID and citation;
- inspect the whole photograph and annotated object crop;
- record only observable features;
- note captioned vs inferred date/location;
- keep source annotation and researcher observation in separate columns;
- compare multiple writers and multiple examples per writer where attribution is explicit;
- preserve contradictory examples.

Initial visual dimensions for neutral analysis:
- letter skeleton / structural family;
- stroke sequence only if inferable (otherwise “unknown”);
- slant and directional flow;
- width / height proportion;
- compression / expansion;
- connection / disconnection;
- terminal and junction behavior;
- counter / aperture structure;
- outline, fill, inline, shadow, highlight and other decoration;
- color relationships;
- word-level rhythm and spacing;
- surface and environmental constraints.

These are NIGHTSHIFT observation fields, not claims that INGRID itself annotates all of them.

### Stage D — historical interpretation

Compare the resulting sample with:
- *ALL SURFACE* for Dortmund tag and handstyle documentation;
- *Da kukse wa* (1987) for early local vocabulary and visual context;
- *Graffiti Dortmund* (1996) for a separate contemporary publication record;
- *IRON CITY* (2002) for advertised 1983–2002 regional visual chronology;
- *MASON* and *RIO* as individual artist corpora, not city-wide proxies;
- contemporary magazines, video, oral history and scholarly studies.

Every historical conclusion must cite the evidence and state sample limitations.

## 7. What the editor may learn — only after validation

INGRID can inform a style-history learning layer and improve generator architecture by helping NIGHTSHIFT:
- keep graffiti type, lettering style, design elements, medium and surface independent;
- offer historically grounded examples and terminology;
- teach how letter structure, composition and context change across time and region;
- distinguish tag / handstyle work from throw-ups and pieces;
- show that style labels overlap, evolve and are locally interpreted;
- build optional, explainable style recipes from abstract features rather than copying individual signatures.

Do not auto-train a generator on the INGRID image dump or turn source annotations directly into production presets. First build a reviewed research dataset, feature rubric, rights ledger and multi-writer comparison. Human visual review remains mandatory.

## 8. First deliverables

1. **Dortmund Corpus Inventory 01:** actual counts and coverage by decade, source, type, style and annotation depth.
2. **INGRID Field Dictionary 01:** exact source field names, definitions, controlled values and data provenance.
3. **Dortmund Style Development Timeline 01:** evidence-led timeline with separate confidence levels.
4. **Style Feature Atlas 01:** neutral formal observations across multiple writers and periods.
5. **Editor Learning Requirements 01:** which concepts should become explanations, authoring controls, generator parameters or remain historical context only.
6. **Rights and Attribution Ledger 01:** image-level rights and any approved product use.

## Sources

- Universität Paderborn, INGRID ontology: https://www.uni-paderborn.de/forschungsprojekte/ingrid/ontologie
- Universität Paderborn, illustrated research manual: https://www.uni-paderborn.de/fileadmin/ingrid/Illustriertes_Recherchemanual.pdf
- Universität Paderborn, database search guide: https://www.uni-paderborn.de/fileadmin/ingrid/Rechercheleitfaden_INGRID.pdf
- Universität Paderborn, collection / license notes: https://www.uni-paderborn.de/forschungsprojekte/ingrid/bestand
- Sherif et al. (2023), “IngridKG: A FAIR Knowledge Graph of Graffiti”, *Scientific Data*: https://www.nature.com/articles/s41597-023-02199-8
- INGRID-KG Zenodo record: https://doi.org/10.5281/zenodo.7560242
- INGRID-KG public query examples: https://dice-group.github.io/ingrid.github.io/

**Evidence status:** source ontology and manual directly inspected; public knowledge-graph architecture and license descriptions checked against the 2023 article; no live Dortmund result set has yet been queried. All NIGHTSHIFT feature dimensions and workflow proposals are design/research inferences, not INGRID facts.


## 9. Corpus status update — official holdings page checked 2026-11-15

The current University of Paderborn INGRID holdings page makes an important distinction between the overall image holdings and the subset with completed annotation / research release:

- The page describes approximately **150,000 images** in the system.
- It reports **99,962 images** with complete basic and/or deep annotation and released for research use, explicitly dated **July 2023**.
- It names the first-phase collections as Mannheim police photographs (1998–2014) and Peter Kreuzer's Munich collection (1980s).
- It names second-phase collections as Cologne police, the Munich coordination group for graffiti, and gallery owner Dirk Kreckel.
- The page says all already processed images from these collections are accessible on a continuously updated basis.
- It describes captured metadata as photo collection, recording date, recording location and, if legible in the image, the writer pseudonym; further description is based on what is visible in the photograph.
- Its user guidance says the images are CC BY-SA and annotated metadata CC; this general statement does not replace item-level rights review for any intended reuse.

### Reconciliation with the 2023 paper

The 2023 *Scientific Data* paper describes a corpus of roughly 136,000 photographs and a public KG snapshot dated 2022-07-05 (version 4.0). It identifies city holdings including Dortmund, Hamm, Cologne, Mannheim, Munich, Berlin, Leipzig, Münster and Paderborn. These numbers are not directly interchangeable with the current holdings page's approximately 150,000 images or its 99,962 annotated/released subset: they refer to different dates, system layers and counting concepts.

**Operational consequence:** do not use “150,000” as the size of the annotated public sample, and do not treat “99,962” as a current exact count. The latter is a dated July 2023 figure. The official current page establishes that Dortmund is part of the research project's historical corpus description via the 2023 paper, but it does not provide a current Dortmund result count or prove the current EasyDB query result.

### Revised live-query priority

1. Enter the official EasyDB interface using the public access route described by the University of Paderborn.
2. Record the interface's actual current result count and timestamp before filtering.
3. Query Dortmund explicitly; record the exact city field, exact value, result count and whether the results are images, graffiti objects or another entity level.
4. Repeat for Hamm, Cologne, Mannheim, Munich, Münster and Paderborn only after the Dortmund field/value has been confirmed.
5. Record whether the five collections named on the holdings page appear as selectable inventory values; do not infer a mapping from collection names to city.
6. Compare EasyDB result totals with the public KG only after matching entity type, release status, graph version and date.

**Evidence boundary:** the official holdings page and 2023 paper have been inspected; no live EasyDB session or current Dortmund search has been performed in this update. No city-level count is asserted.

### Sources added

- Universität Paderborn, INGRID — Bestand: https://www.uni-paderborn.de/en/forschungsprojekte/ingrid/bestand
- Universität Paderborn, INGRID — project and public access information: https://www.uni-paderborn.de/forschungsprojekte/ingrid
- Sherif et al. (2023), *IngridKG: A FAIR Knowledge Graph of Graffiti*: https://pmc.ncbi.nlm.nih.gov/articles/PMC10212912/
