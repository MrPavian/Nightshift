# THE BLACKBOOK ARCHIVE — Global Editorial Framework 01

**Purpose:** turn NIGHTSHIFT's accumulated research into one coherent, navigable, source-backed graffiti knowledge archive.  
**Editorial source of truth:** `research/`.  
**Product surface:** THE BLACKBOOK ARCHIVE.  
**Implementation owner:** Claude, according to the finite release sequence.  
**Research, specification and independent QA:** ChatGPT.  
**Creative approval:** project owner.

## 1. Editorial promise

The Archive is a visual, interactive introduction to graffiti writing and its wider cultural field. It should let a newcomer understand the basics, let an experienced reader follow historical and stylistic detail, and let a generator user connect cultural knowledge to actual letter construction.

It is not:
- a flat glossary;
- a scraped image gallery;
- a list of famous names;
- a single universal timeline that treats every city as following New York in the same way;
- a claim to document every writer, crew, city or local tradition worldwide.

The Archive tells a connected but non-linear story: modern hip-hop writing developed in a specific New York context; it circulated through media, travel, music, photography and local networks; scenes elsewhere adapted it and developed distinct practices; contemporary graffiti and related public visual cultures are diverse and globally connected.

## 2. The main narrative arc

### Chapter A — Before and around the emergence
Explain the wider history of public inscription and urban marking without falsely claiming that all graffiti began in New York. Distinguish older forms of inscription, political writing, gang marks, mural traditions and modern name-centred hip-hop writing.

### Chapter B — New York: the emergence of modern hip-hop writing
Cover the early 1970s and the emergence of name-centred writing, borough and neighborhood contexts, transit and city space, writers and crews, handstyles, tags, throw-ups, pieces, blackbooks, photography, media and the changing subway environment. Keep dates and origin stories tied to specific sources; preserve competing recollections.

### Chapter C — From local practice to wider circulation
Explain how writing travelled through photography, magazines, books, video, music, exhibitions, visits, migration and personal networks. Show that circulation was not a one-way export: local scenes adapted, rejected, hybridized and transformed what they encountered.

### Chapter D — European and other regional developments
Build comparative scene chapters, not one generic “international style”:
- Europe: UK, France, Netherlands, Germany/Ruhrgebiet, Switzerland, Italy, Spain and other scenes when evidence supports them.
- North and South America: US cities beyond NYC, Canada, Mexico, Brazil, Argentina and other documented scenes.
- Africa: begin with well-sourced regional histories such as South Africa; do not use a continent-wide generalization.
- Asia: Japan, China/Hong Kong, South Korea and other scenes where local sources and practitioners are available.
- Oceania: Australia and Aotearoa/New Zealand, with local histories and terminology.
- Additional regions are discovery areas, not assumed coverage.

Every regional chapter must identify its own chronology, actors, terminology, local conditions, media channels and relationships with other scenes. Do not make NYC the sole yardstick for authenticity or quality.

### Chapter E — Styles, practices and visual language
Explain tags/handstyles, throw-ups, pieces, straight letters, bubble forms, blockbuster, wildstyle, 3D, characters, murals, stencils, stickers, paste-ups and related forms using the multi-axis taxonomy. Distinguish practice, letterform grammar, composition, format/surface, technique/material and context.

### Chapter F — Contemporary graffiti and adjacent cultures
Cover current writing culture, legal and illegal contexts as historical/social subjects, mural and street-art intersections, digital media, blackbooks and online communities, festivals, institutional recognition, preservation, commercialization, debates about public space and the changing role of trains and walls. Avoid treating “street art” as a synonym for graffiti writing.

## 3. The archive's content architecture

The primary navigation should make the knowledge approachable:
1. Discover — curated introductions and editorial paths.
2. Timeline — dated events and developments with uncertainty markers.
3. Places & Scenes — regional chapters and local scene maps.
4. Styles & Lettering — visual grammars, construction and comparison.
5. Practices & Formats — writing practices, pieces, panels, wholecars and other formats.
6. Tools & Techniques — materials and visual execution, without unnecessary hazardous operational instruction.
7. People & Crews — contextual, sourced records, never a popularity ranking.
8. Glossary — definitions, aliases and regional/period variants.
9. Visual Archive — objects and images with provenance and rights state.
10. Learn / Blackbook Lab — guided learning paths and original diagrams.

Search must work across all content types and aliases. A record can appear in several views through facets and relations without being duplicated.

## 4. How the existing research becomes a professional database

Use a single editorial pipeline:

1. **Research dossier** — broad source gathering and analysis in `research/`.
2. **Claim ledger** — atomic historical claims, each tied to exact source passages, source type, date, geography and confidence.
3. **Editorial entry** — readable article built from checked claims; separate fact, practitioner recollection, scholarly interpretation and NIGHTSHIFT design inference.
4. **Structured record** — stable ID, type, aliases, facets, chronology, places, relations, source IDs, evidence state, editorial state and rights metadata.
5. **Generated archive data** — deterministic JSON export from the editorial source; never maintain a second manually edited database.
6. **Rendered experience** — search, filters, timeline, maps/scene links, comparison, diagrams and learning paths.
7. **Review and correction** — version history, superseded claims, corrections and review state.

A research dossier is not automatically publishable. A claim must be verified at source level before being presented as settled fact. Research files remain rich working documents; archive entries are edited for clarity and reading flow.

## 5. Standard entry experience

Every public entry should provide, where relevant:
- clear title and aliases;
- one-sentence summary and short introduction;
- “why it matters”;
- date range and place/scene;
- visual identification or original explanatory diagram;
- historical context and development;
- local terminology and variants;
- “not the same as” distinctions;
- linked people, crews, places, events, styles and practices;
- a short source list and expandable evidence notes;
- image provenance and rights status;
- optional “Explore next” links;
- generator connection only when a matching capability exists.

Use progressive disclosure: a concise readable opening, then deeper material. Avoid walls of text, unstructured source dumps and decorative clutter.

## 6. Visual and interaction direction

The interface should feel like a premium digital blackbook and research archive:
- strong editorial typography and clear hierarchy;
- paper, index-card, contact-sheet and archive-label references used with restraint;
- large, carefully captioned visuals where rights allow;
- original diagrams for letter anatomy, style comparison and historical explanation;
- interactive timelines and regional scene maps;
- linked cards and relationship paths;
- visible filters, breadcrumbs and reading progress;
- fast global search and alias matching;
- responsive desktop/tablet/mobile layout;
- high contrast and accessible keyboard navigation.

Do not use fake grunge as a substitute for art direction. The archive must look curated, not like a database admin panel.

## 7. Evidence, rights and editorial safeguards

- Every factual historical statement has a traceable source.
- Record whether a claim is a documented fact, practitioner account, scholarly interpretation or design inference.
- Record disagreements and date ranges rather than manufacturing false precision.
- Distinguish event date, artwork creation date, photo capture date, publication date and archive ingestion date.
- Do not infer identity from pseudonyms or collapse aliases.
- Do not copy identifiable signatures or individual works into generator presets.
- External images remain link-only until item-level rights and intended use are cleared.
- Evidence quality, editorial approval and image rights are three independent states.
- “Global” means deliberate, comparative regional coverage, not a claim of exhaustive representation.

## 8. Scope and release strategy

The first archive release should be a coherent, excellent introduction rather than a shallow attempt to cover the entire planet. It should include:
- a substantial and carefully sourced New York foundation;
- a clear explanation of global circulation and adaptation;
- a representative set of contrasting regional scenes with distinct local histories;
- foundational glossary, style, practice, format and technique entries;
- a timeline and at least two complete learning paths;
- selected people/crew entries only where the evidence is strong;
- original diagrams and only cleared visual assets.

The existing 25–35 entry target is a curated launch edition, not a ceiling on the long-term archive. Regional breadth should be achieved through a few well-researched comparative chapters, not token entries for every country. Expand only when the source base supports meaningful content.

## 9. Acceptance criteria

The archive is not ready merely because a search box and category cards exist. Acceptance requires:
- all content types use stable IDs and validated references;
- claims, sources, evidence states and rights are separately represented;
- at least two complete learning paths work end-to-end;
- the New York origin/development story is readable and sourced;
- at least several contrasting international scenes are represented without flattening their differences;
- timeline and scene navigation are usable;
- search finds aliases and related terminology;
- entries link to one another without dead ends;
- original visual explanations are clear and consistent;
- no placeholder content or unverified historical claims are published;
- content is generated from the research source of truth;
- the UI is visually coherent, responsive and accessible.

## 10. Research backlog implied by this framework

Maintain a finite prioritized backlog:
1. Consolidate the New York history into a source-checked chronological spine.
2. Finish the existing NYC, Ruhrgebiet, Heidelberg and national comparison dossiers into publishable claims.
3. Build a regional comparison matrix with explicit coverage and evidence gaps.
4. Select a small number of non-European scenes for deep, source-led comparison.
5. Create claim-level citations and source records for launch entries.
6. Create original diagrams and visual teaching assets.
7. Convert approved content through the versioned pipeline and validate it.

Do not start a new city dossier merely because it is interesting. It must fill a named gap in the global story or support a launch entry.

## 11. Relationship to the 1.0 roadmap

This framework refines the existing BLACKBOOK ARCHIVE scope; it does not reorder the binding NIGHTSHIFT 1.0 implementation sequence. Claude implements the archive through the existing TBA/C06 packages after their dependencies are met. Research and editorial preparation continue in parallel. The project owner retains final visual and editorial approval.
