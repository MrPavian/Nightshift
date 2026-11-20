# NIGHTSHIFT Academy — Kleinbuchstaben a–z und Ziffern 0–9

**Version:** 1.0.0  
**Status:** Entwurf / redaktioneller Inhaltssatz, noch keine visuellen Proofs  
**Owner-Auftrag:** 16.11.2026 — ChatGPT verantwortet Kleinbuchstaben und Ziffern  
**Maschinenlesbarer Inhalt:** `data/academy/lowercase-numerals.v1.json`  
**Verbindliche Standards:** `docs/lettering/GRAFFITI_ACADEMY_VISUAL_STYLE_STANDARD_01.md` und `docs/lettering/MASTER_CONTROL_PROMPT_01.md` v1.2

## Ziel und Umfang

Dieses Paket definiert den fachlichen Inhalt für 36 eigenständige Lernblätter: 26 Kleinbuchstaben und zehn Ziffern. Es überträgt das freigegebene neunfeldrige Academy-System auf die tatsächliche Anatomie jedes Zeichens. Es ist **keine** Sammlung von Schriftfont-Glyphen und keine historische Stilvorlage.

Die Graffiti-Entwürfe sind originär und fiktiv. Historische Archive und reale Writer dienen höchstens dem Verständnis von Praxis, Vielfalt und Begriffen; ihre Signaturen, Pieces und individuellen Konturen werden nicht kopiert.

## Verbindliches Seitenraster

Jedes Zeichen erhält eine eigene DIN-A4-Landscape-Seite (297 × 210 mm; Master 1680 × 1188 px) mit neun Feldern:

1. **Grundform** — neutrale, charaktergerechte Referenzform ohne Effekte.
2. **Buchstabenanatomie** — nur tatsächlich vorhandene Bauteile und Negativräume benennen.
3. **Proportionen & Raster** — Zeichenhöhe, Grundlinie und relevante Führungen; Maße bleiben zeichnungsspezifische Beispiele.
4. **Konstruktionsanalyse** — Leitstruktur, Strichkörper, Anschlüsse, Kontur und Grundform als getrennte Ebenen.
5. **Formvariationen** — mindestens fünf strukturell verschiedene Varianten.
6. **Formcharakter** — Wirkung von Breite, Gewicht, Winkel, Rhythmus und Negativraum.
7. **Kalligrafie & Duktus** — Broad-Nib, Marker und Brush als Werkzeugvergleiche; keine sichere Strichfolge aus einem Standbild ableiten.
8. **Graffiti-Transfer** — mindestens drei große, klar unterscheidbare Originalentwürfe: throw-up-orientiert, block-style und piece-/Wildstyle-orientiert. Das sind parallele Ansätze, keine historische Lernleiter.
9. **Lernkontrolle** — drei bis fünf praktische Aufgaben, die in einem eigenen Letter-Entwurf enden.

Das visuelle System bleibt identisch mit dem Owner-freigegebenen A-Referenzstil: warmes, leicht abgenutztes Blackbook-Papier, schwarze Marker-Überschriften und Rahmen, Gelb als Signal, Violett für Konstruktion, zurückhaltende Spray-/Drip-Details. Distress bleibt separat editierbar und darf keine Lerninformation verdecken.

## Gemeinsame Konstruktionsregeln

### Kleinbuchstaben

- Die vier relevanten Führungen sind **Ascenderlinie, x-Höhe, Grundlinie und Descenderlinie**. Nicht jedes Zeichen nutzt alle vier.
- Kleinbuchstaben sind keine verkleinerten Versalien. Der Hauptkörper orientiert sich an der x-Höhe; Ascender reichen darüber, Descender darunter.
- Runde Formen können optisch geringfügig über x-Höhe oder Grundlinie hinausragen. Das ist eine optische Korrektur, keine universelle Prozentregel.
- `a` und `g` besitzen jeweils eigenständige ein- und doppelgeschossige Konstruktionen. Beide Varianten müssen als unterschiedliche Formfamilien sichtbar bleiben.
- Offene Innenräume sind nicht automatisch Punzen: Bei `m`, `n`, `u`, `v`, `w` und `y` entstehen häufig offene Negativräume.
- Punkt/Tittle bei `i` und `j` bleibt ein separat lesbares Bauteil.

### Ziffern

- Der Academy-Grundsatz verwendet zunächst **Lining-Ziffern**: ein gemeinsamer Figurenhöhenrahmen, Grundlinie als gemeinsame Standlinie, keine x-Höhe.
- Oldstyle-Ziffern mit Ober- und Unterlängen sind eine eigene Ziffernfamilie und dürfen nicht stillschweigend mit Lining-Ziffern vermischt werden.
- Proportionale und tabellarische Breiten sind Satz-/Layoutentscheidungen. Die Lernblätter zeigen zunächst individuelle proportionale Ziffernformen.
- Schrägstrich in `0`, Querstrich in `7` sowie offene/geschlossene `4` sind mögliche Lösungen, keine universellen Regeln.
- Die Unterscheidung zu ähnlichen Zeichen muss explizit geprüft werden: `0/O/o`, `1/I/l`, `2/z`, `5/S/s`, `6/9`, `8/B`.

## Charakterübersicht

### Kleinbuchstaben a–z

| Zeichen | Konstruktionsgruppe | Neutrale Referenz | Verwechslungs-/Leserisiko |
|---|---|---|---|
| `a` | x-height-body | Doppelgeschossiges a als neutrale Referenz; die alternative einstöckige Form ist ein eigenständiger Konstruktionsmodus, kein Effekt. | Nicht als verkleinertes A behandeln; einstöckig und doppelgeschossig nicht vermischen. |
| `b` | ascender | Aufrechter Stamm mit hochreichendem Ascender und rechts angesetztem Bauch. | Der Bauch sitzt rechts vom Stamm; nicht mit d spiegeln. |
| `c` | x-height-body | Offener, annähernd runder Bogen mit zwei freien Enden und klarer Apertur. | Nicht vollständig schließen; sonst geht die Buchstabenidentität verloren. |
| `d` | ascender | Bauch links, Ascender rechts; der Stamm steigt über die x-Höhe. | Stamm rechts; b hat den Stamm links. |
| `e` | x-height-body | Kompakter Bogen mit Querzug, Auge und offener oder enger Apertur. | Das Auge ist der geschlossene Innenraum; Apertur und Querzug nicht verwechseln. |
| `f` | ascender-descender | Schmaler, hoher Ascender mit Querbalken und unterer Kurve oder Descender; die genaue Formfamilie variiert. | Ascender und möglicher Descender müssen getrennt erklärt werden; kein pauschaler Strichablauf. |
| `g` | descender | Doppelgeschossiges g als neutrale Referenz mit oberem Bauch, Ohr, Verbindung und unterer Schleife; einstöckige Form separat zeigen. | Nicht ein einziges g als universelle Form festlegen. |
| `h` | ascender | Hoher linker Stamm mit Ascender und rechts angesetzter Schulter, die zur Grundlinie zurückführt. | Ascender links ist entscheidend; n hat keinen hohen linken Stamm. |
| `i` | x-height-body | Ein einzelner Stamm innerhalb der x-Höhe mit separat stehendem Punkt (Tittle). | Punkt nicht weglassen oder mit dem Stamm verschmelzen, wenn die Lesbarkeit leidet. |
| `j` | descender | Stamm mit separatem Punkt und unter die Grundlinie reichendem, oft gekrümmtem Descender. | Der Descender ist das Hauptunterscheidungsmerkmal zu i. |
| `k` | ascender | Hoher Stamm mit zwei unterschiedlich gerichteten Anschlüssen: oberem Arm und unterem Bein. | Das k hat einen Ascender und ein echtes Gelenk; nicht als kleines K kopieren. |
| `l` | ascender | Ein einzelner hoher Stamm, häufig mit Fuß, Biegung oder kleinem Terminal. | Nicht als verkleinertes I oder als Ziffer 1 behandeln. |
| `m` | x-height-body | Drei Stämme mit zwei Schultern; zwei offene Innenräume entstehen zwischen den Bögen. | m hat zwei Schultern; die Zwischenräume sind offen, nicht geschlossene Punzen. |
| `n` | x-height-body | Ein Stamm mit einer Schulter, die in den rechten Stamm oder Terminal übergeht. | Kein Ascender am linken Stamm; h hat einen. |
| `o` | x-height-body | Geschlossener, runder oder ovaler Körper mit einer vollständig eingeschlossenen Punze. | o ist ein Kleinbuchstabe im x-Höhenkörper; 0 ist eine Ziffer im Lining-System. |
| `p` | descender | Bauch mit Innenraum rechts oder links am Stamm; der Stamm reicht unter die Grundlinie. | Bauchposition und Descender nicht spiegeln oder mit b verwechseln. |
| `q` | descender | Geschlossener Bauch mit Punze und einem unter die Grundlinie reichenden Stamm oder Schwanz; die Richtung kann variieren. | Tailposition nicht beliebig wechseln, ohne die Lesbarkeit zu prüfen. |
| `r` | x-height-body | Ein Stamm mit kurzer Schulter oder Arm und freiem Terminal; kein geschlossener Bauch. | Keine geschlossene Punze oder vollständige Schulter wie n hinzufügen. |
| `s` | x-height-body | Geschwungene Spine mit oberem und unterem Bogen sowie zwei offenen Terminals. | Keine geschlossene Punze; die Taille muss lesbar bleiben. |
| `t` | ascender | Stamm mit Ascender, Querbalken und Fuß oder unterem Terminal. | Nicht mit dem Versal T gleichsetzen; x-Höhe und Ascender erklären. |
| `u` | x-height-body | Zwei Stämme, verbunden durch einen unteren Bogen; oben bleibt die Form offen. | Oben offen halten; v hat einen spitzen Treffpunkt. |
| `v` | x-height-body | Zwei diagonale Hauptzüge treffen sich in einem unteren Scheitel; oben ist die Form offen. | Nicht mit dem gerundeten Grund von u verwechseln. |
| `w` | x-height-body | Vier diagonale Teilzüge mit zwei unteren Richtungswechseln; zwei offene Innenräume. | Nicht als bloßes doppeltes v ohne gemeinsame Proportion behandeln. |
| `x` | x-height-body | Zwei sich kreuzende Diagonalen mit vier freien Enden; der Kreuzungspunkt ist ein zentrales Strukturmerkmal. | Die Kreuzung ist keine geschlossene Punze; nicht mit k oder Multiplikationszeichen verwechseln. |
| `y` | descender | Zwei obere Arme vereinigen sich in einem Stamm oder Bogen, der unter die Grundlinie reicht. | Der Abstieg ist unter der Grundlinie; die obere Gabel bleibt sichtbar. |
| `z` | x-height-body | Zwei horizontale Balken werden durch einen diagonalen Verbindungszug verbunden. | Keine Punze; nicht mit der Ziffer 2 gleichsetzen. |

### Ziffern 0–9

| Zeichen | Konstruktionsgruppe | Neutrale Referenz | Verwechslungs-/Leserisiko |
|---|---|---|---|
| `0` | lining-numeral | Lining-Ziffer mit geschlossenem Oval oder abgerundetem Viereck; ein Innenraum bleibt offen als Counter. | Ziffer im Lining-System; nicht als Kleinbuchstabe o setzen. |
| `1` | lining-numeral | Aufrechter Hauptstamm, häufig mit oberer Fahne und/oder unterem Fuß; die Konstruktion variiert stark. | Nicht als Kleinbuchstabe l oder Versal I behandeln. |
| `2` | lining-numeral | Obere Kurve oder Bogen geht in eine Diagonale über, die auf einer unteren Basis endet. | Die Basis ist ein entscheidender Abschluss; nicht als z lesen lassen. |
| `3` | lining-numeral | Zwei übereinanderliegende Bögen oder Schalen mit einer offenen rechten Seite und einer Taille. | Keine zwei geschlossenen Counter wie bei 8 erzeugen. |
| `4` | lining-numeral | Diagonaler oder senkrechter Zug bildet mit Querbalken und Stamm eine offene oder geschlossene obere Struktur. | Nicht pauschal als geschlossenes Dreieck konstruieren; offene 4 ist ebenso gültig. |
| `5` | lining-numeral | Oberer Balken und Abstieg gehen in eine untere Kurve oder Schale über. | Nicht nur als S mit gerader Oberkante behandeln. |
| `6` | lining-numeral | Oberer Einstieg führt in eine geschlossene oder nahezu geschlossene untere Schale mit Counter. | Nicht mit 9 spiegeln, ohne den Einstieg zu ändern. |
| `7` | lining-numeral | Oberer Balken mit diagonalem Abstieg; optionaler Querstrich oder Fuß. | Nicht nur als 1 mit Schrägstrich zeichnen. |
| `8` | lining-numeral | Zwei geschlossene Schalen mit zwei Countern, verbunden durch eine Taille. | Nicht mit B oder zwei gestapelten Kreisen verwechseln. |
| `9` | lining-numeral | Obere Schale mit Counter und nach unten führendem Stamm oder Tail. | Nicht einfach 6 spiegeln; obere Schale und Tail-Anschluss unterscheiden sich. |

## Charakterbezogene Konstruktionsnotizen

Die folgenden Angaben sind die fachliche Grundlage für Panel 1–6. Die vollständigen fünf Variationen, drei Graffiti-Richtungen und Lernaufgaben stehen zusätzlich strukturiert im JSON.

### Kleinbuchstaben

### a — x-height-body

- **Grundform:** Doppelgeschossiges a als neutrale Referenz; die alternative einstöckige Form ist ein eigenständiger Konstruktionsmodus, kein Effekt.
- **Anatomie:** Oberer Bauch mit Innenraum, rechter Stamm, Anschluss/Schulter, unterer Auslauf, bei der einstöckigen Alternative geschlossener oder offener Bogen mit Stamm.
- **Raster:** Grundlinie und x-Höhe; der Bauch darf optisch geringfügig über die x-Höhe hinausragen. Keine Versalhöhe als Ersatz für die x-Höhe.
- **Fünf Strukturvarianten:** Doppelgeschossig schmal; einstöckig geschlossen; einstöckig offen; kantiger Bauch mit flacher Schulter; breiter Bauch mit verlängertem Endzug.
- **Verwechslungsrisiko:** Nicht als verkleinertes A behandeln; einstöckig und doppelgeschossig nicht vermischen.
- **Graffiti-Transfer:** Throw-up: throw-up-orientiert: runder, geschlossener Bauch mit großzügigem Innenraum; den Anschluss als klare Brücke halten. Block: block-style: klarer Stamm und kantiger Bauch; Innenraum als bewusst ausgesparte Fläche sichern. Piece/Wildstyle: piece-wildstyle-orientiert: obere und untere Formzone gegeneinander verschieben; Anschluss und Auslauf als eigene Verbindungen planen, nicht als Effektlinien.

### b — ascender

- **Grundform:** Aufrechter Stamm mit hochreichendem Ascender und rechts angesetztem Bauch.
- **Anatomie:** Ascender/Stamm, Bauch, Innenraum, Schulter/Anschluss, Fuß oder Terminal am Grundlinienkontakt.
- **Raster:** Grundlinie, x-Höhe und Ascenderlinie. Der Stamm reicht über die x-Höhe; Bauch und Stamm müssen optisch ausgewogen sein.
- **Fünf Strukturvarianten:** Schmaler hoher Ascender; kompakter runder Bauch; eckiger Bauch; offener Bauch mit größerer Apertur; nach außen gezogener unterer Terminal.
- **Verwechslungsrisiko:** Der Bauch sitzt rechts vom Stamm; nicht mit d spiegeln.
- **Graffiti-Transfer:** Throw-up: throw-up-orientiert: hoher Stamm mit kompakter, runder Bauchmasse; Counter offen halten. Block: block-style: gerader Ascender, rechteckig gerundeter Bauch und präzise Innenform. Piece/Wildstyle: piece-wildstyle-orientiert: Bauch und Stamm leicht staffeln; Überlagerung nur an einer geplanten Verbindungsstelle.

### c — x-height-body

- **Grundform:** Offener, annähernd runder Bogen mit zwei freien Enden und klarer Apertur.
- **Anatomie:** Oberer und unterer Bogen, obere und untere Terminal, Apertur, Innenraum als offene Negativform.
- **Raster:** Grundlinie und x-Höhe; Rundung kann leicht über beide Linien hinausragen. Aperturbreite ist eine bewusste Variable.
- **Fünf Strukturvarianten:** Weit offene Apertur; enge Apertur; fast geschlossener Bogen; kantiger C-Bogen; nach innen oder außen gerichtete Terminals.
- **Verwechslungsrisiko:** Nicht vollständig schließen; sonst geht die Buchstabenidentität verloren.
- **Graffiti-Transfer:** Throw-up: throw-up-orientiert: breiter offener Bogen mit großzügiger Öffnung; nicht zu o schließen. Block: block-style: kantige C-Silhouette mit klaren Endflächen und kontrollierter Apertur. Piece/Wildstyle: piece-wildstyle-orientiert: obere und untere Terminals gegeneinander ausrichten; eine Verlängerung darf die Öffnung nicht verdecken.

### d — ascender

- **Grundform:** Bauch links, Ascender rechts; der Stamm steigt über die x-Höhe.
- **Anatomie:** Bauch, Innenraum, rechter Stamm/Ascender, Anschluss am oberen Bauch, Fuß/Terminal.
- **Raster:** Grundlinie, x-Höhe und Ascenderlinie. Der Stamm steht rechts; Rundung kann die x-Höhe optisch überschreiten.
- **Fünf Strukturvarianten:** Schmaler Ascender; breiter Bauch; eckiger Bauch; offener Anschluss; leicht geneigter Stamm mit rundem Bauch.
- **Verwechslungsrisiko:** Stamm rechts; b hat den Stamm links.
- **Graffiti-Transfer:** Throw-up: throw-up-orientiert: kompakter runder Bauch links mit kräftigem rechten Stamm. Block: block-style: rechteckiger Bauch und hoher gerader Ascender; Counter klar freistellen. Piece/Wildstyle: piece-wildstyle-orientiert: Stamm und Bauch als zwei gekoppelte Massen mit bewusstem Überlappungspunkt planen.

### e — x-height-body

- **Grundform:** Kompakter Bogen mit Querzug, Auge und offener oder enger Apertur.
- **Anatomie:** Bauch, Auge/Counter, Querzug, Apertur, oberer und unterer Terminal.
- **Raster:** Grundlinie und x-Höhe; Querzug liegt charakterbezogen, nicht automatisch exakt mittig. Rundung darf leicht overshooten.
- **Fünf Strukturvarianten:** Weites offenes e; engeres Auge; diagonaler Querzug; kantiger e-Körper; verlängertes oberes Terminal.
- **Verwechslungsrisiko:** Das Auge ist der geschlossene Innenraum; Apertur und Querzug nicht verwechseln.
- **Graffiti-Transfer:** Throw-up: throw-up-orientiert: rundes e mit gut sichtbarem Auge und offener Apertur. Block: block-style: kantiger Bauch, klarer Querzug, großes freies Auge. Piece/Wildstyle: piece-wildstyle-orientiert: Querzug als verbindendes Element nutzen, aber Apertur und Auge frei halten.

### f — ascender-descender

- **Grundform:** Schmaler, hoher Ascender mit Querbalken und unterer Kurve oder Descender; die genaue Formfamilie variiert.
- **Anatomie:** Ascender, Stamm, Querbalken/Arm, Haken oder unterer Auslauf, bei langem f Descender.
- **Raster:** Grundlinie, x-Höhe, Ascenderlinie und ggf. Descenderlinie. Nicht jedes f muss gleich weit unter die Grundlinie reichen.
- **Fünf Strukturvarianten:** Kurzer Ascender; langer Ascender; kurzer Haken ohne langen Descender; gebogener langer Descender; kantiger Querbalken mit offenem Terminal.
- **Verwechslungsrisiko:** Ascender und möglicher Descender müssen getrennt erklärt werden; kein pauschaler Strichablauf.
- **Graffiti-Transfer:** Throw-up: throw-up-orientiert: kompakter Stamm mit klar erkennbarem Querzug; unteren Haken nicht überladen. Block: block-style: gerader Ascender und präziser Querbalken; Haken als kontrollierter Fuß. Piece/Wildstyle: piece-wildstyle-orientiert: langer unterer Auslauf als gerichtete Verbindung, ohne den Stamm zu verdecken.

### g — descender

- **Grundform:** Doppelgeschossiges g als neutrale Referenz mit oberem Bauch, Ohr, Verbindung und unterer Schleife; einstöckige Form separat zeigen.
- **Anatomie:** Oberer Bauch und Auge, Ohr, Verbindung/Link, untere Schleife, Descender, Endung.
- **Raster:** Grundlinie, x-Höhe und Descenderlinie. Oberer Bauch sitzt auf x-Höhe, untere Schleife reicht darunter.
- **Fünf Strukturvarianten:** Doppelgeschossig kompakt; doppelgeschossig mit offener Schleife; einstöckig geschlossen; einstöckig offen; langer schmaler Descender.
- **Verwechslungsrisiko:** Nicht ein einziges g als universelle Form festlegen.
- **Graffiti-Transfer:** Throw-up: throw-up-orientiert: einstöckige runde Form mit großem, lesbarem unteren Loop oder klarer Endung. Block: block-style: doppelgeschossige Form mit getrennt lesbaren Bauch- und Schleifenzonen. Piece/Wildstyle: piece-wildstyle-orientiert: Link als geplante Brücke nutzen; Schleife nicht in zufällige Überlagerung auflösen.

### h — ascender

- **Grundform:** Hoher linker Stamm mit Ascender und rechts angesetzter Schulter, die zur Grundlinie zurückführt.
- **Anatomie:** Ascender/Stamm, Schulter, rechter Abstrich, Fuß, offener Innenraum unter der Schulter.
- **Raster:** Grundlinie, x-Höhe und Ascenderlinie. Schulterhöhe und -breite bestimmen den Charakter.
- **Fünf Strukturvarianten:** Schmaler Stamm; breite Schulter; niedrige Schulter; kantige Schulter; nach außen verlängertes rechtes Terminal.
- **Verwechslungsrisiko:** Ascender links ist entscheidend; n hat keinen hohen linken Stamm.
- **Graffiti-Transfer:** Throw-up: throw-up-orientiert: kräftiger Stamm und runde, breite Schulter. Block: block-style: senkrechter Ascender mit gerader oder eckiger Schulter und klarer Öffnung. Piece/Wildstyle: piece-wildstyle-orientiert: Schulter als Richtungswechsel mit einem geplanten Anschluss gestalten.

### i — x-height-body

- **Grundform:** Ein einzelner Stamm innerhalb der x-Höhe mit separat stehendem Punkt (Tittle).
- **Anatomie:** Stamm, Punkt/Tittle, obere und untere Endung, Abstand zwischen Stamm und Punkt.
- **Raster:** Grundlinie und x-Höhe; Punktposition als eigener Abstand, nicht als Teil der Stammhöhe.
- **Fünf Strukturvarianten:** Runder Punkt; quadratischer Punkt; schräger Punkt; breiter Stamm; leicht geneigter Stamm mit versetztem Punkt.
- **Verwechslungsrisiko:** Punkt nicht weglassen oder mit dem Stamm verschmelzen, wenn die Lesbarkeit leidet.
- **Graffiti-Transfer:** Throw-up: throw-up-orientiert: kurzer, kräftiger Stamm mit großem, klar getrenntem Punkt. Block: block-style: rechteckiger Stamm und präzise ausgerichteter quadratischer Punkt. Piece/Wildstyle: piece-wildstyle-orientiert: Punkt als eigenständiges Element in die Komposition einbinden, aber optisch dem i zuordnen.

### j — descender

- **Grundform:** Stamm mit separatem Punkt und unter die Grundlinie reichendem, oft gekrümmtem Descender.
- **Anatomie:** Stamm, Tittle/Punkt, Descender, unterer Haken oder Terminal.
- **Raster:** Grundlinie, x-Höhe und Descenderlinie. Punkt über dem Stamm; unterer Zug reicht unter die Grundlinie.
- **Fünf Strukturvarianten:** Gerader Descender; gebogener Haken; kurzer Descender; langer Loop; versetzter Punkt.
- **Verwechslungsrisiko:** Der Descender ist das Hauptunterscheidungsmerkmal zu i.
- **Graffiti-Transfer:** Throw-up: throw-up-orientiert: kompakter Stamm und klarer, runder Haken unter der Grundlinie. Block: block-style: gerader Stamm mit eckigem, kontrolliertem Descender. Piece/Wildstyle: piece-wildstyle-orientiert: Descender als gerichtete Verbindung unterhalb der Grundlinie planen.

### k — ascender

- **Grundform:** Hoher Stamm mit zwei unterschiedlich gerichteten Anschlüssen: oberem Arm und unterem Bein.
- **Anatomie:** Ascender/Stamm, oberer Arm, unteres Bein, Gelenk/Verbindung, freie Terminals.
- **Raster:** Grundlinie, x-Höhe und Ascenderlinie. Das Gelenk liegt meist im x-Höhenkörper, kann aber variieren.
- **Fünf Strukturvarianten:** Kurzer oberer Arm; langer oberer Arm; diagonales Bein; gebogenes Bein; offenes Gelenk mit versetzten Anschlüssen.
- **Verwechslungsrisiko:** Das k hat einen Ascender und ein echtes Gelenk; nicht als kleines K kopieren.
- **Graffiti-Transfer:** Throw-up: throw-up-orientiert: kräftiger Ascender mit zwei klaren, kompakten Armen. Block: block-style: gerader Stamm und geometrisch definierter Gelenkpunkt; Bein als klare Diagonale. Piece/Wildstyle: piece-wildstyle-orientiert: Arm und Bein in zwei Richtungen führen, aber am Gelenk kontrolliert verbinden.

### l — ascender

- **Grundform:** Ein einzelner hoher Stamm, häufig mit Fuß, Biegung oder kleinem Terminal.
- **Anatomie:** Ascender/Stamm, oberes Terminal, Fuß oder unterer Auslauf, ggf. Biegung.
- **Raster:** Grundlinie, x-Höhe und Ascenderlinie. Die Stammhöhe ist wichtiger als eine x-Höhenmasse.
- **Fünf Strukturvarianten:** Gerader Stamm; leicht geneigter Stamm; Fuß nach innen; Fuß nach außen; gebogene oder loopartige Variante.
- **Verwechslungsrisiko:** Nicht als verkleinertes I oder als Ziffer 1 behandeln.
- **Graffiti-Transfer:** Throw-up: throw-up-orientiert: einfacher, leicht gebogener Stamm mit kleinem Fuß, nicht nur ein senkrechter Strich. Block: block-style: klarer Ascender mit breitem Fuß und eindeutiger Kleinbuchstabenhöhe. Piece/Wildstyle: piece-wildstyle-orientiert: Stamm als hohe Leitachse mit kontrolliertem Fußanschluss einsetzen.

### m — x-height-body

- **Grundform:** Drei Stämme mit zwei Schultern; zwei offene Innenräume entstehen zwischen den Bögen.
- **Anatomie:** Linker Stamm, zwei Schultern, mittlerer und rechter Stamm, zwei offene Innenräume, Endungen.
- **Raster:** Grundlinie und x-Höhe. Die beiden Schultern können unterschiedlich breit sein; keine geschlossenen Counter erzwingen.
- **Fünf Strukturvarianten:** Schmal und hoch; breit und flach; zwei runde Schultern; zwei kantige Schultern; asymmetrische erste/zweite Schulter.
- **Verwechslungsrisiko:** m hat zwei Schultern; die Zwischenräume sind offen, nicht geschlossene Punzen.
- **Graffiti-Transfer:** Throw-up: throw-up-orientiert: breite, runde Doppel-Schulter mit gut lesbaren offenen Innenräumen. Block: block-style: drei klare Stämme und zwei eckige, gleichmäßig getrennte Schultern. Piece/Wildstyle: piece-wildstyle-orientiert: die zwei Schultern leicht versetzen und die Mittelachse als kontrollierten Übergang nutzen.

### n — x-height-body

- **Grundform:** Ein Stamm mit einer Schulter, die in den rechten Stamm oder Terminal übergeht.
- **Anatomie:** Linker Stamm, Schulter, rechter Abstrich, offener Innenraum, Endungen.
- **Raster:** Grundlinie und x-Höhe. Schulterhöhe und Bogenbreite sind die wichtigsten Variablen.
- **Fünf Strukturvarianten:** Schmal; breit; runde Schulter; kantige Schulter; lang ausgezogener rechter Terminal.
- **Verwechslungsrisiko:** Kein Ascender am linken Stamm; h hat einen.
- **Graffiti-Transfer:** Throw-up: throw-up-orientiert: runde, kompakte Schulter mit breiter Basis. Block: block-style: gerader linker Stamm und klar definierte eckige Schulter. Piece/Wildstyle: piece-wildstyle-orientiert: rechter Auslauf als Anschluss zur nächsten Form nutzen, ohne die Schulter zu verdecken.

### o — x-height-body

- **Grundform:** Geschlossener, runder oder ovaler Körper mit einer vollständig eingeschlossenen Punze.
- **Anatomie:** Bogen/Bowl, geschlossene Punze/Counter, obere und untere Rundung, ggf. Achse/Neigung.
- **Raster:** Grundlinie und x-Höhe; Rundung kann optisch leicht über beide Linien hinausragen.
- **Fünf Strukturvarianten:** Kreisförmig; hochoval; breitoval; leicht eckig; geneigte Achse mit asymmetrischem Gewicht.
- **Verwechslungsrisiko:** o ist ein Kleinbuchstabe im x-Höhenkörper; 0 ist eine Ziffer im Lining-System.
- **Graffiti-Transfer:** Throw-up: throw-up-orientiert: runder, großzügiger Körper mit sauberem Counter. Block: block-style: kontrolliertes Oval oder abgerundetes Rechteck mit stabiler Wandstärke. Piece/Wildstyle: piece-wildstyle-orientiert: Oval leicht kippen und mit gerichteten Anschlüssen arbeiten, ohne den Counter zu schließen.

### p — descender

- **Grundform:** Bauch mit Innenraum rechts oder links am Stamm; der Stamm reicht unter die Grundlinie.
- **Anatomie:** Stamm/Descender, Bauch, Counter, Schulter/Anschluss, unterer Terminal.
- **Raster:** Grundlinie, x-Höhe und Descenderlinie. Bauch sitzt im x-Höhenbereich, Stamm reicht darunter.
- **Fünf Strukturvarianten:** Langer Descender; kurzer Descender; runder Bauch; kantiger Bauch; offener Bauch mit größerer Apertur.
- **Verwechslungsrisiko:** Bauchposition und Descender nicht spiegeln oder mit b verwechseln.
- **Graffiti-Transfer:** Throw-up: throw-up-orientiert: kompakter Bauch mit klar erkennbarem langen Abstieg. Block: block-style: gerader Descender und rechteckiger Bauch mit sauberem Counter. Piece/Wildstyle: piece-wildstyle-orientiert: Descender als vertikale Leitachse und Bauch als seitliche Masse verbinden.

### q — descender

- **Grundform:** Geschlossener Bauch mit Punze und einem unter die Grundlinie reichenden Stamm oder Schwanz; die Richtung kann variieren.
- **Anatomie:** Bauch, Counter, Descender/Tail, Anschluss, Terminal.
- **Raster:** Grundlinie, x-Höhe und Descenderlinie. Die Rundung sitzt im x-Höhenkörper; Tail reicht darunter.
- **Fünf Strukturvarianten:** Rechter gerader Tail; linker Tail; gebogener Tail; kurzer Tail; kantiger Tail mit offenem Terminal.
- **Verwechslungsrisiko:** Tailposition nicht beliebig wechseln, ohne die Lesbarkeit zu prüfen.
- **Graffiti-Transfer:** Throw-up: throw-up-orientiert: runder Bauch mit eindeutig nach unten geführtem Tail. Block: block-style: stabiler Counter und klarer gerader Descender. Piece/Wildstyle: piece-wildstyle-orientiert: Tail als kontrollierte Verlängerung einsetzen, nicht als zufällige Unterstreichung.

### r — x-height-body

- **Grundform:** Ein Stamm mit kurzer Schulter oder Arm und freiem Terminal; kein geschlossener Bauch.
- **Anatomie:** Stamm, Schulter, Arm/Terminal, offener Innenraum, Anschluss.
- **Raster:** Grundlinie und x-Höhe. Schulteransatz liegt im oberen Teil des x-Höhenkörpers; kein Ascender.
- **Fünf Strukturvarianten:** Kurze Schulter; lange Schulter; gebogener Arm; kantiger Arm; terminal mit Haken oder Verlängerung.
- **Verwechslungsrisiko:** Keine geschlossene Punze oder vollständige Schulter wie n hinzufügen.
- **Graffiti-Transfer:** Throw-up: throw-up-orientiert: kurzer, runder Schulterbogen mit kräftigem Stamm. Block: block-style: kompakter Stamm und klarer, kurzer Arm mit offenem Raum. Piece/Wildstyle: piece-wildstyle-orientiert: den Arm als gerichtete Verbindung verlängern, aber nicht zu einem n-Bogen ausbauen.

### s — x-height-body

- **Grundform:** Geschwungene Spine mit oberem und unterem Bogen sowie zwei offenen Terminals.
- **Anatomie:** Spine, oberer Bogen, unterer Bogen, obere/untere Endung, zwei offene Räume.
- **Raster:** Grundlinie und x-Höhe; die Enden können leicht über die Linien hinausreichen. Gewicht oben/unten variieren.
- **Fünf Strukturvarianten:** Top-heavy; bottom-heavy; ausgewogen; kantig; mit verlängertem oberen oder unteren Terminal.
- **Verwechslungsrisiko:** Keine geschlossene Punze; die Taille muss lesbar bleiben.
- **Graffiti-Transfer:** Throw-up: throw-up-orientiert: breite, runde S-Kurve mit offener Mitte und stabilen Enden. Block: block-style: klar gegliederte obere und untere Masse mit kontrollierter Taille. Piece/Wildstyle: piece-wildstyle-orientiert: Spine als Richtungsachse nutzen und die Terminals gezielt verlängern.

### t — ascender

- **Grundform:** Stamm mit Ascender, Querbalken und Fuß oder unterem Terminal.
- **Anatomie:** Ascender/Stamm, Querbalken/Arm, Fuß, obere Endung, ggf. gebogener Ansatz.
- **Raster:** Grundlinie, x-Höhe und Ascenderlinie. Querbalkenposition und Ascenderhöhe sind Gestaltungsvariablen.
- **Fünf Strukturvarianten:** Kurzer Ascender; hoher Ascender; hoher Querbalken; tiefer Querbalken; gebogener Fuß oder gerades Ende.
- **Verwechslungsrisiko:** Nicht mit dem Versal T gleichsetzen; x-Höhe und Ascender erklären.
- **Graffiti-Transfer:** Throw-up: throw-up-orientiert: kompakter Stamm mit kurzem Querbalken und rundem Fuß. Block: block-style: hoher gerader Stamm und präziser Querbalken, klare Kreuzung. Piece/Wildstyle: piece-wildstyle-orientiert: Querbalken als kontrollierte Brücke einsetzen; Stamm bleibt sichtbar.

### u — x-height-body

- **Grundform:** Zwei Stämme, verbunden durch einen unteren Bogen; oben bleibt die Form offen.
- **Anatomie:** Linker/rechter Stamm, unterer Bogen, zwei obere Terminals, offener Innenraum.
- **Raster:** Grundlinie und x-Höhe; der untere Bogen darf leicht unter die Grundlinie overshooten.
- **Fünf Strukturvarianten:** Schmal; breit; tiefer runder Bogen; flacher Bogen; kantiger Grund mit unterschiedlich hohen Stämmen.
- **Verwechslungsrisiko:** Oben offen halten; v hat einen spitzen Treffpunkt.
- **Graffiti-Transfer:** Throw-up: throw-up-orientiert: breite U-Masse mit offenem oberen Raum. Block: block-style: parallele Stämme und kontrollierter, flacher Grundbogen. Piece/Wildstyle: piece-wildstyle-orientiert: einen Stamm verlängern und den Bogen als Übergang nutzen, ohne die Öffnung zu schließen.

### v — x-height-body

- **Grundform:** Zwei diagonale Hauptzüge treffen sich in einem unteren Scheitel; oben ist die Form offen.
- **Anatomie:** Linker/rechter Diagonalzug, Scheitel, zwei obere Terminals, offener Innenraum.
- **Raster:** Grundlinie und x-Höhe. Der Scheitel kann die Grundlinie leicht überschreiten; obere Enden richten sich an x-Höhe aus.
- **Fünf Strukturvarianten:** Schmaler Winkel; breiter Winkel; runder Scheitel; flacher Scheitel; asymmetrische Schenkel.
- **Verwechslungsrisiko:** Nicht mit dem gerundeten Grund von u verwechseln.
- **Graffiti-Transfer:** Throw-up: throw-up-orientiert: breite, weiche V-Form mit klarer Spitze. Block: block-style: zwei kräftige Diagonalen mit präzisem Scheitel. Piece/Wildstyle: piece-wildstyle-orientiert: Schenkel unterschiedlich neigen und einen Auslauf als Verbindung planen.

### w — x-height-body

- **Grundform:** Vier diagonale Teilzüge mit zwei unteren Richtungswechseln; zwei offene Innenräume.
- **Anatomie:** Vier Schenkel, zwei Scheitel, obere Terminals, zwei offene Innenräume.
- **Raster:** Grundlinie und x-Höhe; beide Scheitel können unterschiedlich tief liegen.
- **Fünf Strukturvarianten:** Eng; breit; zwei gleich tiefe Scheitel; asymmetrische Scheitel; runde oder kantige Übergänge.
- **Verwechslungsrisiko:** Nicht als bloßes doppeltes v ohne gemeinsame Proportion behandeln.
- **Graffiti-Transfer:** Throw-up: throw-up-orientiert: breite Doppel-V-Masse mit klaren zwei Tälern. Block: block-style: vier kräftige Diagonalen und zwei präzise Innenwinkel. Piece/Wildstyle: piece-wildstyle-orientiert: die zwei Täler versetzen und eine Diagonale als kontrollierte Verbindung verlängern.

### x — x-height-body

- **Grundform:** Zwei sich kreuzende Diagonalen mit vier freien Enden; der Kreuzungspunkt ist ein zentrales Strukturmerkmal.
- **Anatomie:** Erster und zweiter Diagonalzug, Kreuzung, vier Terminals, vier entstehende Negativräume.
- **Raster:** Grundlinie und x-Höhe; Enden liegen innerhalb des Körpers, Kreuzung kann optisch leicht versetzt sein.
- **Fünf Strukturvarianten:** Symmetrisches x; asymmetrisches x; hoher Kreuzungspunkt; tiefer Kreuzungspunkt; gebogene oder gerundete Terminals.
- **Verwechslungsrisiko:** Die Kreuzung ist keine geschlossene Punze; nicht mit k oder Multiplikationszeichen verwechseln.
- **Graffiti-Transfer:** Throw-up: throw-up-orientiert: kompakte Kreuzung mit vier klaren Enden. Block: block-style: zwei breite Diagonalen, Kreuzung kontrolliert und nicht überfüllt. Piece/Wildstyle: piece-wildstyle-orientiert: die Diagonalen gegeneinander versetzen und eine Verbindung über die Kreuzung hinaus planen.

### y — descender

- **Grundform:** Zwei obere Arme vereinigen sich in einem Stamm oder Bogen, der unter die Grundlinie reicht.
- **Anatomie:** Linker/rechter Arm, Verbindung/Gelenk, Descender, unteres Terminal oder Loop.
- **Raster:** Grundlinie, x-Höhe und Descenderlinie. Die Arme liegen im x-Höhenkörper, der untere Zug reicht darunter.
- **Fünf Strukturvarianten:** Kurzer Descender; langer Descender; gerader Abstieg; gebogener Abstieg; offener oder loopartiger Endzug.
- **Verwechslungsrisiko:** Der Abstieg ist unter der Grundlinie; die obere Gabel bleibt sichtbar.
- **Graffiti-Transfer:** Throw-up: throw-up-orientiert: breite obere Gabel und kräftiger, klarer Abstieg. Block: block-style: zwei präzise Arme treffen in einem kontrollierten Gelenk zusammen. Piece/Wildstyle: piece-wildstyle-orientiert: Descender als gerichtete Verbindung unterhalb der Grundlinie führen.

### z — x-height-body

- **Grundform:** Zwei horizontale Balken werden durch einen diagonalen Verbindungszug verbunden.
- **Anatomie:** Oberer Balken, unterer Balken, Diagonale, drei freie Endungen, offene Zwischenräume.
- **Raster:** Grundlinie und x-Höhe; oberer und unterer Balken liegen innerhalb des x-Höhenkörpers.
- **Fünf Strukturvarianten:** Gerade Diagonale; gebogene Diagonale; schräger Balken; versetzte Balken; verlängertes unteres Terminal.
- **Verwechslungsrisiko:** Keine Punze; nicht mit der Ziffer 2 gleichsetzen.
- **Graffiti-Transfer:** Throw-up: throw-up-orientiert: kompakte Z-Form mit kräftigen Balken und klarer Diagonale. Block: block-style: parallele Balken und präzise Diagonale, Negativraum sauber halten. Piece/Wildstyle: piece-wildstyle-orientiert: Diagonale als Bewegungsachse verlängern, ohne den Buchstaben in 2 oder s kippen zu lassen.


### Ziffern

### 0 — lining-numeral

- **Grundform:** Lining-Ziffer mit geschlossenem Oval oder abgerundetem Viereck; ein Innenraum bleibt offen als Counter.
- **Anatomie:** Außenkontur, geschlossene Punze, obere/untere Rundung, optionale Schrägachse oder diagonaler Strich als Unterscheidungszeichen.
- **Raster:** Grundlinie und Versalhöhe/figurenhöhe; keine x-Höhe. Default ist eine Lining-Ziffer, die auf der Grundlinie steht.
- **Fünf Strukturvarianten:** Schmales Oval; breites Oval; eckig gerundetes Rechteck; geneigte Achse; optionale durchgehende Schrägmarkierung zur O-Unterscheidung.
- **Verwechslungsrisiko:** Ziffer im Lining-System; nicht als Kleinbuchstabe o setzen.
- **Graffiti-Transfer:** Throw-up: throw-up-orientiert: breite, runde Null mit großzügigem Counter. Block: block-style: geometrische Null mit stabiler Wandstärke und klarer Achse. Piece/Wildstyle: piece-wildstyle-orientiert: geneigte oder facettierte Null mit geplantem Innenraum; nicht nur ein Effekt-Slash.

### 1 — lining-numeral

- **Grundform:** Aufrechter Hauptstamm, häufig mit oberer Fahne und/oder unterem Fuß; die Konstruktion variiert stark.
- **Anatomie:** Stamm, obere Fahne, unterer Fuß/Basis, optional diagonaler Einstieg.
- **Raster:** Grundlinie und Figurenhöhe/Versalhöhe; keine x-Höhe. Die Basis muss die Ziffer im Zahlenblock stabilisieren.
- **Fünf Strukturvarianten:** Schlichter Stamm; Fahne links; Fahne rechts; breiter Fuß; diagonaler Einstieg mit geradem Stamm.
- **Verwechslungsrisiko:** Nicht als Kleinbuchstabe l oder Versal I behandeln.
- **Graffiti-Transfer:** Throw-up: throw-up-orientiert: kräftiger Stamm mit klarer Fahne und stabiler Basis. Block: block-style: geometrischer Stamm mit breitem Fuß und präziser Oberkante. Piece/Wildstyle: piece-wildstyle-orientiert: Fahne und Fuß als gerichtete Enden gestalten, ohne die Vertikale zu verlieren.

### 2 — lining-numeral

- **Grundform:** Obere Kurve oder Bogen geht in eine Diagonale über, die auf einer unteren Basis endet.
- **Anatomie:** Oberer Bogen, Übergang, diagonaler Abstieg, untere Basis, freie Endungen.
- **Raster:** Grundlinie und Figurenhöhe; obere Rundung kann leicht über die Höhe hinausreichen, Basis sitzt auf der Grundlinie.
- **Fünf Strukturvarianten:** Runder Kopf; kantiger Kopf; lange Diagonale; flache Basis; verlängertes unteres Terminal.
- **Verwechslungsrisiko:** Die Basis ist ein entscheidender Abschluss; nicht als z lesen lassen.
- **Graffiti-Transfer:** Throw-up: throw-up-orientiert: runder Kopf und breite, klare Basisdiagonale. Block: block-style: definierter Kopf, kräftige Diagonale und gerade Basis. Piece/Wildstyle: piece-wildstyle-orientiert: Diagonale als Hauptbewegung mit kontrolliertem oberen Anschluss verlängern.

### 3 — lining-numeral

- **Grundform:** Zwei übereinanderliegende Bögen oder Schalen mit einer offenen rechten Seite und einer Taille.
- **Anatomie:** Oberer Bogen, unterer Bogen, Taille, obere/untere Terminals, zwei offene Innenräume.
- **Raster:** Grundlinie und Figurenhöhe; obere und untere Schale können unterschiedlich groß sein.
- **Fünf Strukturvarianten:** Obere Schale kleiner; untere Schale kleiner; kantige Bögen; offene breite Taille; kompakte, eng gestapelte Bögen.
- **Verwechslungsrisiko:** Keine zwei geschlossenen Counter wie bei 8 erzeugen.
- **Graffiti-Transfer:** Throw-up: throw-up-orientiert: zwei runde, gut getrennte Schalen mit offener rechter Seite. Block: block-style: zwei kantig gerundete Bögen und klare Taille. Piece/Wildstyle: piece-wildstyle-orientiert: obere und untere Schale gegeneinander versetzen, aber die offene Seite behalten.

### 4 — lining-numeral

- **Grundform:** Diagonaler oder senkrechter Zug bildet mit Querbalken und Stamm eine offene oder geschlossene obere Struktur.
- **Anatomie:** Diagonalzug, senkrechter Stamm, Querbalken, optionaler Innenraum bei geschlossener Konstruktion, Endungen.
- **Raster:** Grundlinie und Figurenhöhe; Querbalken und oberer Anschluss variieren. Default kann offen oder geschlossen sein, muss aber klar benannt werden.
- **Fünf Strukturvarianten:** Offenes 4; geschlossenes 4; hoher Querbalken; tiefer Querbalken; diagonaler Einstieg mit verlängertem Fuß.
- **Verwechslungsrisiko:** Nicht pauschal als geschlossenes Dreieck konstruieren; offene 4 ist ebenso gültig.
- **Graffiti-Transfer:** Throw-up: throw-up-orientiert: offene, kompakte 4 mit großem Innenraum. Block: block-style: gerader Stamm, klarer Querbalken und präziser Diagonalzug. Piece/Wildstyle: piece-wildstyle-orientiert: Diagonale und Querbalken als bewusst versetzte Struktur, ohne A-ähnliche Silhouette.

### 5 — lining-numeral

- **Grundform:** Oberer Balken und Abstieg gehen in eine untere Kurve oder Schale über.
- **Anatomie:** Oberer Balken, linker Stamm/Abstieg, mittlere Ecke oder Schulter, untere Schale, Terminal.
- **Raster:** Grundlinie und Figurenhöhe; die obere Zone und untere Kurve müssen ausgewogen sein.
- **Fünf Strukturvarianten:** Kantiger Abstieg; runde untere Schale; offene untere Kurve; kurzer oberer Balken; verlängerter Endzug.
- **Verwechslungsrisiko:** Nicht nur als S mit gerader Oberkante behandeln.
- **Graffiti-Transfer:** Throw-up: throw-up-orientiert: kräftiger oberer Balken und runde, offene untere Schale. Block: block-style: klare obere Kante, kontrollierte Ecke und stabile Basis. Piece/Wildstyle: piece-wildstyle-orientiert: die untere Kurve in eine gerichtete Verlängerung führen, ohne die obere Kante zu verlieren.

### 6 — lining-numeral

- **Grundform:** Oberer Einstieg führt in eine geschlossene oder nahezu geschlossene untere Schale mit Counter.
- **Anatomie:** Oberer Terminal, Bogen, untere Schale, Counter, Anschluss an den Einstieg.
- **Raster:** Grundlinie und Figurenhöhe; die Schale sitzt unten, der obere Einstieg kann in die Höhe reichen.
- **Fünf Strukturvarianten:** Offener Einstieg; geschlossener Einstieg; runde Schale; eckige Schale; enger oder weiter Counter.
- **Verwechslungsrisiko:** Nicht mit 9 spiegeln, ohne den Einstieg zu ändern.
- **Graffiti-Transfer:** Throw-up: throw-up-orientiert: runde untere Schale mit gut sichtbarem Einstieg. Block: block-style: geometrische Schale und sauberer Counter mit kontrolliertem oberen Terminal. Piece/Wildstyle: piece-wildstyle-orientiert: Einstieg als Richtungswechsel über der Schale führen, ohne den Counter zu überdecken.

### 7 — lining-numeral

- **Grundform:** Oberer Balken mit diagonalem Abstieg; optionaler Querstrich oder Fuß.
- **Anatomie:** Oberer Balken, Diagonale, unterer Terminal/Fuß, optionaler Querstrich.
- **Raster:** Grundlinie und Figurenhöhe; obere Kante sitzt an der Figurenhöhe, Diagonale endet auf der Grundlinie.
- **Fünf Strukturvarianten:** Ohne Querstrich; mit Querstrich; gebogene Diagonale; kurzer Fuß; langer, flacher Balken.
- **Verwechslungsrisiko:** Nicht nur als 1 mit Schrägstrich zeichnen.
- **Graffiti-Transfer:** Throw-up: throw-up-orientiert: breiter oberer Balken und kräftige Diagonale. Block: block-style: klare horizontale Oberkante und gerader, stabiler Abstieg. Piece/Wildstyle: piece-wildstyle-orientiert: Diagonale als starke Bewegungsachse verlängern, optional mit kontrolliertem Querstrich.

### 8 — lining-numeral

- **Grundform:** Zwei geschlossene Schalen mit zwei Countern, verbunden durch eine Taille.
- **Anatomie:** Obere Schale, untere Schale, obere und untere Punze, Taille, Außenkontur.
- **Raster:** Grundlinie und Figurenhöhe; obere und untere Schale dürfen unterschiedlich groß sein, beide Counter müssen offen bleiben.
- **Fünf Strukturvarianten:** Gleiche Schalen; kleinere obere Schale; kleinere untere Schale; enge Taille; eckige oder ovale Schalen.
- **Verwechslungsrisiko:** Nicht mit B oder zwei gestapelten Kreisen verwechseln.
- **Graffiti-Transfer:** Throw-up: throw-up-orientiert: runde Doppelmasse mit großzügigen Countern. Block: block-style: zwei kontrollierte Schalen mit klarer Taille und stabiler Wandstärke. Piece/Wildstyle: piece-wildstyle-orientiert: Schalen gegeneinander kippen und die Taille als kontrollierten Verbindungspunkt nutzen.

### 9 — lining-numeral

- **Grundform:** Obere Schale mit Counter und nach unten führendem Stamm oder Tail.
- **Anatomie:** Obere Schale, Counter, Stamm/Tail, Anschluss, unterer Terminal.
- **Raster:** Grundlinie und Figurenhöhe; obere Schale liegt im oberen Bereich, Tail endet auf oder nahe der Grundlinie.
- **Fünf Strukturvarianten:** Gerader Tail; gebogener Tail; kurzer Tail; langer Tail; offene oder geschlossene Schale.
- **Verwechslungsrisiko:** Nicht einfach 6 spiegeln; obere Schale und Tail-Anschluss unterscheiden sich.
- **Graffiti-Transfer:** Throw-up: throw-up-orientiert: runde obere Schale und klarer kurzer Abstieg. Block: block-style: geometrische obere Schale mit geradem, stabilem Tail. Piece/Wildstyle: piece-wildstyle-orientiert: Tail als kontrollierte Verlängerung nach unten führen, Counter frei lassen.


## Qualitäts- und Rechte-Gates

- Keine Stock-Font-Glyphe als Ersatz für eine selbst konstruierte Graffiti-Form.
- Die fünf Varianten müssen sich in Silhouette, Geometrie, Anschlüssen, Negativraum oder Proportion unterscheiden — nicht nur in Farbe und Effekten.
- Panel 8 ist ein Hauptfeld. Die drei Graffiti-Richtungen müssen auf den ersten Blick unterschiedliche Konstruktionen sein.
- Buchstabenidentität muss ohne Farbe, Outline, Shadow oder Drips erkennbar bleiben.
- Keine reale Writer-Signatur, Crew-Schrift, existierende Piece-Kontur oder Buchabbildung nachzeichnen.
- Bildrechte und Metadaten bleiben getrennt. Ein öffentlich sichtbares Bild ist keine automatische Nutzungsfreigabe.
- Statische Letterform-Ansichten belegen weder Strichreihenfolge noch Tempo, Druck, Werkzeughaltung oder Aerosoltechnik.
- Alle Beschriftungen bleiben echte, editierbare SVG-Textobjekte und werden auf Rechtschreibung und Lesbarkeit geprüft.
- Für jedes Zeichen werden Vollversion und Clean-Print-Version erzeugt. Prüfung bei A4-Größe und 100 %; danach erst Owner-Review.
- Status bleibt **Entwurf**, bis der Owner die Proofs geprüft hat.

## Quellen und Aussagebereich

- [WordPress Developer Blog — The Anatomy of a Letterform](https://developer.wordpress.org/news/2023/08/the-anatomy-of-a-letterform/) — Stem, Bowl, Counter, Shoulder, Eye, Ascender, Descender und Aperture. Typografische Anatomie, keine Graffiti-Stilnorm.
- [Interaction Design Foundation — What Is Type Anatomy?](https://ixdf.org/literature/article/what-is-type-anatomy) — Baseline, x-height, Ascender/Descender, Counter, Aperture, Tittle und Terminal.
- [Monotype / MyFonts — Two Story Type](https://cms.myfonts.com/sites/default/files/2024-10/Manual-Two%20Story%20Type.pdf) — Single- und Double-Storey-Konstruktionen von `a` und `g`.
- [Type.today — Manual: Numerals](https://type.today/en/journal/numerals) — Lining/Oldstyle sowie proportionale/tabellarische Ziffern. Die Unterscheidung dient der Systematik; die Academy verwendet zunächst Lining-Ziffern.
- [INGRID — Informationssystem Graffiti in Deutschland](https://www.uni-paderborn.de/forschungsprojekte/ingrid/seite-2) — wissenschaftlicher Bild- und Metadatenkorpus. INGRID ist für die kontinuierliche Weiterbildung zu Graffiti-Praxis, Typen und Stilannotationen relevant; aus diesem Datenbankzugang wurde in diesem Paket kein einzelner Letter kopiert.

**Quellenregel:** Die typografischen Quellen begründen Anatomiebegriffe und Ziffernsysteme. Die drei Graffiti-Transferentwürfe sind eigenständige NIGHTSHIFT-Designvorschläge, keine aus diesen Quellen abgeleiteten historischen Stilregeln.
