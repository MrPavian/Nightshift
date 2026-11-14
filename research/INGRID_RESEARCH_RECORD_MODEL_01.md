# INGRID RESEARCH RECORD MODEL 01

**Status:** research/data contract proposal; not implemented in the production editor  
**Priority:** P1 — foundational Blackbook Archive and empirical research layer  
**Scope:** provenance-aware import and analysis of INGRID records; extensible to other archives  
**Related:** INGRID_ONTOLOGY_TO_NIGHTSHIFT_CROSSWALK_01.md, INGRID_REGIONAL_RESEARCH_SCOPE_01.md, VISUAL_REFERENCE_DATABASE.md

## 1. Purpose

Define how NIGHTSHIFT stores, compares and cites archive-derived research without confusing photographs, graffiti objects, sub-elements, observations, annotations or style conclusions.

The archive layer is a research system. It is not a training-data ingestion pipeline and does not automatically generate production presets.

## 2. Source-grounded facts

The INGRID project documentation and 2023 knowledge-graph paper establish the following:

- INGRID distinguishes four linked image levels: Foto, Graffiti, Teilgraffiti and Fotostrecke. The graffiti level is the central annotation object; a part may be separately annotated; related photos may document a wall or room as a photo series.
- Photo-level capture location and recording time are supplied by image contributors / imported from source media. Other annotation values are derived by annotators inspecting the photograph.
- INGRID uses an interdisciplinary annotation process involving linguistics and art history. The published paper describes two teams and a manual with category criteria; ambiguous cases are discussed by annotators.
- The knowledge graph gives graffiti resources persistent identifiers and links to image files, city, collection, crews and provenance.
- The graph includes exact and near-duplicate relationships. The paper describes perceptual hashing with DHash to link repeated views / near-duplicate images.
- Public image availability is narrower than metadata availability. The paper says only a subset of photographs is public because of source agreements; metadata is publicly available. Image, metadata and knowledge-graph licensing are distinct.

Sources:
- Sherif et al. (2023), “IngridKG: A FAIR Knowledge Graph of Graffiti”, Scientific Data 10, 318. DOI: https://doi.org/10.1038/s41597-023-02199-8
- INGRID illustrated research manual: https://www.uni-paderborn.de/fileadmin/ingrid/Illustriertes_Recherchemanual.pdf
- INGRID ontology page: https://www.uni-paderborn.de/en/forschungsprojekte/ingrid/standard-titel/ingrid-webrelaunch-start/ontologie
- INGRID user/project page: https://www.uni-paderborn.de/en/research-projects/ingrid/

These are descriptions of INGRID. The NIGHTSHIFT data structures and workflow below are design proposals.

## 3. Non-negotiable modelling rules

1. **Photo is not graffiti.** One photograph may show several graffiti objects; one graffiti object may have several photographs.
2. **Graffiti is not Teilgraffiti.** Preserve parent-child relationships and the fact that a part is an annotation unit, not necessarily a separate artwork.
3. **Fotostrecke is a grouping relation.** Do not count a photo series as one graffiti object or each frame as an independent work without an explicit analytical reason.
4. **Recording date is not creation date.** Store them separately, with their source and certainty.
5. **Source annotation is not researcher observation.** Never overwrite one with the other.
6. **Research observation is not a production parameter.** A visible feature becomes a generator proposal only after multi-example review, calibration and explicit approval.
7. **Missing is not false.** Absence may mean unknown, not annotated, not visible, not applicable, withheld or inaccessible.
8. **A near-duplicate link is not proof of identity.** Preserve the source relation and confidence; never silently merge records.
9. **Metadata rights are not image rights.** Store item-level rights and intended-use clearance separately.
10. **A writer pseudonym is not a verified civil identity.** Retain source attribution without attempting identity resolution.

## 4. Proposed entity model

### 4.1 ArchiveSource

Represents the archive/database that supplied a record.

Fields:
- sourceId (stable internal ID)
- sourceName
- sourceRecordUri
- sourceVersion / snapshotDate
- sourceLicenseStatement
- sourceDocumentationUri
- retrievalMethod
- retrievedAt
- notes

### 4.2 ArchiveRecord

Represents an individual source record at its original granularity.

Fields:
- recordId (stable internal ID)
- sourceId
- sourceRecordId (exact source identifier; never rewrite)
- sourceUri
- sourceEntityType: photo | graffiti | partialGraffiti | photoSeries | imageFile | city | collection | crew | personOrAlias | unknown
- parentRecordIds[]
- relatedRecordIds[]
- sourceCreatedAt (only if supplied)
- retrievedAt
- sourcePayloadHash (hash of the captured metadata payload, not the image)
- sourceVersion
- recordStatus

The original source identifier and URI must remain available after normalization.

### 4.3 ImageAssetReference

Stores metadata and rights information about an image without requiring the image bytes to be copied into NIGHTSHIFT.

Fields:
- imageRefId
- archiveRecordId
- sourceImageUri / sourceAccessUri
- systemId
- width, height, aspectRatio, fileExtension (when available)
- imageRole: original | crop | derivative | thumbnail | unknown
- duplicateGroupId (optional)
- duplicateRelation: exact | near | relatedView | unknown
- sourceRightsStatement
- licenseUri
- attributionText
- rightsStatus: openLicenseConfirmed | permissionGranted | referenceOnly | permissionRequired | unknown
- approvedUses[]
- restrictions[]
- lastRightsCheckAt

Never materialize or bundle an image merely because its URI is present.

### 4.4 SourceAnnotation

An immutable record of what the source archive says.

Fields:
- annotationId
- archiveRecordId
- categoryPath (source-native category)
- sourceFieldName
- sourceValueId (if available)
- sourceValueLabel
- sourceFreeText
- annotationDepth: basic | inDepth | unknown
- annotatorProvenance: contributor | annotator | system | unknown
- sourceConfidence (only if explicitly supplied; never invent)
- sourceManualVersion
- sourceAnnotationDate
- sourceCitation

Do not translate a source value by replacing it. Add a separate normalized mapping.

### 4.5 NormalizedConcept

Maps a source-native term into a versioned NIGHTSHIFT research vocabulary.

Fields:
- mappingId
- sourceId
- sourceCategoryPath
- sourceValueId / sourceValueLabel
- targetConceptId
- mappingRelation: exact | closeMatch | broader | narrower | related | unmapped
- mappingRationale
- mappingVersion
- reviewedBy
- reviewedAt

A mapping may be ambiguous or unmapped. Never force a false one-to-one equivalence between INGRID labels and NIGHTSHIFT controls.

### 4.6 ResearchObservation

Stores a researcher's direct visual or documentary observation separately from source annotation.

Fields:
- observationId
- archiveRecordId
- imageRefId (optional)
- observerId
- observedAt
- observationMode: visual | textual | documentary | comparative
- featureId
- value
- valueType
- visibility: clear | partial | obscured | notAssessable
- confidence: high | medium | low
- evidenceNote
- imageRegion (optional coordinates; coordinate system must be declared)
- reviewerStatus: unreviewed | reviewed | disputed | accepted | rejected
- reviewerNote

Example features: apparent slant, width-to-height proportion, letter connection, visible outline, fill, shadow, surface constraints. Stroke order must remain unknown unless genuinely inferable from a source or direct process evidence.

### 4.7 ResearchClaim

Represents an interpretation that may combine multiple observations and sources.

Fields:
- claimId
- claimText
- claimType: historical | stylistic | regional | technical | contextual
- supportingObservationIds[]
- supportingSourceAnnotationIds[]
- counterEvidenceIds[]
- scope: object | writerAttributedCorpus | collection | city | region | period
- confidence: high | medium | low | contested
- status: draft | underReview | accepted | rejected | superseded
- author
- reviewedAt
- version

A claim must state its scope. A single writer's corpus cannot silently become a city-wide style rule.

### 4.8 RightsDecision

A decision for a specific asset and intended use.

Fields:
- rightsDecisionId
- imageRefId
- intendedUse: research | citation | teaching | editorPreview | marketing | training | redistribution
- decision: allowed | allowedWithConditions | permissionRequired | prohibited | unresolved
- legalBasis / licenseUri
- attributionRequirements
- shareAlikeRequirements
- thirdPartyRightsCheck
- decisionOwner
- decisionDate
- evidenceUri
- expiryOrReviewDate

## 5. Time model

Do not store a single generic date for a graffiti record.

Use separate typed date claims:
- photoRecordingDate — when the photograph was taken;
- graffitiCreationDate — when the graffiti was created, if attributed;
- sourcePublicationDate — when a book/article/video/document was published;
- annotationDate — when archive annotation was carried out;
- archiveImportDate — when the item entered the source system;
- researchObservationDate — when NIGHTSHIFT researchers inspected it.

Each date claim carries:
- value or interval;
- precision: exact | day | month | year | decade | range | unknown;
- source: contributor | actant | archive | publication | researcher | system;
- certainty: confirmed | attributed | estimated | disputed | unknown;
- citation / evidence reference.

Never infer graffiti creation date from photo recording date without a separate, explicit inference claim.

## 6. Missingness and uncertainty vocabulary

Use explicit statuses instead of null-as-meaning:

- unknown — source does not establish the value;
- notAnnotated — source field was not annotated;
- notVisible — the feature cannot be seen in the available image;
- notApplicable — the field does not apply;
- withheld — source intentionally does not expose the value;
- inaccessible — a record or image could not be accessed;
- disputed — credible sources or annotators disagree;
- unmapped — source term has no reviewed NIGHTSHIFT equivalent.

A blank database field may be retained as raw null, but the normalized layer must not invent a reason for its absence.

## 7. Duplicate and sampling rules

- Preserve every original source record and source identifier.
- Store duplicate / near-duplicate relationships as edges, not destructive merges.
- A visual study sample should select one primary view per graffiti object where practical, while retaining alternate views for surface, detail and context analysis.
- Report both counts: unique graffiti objects and associated image files.
- If the source only exposes image-level records, state that object-level deduplication is unavailable.
- Stratify samples by period × source collection × type × annotation depth. Add city only after city-resource identity is verified.
- Do not treat corpus frequency as prevalence in the city: archive acquisition and collection bias must be reported.

## 8. Research-to-editor promotion gate

A research observation or source annotation must pass these gates before it influences the generator:

1. **Source integrity:** stable record IDs, citation and provenance retained.
2. **Visual assessability:** the feature is visible and not merely inferred from a label.
3. **Replication:** the feature is observed across multiple examples, preferably multiple writers and dates.
4. **Scope:** the proposed claim is limited to the actual sample and period.
5. **Counterexamples:** contradictory examples are recorded.
6. **Abstraction:** no named writer's tag, signature or specific piece is reproduced as a template.
7. **Parameter definition:** a neutral feature is defined in measurable terms with bounded controls.
8. **Calibration:** bounds are tested on synthetic or commissioned material.
9. **Human review:** visual proof sheets are reviewed before shipping.
10. **Rights clearance:** any image used in product output is separately cleared.

Promotion outcomes:
- archive context only;
- Blackbook educational explanation;
- visual observation feature;
- editor authoring control proposal;
- generator parameter candidate;
- rejected / insufficient evidence.

A source category such as “Wild Style” is not itself a generator recipe.

## 9. First implementation slice

Do not build a full EasyDB crawler or image downloader.

Implement a small local research manifest with:
- source record identity;
- entity granularity and parent links;
- separate date claims;
- source annotations and normalized mappings;
- researcher observations;
- explicit missingness;
- duplicate edges;
- item-level rights status.

The first test fixture should contain:
- one photo linked to two graffiti objects;
- one graffiti object with two image views;
- one partial graffiti linked to a parent graffiti;
- one photo series linking multiple photos;
- one near-duplicate edge that does not merge records;
- distinct recording and attributed creation dates;
- one unannotated feature and one not-visible feature;
- one image marked reference-only.

Tests must prove that counts and relations remain correct after import/export and that no observation silently overwrites source annotation.

## 10. Acceptance criteria

- Photo, graffiti, partial graffiti, photo series and image asset are distinct entity types.
- Parent-child and related-record links round-trip without loss.
- Source identifiers and source-native category labels remain immutable.
- Recording and creation dates cannot be accidentally conflated.
- Null / missingness states remain distinguishable.
- Near-duplicate relations do not merge records or reduce object counts automatically.
- Source annotation and researcher observation remain separate.
- Every normalized mapping has a version and relation type.
- Rights decisions are asset- and intended-use-specific.
- No image bytes are downloaded or bundled by this slice.
- No automatic style preset or generator parameter is produced.
- Machine-readable fixtures and tests are included.

## 11. Open questions requiring live INGRID access

- Which record-level identifiers and parent-child relations are exposed in the current EasyDB user interface?
- Can system IDs be exported in a repeatable way for the Dortmund sample?
- Which annotation depth/status fields are queryable?
- Can public image access and item-level license statements be joined reliably to metadata exports?
- Are near-duplicate relations exposed in the current EasyDB interface, the public KG, or only in a graph snapshot?
- Which fields are present in current records versus only in the 2019 manual / 2023 KG snapshot?

Do not claim these questions are answered until the live interface or current export is inspected.

## 12. Completion report

Record schema version, fixture IDs, exact test commands and totals, export/import hash results, rights-model checks, known gaps and any source-specific limitations. Keep all source facts and NIGHTSHIFT design inferences visibly separate.
