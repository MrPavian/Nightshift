# NIGHTSHIFT — Aktueller Stand

**Stand:** 19. November 2026, nach der Integration von #22, #26–#32
**Zweck:** die *eine* Stelle, an der der aktuelle Projektstand steht. Gilt für ChatGPT, Claude und den Owner gleichermaßen.

> **Regel:** Wer etwas nach `main` bringt, aktualisiert diese Datei im selben Pull Request: Zeile in der Tabelle anpassen, offene Entscheidungen nachziehen, Datum oben ändern. Historie gehört ins [CHANGELOG](CHANGELOG.md), Entscheidungen ins [DECISIONS](DECISIONS.md), nicht hierher.

## Arbeitsstränge

| Strang | Stand in `main` | Zuständig | Nächster Schritt | Wartet auf |
|---|---|---|---|---|
| **C01 Engine & Editor:** Registry, Validator, Renderer, Proof-Sheets, Prüfstand, Kontur-Editor | fertig, getestet; Editor-Fix gegen Hänger beim Ziehen enthalten | Claude | – | – |
| **C02 Alphabet:** 26 ausgearbeitete Großbuchstaben-Master | implementiert, getestet; Prüfstand rendert 26/26 | Claude | Owner-Sichtung der Formen | Owner: Design-Freigabe |
| **C03 Stil-Resolver:** Bubble, Straight, Blockbuster; Wildstyle nur als Studie | implementiert, unkalibriert | Claude | in C04 weiterführen | Owner: Optik |
| **Creator 0.1/0.2** (D-016, D-017): Wort → Brief → 4 Vorschläge → Export, Graffiti-Engine auf Skeletten | implementiert, unter `/creator/` | Claude | Skelette ↔ Master verknüpfen (mit C04/C05) | Owner: Optik |
| **C04 Beziehungen & Vier-Konzept-Generierung** | nicht begonnen (nur Spezifikation) | Claude | starten | – |
| **C05 Bearbeiten, Speichern, Export** | nicht begonnen | Claude | nach C04 | – |
| **C08 Creator-first Studio** | nicht begonnen; Creator 0.1/0.2 ist Vorstufe und wird ersetzt | Claude | nach C05 | – |
| **C07 Integration & Release** | nicht begonnen | Claude | zuletzt | – |
| **C06 Blackbook-Archiv:** deutsche Erstausgabe, Editor-Brücke 1.1.0 | implementiert, unter `/archive/`; gegen Styleguide überarbeitet und mit Entwürfen 01–06 und der Claim/Source-Matrix zusammengeführt | Claude (Code), ChatGPT (Inhalte) | Owner-Sichtung | Owner: Inhalt & Optik |
| **Academy A-Studie** (`letter-study_A_01.svg`, generiert) | implementiert, Layout-QA 0 Probleme | Claude | Owner-Freigabe; B–Z erst danach | Owner: Freigabe A |
| **Academy Großbuchstaben A–Z** (Referenzblätter v1, Entwurf) | Galerie unter `/academy/`, Heft-PDF, 72 Korrekturen | Claude | Korrekturliste menschlich prüfen | Owner |
| **Academy Kleinbuchstaben a–z & Ziffern 0–9** | beauftragt (Owner-Entscheidung 16.11.); noch nichts im Repository | ChatGPT | Ergebnisse per Pull Request einbringen | – |
| **Style Reference Library** (`docs/lettering/style-library/`) | vollständige Sammlung: 12 Familien / 38 dokumentierte Templates, Katalog + JSON-Registry; alle Templates `documented-draft`. Resolver 1.1: Neutral, Straight, Bubble, Block-fit, Bounce; Wildstyle-Interlocking blockiert durch C04. **Phase A-01** (eingefroren): Owner-Review 19.11. — technischer Proof ok, gestalterisch nicht abgenommen; Straight/Blockbuster neu konzipieren. **Phase A-02** (`phase-a-02/`, Issue #24): Bubble-Punzenschutz (A/B/R jetzt 42–47 % statt 16–20 % Punzenfläche) und kollisionsfreies Bounce; vorläufig, nur ablehnend, `measured-uncalibrated` | ChatGPT (Research/Brief), Claude (Engine) | Owner-Sichtung Phase A-02; Letterform-Grammatiken für Straight/Blockbuster neu definieren (PR #25) | Owner: Sichtung A-02 (Schwellen, ungleiche Masse im Wort); Stildefinition vor dem nächsten Proof |
| **Letterform-Vergleichsbibliothek** (Spec `LETTERFORM_COMPARISON_LIBRARY_SPEC_01.md`) | **Gate 1 und 2 umgesetzt:** Datenvertrag `contracts/letterform-comparison.v1.json` (1.1.0), Daten unter `research/archive/comparison/`, Build nach `data/archive/comparison.v1.de.json`, Fundstück-Browser unter `#/vergleich`. 46 Fundstücke, 22 gesichtet, **14 zulässige Buchstabenbeobachtungen** aus 4 Quellen bzw. 2 Archiven/Plattformen; 1 Befund. Buchstabenvergleich (Gate 3) gesperrt, bis 20 Beobachtungen aus 3 verschiedenen Archiven/Plattformen vorliegen; Gate 4 offen. NGA-Abbildung bestätigt (#29) | **Recherche nur ChatGPT** (Owner-Entscheidung 19.11.); Claude prüft und integriert | ChatGPT: Beobachtungen aus weiteren Archiven per PR; Claude: Gate 3, sobald das Gate offen ist | Owner: Sichtung |
| **Recherche Dortmund / Ruhrgebiet** | Quellenaudit, Rubrik, Zugangskarte; keine Seiten visuell codiert | ChatGPT | rechtekonforme Stichprobe | Quellenzugang |

## Offene Owner-Entscheidungen

1. **Freigabe A-Studie.** B–Z-Studien bleiben bis dahin gesperrt.
2. **Design-Freigabe C02-Master** und Bewertung der Stil-Optik (C03 / Creator 0.2).
3. **Tag in 1.0?** (HST-01). Bis dahin wird Tag im Creator als „nicht verfügbar“ angezeigt.
4. **Archiv-Brücke auf alle 26 Buchstaben erweitern?** Der Editor kann seit C02 alle 26 bearbeiten, die Brücke verlinkt nur A/B/G/R/S. Das wäre ein Minor-Bump des Vertrags.
5. **Wandstärke im Editor:** wird gemessen, aber nicht erzwungen, bis Schwellen kalibriert sind (D-013).

## Wie geprüft wird

```bash
npm ci
npm test                 # Unit- und Abnahmetests (220 am 19.11., nach der Integration)
npm run test:browser     # Prüfstand, Editor, Creator, Archiv, Academy (CHROME=<pfad> setzen)
npm run perf:editor      # Editor-Antwortzeiten
```

Erzeugte Berichte prüft die CI zusätzlich mit `--check` (siehe `.github/workflows/ci.yml`). Die Live-Seiten liegen unter https://mrpavian.github.io/Nightshift/.

## Repository-Hygiene

- **Offene Pull Requests:** #25 (Research-Entwurf von ChatGPT). Stand 19.11., nach der Integration.
- **Alte Branches:** aufgeräumt (19.11.); GitHub löscht Branches nach dem Merge automatisch.
