# INGRID-KG — Regional SPARQL Query Pack 01 (Dortmund pilot; W02.32)

**Date:** 2026-11-14  
**Priority:** P1 — foundational empirical research  
**Status:** Official query catalogue and upstream RDF-conversion code inspected. Dortmund-first templates are adapted from documented examples and should be parameterized for every confirmed Ruhrgebiet/NRW city; no query has returned result rows. The public endpoint timed out through the available research client; a second direct query attempt was inaccessible. No Dortmund counts are claimed.

## 1. Why this matters

Dortmund is the pilot location, not the corpus boundary. Apply the same validated query protocol to Hamm, Münster, Cologne and Paderborn (published corpus cities), then discover further Ruhrgebiet and NRW city resources. See `INGRID_REGIONAL_RESEARCH_SCOPE_01.md`.

The official INGRID-KG project site publishes executable SPARQL examples for city/date filtering, type and carrier-medium comparisons, colour counts, lettering-item analysis and style-element counts. This means the Dortmund corpus inventory can be approached through the documented RDF model rather than guessed filters.

Official query catalogue: https://dice-group.github.io/ingrid.github.io/  
Research article and data model: https://www.nature.com/articles/s41597-023-02199-8  
SPARQL endpoint: https://graffiti.data.dice-research.org/sparql/

The query catalogue itself is accessible. A click-through execution of its example Dortmund-adaptable city/date query failed in this research client (cache miss). This is not evidence that the endpoint is offline.

## 2. Verified vocabulary used below

The official catalogue and article demonstrate these predicates / classes:

- `grfo:Graffiti`, `grfo:City`
- `grfo:hasLocation`, `rdfs:label` (as used in official query-catalogue example 21)
- `grfo:hasRecordingDate` (official query-catalogue example 20/21)
- `grfo:hasType` (official query examples 22/23); `hasLetterStyle` is present in the upstream RDF converter's field translation table, but its query namespace must be verified
- `grfo:hasCarrierMedium` (official query examples 22/23); `hasTechnology` is present in the upstream converter's translation table, but its query namespace must be verified
- `grfo:hasColour`, `grfo:hasItem` (official query examples 18, 34/35)
- `grfo:hasGraffitiSprayerCrew` (official query examples 9/10/17); `inInventory` is present in the converter's translation table, but its query namespace must be verified
- `grfo:hasSyleElement` appears with this spelling in official catalogue examples 31/32. The upstream converter translation table also maps `stilelement` to `hasSyleElement`. Preserve this spelling unless the live ontology proves otherwise.

### Namespace reconciliation warning

The official query catalogue consistently shows `grfo:` for query predicates. However, the upstream `dice-group/Ingrid` repository's `jsonToRdf.py` defines both an ontology namespace (`cvdo = .../ontology/`) and a separate graffiti namespace (`graffiti = .../graffiti/`), then writes many translated annotation fields using `graffiti[k]`. It also binds that namespace as `grfp`. This differs from the catalogue's `grfo:` examples. The live endpoint/dump must decide which namespace is actually present in the current public graph. Do not bulk-run queries with guessed prefix substitutions. Start with a minimal predicate-discovery query or inspect the current RDF dump/ontology, then pin the namespace in the execution log.

The catalogue uses the city resource label (e.g. "Essen") and recording date for geographic/chronological counts. The upstream converter maps the handwritten date field `datierung` to `hasDate`, separately from `aufnahmedatum` → `hasRecordingDate`. This supports a crucial distinction: photo recording date is not automatically the artwork's creator-supplied date.

## 3. Query templates — adapt and execute in order

**Execution prerequisite:** resolve the `grfo:` vs `grfp:` namespace discrepancy described above. Q01/Q02 are based directly on the official catalogue's city/date pattern; Q03 uses its documented type predicate. Q04/Q05/Q06 use upstream field mappings and remain provisional until predicate namespace confirmation.

### Q01 — Dortmund total corpus count

Adapted from official catalogue query 21 (city + recording-date filter), with the date restriction removed. The `a grfo:Graffiti` constraint is intentionally omitted to match the catalogue's demonstrated pattern.

```sparql
PREFIX grfo: <https://graffiti.data.dice-research.org/ontology/>
PREFIX rdfs: <http://www.w3.org/2000/01/rdf-schema#>

SELECT (COUNT(DISTINCT ?g) AS ?count)
WHERE {
  ?g grfo:hasLocation ?city .
  ?city a grfo:City ;
        rdfs:label "Dortmund" .
}
```

### Q02 — Dortmund records by recording year

Adapted from official catalogue query 20/21. The city filter is the same documented pattern.

```sparql
PREFIX grfo: <https://graffiti.data.dice-research.org/ontology/>
PREFIX rdfs: <http://www.w3.org/2000/01/rdf-schema#>
PREFIX xsd: <http://www.w3.org/2001/XMLSchema#>

SELECT ?year (COUNT(DISTINCT ?g) AS ?count)
WHERE {
  ?g a grfo:Graffiti ;
     grfo:hasLocation ?city ;
     grfo:hasRecordingDate ?date .
  ?city a grfo:City ;
        rdfs:label "Dortmund" .
  BIND(YEAR(?date) AS ?year)
}
GROUP BY ?year
ORDER BY ?year
```

### Q03 — Dortmund records by graffiti type

The official catalogue demonstrates `hasType` as a literal-valued field (query examples 22/23), so count the annotation labels rather than assuming a linked class resource.

```sparql
PREFIX grfo: <https://graffiti.data.dice-research.org/ontology/>
PREFIX rdfs: <http://www.w3.org/2000/01/rdf-schema#>

SELECT ?type (COUNT(DISTINCT ?g) AS ?count)
WHERE {
  ?g a grfo:Graffiti ;
     grfo:hasLocation ?city ;
     grfo:hasType ?type .
  ?city a grfo:City ;
        rdfs:label "Dortmund" .
}
GROUP BY ?type
ORDER BY DESC(?count)
```

### Q04 — Dortmund records by lettering-style label

`hasLetterStyle` is present in the upstream converter translation table (`buchstabenstil` → `hasLetterStyle`), but the official query catalogue does not show a direct example. Treat this as provisional until the live namespace is confirmed.

```sparql
PREFIX grfo: <https://graffiti.data.dice-research.org/ontology/>
PREFIX rdfs: <http://www.w3.org/2000/01/rdf-schema#>

SELECT ?style (COUNT(DISTINCT ?g) AS ?count)
WHERE {
  ?g a grfo:Graffiti ;
     grfo:hasLocation ?city ;
     grfo:hasLetterStyle ?style .
  ?city a grfo:City ;
        rdfs:label "Dortmund" .
}
GROUP BY ?style
ORDER BY DESC(?count)
```

### Q05 — Dortmund records by technique and carrier medium

`hasCarrierMedium` is demonstrated in official catalogue examples 22/23. `hasTechnology` is in the upstream converter mapping; its namespace needs live confirmation.

```sparql
PREFIX grfo: <https://graffiti.data.dice-research.org/ontology/>
PREFIX rdfs: <http://www.w3.org/2000/01/rdf-schema#>

SELECT ?technique ?medium (COUNT(DISTINCT ?g) AS ?count)
WHERE {
  ?g a grfo:Graffiti ;
     grfo:hasLocation ?city .
  ?city a grfo:City ;
        rdfs:label "Dortmund" .
  OPTIONAL { ?g grfo:hasTechnology ?technique . }
  OPTIONAL { ?g grfo:hasCarrierMedium ?medium . }
}
GROUP BY ?technique ?medium
ORDER BY DESC(?count)
```

### Q06 — Stratified record sample for manual visual inspection

Discovery template only. Confirm each predicate and its namespace against the live graph before execution; in particular `inInventory` is not demonstrated as a catalogue query.

```sparql
PREFIX grfo: <https://graffiti.data.dice-research.org/ontology/>
PREFIX rdfs: <http://www.w3.org/2000/01/rdf-schema#>

SELECT DISTINCT ?g ?date ?type ?style ?item ?medium ?technique ?inventory
WHERE {
  ?g a grfo:Graffiti ;
     grfo:hasLocation ?city .
  ?city a grfo:City ;
        rdfs:label "Dortmund" .
  OPTIONAL { ?g grfo:hasRecordingDate ?date . }
  OPTIONAL { ?g grfo:hasType ?type . }
  OPTIONAL { ?g grfo:hasLetterStyle ?style . }
  OPTIONAL { ?g grfo:hasItem ?item . }
  OPTIONAL { ?g grfo:hasCarrierMedium ?medium . }
  OPTIONAL { ?g grfo:hasTechnology ?technique . }
  OPTIONAL { ?g grfo:inInventory ?inventory . }
}
LIMIT 250
```

Q06 is a discovery sample, not a representative sample. Once Q01–Q05 establish coverage, select a stratified sample by decade × type × collection and record the exact selection method.

## 4. Research interpretation rules

1. **Recording date ≠ creation date.** Use it as the date of photographic documentation unless a separate creator/date field supports a stronger claim.
2. **No row ≠ no graffiti.** A missing field can mean unannotated, unknown, not applicable or unavailable in a collection.
3. **Counts are not prevalence.** Collection sources, photo practices, survival, digitization and annotation depth create selection effects.
4. **Type ≠ lettering style.** A Tag(s) record may carry a different style label; keep these dimensions separate.
5. **A label is not a style grammar.** "Wild Style" or "Simple Style" is an annotation value, not a complete rule set for letter construction.
6. **No writer cloning.** Use multi-record, cross-writer observations to formulate abstract features; never turn one identifiable writer's tag into a generator preset.
7. **Image rights remain item-specific.** Metadata analysis and image reuse are different activities. Retain record IDs, provenance and license details for anything visually inspected.

## 5. NIGHTSHIFT learning questions enabled by this pack

- Which graffiti types are actually represented in Dortmund, and how does that distribution change by recording decade?
- Are style labels concentrated in particular periods or collections, or is apparent change an annotation / source effect?
- How do carrier medium and technique relate to type (e.g. train / wall / hall of fame), without assuming one determines the other?
- Which visual elements recur across multiple writers and periods, and which are individual signatures that must not be generalized?
- What proportion of records has enough deep annotation to support a visual-style comparison?

## 6. Execution log — access blocked; no query results

| Attempt | Route | Outcome |
|---|---|---|
| 1 | Official catalogue endpoint link | Timeout fetching SPARQL endpoint |
| 2 | Direct SPARQL GET with minimal COUNT query | Endpoint URL not accessible through research client |
| 3 | Local runtime direct request | DNS resolution failure in this runtime |

These failures do not prove endpoint downtime. The official query catalogue remains accessible. A browser/EasyDB session or a separate machine with endpoint access is needed to execute the queries. The namespace discrepancy from the upstream converter must be resolved before trusting query results.



| Query | Result | Status |
|---|---:|---|
| Q01 Dortmund total | — | Blocked: endpoint access + namespace verification |
| Q02 year distribution | — | Blocked: endpoint access + namespace verification |
| Q03 type distribution | — | Blocked: endpoint access + namespace verification |
| Q04 lettering-style distribution | — | Blocked: endpoint access + namespace verification |
| Q05 technique × medium | — | Blocked: endpoint access + namespace verification |
| Q06 sample | — | Blocked: endpoint access + namespace verification |

Do not fill this table from estimates, article-wide corpus totals or search-result counts.

## Sources

- INGRID-KG official SPARQL query catalogue: https://dice-group.github.io/ingrid.github.io/
- IngridKG: A FAIR Knowledge Graph of Graffiti, *Scientific Data* (2023): https://www.nature.com/articles/s41597-023-02199-8
- Public SPARQL endpoint: https://graffiti.data.dice-research.org/sparql/
- Official query catalogue (query 20–23 and 31–32): https://dice-group.github.io/ingrid.github.io/
- Upstream RDF converter (`jsonToRdf.py`, field translation and namespace mapping): https://github.com/dice-group/Ingrid/blob/4e776365d2bf30181cf98ffd6d3d1a36b060973f/jsonToRdf.py

**Evidence grade:** A for documented query syntax and predicates shown in the official catalogue / article; no Dortmund execution evidence yet.


## 7. Ontology and converter audit — 2026-11-14 follow-up

The earlier namespace warning is now more precisely resolved as a **three-way version / serialization inconsistency**, not a reason to replace all catalogue prefixes wholesale.

### Confirmed from the published ontology file

The current dice-group/ingrid.github.io repository's ontology_v3.ttl declares the following properties in the grfo: namespace:
- hasLetterStyle
- hasTechnology
- hasCarrierMedium
- inInventory
- hasDate
- hasRecordingDate
- hasType
- hasStyleElement (spelled with the second “t”)

The official query catalogue uses grfo: for its city, date, type, carrier-medium and style-element examples. It spells the style-element predicate hasSyleElement (missing the “t”), while the ontology declares hasStyleElement. Treat the catalogue's spelling as a likely typo unless the live graph proves it is actually materialized that way.

### Confirmed from current upstream converter source

The current dice-group/Ingrid/jsonToRdf.py defines:
- ontology namespace: https://graffiti.data.dice-research.org/ontology/ (grfo)
- resource namespace: https://graffiti.data.dice-research.org/resource/ (grfr)
- additional annotation namespace: https://graffiti.data.dice-research.org/graffiti/ (bound as grfp)

Its translation table maps buchstabenstil → hasLetterStyle, technik → hasTechnology, traegermedium → hasCarrierMedium, bestand → inInventory, datierung → hasDate, and stilelement → hasSyleElement. The converter then emits many annotation fields using the additional graffiti[...] namespace. This differs from the published ontology and catalogue, which place these properties in grfo:. The source code also defines the namespace with a trailing slash, while some catalogue examples bind grfp to a hash namespace.

### Consequence

- Keep official catalogue queries with grfo: as the documented query baseline.
- Do not silently change them to grfp: or assume the converter's current branch is identical to the deployed 2022/2023 graph.
- hasStyleElement vs hasSyleElement is a separate predicate-spelling inconsistency.
- Before publishing any count, inspect the deployed graph/dump's actual predicates for a known resource or run a namespace-agnostic predicate discovery query.
- Query fields that are declared in ontology but may be emitted under the converter's auxiliary namespace remain runtime-unverified until this check is completed.

### Public dump route — confirmed, snapshot limitation

The 2023 paper explicitly identifies a public RDF dump and its archived Zenodo record:
- Zenodo record 10.5281/zenodo.7560242 (published 2023-01-23; version v2).
- ingrid_public.ttl is listed at 334.8 MB on the Zenodo record page.
- The paper's Table 2 describes the dump as public_rdfGraffiti.ttl, and Table 3 identifies the graph as version 4.0 dated 2022-07-05.

These are not necessarily byte-identical file names or current snapshots. The Zenodo archive is a reproducible historical snapshot, not proof of the current live endpoint state. The browser research client returned HTTP 429 for the Zenodo record and could not fetch the raw HOBBIT host; no local dump was downloaded or parsed in this pass. Do not claim dump-level predicate counts.

### Updated confidence

- A: official ontology property names and namespaces as published in ontology_v3.ttl.
- A: documented SPARQL examples and their exact prefixes/spelling on the official catalogue.
- A: current upstream converter's declared namespaces, translation mappings and RDF emission behavior as visible in source.
- Unresolved: which exact predicate IRIs are present in the deployed public graph and whether the current converter source corresponds to that deployment.
- Blocked: actual city counts, because no query result rows or parsed RDF dump have been obtained.

Sources inspected:
- Ontology: https://github.com/dice-group/ingrid.github.io/blob/main/ontology_v3.ttl
- Converter: https://github.com/dice-group/Ingrid/blob/main/jsonToRdf.py
- Official query catalogue: https://dice-group.github.io/ingrid.github.io/
- Paper and data availability: https://pmc.ncbi.nlm.nih.gov/articles/PMC10212912/
- Zenodo snapshot: https://zenodo.org/records/7560242


## 8. Published historical graph baseline — do not confuse with city results

The 2023 *Scientific Data* paper's Table 4 reports the graph snapshot dated **5 July 2022**:
- 130,689 distinct graffiti resources;
- 178 distinct city resources;
- 682,748 distinct image-file resources;
- 451 collections;
- 840,420 distinct resources overall.

The paper also reports approximately 136,000 photographs in the broader INGRID image database, from nine named city areas (Mannheim, Munich, Cologne, Berlin, Leipzig, Hamm, Dortmund, Münster and Paderborn) over 1983–2019. These are different measures: graph graffiti resources, image-file resources and database photographs are not interchangeable.

The 178 city-resource count proves that the graph's geographic model is broader than the nine-city photo summary, but it does **not** establish that Heidelberg is present, nor that each city has a meaningful number of graffiti records. A city-level resource/count query is still required.

Source: Sherif et al. (2023), Table 4 and Background & Summary, https://pmc.ncbi.nlm.nih.gov/articles/PMC10212912/
