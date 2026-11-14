# AI Contributor Guide — NIGHTSHIFT

Read this file first. Then read, in order:

1. `README.md` — project summary and current state.
2. `docs/PROJECT_BRIEF.md` — product intent, scope and terminology.
3. `docs/ARCHITECTURE.md` — intended technical architecture.
4. `docs/ROADMAP.md` — priorities and acceptance criteria.
5. `docs/STYLE_TAXONOMY.md` — style vocabulary and research discipline.
6. `docs/DECISIONS.md` — decisions that should not be casually reversed.
7. `docs/CHANGELOG.md` — implementation history.
8. The latest prototype in `prototypes/` — actual implementation.

## Mission

Help build NIGHTSHIFT ART ENGINE: a historically informed, procedural graffiti lettering and blackbook tool. The wider game concept is a grounded New York graffiti crew simulator. The editor is the central creative system: players should be able to develop original letterforms and compositions, not merely apply a visual filter to typed text.

## Non-negotiable priorities

- Letter construction quality comes before effects, decoration and UI polish.
- Style families must differ in actual glyph construction and composition grammar.
- Keep historical claims careful and researchable. Do not invent origins, dates, regional claims or stylistic lineages.
- Treat graffiti culture as a diverse set of practices, not a single aesthetic.
- Keep vector geometry independent of Three.js.
- SVG/vector paths are the source of truth; Three.js is for spatial presentation.
- Keep diagnostics honest. Clearly label heuristics and estimates.
- Preserve working versions. Add a new versioned prototype rather than overwriting the last known-good build.
- Do not add real-world brand logos, trademarked packaging or copied artist signatures to game-world assets. Use original fictional marks.

## Working protocol

Before changing code:

1. Inspect the current repository and latest prototype.
2. Identify the exact problem and the relevant roadmap milestone.
3. Explain the intended change briefly in the PR/commit description.
4. Avoid broad rewrites when a focused change will do.

After changing code:

1. Test the actual interaction in a browser where possible.
2. Check console errors, responsive layout, SVG export and persistence if affected.
3. Update the changelog and relevant docs.
4. State what was tested and what remains unverified.
5. Never claim a feature works merely because code was written.

## Codebase constraints

The current prototype is a standalone HTML prototype. Do not assume a framework, build pipeline, package manager, test suite or modular source tree exists unless repository inspection confirms it.

Prefer small, understandable, browser-native modules as the architecture evolves. Avoid introducing a framework or dependency without a clear reason and a documented decision.

## Historical and visual research

When researching styles:

- Distinguish practitioner terminology, museum/archive terminology and later academic descriptions.
- Record source, author/institution, publication date and relevant location/period.
- Separate documented facts from interpretation and design extrapolation.
- Do not reduce a style to a palette, slant, outline or a list of decorative add-ons.
- Build a visual reference board and identify structural traits: skeleton, proportions, counters, terminals, connections, rhythm, density, extensions and spatial logic.
- Do not copy a living artist's exact signature or a specific identifiable artwork. Translate broad, documented structural principles into original constructions.

## Collaboration output

Every substantial contribution should include:

- Summary of changes
- Files changed
- Rationale / roadmap milestone
- Tests performed
- Known limitations
- Suggested next task

If requirements conflict, preserve the project's non-negotiable priorities and ask the project owner before making a major product-direction change.


## THE BLACKBOOK ARCHIVE

When contributing to the in-game graffiti lexicon:

- Read `docs/BLACKBOOK_ARCHIVE_MASTERPROMPT.md` and `docs/BLACKBOOK_ARCHIVE_ROADMAP.md`.
- Treat `research/` as the editorial source of truth. Never create a separately hand-maintained in-game encyclopedia.
- Research and cite before writing historical claims. Separate documented facts, disputed accounts, interpretation and generator design inference.
- Distinguish practices, lettering styles, formats/surfaces, techniques/media, people and crews.
- Record source metadata and image rights. Publicly viewable does not mean reusable.
- Build content quality and taxonomy before UI polish or large-scale content volume.
- Do not copy identifiable artist signatures or specific artworks into generator outputs.
- Mark draft, provisional, disputed and reviewed content honestly.
- Follow the dedicated archive roadmap's acceptance criteria; a visual shell with placeholder entries is not a completed archive.


## Generator implementation ownership and Three.js direction

The project owner has decided that the production generator will be implemented with Claude and integrated Three.js support. The existing standalone HTML prototype is a reference and audit target, not the final generator architecture. Do not build another HTML/JSON-only generator as the intended end product. Continue producing source-backed research, precise functional specifications, data contracts, test cases and acceptance criteria for Claude to implement. Three.js is part of the actual generator workflow, not merely a decorative wall-preview widget. Preserve editable vector geometry and SVG interoperability unless the project owner explicitly changes that requirement. HTML can still be an application shell and JSON can still be a project/data format; they are not substitutes for the generator architecture.

