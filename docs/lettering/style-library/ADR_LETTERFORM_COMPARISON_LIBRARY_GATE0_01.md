# ADR — Letterform-Vergleichsbibliothek, Gate 0: Architekturentscheidung

**Status:** umgesetzt (Gate 1 und 2). Der Owner hat die Spec am 19. November 2026 als Auftrag erteilt. Die offenen Punkte aus §5 sind mit den hier vorgeschlagenen Werten umgesetzt (20 Beobachtungen aus mindestens 3 Quellen; PR-Pflicht) und bleiben änderbar.
**Datum:** 19. November 2026
**Auftrag:** `LETTERFORM_COMPARISON_LIBRARY_SPEC_01.md` §9 „Gate 0“, Übergabe-Kommentar in PR #25
**Umfang:** nur Entscheidung. Keine UI, keine Datenmigration, kein Code in diesem Schritt.

## 1. Ausgangslage (geprüft)

**Stand:**
- `main` = `3af97219d0319a4b6233a5f17c396dfe5ff283d7`; Arbeitszweig `claude/letterform-library-gate0`.
- Das Manifest stammt von PR #25 (`research/graffiti-letterform-grammars-01` @ `5f8a382`).

**Test-Baseline auf `main`:**
- `npm test`: 184/184 bestanden, davon 34 Archiv-Tests in `tests/archive.test.js`.
- `node tools/archive-build.mjs --check`: OK.

**Geprüfte Dateien:**

| Bereich | Dateien |
|---|---|
| Archiv-App | `archive/index.html`, `archive/app.js` (Hash-Router, `SECTIONS_NAV`), `archive/sw.js` (Offline-Cache, feste Dateiliste) |
| Builder | `src/archive/build.js` (rein, deterministisch, Schema 2.1), `src/archive/parse.js`, `src/archive/capabilities.js`, `src/archive/diagrams.js`, `tools/archive-build.mjs` |
| Daten und Quellen | `data/archive/archive.v1.de.json` (238 KB), `research/archive/README.md`, `research/archive/de/entries/*.md` (31 Einträge) |
| Tests | `tests/archive.test.js`, `tools/archive-smoke.mjs` |
| Manifest | `docs/lettering/style-library/graffiti-reference-manifest-01.json` (nur auf PR #25) |

### 1.1 Wie das Archiv heute funktioniert

- **Eine Quelle, ein generiertes Datenfile:** `tools/archive-build.mjs` liest `research/*.md`, `research/archive/de/**` und ein Rahmendokument. Daraus macht `buildArchive()` die Datei `data/archive/archive.v1.de.json`. Die App zeigt nur diese Datei. Die CI prüft mit `--check`, dass sie aktuell ist.
- **Ein Eintrag** ist eine Markdown-Datei mit Pflichtabschnitten, einer Belegtabelle (Claims mit Quellen), mindestens einem `related`-Verweis und mindestens einem eingehenden Link. Der Build lehnt unbelegte Claims, tote Links und unerreichbare Einträge ab.
- **Navigation:** „Stile & Buchstaben“ (`#/bereich/stile`, Typen style/construction/composition) und „Bildarchiv“ (`#/bereich/bildarchiv`, Typen object/media) sind bereits in Hauptnavigation und `SECTIONS_NAV` vorhanden.
- **Bildrechte** sind schon ein eigenes Feld: `IMAGE_RIGHTS` = none, original-diagram, link-only, rights-unknown, permission-requested, cleared, do-not-reuse. Fremde Bilder werden heute nirgends eingebettet.

### 1.2 Zustand des Referenz-Manifests (PR #25)

`graffiti-reference-manifest-01.json`, Schema 1.0.0: 18 `source_records`, 39 `specimens`, alle mit eindeutigen IDs und gültiger `source_record_id`.

| Befund | Folge für Gate 1 |
|---|---|
| `visual_review_status` hat **8 freie Schreibweisen**, die Spec verlangt **4 Zustände**. | deterministische Abbildung nötig (§4.4) |
| `rights_status` hat **9 freie Schreibweisen** für im Kern zwei Fälle („link-only“ und „Rechte ungeklärt, Kontakt zum Archiv nötig“). | Abbildung auf die vorhandenen `IMAGE_RIGHTS`; Originaltext bleibt als Notiz erhalten |
| `visible_glyphs` ist in allen 39 Datensätzen **Freitext**, obwohl die Vorlage ein Array vorsieht. Kein Datensatz identifiziert einzelne Buchstaben A–Z mit Lesbarkeit. | **0 zulässige Glyph-Beobachtungen.** Der Glyph-Vergleich hat heute keine Daten. |
| Beobachtungen und Notizen sind **englisch**. | Die Archiv-UI ist laut Styleguide vollständig deutsch, sichtbare Beobachtungstexte brauchen eine deutsche Fassung. |
| `confidence` mischt mehrere Aussagen in einem Text (Metadaten hoch, Anatomie niedrig …). | in getrennte Felder aufteilen |
| Die Datei liegt unter `docs/`. Der Archiv-Build liest `docs/` nicht. Laut `AGENTS.md` darf ChatGPT dort direkt auf `main` committen. | Als Build-Eingabe muss sie dorthin, wo Änderungen über einen PR mit Neubau laufen (§4.2). |

Die Zählung der Spec stimmt: 15 Objekte sind wirklich im Bild gesichtet (7 + 6 + 1 + 1 hi-fi). 17 haben nur Metadaten, 5 nur eine NGA-Katalogbeschreibung, 2 eine Vorschau.

## 2. Entscheidung

### 2.1 Typisierte Beilage statt Archiv-Einträgen

Fundstücke, Beobachtungen und Vergleichsbefunde werden **keine** Markdown-Einträge. Sie kommen als **typisierte JSON-Beilage**, die der bestehende Archiv-Builder mitliest, prüft und in eigene Ausgabedaten schreibt.

Begründung:
- **Ungeeignetes Format:** Das Eintragsformat (Pflichtabschnitte, Belegtabelle, `related`, eingehende Links) passt nicht zu Dutzenden kurzer, strukturierter Datensätze. 39 Fundstücke als Einträge würden die Lexikon-Suche, das A–Z-Glossar und die Erreichbarkeitsprüfung mit Datensätzen fluten, die keine Lexikonartikel sind.
- **Drei Entitäten ohne Platz im Schema:** Die Spec trennt Quellobjekt, Sichtbeobachtung und Vergleichsbefund. Das Eintragsschema kennt keine dieser drei.
- **Gemeinsames Gerüst bleibt:** Navigation, Design-Tokens, Quellen- und Belegpanels, Rechte-Labels, Build und `--check` bleiben dieselben. Es entsteht keine zweite App, keine zweite Quellenliste, kein zweites Design.

Verknüpfung in beide Richtungen:
- Ein Vergleichsbefund kann auf bestehende Archiv-Einträge verweisen, z. B. `construction.letter-anatomy` oder `construction.negative-space`.
- Ein Eintrag bekommt ein optionales Frontmatter-Feld `comparison:` mit Befund- oder Merkmal-IDs. Der Build prüft beide Richtungen auf tote Links.

### 2.2 Ort: `research/archive/comparison/`

Das Manifest wird **einmal** deterministisch nach `research/archive/comparison/` überführt und ist ab dann die einzige bearbeitete Fassung. Unter `docs/` bleibt nur ein Verweis. Damit gilt:
- Es gibt weiter genau **eine** Quellenliste; die Spec verbietet eine zweite.
- `research/archive/` ist laut `AGENTS.md` PR-pflichtig. Jede Änderung läuft also mit `npm run archive:build` durch die CI, und `main` wird nicht rot.
- Die Daten sind sprachneutral, wie die Archiv-IDs. Deutsche Texte stehen als eigene `…De`-Felder darin (§2.6).

Vorgeschlagene Dateien (eine Datei pro Entität, damit ChatGPTs Ein-Datei-Commits nicht kollidieren):

| Datei | Inhalt |
|---|---|
| `research/archive/comparison/sources.v1.json` | `source_records` (Sammlungs- oder Archivebene) |
| `research/archive/comparison/specimens.v1.json` | Quellobjekte: Provenienz, Datierung, Ort, Format, Rechte, Sichtungsstatus |
| `research/archive/comparison/observations.v1.json` | Sichtbeobachtungen und Glyph-Beobachtungen |
| `research/archive/comparison/findings.v1.json` | Vergleichsbefunde |

Vertrag: `contracts/letterform-comparison.v1.schema.json` (JSON-Schema plus Regeln aus §2.5), versioniert wie die anderen Verträge.

### 2.3 Builder und Ausgabe

- **Neues reines Modul `src/archive/comparison.js`:** `buildComparison({ sources, specimens, observations, findings, entryIds, lang })` liefert `{ data, diagnostics }`, mit denselben Diagnose-Codes wie der Archiv-Build (`CMP_*`).
- **`tools/archive-build.mjs`** ruft das Modul nach `buildArchive()` auf. Es schreibt eine **zweite Ausgabedatei** `data/archive/comparison.v1.de.json` und prüft sie im selben `--check`.
- **Separate Datei, weil:**
  - die App sie nur auf den Vergleichsrouten lädt und das Lexikon (238 KB) nicht wächst;
  - sie eine eigene Versionsnummer bekommt und das Archiv-Schema 2.1 unverändert bleibt.
- **Offline:** `archive/sw.js` nimmt die Datei in die Cache-Liste auf, mit neuem Cache-Namen. Die Cache-Version im Namen wird angehoben, damit Clients den neuen Stand laden.
- **`ARCHIVE_SCHEMA_VERSION`** steigt nur auf 2.2, wenn Einträge das Feld `comparison:` bekommen. Das ist eine rein additive Änderung.

### 2.4 Abbildung der bestehenden Daten (Gate-1-Migration)

Die Abbildung erledigt ein deterministisches, einmaliges Skript `tools/migrate-reference-manifest.mjs`. Es schreibt einen Bericht mit allen Abbildungen. Die Originalwerte bleiben als `…Raw`-Felder erhalten; nichts geht verloren.

**Sichtungsstatus (Spec §5):**

| Originalwert (Anzahl) | neuer Zustand |
|---|---|
| `metadata_verified_image_not_inspected` (17) | `catalogue_metadata_only` |
| NGA „catalogue visual description reviewed; image not downloadable …“ (5, zwei Schreibweisen) | `catalogue_metadata_only` — **bitte bestätigen**: Die Beschreibung ist Katalogtext, keine eigene Sichtung |
| `catalogue_description_and_search_preview_reviewed_full_resolution_not_available` (2) | `image_preview_seen` |
| `hi_fi_image_opened_and_visually_inspected` (7), `hi_fi_gallery_image_opened_and_visually_inspected` (6), `hi_fi_images_opened_and_visually_inspected` (1) | `hi_fi_image_opened_and_inspected` |
| `individual_image_opened_and_visually_inspected; archive_style_label_explicit` (1) | `hi_fi_image_opened_and_inspected` plus Feld `archiveStyleLabel: "Throw-up"` |

**Rechte:**

| Originalwert | neuer Wert | Anzeige |
|---|---|---|
| „link-only …“ (Letterform Archive) | `link-only` | nur Link |
| Smithsonian („appointment required; … item-level clearance required“), NGA („media unavailable for download; contact NGA“) | `rights-unknown` | nur Link |

Der Originaltext bleibt jeweils als `rightsNote` erhalten.

**Nicht automatisch überführt:**
- `visible_glyphs` (Freitext) wird zu `visibleTextRaw`.
- Glyph-Beobachtungen entstehen **nur neu** aus ChatGPTs Pilot, nie aus dem Freitext.
- `candidate_grammar_tags` werden zu `candidateTagsRaw` und gelten nicht als Glyph-Beleg (Spec §4).

### 2.5 Prüfregeln des Builds (Gate 1)

Der Build **lehnt ab**:
- **Struktur:**
  - doppelte oder ungültige IDs (`SPEC-…`, `OBS-…`, `GLY-…`, `FND-…`);
  - unbekannte `sourceRecordId`;
  - nicht-https-URLs;
  - unbekannte Enum-Werte.
- **Glyph-Beobachtungen:**
  - eine Glyph-Beobachtung zu einem Fundstück unter `hi_fi_image_opened_and_inspected`;
  - Buchstabe nicht in A–Z;
  - fehlende Transkriptions- oder Lesbarkeits-Konfidenz, oder Konfidenz `low`.
- **Vergleichsbefunde:**
  - Vergleich mit weniger als 2 Beobachtungen oder aus weniger als 2 voneinander **unabhängigen Quellen**, also verschiedenen `sourceRecordId` bzw. Archiven;
  - Befund ohne Beleggrundlage, Konfidenz oder Einschränkung;
  - `generatorRelevance: validated-capability`, ohne dass die genannte Fähigkeit in `src/archive/capabilities.js` als `available` geführt wird.
- **Rechte:**
  - Bild-URLs in Anzeigefeldern; nur `itemUrl` bzw. `viewUrl` als Link sind erlaubt;
  - eingebettete Bilder ohne `imageRights: cleared`;
  - lokale Bilddateien.
- **Sprache:** veröffentlichte Beobachtungen oder Befunde ohne deutschen Text (`…De`).

Der Build **zählt und exportiert**: Objekte gesamt, gesichtete Objekte, zulässige Glyph-Beobachtungen (nach Buchstabe und Quelle) und Befunde.

**Pilot-Gate:** Die App schaltet den Glyph-Vergleich erst frei, wenn mindestens **20 zulässige Glyph-Beobachtungen aus mindestens 3 unabhängigen Quellen** vorliegen. Die Zahl 3 ist mein Vorschlag; die Spec nennt nur „mehrere“. Vorher zeigt die App den Fundstück-Browser und markiert den Vergleich als „Forschungsansicht im Aufbau“.

### 2.6 Sprache

Sichtbare Texte sind deutsch. Jede anzeigbare Beobachtung und jeder Befund braucht `observationDe` bzw. `findingDe`. Englische Recherche-Notizen bleiben Rohdaten und werden nicht angezeigt. Archivtitel, Werktitel und Namen bleiben in ihrer Originalform (Styleguide).

### 2.7 Routen und Navigation

Keine neue Hauptnavigation; der Bereich hängt unter „Stile & Buchstaben“.

| Route | Inhalt | aktiv ab |
|---|---|---|
| `#/vergleich` | Einstieg: Zweck, Zähler, Buchstaben A–Z, Merkmale, zuletzt gesichtet | Gate 2 |
| `#/vergleich/fundstuecke` | Fundstück-Browser mit echter Suche und Filtern | Gate 2 |
| `#/vergleich/fundstueck/<SPEC-ID>` | Objektdetail mit Herkunft, Rechten, Beobachtungen und Link „Originalquelle öffnen“ | Gate 2 |
| `#/vergleich/buchstabe/<A–Z>` | Glyph-Vergleich | Gate 3, nach dem Pilot-Gate |
| `#/vergleich/merkmal/<feature>` | Konstruktionsvergleich | Gate 3 |

Einstiege:
- **„Stile & Buchstaben“:** eine Karte „Buchstaben vergleichen“.
- **„Bildarchiv“:** eine Karte „Fundstücke“.
- **Einträge:** Verweise über das Feld `comparison:`.

Die Navigation hebt bei allen `#/vergleich…`-Routen „Stile & Buchstaben“ hervor. Bezeichnungen wie „Buchstaben vergleichen“, „Fundstücke“ und „Vergleichslabor“ stehen unter Styleguide-Vorbehalt (Spec §2).

## 3. Migrationsrisiken

1. **Doppelte Wahrheit während des Übergangs:** Bis PR #25 gemergt und das Manifest überführt ist, existieren zwei Stände. Abhilfe: Die Migration läuft genau einmal in Gate 1; danach bleibt unter `docs/` nur ein Verweis; ChatGPT bearbeitet nur noch `research/archive/comparison/`.
2. **Arbeitsweise von ChatGPT:** `research/archive/` ist PR-pflichtig, weil der Build die Dateien liest. Jede neue Beobachtung braucht also einen `chatgpt/<thema>`-PR, in dem Claude den Build nachzieht, oder einen STATUS-Vermerk. Alternative wäre eine Lockerung der Regel; dann würde `main` bei jeder Datenänderung rot.
3. **Ermessensfälle der Abbildung:** Die NGA-Datensätze (Katalogbeschreibung als „Sichtung“?) brauchen ChatGPTs Bestätigung, bevor sie zählen.
4. **Offline-Cache:** Ohne neuen Cache-Namen erhalten Nutzer alte Daten. Der Test `offline cache lists only files that exist` muss die neue Datei abdecken.
5. **Brücken-Vertrag:** Generator-Links aus Befunden laufen über `src/bridge/editor-bridge.js` und dessen Fähigkeiten. Eine neue Fähigkeit bedeutet einen Minor-Bump. Keine Writer-Presets.
6. **Umfang:** Pro Gate einen PR. Gate 1 enthält Schema, Validator, Migration und eine Fixture, aber keine UI.

## 4. Testplan

**Gate 1, Unit-Tests in `tests/archive-comparison.test.js`:**
- **Schema:** Pflichtfelder, Enums, ID-Muster.
- **Referenzen:** `sourceRecordId`, Beobachtung → Fundstück, Befund → Beobachtung, Befund ↔ Archiv-Eintrag.
- **Eligibility-Gate:** Ablehnung bei falschem Sichtungsstatus, Buchstabe außerhalb A–Z oder niedriger Konfidenz.
- **Unabhängigkeit:** Zwei Beobachtungen aus derselben Quelle ergeben keinen Vergleich.
- **Rechte:** keine Bild-URLs in Anzeigefeldern, keine lokalen Bilder, kein Einbetten ohne `cleared`.
- **Sprache:** Veröffentlichtes ohne `…De` wird abgelehnt.
- **Migration:** deterministisch (zweimal ausgeführt ergibt dieselben Bytes), alle 39 Datensätze und 18 Quellen überführt, alle `…Raw`-Werte erhalten, Abbildungsbericht vollständig.
- **Ausgabe:** `comparison.v1.de.json` ist aktuell (`--check`), Zähler korrekt, Pilot-Gate wird richtig gemeldet.
- **Ende-zu-Ende-Fixture:** eine echte, zulässige Glyph-Beobachtung aus ChatGPTs Pilot. Fehlt sie, wird das gemeldet, nicht erfunden.

**Gate 2 und 3, Browser (`tools/archive-smoke.mjs` erweitern):**
- **Routen und Navigation:** alle neuen Routen laden; aktive Navigation korrekt.
- **Suche:** Filter geben richtige Treffer und lassen sich leeren.
- **Glyph-Vergleich:** vor dem Pilot-Gate gesperrt.
- **Rechte:** kein `<img>` mit fremder Quelle.
- **Darstellung und Zugänglichkeit:** Desktop, Tablet und Mobil; Tastatur, Fokus, Touch, reduzierte Bewegung.
- **Offline:** Cache enthält die neue Datei.
- **Regression:** alle bestehenden 34 Archiv-Tests und `ARCHIVE-PASS` bleiben grün.

## 5. Offene Entscheidungen

**Owner:**
1. Diese ADR annehmen? Insbesondere Beilage statt Einträge, Ort `research/archive/comparison/` und separate Ausgabedatei.
2. Pilot-Schwelle: 20 Glyph-Beobachtungen aus mindestens 3 unabhängigen Quellen?
3. PR-Pflicht für Vergleichsdaten beibehalten (empfohlen), statt sie für ChatGPT zu lockern?

**ChatGPT:**

4. Die Abbildung der NGA-Katalogbeschreibungen auf `catalogue_metadata_only` bestätigen.
5. Für den Pilot pro Beobachtung liefern: Buchstabe, Transkriptions- und Lesbarkeitskonfidenz, Anatomie-Notiz und deutschen Text (`observationDe`).

## 6. Nächster Schritt

**Nach Annahme folgt Gate 1** (ein PR von Claude):
- Vertrag `contracts/letterform-comparison.v1.schema.json`;
- `src/archive/comparison.js`;
- das Migrationsskript;
- Erweiterung von `tools/archive-build.mjs` und `archive/sw.js` (nur Cache-Liste);
- Tests;
- eine Fixture aus ChatGPTs Pilot.

UI kommt erst in Gate 2.
