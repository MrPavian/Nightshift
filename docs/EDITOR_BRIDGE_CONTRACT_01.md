# Archive ⇄ Editor Bridge Contract 01

**Version:** 1.1.0 (`BRIDGE_VERSION` in `src/bridge/editor-bridge.js`). 1.1.0 added German descriptions (`descriptionDe`) for the German archive edition.
**Package:** C06 (contract and verified links); C07 completes the final bidirectional integration.
**Status:** implemented; owner review pending.

## Purpose

THE BLACKBOOK ARCHIVE links entries to things the player can try in the editor and review tools. Under the owner-approved sequencing override (2026-11-15), C06 ships before C02–C05. The bridge therefore:

- links **only** to capabilities that exist and are verified in the current code;
- declares future capabilities as **unavailable**, with the package that will provide them, so the archive can show them honestly without simulating them;
- contains **no** editor logic. Glyph construction, styles, generation, editing, persistence and export stay in their own modules.

## One module for both sides

`src/bridge/editor-bridge.js` is imported by the archive (sender) and by `review/app.js` and `editor/editor.js` (receivers). There is no second copy of the contract.

| Export | Side | Purpose |
|---|---|---|
| `BRIDGE_VERSION` | both | semver of this contract |
| `BRIDGE_CAPABILITIES` | both | capability discovery: status, target page, parameters, labels, reason if unavailable |
| `BRIDGE_GLYPHS` | both | glyphs the current editor can open (must equal `EDITABLE` in `editor/editor.js`; tested) |
| `bridgeHref(id, params, {from, base})` | archive | builds a link, or `null` if the capability is unavailable or the parameters are invalid |
| `validateBridgeParams(id, params)` | archive build | rejects unknown capabilities, unknown or invalid parameters at build time |
| `readBridgeRequest(search, page)` | receivers | parses and validates a request; drops anything unknown |
| `mountReturnLink(document, request)` | receivers | adds “← Zurück zum Archiv-Eintrag” when the request names an archive entry |

## URL payload

```
<page>?bv=<major>&cap=<capability-id>&<params…>&<fixed…>&from=<archive-entry-id>
```

- `bv`: the contract's major version. A receiver ignores requests from an unknown major version.
- `cap`: capability ID. It must be `available` and must target the receiving page.
- Parameters are validated against the capability's schema: `glyph` must be one of `BRIDGE_GLYPHS`; `word` must be `A–Z`, at most 12 letters.
- `from`: an archive entry ID (`^[a-z]+\.[a-z0-9-]+$`). It is only used to build the return link `../archive/index.html#/entry/<id>`.

## Capabilities in 1.1.0

| ID | Status | Target | Parameters | What it opens |
|---|---|---|---|---|
| `study.glyph-anatomy` | available | review | `glyph` | Live tab, the glyph's detail, diagnostic overlay on |
| `editor.contour-node-edit` | available | editor | `glyph` | Contour editor with that glyph selected |
| `study.word-layout` | available | review | `word` | “Wort testen” tab with the word set |
| `study.proof-sheets` | available | review | — | “Prüfbögen” tab |
| `grammar.style-comparison` | unavailable | — | — | after C03 (style resolver) |
| `relationship.connection-study` | unavailable | — | — | after C04 (relationship solver) |
| `surface.format-preview` | unavailable | — | — | after C05 (blackbook editing and export) |

## Versioning rules

- **Minor bump:** add a capability, add an optional parameter, or turn an `unavailable` capability `available`.
- **Major bump:** rename or remove a capability or parameter, or change what one means.
- When a C02–C05 package implements a future capability, it sets `status: 'available'`, `page` and `params`, adds the receiver handling, and extends `tools/archive-smoke.mjs`. Archive entries that already reference the capability become active links automatically on the next `npm run archive:build`.

## Verification

- `tests/archive.test.js` checks the following:
  - every available capability has a receiver on its page;
  - the glyph list matches the editor;
  - every active archive link builds;
  - unavailable capabilities name a package and a reason;
  - links round-trip;
  - malformed requests are rejected (wrong page, wrong version, invalid glyph, unsafe `from`).
- `tools/archive-smoke.mjs` opens every available capability in headless Chrome. For each one it checks that the target page accepted the request, selected the right glyph, tab or word, and shows a working return link.

## What C07 still owes

The final 1.0 requirement is at least three **genuine bidirectional** archive/editor links, tested against implemented capabilities after C02–C05. C06 provides four verified forward links with return links. C07 must decide whether the editor should also offer context-sensitive links *into* the archive (for example, from a selected component to its anatomy entry) and test them.
