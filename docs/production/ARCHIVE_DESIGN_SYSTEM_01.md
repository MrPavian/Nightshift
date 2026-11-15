# THE BLACKBOOK ARCHIVE — Designsystem 01

**Status:** gestalterische Grundlage / Umsetzungsspezifikation  
**Geltungsbereich:** globale Archivoberfläche, Artikel, Lernpfade, Timeline, Szenen, Quellen- und Bildansichten  
**Sprache:** de-DE  
**Priorität:** P0 für konsistente UI-Umsetzung

## 1. Gestalterische Leitidee

Das Archiv ist ein redaktionelles Kulturarchiv mit visueller Kompetenz. Es soll sich anfühlen wie ein sorgfältig kuratiertes digitales Blackbook, verbunden mit einem modernen Forschungs- und Magazininterface.

Es ist:
- dunkel, ruhig, hochwertig und kontrastreich;
- typografisch präzise statt dekorativ überladen;
- visuell eigenständig, aber nicht nostalgisch verkleidet;
- quellenbewusst und transparent;
- zugänglich für Einsteiger, ohne Fachlichkeit für Kenner zu verwässern.

Nicht-Ziele:
- kein generisches Admin-Dashboard;
- kein Wiki mit endlosen Textwänden;
- kein schwarzer Hintergrund mit wahllosen Graffiti-Schriften;
- kein Grunge-/Sprühnebel-/Neon-Dekor als Ersatz für Informationsdesign;
- keine pseudo-akademischen Badges oder nichtssagenden Scores.

## 2. Farbrollen

Die folgenden Werte sind Starttokens und müssen in echten Screenshots auf Kontrast geprüft werden. Sie sind keine unantastbare Markenentscheidung.

| Token | Startwert | Verwendung |
|---|---|---|
| `--bba-bg` | `#111214` | globale Grundfläche |
| `--bba-surface` | `#181A1D` | Karten und Panels |
| `--bba-surface-raised` | `#202327` | aktive / angehobene Flächen |
| `--bba-text` | `#F0EEE8` | Haupttext |
| `--bba-text-muted` | `#B9BBB7` | Sekundärtext |
| `--bba-text-subtle` | `#929691` | Metadaten, nur bei ausreichendem Kontrast |
| `--bba-border` | `#41454A` | Trennlinien und Konturen |
| `--bba-accent` | `#D6F34A` | Fokus, aktive Auswahl, gezielte Interaktion |
| `--bba-danger` | `#E07878` | Fehler / problematische Zustände |
| `--bba-warning` | `#E7B95C` | Prüfung offen / Unsicherheit |
| `--bba-success` | `#83C99A` | geprüfter Zustand, sparsam |

Akzentfarbe nicht für lange Textabschnitte oder dekorative Flächen verwenden. Statusfarben nie als alleinige Information einsetzen; immer Text/Icon ergänzen.

## 3. Typografische Hierarchie

- **Display / H1:** prägnant, kompakt, editorial; keine Graffiti-Font als UI-Schrift.
- **H2/H3:** klare Inhaltsgliederung, moderate Gewichtung.
- **Body:** gut lesbare neutrale Sans-Serif mit angenehmer Zeilenlänge.
- **Meta:** Datum, Ort, Autor, Quelle, Evidenzstatus; kleiner, aber weiterhin lesbar.
- **Technical / ID:** Monospace nur für IDs, Datenwerte und technische Kennungen.

Originale Lettering-Beispiele gehören in Diagramme und Lerninhalte, nicht in Navigation oder Fließtext.

Zeilenlänge für längere Artikel auf ca. 65–80 Zeichen begrenzen. Fließtext nicht unnötig eng setzen. Schriftgrößen responsiv über zentrale Tokens steuern.

## 4. Raster und Abstände

- Einheitliches 4-/8-Punkt-Abstandssystem.
- Desktop: zentrierter Inhaltsrahmen; Artikeltext schmaler als visuelle Übersichten.
- Große Übersichten dürfen breiter werden als der Lesetext.
- Kartenraster flexibel; keine starren Dreispaltenlayouts auf kleinen Displays.
- Konsistente Außenränder und vertikale Rhythmik über alle Seitentypen.
- Echte Hierarchie durch Raum und Typografie statt durch viele Rahmen.

## 5. Globale Komponenten

### Header
- Archivmarke / Wortmarke links.
- Deutsche Hauptnavigation.
- Globale Suche.
- Aktiver Navigationspunkt eindeutig, aber ruhig markiert.
- Mobil: zugängliches Menü, Suche weiterhin erreichbar.

### Breadcrumb
- Zeigt Position in Themen- und Lernhierarchie.
- Auf kleinen Displays darf die mittlere Hierarchie gekürzt werden, nicht aber der aktuelle Seitentitel.

### Karten
- Einheitliche Innenabstände, Radius und Hover-/Fokusverhalten.
- Karten nur einsetzen, wenn sie echte eigenständige Inhalte oder Auswahlmöglichkeiten repräsentieren.
- Kein Button-Look für reine redaktionelle Vorschauen.

### Quellen- und Evidenzpanel
- Quelle, Autor/Institution, Datum, Quellentyp und Fundstelle.
- Claim-Evidenz, redaktioneller Freigabestatus und Bildrechte strikt getrennt.
- Unsicherheit sprachlich erklären; keine bloße Farbe oder Zahl.
- Direkter Link zur Quelle, wenn verfügbar.

### Statusdarstellung
Mindestens folgende unabhängige Dimensionen:
- Evidenz: ungeprüft / teilweise geprüft / geprüft / widersprüchlich;
- Redaktion: Entwurf / in Prüfung / freigegeben / zurückgezogen;
- Rechte: ungeklärt / Link-only / lizenziert / eigene Produktion / gesperrt.

Nicht zu einem einzigen „Qualitäts-Badge“ zusammenziehen.

## 6. Seitentypen

### Artikel
- Titel, Kurzbeschreibung, Themenzuordnung, Ort/Zeitraum bei Relevanz.
- Inhaltsübersicht bei längeren Artikeln.
- klar gegliederter Fließtext.
- visuelle Beispiele nur mit geklärten Rechten oder als eigene Diagramme.
- Quellen-/Belegabschnitt mit Claim-Zuordnung.
- verwandte Einträge mit Relationstyp.

### Lernansicht
- ein klar benanntes Lernziel;
- interaktives Diagramm als Schwerpunkt;
- sichtbare Schritte und Fortschritt;
- Begriffe und Quellen;
- statischer Fallback.

### Timeline
- parallele regionale Bahnen, wenn Ereignisse gleichzeitig in verschiedenen Szenen stattfinden;
- Datumsgenauigkeit und Unsicherheit direkt am Ereignis erklären;
- Ereignisse nicht künstlich auf ein exaktes Jahr zwingen;
- Filter und Detailansicht müssen zusammenarbeiten.

### Szenenseite
- regionale Einführung und Zeitrahmen;
- belegte Akteure/Orte/Medien nur mit Quellen;
- lokale Begriffe und ihre Varianten;
- Querverbindungen zu anderen Szenen;
- keine stereotype oder vollständige Crewkarte vortäuschen.

## 7. Interaktionsstandard

- sichtbarer Hover-, Fokus-, Aktiv- und Deaktiviert-Zustand;
- Tastatursteuerung und Touch gleichwertig;
- Fokus nicht nur über Farbe anzeigen;
- keine Hover-only-Inhalte;
- jede Aktion hat verständliche Rückmeldung;
- Back/Forward und Deep Links erhalten den Kontext;
- leere Such- und Filterergebnisse erklären, wie man weiterkommt.

## 8. Responsive Leitlinien

Die folgenden Breiten sind Testziele, keine starren CSS-Vorgaben:
- Smartphone: 360–430 px;
- Tablet: 768–1024 px;
- Desktop: 1280–1600 px.

Auf Smartphone:
- Navigation kompakt;
- Einspaltenfluss;
- Quellenpanel einklappbar, aber leicht auffindbar;
- Diagramme skalieren oder erhalten eine kontrollierte eigene Zoom-/Scrollfläche;
- keine horizontale Seitenüberbreite.

Auf Tablet:
- zweispaltige Ansichten nur, wenn Diagramm und Erklärung lesbar bleiben;
- Bedienelemente ausreichend groß.

Auf Desktop:
- großzügige Editorial-Komposition;
- Lesetext und Metadaten nicht über die gesamte Bildschirmbreite strecken.

## 9. Barrierefreiheit und Bewegung

- WCAG 2.2 AA als Ziel;
- Kontrastwerte automatisiert und manuell prüfen;
- semantische Überschriften und Landmarks;
- zugängliche Namen für Bedienelemente;
- sichtbarer Fokus;
- vollständige Tastaturbedienung;
- Reduced Motion respektieren;
- Farbe nie als einziges Signal;
- SVG-Beschriftungen und Textalternative;
- Screenreader-Statusmeldungen für dynamische Ergebnisse.

## 10. Technische Umsetzung

Claude muss zuerst den tatsächlichen Stack und vorhandene Tokens/Komponenten im aktuellen Branch untersuchen. Keine zweite Designsystem-Schicht und keine neue UI-Bibliothek einführen, wenn bereits geeignete Grundlagen existieren.

- zentrale CSS Custom Properties / Theme Tokens;
- wiederverwendbare Komponenten;
- keine Inline-Farbwerte, wenn ein Token existiert;
- Zustände zentral und nachvollziehbar;
- Komponenten mit dokumentierten Props und Beispielen;
- keine externen Runtime-Abhängigkeiten, die Offline-Nutzung brechen;
- visuelle Regression-Proofs für zentrale Seitentypen.

## 11. Abnahme

- [ ] Header, Suche, Navigation und Breadcrumb konsistent
- [ ] Artikel, Lernansicht, Timeline und Szenenseite nutzen dasselbe System
- [ ] deutsche UI vollständig
- [ ] Farben und Typografie auf Kontrast geprüft
- [ ] Smartphone, Tablet und Desktop geprüft
- [ ] Tastatur und Touch geprüft
- [ ] Statusdimensionen getrennt
- [ ] keine toten Bedienelemente
- [ ] kein unnötiges Grunge-/Neon-Dekor
- [ ] Screenshots der zentralen Seitentypen vorhanden

## 12. Referenz

Das Mockup der Lettering-Lernansicht ist eine Art-Direction-Referenz für dunkle Editorial-Oberfläche, klare Typografie, dezente Akzentfarbe und diagrammzentrierte Komposition. Es definiert nicht allein das gesamte Archivlayout. Die bestehende freigegebene Styleguide-Spezifikation bleibt zu prüfen und bei Konflikten vorrangig.
