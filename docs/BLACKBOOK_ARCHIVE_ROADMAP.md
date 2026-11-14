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


## Work completed — information architecture and content pilot

The Phase A design deliverables are documented in [Information Architecture 01](BLACKBOOK_ARCHIVE_INFORMATION_ARCHITECTURE_01.md): audiences, taxonomy, facets, navigation, entry layout, learning paths, generator capability links and visual/interaction direction. A six-entry editorial draft pilot is in [Content Pilot 01](../research/BLACKBOOK_ARCHIVE_CONTENT_PILOT_01.md). The pilot is not publication-approved; claim-level source verification and image rights review remain required. Claude's implementation handoff for Archive 0.1–0.3 is [Ticket Pack Blackbook 01](CLAUDE_TICKET_PACK_BLACKBOOK_01.md).
