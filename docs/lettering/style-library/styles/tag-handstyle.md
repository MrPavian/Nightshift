# Style Card — Tag & Handstyle

**ID:** tag-handstyle | **Version:** 1.0.0  
**Primary axis:** Practice / inscription format + movement grammar  
**Maturity:** Draft. The distinction between tag as inscription and handstyle as its written form is well supported; the template families below are NIGHTSHIFT operational abstractions.

## Definition and scope
A **tag** is a writer/crew name or pseudonym rendered as a signature-like inscription. **Handstyle** describes the individualized movement, rhythm and letter treatment through which that inscription is written. A tag is therefore not a font family. The same handstyle can produce multiple tags; the same name can be rendered in different handstyles.

This card models observable written form, not a method for unauthorized placement. NIGHTSHIFT templates are fictional lettering studies.

## Shared visual grammar
- A continuous or near-continuous visual rhythm, even where the writing is not literally one stroke.
- Individualized proportions, joins, slant, terminals and spacing.
- Repeated letterforms reveal a personal system, but are not mechanically identical.
- Speed-like fluency is visible as rhythm and economy; actual ductus cannot be inferred from a static image.
- Readability may vary, but letter evidence and intentional movement should remain inspectable.

## Templates

### T1 — Monoline Handstyle
**Intent:** consistent single-weight line with rhythm carried by scale, slant and spacing.  
**Construction:** establish a gesture skeleton; assign a consistent nominal line width; refine joins and counters; vary glyph width naturally; inspect joins at full size.  
**Parameters:** slant, x-height ratio, line weight, glyph compression, join frequency, spacing rhythm.  
**Guardrails:** no fake brush contrast; avoid identical widths; preserve distinct glyph identities.  
**Good tests:** ALEX, MIND, RISK, SQUE; repeated letters in BANANA.

### T2 — Broad-Nib / Flatline Handstyle
**Intent:** directional contrast created by a broad, flat writing edge.  
**Construction:** define nib angle as a visual model; derive thick/thin contrast from stroke direction; keep joins plausible; avoid independently painting arbitrary thick and thin segments.  
**Parameters:** nib angle, contrast ratio, terminal cut, slant, stroke continuity.  
**Guardrails:** a static image documents appearance only, not actual pen angle or stroke order.  
**Good tests:** ECHO, KRAZE, MARS; inspect curves and diagonals for consistent contrast.

### T3 — Brush / Gestural Handstyle
**Intent:** variable line weight, tapered entries/exits and elastic rhythm.  
**Construction:** model pressure/velocity as authored visual curves, not inferred facts; give each stroke a start, body and release; preserve counter openings.  
**Parameters:** weight range, taper length, curve tension, gesture amplitude, terminal energy.  
**Guardrails:** do not turn every terminal into a flourish; avoid brush-script clichés unrelated to the word.  
**Good tests:** NOVA, ZERO, GHOST; check that flourishes do not obscure letter boundaries.

## Negative-space and composition rules
- Treat inter-letter gaps as designed shapes.
- Do not add arbitrary loops to connect letters.
- Any overlap must be intentional and remain distinguishable from a crossing.
- A signature may be highly personal, but NIGHTSHIFT output must not imitate a known writer's tag or signature.

## Failure modes
- TAG_AS_FONT — tag treated as a generic installable font.
- FAKE_DUCTUS — stroke order or tool action claimed from a static result.
- UNMOTIVATED_FLOURISH — decorative loop has no relation to gesture or glyph.
- MONOLINE_COLLAPSE — all letters reduced to identical geometric strokes.
- SIGNATURE_CLONE — recognizable real writer/crew signature copied.

## Acceptance tests
1. Same fictional name rendered in T1–T3; differences must be structural, not just colour.
2. Repeat glyphs retain a family logic without exact duplication.
3. At thumbnail size, rhythm reads; at full size, joins and counters remain coherent.
4. Compare against Simple/Straight and Calligraffiti to ensure axis separation.

## Evidence and inference
**Source-supported:** tags function as signature-like inscriptions; handstyle is tied to individualized, rapid/fluent written movement and is refined through practice.  
**NIGHTSHIFT inference:** T1–T3, parameters, geometry constraints and test words.  
**Open:** regional tag conventions, tool-specific movement and historical period differences require practitioner review.

Sources: SOURCES.md S1, S5, S12, S13.
