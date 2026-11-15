# THE BLACKBOOK ARCHIVE — Produktionsbrief 01
## Lernansicht: Buchstaben bauen und verbinden

**Auftrags-ID:** BBA-LEARN-LETTERING-01  
**Priorität:** P1 / Referenzauftrag für den Produktionsstandard  
**Status:** an Claude zur Umsetzung übergeben, sobald Baseline abgeglichen ist  
**Sprache:** de-DE  
**Fachliche Grundlage:** `research/BLACKBOOK_ARCHIVE_ENTRY_DRAFTS_GERMAN_06.md`  
**Visuelle Referenz:** `assets/design/lettering-learning-view-master.svg` und das im Chat erzeugte Mood-/Mockup-Bild

## 1. Zweck

Eine interaktive Lernansicht vermittelt anhand eigens entwickelter, fiktiver Buchstabenformen, wie Letter-Konstruktion, Innenräume, Zwischenräume und Verbindungen analysiert werden können. Sie darf keine einzelne Konstruktionsweise als Norm verkaufen.

## 2. Gestalterisches Ziel

- Hochwertige, dunkle Editorial-Oberfläche mit warmer heller Schrift und sparsamem gelbgrünem Interaktionsakzent.
- Header mit Archivmarke, deutscher Hauptnavigation und globaler Suche.
- Breadcrumb / Lernpfad, klare H1, kurze Einführung.
- Große Diagrammfläche als visueller Schwerpunkt; Erklärtexte und Layer-Steuerung daneben.
- Siebenstufige Lernnavigation.
- Vergleichsbereich mit drei Zuständen: freistehend, Berührung, Überlappung.
- Quellen-/Einordnungsbereich am Ende.
- Kein unnötiger Deko-Grunge, keine simulierten Spray-Effekte, keine echten Writer-Referenzen.

Die Chat-Mockup-Grafik ist eine Art-Direction-Referenz, kein pixelgenaues Layout und keine technische Vorlage. Das beigefügte SVG ist ein editierbares, bewusst vereinfachtes Lehrdiagramm.

## 3. Lernablauf

1. **Grundgerüst:** vereinfachte konstruktive Linienidee.
2. **Lettermasse:** sichtbare Formfläche.
3. **Innenräume:** Counter und Öffnungen.
4. **Verbindungen:** freistehend, Annäherung/Berührung, Überlappung, Verschränkung; Verschlingung als weiterführender Zustand.
5. **Extensions:** zusätzliche Ausläufer klar vom Grundgerüst unterscheiden.
6. **Darstellung:** Kontur, Inline, Highlight, Schatten und 3D als separate Darstellungsebenen.
7. **Gesamtbild:** Wort-Rhythmus, Flow, Zwischenräume und Lesbarkeit im Kontext.

Beispielbuchstaben A und R sind eigens für diese Lehransicht zu konstruieren. Keine realen Tags oder Pieces nachzeichnen.

## 4. Funktionsanforderungen

- Layer-Schalter verändern die Diagrammfläche tatsächlich.
- Lernschritte sind einzeln anwählbar; aktueller Schritt ist klar markiert.
- Vor/Zurück-Navigation und Tastaturbedienung sind vorhanden.
- Vergleichskarten wechseln tatsächlich den dargestellten Verbindungszustand.
- Begriffe können in einer Begriffserklärung geöffnet werden; auf Touch nicht nur Hover.
- Reset stellt den definierten Anfangszustand wieder her.
- Der Zustand bleibt beim Wechsel zwischen Schritten konsistent; keine widersprüchlichen Schalter.
- Statischer Fallback zeigt die vollständige beschriftete Erklärung ohne JavaScript.
- Quellenpanel unterscheidet Forschung, Analysebegriffe und Design-Inferenz.

## 5. Nicht-Ziele

- Kein vollständiger Graffiti-Generator in dieser Ansicht.
- Kein automatisches Stil-Ranking.
- Keine Behauptung, dass Komplexität oder maximale Lesbarkeit Qualität definieren.
- Keine nachgebauten Signaturen oder Werke realer Writer.
- Keine ungesicherten historischen Erfindungs- oder Ursprungsbehauptungen.

## 6. Technische Leitplanken

Claude muss zuerst die bestehende Architektur, Frameworks, CSS-Konventionen und Komponentenbibliothek im aktuellen Branch prüfen. Keine neue Abhängigkeit hinzufügen, bevor geprüft ist, ob die vorhandene Architektur den Bedarf abdeckt.

- Diagramm als semantisches SVG mit gruppierten Layern und eindeutigen IDs.
- Layerzustände als zentrale, serialisierbare UI-State-Struktur.
- Keine CSS-only Attrappen für interaktive Funktionen.
- SVG-Labels zusätzlich textlich zugänglich machen; relevante Erklärung darf nicht nur im Bild stecken.
- Buttons mit zugänglichen Namen und sichtbarem Fokus.
- Touch-Ziele ausreichend groß; Hover ist niemals die einzige Interaktionsmöglichkeit.
- `prefers-reduced-motion` respektieren; Animationen sind optional und nicht lernkritisch.
- Responsive: breite Diagrammfläche auf Desktop; auf schmalen Viewports Diagramm und Steuerung untereinander, keine horizontale Seitenüberbreite.
- Keine externen Bild- oder Font-CDNs als Laufzeitvoraussetzung, wenn die Anwendung offline funktionieren soll.

## 7. Abnahmekriterien

1. Alle sichtbaren Texte und Bedienelemente sind Deutsch.
2. Alle sieben Schritte lassen sich per Maus, Touch und Tastatur durchlaufen.
3. Jeder Layer-Schalter ändert nur den zugehörigen Layer.
4. Verbindungsvarianten zeigen klar unterscheidbare, passende Diagrammzustände.
5. Quellen- und Einordnungsbereich ist vorhanden.
6. Statischer Fallback ist verständlich.
7. Keine realen Writer-Signaturen oder kopierten Pieces.
8. Desktop bei 1440px, Tablet bei 768px und Smartphone bei 390px ohne horizontales Scrollen geprüft.
9. Tastaturbedienung, Fokus, Kontrast und Reduced Motion geprüft.
10. Build und relevante Tests erfolgreich; Ergebnisse mit Befehlen dokumentiert.

## 8. Claude-Arbeitsfolge

A. Repository-/Branch-Baseline und vorhandene Implementierung prüfen.  
B. Plan und betroffene Dateien melden; bestehende Komponenten wiederverwenden.  
C. Statischen SVG-/HTML-Proof implementieren.  
D. Diagramm und UI mit echten Layerzuständen verbinden.  
E. Lernschritte, Vergleichszustände und Begriffserklärungen implementieren.  
F. Responsive-/Accessibility-/Offline-Prüfung.  
G. Screenshots und Testbericht liefern.

Vorhandene Arbeit nicht überschreiben oder duplizieren. Wenn eine gleichwertige Lernansicht bereits existiert, zuerst abgleichen und gezielt verbessern.

## 9. Übergabe

Commit, geänderte Dateien, Testbefehle und -ergebnisse, Desktop-/Mobile-Screenshots, offene Defekte und eine kurze Erklärung der State-/Layer-Architektur liefern.
