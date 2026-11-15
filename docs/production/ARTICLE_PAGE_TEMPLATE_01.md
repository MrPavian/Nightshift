# THE BLACKBOOK ARCHIVE — Artikelvorlage 01

**Auftrags-ID:** BBA-ARTICLE-TEMPLATE-01  
**Status:** Produktionsspezifikation / Referenzseitentyp  
**Sprache:** de-DE  
**Zweck:** Wiederverwendbare redaktionelle Detailseite für Lexikoneinträge

## 1. Produktziel

Die Artikelseite ist kein linearer Wiki-Text. Sie ist eine redaktionelle Wissensseite, die eine Frage verständlich beantwortet und danach Wege in die Tiefe anbietet: Begriffe, Zeitkontext, regionale Bezüge, visuelle Erklärungen, Quellen und verwandte Einträge.

Einsteiger sollen in 30 Sekunden die Grundidee verstehen. Fortgeschrittene sollen Quellen, Differenzierungen und Querverbindungen ohne Umwege erreichen.

## 2. Seitenaufbau

### A. Kopfbereich
- Breadcrumb mit deutscher Navigation.
- Inhaltstyp / Themenachse als schlichte Metadatenzeile.
- H1 mit präzisem Begriffstitel.
- Ein-Satz-Definition / Kurzbeschreibung.
- Metadaten: Zeitraum nur wenn belegt; Orte nur wenn relevant; redaktioneller Status nicht mit Evidenzstatus vermischen.
- Inhaltsnavigation für lange Artikel.

### B. Schnellverständnis
Ein kompakter Abschnitt „Kurz erklärt“ mit:
- Definition in 1–3 Sätzen;
- „Nicht verwechseln mit“ – maximal drei relevante Abgrenzungen;
- ein prägnantes Originaldiagramm oder eine eigens erstellte Illustration, falls diese wirklich etwas erklärt.

Keine großen Zusammenfassungs-Karten ohne Mehrwert.

### C. Hauptartikel
- redaktionelle Abschnitte mit sprechenden deutschen Zwischenüberschriften;
- pro Abschnitt eine Kernaussage;
- Fachbegriffe beim ersten Auftreten erklären und mit Glossarziel verknüpfen;
- keine künstliche Pflicht zu einer Timeline oder Illustration, wenn der Gegenstand das nicht hergibt;
- Claim-IDs intern erhalten und Quellenzuordnung nicht verlieren.

### D. Visuelle Einordnung
Je nach Thema eine passende Form:
- Diagramm / Schichtenansicht;
- Vergleich von Begriffen;
- Karte / regionale Verteilung;
- Zeitleiste;
- Material- oder Objektansicht.

Visualisierungen müssen eine konkrete Aussage erklären. Keine dekorativen Platzhalter. Rechte und Herkunft getrennt dokumentieren.

### E. Zeit- und Ortskontext
Nur bei historischer oder regionaler Relevanz anzeigen.
- Zeitangaben mit Genauigkeitsgrad (Jahr, Zeitraum, circa, undatiert).
- Mehrere regionale Entwicklungen parallel statt in eine globale Einheitschronologie zwingen.
- Erinnerungsberichte, Medienereignisse, Archivbelege und Forschungsergebnisse als unterschiedliche Quellentypen kenntlich machen.
- Bei fehlender Datierung klar „nicht genau datiert“ anzeigen.

### F. Begriffsnetz
- verwandte Begriffe mit Beziehungstyp: „ist Teil von“, „wird unterschieden von“, „steht in Beziehung zu“, „wird regional verwendet in“.
- keine bloße Tag-Cloud.
- maximal 3–6 priorisierte Verknüpfungen, weitere bei Bedarf.
- Begriffskanten müssen redaktionell begründet sein.

### G. Quellen und Belege
Jede Quelle zeigt:
- Autor / Institution;
- Titel;
- Publikation / Herausgeber;
- Jahr;
- Quellentyp;
- konkrete Seiten-, Abschnitts- oder Zeitmarke, wenn vorhanden;
- Link / DOI;
- Aussagebereich und Einschränkung.

Quellen nicht nur als unsortierte Linkliste darstellen. Für zentrale Aussagen sollte erkennbar sein, welche Quelle sie stützt. Widersprüche und unterschiedliche Perspektiven bleiben sichtbar.

### H. Weiter entdecken
- verwandte Artikel;
- passende Lernansicht;
- passende Szenen- oder Timeline-Seite;
- keine automatisch generierten irrelevanten Empfehlungen.

## 3. Seitentypen und optionale Module

Nicht jeder Artikel muss alle Module enthalten. Die Inhaltsstruktur entscheidet:
- Definition / Kurz erklärt: Pflicht.
- Haupttext: Pflicht.
- Abgrenzung / Nicht verwechseln: wenn begrifflich sinnvoll.
- visuelle Erklärung: wenn sie Erkenntnis schafft.
- Timeline: nur bei belastbarem Zeitverlauf.
- Orts-/Szenenbezug: nur bei belegtem regionalem Kontext.
- Begriffsnetz: mindestens zwei echte Relationen, wenn vorhanden.
- Quellen: Pflicht.
- Rechteinformationen: bei visuellen Assets immer; bei Quellenabbildungen sichtbar.
- verwandte Inhalte: nur redaktionell passende Ziele.

## 4. Interaktionsanforderungen

- Inhaltsnavigation springt zu Abschnitten und zeigt den aktuellen Abschnitt.
- Fachbegriffe öffnen eine zugängliche Kurzdefinition; auf Touch nicht nur Hover.
- Diagramme besitzen Layer- oder Detailsteuerung nur, wenn diese Zustände inhaltlich verschieden sind.
- Quellen lassen sich öffnen; Fundstellen sind direkt auffindbar.
- Timeline- oder Kartenmodule synchronisieren Filter und Detailansicht.
- „Zurück nach oben“ erscheint erst bei längeren Seiten und ist tastaturzugänglich.
- keine Fake-Buttons, nicht funktionierende Filter oder nicht verlinkte Begriffskarten.

## 5. Responsive Verhalten

**Desktop:** schmaler Lesekanal, optionaler Inhaltsindex, breite Visualisierungen, Quellen in gut lesbaren Einheiten.

**Tablet:** Inhaltsindex kann oberhalb oder als aufklappbare Navigation erscheinen; Visualisierungen bleiben lesbar.

**Smartphone:** einspaltig, Inhaltsindex einklappbar, Quellen untereinander, keine horizontale Seitenüberbreite. Diagramme dürfen eine eigene kontrollierte Vergrößerungsansicht erhalten.

## 6. Datenmodell — Mindestfelder

- `id`
- `title_de`
- `short_definition_de`
- `primary_axis`
- `secondary_axes[]`
- `body_sections[]`
- `terms[]`
- `related_entries[]` mit Relationstyp
- `claims[]` mit Quellenreferenzen und Einschränkungen
- `sources[]` mit vollständigen Metadaten und Fundstellen
- `timeline_items[]` optional, mit Datumsgenauigkeit und Quellentyp
- `places[]` optional
- `visual_assets[]` mit Urheber, Lizenz, Herkunft und Freigabestatus
- `editorial_status`
- `evidence_status`
- `rights_status`

Die drei Statusdimensionen bleiben unabhängig. Kein einzelner „verified“-Schalter darf sie ersetzen.

## 7. Technische Leitplanken

Vor Umsetzung den bestehenden Datenvertrag und Komponentenbestand prüfen. Keine parallele Artikelarchitektur erfinden, wenn bereits ein Schema existiert. Fehlende Felder als Migrationsvorschlag dokumentieren und abstimmen.

- Daten und Darstellung trennen.
- Artikelmodule aus strukturierten Daten rendern.
- Deep Links zu Abschnitten und Begriffen stabil halten.
- Quellenlinks mit verständlichen Linknamen.
- semantische Überschriften, Landmarken, Fokusführung und Tastaturbedienung.
- statischer Fallback für wesentliche Inhalte.
- Performance: lange Seiten nicht mit unnötigen Animationen belasten.

## 8. Abnahmekriterien

- [ ] Grunddefinition innerhalb von 30 Sekunden erfassbar.
- [ ] Artikeltext und Quellenbelege klar zugeordnet.
- [ ] Fachbegriffe erklärbar und verknüpft.
- [ ] Optionale Module nur bei echtem inhaltlichem Nutzen.
- [ ] Verwandte Einträge mit begründeten Relationstypen.
- [ ] Desktop, Tablet und Smartphone geprüft.
- [ ] Tastatur, Touch, Fokus und Screenreader-Grundstruktur geprüft.
- [ ] alle sichtbaren Texte Deutsch.
- [ ] Evidenz, Redaktion und Rechte getrennt dargestellt.
- [ ] keine Platzhalter oder toten Kontrollen.
- [ ] Screenshots und Testbericht vorhanden.
