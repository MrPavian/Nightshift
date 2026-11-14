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



## I. Additional German-scene research regression fixtures

| ID | Fixture/action | Expected | Failure |
|---|---|---|---|
| BA-DE13 | Open Stylefile | Magazine/publication with issue-level evidence | Treated as crew or style |
| BA-DE14 | Open 1UP | Crew history, collective identity, attributed founding date | Assumed all Berlin Kidz are 1UP |
| BA-DE15 | Open Berlin Kidz | Film/media representation with uncertain roster | Film depiction treated as verified crew directory |
| BA-DE16 | Open MOSES & TAPS | Evolving artist collective and conceptual practice | Reduced to one graffiti style preset |
| BA-DE17 | Open LOOMIT | First-person dates and crew affiliations attributed to interview | Retrospective testimony shown as independently verified fact |
| BA-DE18 | Open OZ | City of OZ archive and contested reception presented with nuance | Sensationalist press labels repeated as neutral fact |
| BA-DE19 | Open CAN2 | 1983 first-piece claim attributed to 2010 interview | Unsupported location or crew details invented |
| BA-DE20 | Search DARKO / VANDALZ / THE FÖNS | Unresolved lead status or disambiguation request | Unverified profile or crew claims published |
| BA-DE21 | Search Stylefile issue | Issue/date/featured city metadata if catalogued | Unlicensed scan displayed as cleared asset |
| BA-DE22 | Compare DAIM, LOOMIT and MOSES & TAPS | Separate 3D letterform, individual writer and conceptual collective practices | All collapsed into generic 3D style category |




## J. Publication and archive bibliography regression fixtures

| ID | Fixture/action | Expected | Failure |
|---|---|---|---|
| BA-PUB01 | Open EINE STADT WIRD BUNT | Hamburg 1980–1999 book/project with scope, contents and contributor provenance | Reduced to photo book or treated as complete scene roster |
| BA-PUB02 | Search Hamburg serial titles | Daily Bombs, Dosenspuk, Beastie Boyz and Backspin stored as distinct publications | Serial titles conflated or unsupported issue data invented |
| BA-PUB03 | Open DECADES Vol. 1 | Berlin 1990–2000 scope, listed names attributed to publisher description | Listed names treated as complete scene census or verified crew membership |
| BA-PUB04 | Open Stylefile 1 | September 1999 issue record with JOAN / TOWN & FASER / JUNK fields | Conflicting reseller date silently overwrites issue record |
| BA-PUB05 | Open Stylefile 2 | March 2000 / SAFIR / AOD / GLOCK fields | Issue 1 metadata copied to issue 2 |
| BA-PUB06 | Open Stylefile 12 | July 2003 review and stated contents treated as secondary review evidence | Review mistaken for direct physical inspection |
| BA-PUB07 | Open Stylefile 61 / 62 | Issue 61 description separated from issue 62 existence-only listing | Unverified issue 62 contents fabricated |
| BA-PUB08 | Search Martha Cooper Library OPAC | Collection scope distinguished from exact title-level holdings | Specific issue claimed held without OPAC record |
| BA-PUB09 | Record MCL access | Reading-room access, closed stacks and reproduction rights stored separately | Access treated as image reuse permission |
| BA-PUB10 | Compare publication metadata | Conflicting dates and source types preserved with provenance | Conflicts silently reconciled |



### Additional Hamburg serial-publication fixtures

| ID | Fixture/action | Expected | Failure |
|---|---|---|---|
| BA-HM01 | Open Daily Bombs | Editor period 1992–1999 attributed to official project biography; broader catalogue run flagged for verification | Catalogue run treated as continuous publication without issue evidence |
| BA-HM02 | Search Dosenspuk / Dosen Spuk | Alias/spelling variants preserved pending masthead check | Variants silently merged or split without evidence |
| BA-HM03 | Open Beastie Boyz | Title variants, format changes and sketch-only issues recorded with catalogue provenance | Sketch-only supplements conflated with separate Sketches magazine |
| BA-HM04 | Open BACKSPIN | Founder testimony and issue-history record cited; 1993/1994 conflict remains visible | Conflicting founding/first-issue dates silently reconciled |
| BA-HM05 | Search Sketches and Rock 'n' Roller | Single-source leads remain low-confidence until corroborated | Full publication profiles invented from timeline mention |



### Berlin DECADES trilogy regression fixtures

| ID | Fixture/action | Expected | Failure |
|---|---|---|---|
| BA-BD01 | Open DECADES Vol. 1–3 | Three distinct decade records with separate source metadata | Trilogy flattened into one undated publication |
| BA-BD02 | Search portrait subject | Presence attributed to publisher's portrait list | Portrait appearance treated as complete biography or crew membership |
| BA-BD03 | Compare publisher historical framing | Interpretations attributed and cross-check required | Publisher narrative presented as uncontested historical fact |
| BA-BD04 | Link ODEM to Vol. 1 | Publication link does not overwrite memoir/first-person sources | One publication treated as sole biography source |
