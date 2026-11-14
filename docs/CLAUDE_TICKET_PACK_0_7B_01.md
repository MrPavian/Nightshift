# NIGHTSHIFT — Claude Ticket Pack 0.7B / 0.8A

**Status:** Planned handoff; implementation not claimed  
**Audience:** Claude coding agent  
**Prerequisite:** Complete and report 0.7A tickets. Do not begin dependent work while 0.7A hard gates fail.

## Track 0.7B — Alphabet and grammar resolver

### T08 — Remaining neutral glyph authoring framework
Implement authoring records, topology signatures, provenance and review lifecycle for C–Z. Begin with Wave 1 (C/O/D/P/Q) per `research/A_Z_GLYPH_AUTHORING_AND_PRIORITY_PLAN_01.md`. Each glyph must be a separately authored master; no font fallback masquerading as an authored glyph.

**Acceptance:** authored source, semantic graph, topology report, neutral proof and maturity record per glyph. No auto-promotion.

### T09 — Style grammar resolver
Implement resolver-only behavior from `research/STYLE_GRAMMAR_FIRST_SUPPORTED_SLICE_01.md`. Return deterministic operation plans, compatibility status, skipped operations and reason codes. Do not mutate geometry in resolver.

**Acceptance:** resolver is deterministic, maps only registered operations/variants, reports provisional coverage, and respects axis separation.

### T10 — First monochrome grammar variants
Connect Bubble and Straight only to actual authored variants/registered operations for reviewed glyphs. Keep uncalibrated operations disabled.

**Acceptance:** same source/context, monochrome comparison, different construction geometry; protected topology passes; finish changes do not count as grammar differences.

## Track 0.8A — Safe relationship solver

### T11 — Anchor registry and derivation
Implement stable anchor IDs, role/direction, provenance, clearance and validity status. Candidate anchors stay non-connectable until validated.

### T12 — Relationship Phase 1
Implement open separation, near-touch and eligible terminal-to-terminal. Candidate IDs deterministic; hard gates cannot be overridden.

### T13 — Whole-word validation and invalidation
Validate non-adjacent collisions, channels and protected negative spaces after pair edits. Implement dependency invalidation without mutating glyph masters.

**Acceptance for 0.8A:** Phase 1 relationships are graph-backed, editable, reversible and fully validated. No shared stroke/interlock yet.

## Track 0.8B — Controlled overlap
Only after 0.8A review: bar continuation, overlap and explicit extension bridges with occlusion order and whole-word checks.

## Track 0.8C — Advanced weaving
Only after human topology/context review: shared strokes and interlock. Requires shared component graph, crossing order and experimental compatibility status.

## Cross-cutting reporting
For every ticket: status, files, tests, fixtures, proof artifacts, unresolved calibration, maturity, defects and next dependency. A selectable UI control is not evidence of completed behavior.
