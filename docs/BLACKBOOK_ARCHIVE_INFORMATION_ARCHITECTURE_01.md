# THE BLACKBOOK ARCHIVE — Information Architecture 01

**Status:** Product/content specification; no UI implementation claimed.  
**Editorial authority:** `research/` library.  
**Purpose:** Complete Archive Roadmap Phase A and define a small content pilot structure.

## 1. Audience and use situations

| Audience | Typical question | Preferred depth | Useful next action |
|---|---|---|---|
| New player | What is a tag, piece or throw-up? | Short definition, visual cue, one related concept | Open a beginner learning path |
| Curious player | How did New York writing develop? | Timeline, place/period context, people and media | Follow a historical thread |
| Experienced player / style enthusiast | What distinguishes a bar construction from a rounded letterform? | Structural analysis, terminology nuance, source trail | Open a generator study |
| Returning player | Where was that technique or writer I read about? | Search, aliases, history and favorites | Resume or bookmark |
| Generator user | What does this term change in my artwork? | Structural explanation and supported tool link | Open the exact editor study, if implemented |

The archive must serve short lookup and deep exploration without forcing either path.

## 2. Canonical taxonomy

The archive uses a multi-axis taxonomy. Categories are not a flat list of mutually exclusive “styles”.

### Primary entry types
- History / period
- Place / scene
- Practice / activity
- Letterform grammar / style term
- Composition grammar
- Format / surface
- Technique / material
- Person / writer
- Crew / network
- Object / visual reference
- Glossary / slang
- Letter construction / anatomy

### Orthogonal facets
- place and neighborhood;
- time period and date confidence;
- practice context;
- letterform grammar;
- composition grammar;
- format/surface;
- medium/technique;
- evidence status;
- editorial status;
- image rights status;
- generator capability status.

A single entry may have multiple facets. For example, a wholecar is a format/surface context, not a letterform grammar. Wildstyle Study is modeled as a composition/relationship grammar in NIGHTSHIFT, while historical terminology may vary by source and community.

## 3. Navigation model

### Main navigation
1. **Discover** — curated paths, new entries, featured historical threads.
2. **Timeline** — period and event navigation.
3. **Styles & Letters** — letterform and composition approaches, anatomy and construction.
4. **Practices & Formats** — writing practices, pieces, panels, wholecars and surfaces.
5. **People & Crews** — source-led records with attribution and uncertainty.
6. **Techniques & Materials** — media, tools, surface and finish context.
7. **Glossary** — search-first definitions and aliases.
8. **Visual Archive** — objects/images with provenance and rights status.

Search remains globally available. Filters refine results without hiding the entry's primary type.

### Entry detail layout
- title, aliases and entry type;
- short definition;
- “how to recognize it” visual/structural cues;
- historical/geographic context;
- variants and terminology notes;
- “not the same as” distinctions;
- linked people, places, periods and terms;
- source list and evidence status;
- visual reference with rights label;
- generator connection only if the corresponding capability exists.

## 4. Learning paths

Initial paths:
- **From name to piece:** handstyle → tagging/writing practice → lettering development → piece formats.
- **Read a letter:** skeleton → component → counter/aperture/channel → anchor → pair rhythm → word composition.
- **How styles travel:** media → visits/mobility → local scene networks → adaptation.
- **A subway piece in context:** New York transit history → train format → photography/archive → afterlives.
- **From sketchbook to generator:** blackbook practice → peer learning → structural study → editable glyph.

Paths are editorial navigation, not claims that every writer followed the same sequence.

## 5. Generator integration contract

Archive-to-generator links use stable capability IDs, not free-text labels or hardcoded UI routes.

A link may open:
- a read-only construction study;
- a glyph/component inspector;
- a supported grammar comparison;
- a pair/word relationship study;
- a surface/format preview.

Rules:
- never show an active “Try in Generator” action when the relevant capability is not implemented;
- do not turn a historical person/crew into a generator preset;
- do not reproduce identifiable signatures or specific protected artworks;
- carry source/entry IDs into the study as provenance, not as geometry to trace;
- allow return navigation to the source entry.

## 6. Visual and interaction brief

Visual direction: a digital blackbook/archive desk, with paper-like surfaces, restrained annotation marks, archival labels, and clear hierarchy. Avoid faux-grunge effects that reduce reading contrast.

Interaction:
- responsive layouts;
- keyboard and controller navigation;
- visible focus and readable type;
- no hover-only information;
- fast search with aliases;
- breadcrumb/back trail and related-entry links;
- source/rights details always reachable;
- image zoom separated from source/citation controls;
- no infinite scroll as the only navigation.

## 7. Editorial maturity and release states

Entry statuses:
- draft;
- source-checked;
- editorial-reviewed;
- approved-for-archive;
- superseded.

Evidence status is separate:
- strong;
- good;
- contextual;
- unverified lead.

Image rights status is separate:
- link-only reference;
- rights unknown;
- permission requested;
- licensed/public-domain/permission confirmed;
- do-not-reuse.

A source-checked entry can still have weak evidence for a particular claim. The UI must not collapse these statuses.

## 8. First pilot acceptance

Phase A is complete when:
1. audiences/use situations are defined;
2. taxonomy and orthogonal facets are documented;
3. main navigation and entry layout are specified;
4. generator links use capability IDs and honest availability;
5. visual/interaction brief is documented;
6. at least five example entry records from different categories exist in the content pilot;
7. source and rights metadata are separate and visible.


## 9. Global editorial direction

The archive's worldwide scope and historical narrative are specified in [Global Editorial Framework 01](BLACKBOOK_ARCHIVE_GLOBAL_EDITORIAL_FRAMEWORK_01.md). The core story begins with the emergence of modern hip-hop writing in New York, then follows its circulation, local adaptation and distinct regional developments through to contemporary global writing and related public visual cultures. It must not imply that all graffiti began in NYC or that every local scene simply copied New York. Regional chapters require their own evidence, chronology and terminology.
