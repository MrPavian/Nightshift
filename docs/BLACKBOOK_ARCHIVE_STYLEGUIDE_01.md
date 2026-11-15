# THE BLACKBOOK ARCHIVE — Visual & Interaction Styleguide 01

**Status:** Binding design specification for the first BLACKBOOK ARCHIVE release.  
**Scope:** Visual language, information hierarchy, navigation, interaction, responsive behavior, accessibility, timeline, visual learning and content presentation.  
**Product principle:** A premium digital blackbook and research archive — not a wiki skin, admin dashboard or faux-grunge scrapbook.

## 1. Product character

The archive should feel like opening a carefully curated writer's blackbook inside a modern research studio. It combines:
- the intimacy and tactility of a blackbook;
- the clarity of a well-designed editorial publication;
- the discoverability of a museum collection;
- the connectedness of a knowledge graph;
- the immediacy of an in-game reference tool.

The interface must communicate cultural depth without pretending to be an authority where sources are uncertain. The design should feel confident, restrained, curious and human.

**Design test:** within ten seconds, a first-time user understands where to start; within thirty seconds, they can find a term and understand its basic meaning; within two minutes, they can follow a meaningful connection to another entry.

## 2. Visual system

### 2.1 Art direction
- Dark ink / charcoal environment with warm paper surfaces as the primary reading canvas.
- Use one restrained accent colour for active navigation and interaction, plus a secondary annotation colour. Do not make every category a different bright colour.
- Paper grain, registration marks, ruled lines, index tabs, tape edges and pencil annotations may appear as subtle details. They must never reduce contrast or compete with text.
- Use real editorial whitespace. Do not fill every empty area with graffiti textures, tags, spray splatter or distressed effects.
- Use original NIGHTSHIFT lettering/diagrams for visual explanation. Never imitate a named writer's handstyle or reproduce a recognizable protected work.
- Use a consistent icon family and simple geometric category markers. Icons supplement labels; they do not replace them.

### 2.2 Typography
- Display face: expressive condensed or grotesk display family for section titles and large entry headings.
- Reading face: highly legible sans-serif with comfortable x-height for all long-form copy.
- Metadata face: monospaced or tabular face for dates, IDs, source labels and archive references.
- Use no more than three type families and a small, consistent scale.
- Body text should be comfortable at 16–18 CSS px on desktop, never below 15 px on mobile.
- Keep line length around 55–80 characters for long-form reading.
- Avoid all-caps paragraphs. Reserve uppercase for short labels, section markers and archive codes.

### 2.3 Layout and surfaces
- Desktop: editorial two-column entry layout — main reading column plus a stable contextual rail for metadata, contents, related entries and sources.
- Tablet: one main column with collapsible contextual panels; timeline and visual comparisons remain usable.
- Mobile: single-column reading; filters/search open as focused sheets or drawers; no tiny multi-column cards.
- Use a consistent spacing scale and a clear grid. Cards should align and have predictable content density.
- Use a limited set of surface treatments: paper sheet, dark index panel, outlined archive card, image/diagram plate.
- Never put long prose inside dense cards. Cards are for discovery and summaries; full reading happens on an entry page.

## 3. Information architecture and global navigation

Persistent primary navigation:
1. **Discover** — curated routes, featured themes and recent additions.
2. **Timeline** — historical periods and dated events.
3. **Scenes** — places, local histories and regional comparisons.
4. **Styles & Letters** — lettering grammars, composition and anatomy.
5. **Practices & Formats** — writing practices, artwork forms and surfaces.
6. **Tools & Materials** — techniques, media and execution context.
7. **People & Crews** — contextual historical records, never rankings.
8. **Glossary** — fast definitions, aliases and local variants.
9. **Visual Archive** — objects, publications and images with provenance.

Global search is always available. On narrow screens, primary navigation collapses into a labelled menu but search remains one tap away. The user must always know which section they are in.

Every page provides:
- current section label;
- clear page title and concise orientation sentence;
- breadcrumb or visible back path;
- relevant next steps;
- no dead-end states.

## 4. Discover / archive home

The home screen is a curated starting point, not a dashboard full of metrics.

Recommended order:
1. Hero statement: what the archive is and how to explore it.
2. Prominent global search.
3. Three to five editorial learning routes.
4. Timeline preview with a clear “Explore timeline” action.
5. Scene/region entry points.
6. Featured styles, practices and visual explanations.
7. Recently added / updated entries with editorial status visible where relevant.

Do not overload the first screen with 30 equal-weight tiles. Give users a few meaningful starting choices and then expose the full taxonomy.

## 5. Search, filters and result behavior

### Search
- Search title, aliases, alternate spellings, local terms, glossary terms, summaries and related concepts.
- Show useful results while typing; support keyboard submission and clear query removal.
- Rank exact title/alias matches above broad full-text matches.
- Highlight why a result matched (title, alias, region, term).
- Search results show type, short definition, place/period and editorial availability.
- Empty state suggests spelling variants, related terms or clearing filters; it must not look like an error.

### Filters
- Filters are facets, not mutually exclusive categories: content type, region/place, period, practice, letterform grammar, composition, format/surface, technique and evidence/editorial state.
- Show active filters as removable chips and provide “clear all”.
- Preserve search query and scroll position when returning from an entry.
- Never hide uncertainty or publication status behind a filter-only interaction.

### Results
- Use a readable list or editorial card grid depending on context.
- Every result has one primary type and optional secondary facets.
- No infinite scroll as the only way to browse; use pagination or “load more” with a visible result count.

## 6. Standard entry page

Every entry uses the same recognizable structure, with optional sections hidden when genuinely irrelevant.

1. **Identity header:** title, aliases, primary type, concise definition.
2. **Quick facts:** period/date range, place/scene, related facets and editorial status.
3. **Visual anchor:** original diagram or rights-cleared image with caption, creator/source, date confidence and rights state. If none is cleared, show a purposeful original diagram or a neutral “no cleared image” state — never a broken-image placeholder.
4. **Why it matters:** a short paragraph connecting the subject to the wider culture.
5. **Main reading:** short sections with descriptive subheadings, not one uninterrupted wall of text.
6. **Recognize / understand:** observable characteristics, context and caveats.
7. **Not the same as:** distinctions from commonly confused terms.
8. **Local and historical variants:** terminology and differences by time/place, with attribution.
9. **Timeline placement:** related events/periods and date confidence.
10. **Related entries:** curated, typed links explaining the relationship.
11. **Sources & evidence:** expandable claim-level source notes, source type and evidence state.
12. **Rights & provenance:** image/object provenance and use status, separate from evidence.
13. **Explore next:** one or two relevant learning-path actions.
14. **Generator link:** only when a matching, verified capability exists.

Progressive disclosure is mandatory: the opening should be useful in 20–40 seconds; deeper evidence should be available without overwhelming the first read.

## 7. Timeline experience

The timeline is a core exploration mode, not a decorative horizontal strip.

### Structure
- Support zoomable scales: broad eras → decades → years → individual dated events.
- On desktop, use a horizontal timeline with a synchronized detail panel or vertical chronological list. On mobile, default to a vertical timeline.
- Events are grouped into parallel regional lanes when comparison is useful. New York must not become the sole master track for all regions.
- Filters: region/scene, topic, content type and evidence state.
- Selecting an event opens a concise detail preview and links to the full entry.
- Timeline events may connect to multiple entries; entries can have date ranges or multiple date claims.

### Date integrity
- Distinguish event date, artwork creation date, photograph date, publication date and archive ingestion date.
- Support exact date, year, decade, range, approximate date and disputed date.
- Show uncertainty visually and textually; never convert an approximate date into a falsely precise dot.
- Conflicting chronologies should be represented as attributed alternatives or a qualified range.
- Undated items do not get silently sorted into a fabricated year.

### Interaction
- Keyboard-accessible previous/next event and zoom controls.
- A visible “return to full timeline” action from detail view.
- No drag-only interaction; all timeline actions need buttons or keyboard alternatives.
- Provide a plain chronological list as an accessible alternative to the visual track.

## 8. Scenes, maps and regional comparison

- Present scenes as locally grounded histories, not country flags or generic region tiles.
- A scene page should explain local chronology, terminology, actors, media channels, social/spatial context and external exchanges.
- A map is an optional orientation aid, never the only way to access scene content.
- Avoid exact pin placement for sensitive or private locations; use city/region-level geography where appropriate.
- Compare scenes using consistent prompts: emergence, local precedents, media, terminology, key spaces, networks, adaptations and evidence gaps.
- Do not frame regional histories as copies or delayed versions of New York.

## 9. Visual learning and interactive diagrams

Original explanatory diagrams are preferred over unlicensed artwork.

Required diagram families:
- letter anatomy: stem, bar, bowl, terminal, junction, counter, aperture, channel and anchor;
- construction comparison: Bubble / Straight / Block, in monochrome first;
- composition relationships: adjacency, overlap, extension, interlock and negative space;
- formats: panel, end-to-end and wholecar as surface/coverage diagrams;
- aerosol/material system: can, valve, actuator, cap, paint, movement and surface as separate variables;
- historical circulation: media, travel, publications and local adaptation.

Interaction rules:
- Every interactive diagram has a static labelled fallback.
- Hover may reveal extra detail but is never required; tap/click and keyboard must work.
- Selecting a component highlights its definition and related entries.
- Use progressive complexity: overview → labelled parts → deeper explanation.
- Never animate merely for decoration. Motion must explain sequence, relationship or change.
- Respect reduced-motion settings.
- Do not make a diagram imply a universal construction sequence where sources do not support one.

## 10. Learning paths and relationship navigation

Launch with at least three complete, curated paths:
- From name to piece.
- Read a letter.
- How writing travels and changes.

A path has: learning goal, estimated reading time, ordered steps, optional branches, progress indication and a clear finish/recommendation. Paths are editorial aids, not universal biographies or mandatory progress gates.

Related-entry links must state the relationship (e.g. “historical context”, “regional comparison”, “related format”, “contrasting grammar”), not merely say “related”. Prevent loops from feeling like navigation traps; breadcrumbs and history remain available.

## 11. Interaction, feedback and persistence

- All controls have visible labels, clear states and predictable outcomes.
- Buttons must distinguish primary, secondary and destructive actions.
- Search, filters, tabs, accordions and timeline controls must work with keyboard and touch.
- Provide visible focus, hover, pressed, selected, disabled and loading states.
- Use confirmation only for destructive or irreversible actions.
- Save reading progress, recent entries and favourites only if persistence is genuinely implemented; otherwise omit the control.
- No fake “bookmark”, “share”, “try in generator” or “download” actions.
- Offline state must be explicit. Packaged content should remain readable without a network connection; external source links may require connectivity.

## 12. Accessibility and readability

Target WCAG 2.2 AA as the release baseline:
- semantic headings and landmarks;
- sufficient text and UI contrast;
- keyboard access and visible focus;
- descriptive link labels;
- alt text for meaningful images and empty alt for decoration;
- captions and transcripts for audiovisual material;
- no information conveyed by colour alone;
- reduced-motion support;
- touch targets sized for reliable use;
- zoom/reflow without horizontal page scrolling at narrow widths;
- accessible list alternative for timeline and diagrams.

## 13. Content states and trust signals

Keep three independent state systems visible where relevant:
- **Editorial:** draft / source-checked / editorial-reviewed / approved-for-archive / superseded.
- **Evidence:** strong / good / contextual / unverified lead.
- **Rights:** link-only / unknown / permission requested / cleared with license / do-not-reuse.

A polished design must not visually imply that an unreviewed draft is approved. Drafts are excluded from the public/archive build by default. The reader can always find who/what a source is and which claim it supports.

## 14. Performance and technical behavior

- Search and navigation should feel immediate on the target hardware.
- Load large images and diagrams lazily; reserve their aspect ratio to avoid layout shifts.
- Keep the archive usable at game-window and ordinary browser sizes.
- Avoid large video backgrounds, heavy shader effects and unnecessary 3D scenes.
- Cache the versioned content bundle for offline reading; show the bundle version and last update.
- Use stable entry IDs and URL-addressable routes so deep links and back/forward navigation work.
- Preserve scroll position when navigating back to results.
- All dynamic content must have a deterministic, validated data source.

## 15. Release acceptance checklist

- [ ] A first-time reader can identify the archive's purpose and find a term quickly.
- [ ] Search supports aliases and local variants.
- [ ] Filters are understandable, removable and preserve context.
- [ ] Every published entry follows the standard template and shows its status.
- [ ] Timeline supports regional lanes, uncertainty and accessible list mode.
- [ ] Scene pages preserve local history and do not imply one-way diffusion.
- [ ] At least three learning paths work end-to-end.
- [ ] Diagrams have labels, keyboard/touch behavior and static fallbacks.
- [ ] Related links explain their relationship and have no dead ends.
- [ ] Sources, evidence and image rights are independently inspectable.
- [ ] Responsive layouts work on desktop, tablet and mobile.
- [ ] WCAG 2.2 AA checks are documented.
- [ ] No control is displayed unless its action is implemented and tested.
- [ ] No draft, unverified claim or uncleared image is silently published.

## 16. Explicit non-goals for the first release

No faux graffiti cursor, endless parallax, decorative spray animation, 3D archive room, social feed, popularity ranking, writer cloning, unlock grind, full-screen autoplay media or gamified quiz system is required for 1.0. Add such features only if they improve learning or navigation and do not compromise performance or editorial trust.
