# THE BLACKBOOK ARCHIVE — Roadmap

## Zielbild

Ein jederzeit im Spiel abrufbares, visuelles und interaktives Graffiti-Lexikon. Es basiert auf der redaktionellen Forschungsbibliothek unter `research/` und verbindet Geschichte, Begriffe, Formate, Techniken, Styles und Letter-Konstruktion mit dem NIGHTSHIFT Piece Generator.

**Produktregel:** Research-Bibliothek = redaktionelle Quelle der Wahrheit. Ingame-Archiv = spielerische Darstellung derselben Inhalte.

## Grundsätzliche Abgrenzungen

- Praxis/Aktivität ist nicht dasselbe wie Stil.
- Stil ist nicht dasselbe wie Format oder Oberfläche.
- Technik/Medium ist nicht dasselbe wie Lettering-Grammatik.
- Personen und Crews sind historische Akteure, keine Generator-Presets.
- Einträge müssen Varianten, regionale Unterschiede und unsichere Zuschreibungen sichtbar machen.

## Phase A — Produktdefinition und Informationsarchitektur

**Ziel:** Festlegen, was das Archiv ist und wie Wissen organisiert wird.

Arbeitspakete:
- [ ] Zielgruppen und Nutzungssituationen definieren (Neuling, interessierter Spieler, fortgeschrittener Writer/Style-Nerd).
- [ ] Taxonomie mit den Bereichen History, Practices, Styles, Formats, Techniques, Characters, Street Art, Writers & Crews, Glossary und Letter Construction ausarbeiten.
- [ ] Navigationsmodell und Entry-Typen definieren.
- [ ] Verknüpfungen zum Piece Generator festlegen.
- [ ] Ingame-Ton, Blackbook-Ästhetik und Lesbarkeitsprinzipien als UI-Brief dokumentieren.

**Abnahme:** Ein abgestimmtes Inhaltsmodell, ein Navigationsdiagramm und mindestens fünf beispielhaft modellierte Einträge aus unterschiedlichen Kategorien.

## Phase B — Research Library

**Ziel:** Eine belastbare, quellengeführte Wissensbasis schaffen.

Arbeitspakete:
- [ ] `research/README.md` mit Methodik, Evidenzstufen und Redaktionsregeln.
- [ ] `research/NYC_GRAFFITI_HISTORY.md`.
- [ ] `research/LETTERING_STYLES.md`.
- [ ] `research/WRITERS_AND_INFLUENCES.md`.
- [ ] `research/GRAFFITI_FORMATS.md`.
- [ ] `research/VISUAL_REFERENCE_DATABASE.md`.
- [ ] `research/GLYPH_CONSTRUCTION_GUIDE.md`.
- [ ] Quellenregister mit Autor/Institution, Titel, Datum, URL und Abrufdatum.
- [ ] Offene Forschungsfragen und widersprüchliche Überlieferungen dokumentieren.

**Abnahme:** Erste kuratierte Einträge mit überprüfbaren Quellen; Fakten, Interpretation und Generator-Ableitungen sind klar getrennt. Keine bloßen Suchmaschinen-Snippets als Belege.

## Phase C — Content Pilot

**Ziel:** Eine kleine, aber qualitativ überzeugende erste Lexikon-Ausgabe erstellen.

Pilotumfang (Richtwert, kein künstliches Füllziel):
- [ ] 8–12 grundlegende Glossarbegriffe.
- [ ] 4–6 Style-Einträge.
- [ ] 4–6 Formate/Praktiken.
- [ ] 3–5 historische Stationen.
- [ ] 3–5 Personen-/Crew-Einträge, sofern belastbar recherchierbar.
- [ ] 6–10 visuelle Referenzen mit Herkunfts- und Rechtehinweisen.
- [ ] 3–5 Letter-Construction-Analysen.

**Abnahme:** Jeder veröffentlichte Eintrag besitzt eine Kurzdefinition, nachvollziehbaren Kontext, passende Verknüpfungen und Quellen. Umfang wird zugunsten von Qualität reduziert, wenn Quellenlage dünn ist.

## Phase D — Datenmodell und Content Pipeline

**Ziel:** Einträge ohne doppelte manuelle Pflege in die Spieloberfläche bringen.

Arbeitspakete:
- [ ] Stabile Entry-IDs und Slugs.
- [ ] Versioniertes Schema für Einträge, Quellen, Bilder, Relationen und Generator-Links.
- [ ] Markdown-Research als redaktionelle Quelle der Wahrheit festlegen.
- [ ] Maschinenlesbare Ingame-Datenrepräsentation definieren (z. B. JSON) und Synchronisations-/Exportweg dokumentieren.
- [ ] Schema- und Link-Validierung.
- [ ] Fehlende Pflichtfelder und nicht freigegebene Einträge erkennen.
- [ ] Bildreferenzen, lokale Assets und Lizenzstatus getrennt verwalten.

**Abnahme:** Ein Eintrag kann redaktionell gepflegt, validiert und reproduzierbar in die Ingame-Darstellung übernommen werden. Keine unabhängig gepflegten Doppelbestände.

## Phase E — Archiv UX Prototype

**Ziel:** Das Archiv als funktionierenden, spielnahen Prototyp erlebbar machen.

Arbeitspakete:
- [ ] Archiv-Startseite.
- [ ] Kategorien und Suche.
- [ ] Eintragsdetail mit Definition, Visual, Merkmalen, Kontext, Quellen und verwandten Einträgen.
- [ ] Filter und Alias-Suche.
- [ ] Zurück-/Vorwärtsnavigation und keine Sackgassen.
- [ ] Favoriten / persönliche Sammlung (optional im ersten Prototyp).
- [ ] Responsive und tastaturbedienbare Oberfläche.
- [ ] Blackbook-Optik ohne Lesbarkeit zu opfern.

**Abnahme:** Spieler kann ohne Vorwissen einen Begriff finden, verstehen, verwandte Inhalte entdecken und zur Archivübersicht zurückkehren. Der Prototyp nutzt echte Pilotinhalte, keine Platzhaltertexte.

## Phase F — Visual Learning & Discovery

**Ziel:** Wissen visuell und vergleichend erfahrbar machen.

Arbeitspakete:
- [ ] Historische Zeitleiste.
- [ ] Vergleichsansicht verwandter Styles/Formate.
- [ ] Bild-/Objektansicht mit Bildunterschrift und Herkunft.
- [ ] Beziehungsnetz / verwandte Begriffe.
- [ ] Interaktive Letter-Construction-Diagramme.
- [ ] Begriffs-Tooltips und Querverweise.

**Abnahme:** Mindestens zwei Lernpfade funktionieren: z. B. History → Style → Beispiel und Begriff → Konstruktion → Generator.

## Phase G — Piece Generator Integration

**Ziel:** Archivwissen unterstützt kreatives Arbeiten, ohne Stilrichtungen zu simplifizieren.

Arbeitspakete:
- [ ] Generator-Profile mit Archiv-IDs verknüpfen.
- [ ] Style-Einträge erklären strukturelle Merkmale und nicht nur Farb-/Effektparameter.
- [ ] Letter-Construction-Einträge können relevante Glyphen-/Anker-/Negativraumansichten öffnen.
- [ ] Aus dem Archiv in eine Generator-Studie springen.
- [ ] Aus dem Generator zurück zum passenden Wissenseintrag.
- [ ] Keine direkte Kopie identifizierbarer Signaturen oder konkreter Einzelwerke.

**Abnahme:** Mindestens drei Archiv-Einträge führen in eine sinnvolle Generator-Funktion; Verknüpfungen sind bidirektional und stabil.

## Phase H — Ingame Integration & Release

**Ziel:** Archiv in die NIGHTSHIFT-Spielwelt integrieren.

Arbeitspakete:
- [ ] Zugriff über Spielmenü / Blackbook.
- [ ] Speichern zuletzt gelesener Einträge und Favoriten.
- [ ] Optionale Entdeckungs-/Fortschrittsmechanik.
- [ ] Offline-/Ladeverhalten passend zur Spielarchitektur.
- [ ] Performance, Barrierearmut, Controller-/Tastaturbedienung.
- [ ] Inhalts- und UI-Qualitätssicherung.
- [ ] Dokumentation und Release Notes.

**Abnahme:** Archiv ist im Spiel erreichbar, performant, verständlich, inhaltlich korrekt und ohne Netzwerkverbindung mit den lokal verfügbaren Inhalten nutzbar, sofern die finale Spielarchitektur dies unterstützt.

## Priorisierung und Nicht-Ziele

### Zuerst
1. Informationsarchitektur und Quellenmethodik.
2. Forschungsbibliothek und Pilotinhalte.
3. Datenmodell.
4. einfacher funktionierender Archiv-Prototyp.

### Später
- aufwendige 3D-Inszenierung;
- umfangreiche Animationen;
- große Mengen an Biografien;
- spielmechanische Freischaltungen;
- komplexe Graph-Visualisierung.

### Nicht-Ziele
- kein oberflächlicher Wikipedia-Klon;
- kein ungeprüfter Content-Scrape;
- keine Bildersammlung ohne Rechteprüfung;
- kein künstliches Ranking von Writers;
- keine Behauptung, ein einzelner Style sei universell oder zeitlos eindeutig;
- keine reine UI-Demo ohne belastbare Inhalte.

## Release-Stufen

- **Archive 0.1 — Research & taxonomy:** Taxonomie, Quellenstandard, Beispielinhalte.
- **Archive 0.2 — Content pilot:** kuratierter, quellenbelegter Pilotbestand.
- **Archive 0.3 — Data pipeline:** versioniertes Schema und Validierung.
- **Archive 0.4 — Interactive prototype:** Suche, Kategorien, Eintragsseiten.
- **Archive 0.5 — Visual learning:** Vergleiche, Timeline, Konstruktion.
- **Archive 0.6 — Generator bridge:** bidirektionale Verknüpfungen.
- **Archive 1.0 — Ingame archive:** integrierte, getestete erste Spielversion.

## Arbeitsregel für alle KI-Agenten

Vor einer Änderung Repository und aktuelle Implementierung prüfen. Nur die kleinste sinnvolle Phase bearbeiten. Quellen und Rechte dokumentieren. Changelog aktualisieren. Tests tatsächlich ausführen und klar benennen. Keine Features als fertig melden, solange die Abnahmekriterien nicht erfüllt sind.


## Binding design and delivery documents

- [Visual & Interaction Styleguide 01](BLACKBOOK_ARCHIVE_STYLEGUIDE_01.md) — visual system, navigation, search, entry pages, timeline, scenes, diagrams, accessibility and release acceptance.
- [Joint Work Order & Delivery Plan 01](BLACKBOOK_ARCHIVE_JOINT_WORK_ORDER_01.md) — current gap audit, role split, staged sequence, gates and test matrix.

## Work completed — information architecture and content pilot
- Global historical and editorial scope is specified in [Global Editorial Framework 01](BLACKBOOK_ARCHIVE_GLOBAL_EDITORIAL_FRAMEWORK_01.md); it frames the archive from NYC emergence through regional adaptation to contemporary global practice.

The Phase A design deliverables are documented in [Information Architecture 01](BLACKBOOK_ARCHIVE_INFORMATION_ARCHITECTURE_01.md): audiences, taxonomy, facets, navigation, entry layout, learning paths, generator capability links and visual/interaction direction. A six-entry editorial draft pilot is in [Content Pilot 01](../research/BLACKBOOK_ARCHIVE_CONTENT_PILOT_01.md). The pilot is not publication-approved; claim-level source verification and image rights review remain required. Claude's implementation handoff for Archive 0.1–0.3 is [Ticket Pack Blackbook 01](CLAUDE_TICKET_PACK_BLACKBOOK_01.md).


## Work completed — source deepening and content expansion (2026-11-14)

- Added a six-record source register with source type, directly inspected scope, access date, confidence limits and rights cautions.
- Added a historical evidence map separating writing culture from institutional response, and transit-fleet milestones from the wider survival of graffiti culture.
- Added six further editorial drafts covering writing, blackbooks, Clean Train, sequential train photography, preservation networks and institutional recognition.
- Added archive regression test cases for content accuracy, evidence provenance, rights, search, navigation and capability-gated generator links.
- These documents are research/editorial/test-design deliverables. They do not mean the archive UI, data pipeline or tests have been implemented or executed. Archive entries remain drafts.



## Research expansion — Martha Cooper and German writing history

The research library now includes dedicated dossiers for Martha Cooper's documentary work and the Martha Cooper Library, German regional scene history with emphasis on Dortmund/Ruhrgebiet, and an attributed German writers/crews starter register. This expands the archive beyond a predominantly New York-to-Europe narrative.

Key editorial requirements:
- treat Germany as a network of regional scenes, not a single style;
- give Dortmund Style and Ruhrgebiet history their own timeline and visual study;
- distinguish Too Strong (music group), Silo Nation (hip-hop community/network and jam culture), ATOM ONE / Der Lange and Pure Doze / DOZE (separate people);
- distinguish DAIM's three-dimensional letterform exploration from Ma'Claim's photorealistic aerosol/character work;
- use Martha Cooper's photographs as documentary evidence only with item-level attribution and rights review.

The new dossiers are research drafts and do not constitute a complete national history or an image licence.



## German scene content pilot

Added nine further editorial draft entries and twelve German-scene regression fixtures. The entries distinguish regional lettering tendencies, writers, music groups, crews, community networks and research institutions. They remain drafts pending source-level editorial review; no image reproduction rights are implied.



## Additional German scene coverage

The next research increment adds Stylefile as publication infrastructure, 1UP and Berlin Kidz as distinct crew/media records, MOSES & TAPS as an evolving artist collective, and dedicated records for LOOMIT, OZ and CAN2. DARKO, VANDALZ and THE FÖNS remain unresolved pending stronger identification and primary sources. Ten additional QA cases protect these distinctions.



---

## 1.0 scope cap — binding from 2026-11-14

The earlier phases A–H describe the long-term archive vision. They are not all required for the first release. For NIGHTSHIFT 1.0, follow [Final Roadmap and Joint Work Order 01](FINAL_ROADMAP_AND_WORK_ORDER_01.md): deliver a curated 25–35-entry MVP, two learning paths, validated search/navigation, source and rights metadata, offline bundled content, original or cleared visuals, and links to at least three relevant editor studies. Full encyclopedia coverage, complex graph visualization, progression systems and exhaustive biographies are deferred. This cap prevents the archive from keeping the editor release open indefinitely.
