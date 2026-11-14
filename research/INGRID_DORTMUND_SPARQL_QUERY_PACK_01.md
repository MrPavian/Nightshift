# INGRID-KG — Dortmund SPARQL Query Pack 01 (W02.32)

**Date:** 2026-11-14  
**Priority:** P1 — foundational empirical research  
**Status:** Query templates transcribed from the official INGRID-KG query catalogue and adapted to Dortmund. Templates are not execution results. The live endpoint query did not return through the current research client; no Dortmund counts are claimed.

## 1. Why this matters

The official INGRID-KG project site publishes executable SPARQL examples for city/date filtering, type and carrier-medium comparisons, colour counts, lettering-item analysis and style-element counts. This means the Dortmund corpus inventory can be approached through the documented RDF model rather than guessed filters.

Official query catalogue: https://dice-group.github.io/ingrid.github.io/  
Research article and data model: https://www.nature.com/articles/s41597-023-02199-8  
SPARQL endpoint: https://graffiti.data.dice-research.org/sparql/

The query catalogue itself is accessible. A click-through execution of its example Dortmund-adaptable city/date query failed in this research client (cache miss). This is not evidence that the endpoint is offline.

## 2. Verified vocabulary used below

The official catalogue and article demonstrate these predicates / classes:

- `grfo:Graffiti`, `grfo:City`
- `grfo:hasLocation`, `rdfs:label`
- `grfo:hasRecordingDate`
- `grfo:hasType`, `grfo:hasLetterStyle`
- `grfo:hasCarrierMedium`, `grfo:hasTechnology`
- `grfo:hasColour`, `grfo:hasItem`
- `grfo:hasGraffitiSprayerCrew`, `grfo:inInventory`
- `grfo:hasSyleElement` appears with this spelling in the official catalogue examples. It may be a source-schema spelling error; do not silently normalize it to `hasStyleElement`. Verify against the live ontology before relying on it.

The catalogue uses the city resource label (e.g. "Essen") and recording date for geographic/chronological counts. It distinguishes recording date from creation date. For historical scene analysis, a photo's recording date is not automatically the artwork's creation date.

## 3. Query templates — adapt and execute in order

### Q01 — Dortmund total corpus count

```sparql
PREFIX grfo: <https://graffiti.data.dice-research.org/ontology/>
PREFIX rdfs: <http://www.w3.org/2000/01/rdf-schema#>

SELECT (COUNT(DISTINCT ?g) AS ?count)
WHERE {
  ?g a grfo:Graffiti ;
     grfo:hasLocation ?city .
  ?city a grfo:City ;
        rdfs:label "Dortmund" .
}
```

### Q02 — Dortmund records by recording year

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

## 6. Execution log — not yet run

| Query | Result | Status |
|---|---:|---|
| Q01 Dortmund total | — | Pending live endpoint / EasyDB |
| Q02 year distribution | — | Pending |
| Q03 type distribution | — | Pending |
| Q04 lettering-style distribution | — | Pending |
| Q05 technique × medium | — | Pending |
| Q06 sample | — | Pending |

Do not fill this table from estimates, article-wide corpus totals or search-result counts.

## Sources

- INGRID-KG official SPARQL query catalogue: https://dice-group.github.io/ingrid.github.io/
- IngridKG: A FAIR Knowledge Graph of Graffiti, *Scientific Data* (2023): https://www.nature.com/articles/s41597-023-02199-8
- Public SPARQL endpoint: https://graffiti.data.dice-research.org/sparql/

**Evidence grade:** A for documented query syntax and predicates shown in the official catalogue / article; no Dortmund execution evidence yet.
