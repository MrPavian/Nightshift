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

## 7. Expanded national research lanes — Berlin, East Germany, Hamburg, Stuttgart, Munich and MA'CLAIM

The national comparison layer is now an explicit workstream, not a small appendix to the Ruhrgebiet pilot.

### Berlin and East Germany: two histories that must not be collapsed

Research Berlin in at least three distinct layers:
- West Berlin's 1970s/1980s wall, political murals, early tags, crews and the arrival of US-influenced hip-hop writing.
- East Berlin and the GDR: political inscriptions, youth subcultures, restricted access to spray cans and public surfaces, improvised media, surveillance and removal.
- The post-1989 transition: access to spray paint and new surfaces, the former border strip, the East Side Gallery and rapid scene expansion.

Then extend beyond Berlin to Leipzig and other East German cities. Do not treat "East German graffiti" as one uniform style or assume that pre-1989 political wall writing is equivalent to hip-hop name-writing. The 2024 study of MfS photographic records in Leipzig (1980–1989) is a particularly valuable archival route into the distinction between visible dissent, state documentation and the later writing scene.

### Munich and Stuttgart: southern German comparison

Munich deserves a dedicated early-history lane. Published scholarship describes it as one of the earliest and largest German writing scenes, alongside Dortmund, and notes early exchange with Berlin from 1986. Track local writers, crews, train culture, magazines, jams, municipal policy and the evolution from name-writing to broader mural and urban-art practices.

Stuttgart is a required independent case, not a proxy for "southern Germany". Build its chronology from local first-person accounts, archives, publications, train/yard histories and documented walls. Compare it with Munich and the Rhine-Neckar region without assuming the same chronology or stylistic vocabulary.

### Hamburg: northern German scene

Hamburg is a distinct national research lane. Establish its chronology through local writers' accounts, early hip-hop networks, crew histories, train writing, publications and preserved photographic material. Do not infer Hamburg's development from Berlin or general northern-German summaries. Separate classic writing culture from later commissioned mural and street-art activity.

### MA'CLAIM / Maclaim: a dedicated visual-language study

MA'CLAIM is important to NIGHTSHIFT because it demonstrates a major expansion of graffiti practice beyond conventional letter-centred writing. Research its formation, members and working methods through first-person sources and documented works. The crew emerged around 2000; its members developed a distinctive photorealistic, character-led approach often described as "Graffoto". First-person accounts describe the early character-crew intention and the use of computer planning for complex wall production.

For the editor, study this as a separate visual system:
- photographic reference and image-to-wall translation;
- value grouping, tonal range, edge control and depth;
- anatomy, gesture, overlap and foreshortening;
- aerosol handling, masking, layering and scale management;
- composition across monumental wall surfaces;
- digital previsualisation and production planning.

Do not turn identifiable MA'CLAIM works, CASE's hands, or any member's signature imagery into a cloneable preset. Extract general, non-attributive production principles and original exercises. Keep photorealistic/character workflows distinct from the semantic letter-construction engine, while allowing them to coexist in a wider blackbook/editor workspace.

### Research protocol for every city and scene

For Berlin, Hamburg, Munich, Stuttgart, Leipzig and further East German cities, use the same evidence ledger:
1. dated first-person testimony and interviews;
2. contemporary photographs, blackbooks, zines, books and magazines;
3. museum, archive and institutional records;
4. peer-reviewed research and documented local histories;
5. clearly labelled visual analysis and engineering hypotheses.

Record date, place, creator/source, medium, rights, scene context and confidence. Distinguish a writer's recollection from independently corroborated chronology. A city is not "covered" merely because a few famous murals are documented.

## 8. Additional source leads

- AdJ / Pop- und Subkulturarchiv, Graffiti overview and archival holdings: https://popundsub.jugendkulturen.de/graffiti.html
- East Side Gallery exhibition, oral-history material on writing and the Wall: https://www.eastsidegalleryausstellung.de/themen/und-auf-der-rueckseite/graffiti-und-writings-an-der-east-side-gallery/
- Anke Schwarz (2024), "Capturing dissent: forensic photography of graffiti in the late German Democratic Republic", Leipzig 1980–1989: https://doi.org/10.1080/21622671.2024.2419367
- KIT publication, "Style Writing. Skripturale Ästhetik zwischen Text und Bild am Beispiel von Karlsruhe und Mannheim" (historical comparison including Munich, Dortmund, Berlin and Hamburg): https://publikationen.bibliothek.kit.edu/1000079409/6209138
- Case / MA'CLAIM profile and crew context: https://www.stadt-wand-kunst.de/case-maclaim/
- AKUT's first-person account of MA'CLAIM formation and digital planning: https://www.akut1.com/painting/maclaim/
- Case interview, first-person account of crew formation and character focus: https://newurbanera.org/portfolio-items/interview-with-case-mclain/

**Scope update:** national research now explicitly includes Berlin, East Germany, Hamburg, Munich, Stuttgart and MA'CLAIM. Their INGRID corpus status must still be verified city by city; cultural/historical importance does not imply a particular database holding.


## 9. Heidelberg — southern German writing-history anchor

Heidelberg is promoted to a dedicated research case, not merely another city in the national discovery queue.

Why it matters:
- Heidelberg's hip-hop culture has been practised since the 1980s and was added to Germany's nationwide inventory of intangible cultural heritage in 2023. The official description explicitly includes graffiti alongside rap, DJing, beatboxing, cyphers, jams and breakdance.
- Local and scholarly histories identify an influential early writing scene. A KIT study describes Heidelberg as a comparatively small scene whose city-specific style was known in writer circles and whose influence was discussed in nearby Mannheim and Karlsruhe.
- The same study identifies train writing and motorway walls as important local fields of practice, and discusses a distinct local scene ethos. Treat these as attributed findings from that study, not timeless facts about every Heidelberg writer.
- The first sprayed Heidelberg train is a documented local-history research lead. The Freies Hip-Hop Institut and Heidelberg University hosted a 2024 event on graffiti and street art in Heidelberg from 1960–2000, including archival material and eyewitness accounts.
- Heidelberg's city archive is developing a Hip-Hop archive from a substantial Torch collection: around 5,000 objects including photographs, records, posters, flyers, magazines, drawings and material relating to early graffiti trains. This is a particularly valuable primary-source route; access, cataloguing status and reproduction rights must be checked before use.

Research tasks:
1. Build a chronology from early local wall writing and pre-hip-hop street inscriptions through the 1980s writing scene, the 1990s/early-2000s high phase and contemporary practice.
2. Identify first-hand accounts and archive records for King Kane / KANE, Torch, local crews and the first sprayed train; verify names, dates and attributions before publication.
3. Compare Heidelberg with Mannheim and Karlsruhe as a connected regional field, while retaining each city's own chronology and style.
4. Study panels, train writing, motorway walls, wildstyle construction, local handstyles and the relation between writing, rap, DJing and breakdance.
5. Separate classic writing from later commissioned mural and street-art work; document legal walls and current community practice as a different period/context.
6. Contact or investigate the Freies Hip-Hop Institut, Hip Hop Heidelberg e.V., Heidelberg City Archive and relevant university researchers for oral histories, blackbooks, photographs and source permissions.

Editor relevance:
- Heidelberg is a valuable case for studying how a relatively small scene can exert influence beyond its city.
- Its writing history can inform letter complexity, interlocking wildstyle structures, train-panel composition and the relationship between local style identity and cross-city exchange.
- Do not reproduce a named writer's signature style. Extract general principles from multiple documented examples and construct original letter exercises.

INGRID status:
- Heidelberg is **not** currently promoted to confirmed INGRID corpus coverage by the evidence in this scope. Add it to the city-resource discovery queue and only upgrade its database status after a live graph query or authoritative corpus statement confirms records.

Additional sources:
- German UNESCO Commission, "Hip-Hop-Kultur in Heidelberg und ihre Vernetzung in Deutschland": https://www.unesco.de/staette/hip-hop-kultur-in-heidelberg-und-ihre-vernetzung-in-deutschland/
- KIT study, "Style Writing. Skripturale Ästhetik zwischen Text und Bild am Beispiel von Karlsruhe und Mannheim" (includes Heidelberg discussion): https://publikationen.bibliothek.kit.edu/1000079409/6209138
- Heidelberg City Archive / Torch archive materials: https://www.heidelberg.de/hd,Lds/HD/Rathaus/herzstueck+des+hip-hop-archivs.html
- Freies Hip-Hop Institut, event on graffiti and street art in Heidelberg 1960–2000: https://www.freieshiphopinstitut.de/events/
- Hip Hop Heidelberg e.V., local scene and projects: https://www.hiphopheidelberg.de/
- Heidelberg University, exhibition "The Early Days. Hip-Hop in the GDR" (comparative historical context): https://www.uni-heidelberg.de/presse/news2013/pm20130308_hiphop_en.html


## 9. Witten — priority hip-hop-history node, separate from INGRID coverage

Witten is elevated from a generic Ruhrgebiet discovery target to a priority **cultural-history** node because of the Bunkerwelt and its role in the local 1990s hip-hop network. Research the Bunkerwelt as scene infrastructure (venue, rehearsal / recording context, parties, jams, peer exchange and regional networks) alongside a separate chronology of Witten graffiti writing.

This is not a change to INGRID evidence status: Witten remains an unconfirmed corpus location until a live graph query or authoritative corpus statement establishes records. Nor should the Bunkerwelt's rap / music network automatically be treated as a list of graffiti writers or as evidence for a distinct Witten lettering style.

Sources and leads:
- *Mapping Hip Hop Culture in the Ruhr Area*, Bunkerwelt history and DIKE account: https://hiphopruhr.wordpress.com/2016/08/24/witten-hip-hop-und-der-bunker-die-geburtsstatte-der-lokalen-hip-hop-szene/
- 2026 local-history talk announcement with historian Dr. Thomas Throckmorton: https://trotzallem.noblogs.org/
- WERK°STADT / Kulturforum Witten, 2021 *Bring the Beat Back* documentation: https://www.kulturforum-witten.de/media/pdf/Kultursommer_Witten_2021_Dokumentation_digital.pdf
- UrbanArtWitten legal surfaces and Crengeldanz Hall of Fame: https://www.urbanartwitten.com/freifl%C3%A4chen/

Research priority: seek contemporary 1990s flyers, jam photographs, local press, recordings and first-person interviews; then identify which connections specifically involved graffiti writing rather than the wider hip-hop scene.
