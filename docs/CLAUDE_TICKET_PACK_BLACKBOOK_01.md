# THE BLACKBOOK ARCHIVE — Claude Ticket Pack 0.1–0.3

**Status:** Handoff specification; no archive UI or content pipeline implementation claimed.  
**Prerequisite:** Read `docs/BLACKBOOK_ARCHIVE_ROADMAP.md`, `docs/BLACKBOOK_ARCHIVE_MASTERPROMPT.md`, `docs/BLACKBOOK_ARCHIVE_INFORMATION_ARCHITECTURE_01.md` and `research/BLACKBOOK_ARCHIVE_CONTENT_PILOT_01.md`.

## TBA-01 — Content schema and source pipeline
- Define versioned schema for entry, alias, source, evidence claim, image reference, rights state, relation and generator capability.
- Markdown research remains editorial source of truth.
- Validate stable IDs, required fields, link targets, statuses and rights metadata.
- Export deterministic ingame JSON without maintaining a duplicate editorial database.

**Acceptance:** five or more pilot entries validate; source and image rights states remain separate; unresolved claims do not become approved facts.

## TBA-02 — Search and navigation prototype
- Build search-first archive home, categories, filters, entry detail and related-entry navigation.
- Search aliases and alternate terms.
- Add back/breadcrumb navigation and keyboard/controller accessibility.
- Use real pilot content, not placeholder lorem ipsum.

**Acceptance:** a user can find an entry, understand it, follow a related link and return without a navigation dead end.

## TBA-03 — Visual learning prototype
- Add timeline and style/format comparison using only reviewed content.
- Add original construction diagrams and negative-space labels.
- Keep rights/provenance labels visible.
- Separate blind visual assets from source/citation navigation where needed.

**Acceptance:** two complete learning paths work end-to-end; no unlicensed external image is embedded.

## TBA-04 — Generator bridge
- Use stable capability IDs to open an available read-only or editable study.
- Link archive entries to actual supported glyph/grammar/relationship functions.
- Preserve provenance and return navigation.
- Do not create person/crew presets or copy individual signatures.

**Acceptance:** at least three bidirectional links point to implemented capabilities; unsupported actions remain disabled with clear explanation.

## TBA-05 — Ingame integration
- Add archive access from game menu/blackbook.
- Save recent entries and optional favorites.
- Implement local/offline behavior according to actual app architecture.
- Test keyboard/controller use, responsive layout and performance.

**Acceptance:** content loads from the versioned local dataset, navigation and search work offline for packaged content, and no critical accessibility/navigation failures remain.
