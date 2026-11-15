# INGRID RDF Converter Audit 01

**Audit date:** 2026-11-15  
**Scope:** public upstream converter source and published ontology; no live SPARQL query or dump parse performed.  
**Purpose:** establish which RDF predicates the published converter code actually emits, and prevent NIGHTSHIFT query specifications from confusing ontology terms with converter output.

## 1. Sources and pinned upstream files

- Converter repository: `dice-group/Ingrid`
- `jsonToRdf.py`, inspected at blob SHA `30bdead305580f72caa4a27507ef3cde6d6ec552`
- `tagsToRdf.py`, inspected at blob SHA `791de29ac62ac0053a1b05a390d4eca9e906de50`
- `collectionsToRdf.py`, inspected at blob SHA `18ef6ed52840fc77aaf3a3a6511b6882536fa93e`
- Published `ontology_v3.ttl`, inspected at blob SHA `a1beeac011f095d70bc0ec26f4cfdca57a7f20df`
- Pipeline entry point `runGeneration.sh` calls `download.py`, then `jsonToRdf.py`, `collectionsToRdf.py` and `tagsToRdf.py`.

These are source-code observations, not proof that the currently hosted endpoint is generated from this exact revision. The 2023 paper identifies the same public source repository and describes the RDF conversion pipeline.

## 2. Namespace distinction — the central query hazard

The converter declares three separate namespaces:

| Prefix | Namespace | Role in converter |
|---|---|---|
| `grfo` | `https://graffiti.data.dice-research.org/ontology/` | Ontology classes / vocabulary |
| `grfr` | `https://graffiti.data.dice-research.org/resource/` | Graffiti, city, collection, tag and image resources |
| `grfp` | `https://graffiti.data.dice-research.org/graffiti/` | Auxiliary predicates emitted by the converter |

In `jsonToRdf.py`, most source annotation fields are written as `graffiti[predicate]`, i.e. under the auxiliary `/graffiti/` namespace, not as `cvdo[predicate]` under the ontology namespace. The ontology file, by contrast, declares properties such as `grfo:hasRecordingDate`, `grfo:hasDate`, `grfo:hasLetterStyle`, `grfo:hasTechnology`, `grfo:hasCarrierMedium`, `grfo:hasType` and `grfo:hasSurface`.

**Practical rule:** an ontology property declaration is not sufficient evidence that the converter emits that exact predicate IRI. Query design must preserve the distinction between vocabulary declarations and generated graph triples.

## 3. Field-to-predicate observations

The converter's translation dictionary includes:

| EasyDB source key | Translation token | Emission path observed |
|---|---|---|
| `aufnahmedatum` | `hasRecordingDate` | `grfp:hasRecordingDate` via generic annotation path |
| `datierung` | `hasDate` | `grfp:hasDate` via generic annotation path |
| `buchstabenstil` | `hasLetterStyle` | `grfp:hasLetterStyle` via generic annotation path |
| `stilelement` | `hasSyleElement` | `grfp:hasSyleElement` via generic annotation path |
| `technik` | `hasTechnology` | `grfp:hasTechnology` via generic annotation path |
| `traegermedium` | `hasCarrierMedium` | `grfp:hasCarrierMedium` via generic annotation path |
| `oberflaeche` | `hasSurface` | `grfp:hasSurface` via generic annotation path |
| `typ` | `hasType` | `grfp:hasType` via generic annotation path |
| `bestand` | `inInventory` | `grfp:inInventory` via generic annotation path |

This is a source-code mapping. The exact predicate and literal shape in the live graph still require an endpoint or dump query.

## 4. Confirmed implementation quirks and implications

### 4.1 Style-element spelling mismatch

The converter translates `stilelement` to the misspelled token `hasSyleElement` (missing the second “t”). The published ontology declares `hasStyleElement`.

- Do not silently “correct” the converter token in a query intended to reproduce its output.
- Do not silently change the ontology.
- Test both full IRIs against the live graph / dump before finalizing the field dictionary.
- Preserve the original source key, emitted predicate token and normalized NIGHTSHIFT concept as separate fields.

### 4.2 Recording date, graffiti dating and import/creation timestamp are distinct

The converter maps the source field `aufnahmedatum` to `hasRecordingDate`, and `datierung` to `hasDate`. Separately, the top-level EasyDB metadata field `_created` is emitted as `grfp:creationDate`; `_last_modified` becomes `grfp:lastModified`.

Do not collapse these into one date. The name `creationDate` here comes from the EasyDB object metadata path and must not automatically be interpreted as the date the graffiti was painted. Verify semantics against the source manual and live record UI.

### 4.3 City resource construction is lossy

For the source key `fundort_stadt`, the converter:
1. takes the substring before the first comma;
2. trims surrounding whitespace;
3. removes ordinary spaces;
4. creates a resource under `grfr:`;
5. links the graffiti with `grfp:hasLocation`;
6. stores the original text as the city resource's `rdfs:label`.

This means the resource local name is not necessarily a canonical city identifier. NIGHTSHIFT must preserve the literal source label and resource URI; city normalization belongs in a separate mapping layer.

### 4.4 Collections use auxiliary links and separate collection resources

The main converter emits `grfp:hasCollectionId` to a `grfr:collection_<id>` resource. The collection converter declares that resource as `grfo:Collection` and emits its name and ID using auxiliary `grfp:` predicates. Do not assume that a human-readable inventory label is itself the canonical collection identifier.

### 4.5 Image file metadata is separate from graffiti object metadata

The converter creates image-file resources and emits image URI, width, height, extension and optional aspect ratio. Preserve the image resource and graffiti resource as separate records/edges. A photo or image file count is not a graffiti-object count.

## 5. Query-design consequences for NIGHTSHIFT

The current Dortmund query pack should be treated as a catalogue-derived baseline, not yet as a verified executable query set.

Before publishing a “Dortmund count” or field dictionary:

1. Query both ontology and auxiliary namespaces for the known date and style predicates.
2. Check actual predicate usage with `COUNT(DISTINCT ?s)` and sample triples.
3. Test both `grfp:hasSyleElement` and `grfo:hasStyleElement` (plus any other catalogue spelling) without assuming equivalence.
4. Retrieve city resources and labels; compare the Dortmund URI local name with its label.
5. Inspect one graffiti resource with all outgoing triples and its linked image-file resources.
6. Inspect collection resources and labels independently.
7. Record endpoint URL, query text, timestamp, graph version, result count and sample resource IDs.

If the public endpoint is unavailable, use the archived Zenodo dump as a versioned snapshot. Do not mix the 2022-07-05 graph snapshot with current EasyDB counts.

## 6. What is established vs unresolved

**Established from inspected code and ontology**
- The three namespace IRIs and their roles in the converter.
- The translation dictionary tokens listed above.
- The `hasSyleElement` spelling discrepancy.
- Separate converter paths for `aufnahmedatum`, `datierung`, `_created` and `_last_modified`.
- The city URI construction rule.
- Separate collection and image-file resources.

**Not established yet**
- Whether the currently hosted SPARQL endpoint uses this exact converter revision.
- Whether every mapped field is populated in the public graph.
- Actual Dortmund graffiti/photo/image counts.
- Actual frequency of the typo predicate.
- Whether EasyDB current labels and converter JSON keys have changed since the inspected source.
- Whether any graph-side normalization or post-processing changes these triples.

## 7. Sources

- INGRIDKG paper and data availability: https://pmc.ncbi.nlm.nih.gov/articles/PMC10212912/
- Converter source: https://github.com/dice-group/Ingrid
- Converter entry point: https://github.com/dice-group/Ingrid/blob/main/runGeneration.sh
- Published ontology: https://github.com/dice-group/ingrid.github.io/blob/main/ontology_v3.ttl
- Zenodo archive: https://zenodo.org/records/7560242

**Evidence note:** upstream source files and ontology were fetched and inspected directly on 2026-11-15. The SPARQL endpoint and RDF dump were not queried or downloaded during this audit.
