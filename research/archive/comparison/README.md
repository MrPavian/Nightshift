# Letterform-Vergleichsbibliothek — Datenquellen

Die Daten hinter **Stile & Buchstaben → Buchstaben vergleichen** und **Bildarchiv → Fundstücke**.

- **Spec:** `docs/lettering/style-library/LETTERFORM_COMPARISON_LIBRARY_SPEC_01.md`
- **Architektur:** `docs/lettering/style-library/ADR_LETTERFORM_COMPARISON_LIBRARY_GATE0_01.md`
- **Vertrag:** `contracts/letterform-comparison.v1.json`

`npm run archive:build` erzeugt daraus `data/archive/comparison.v1.de.json`. Die CI prüft mit `npm run archive:check`, dass die Datei aktuell ist. **Änderungen hier laufen über einen Pull Request** (`AGENTS.md`), denn ohne Neubau wird die CI auf `main` rot.

## Dateien

| Datei | Inhalt | bearbeiten |
|---|---|---|
| `sources.v1.json` | Quellen auf Sammlungs- oder Archivebene (`ACQ-…`) | ja |
| `specimens.v1.json` | Fundstücke: Herkunft, Datum, Ort, Sichtungsstand, Bildrechte | ja |
| `observations.v1.json` | `objectObservations` (`OBS-…`) und `glyphObservations` (`GLY-…`) | ja |
| `findings.v1.json` | Vergleichsbefunde (`FND-…`) | ja |
| `legacy/graffiti-reference-manifest-01.json` | eingefrorener Import des Manifests aus PR #25 | nein |
| `MIGRATION_REPORT_01.json` | Bericht der einmaligen Überführung (Abbildungen, Hashes) | nein |

Im Feld `raw` jedes Fundstücks stehen die Originalwerte und englischen Recherchenotizen aus dem Manifest. Der Build exportiert sie **nicht**; die App zeigt sie nie.

## Eine Buchstabenbeobachtung eintragen

Nur wenn das Fundstück `visualState: hi_fi_image_opened_and_inspected` (oder `physical_item_inspected`) hat **und** der Buchstabe einzeln und sicher erkennbar ist:

```json
{
  "id": "GLY-LFA-PIECE-001-A1",
  "specimenId": "LFA-PIECE-001",
  "glyph": "A",
  "transcriptionConfidence": "high",
  "legibility": "medium",
  "features": ["open-counter", "angular-apex"],
  "observationDe": "Das A hat eine spitze, nach rechts versetzte Spitze und eine offene Punze; der Querbalken ist als Pfeil nach links geführt.",
  "editorialState": "source-checked"
}
```

- Konfidenz `low` wird abgelehnt.
- Kein Buchstabe wird aus einem unleserlichen Wort erschlossen.
- `observationDe` ist der sichtbare, deutsche Text. Was gesehen wurde und was gedeutet ist, bleibt getrennt; eine Deutung gehört als `objectObservation` mit `kind: "interpretation"` erfasst.

## Merkmals-Tags für Glyphen

Die Werte in `features` sind beobachtbare Formmerkmale, keine Stilnamen und keine Qualitätsurteile. Möglichst wenige, konkret sichtbare Tags verwenden:

- **Kontur:** `angular`, `rounded`, `mixed-contour`
- **Innenraum:** `open-counter`, `closed-counter`, `no-counter`
- **Struktur:** `crossbar`, `diagonal-cross`, `looped`, `connected`, `overlapping`
- **Strich:** `monoline`, `broad-nib`, `variable-width`
- **Ausläufe:** `extended-terminal`

Nur Tags vergeben, die direkt am Einzelglyph sichtbar sind. Ein Merkmal darf nicht aus dem vermuteten Stil oder aus anderen Buchstaben derselben Seite abgeleitet werden.

## Einen Vergleichsbefund eintragen

```json
{
  "id": "FND-A-APEX-01",
  "axis": "rounded-angular",
  "observationIds": ["GLY-…", "GLY-…"],
  "findingDe": "…",
  "evidenceBasisDe": "…",
  "limitationDe": "…",
  "confidence": "medium",
  "generatorRelevance": "research-lead",
  "relatedEntries": ["construction.letter-anatomy"],
  "editorialState": "source-checked"
}
```

- Ein Befund braucht mindestens zwei Beobachtungen aus mindestens zwei **verschiedenen** Quellen (`sourceRecordId`).
- `relatedEntries` müssen existierende Archiv-Einträge sein.
- `validated-capability` ist nur mit einer verfügbaren Editor-Funktion (`capability`) erlaubt.

## Was der Build ablehnt

- doppelte oder ungültige IDs, unbekannte Quellen, Fundstücke oder Beobachtungen, ungültige Enum-Werte;
- Bild-URLs als Link (nur Seiten-URLs sind erlaubt) und Einbetten ohne `imageRights: cleared`;
- Glyph-Beobachtungen auf nicht gesichteten Fundstücken, außerhalb von A–Z oder mit Konfidenz `low`;
- Befunde ohne zwei unabhängige Quellen, ohne Belegbasis oder ohne Einschränkung;
- veröffentlichte Datensätze (`source-checked` oder weiter) ohne deutschen Text. Entwürfe (`draft`) werden nicht exportiert.

## Pilot-Gate

Der Buchstabenvergleich in der App öffnet erst ab **20 zulässigen Glyph-Beobachtungen aus mindestens 3 verschiedenen Archiven bzw. Plattformen** (Owner-Entscheidung 19.11.: mehrere Quellen-Records derselben Plattform, z. B. zwei Forum-Threads, zählen einmal) (`contracts/letterform-comparison.v1.json` → `pilotGate`). Bis dahin zeigt die App den Fundstück-Browser und nennt den aktuellen Stand.

## Offene Bestätigung

`MIGRATION_REPORT_01.json → needsConfirmation`: Die fünf NGA-Datensätze mit „catalogue visual description reviewed“ sind als `catalogue_metadata_only` eingetragen. Gemeint ist: Katalogtext, keine eigene Sichtung.
