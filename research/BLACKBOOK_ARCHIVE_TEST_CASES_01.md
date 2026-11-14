# BLACKBOOK ARCHIVE — Test Cases 01

Status: test design only; not executed against a production archive UI. Scope: content integrity, evidence, rights, search, navigation and generator handoff.

## A. Content integrity

| ID | Fixture/action | Expected | Failure |
|---|---|---|---|
| BA-C01 | Open practice.writing | “Writing” attributed as practitioner terminology; “graffiti” contextualized as broader external label | Exact universal synonyms |
| BA-C02 | Open early-history timeline | No single inventor/borough declared without qualification | Unqualified origin claim |
| BA-C03 | Open Clean Train entry | 1989 statement scoped to subway fleet and attributed to MCNY | UI says graffiti ended in 1989 |
| BA-C04 | Open Chalfant entry | Provisional verification state visible | Search-index text promoted as fully checked |
| BA-C05 | Open blackbook entry | NYU/MCNY claims describe holdings and collection practices | One archive generalized to entire scene |
| BA-C06 | Open women writers topic | Individual “first” claims attributed and confidence-labelled | Token sidebar or unqualified priority claim |
| BA-C07 | Compare fact/inference | Historical claims and NIGHTSHIFT proposals separately labelled | Feature proposal presented as history |

## B. Sources and rights

| ID | Fixture/action | Expected | Failure |
|---|---|---|---|
| BA-R01 | Open SR-NYC-002 | Institution, collection ID, dates, scope and link shown | Missing/wrong provenance |
| BA-R02 | Open SR-NYC-005 | Direct verification pending visible | Snippet silently promoted |
| BA-R03 | Publish MCNY guide image | Blocked until exact item rights/permission recorded | Access mistaken for reuse permission |
| BA-R04 | Source with unknown rights | Link-only; no copied asset | Unknown treated as public domain |
| BA-R05 | Source URL unavailable | Entry readable with source warning/retry | Claim silently left unqualified |
| BA-R06 | Update source record | Dependent claims flagged for review | No dependency tracking or whole archive falsely reverified |

## C. Search and taxonomy

| ID | Query/action | Expected | Failure |
|---|---|---|---|
| BA-S01 | Search blackbook | object.blackbook and preservation content | Exact-title-only search |
| BA-S02 | Search piece book | Alias/related result with terminology note | Universal synonym asserted |
| BA-S03 | Search graffiti-free 1989 | Clean Train entry explains scope | Implies all graffiti ceased |
| BA-S04 | Search wholecar | Format category, not letterform style | Wholecar treated as glyph grammar |
| BA-S05 | Search writing | Practice entry distinguishes broader meanings | Search collapses meanings |
| BA-S06 | Filter history | Historical process entries only | Taxonomy dimensions mixed |
| BA-S07 | Unknown term | Nearest related entries and preserved query | Dead-end empty state |

## D. Navigation and learning paths

| ID | Starting point/action | Expected |
|---|---|---|
| BA-N01 | practice.writing → handstyle | Related practice opens with back path |
| BA-N02 | object.blackbook → preservation | Historical preservation process opens |
| BA-N03 | Clean Train → cultural afterlives | Blackbook/preservation context opens |
| BA-N04 | Sequential photography → train formats | Documentation leads to car/panel composition |
| BA-N05 | Any entry → back | Previous search/filter context restored |
| BA-N06 | Traverse three related links | No dead ends or missing targets |

## E. Generator bridge

| ID | Archive item | Expected | Failure |
|---|---|---|---|
| BA-G01 | Letter anatomy | Opens only if component inspector exists | Dead/speculative button |
| BA-G02 | Wholecar | Surface-layout study only when implemented | Glyph stretched to fill surface |
| BA-G03 | Blackbook | Saved project/version history, labelled as product analogy | Product analogy presented as history |
| BA-G04 | Chalfant sequence | Original NIGHTSHIFT train-layout exercise | Archive image traced as template |
| BA-G05 | Handstyle | Gesture study only when gesture model exists | Ordinary font called authentic handstyle |

## F. Editorial regression
Freeze snapshots for practice.writing, object.blackbook, history.clean-train-campaign, practice.sequential-train-photography, history.blackbook-preservation-network and history.institutional-recognition.

Every content build must validate stable IDs, internal links, evidence status independently from publication status, claim-to-source IDs, image rights separately from evidence, unsupported superlatives/origin language, date precision and generator links against implemented capabilities.

## G. Execution record
No UI or automated tests were executed here. Mark cases only after implementation exists and a reproducible result is recorded. Editorial review is not runtime QA.


## H. German scene and Martha Cooper regression fixtures

| ID | Fixture/action | Expected | Failure |
|---|---|---|---|
| BA-DE01 | Open Dortmund Style | Regional tendency with attributed characteristics and individual variation | Presented as a universal German alphabet/style |
| BA-DE02 | Open Silo Nation | Classified as hip-hop community/network and jam culture | Automatically typed as graffiti crew or style preset |
| BA-DE03 | Search ATOM ONE / Der Lange | Resolves to one person record with aliases | Split into duplicate people without reason |
| BA-DE04 | Search Pure Doze / DOZE | Resolves to separate person from ATOM ONE | Alias collision with ATOM ONE |
| BA-DE05 | Search Too Strong | Music group linked to Dortmund scene and Silo Nation | Music group conflated with TRD/TUF graffiti crews |
| BA-DE06 | Open DAIM | Hamburg writer and 3D letterform research | Generic 3D effect or DAIM clone preset |
| BA-DE07 | Open Ma'Claim | Photorealistic collaborative aerosol/character practice, formed 2001 per attributed accounts | Treated as classic letter grammar or invention myth repeated uncritically |
| BA-DE08 | Open ODEM | Berlin scene narrative with retrospective/source attribution | Memoir treated as exhaustive neutral chronology |
| BA-DE09 | Open Martha Cooper Library | Research institution with catalogue/reading-room access and separate rights status | Library access treated as photo licence |
| BA-DE10 | Search German graffiti history | Results cover multiple regional scenes, not Berlin only | German history reduced to one city |
| BA-DE11 | Timeline 1979–2001 | Parallel regional developments and cross-border networks shown with date precision | Single linear national origin story |
| BA-DE12 | Search Dortmund Style | Links to Ruhrgebiet, TUF/CHINTZ/SHARK and later scene records with source-specific confidence | Crew membership or style claims shown without attribution |

