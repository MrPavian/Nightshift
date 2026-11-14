# INGRID — German Graffiti Research Database and Dortmund Corpus Route (W02.29)

**Date:** 2026-11-14  
**Purpose:** document INGRID as the strongest newly identified research infrastructure for testing Dortmund historical claims against a large, annotated German graffiti image corpus. This is an access and research-design dossier; no INGRID Dortmund records have yet been queried or visually inspected.

## 1. What INGRID is

The University of Paderborn's official project page describes INGRID (Informationssystem Graffiti in Deutschland) as a DFG-funded collaboration between the University of Paderborn's German linguistics group and KIT art history. The project aggregates graffiti image holdings supplied by public authorities, institutions, research organizations and private individuals, digitizes and annotates them, and makes them available for scholarly research.

The current project page says the database contains **more than 100,000 graffiti from 1980 to the present**. DBIS describes it as freely available and reports more than 80,000 images from the early 1980s to the present. A 2023 research article reports a corpus of approximately 136,000 images from multiple German cities, including Dortmund. These figures are not necessarily contradictory: they are dated / differently rounded snapshots and should not be collapsed into one exact count.

- Official project and access page: https://www.uni-paderborn.de/forschungsprojekte/ingrid/
- DBIS record: https://dbis.ur.de/FUH/resources/104565?lang=de
- Research article: https://pmc.ncbi.nlm.nih.gov/articles/PMC10212912/

The project page publishes a free access route and offers a public demonstration login; it also provides an alternative registered Shibboleth login. It links an illustrated search manual, a research guide and a video tutorial. The page states that the data are also available as Linked Data, with a SPARQL endpoint and public Zenodo archive.

## 2. Dortmund relevance and limits

The 2023 article explicitly lists Dortmund among the cities represented in the database. This makes INGRID a concrete research route, unlike a generic archive whose holdings merely might contain graffiti-related material.

However:
- the number of Dortmund records, years, image contributors and neighborhoods is not yet known;
- the database may contain institutional / police / private documentation with different capture contexts and selection biases;
- a large corpus does not automatically provide a representative sample of all writers, formats or locations;
- availability for academic research does not establish commercial reuse rights;
- no Dortmund record, photograph, tag, caption or metadata entry has been inspected in this pass.

The public web renderer for the database requires JavaScript and did not expose the search interface to this research environment. The linked SPARQL endpoint timed out when opened. This is an access limitation, not evidence that the services are unavailable to a normal browser.

## 3. Research plan for NIGHTSHIFT

Once the interface can be used in a JavaScript-capable browser, begin with controlled searches and record the exact query/filter settings:

1. Location / city: Dortmund.
2. Date windows: 1980–1989, 1990–1999, 2000–2009, then full range.
3. Format and object categories where the ontology supports them: tag, throw-up, piece, panel, wholecar / train, wall, object / street furniture.
4. Medium or technique fields only where explicitly annotated.
5. Record counts before opening individual images; note missing / unknown metadata rather than inferring.
6. Sample across multiple dates, contributors and contexts; avoid treating search-result ordering as historical frequency.
7. For each inspected record, save stable record identifier, creator/photographer credit, date/location provenance, ontology labels, image rights/usage terms and citation.
8. Compare INGRID observations with *ALL SURFACE*, *Da kukse wa*, *IRON CITY*, contemporary periodicals and first-person accounts.

Use the project's own ontology and manuals rather than inventing a parallel classification before understanding its fields. Any NIGHTSHIFT mapping should be a documented crosswalk, not a replacement for the source annotation.

## 4. Rights and ethics

INGRID is a research database built from heterogeneous public and private sources. Free scholarly access is not a blanket license for commercial game use, image extraction, redistribution, model training or derivative works. Confirm item-level rights with the database team and original contributors before any external reuse.

Do not export or reproduce identifiable living writers' tags, signatures or pieces as generator templates. For design research, abstract only non-attributive, cross-writer properties after human review (e.g. rhythm, slant, compression, continuity, terminal behavior, spatial density). Keep the source image itself out of the product unless explicit permission permits its use.

## 5. Related contextual photo collections

A Museum für Kunst und Gewerbe Hamburg search filtered to Dortmund returns 19 photography records, including multiple 1980–1981 photographs by Wilhelm Schürmann and Ulf Erdmann Ziegler. One catalogued 1980 image by Ziegler is titled “Dortmund, Nähe Westfalenpark, 1. Mai 1980” (inventory P1981.78), with street / bridge / railway / urban-life subject metadata; its image is not displayed because it is not digitized or cannot be shown for rights reasons. These are contextual urban-history sources, not confirmed graffiti photographs.

- Dortmund-filtered MK&G collection: https://www.mkg-hamburg.de/en/collection/online?filter%5Bplace%5D%5B0%5D=Dortmund&filter%5Bplace%5D%5Bpath%5D=
- Object record P1981.78: https://www.mkg-hamburg.de/sammlung/objekt/dortmund-nahe-westfalenpark-1-mai-1980/P1981.78/mkg-e00174712

## 6. Next verification queue

1. [ ] Open INGRID in a JavaScript-capable browser using the official access instructions.
2. [ ] Run a Dortmund-only query and record result counts by decade and available annotation category.
3. [ ] Read the illustrated search manual, ontology and research guide before interpreting filters.
4. [ ] Establish item-level rights / citation rules with the project before retaining or reproducing images.
5. [ ] Compare a small, stratified set of records with *ALL SURFACE* and the Dortmund publication corpus.
6. [ ] If direct UI access remains blocked, use the public Linked Data / Zenodo routes only after checking their current schema and license; do not invent SPARQL fields or scrape undocumented endpoints.

## Sources

- Universität Paderborn, INGRID project and access page: https://www.uni-paderborn.de/forschungsprojekte/ingrid/
- DBIS, INGRID resource record: https://dbis.ur.de/FUH/resources/104565?lang=de
- INGRID research article, PMC: https://pmc.ncbi.nlm.nih.gov/articles/PMC10212912/
- Museum für Kunst und Gewerbe Hamburg, Dortmund-filtered collection: https://www.mkg-hamburg.de/en/collection/online?filter%5Bplace%5D%5B0%5D=Dortmund&filter%5Bplace%5D%5Bpath%5D=

**Evidence grade:** A for official project scope, access route and research infrastructure; B for reported city coverage and corpus size in research literature; no Dortmund record-level visual evidence yet.


## 7. Ontology and annotation method — direct documentation review (W02.30)

The official INGRID ontology and illustrated search manual have now been inspected. This is a substantial step beyond simply locating the database.

The ontology deliberately combines linguistic / art-historical description with scene terminology. It records:
- **General context:** object type, actors, place, date / dating, technique, content, site materiality and relation to the surrounding environment.
- **Image level:** photograph, graffiti, partial graffiti and photo series.
- **Context relation:** isolated, aggregated, integrated and environment-related.
- **Graffiti type:** Piece/Writing/Style, Tag(s), Throw Up, Comment, Character, Stencil, sketch, composition, co-construction and slogan / concept call.
- **Lettering style:** Bubble Style, Simple Style, Tag Style and Wild Style.
- **Design elements:** arrows, breaks, bubbles, crowns, drips, highlights and quotes.
- **Additional visual / linguistic features:** sign type, directionality, figure style, color, embedded additions, language and communicative function.
- **Provenance:** image contributor/source collection, recording date and editorial annotation.

The illustrated manual explains that location and photograph date are supplied by image contributors, while other annotations are assigned through visual inspection. In the described workflow, two annotators—one from linguistics and one from art history—normally inspect and annotate an image together. The manual explicitly acknowledges interpretive ambiguity in style and genre terminology.

**Critical methodological implication:** INGRID is not a neutral machine-generated ground truth. It is a carefully structured, interdisciplinary human annotation system. Its categories are an excellent research map, but category labels still need to be read in context and uncertainty must be preserved.

## 8. Licensing clarification from the INGRID-KG research article

The 2023 *Scientific Data* article explains that image contributors entered agreements with the University of Paderborn that transferred rights for public use of contributed images to the INGRID project. It reports:
- original images: **CC BY-SA 4.0**;
- generated metadata: **CC0**;
- INGRID knowledge graph: **CC BY 4.0**.

This is more informative than the general warning that free research access does not itself grant reuse permission. It suggests that many images in the published INGRID corpus have an explicit reuse license. Nevertheless, NIGHTSHIFT must check the current license / credit information for each individual record and comply with attribution and ShareAlike conditions for CC BY-SA images. Do not assume every related external archive item, later contribution or linked resource shares the same terms.

Sources:
- Official ontology: https://www.uni-paderborn.de/forschungsprojekte/ingrid/ontologie
- Illustrated research manual: https://www.uni-paderborn.de/fileadmin/ingrid/Illustriertes_Recherchemanual.pdf
- INGRID-KG article: https://www.nature.com/articles/s41597-023-02199-8

## 9. NIGHTSHIFT ontology crosswalk — proposed, not implemented

Use INGRID's fields as a discovery and comparison framework, not as a replacement for NIGHTSHIFT's own semantic model.

| INGRID dimension | NIGHTSHIFT research / editor question |
|---|---|
| Graffiti type | Is the object a tag, throw-up, piece, character, comment, sketch or multi-part composition? |
| Lettering style | Which period / scene style label is supported, and how confident is the attribution? |
| Design elements | Which optional visual devices are present, and how do they relate to letter structure? |
| Directionality | What is the composition's dominant orientation? |
| Figure style | Is figurative imagery present, and how is it rendered? |
| Technique / material | What tool and surface evidence is actually visible or captioned? |
| Context relation | Is the work isolated, part of a cluster, integrated with earlier work, or responding to its surroundings? |
| Place / date / source | What can be said about chronology and scene geography without inferring missing data? |
| Linguistic function | Is the writing a name, greeting, dedication, comment, slogan or another communicative act? |

**Do not conflate:** graffiti type is not lettering style; lettering style is not a list of design elements; directionality is not letter slant; image context is not the same as a writer's social network; technique is not inferred solely from appearance if the evidence is ambiguous.

This crosswalk is a proposed NIGHTSHIFT research aid. It does not claim that the current editor implements these categories.
