# BLACKBOOK ARCHIVE — Interaktive Lernansicht „Buchstaben & Verbindungen“ 01

**Status:** fachliche und UX-Spezifikation für C06  
**Sprache:** Deutsch (de-DE)  
**Ziel:** Einsteiger:innen sollen verstehen, wie Letter-Konstruktion, Innenräume und Beziehungen zwischen Buchstaben beschrieben werden können. Fortgeschrittene sollen die Begriffe als präzises Analysewerkzeug nutzen können.  
**Beispielmaterial:** ausschließlich eigens entworfene, fiktive NIGHTSHIFT-Lettern. Keine Writer-Signaturen, keine nachgezeichneten Pieces, keine aus Archivbildern extrahierten Formen.

## 1. Lernziel und didaktischer Grundsatz

Die Ansicht vermittelt keine Schritt-für-Schritt-Anleitung zum Kopieren eines bestimmten Styles. Sie zeigt, dass dieselben zwei fiktiven Buchstaben auf unterschiedliche Weise konstruiert und komponiert werden können.

Lernende sollen am Ende unterscheiden können:
- Grundgerüst und aufgebaute Lettermasse;
- Buchstabenform und Darstellungseffekt;
- Innenraum und Zwischenraum;
- Berührung, Überlappung, Verschränkung und Verschlingung;
- beobachtbare Formmerkmale und interpretierende Begriffe wie Rhythmus oder Flow.

Die Oberfläche darf keine Rangfolge „einfach → fortgeschritten“ suggerieren, in der maximale Verbindung oder Komplexität als Ziel gilt. Freistehende Lettern sind eine gleichwertige Kompositionsentscheidung.

## 2. Aufbau der Ansicht

### Desktop
- Hauptfläche: großes, zentriertes SVG-/Canvas-Diagramm mit zwei fiktiven Buchstaben.
- Linke Spalte: Lernschritte und kurze Erklärungen.
- Rechte Spalte: Ebenen-Schalter und Beziehungsauswahl.
- Unter dem Diagramm: „Was verändert sich?“ mit zwei bis drei konkreten Beobachtungen.
- Quellen- und Begriffshinweise dauerhaft erreichbar, nicht nur per Hover.

### Mobil
- Diagramm zuerst, über die verfügbare Breite skaliert.
- Darunter Lernschritte als horizontale, scrollbar beschriftete Leiste oder vertikale Schrittfolge.
- Ebenen-Schalter als gut erreichbare Schaltflächen mit Textlabels.
- Keine Hover-Pflicht; alle Funktionen per Touch und Tastatur bedienbar.
- Keine wichtigen Details ausschließlich über Farbe codieren.

### Kanonische deutsche UI-Texte
- Titel: **Buchstaben bauen und verbinden**
- Intro: **Zwei erfundene Buchstaben. Viele Möglichkeiten, sie als Wort zu komponieren.**
- Ebenen: **Grundgerüst · Letterform · Innenräume · Verbindungen · Zusätze · Darstellung**
- Beziehungen: **Freistehend · Annäherung · Berührung · Überlappung · Verschränkung · Verschlingung**
- Aktionen: **Zurücksetzen · Vorher vergleichen · Nächster Schritt**
- Hinweise: **Begriff aus der Formanalyse** / **Beobachtung aus dem Ruhrgebiet-Korpus** / **NIGHTSHIFT-Beispiel – keine historische Vorlage**

## 3. Lernpfad: sieben aufeinander aufbauende Ansichten

### Schritt 1 — Das Grundgerüst
Zeige pro Buchstabe eine reduzierte Mittellinien-/Skelettdarstellung. Keine Füllung, keine Outline-Effekte.
Erklärung: „Das Grundgerüst ist ein Analysemodell. Es macht den Verlauf der Form sichtbar, ist aber nicht automatisch die tatsächliche Arbeitsweise eines Writers.“

### Schritt 2 — Die Letterform
Blende die fiktive Lettermasse ein. Das Grundgerüst bleibt als optionale, dezente Orientierung sichtbar.
Erklärung: „Aus einem Verlauf wird eine Fläche mit Breite, Gewicht und Kontur. Unterschiedliche Konstruktionen können dieselbe Buchstabenidentität unterschiedlich interpretieren.“

### Schritt 3 — Innenräume und Öffnungen
Markiere Counter und Aperture. Zeige mindestens einen geschlossenen Innenraum und eine offene Form. Verändere keine Letter, ohne die Auswirkung auf den Innenraum sichtbar zu machen.
Erklärung: „Freie Flächen gehören zur Form. Werden Balken verbreitert oder Teile verbunden, können Innenräume enger werden oder verschwinden.“

### Schritt 4 — Zwei Lettern, ein Wort
Zeige beide Lettern zunächst mit deutlichem Abstand. Markiere den Zwischenraum als eigene Fläche.
Erklärung: „Ein Wort besteht nicht nur aus Buchstaben. Auch die freien Bereiche zwischen ihnen prägen Rhythmus und Gesamtform.“

### Schritt 5 — Beziehung auswählen
Erlaube die Auswahl der sechs Beziehungen aus Abschnitt 2. Jede Auswahl verändert ausschließlich die Anordnung/Beziehung, nicht automatisch den Letterstil.
- Freistehend: klarer Abstand.
- Annäherung: geringer Abstand ohne Kontaktschnitt.
- Berührung: Konturen treffen sich punktuell oder entlang einer kurzen Kante.
- Überlappung: Formen teilen einen Bildbereich; beide Letter bleiben nachvollziehbar.
- Verschränkung: Teile greifen ineinander; Front-/Back-Reihenfolge ist sichtbar.
- Verschlingung: die Grenze der Buchstaben wird schwerer zu verfolgen; dies ist ein Extrem der Verflechtung, kein Qualitätsziel.

### Schritt 6 — Zusätze
Blende ein bis zwei eigens entworfene, neutrale Extensions oder grafische Zusätze ein. Schalte sie unabhängig von der Grundkonstruktion.
Erklärung: „Eine Extension kann Bewegung oder Verbindung erzeugen. Ein Zusatz ist nicht automatisch Teil des Buchstabenskeletts.“

### Schritt 7 — Darstellung
Zeige Outline, Inline, Schatten und 3D als separate Ebenen. Die Letterform bleibt darunter unverändert.
Erklärung: „Darstellungseffekte verändern die visuelle Wirkung, nicht rückwirkend die Buchstabenkonstruktion.“

## 4. Interaktion und Zustandsmodell

Die Lernansicht braucht nur wenige, verständliche Zustände:
- `step`: 1–7;
- `relation`: freistehend | annäherung | berührung | überlappung | verschränkung | verschlingung;
- `layers`: unabhängige boolesche Werte für grundgeruest, letterform, innenraeume, verbindungen, zusätze, outline, inline, schatten, dreid;
- `showComparison`: vorher/nachher;
- `showLabels`: Beschriftungen an/aus.

Regeln:
1. Schrittwechsel darf den ausgewählten Beziehungstyp nicht unbemerkt ändern.
2. „Zurücksetzen“ stellt den definierten Ausgangszustand wieder her.
3. „Vorher vergleichen“ zeigt eine direkte A/B-Gegenüberstellung; keine automatisch animierte Bewegung als einzige Erklärung.
4. Jede interaktive Formänderung hat eine textliche Erklärung.
5. Die Auswahl eines Verbindungstyps darf die Letter-Identität nicht unbemerkt austauschen.
6. Keine zufällige Geometrie bei jedem Rendern; das Lehrbeispiel muss deterministisch sein.

## 5. Diagrammgestaltung und visuelle Codierung

- Ruhige, hochwertige Archivästhetik; klare Flächen, präzise Linien, ausreichend Weiß-/Negativraum.
- Keine Sprühdosen-Texturen, Beton-Hintergründe, Fake-Grunge oder dekorative Graffiti-Schrift für die UI.
- Die Buchstaben selbst dürfen charaktervoll und eigens gestaltet sein, müssen aber klar als fiktives Lehrmaterial gekennzeichnet sein.
- Grundgerüst, Lettermasse, Innenräume, Verbindung und Zusatz erhalten jeweils eine konsistente visuelle Codierung.
- Farbe immer mit Kontur, Muster oder Beschriftung ergänzen; barrierefreie Unterscheidbarkeit prüfen.
- Beschriftungen direkt am Diagramm und zusätzlich in einer Textlegende ausgeben.
- SVG muss auf kleinen Displays skalieren, ohne Linien oder Labels abzuschneiden.

## 6. Barrierefreiheit und Bedienbarkeit

- Vollständige Tastaturbedienung mit sichtbarem Fokus.
- Semantische Buttons/Schalter; korrekte Zustandsansagen für Screenreader.
- Diagramm erhält eine kurze Textalternative und eine ausführliche Beschreibung der aktuellen Auswahl.
- Bewegungen respektieren `prefers-reduced-motion`; Animationen sind optional und nie die einzige Informationsquelle.
- Touch-Ziele ausreichend groß; kein Drag-only-Workflow.
- Kontrast für Labels, Konturen und Fokuszustände testen.
- Beziehungsauswahl als Radio-Gruppe oder gleichwertig zugängliches Muster.
- Aktueller Schritt und Gesamtfortschritt als Text ausgeben („Schritt 3 von 7“).

## 7. Quellen- und Evidenzdarstellung

Ein kleiner Quellenhinweis erklärt, dass die Kategorien der Buchstabenbeziehungen aus einer wissenschaftlichen Analyse von Graffiti-Tags im Ruhrgebiet stammen. Die Beispiele im Diagramm sind hingegen eigens für NIGHTSHIFT konstruiert.

Primärbezug:
- Irmi Wachendorff, Evelyn Ziegler und Ulrich Schmitz (2017), „Graffitiscape im Ruhrgebiet“, in: *Graffiti: Deutschsprachige Auf- und Inschriften in sprach- und literaturwissenschaftlicher Perspektive*, S. 154–208, besonders Abschnitt 3.4 und Tabelle 2.
- Die Studie beschreibt ein Korpus von 4.680 Tags im Metropolenzeichen-Projekt. Ihre Kategorien der mesoskripturalen Buchstabenkomposition umfassen frei flottierende Buchstaben, Einzellettern ohne Überlagerung, Berührung, Überlappung, Verschränkung und Verschlingung. Diese Systematik ist ein analytisches Inventar für diesen Korpus, keine universelle Szenen-Taxonomie.
- Die Studie unterscheidet vier Beschreibungsebenen: para-, makro-, meso- und mikroskriptural. Für die Lernansicht sind insbesondere Materialität/Zeichenträger, Zusätze und Ausrichtung, Buchstabenanordnung sowie einzelne Buchstabenmerkmale relevant.

Online-Volltext: https://www.academia.edu/29423054/Wachendorff_Irmi_Ziegler_Evelyn_Schmitz_Ulrich_2017_Graffitiscape_im_Ruhrgebiet_In_Lieb_Ludger_M%C3%BCller_Stephan_Tophinke_Doris_Hg_Graffiti_Deutschsprachige_Auf_und_Inschriften_in_sprach_und_literaturwissenschaftlicher_Perspektive_Wien_Pr%C3%A4sens_154_208

Weitere konzeptionelle Bezüge:
- Daniel Berio (2021), *AutoGraff*, zur computationalen Beschreibung von Graffiti-Letterformen und Strich-/Formbausteinen.
- Lisa Gottlieb (2006), zur systematischen Bildanalyse und den Grenzen konsistenter Stilklassifikation.

## 8. Inhaltliche Akzeptanzkriterien

- [ ] Das Diagramm verwendet zwei eindeutig fiktive NIGHTSHIFT-Buchstaben.
- [ ] Grundgerüst und Lettermasse sind getrennt schaltbar.
- [ ] Counter/Aperture und inter-letter negative space sind unterscheidbar.
- [ ] Alle sechs Beziehungsarten sind als unterschiedliche Zustände sichtbar.
- [ ] Überlappung, Verschränkung und Verschlingung werden nicht als Synonyme dargestellt.
- [ ] Extensions/Zusätze sind nicht mit tragenden Buchstabenbestandteilen verwechselt.
- [ ] Rendering-Effekte verändern nicht die zugrundeliegende Letterform.
- [ ] Kein Stil wird als einzig richtige oder höchste Entwicklungsstufe präsentiert.
- [ ] Textalternative und Textbeschreibung stimmen mit dem aktuellen Zustand überein.
- [ ] Alle sichtbaren Texte sind Deutsch.
- [ ] Keine fremden Signaturen, Pieces oder Archivabbildungen werden reproduziert.

## 9. Technische Akzeptanzkriterien

- [ ] Deterministische SVG-/Canvas-Geometrie.
- [ ] Keine zufälligen Layoutsprünge beim Umschalten.
- [ ] Funktioniert bei schmalem Mobil-Viewport und Desktop.
- [ ] Vollständig per Tastatur und Touch bedienbar.
- [ ] Reduzierte Bewegung verfügbar.
- [ ] Keine toten Controls oder reine Hover-Funktionen.
- [ ] Statische, beschriftete Fallback-Grafik, falls Interaktivität nicht geladen werden kann.
- [ ] Quellenlink und Statushinweis sind erreichbar.

## 10. Umsetzungshinweis für Claude

Vorhandene Diagramm-/Komponentenarchitektur prüfen und wiederverwenden, statt ein paralleles UI-System zu bauen. Diese Lernansicht ist ein inhaltlich klar abgegrenztes Modul des Archivs, kein Ersatz für den allgemeinen Artikelaufbau. Vor Implementierung eine statische SVG-Proof-Ansicht liefern und gegen die Inhaltskriterien prüfen lassen. Anschließend Interaktionen ergänzen und Screenshots für Desktop und Mobile bereitstellen. Keine Produktionsfreigabe ohne bestandene deutsche UI-, Accessibility- und Inhaltsprüfung.
