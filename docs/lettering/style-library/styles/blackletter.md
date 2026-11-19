# Style Card — Old English / Blackletter

**ID:** blackletter | **Version:** 1.0.0  
**Primary axis:** Letterform grammar / historical script reference  
**Maturity:** Draft. Blackletter is a broad historical script family; its use in graffiti is a hybrid appropriation and requires typographic care.

## Definition and scope
Blackletter is a historical Western script family with multiple forms and regional traditions. “Old English” is often used colloquially in lettering contexts, but it is not a precise name for every blackletter form. NIGHTSHIFT separates three visual study templates and avoids presenting them as a single authentic historical hand.

## Templates

### T1 — Textura-Inspired
**Intent:** dense vertical rhythm, angular construction and compact counters.  
**Construction:** define a modular vertical stem; build broken arches and controlled joins; tune spacing so texture does not become an unreadable dark band; add characteristic terminals selectively.  
**Parameters:** stem ratio, nib angle, arch width, counter aperture, spacing density, terminal form.  
**Guardrails:** label as “Textura-inspired”, not a historical Textura reproduction unless the model is based on a documented exemplar.  
**Tests:** minimum set H, I, M, N, O, S; word NIGHT.

### T2 — Fraktur-Inspired
**Intent:** more varied stroke rhythm and expressive broken forms than a strictly modular textura model.  
**Construction:** combine angular stems with controlled curves and selected flourishes; distinguish main strokes from ornamental strokes; protect counters and joins.  
**Parameters:** stroke contrast, curve tension, broken-stroke frequency, flourish budget, counter size.  
**Guardrails:** avoid generic “Gothic” decoration; maintain consistent structural logic across the alphabet.  
**Tests:** A, E, G, R, S, T; word RUHR.

### T3 — Contemporary Graffiti Blackletter Hybrid
**Intent:** blackletter-derived structure adapted to a more open, scalable graffiti word composition.  
**Construction:** select identifiable blackletter features (broken arches, angular stems, terminal cuts); simplify dense joins; tune word spacing; optional extensions must remain separate from the base glyph.  
**Parameters:** historical feature mix, angularity, width, stem contrast, ornament budget, connection density.  
**Guardrails:** do not blend unrelated historical scripts without documenting the design choice; do not treat “Old English” as a universal style label.  
**Tests:** NIGHTSHIFT, KRAFT, RUHR; compare at small and large scale.

## Shared constraints
- Distinguish skeleton, thick/thin logic, terminals and ornamental additions.
- Maintain legibility of dense counters and joins.
- Keep historical script features distinct from graffiti-specific extensions.
- Avoid copying commercial typefaces or identifiable lettering works.

## Failure modes
- GOTHIC_CLIPART — generic spikes and ornaments without script structure.
- HISTORICAL_MIXUP — unrelated script traditions combined without explanation.
- COUNTER_CLOG — dense texture closes counters and apertures.
- ORNAMENT_OVERLOAD — flourishes dominate the letter skeleton.
- OLD_ENGLISH_MISLABEL — all blackletter called Old English.

## Acceptance tests
- Render T1–T3 in monochrome and compare their structural differences.
- Inspect H, M, N, O, R and S for counters and joins.
- Separate historical reference features from NIGHTSHIFT inventions.
- Record source script, date/region and rights status for every reference.

## Evidence and inference
**Source-supported:** Blackletter contains multiple historical script forms; Calligraffiti and contemporary lettering may combine script traditions with graffiti practice.  
**NIGHTSHIFT inference:** T1–T3, parameters and graffiti adaptation rules.  
**Open:** a practitioner-reviewed glossary of blackletter forms and a vetted set of public-domain historical exemplars are needed.

Sources: SOURCES.md S18, S19, S20.
