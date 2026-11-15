# NIGHTSHIFT Roadmap

> **Binding plan:** [Final Roadmap and Joint Work Order 01](FINAL_ROADMAP_AND_WORK_ORDER_01.md)  
> **Claude implementation handoff:** [Claude Final Release Ticket Pack 01](CLAUDE_FINAL_RELEASE_TICKET_PACK_01.md)

## Final target: NIGHTSHIFT 1.0

NIGHTSHIFT is now being delivered against a finite release target: a usable vector-first graffiti lettering editor with integrated Three.js interaction, reproducible concepts, per-letter editing, safe word relationships, versioned project persistence, SVG/PNG export and a compact BLACKBOOK ARCHIVE MVP.

The 1.0 scope, ownership, acceptance criteria and stop conditions are defined in the binding master roadmap above. No additional features or research streams are automatically added.

## Delivery phases

1. **Close 0.7A:** complete the canonical Three.js edit command loop and validate A/B/G/R/S.
2. **A–Z and style grammars:** complete neutral alphabet construction and reviewed Bubble, Straight and Blockbuster variants; keep Wildstyle a constrained study where appropriate.
3. **Relationships and generation:** deterministic four-concept generation, safe graph-backed relationships and whole-word topology validation.
4. **Blackbook workflow:** per-letter editing, undo/redo, versioned save/load and faithful SVG/PNG export.
5. **BLACKBOOK ARCHIVE MVP:** 25–35 source-backed entries, two learning paths, search/navigation and editor links.
6. **Integration and release:** hardening, QA, rights/attribution review, release notes and tagged 1.0 candidate.

## Current implementation baseline

As documented in [0.7A Implementation Plan](IMPLEMENTATION_PLAN_0_7A.md), tickets T01–T06 are complete and T07 remains the next editor-foundation gate. Recheck the actual repository and tests before starting; this status must not be assumed if implementation has advanced.

## Scope discipline

- The old 0.7–1.0 and BLACKBOOK ARCHIVE A–H roadmaps remain useful design history.
- Where they propose work beyond the finite 1.0 scope, defer it to a post-1.0 list.
- No advanced shared-stroke weaving, exhaustive encyclopedia, full crew-simulator integration, online services or unbounded historical research is required for 1.0.
- A phase is complete only when its acceptance evidence exists; UI controls or specifications alone are not completion.

## Definition of done

NIGHTSHIFT 1.0 is complete when the master roadmap's release checklist is satisfied (or explicitly waived by the owner), all P0/P1 defects are closed, fresh-checkout build/tests/exports are reproducible, the owner has approved the final visual review, and the release candidate is tagged with documentation and known limitations.
