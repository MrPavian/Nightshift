# NIGHTSHIFT / THE BLACKBOOK ARCHIVE — Produktionsstandard 01

**Status:** verbindlicher Arbeitsstandard für neue Claude-Aufträge  
**Sprache:** de-DE für alle sichtbaren Inhalte  
**Geltungsbereich:** Archiv, Lernansichten, Diagramme, UI, Generator-nahe Visualisierungen

## 1. Grundsatz

Kein größerer Auftrag startet nur mit einer vagen Textbeschreibung. Er erhält – soweit passend – ein visuelles Ziel, eine technische Spezifikation und überprüfbare Abnahmekriterien. Referenzbilder erklären die gewünschte Wirkung; sie ersetzen weder Quelldateien noch funktionsfähige Komponenten.

## 2. Zielbild

THE BLACKBOOK ARCHIVE ist ein hochwertiges digitales Kultur- und Wissensarchiv über Graffiti-Writing. Es verbindet redaktionelle Tiefe, regionale Genauigkeit, visuelle Lehre und nachvollziehbare Quellenarbeit. Es ist weder ein gewöhnliches Wiki noch ein dekoratives Graffiti-Moodboard.

Gestalterische Leitlinien:
- redaktionell, präzise, ruhig und selbstbewusst;
- dunkle, zurückhaltende Grundoberfläche als Ausgangspunkt; helle Leseflächen für lange Texte sind zulässig, sofern Kontrast und Lesekomfort gewinnen;
- klare typografische Hierarchie, großzügige Abstände und konsistentes Raster;
- wenige, gezielte Akzentfarben; Akzentfarbe kennzeichnet Interaktion oder Status, nicht Dekoration;
- echte Archiv-/Editorial-Anmutung: Quellen, Datierungen, Unsicherheiten und Rechte sichtbar machen;
- originelle, eigens erstellte Writing-Beispiele statt kopierter Pieces oder Writer-Signaturen;
- keine künstliche „Grunge“-Textur, keine beliebige Spray-Dosen-Dekoration und keine generischen Neon-Overlays.

## 3. Verbindliche Produktregeln

1. Die komplette Nutzeroberfläche ist Deutsch (de-DE). Originalbegriffe, Eigennamen, offizielle Titel und Zitate bleiben in der belegten Originalform und werden bei Bedarf erklärt.
2. Taxonomie trennt Praxis/Aktivität, Letterform-Grammatik, Kompositionsgrammatik, Werkformat/Träger, Material/Technik, kulturelle Akteure und historische Einordnung.
3. Historische Behauptung, Erfahrungsbericht, wissenschaftliche Interpretation, visuelle Beobachtung und Design-Inferenz sind unterscheidbar.
4. Quellenstatus, redaktioneller Status und Bildrechte sind unabhängige Zustände.
5. Kein sichtbares Bedienelement ohne echte Funktion. Keine Fake-Suche, Fake-Filter, Attrappen oder tote Buttons.
6. Jede interaktive Erklärung besitzt eine statische, verständliche Alternative.
7. Mobile, Touch, Tastatur, reduzierte Bewegung und sinnvolle Fokusführung werden von Anfang an berücksichtigt.
8. Keine realen Writer-Signaturen, Crew-Logos, geschützten Artworks oder erkennbaren Markenverpackungen als Vorlagen.

## 4. Produktionspaket je Auftrag

Jeder größere Auftrag enthält:
- Ziel / Nutzerproblem / Zielgruppe;
- Referenzbild oder visuelle Richtung;
- Wireframe mit relevanten Zuständen;
- Komponenten- und Datenmodell;
- Interaktionsbeschreibung inklusive Tastatur-/Touch-Verhalten;
- responsive Regeln;
- Fehler-, Leer- und Ladezustände;
- Barrierefreiheits- und Performance-Anforderungen;
- Abnahmetests mit konkreten erwarteten Ergebnissen;
- Übergabeformat: geänderte Dateien, Commit, Testbefehle, Testergebnisse, bekannte Einschränkungen.

## 5. Referenzhierarchie

Bei Konflikten gilt:
1. aktuelle explizite Projektentscheidung des Projektinhabers;
2. freigegebener Styleguide und Produktstandard;
3. auftragsspezifisches Produktionsbriefing;
4. bestehende Implementierung und ältere Notizen.

Claude muss Konflikte melden, statt stillschweigend eine Richtung zu wählen.

## 6. Qualitäts-Gates

- **G0 Inhalt:** Aussagen, Begriffe und Quellen sind fachlich sauber.
- **G1 Gestaltung:** Layout entspricht dem Briefing und bleibt lesbar.
- **G2 Funktion:** alle sichtbaren Kontrollen funktionieren.
- **G3 Responsivität:** Desktop, Tablet und Smartphone geprüft.
- **G4 Zugänglichkeit:** Tastatur, Fokus, Kontrast, Beschriftungen, Reduced Motion geprüft.
- **G5 Technik:** Tests, Build, Konsolenfehler und Datenintegrität geprüft.
- **G6 Übergabe:** Screenshots/Proofs, Commit und nachvollziehbarer Testbericht vorhanden.

Ein Auftrag ist nicht „fertig“, wenn nur G1 erfüllt ist.

## 7. Claude-Übergabeformat

Claude liefert immer:
- kurze Zusammenfassung der Umsetzung;
- Liste geänderter Dateien;
- Commit-SHA;
- ausgeführte Tests mit exakten Ergebnissen;
- nicht ausgeführte Tests samt Grund;
- bekannte Defekte und offene Entscheidungen;
- Desktop- und Mobile-Proof;
- Bestätigung, dass alle sichtbaren Texte Deutsch sind.

## 8. Definition of Done

Ein Auftrag gilt erst als abgeschlossen, wenn alle für ihn relevanten Qualitäts-Gates bestanden sind, kein Platzhalter als fertige Funktion ausgegeben wird und die Übergabe vollständig ist.
