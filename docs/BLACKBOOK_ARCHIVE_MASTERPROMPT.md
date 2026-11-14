# NIGHTSHIFT — THE BLACKBOOK ARCHIVE
## Masterprompt für Konzeption, Recherche und Implementierung

> Dieses Dokument ist der verbindliche Arbeitsauftrag für alle menschlichen und KI-Mitwirkenden, die das spielinterne Graffiti-Lexikon entwickeln.

## 1. Rolle und Auftrag

Du arbeitest als interdisziplinäres Team aus:
- Graffiti-Kultur- und Zeitgeschichtsforschung,
- Informationsarchitektur und redaktioneller Wissensaufbereitung,
- UX/UI- und Game-Design,
- Frontend-/Gameplay-Entwicklung,
- visueller Recherche und Dokumentation.

Dein Auftrag ist der Aufbau von **THE BLACKBOOK ARCHIVE**, dem im Spiel abrufbaren, visuellen und interaktiven Graffiti-Lexikon von NIGHTSHIFT.

Das Archiv soll Graffiti-Kultur verständlich, differenziert und visuell erfahrbar machen. Es ist kein beliebiges Sammelsurium von Begriffen und kein Schulbuch. Es soll sich wie ein glaubwürdiges digitales Blackbook-Archiv anfühlen.

## 2. Produktziel

Spielerinnen und Spieler können jederzeit im Spiel ein Archiv öffnen, um:
- Begriffe, Praktiken, Formate, Techniken und Stilrichtungen nachzuschlagen;
- die historische Entwicklung der New Yorker Graffiti-Szene zu entdecken;
- visuelle Beispiele und strukturelle Merkmale zu untersuchen;
- verwandte Begriffe, Epochen, Formate und Stilfamilien zu erkunden;
- zu verstehen, wie Lettering konstruiert und komponiert wird;
- passende Inhalte im Piece Generator / Blackbook Editor praktisch auszuprobieren.

Das Archiv ist sowohl Nachschlagewerk als auch Lern- und Entdeckungsraum. Es darf aber nicht voraussetzen, dass Spielerinnen und Spieler Graffiti-Vorkenntnisse haben.

## 3. Verbindliche Produktprinzipien

1. **Research before interface:** Inhalte und Taxonomie werden zuerst recherchiert und modelliert. Keine leeren UI-Kategorien als Ersatz für Wissen.
2. **One knowledge base:** Die redaktionelle Wissensbasis unter `research/` ist die Quelle der Wahrheit. Das Ingame-Lexikon ist eine Darstellung derselben Inhalte, keine zweite unabhängige Datenbank.
3. **Historical care:** Aussagen zu Ursprung, Datierung, Personen, Crews und regionalen Entwicklungen brauchen belastbare Quellen.
4. **Terminological nuance:** Begriffe können je nach Zeit, Ort und Community variieren. Unsicherheiten und Varianten werden kenntlich gemacht.
5. **Practice ≠ style ≠ format:** Aktivität/Praktik (z. B. bombing), Lettering-Stil (z. B. bubble), Format/Fläche (z. B. wholecar) und Medium/Technik (z. B. stencil) dürfen nicht in eine flache Liste geworfen werden.
6. **Visual literacy:** Eintragungen erklären nicht nur, wie etwas heißt, sondern woran man es visuell erkennt und wie es sich von ähnlichen Dingen unterscheidet.
7. **Originality:** Keine Kopie konkreter Signaturen, identifizierbarer Einzelwerke oder lebender Künstler. Aus Referenzen werden allgemeine, nachvollziehbare Gestaltungsprinzipien abgeleitet.
8. **Playable, not gamified trivia:** Spielmechanische Freischaltungen dürfen Neugier fördern, aber historische Fakten nicht verfälschen oder Kulturwissen als künstliche Belohnung entwerten.
9. **Accessible depth:** Kurze Erklärung zuerst, vertiefende Details, Quellen und verwandte Themen auf Wunsch.
10. **Honest maturity:** Unvollständige, vorläufige oder schwach belegte Inhalte werden sichtbar markiert.

## 4. Umfang und Inhaltsbereiche

Das Archiv soll mindestens folgende Bereiche abdecken:

- **History:** Entwicklung der New Yorker Szene und wichtige zeitliche Kontexte; später vergleichende internationale Entwicklungen, wenn ausreichend recherchiert.
- **Practices:** tag/handstyle, bombing, tagging, writing und weitere Praktiken.
- **Lettering styles:** unter anderem bubble/throw-up, blockbuster, straight letters, wildstyle und 3D-Ansätze; Taxonomie anhand der Recherche weiterentwickeln.
- **Formats & surfaces:** pieces, panels, wholecars, end-to-end, top-to-bottom, wall pieces und weitere Formate/Flächen.
- **Techniques & materials:** outlines, fills, fades, highlights, caps, tools, surfaces und weitere Techniken – mit sicherer, nicht-anleitender Einordnung, wo nötig.
- **Characters:** Figuren, Maskottchen und ihre Rolle in unterschiedlichen Kontexten.
- **Street art & related forms:** stencil, sticker, paste-up, mural und verwandte Ausdrucksformen; Unterschiede und Überschneidungen sorgfältig erklären.
- **Writers & crews:** historisch relevante Personen und Crews, ihre belegten Beiträge und Kontexte.
- **Glossary:** Begriffe, Slang, alternative Schreibweisen und regionale/zeitliche Varianten.
- **Visual reference archive:** kuratierte Bild- und Objektbeispiele mit Herkunft, Datum/Ort soweit bekannt, Rechtehinweisen und Analyse.
- **Letter construction lab:** Brücke zwischen Kulturwissen und Generator: Skelett, Proportion, Counter, Terminal, Anschluss, Rhythmus, Negativraum, Silhouette und Kompositionslogik.

Die Kategorien sind eine redaktionelle Startstruktur, keine Behauptung, dass alle Begriffe trennscharf oder universell verwendet werden.

## 5. Informationsarchitektur und Entry-Modell

Jeder Lexikoneintrag soll – soweit sinnvoll und belegbar – folgende Felder besitzen:

- stabile ID / Slug
- Titel und mögliche Alias-Begriffe
- Einordnung: Praxis, Stil, Format, Technik, Medium, Person, Crew, Epoche oder Begriff
- Kurzdefinition (ein bis drei Sätze)
- ausführliche Erklärung
- historischer Kontext / Zeitraum / Ort
- visuelle Erkennungsmerkmale
- Abgrenzung zu verwandten Begriffen
- typische Varianten und Terminologie-Hinweise
- Verknüpfungen zu verwandten Einträgen
- Quellen mit Autor/Institution, Titel, Datum, URL und Abrufdatum
- Evidenzstatus: gut belegt / teilweise belegt / umstritten / vorläufig
- Bildreferenzen mit Urheber/Rechteinhaber, Quelle, Rechte-/Nutzungsstatus und Bildbeschreibung
- Generator-Bezug: relevante Gestaltungsprinzipien oder Profil-/Werkzeug-Verknüpfung
- redaktioneller Status: Entwurf / geprüft / freigegeben

Nicht jedes Feld muss für jeden Eintrag gefüllt sein. Fehlende Daten werden nicht erfunden.

## 6. Quellen- und Forschungsstandard

- Bevorzuge Primärquellen, Oral Histories, Museums- und Archivbestände, wissenschaftliche Publikationen, zeitgenössische Dokumente und belastbare Interviews.
- Ergänze diese durch glaubwürdige Publikationen und Community-/Practitioner-Perspektiven.
- Verwende Suchmaschinen-Snippets nicht als alleinige Belege.
- Erfasse konkrete Quellenangaben unmittelbar am Eintrag.
- Unterscheide klar zwischen dokumentierter Tatsache, überlieferter Erzählung, fachlicher Interpretation und eigener Design-Ableitung.
- Bei widersprüchlichen Angaben: Konflikt dokumentieren, nicht stillschweigend eine Version auswählen.
- Kein erfundenes Zitat, keine erfundene Datierung, keine erfundene Zuschreibung.
- Bildrechte ausdrücklich dokumentieren. Ein öffentlich auffindbares Bild ist nicht automatisch frei nutzbar.
- Für die Spieloberfläche bevorzugt eigene, lizenzierte, gemeinfreie oder ausdrücklich freigegebene Visuals. Externe Bilder können zunächst als verlinkte Recherche-Referenzen geführt werden.

## 7. UX- und Interaktionskonzept

Das Archiv muss sich in die Welt von NIGHTSHIFT einfügen: analog inspiriertes Blackbook-Gefühl, aber klar lesbar und schnell bedienbar.

Vorgesehene Funktionen:
- Archiv-Startseite mit Suche, Kategorien und zuletzt angesehenen Einträgen;
- Volltextsuche und Filter nach Kategorie, Epoche, Ort und Status;
- Eintragsansicht mit Kurzdefinition, Visuals, Kontext, Merkmalen, verwandten Einträgen und Quellen;
- visuelle Zeitleiste für historische Entwicklungen;
- Vergleichsansicht für verwandte Stilrichtungen/Formate;
- anklickbare Begriffe und ein Beziehungsnetz;
- Favoriten / persönliche Sammlung;
- optionale Entdeckungsmarkierungen im Spiel;
- direkter Übergang in den Generator, wenn ein Eintrag dort eine konkrete Funktion unterstützt.

Die Suche muss auch bei unbekannten Begriffen hilfreiche Treffer oder verwandte Begriffe anbieten. Keine Sackgassen.

## 8. Verbindung zum Piece Generator

Die Verbindung ist ein Kernmerkmal, aber kein Grund, historische Begriffe künstlich auf Generator-Presets zu reduzieren.

Beispiele:
- Ein Style-Eintrag kann ein oder mehrere Generator-Studienprofile referenzieren.
- Ein Technique-Eintrag kann erklären, welche visuellen Ebenen/Parameter im Editor relevant sind.
- Ein Letter-construction-Eintrag kann eine interaktive Analyse eines Glyphen zeigen.
- Ein History-Eintrag kann auf zeitlich passende Beispiele und Stilentwicklungen verweisen.

Der Generator muss Originalität ermöglichen. Ein Archiv-Eintrag darf niemals die exakte Reproduktion einer konkreten Künstler-Signatur als Ziel definieren.

## 9. Technische Leitplanken

- Zuerst Repository und bestehende Architektur prüfen. Keine Frameworks, Datenbanken oder Build-Tools voraussetzen, die nicht tatsächlich existieren.
- Aktuelle Baseline ist ein eigenständiger HTML-Prototyp; Architekturentscheidungen müssen dazu passen und dokumentiert werden.
- Inhalte möglichst formatneutral und versionierbar halten. Redaktionelle Markdown-Dateien unter `research/` bleiben die Quelle der Wahrheit.
- Für die Ingame-Ausgabe eine stabile, maschinenlesbare Datenrepräsentation vorsehen (z. B. JSON), die aus der Wissensbasis abgeleitet oder synchronisiert wird. Keine doppelte manuelle Pflege.
- Schema versionieren und Einträge validieren.
- Interne IDs und Links stabil halten.
- Offline-/Ladeverhalten berücksichtigen, sobald die Spielarchitektur dies verlangt.
- Bilddateien und externe Referenzen sauber trennen; keine Hotlink-Abhängigkeit als dauerhafte Produktionslösung.
- UI, Inhalt und Suchindex logisch trennen.
- Keine erfundenen APIs, Dateipfade oder bereits vorhandenen Komponenten behaupten.

## 10. Arbeitsphasen

Arbeite in der Reihenfolge der Roadmap:
1. Produkt- und Inhaltsmodell festlegen.
2. Forschungsbibliothek und Quellenstandard etablieren.
3. Taxonomie und repräsentative Einträge kuratieren.
4. Datenmodell und Inhaltsvalidierung erstellen.
5. klickbaren Archiv-Prototyp mit echten Inhalten bauen.
6. Suche, Filter, Verknüpfungen und Visuals ergänzen.
7. Generator-Integration entwickeln.
8. Ingame-Integration, Performance, Accessibility und Qualitätssicherung.

Keine Phase gilt als abgeschlossen, nur weil ihre UI vorhanden ist. Abnahme richtet sich nach den Kriterien in `docs/BLACKBOOK_ARCHIVE_ROADMAP.md`.

## 11. Zusammenarbeit und Ausgabeformat

Vor jeder Arbeit:
- Lies `AGENTS.md`, `docs/AI_HANDOFF.md`, `docs/ROADMAP.md`, diese Masterprompt-Datei und die einschlägigen Research-Dokumente.
- Prüfe den tatsächlichen Repository-Zustand.
- Nenne die betroffene Roadmap-Phase und den konkreten Umfang.

Nach jeder substanziellen Arbeit:
- nenne geänderte Dateien;
- fasse Recherche/Implementierung zusammen;
- liste Quellen und Evidenzstatus;
- dokumentiere Tests und deren Grenzen;
- aktualisiere Changelog und relevante Dokumentation;
- benenne offene Fragen und den nächsten kleinen Schritt.

## 12. Definition of Done

THE BLACKBOOK ARCHIVE ist erst als erste spielbare Version abnahmefähig, wenn:
- eine nachvollziehbare Taxonomie und ein versioniertes Eintragsmodell existieren;
- eine kuratierte Auswahl echter, quellenbelegter Inhalte verfügbar ist;
- Einträge korrekt zwischen Praxis, Stil, Format, Technik und Medium unterscheiden;
- Suche und Navigation funktionieren;
- Quellen und Bildrechte nachvollziehbar sind;
- mindestens ausgewählte Einträge sinnvoll mit dem Generator verbunden sind;
- Inhalte auch ohne Kenntnis der Fachsprache verständlich bleiben;
- keine zentralen Inhalte oder Funktionen nur als Attrappe existieren;
- Tests, bekannte Einschränkungen und nicht belegte Bereiche dokumentiert sind.

**Leitgedanke:** Das Archiv soll Graffiti nicht auf ein paar Namen und Effekte reduzieren. Es soll die kulturelle, historische und gestalterische Vielschichtigkeit sichtbar machen – und daraus ein besseres Spiel und einen besseren Generator entstehen lassen.
