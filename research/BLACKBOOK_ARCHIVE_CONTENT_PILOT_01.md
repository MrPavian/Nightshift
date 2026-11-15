# THE BLACKBOOK ARCHIVE — Content Pilot 01

**Status:** Editorial pilot draft; not approved for in-game publication.  
**Source of truth:** Existing NIGHTSHIFT research dossiers listed per entry.  
**Rule:** This pilot demonstrates content shape and taxonomy. It does not add unsupported historical claims or reuse rights for images.

## 1. Pilot entry: Handstyle

- **ID:** `practice.handstyle`
- **Type:** Practice / lettering activity
- **Short definition:** A writer's personal way of forming a written name or mark. In NIGHTSHIFT, handstyle is treated as a gestural and motor practice as well as a visible letterform.
- **Recognize it by:** rhythm, direction, speed-related simplification, repeated personal habits and the relationship between letters.
- **Distinguish from:** a developed piece or a named letterform grammar; a handstyle is not simply a small version of a piece.
- **Context:** The research library treats handstyle, gesture and motor dynamics as an important foundation for later lettering and composition. The exact history and terminology vary.
- **Generator connection:** Future handstyle gesture study; not a production generator preset.
- **Evidence:** Research synthesis and handstyle dossier; claims should be cited at claim level in final editorial copy.
- **Rights:** No image asset included; external references remain link-only until item-level rights review.
- **Editorial status:** draft.

## 2. Pilot entry: Bubble lettering

- **ID:** `letterform.bubble`
- **Type:** Letterform grammar / style term
- **Short definition:** A rounded approach to letter construction in which curved masses and softened transitions are prominent.
- **Recognize it by:** rounded outer silhouettes, curved transitions and negative spaces shaped in relation to the surrounding mass.
- **Distinguish from:** throw-up, which is a practice/form context and is not automatically synonymous with one letterform grammar.
- **Context:** NIGHTSHIFT models Bubble as a letterform grammar, separate from composition, practice, surface and rendering.
- **Generator connection:** Future monochrome grammar comparison; only glyphs with authored compatible geometry can be claimed as supported.
- **Evidence:** `PHASE_2_AND_BUBBLE_LETTERING.md`, `STYLE_GRAMMAR_SPECIFICATIONS_01.md`, `STYLE_GRAMMAR_COMPATIBILITY_AND_PARAMETERS.md`.
- **Rights:** No copied artwork; explanatory diagrams should be original.
- **Editorial status:** draft.

## 3. Pilot entry: Wildstyle

- **ID:** `composition.wildstyle-study`
- **Type:** Composition / relationship grammar (NIGHTSHIFT product model)
- **Short definition:** A complex approach to word composition in which letter relationships, extensions, overlaps and interlocking can become central to the overall structure.
- **Recognize it by:** deliberate connections, directional flow, layered relationships and active negative-space management.
- **Distinguish from:** a single fixed alphabet or a bundle of arrows and decorative effects.
- **Context:** Historical usage and definitions vary. NIGHTSHIFT's decision to model Wildstyle primarily as a composition/relationship grammar is an explicit product abstraction, not a universal historical classification.
- **Generator connection:** Relationship study, only when anchor and whole-word validation capabilities are implemented.
- **Evidence:** `WILDSTYLE_TRACY168_AND_LETTER_CONNECTIONS.md`, `LETTER_PAIR_CONNECTIONS_AND_WORD_FLOW.md`, `STYLE_GRAMMAR_SPECIFICATIONS_01.md`.
- **Rights:** Do not trace or reproduce a specific writer's signature or protected work.
- **Editorial status:** draft.

## 4. Pilot entry: Wholecar

- **ID:** `format.wholecar`
- **Type:** Format / surface context
- **Short definition:** A format describing work occupying the full exterior side or body of a rail vehicle, with exact usage and boundaries depending on context.
- **Recognize it by:** scale and coverage across the vehicle surface; the term describes format, not a letterform grammar.
- **Distinguish from:** panel and end-to-end formats; use the research dossier's terminology notes and source-specific definitions.
- **Context:** NIGHTSHIFT keeps format/surface independent from letter construction and rendering.
- **Generator connection:** Future surface-fit and coverage preview; it must not distort glyph identity to fill a surface.
- **Evidence:** `GRAFFITI_FORMATS.md`, `NYC_SUBWAY_DECLINE_AND_AFTERLIVES.md`.
- **Rights:** Archival train images require item-level provenance and rights review.
- **Editorial status:** draft.

## 5. Pilot entry: Aerosol caps

- **ID:** `technique.aerosol-caps`
- **Type:** Technique / material component
- **Short definition:** Interchangeable aerosol nozzle components that affect the spray output. The research dossier treats cap behavior as part of material practice and visual execution, not as a letterform grammar.
- **Recognize it by:** differences in line character and output behavior described in the source dossier; do not present a universal performance chart without controlled evidence.
- **Distinguish from:** fill/outline as visual roles, and from glyph geometry itself.
- **Context:** NIGHTSHIFT separates material/execution decisions from semantic glyph construction. Safety-relevant operational detail is not needed for the archive's cultural explanation.
- **Generator connection:** Future finish/render study only; material simulation must remain separate from canonical geometry.
- **Evidence:** `AEROSOL_TECHNOLOGY_CAPS_AND_PAINT_PRACTICE.md`.
- **Rights:** Prefer original diagrams; external images are link-only pending rights checks.
- **Editorial status:** draft.

## 6. Pilot entry: Letter anatomy

- **ID:** `construction.letter-anatomy`
- **Type:** Letter construction / learning concept
- **Short definition:** A vocabulary for describing parts and relationships in a letterform, including stems, bars, bowls, terminals, junctions and negative spaces.
- **Recognize it by:** component roles and the way their connections create a recognizable silhouette.
- **Distinguish from:** stroke order or handwriting anatomy; a closed outline does not prove how a writer moved a marker or aerosol can.
- **Context:** NIGHTSHIFT uses semantic components to make vector geometry editable and testable. The component graph is an engineering representation, not a claim that writers consciously construct every letter in the same way.
- **Generator connection:** Glyph/component inspector, when implemented.
- **Evidence:** `GRAFFITI_LETTER_ANATOMY_AND_COMPOSITION.md`, `GLYPH_DATA_CONTRACT_A_Z.md`, `GLYPH_CONSTRUCTION_PIPELINE_01.md`.
- **Rights:** Original explanatory diagrams only.
- **Editorial status:** draft.

## 7. Editorial QA before publication

For each entry:
- verify every historical claim against the cited source itself;
- preserve attribution and date/region scope;
- add aliases only when supported;
- distinguish historical terminology from NIGHTSHIFT product categories;
- link related entries without forcing false equivalence;
- confirm source URL and retrieval date;
- set image rights separately from evidence status;
- keep generator links inactive until the capability exists;
- obtain editorial review before marking approved-for-archive.

This pilot is a content model demonstration. It does not establish that the underlying research dossiers have been re-audited claim by claim in this pass.


---

# Editorial launch plan 01 — 30-entry C06 edition

**Owner-approved target:** 30 curated entries. This is the launch register, not a claim that all entries are already approved for publication. The six pilot records above remain examples of the content shape; this section defines the full launch scope and review gates.

## A. Entry register

The 30 entries below are assigned one primary editorial cluster. Each entry may carry multiple orthogonal facets. IDs are proposed stable IDs; Claude must check the live dataset for collisions before use.

### History and circulation (6)

| ID | Title | Editorial purpose | Core source base | Draft readiness |
|---|---|---|---|---|
| history.modern-name-writing | From name-writing to modern writing culture | Explain the emergence of modern name-centred writing without claiming it invented all public inscription. | NYC claim ledger; Joe Austin; Coetsee; Philadelphia dossier. | Ready to draft; preserve competing origins. |
| history.philadelphia-new-york | Philadelphia and New York: related early centres | Show parallel, connected but distinct 1960s developments. | Pfeiffenberger; Mitman; Dirkson; Coetsee. | Ready to draft; exact priority/transmission remain qualified. |
| history.nyc-subway-era | New York subway writing, 1970s–1980s | Explain trains as moving surfaces, social infrastructure and documentation challenge. | Austin; Coetsee; Bronx Museum / Chalfant archive. | Ready to draft. |
| history.global-circulation | How writing travelled | Trace photography, books, film, music, travel and personal networks. | Global circulation dossier; Chalfant archive; regional case studies. | Ready to draft; avoid one-way diffusion. |
| history.after-subway | After the subway era | Explain changing surfaces, media, commercial and institutional contexts without claiming writing ended. | NYC 1990s transition dossier; TATS CRU research; retrospective accounts. | Draft; corroborate date-specific claims. |
| history.blackbook-to-digital | From blackbooks to digital networks | Connect face-to-face exchange, photography, zines and digital networks. | Rahn; Pabón-Colón; NYC zine/media dossier. | Ready to draft with generational caveats. |

### Places and scenes (5)

| ID | Title | Editorial purpose | Core source base | Draft readiness |
|---|---|---|---|---|
| scene.philadelphia | Philadelphia: name-writing and local lettering | Give Philly its own scene chapter, including WICKED/WICKET traditions and local vocabulary. | Pfeiffenberger; Mitman; Dirkson; KIT research. | Ready to draft; not a CORNBREAD-only story. |
| scene.new-york-city | New York: boroughs, transit and networks | Present a multi-borough, multi-generation scene. | NYC history; borough map; Chalfant archive; Bronx oral histories. | Ready to draft; source every borough-specific claim. |
| scene.amsterdam | Amsterdam: punk, squatter and hip-hop writing | Explain local late-1970s name-writing and later interaction with U.S. hip-hop writing. | Robin Vermeulen (2015), ten interviews; Dutch Graffiti Library. | Ready to draft; distinguish interview testimony from institutional framing. |
| scene.paris-banlieue | Paris and Seine-Saint-Denis | Explain 1980s hip-hop circulation via radio/TV and the role of northeastern Paris and industrial-fringe spaces. | Ville de Paris / Plaine Commune (2021); David Fieni. | Ready to draft; distinguish older public writing from hip-hop writing. |
| scene.sao-paulo | São Paulo: graffiti and pixação | Explain pixação as a locally named, visually distinct practice, not a synonym for U.S. tagging. | Alexandre Barbosa Pereira (USP, 2005; 2013); SciELO; FAPESP. | Ready to draft; retain spelling pixação and explain contested categories. |

### Practices, styles and formats (8)

| ID | Title | Editorial purpose | Core source base | Draft readiness |
|---|---|---|---|---|
| practice.tag-handstyle | Tag and handstyle | Explain the tag as writing practice and handstyle as a personal lettering system. | NYC history; Rahn; Coetsee; letter anatomy dossier. | Ready to draft; terminology varies. |
| practice.getting-up | Getting up and bombing | Explain repetition, visibility, placement and competition as scene concepts. | Austin; Philadelphia dossier; attributed practitioner accounts. | Draft; no operational trespass/evasion guidance. |
| format.throw-up | Throw-up / flop | Explain reduced, quick letter compositions and terminology variation. | SCHIRN/Görler; specialist literature. | Provisional; source audit needed before approval. |
| format.piece-burner | Piece and burner | Explain developed compositions, outlines, fills, scale and variable use of “burner”. | Chalfant archive; Austin; Coetsee. | Draft; “burner” is not a universal formal category. |
| format.panel-wholecar | Panel, wholecar and train composition | Explain vehicle architecture, doors, windows, sequencing and train-length composition. | Chalfant archive; Coetsee; Subway Art context. | Ready to draft; distinguish photo sequence from original work. |
| style.bubble-blockbuster-straight | Bubble, blockbuster and straight letters | Compare construction tendencies while noting period and regional variation. | SCHIRN/Görler; Coetsee; specialist source review. | Draft; avoid rigid universal taxonomy. |
| style.wildstyle | Wildstyle and complex composition | Explain interlocking, extensions, flow and legibility debates without reducing it to a preset. | Coetsee; Austin; research on TRACY 168 and terminology. | Draft; verify term history before strong attribution. |
| style.pixacao-tag-reto | Pixação and tag reto | Explain the São Paulo-specific lettering system and its relationship to urban space. | Pereira; SciELO; FAPESP. | Ready to draft; do not equate with generic tagging. |

### Materials, learning and documentation (4)

| ID | Title | Editorial purpose | Core source base | Draft readiness |
|---|---|---|---|---|
| learning.blackbook | The blackbook as sketchbook and social object | Explain practice, exchange, peer learning, memory and informal archives. | Janice Rahn; Getty Research Institute LA Liber Amicorum. | Ready to draft; Rahn's Montreal study is situated, not universal. |
| documentation.graffiti-photography | Photographing ephemeral work | Explain documentation as a distinct practice, including Chalfant's train sequences. | Bronx Museum / Chalfant archive; MCNY Martin Wong collection. | Ready to draft; photograph is not the original graffiti object. |
| material.aerosol-system | Aerosol paint as a material system | Explain can, valve, actuator, cap and paint behavior at a non-operational cultural/material level. | Aerosol technology dossier; ethnographic sources; manufacturer histories. | Draft; avoid hazardous or evasion instructions. |
| archive.provenance-rights | Evidence, attribution and image rights | Explain why source provenance, uncertainty, attribution and reuse rights are separate. | Research README; INGRID record model; institutional rights statements. | Ready to draft. |

### People and cultural actors (5)

| ID | Title | Editorial purpose | Core source base | Draft readiness |
|---|---|---|---|---|
| person.cornbread | CORNBREAD and Philadelphia's early scene | Place a highly visible early writer within a broader group and city context. | Dirkson; Pfeiffenberger; Mitman. | Draft; no “first writer ever” claim. |
| person.topcat-126 | TOPCAT 126 and Philadelphia lettering | Explain local contribution and carefully qualified discussions of later influence. | Pfeiffenberger; KIT thesis; Philadelphia dossier. | Draft; attribute influence claims and retain uncertainty. |
| person.lady-pink | Lady Pink: writer, film participant and muralist | Present subway-era work, film role, crew context and later practice. | NEA first-person interview; Coetsee; Bronx Museum. | Ready to draft; attribute retrospective dates to her testimony. |
| person.martha-cooper | Martha Cooper: photographer and documentarian | Explain her role in recording graffiti and hip-hop culture; do not misclassify her as a writer. | MCNY collection; book records; interviews. | Draft; item-level image rights required. |
| person.henry-chalfant | Henry Chalfant: photographic archive and visual anthropology | Explain the method and significance of documenting ephemeral train works. | Bronx Museum; Chalfant archive; institutional records. | Ready to draft; distinguish photographer's record from graffiti authorship. |

### Glossary and editorial method (2)

| ID | Title | Editorial purpose | Core source base | Draft readiness |
|---|---|---|---|---|
| glossary.writer-writing-graffiti | Writer, writing and graffiti | Explain practitioners' vocabulary and limits of the external umbrella term “graffiti”. | Austin; Kramer; Ilan & Snyder; regional dossiers. | Ready to draft; usage changes by community and period. |
| method.local-terms-uncertainty | Why graffiti terms are not universal | Distinguish local terms, period usage, scholarly categories and NIGHTSHIFT product language. | Research README; global case studies; INGRID crosswalk. | Ready to draft; mark product abstraction explicitly. |

**Count check:** 6 + 5 + 8 + 4 + 5 + 2 = **30 entries**.

## B. Three launch learning paths

### Path 1 — From name to piece
`history.modern-name-writing` → `practice.tag-handstyle` → `practice.getting-up` → `format.throw-up` → `format.piece-burner` → `format.panel-wholecar`

Outcome: understand the relationship between writing practice, handstyle, developed lettering and surface format without treating it as one universal linear evolution.

### Path 2 — How writing travels and changes
`history.global-circulation` → `scene.new-york-city` → `scene.amsterdam` → `scene.paris-banlieue` → `scene.sao-paulo` → `method.local-terms-uncertainty`

Outcome: compare circulation and local adaptation without ranking scenes by proximity to New York.

### Path 3 — How the archive remembers
`learning.blackbook` → `documentation.graffiti-photography` → `person.martha-cooper` → `person.henry-chalfant` → `archive.provenance-rights` → `person.lady-pink`

Outcome: understand how graffiti history is made, documented, remembered and sometimes distorted by surviving archives.

## C. Relationship model

Each entry should have 2–5 meaningful related-entry links. No filler recommendations.

Use typed relations:
- `located_in`
- `part_of_period`
- `practiced_in`
- `influenced_by`
- `documented_by`
- `contrasts_with`
- `variant_of`
- `uses_format`
- `uses_material`
- `explains_term`
- `learning_next`

Influence is a strong historical claim. Use it only with direct support. Otherwise prefer weaker, more accurate relations such as `circulated_through` or `compared_with`. People are not styles, crews are not generator presets, and a photograph is not the graffiti object itself.

Women and underdocumented participants must be integrated into the ordinary scene chronologies and thematic relations, not isolated in a token category.

## D. Claim-level evidence contract

For each public paragraph or meaningful claim, store:
- stable claim ID;
- source ID and exact URL;
- author / institution;
- source type (oral history, scholarly work, museum archive, contemporary press, practitioner interview, documentary);
- publication date and page/section where available;
- evidence label;
- claim type: documented fact, attributed recollection, scholarly interpretation or design inference;
- editorial state;
- uncertainty or competing account.

A whole-book citation or landing page is not enough for a precise date, “first” claim, crew membership or influence claim. Those require a page, chapter, interview segment or institutional record.

## E. Minimum source register

### New York
- Joe Austin, *Taking the Train: How Graffiti Art Became an Urban Crisis in New York City* (Columbia University Press, 2001).
- Abram Coetsee, *New York Subway Style Writing: Aesthetics, Infrastructure and Technology* (Cornell University PhD dissertation, 2022): https://ecommons.cornell.edu/bitstream/handle/1813/112907/Coetsee_cornellgrad_0058_13348.pdf?sequence=1
- Bronx Museum, “Henry Chalfant: Art vs. Transit, 1977–1987”: https://bronxmuseum.org/exhibition/henry-chalfant-art-vs-transit-1977-1987/
- Bronx County Historical Society, *An Oral History of Early Graffiti in New York City*: https://artsandculture.google.com/story/-AVhMvHuARRJQA

### Philadelphia
- Heidi Pfeiffenberger, *Style Writing. Skripturale Ästhetik zwischen Text und Bild am Beispiel von Karlsruhe und Mannheim* (KIT, 2017), historical discussion of Philadelphia: https://publikationen.bibliothek.kit.edu/1000079409/6209138
- Menika Dirkson, “The Graffiti Art Movement in Philadelphia,” Picturing Black History: https://picturingblackhistory.org/the-graffiti-art-movement-in-philadelphia/
- Tyson Mitman, *The Art of Defiance: Graffiti, Politics and the Reimagined City in Philadelphia* (Intellect, 2018): https://press.uchicago.edu/ucp/books/book/distributed/A/bo31274472.html

### Amsterdam
- Robin Vermeulen, *Graffiti in Amsterdam: De vergankelijkheid van een eigentijdse cultuur* (Reinwardt Academie, 2015): https://www.ahk.nl/media/lichtingen/docs/2015/Robin_Vermeulen_-_Graffiti_in_Amsterdam.pdf
- Dutch Graffiti Library, Punk Graffiti Archives (specialist archive/project; retain its own editorial perspective).

### Paris / France
- Ville de Paris / Plaine Commune, *Petite histoire du street art* (2021): https://cdn.paris.fr/paris/2022/01/06/c77b856c573321ba59dc5b402eb98c97.pdf
- David Fieni, scholarship on French graffiti and hip-hop circulation; consult full chapter before detailed claims.
- Elizabeth Sage, “Jaytalking in Fin-de-Siècle Paris,” *Journal of Social History* 49(4), 2016: https://doi.org/10.1093/jsh/shv088 — context for earlier public writing, not a history of 1980s hip-hop graffiti.

### São Paulo
- Alexandre Barbosa Pereira, “Escrita urbana: a pixação paulistana,” *Cadernos de Campo* 13(13), 2005: https://doi.org/10.11606/issn.2316-9133.v13i13p125-128
- Alexandre Barbosa Pereira, “Cidade de riscos,” *Revista de Antropologia* 56(1), 2013: https://doi.org/10.11606/2179-0892.ra.2013.64462
- “Inscrição e circulação: novas visibilidades e configurações do espaço público em São Paulo,” *Novos Estudos CEBRAP*: https://www.scielo.br/j/nec/a/CntcCWDqwGFNFFqLYTYvMRG/?lang=pt
- Christina Queiroz, “Entre transgressão e arte,” Pesquisa FAPESP, 2023: https://revistapesquisa.fapesp.br/entre-transgressao-e-arte/

### Women and underdocumented participants
- Jessica Nydia Pabón-Colón, *Graffiti Grrlz: Performing Feminism in the Hip Hop Diaspora* (NYU Press, 2018): https://nyupress.org/9781479895939/graffiti-grrlz/
- Jennifer Kreizman, “Pure Expression: Lady Pink and the Evolution of Street Art,” *NEA Arts* 2 (2013): https://www.arts.gov/sites/default/files/nea_arts/neaARTS_2013_v2.pdf
- Alexandra Henry, *Street Heroines* (2021): https://www.streetheroinesfilm.com/synopsis-streetheroines/ — distinguish graffiti writing from broader street art.

### Blackbooks and documentation
- Janice Rahn, *Painting Without Permission: An Ethnographic Study of Hip-Hop Graffiti Culture* (1999).
- Getty Research Institute, “LA Liber Amicorum”: https://www.getty.edu/research/special_collections/notable/la_liber_amicorum/index.html
- Museum of the City of New York, “Above Ground: Art from the Martin Wong Graffiti Collection”: https://www.mcny.org/exhibition/above-ground-art-martin-wong-graffiti-collection

## F. Open research gaps before public approval

1. Verify exact pages for early Philadelphia writers and the “Broadway Elegant” influence claim; do not convert the KIT discussion into unqualified causation.
2. Expand Amsterdam beyond one thesis and one archive project before adding individual writer biographies.
3. Use the Paris municipal PDF for a bounded overview; obtain first-person accounts and scene-specific scholarship before naming crews or writers.
4. Expand São Paulo with practitioner voices and local scholarship; preserve distinctions among graffiti, pichação and pixação.
5. Audit women writer profiles beyond Lady Pink. Do not create biographies for Barbara 62, Eva 62 or Stoney from passing mentions alone.
6. Add Germany/Ruhrgebiet entries only where local dossiers support publishable claims with named sources and bounded periods.
7. Verify item-level creator, source, date, rights holder and reuse permission for every visual record. Reference-only is the default.
8. Verify editor capability IDs against the live codebase. This editorial plan does not authorize fictional generator links.

## G. Claude handoff and publication gates

- This is the 30-entry editorial plan, not a replacement for the research dossiers.
- Convert only entries with sufficient source support into publishable copy. If an entry fails review, replace it with a better-supported topic or request owner approval to ship fewer than 25. Never pad with weak claims.
- Keep source and claim records normalized; do not paste bibliographies into every entry as unstructured text.
- Generate archive data deterministically from research Markdown plus structured metadata. Do not maintain a second manually edited content database.
- Preserve independent evidence, editorial and image-rights states.
- Use original diagrams where licensed imagery is unavailable.
- Keep external image links as references; do not download or bundle assets without rights clearance.
- Report entry counts by type, region and review state, plus every blocked or omitted record.

**Pilot success criterion:** A reader can follow the emergence and circulation of modern writing, understand key practices and visual distinctions, compare genuinely different regional scenes, and inspect how the archive knows what it claims — without being told that one city, one style or a handful of famous writers explains the whole culture.
