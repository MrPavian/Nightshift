# Blackbook Archive — entry sources

This folder is the editorial source of THE BLACKBOOK ARCHIVE. Each edition language has its own folder: `de/` is the current, complete German edition, and `en/` is planned after C07. `npm run archive:build` turns a language folder, together with the shared source registers and claim ledgers in `research/`, into `data/archive/archive.v1.<lang>.json`. The archive UI (`archive/`) shows only that generated file. Never edit the JSON by hand; CI checks it is up to date (`npm run archive:check`).

## Files

- `de/entries/<id>.md` — one entry per file. The ID is `<type>.<slug>`, for example `scene.sao-paulo`. IDs are language-neutral and must be identical in every edition.
- `de/TIMELINE.md` — timeline events. Each one points to an entry and to entry claim IDs (`entry.id#c1`), and carries no claims of its own.
- `de/LEARNING_PATHS.md` — guided paths. Each step is an entry plus one framing line.

## Entry format

```
---
id: practice.tag
type: practice            # history, event, scene, practice, style, composition, format, technique, person, crew, media, object, construction, concept
aliases: tag; tagging      # search terms, practitioner words, other spellings
related: practice.handstyle; …   # at least one; every ID must exist
regions: New York City     # optional
period: 1960s – present    # optional
sort: 1970                 # optional, for ordering
editorialStatus: source-checked   # draft | source-checked | editorial-reviewed | approved-for-archive | superseded
evidence: good             # strong | good | contextual | unverified-lead
imageRights: none          # none | original-diagram | … (must be original-diagram when diagrams are listed)
diagrams: diagram.writing-forms   # optional; IDs from src/archive/diagrams.js
generator: study.word-layout word=ABRA   # optional; capability IDs from src/bridge/editor-bridge.js
---

# Titel

> Zusammenfassung in einem Satz.

## Einführung              (required)
## Warum es wichtig ist
## Woran man es erkennt
## Kontext und Entwicklung
## Begriffe und Varianten
## Nicht zu verwechseln mit (list: "- **Label** (→ entry.id) — text")
## Zur Quellenlage
## In NIGHTSHIFT
## Belege                   (required table)

(English edition: Introduction, Why it matters, How to recognize it, Context and development, Terminology and variants, Not the same as, Evidence notes, In NIGHTSHIFT, Claims.)

| id | kind | evidence | sources | claim |
|---|---|---|---|---|
| c1 | scholarly-interpretation | strong | NYC_MODERN_WRITING_EMERGENCE_CLAIM_LEDGER_01#S1 | … |
```

- Cite claims inline with `[c1]`, and link entries with `[[entry.id|label]]`.
- **Claim registers:** cite a row of the central claim/source matrix or of an audited dossier register as `matrix:ID` (e.g. `matrix:AER-02`, `matrix:DOR-04`). The register stays the authority: its main source, A–D strength, limitation and status are shown with the claim, and a D-graded row cannot back a published entry. Registered files: `CLAIM_REGISTERS` in `src/archive/build.js`.
- **Ledger claims** (`NYC-005`) are never cited inline, because their text is English. Write the claim in the edition's language and put the ledger ID in the sources column (`| c6 | scholarly-interpretation | good | NYC-005 | … |`); the build takes the sources from the ledger and shows the ledger reference in the claim sheet.
- A source is `FILEKEY#localId` from a source list in `research/`, for example `GLOBAL_CIRCULATION_REGIONAL_CASE_STUDIES_01#S6` or `GERMAN_GRAFFITI_HISTORY_RUHRGEBIET_01#DE-03`.
- `doc:research/FILE.md` is allowed **only** for `editorial-synthesis` or `nightshift-design-inference` claims.
- Claim kinds: `documented-fact`, `institutional-account`, `practitioner-account`, `scholarly-interpretation`, `editorial-synthesis`, `nightshift-design-inference`.

## The build rejects

- unsourced claims and unknown sources;
- dead links and unreachable entries;
- unverified leads in published entries;
- placeholders (TODO, TBD, lorem…);
- unknown sections, statuses or diagrams;
- unknown editor capabilities, and parameters the editor cannot open;
- invalid timeline events and paths.

## Relationship to the pilot drafts

`research/BLACKBOOK_ARCHIVE_CONTENT_PILOT_01.md`, `…_EXPANSION_01.md` and the German pilots were drafting material. Their content was re-checked at source level for this edition. Where a pilot said more than its sources support, the entry here says less. The pilots stay as research history and are not read by the build.

## Editorial rules (summary)

- Modern New York writing is one chapter, not the origin of all graffiti. International scenes are told with their own chronology and terms, never as copies.
- Women and underdocumented participants belong in the main chronology. They are not kept in a sidebar.
- Evidence, editorial status and image rights are independent of one another.
- No embedded third-party images; original diagrams only.
- No people or crew presets, and no signature cloning.
