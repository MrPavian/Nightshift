# THE BLACKBOOK ARCHIVE — Wissensmodell und Begriffsnetz 01

**Auftrags-ID:** BBA-KNOWLEDGE-MODEL-01  
**Status:** konzeptionelle Spezifikation / redaktionelle Grundlage  
**Sprache der Oberfläche:** Deutsch  
**Zweck:** stabile Taxonomie, nachvollziehbare Artikelbeziehungen und spätere Archivnavigation

## 1. Leitprinzip

Das Archiv ist kein flacher Kategorienbaum. Graffiti-Writing ist ein kulturelles Feld, in dem Praxis, Werkform, Lettering-Grammatik, Material, Ort, Akteure, Medien und historische Prozesse miteinander verbunden sind. Ein Eintrag kann mehrere Achsen berühren, ohne dass diese Achsen zu einer einzigen Kategorie verschmelzen.

Die Navigation darf deshalb mehrere Einstiege anbieten:
- nach Themenachse;
- nach Begriff;
- nach Region / Szene;
- nach Zeit und historischen Entwicklungen;
- nach Material / Technik;
- nach Lernpfad;
- über redaktionell begründete Beziehungen zwischen Einträgen.

## 2. Taxonomieachsen

Jeder Eintrag erhält genau eine primäre Achse und kann weitere sekundäre Achsen besitzen.

| Achse | Leitfrage | Beispiele |
|---|---|---|
| Praxis / Aktivität | Was tun Beteiligte? | Tagging, Getting Up, Bombing |
| Werkform / Format | Welche Art von Arbeit oder Objekt liegt vor? | Tag, Throw-up, Piece, Wholecar |
| Lettering- und Kompositionsgrammatik | Wie sind Buchstaben und Gesamtkomposition gestaltet? | Handstyle, Wildstyle, Letter Connections, Flow |
| Material / Technik | Womit und auf welche Weise wird gearbeitet? | Aerosol, Caps, Marker, Blackbook-Material |
| Dokumentation / Zirkulation | Wie wird Writing festgehalten und verbreitet? | Fotografie, Blackbook, Magazine, Film |
| Szene / Region | Wo und in welchem sozialen Kontext entwickelt sich Praxis? | Bronx, Philadelphia, Dortmund, Ruhrgebiet |
| Akteure / Kollektive | Wer oder welche Gruppen sind historisch belegt? | Writer, Crew, Fotografen, Vermittler |
| Geschichte / Ereignis | Welche zeitlich einordenbaren Prozesse oder Ereignisse sind relevant? | Subway-Ära, Medienereignis, lokale Ausstellung |
| Theorie / kulturelle Begriffe | Wie wird das Feld interpretiert oder bezeichnet? | Subkultur, Anerkennung, Öffentlichkeit |

**Wichtig:** Primär- und Sekundärachsen sind redaktionelle Klassifikationen. Sie behaupten nicht, dass ein Begriff in der Praxis nur einer Ebene angehört.

## 3. Beziehungstypen

Beziehungen zwischen Artikeln werden nicht als generische „verwandte Begriffe“ gespeichert. Jede Kante hat einen Typ und eine Begründung.

| Beziehung | Bedeutung | Beispiel |
|---|---|---|
| `is_a` | ist eine Unterform / ein Typ von | konkrete Formbeziehung nur bei sauberer Taxonomie |
| `part_of` | ist Bestandteil von | Handstyle als Ausdruck eines Tags (mit vorsichtiger Definition) |
| `distinct_from` | wird unterschieden von | Tag ≠ Handstyle; Tag ≠ Piece |
| `related_to` | steht in enger sachlicher Beziehung zu | Getting Up ↔ Tagging |
| `practised_in` | ist in einem Ort / einer Szene belegt | lokale Praxis in Dortmund |
| `documented_by` | wird dokumentiert durch | Writing-Praxis ↔ Fotografie / Blackbook |
| `influenced_by` | Einflussbeziehung, nur mit Beleg | Medienzirkulation ↔ lokale Entwicklung |
| `emerged_in_context_of` | entstand / entwickelte sich in einem Kontext | nur bei belastbarer historischer Beleglage |
| `uses_material` | verwendet Material / Werkzeug | Aerosol ↔ Sprühdose |
| `represented_in` | ist in einem Medium / Werk dargestellt | Szene ↔ Film / Publikation |
| `contrasted_with` | wird zum analytischen Vergleich herangezogen | regionale Lettering-Traditionen |
| `succeeded_by` | folgt historisch auf | nur bei nachgewiesener zeitlicher Abfolge; nicht für starre Stilentwicklung |
| `coexists_with` | besteht gleichzeitig mit | parallele regionale Praktiken |

Nicht jede Beziehung muss symmetrisch sein. `influenced_by` und `documented_by` sind gerichtet. `distinct_from` kann symmetrisch behandelt werden. Die UI muss den Relationstyp sprachlich verständlich darstellen.

## 4. Keine falschen Kanten

Folgende Verknüpfungen sind zu vermeiden:
- „Tag → Throw-up → Piece“ als allgemeine Entwicklungskette.
- „Komplex = Wildstyle“ als automatische Klassifikation.
- „Aerosol = Graffiti“ als Gleichsetzung von Material und Kultur.
- „New York beeinflusste alles“ ohne konkrete regionale Belege.
- „Crew“ und „Stil“ als austauschbare Kategorien.
- „Writer“ und „Akteur“ als automatisch identifizierte Person.
- Eine Verbindung allein aufgrund gemeinsamer Schlagwörter.

Eine Kante benötigt einen redaktionellen Grund und – sobald sie historische, regionale oder kausale Aussagen macht – eine Quelle.

## 5. Datenmodell einer Beziehung

Vorgeschlagene strukturierte Form:

```json
{
  "id": "rel.tag-handstyle.expression",
  "source_id": "practice.tag",
  "target_id": "style.handstyle",
  "type": "related_to",
  "label_de": "zeigt sich in",
  "direction": "directed",
  "claim": "Der individuelle Handstyle prägt die konkrete Ausführung eines Tags.",
  "evidence_refs": ["TAG-02"],
  "editorial_status": "draft",
  "confidence_note": "Begriffliche Beziehung; Terminologie kann regional variieren.",
  "valid_context": ["general"],
  "notes": "Nicht als starre Teil-Ganzes-Beziehung darstellen."
}
```

Das ist ein Vorschlag, kein Befehl zur sofortigen Migration. Bestehende Datenstrukturen zuerst prüfen.

## 6. Mindestfelder eines Archiveintrags

- stabile `id` (maschinenlesbar, dauerhaft);
- `title_de` und ggf. Originalbezeichnung;
- Kurzdefinition;
- Primärachse und Sekundärachsen;
- alternative Schreibweisen / regionale Varianten;
- Haupttext mit Abschnitts-IDs;
- Behauptungsregister;
- Quellen mit Fundstellen;
- Beziehungen mit Typ, Richtung, Begründung und Evidenz;
- Orte / Regionen mit Kontext;
- Zeitangaben mit Genauigkeitsgrad;
- visuelle Assets mit Herkunft und Rechte-Status;
- Evidenzstatus;
- redaktioneller Status;
- Rechte-Status.

## 7. Zeitmodell

Zeitangaben müssen Genauigkeit abbilden:
- exaktes Datum;
- Monat / Jahr;
- Jahr;
- Zeitraum;
- circa-Angabe;
- Jahrzehnt;
- undatiert / umstritten.

Jedes Ereignis benötigt einen Typ, zum Beispiel:
- Praxisbeleg;
- Veröffentlichung;
- Medienereignis;
- Ausstellung;
- institutionelle Maßnahme;
- Zeitzeugen-Erinnerung;
- wissenschaftliche Einordnung.

Ein Publikationsdatum darf nicht als Entstehungsdatum einer Praxis dargestellt werden. Erinnerte Daten müssen als Erinnerung gekennzeichnet werden. Parallele regionale Verläufe dürfen nicht zu einer globalen Einzellinie verdichtet werden.

## 8. Quellenprovenienz und Statusdimensionen

Drei Statusdimensionen bleiben unabhängig:

1. **Evidenz:** ungeprüft / teilweise geprüft / geprüft / widersprüchlich.
2. **Redaktion:** Entwurf / in Prüfung / freigegeben / überholt / zurückgezogen.
3. **Rechte:** ungeklärt / nur verlinkt / eigene Produktion / lizenziert / Freigabe angefragt / nicht verwenden.

Zusätzlich hat jede Behauptung:
- Quellenreferenzen;
- konkrete Fundstelle;
- Aussageart (historische Tatsache, Zeitzeugenbericht, wissenschaftliche Interpretation, visuelle Beobachtung, Design-Inferenz);
- Einschränkung / Gegenbeleg / Kontext.

Eine Quelle kann einen Artikel stützen, ohne jede einzelne Aussage darin zu belegen.

## 9. Navigation und Visualisierung

### Einstiegspunkte
- **Entdecken:** kuratierte Themenpfade und neue Einträge.
- **Begriffe:** alphabetischer und thematischer Index.
- **Szenen:** regionale Einordnungen.
- **Zeitleiste:** historische Entwicklungen mit parallelen Bahnen.
- **Werkzeuge & Materialien:** Material- und Technikbereich.
- **Lernen:** interaktive Erklärmodule.
- **Begriffsnetz:** visuelle Beziehungen zwischen Einträgen.

### Begriffsnetz-Ansicht
- Startpunkt ist immer ein ausgewählter Eintrag oder ein klar begrenztes Thema.
- Standardansicht zeigt nur direkte, redaktionell freigegebene Beziehungen.
- Nutzer kann Relationstypen ein-/ausblenden.
- Jede Kante besitzt ein deutsches Verb/Label und öffnet eine kurze Begründung.
- Knoten unterscheiden sich nach Achse, aber die Achse wird nicht allein durch Farbe vermittelt.
- Kein unübersichtlicher „Hairball“ mit hunderten Knoten.
- Bei kleinen Bildschirmen als zugängliche, verschachtelte Liste mit Relationstext statt als verkleinertes Netzwerk.
- Filterzustand und gewählter Startknoten bleiben beim Öffnen eines Eintrags nachvollziehbar.

## 10. Start-Beziehungsnetz (redaktioneller Vorschlag)

Die folgenden Verbindungen sind sinnvolle erste Kandidaten, keine automatische Freigabe:

| Ausgang | Beziehung | Ziel | Begründung / Vorbehalt |
|---|---|---|---|
| Tag | wird unterschieden von | Handstyle | konkrete Signatur vs. individuelle Schreibweise; genaue Definition erläutern |
| Tag | steht in Beziehung zu | Getting Up | Sichtbarkeit und Anerkennung können über Tags entstehen; nicht gleichsetzen |
| Tag | wird unterschieden von | Piece | unterschiedliche Werkformen; keine Entwicklungsleiter |
| Handstyle | steht in Beziehung zu | Lettering-Grammatik | individuelle Formmerkmale, nicht starres Alphabet |
| Handstyle | wird dokumentiert durch | Blackbook | Blackbooks können Skizzen und Formstudien enthalten; nicht jeder Handstyle ist dort dokumentiert |
| Wildstyle | steht in Beziehung zu | Lettering-Verbindungen | visuelle Bedeutungsebene; historische/soziale Bedeutung separat behandeln |
| Throw-up | wird unterschieden von | Piece | unterschiedliche Werk-/Letteringformen |
| Aerosol | wird verwendet für | Piece / Throw-up / Tag | Materialbezug, aber nicht exklusiv und nicht zwingend |
| Blackbook | wird dokumentiert durch | Fotografie | mögliche Dokumentationsbeziehung, Richtung je nach konkretem Eintrag klären |
| Regionale Szene | wird verglichen mit | andere regionale Szene | Vergleich braucht gleiche Analyseebenen und konkrete Quellen |

Vor Veröffentlichung jede Kante anhand der Einträge und Quellen prüfen. Keine Kante darf einen ungeprüften Entwurf als freigegebenes Wissen erscheinen lassen.

## 11. Abnahmekriterien für spätere Umsetzung

- [ ] Taxonomieachsen getrennt und mehrdimensionale Einträge möglich.
- [ ] Beziehungstypen mit verständlichen deutschen Labels.
- [ ] Gerichtetheit und Evidenz pro Kante gespeichert.
- [ ] Keine automatische Beziehung allein aufgrund Schlagwortüberschneidung.
- [ ] Entwürfe nicht als freigegebene Knoten ausgegeben.
- [ ] Zeitgenauigkeit und Ereignistyp sichtbar.
- [ ] Begriffsnetz auf wenige relevante Beziehungen begrenzt.
- [ ] Smartphone-Fallback als Liste.
- [ ] Tastaturbedienung und Screenreader-Alternative.
- [ ] Bestehendes Schema vor jeder Migration geprüft.

## 12. Offene Entscheidungen

- Ob Primärachse und Sekundärachsen bereits im aktuellen Datenmodell abgebildet sind.
- Ob Quellen-/Claim-IDs bereits stabile IDs besitzen.
- Ob Relationen als eigene Datensätze oder eingebettete Felder gespeichert werden.
- Welche Navigationsbereiche für die erste Veröffentlichung tatsächlich sichtbar sein sollen.

Diese Fragen müssen durch Repository-Audit beantwortet werden, nicht durch Annahmen.
