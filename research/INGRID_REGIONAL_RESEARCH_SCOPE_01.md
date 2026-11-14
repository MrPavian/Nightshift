# INGRID Regional Research Scope — Ruhrgebiet → NRW → Germany (W02.33)

**Date:** 2026-11-14  
**Priority:** P1 — foundational, expandable research programme  
**Status:** Scope grounded in published INGRID coverage; individual city counts and image availability remain unverified.

## 1. Core decision

Dortmund is the **starting point**, not the boundary of the project.

NIGHTSHIFT will build a regional-to-national understanding of graffiti writing and style development in concentric research layers:

1. **Dortmund pilot** — validate query logic, annotation interpretation and sample protocol.
2. **Ruhrgebiet** — compare Dortmund with Hamm first, then discover Essen, Bochum, Oberhausen, Duisburg, Gelsenkirchen, Herne, Bottrop, Hagen, Witten, Recklinghausen and nearby cities where records are actually present.
3. **NRW** — widen to Cologne, Münster, Paderborn, Bielefeld, Düsseldorf, Bonn, Aachen, Wuppertal, Krefeld, Mönchengladbach and further cities, distinguishing confirmed holdings from historical planning targets.
4. **German comparison layer** — use Berlin, Hamburg, Leipzig, Mannheim, Munich and other scenes to understand national exchange, regional differences and shared writing practices.

This is a research priority map, **not a claim that every named city has an accessible INGRID corpus**. Each city must pass a presence/count check before visual sampling.

## 2. Why this order is defensible

The 2023 INGRID-KG paper reports approximately 136,000 photographs from Mannheim, Munich, Cologne, Berlin, Leipzig, Hamm, Dortmund, Münster and Paderborn, dated 1983–2019. It identifies Dirk Kreckel as a long-term photographer of hotspots including Dortmund. The paper describes five collection families: Police Mannheim, Police Munich, Police Cologne, Dirk Kreckel and Peter Kreuzer. City and source collection must therefore be tracked separately.

The official INGRID holdings page reports approximately 150,000 images in total and 99,962 fully processed with basic and/or deep annotation (July 2023). It names collections including the Cologne police and Dirk Kreckel. Public photo availability is separate from metadata availability.

A prior INGRID project page listed 31 cities with established graffiti detection groups as candidate cities for collection development, including Dortmund, Bochum, Bielefeld, Hamm, Cologne and Münster. This is historical acquisition context, **not evidence of present-day records**.

## 3. City tiers and evidence status

### Tier A — published INGRID corpus presence

- Dortmund
- Hamm
- Cologne
- Münster
- Paderborn
- Berlin, Leipzig, Mannheim, Munich (national comparison set)

These cities are explicitly named in the 2023 paper's corpus summary. Exact record counts, date distribution, collection mix and public image availability still need querying.

### Tier B — historically identified target cities / NRW expansion candidates

- Bochum
- Bielefeld
- Essen
- Oberhausen
- Schwerte
- Werdohl
- Leverkusen
- Neuss

Some of these appear in project history or published KG city-link examples. This does **not** establish that each has a useful, current, accessible graffiti sample. Validate city resource identity and count first.

### Tier C — Ruhrgebiet / NRW discovery queue

Duisburg, Gelsenkirchen, Herne, Bottrop, Hagen, Witten, Recklinghausen, Castrop-Rauxel, Datteln, Oer-Erkenschwick, Düsseldorf, Bonn, Aachen, Wuppertal, Krefeld, Mönchengladbach and further NRW cities.

These are discovery targets only. Do not report them as INGRID holdings until a live city-resource query confirms records.

## 4. Query and sampling design

For each confirmed city, record:
- exact city resource URI and label (avoid ambiguous duplicate city resources);
- total distinct graffiti objects and, separately, photo/image files;
- recording-date range and annual/decadal distribution;
- creator-supplied date separately from photo recording date;
- source collection(s), photographer/provenance where public;
- graffiti type, lettering style, design elements, technique, carrier medium, surface and annotation depth;
- missing / unknown / unannotated field counts;
- public image availability and item-specific rights.

Never compare raw city totals as scene prevalence. Collection size, archive origins, photography practices, digitization, selection, duplicate photos and annotation depth can distort the picture.

Sampling sequence:
1. Pilot in Dortmund and verify query logic.
2. Replicate the exact protocol for each Tier A city.
3. Expand to Tier B and Tier C only when the graph confirms city resources and nonzero records.
4. Stratify by decade × graffiti type × source collection × annotation depth.
5. Compare multiple writers and contexts; no single collection or photographer represents a whole city.
6. Visually code only records with lawful viewing access; keep a source ledger and do not ingest reference images into NIGHTSHIFT without separate written commercial permission.

## 5. Graffiti education — questions we want to answer

The purpose is not merely to harvest visual references. Build a durable understanding of how styles and writing practices emerge, circulate and change:
- Which letter structures, rhythms, connections and spatial strategies recur across writers and cities?
- Which developments are period-specific, regional, or shared through travel, magazines, trains, crews and interpersonal exchange?
- How do handstyles, tags, throw-ups, pieces, panels and wholecars differ as practices and visual systems?
- How do surfaces, carrier media, tools and painting conditions shape letter construction?
- How do local scenes adapt international influences without becoming copies?
- Which visual traits are robust cross-writer patterns, and which are individual signatures that must never become generic presets?

Treat the editor as a learning instrument: research first, extract hypotheses second, test with original glyph constructions third. No single city or database label defines a universal style.

## 6. Immediate execution order

- [ ] Resolve the INGRID knowledge-graph predicate namespace discrepancy (catalogue examples vs upstream converter) against the live ontology / current RDF dump.
- [ ] Run the Dortmund pilot: city resource URI, object count, photo count, year distribution, collection and annotation coverage.
- [ ] Replicate the pilot for Hamm, Münster, Cologne and Paderborn.
- [ ] Run city-resource discovery for Ruhrgebiet and NRW candidates; distinguish zero results from unavailable / ambiguous resources.
- [ ] Produce a regional comparison matrix with confidence and coverage caveats.
- [ ] Build the first cross-city, cross-period style feature atlas for human review.
- [ ] Seek written commercial rights guidance before any NIGHTSHIFT use of source images or derivative image datasets.

## Sources

- INGRID-KG / Scientific Data (2023): https://pmc.ncbi.nlm.nih.gov/articles/PMC10212912/
- Official INGRID holdings and access: https://www.uni-paderborn.de/forschungsprojekte/ingrid/bestand
- Official INGRID project history / city target context: https://www.uni-paderborn.de/en/project/104
- Official INGRID-KG catalogue and SPARQL examples: https://dice-group.github.io/ingrid.github.io/

**Evidence rule:** a city is a confirmed corpus location only when supported by a published corpus statement or live query result. A planned collection city, linked city resource or city name in an article is not automatically a confirmed, useful visual corpus.