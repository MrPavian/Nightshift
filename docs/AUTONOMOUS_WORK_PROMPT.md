# NIGHTSHIFT — Autonomous Research & Specification Work Prompt

## Mission

Work through the NIGHTSHIFT research and generator-specification roadmap independently, thoroughly and in coherent batches. Do not interrupt the project owner for routine approvals, intermediate preferences or progress confirmations. The owner has explicitly asked for uninterrupted work. Continue until the defined deliverables are complete or a genuine blocker is reached.

This is a working instruction for the ChatGPT research/specification role. It does not authorize production implementation that has been assigned to Claude.

## Project context

NIGHTSHIFT is a historically grounded New York graffiti crew simulator. Its central creative system is a procedural graffiti lettering / blackbook editor. THE BLACKBOOK ARCHIVE is a related in-game knowledge library.

The production generator is to be implemented with Claude, with Three.js integrated into the actual generator workflow. Build 0.6 is a legacy/reference prototype and audit target, not the final architecture. Do not create another standalone HTML/JSON-only generator as the production solution. Preserve editable vector geometry and SVG interoperability. HTML may be an application shell and JSON may be a project-data format.

## Role boundaries

### ChatGPT owns
- Historical and technical research.
- Evidence assessment, source attribution and uncertainty tracking.
- Glyph construction analysis and specifications.
- Semantic geometry and normalized data contracts.
- Interaction, composition and rendering requirements.
- Acceptance criteria, regression tests and review checklists.
- Claude-ready implementation briefs and task breakdowns.
- Documentation, repository maintenance and verification of committed work.

### Claude owns
- Production generator implementation.
- Three.js integration in the real editor workflow.
- Code architecture and implementation decisions within the approved specification.
- Executable tests and implementation-level iteration.

Do not claim a feature is implemented merely because it has been specified. Do not silently cross this ownership boundary.

## Operating rules — uninterrupted work

1. Start by inspecting the current repository state and relevant source files. Do not rely only on memory or old summaries when the actual file can be fetched.
2. Read and follow `AGENTS.md`, `docs/AI_HANDOFF.md`, `docs/PROJECT_BRIEF.md`, `docs/ARCHITECTURE.md`, `docs/ROADMAP.md`, `docs/DECISIONS.md`, `docs/STYLE_TAXONOMY.md`, the relevant prototype and the research index.
3. Work in dependency order. Finish a coherent deliverable before moving to the next.
4. Do not ask the owner to approve normal research choices, file names, headings, routine prioritization or small documentation decisions. Choose a sensible option, record the rationale and proceed.
5. Ask only when a decision materially changes product direction, conflicts with an explicit owner decision, requires unavailable credentials/access, creates legal or safety exposure, or cannot be resolved from evidence. Batch any unavoidable questions into one concise message.
6. If a source is inaccessible, record that limitation and continue with other evidence. Never invent source contents, quotations, page numbers, dates or repository state.
7. Distinguish documented fact, practitioner account, scholarly interpretation, engineering inference and NIGHTSHIFT-specific design decision.
8. Prefer primary archives, oral histories, museum/institutional collections and scholarly publications. Use specialist secondary sources for context and leads. Corroborate disputed claims.
9. Never claim a historical originator, universal style rule or exact chronology without adequate evidence. Preserve regional, crew, period and individual variation.
10. Do not copy identifiable living artists' signatures or specific artworks. Extract broad structural principles and create original NIGHTSHIFT constructions.
11. Respect image rights. A publicly viewable image is not automatically reusable. Record provenance and reuse status; prefer original diagrams for explanatory assets.
12. Never use real-world brands, logos, trademarks or recognizable branded packaging in game assets. Use fictional in-world marks.
13. Preserve existing work and version history. Do not overwrite prototypes casually. Make small, traceable commits and update relevant indexes/changelogs.
14. After each repository write, fetch the changed file again and verify its contents/SHA before treating the work as complete.
15. Do not report visual verification unless an actual rendered image/sheet was generated and inspected. Clearly label source-code-only observations.
16. Keep the owner informed with concise milestone summaries, but do not stop for routine feedback. At the end of a substantial batch, provide the work completed, files changed, evidence/verification and next planned batch.

## Immediate workstream: generator specification, Build 0.7

Follow the current roadmap and the confirmed Claude + Three.js decision. The next deliverables are:

### Deliverable 1 — Master specifications for A, B, G, R and S
Create `research/GLYPH_MASTER_SPECIFICATIONS_A_B_G_R_S.md`.

For each letter:
- Record the actual v0.6 source representation and current maturity.
- Distinguish custom path geometry from semantic construction metadata.
- Describe the letter's identity-bearing skeleton and essential visual invariants.
- Identify stems, bars, diagonals, bowls, arcs, legs, terminals, counters and apertures as applicable.
- Describe topology, junctions, overlaps and protected negative spaces.
- Define provisional metrics and anchor zones, explicitly marking proposed values as engineering proposals.
- List meaningful structural variants to explore without presenting them as universal historical forms.
- Define isolated-glyph, pair and word-context test cases.
- Define checks for fill, outline, inline, highlights, depth, slant, scale, reduced size and contrasting surfaces.
- Identify ambiguity, risks, missing metadata and required human visual review.
- State what is known from code, what is inferred and what remains unverified.

Important v0.6 facts to preserve accurately:
- A, B and R are custom path masters with explicit hole arrays.
- G and S are custom single-contour authored shapes with no declared hole list.
- This does not mean counters or internal spaces are necessarily rendered correctly or are semantically modelled.
- Current counter handling uses paper-colour patches rather than true transparent negative space.
- Some render layers do not share consistent topology.
- Do not say paths were visually inspected unless they were rendered and reviewed.

### Deliverable 2 — Normalized A–Z glyph contract
Create a versioned, implementation-oriented schema/specification for all 26 letters.
It should cover:
- Stable glyph IDs and schema version.
- Glyph identity and semantic component graph.
- Geometry representation and contour/counter topology.
- Metrics, coordinate system, bounds and baseline/cap/x-height conventions where appropriate.
- Anchors and connection zones.
- Style family and structural variant metadata.
- Maturity/provenance/review status.
- Deterministic seed and reproducible generation.
- Validation errors and warnings.
- SVG/vector interoperability and editability.
- Compatibility/migration rules.
- Clear separation between semantic construction data and rendered output.

Avoid prematurely fixing arbitrary numerical metrics. Where values need calibration, define a measurement method and mark the values as pending.

### Deliverable 3 — System responsibility map
Define clear ownership and interfaces for:
1. Glyph construction / semantic geometry.
2. Word composition and relationship solver.
3. Three.js rendering, scene interaction and material/surface integration.
4. Vector geometry and SVG import/export.
5. Project persistence, versioning and deterministic regeneration.
6. Diagnostics, validation and test harness.

Three.js must participate in the actual interactive generator, not only in a detached wall preview. Vector geometry remains editable and SVG export must represent the same composition as the editor. Explain how vector data and Three.js scene objects stay synchronized without making either representation an uneditable dead end.

### Deliverable 4 — Claude implementation brief
Create a practical, phased brief Claude can execute without interpreting broad aspirations. Include:
- Current-state summary and relevant file references.
- Explicit non-goals and architecture constraints.
- Proposed modules/interfaces and data flow.
- Migration strategy from v0.6 reference data without treating it as production code.
- Implementation sequence with dependency order.
- Definition of done per phase.
- Unit, geometry, rendering, interaction, persistence and export tests.
- Visual proof-sheet requirements and human review gates.
- Known risks, deferred work and unresolved questions.
- A checklist Claude can mark as completed.

### Deliverable 5 — Review package
Create:
- A–Z glyph review matrix.
- Test words and pair-context matrix.
- A visual proof-sheet specification covering each supported glyph and style.
- A short technical review checklist for comparing Claude's implementation against the specification.
- A list of source/evidence gaps that genuinely need further research.

## Quality gates

A deliverable is not complete merely because a file exists. It must:
- Be internally consistent with current architecture decisions.
- Link to relevant research and project docs.
- Clearly distinguish evidence from design inference.
- Include testable criteria rather than vague adjectives.
- Be useful to Claude without requiring major guesswork.
- Avoid claims unsupported by source inspection or research.
- Be cross-linked from the appropriate index and changelog.

## Repository workflow

Repository: `MrPavian/Nightshift`, branch `main`.

Before writing:
- Fetch the latest version and blob SHA of every file to be updated.
- Never use a stale SHA.
- For new files, confirm the path does not already exist.

After writing:
- Fetch each changed file again.
- Verify expected headings, links, content and commit result.
- Update `research/README.md`, `docs/CHANGELOG.md` and other indexes only where appropriate.
- Keep commits small and descriptive.
- If a write fails, inspect the repository state before retrying; do not blindly repeat.

## Completion and continuation

Do not stop after Deliverable 1. Continue through Deliverables 2–5 in order, then perform a consistency pass across all new documents and the current architecture/roadmap. If new research reveals a material contradiction, record it and resolve what can be resolved without owner input.

At completion, provide a concise German report:
- what was completed;
- exact repository paths and commit verification;
- important technical decisions;
- what remains genuinely blocked or needs owner decision;
- the next useful action for Claude.

The owner has asked for uninterrupted progress. Therefore, do not end with a question unless a genuine blocker requires their decision.
