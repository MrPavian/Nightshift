---
id: construction.negative-space
type: construction
aliases: counter; aperture; channel; negative space; holes
related: construction.letter-anatomy; practice.handstyle; object.blackbook
editorialStatus: source-checked
evidence: strong
imageRights: original-diagram
diagrams: diagram.negative-space
generator: study.glyph-anatomy glyph=A; editor.contour-node-edit glyph=A
---

# Negative space: counters and openings

> The empty shapes inside and around letters — closed counters, open apertures and channels — are as important for recognition as the filled ones.

## Introduction

NIGHTSHIFT distinguishes three kinds of negative space: an enclosed **counter** (inside the A or the bowls of B), an **aperture** that stays connected to the outside (as in G), and **channels** between parts [c1]. Its validator checks that counters stay enclosed when letters are edited [c2].

## Why it matters

If a counter closes up or merges with another, letters become hard to read — a B with one counter looks like a different letter. Protecting negative space keeps letters recognisable even when they are heavily stylised.

## In NIGHTSHIFT

In the editor you can move a letter's points: a change that pushes a counter outside the letter or merges two counters is rejected with an explanation [c2].

## Claims

| id | kind | evidence | sources | claim |
|---|---|---|---|---|
| c1 | nightshift-design-inference | strong | doc:research/GLYPH_GEOMETRY_VALIDATION_CONTRACT_01.md | NIGHTSHIFT separates enclosed counters, exterior-connected apertures and channels as distinct negative-space entities. |
| c2 | nightshift-design-inference | strong | doc:research/GLYPH_GEOMETRY_VALIDATION_CONTRACT_01.md | The geometry validator checks counter enclosure and rejects edits that merge or open protected counters. |
