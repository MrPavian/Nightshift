# NIGHTSHIFT — Aktueller Stand

**Stand:** 20. November 2026, Gate 3 der Vergleichsbibliothek umgesetzt (Branch `claude/gate3-comparison`, noch nicht in `main`)
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
| **Academy Kleinbuchstaben a–z & Ziffern 0–9** | Inhaltspaket v1 (Entwurf) in `main`: `data/academy/lowercase-numerals.v1.json`, 36 Zeichen, je 5 Strukturvarianten, 3 Graffiti-Richtungen und Lernaufgaben; noch keine SVG-Blätter | ChatGPT | Inhalt in 2 Proof-Blättern (a und 0) visuell validieren, danach restliche 34 Blätter erzeugen und QA | Owner: spätere Sichtung |
| **Style Reference Library** (`docs/lettering/style-library/`) | vollständige Sammlung: 12 Familien / 38 dokumentierte Templates, Katalog + JSON-Registry; alle Templates `documented-draft`. Resolver 1.1: Neutral, Straight, Bubble, Block-fit, Bounce; Wildstyle-Interlocking blockiert durch C04. **Phase A-01** (eingefroren): Owner-Review 19.11. — technischer Proof ok, gestalterisch nicht abgenommen; Straight/Blockbuster neu konzipieren. **Phase A-02** (`phase-a-02/`, Issue #24): Bubble-Punzenschutz (A/B/R jetzt 42–47 % statt 16–20 % Punzenfläche) und kollisionsfreies Bounce; vorläufig, nur ablehnend, `measured-uncalibrated` | ChatGPT (Research/Brief), Claude (Engine) | Owner-Sichtung Phase A-02; Letterform-Grammatiken für Straight/Blockbuster neu definieren (PR #25) | Owner: Sichtung A-02 (Schwellen, ungleiche Masse im Wort); Stildefinition vor dem nächsten Proof |
| **Letterform-Vergleichsbibliothek** (Spec `LETTERFORM_COMPARISON_LIBRARY_SPEC_01.md`) | **Gate 1–3 umgesetzt:** Datenvertrag `contracts/letterform-comparison.v1.json` (1.1.0), Daten unter `research/archive/comparison/`, Fundstück-Browser unter `#/vergleich`. **Gate 3** (Owner-Freigabe 20.11.): Buchstabenvergleich `#/vergleich/buchstabe/<A–Z>` mit Auswahl und Gegenüberstellung (`?auswahl=`), Merkmalsvergleich `#/vergleich/merkmal/<tag>`, Befunde getrennt als Deutung. Datenstand: 60 Fundstücke, 27 gesichtet, 20 zulässige Buchstabenbeobachtungen aus 3 Archiven/Plattformen an 10 Buchstaben; 1 Befund. Technisch getestet; nicht visuell vom Owner geprüft | **Recherche nur ChatGPT**; Claude prüft und integriert | Owner: Sichtung Gate 3; ChatGPT: 9 Merkmals-Tags außerhalb der Tag-Liste klären (Build-Warnung `CMP_UNLISTED_FEATURE`), mehr Buchstaben je Plattform; Claude: Gate 4 erst nach Freigabe | Owner: Sichtung Gate 3 |
| **Recherche Dortmund / Ruhrgebiet** | 5 Dortmund-Fotos aus Pixelprojekt *Lost Spaces Graffiti* (2010) auf Seitenebene gesichtet; keine Einzelglyphen transkribiert. *ALL SURFACE*-Vorschaubilder geprüft; INGRID Q01–Q06 weiterhin ohne Resultatzeilen | ChatGPT | Rechteklärung/physische Quellenprüfung und INGRID-Abfrage; erst dann repräsentative Stichprobe | Quellenzugang / Repräsentativität |

## Abnahmestufen der Integration vom 20. November

Eine grüne CI ist keine gestalterische oder inhaltliche Abnahme.

| Inhalt | In `main` integriert | Technisch getestet | Visuell geprüft | Vom Owner freigegeben |
|---|---|---|---|---|
| INGRID-Prüfung, Rali-Glyphen, Gate-3-Datenkorrektur (#34, #36, #38, #39) | ja, nach Merge des Integrations-PR | ja (Build, `--check`, Unit- und Browsertests) | Fundstück-Browser per Browsertest; keine menschliche Sichtung | Zählregel ja (Owner-Entscheidungen 19.11.); Daten nein |
| Woshe / Getty / Roth (#40) | ja, nach Merge | ja | nein | nein; Entwürfe bleiben Entwürfe |
| Academy a–z / 0–9, Inhaltsdaten (#42) | ja, nach Merge | ja (Datentest, 36 Zeichen) | nein (keine Blätter vorhanden) | nein |
| Dortmund / Ruhrgebiet (#43) | ja, nach Merge; Archiv-Export neu gebaut | ja | Archiv per Browsertest | nein |

## Offene Owner-Entscheidungen

1. **Freigabe A-Studie.** B–Z-Studien bleiben bis dahin gesperrt.
2. **Design-Freigabe C02-Master** und Bewertung der Stil-Optik (C03 / Creator 0.2).
3. **Tag in 1.0?** (HST-01). Bis dahin wird Tag im Creator als „nicht verfügbar“ angezeigt.
4. **Archiv-Brücke auf alle 26 Buchstaben erweitern?** Der Editor kann seit C02 alle 26 bearbeiten, die Brücke verlinkt nur A/B/G/R/S. Das wäre ein Minor-Bump des Vertrags.
5. **Gate 3 sichten** (Buchstaben- und Merkmalsvergleich); danach Entscheidung über Gate 4 (Lern- und Generator-Brücke).
6. **Wandstärke im Editor:** wird gemessen, aber nicht erzwungen, bis Schwellen kalibriert sind (D-013).

## Wie geprüft wird

```bash
npm ci
npm test                 # Unit- und Abnahmetests (232 am 20.11., nach Gate 3)
npm run test:browser     # Prüfstand, Editor, Creator, Archiv, Academy (CHROME=<pfad> setzen)
npm run perf:editor      # Editor-Antwortzeiten
```

Erzeugte Berichte prüft die CI zusätzlich mit `--check` (siehe `.github/workflows/ci.yml`). Die Live-Seiten liegen unter https://mrpavian.github.io/Nightshift/.

## Repository-Hygiene

- **Offene Pull Requests:** #25 (Research-Entwurf von ChatGPT) und der Integrations-PR vom 20.11. Nach dessen Merge sind #34, #36, #38, #39, #40, #42 und #43 erledigt und können geschlossen werden.
- **Alte Branches:** aufgeräumt (19.11.); GitHub löscht Branches nach dem Merge automatisch.
