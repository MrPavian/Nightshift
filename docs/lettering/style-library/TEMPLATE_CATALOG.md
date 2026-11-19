# NIGHTSHIFT — Complete Template Collection

Version 1.0.0 · 38 templates · 12 families

Status: complete documentation baseline. All entries are draft design hypotheses pending rendered proof and practitioner review. Machine-readable source: [templates.json](templates.json). Family-level evidence, background, failure modes and detailed glyph notes remain in each linked style card.

## How to use this collection

Choose independently across four axes: letterform grammar, composition grammar, practice/format context and rendering treatment. Do not collapse them into one enum. An entry here does not imply that the renderer already supports it.

Maturity: documented-draft = specification exists; rendered = proof plates exist; compared = controlled comparison completed; practitioner-reviewed = terminology/forms reviewed; generator-ready = calibrated parameters and regression tests pass. This collection currently claims only documented-draft.

## Bubble (3)

Axis: letterform · Engine status: base-operation · Family card: [styles/bubble.md](styles/bubble.md)

### 1. Classic Inflated — bubble.classic-inflated

- Intent: Runde, aufgeblasene Masse mit klarer Glyphen-Anatomie.
- Construction: Skelett glyphenspezifisch aufblasen; Außenkontur runden; Counter und Brücken separat sichern.
- Parameters: inflationAmount; cornerRoundness; strokeMass; counterPreservation
- Guardrail: Keine uniforme Ovalisierung; A/B/R-Counter, G-Öffnung und S-Waist erhalten.
- Acceptance probes: A B G O R S U; BUBBLE GHOST

### 2. Softie / Organic — bubble.softie-organic

- Intent: Elastische, organische Bubble-Form mit kontrollierter Asymmetrie.
- Construction: Bowl-Spannung, Breite und Terminalmasse je Glyph variieren; Familienrhythmus halten.
- Parameters: bowlElasticity; widthVariation; terminalRoundness; asymmetryBudget
- Guardrail: Organische Variation darf keine Glyphen-Anatomie zerstören.
- Acceptance probes: B C G S U; SOUL MARS

### 3. Compact Bubble — bubble.compact-bubble

- Intent: Dichte, kompakte Bubble-Form mit verstärkten Engstellen.
- Construction: Breite und Abstände selektiv reduzieren; Hälse verstärken; Counter nach jeder Massenerhöhung prüfen.
- Parameters: compactness; neckStrength; counterClearance; overlapTolerance
- Guardrail: Kompaktheit nie durch geschlossene Counter oder ungewollte Fusion erkaufen.
- Acceptance probes: A B R S O; RISK BOMB

## Blockbuster / Block (3)

Axis: letterform + format · Engine status: partial-operation · Family card: [styles/blockbuster.md](styles/blockbuster.md)

### 1. Broad Block — blockbuster.broad-block

- Intent: Breite, robuste Straight-/Block-Konstruktion.
- Construction: Breite Stämme und Balken aufbauen; eckige Übergänge setzen; Glyphenbreiten individuell halten.
- Parameters: stemMass; counterScale; cornerTreatment; barAlignment
- Guardrail: Nicht jeden Buchstaben zum identischen Rechteck machen.
- Acceptance probes: A B E M R; POWER TRAIN

### 2. Angled Block — blockbuster.angled-block

- Intent: Block-Konstruktion mit kontrollierter Schräglage und Richtung.
- Construction: Gemeinsamen Wortwinkel definieren; Glyphen-Innenachsen stabil halten; Spacing kompensieren.
- Parameters: globalSlant; localAngleOverride; stemMass; spacingCompensation
- Guardrail: Scherung darf Counter und Balken nicht entstellen.
- Acceptance probes: A K M N W; KRAFT MIND

### 3. Monumental Blockbuster Context — blockbuster.monumental-blockbuster

- Intent: Großflächiger, ökonomischer Wortblock auf Basis einer Letterform-Grammatik.
- Construction: Basisgrammatik wählen; Blockproportionen und Detailbudget definieren; Glyphen nicht willkürlich stauchen.
- Parameters: blockAspectRatio; density; capHeight; detailBudget
- Guardrail: Format-/Flächeneigenschaft, keine eigenständige Alphabet-Grammatik.
- Acceptance probes: POWER TRAIN; gleicher Schriftzug in zwei Layoutmaßstäben

## Wildstyle (3)

Axis: composition · Engine status: blocked-c04 · Family card: [styles/wildstyle.md](styles/wildstyle.md)

### 1. Open Wildstyle — wildstyle.open-wildstyle

- Intent: Richtungsbetonte Extensions bei gut nachvollziehbarem Buchstabenskelett.
- Construction: Glyphen zunächst getrennt setzen; wenige Extensions von dokumentierten Ankern ergänzen; Verbindungen deklarieren.
- Parameters: extensionComplexity; connectionDensity; abstractionBudget; negativeSpaceProtection
- Guardrail: Keine ankerlosen Spikes oder undeklarierten Kreuzungen.
- Acceptance probes: AB AR BA RA; GHOST

### 2. Interlocked Wildstyle — wildstyle.interlocked-wildstyle

- Intent: Dichte strukturelle Verflechtung mehrerer Glyphen.
- Construction: Beziehungsgraph aus Attachment, Overlap, Crossing, Continuation, Near-contact und Shared contour; Layerfolge festlegen.
- Parameters: interlockDepth; acceptedJoinCount; crossingPolicy; sharedContourPolicy
- Guardrail: Jede Verbindung braucht Anker, Typ, Clearance und Layerfolge.
- Acceptance probes: KRAZE SQUE MIND; dichter Fünfbuchstabenname

### 3. Abstract Wildstyle — wildstyle.abstract-wildstyle

- Intent: Stärkere Abstraktion mit explizit dokumentierter Rest-Lesbarkeit.
- Construction: Basisglyphen dokumentieren; gezielte Transformationen wählen; Negativraumkanäle schützen; dekorative Marks trennen.
- Parameters: abstractionBudget; glyphTraceability; directionalFlow; negativeSpaceProtection
- Guardrail: Nicht Lesbarkeit behaupten, wenn Glyphenbelege absichtlich verschwinden.
- Acceptance probes: gleicher Schriftzug in Open/Balanced/Abstract

## Tag / Handstyle (3)

Axis: practice + movement · Engine status: documentation-only · Family card: [styles/tag-handstyle.md](styles/tag-handstyle.md)

### 1. Monoline Handstyle — tag-handstyle.monoline-handstyle

- Intent: Einheitlicher Strichcharakter mit rhythmischer, persönlicher Form.
- Construction: Schreibfluss, Neigung, Verbindungen und Abstände als zusammenhängende Bewegung modellieren.
- Parameters: strokeWeight; slant; rhythm; spacing; continuity
- Guardrail: Keine Font-Mechanik vortäuschen; statische Form beweist keine reale Schreibbewegung.
- Acceptance probes: A R S N; kurze Fantasienamen

### 2. Broad-Nib / Flatline — tag-handstyle.broad-nib-flatline

- Intent: Gerichteter Strichkontrast durch breite oder flache Schreibkante.
- Construction: Kantenwinkel und Strichrichtung definieren; Thick/Thin aus Werkzeugorientierung ableiten.
- Parameters: nibAngle; pressure; strokeContrast; terminalCut
- Guardrail: Kontrast muss aus konsistenter Werkzeuglogik folgen, nicht zufällig variieren.
- Acceptance probes: E F H K; Fantasiename mit diagonalen Strichen

### 3. Brush / Gestural — tag-handstyle.brush-gestural

- Intent: Elastische, gestische Striche mit variabler Masse und zugespitzten Enden.
- Construction: Druck-/Geschwindigkeitskurve simulieren; Strichenden und Überlappungen kontrollieren.
- Parameters: pressureCurve; speedInfluence; taper; overlap
- Guardrail: Keine Pinseloptik als Ersatz für lesbare Buchstabenstruktur.
- Acceptance probes: A M R S; kurze gestische Wortprobe

## Throw-up (3)

Axis: practice / format · Engine status: context-only · Family card: [styles/throw-up.md](styles/throw-up.md)

### 1. Rounded Throw-up — throw-up.rounded-throw-up

- Intent: Ökonomisches Throw-up-Format mit Bubble-basierter Letterform.
- Construction: Bubble-Grammatik wählen; vereinfachte Kontur und kompakte Wortform definieren; Finish separat halten.
- Parameters: simplification; wordDensity; outlineMode; fillMode
- Guardrail: Throw-up-Kontext ist kein Bubble-Synonym und schreibt keine Farbe vor.
- Acceptance probes: BOMB GHOST; kurzer Name

### 2. Straight Throw-up — throw-up.straight-throw-up

- Intent: Ökonomisches Throw-up-Format mit Straight-/Block-Buchstaben.
- Construction: Straight-Basis wählen; robuste, reduzierte Kontur; kompakte Wortorganisation.
- Parameters: simplification; stemMass; wordDensity; outlineMode
- Guardrail: Nicht automatisch Blockbuster oder Bubble nennen.
- Acceptance probes: RISK TRAIN; kurzer Name

### 3. Hollow / Outline Throw-up — throw-up.hollow-outline-throw-up

- Intent: Throw-up-Präsentation mit konturbetonter, ungefüllter Darstellung.
- Construction: Format und Letterform wählen; Fill deaktivieren; Outline als Darstellungsschicht führen.
- Parameters: outlineWeight; contourPriority; fillEnabled; simplification
- Guardrail: Hollow ist Behandlung/Präsentation, keine eigene Letterform-Grammatik.
- Acceptance probes: A B R S; identisches Wort filled vs hollow

## Simple / Straight (4)

Axis: letterform · Engine status: base-operation · Family card: [styles/simple-straight.md](styles/simple-straight.md)

### 1. Classic Straight — simple-straight.classic-straight

- Intent: Lesbare, klare Grundkonstruktion mit kontrollierter Masse.
- Construction: Skelett und Proportionen definieren; Stämme/Balken konsistent ausbauen; lokale Anatomie bewahren.
- Parameters: stemMass; widthClass; baseline; spacing
- Guardrail: Einfach bedeutet nicht generisch oder mechanisch identisch.
- Acceptance probes: A B G R S; ABRA

### 2. Condensed Straight — simple-straight.condensed-straight

- Intent: Schmalere, dichte Straight-Konstruktion.
- Construction: Glyphenbreite selektiv reduzieren; Counter und Innenräume proportional schützen.
- Parameters: widthScale; stemMass; counterClearance; spacing
- Guardrail: Keine globale horizontale Stauchung ohne glyphenspezifische Korrektur.
- Acceptance probes: M N R S; MIND RISK

### 3. Serif / Extended — simple-straight.serif-extended

- Intent: Straight-Grundkörper mit strukturellen Serifen oder verlängerten Terminals.
- Construction: Serifenrollen und Endpunkte definieren; Hauptstämme lesbar halten; Extensions in Advance/Spacing einrechnen.
- Parameters: serifLength; serifWeight; terminalExtension; spacingCompensation
- Guardrail: Serifen dürfen keine neuen Glyphen oder zufällige Kollisionen erzeugen.
- Acceptance probes: E F I L T; TITLE

### 4. Hollow Straight — simple-straight.hollow-straight

- Intent: Straight-Letterform als reine Kontur-/Hohlform-Präsentation.
- Construction: Classic-Straight-Geometrie beibehalten; Fill als Rendering-Layer aus; Konturstärke separat setzen.
- Parameters: outlineWeight; fillEnabled; contourOffset
- Guardrail: Hollow darf Frontface-Geometrie nicht verändern.
- Acceptance probes: A B R S; gleiches Wort filled vs hollow

## Angular / Blade (3)

Axis: letterform · Engine status: documentation-only · Family card: [styles/angular-blade.md](styles/angular-blade.md)

### 1. Faceted Angular — angular-blade.faceted-angular

- Intent: Facettierte, kantige Kontur mit klaren Segmentwechseln.
- Construction: Kontur in gerichtete Segmente zerlegen; Knicke nach Glyphenrolle setzen; Innenräume schützen.
- Parameters: facetCount; cornerSharpness; segmentAngle; counterClearance
- Guardrail: Facettierung nicht als zufälliges Zackenrauschen erzeugen.
- Acceptance probes: A K M N W; KRAZE

### 2. Blade / Tapered — angular-blade.blade-tapered

- Intent: Gerichtete, keilförmige Stämme und zugespitzte Terminals.
- Construction: Taper von definierten Stammachsen ableiten; Terminalspitzen kontrolliert auslaufen lassen.
- Parameters: taperLength; taperWidth; directionVector; terminalSharpness
- Guardrail: Taper darf Stämme nicht unter Mindestbreite reduzieren.
- Acceptance probes: A K R V Y; BLADE

### 3. Cut / Shard — angular-blade.cut-shard

- Intent: Gezielte Einschnitte und abgesetzte Konturfragmente.
- Construction: Schnittpositionen als explizite Kontur-Features markieren; Fragmentbeziehungen dokumentieren.
- Parameters: cutDepth; cutAngle; shardOffset; continuityPolicy
- Guardrail: Jeder Cut muss bewusst und reproduzierbar sein; keine zufälligen Löcher.
- Acceptance probes: E F K X Z; FRACTURE

## Semi-Wildstyle (3)

Axis: composition · Engine status: documentation-only · Family card: [styles/semi-wildstyle.md](styles/semi-wildstyle.md)

### 1. Open Semi-Wild — semi-wildstyle.open-semi-wild

- Intent: Lesbare Basis mit wenigen gerichteten Erweiterungen.
- Construction: Straight/Bubble-Basis wählen; kleine Zahl an Extensions mit klaren Ursprüngen ergänzen.
- Parameters: extensionCount; anchorStrength; abstractionBudget; flow
- Guardrail: Erweiterungen dürfen nicht die Grundform dominieren.
- Acceptance probes: A R S; GHOST

### 2. Connected Semi-Wild — semi-wildstyle.connected-semi-wild

- Intent: Selektive Verbindungen und kontrollierte Überlagerungen.
- Construction: Verbindungsgraph aufbauen; Join-Typ und Layerfolge pro Paar deklarieren.
- Parameters: joinDensity; overlapDepth; crossingOrder; clearance
- Guardrail: Keine Verbindung ohne nachvollziehbare Glyphenanker.
- Acceptance probes: AB AR RA; KRAZE

### 3. Graphic Semi-Wild — semi-wildstyle.graphic-semi-wild

- Intent: Zurückhaltende sekundäre Strukturen als Teil des Wortflusses.
- Construction: Sekundärformen aus Glyphenachsen ableiten; Primärglyphen visuell priorisieren.
- Parameters: secondaryStructureBudget; axisAlignment; flow; contrast
- Guardrail: Dekoration nicht als strukturelle Verbindung ausgeben.
- Acceptance probes: MIND GHOST; Monochromvergleich

## Traditional / Old-School (4)

Axis: historical umbrella / mixed · Engine status: documentation-only · Family card: [styles/traditional-old-school.md](styles/traditional-old-school.md)

### 1. Early Simple Outline — traditional-old-school.early-simple-outline

- Intent: Historische Studienvorlage für einfache Outline-Schriftzüge.
- Construction: Reduzierte Glyphenbasis; Konturführung und frühe Outline-Hierarchie getrennt dokumentieren.
- Parameters: outlineWeight; simplification; spacing; baseline
- Guardrail: Keine universelle historische Vorlage behaupten; Zeitraum/Region angeben.
- Acceptance probes: A B E R; kurzer Name

### 2. Classic Softie — traditional-old-school.classic-softie

- Intent: Historische Studienvorlage für gerundete, weiche Buchstaben.
- Construction: Softie/Bubble-Formmerkmale mit eigener Glyphenproportion kombinieren.
- Parameters: inflation; roundness; counterScale; rhythm
- Guardrail: Nicht als einzig gültige Old-School-Form darstellen.
- Acceptance probes: B O S U; SOUL

### 3. Classic Straight / Block — traditional-old-school.classic-straight-block

- Intent: Historische Studienvorlage für einfache, breite Straight-/Block-Buchstaben.
- Construction: Gerade Stämme und Balken mit robuster Wortorganisation kombinieren.
- Parameters: stemMass; widthClass; cornerTreatment; spacing
- Guardrail: Nicht mit einem einzigen Blockbuster-Kanon gleichsetzen.
- Acceptance probes: A E H M; POWER

### 4. Classic Piece Treatment — traditional-old-school.classic-piece-treatment

- Intent: Piece-Kontext als Schicht über frei gewählter Letterform-Grammatik.
- Construction: Letterform und Komposition wählen; Piece-Rahmen/Anordnung als Kontextparameter führen.
- Parameters: compositionScale; detailBudget; layout; context
- Guardrail: Piece ist Formatkontext, keine einzelne Letterformfamilie.
- Acceptance probes: gleiches Wort mit zwei Letterform-Grammatiken

## Blackletter (3)

Axis: script-derived letterform · Engine status: documentation-only · Family card: [styles/blackletter.md](styles/blackletter.md)

### 1. Textura-Inspired — blackletter.textura-inspired

- Intent: Dichter vertikaler Rhythmus und gebrochene Bögen, inspiriert von Textura.
- Construction: Vertikale Stämme, gebrochene Bögen und enge Binnenräume als eigene Struktur modellieren.
- Parameters: stemContrast; verticalRhythm; archBreak; counterShape
- Guardrail: Textura nicht mit Fraktur oder pauschal Old English gleichsetzen.
- Acceptance probes: H M N U; TEXT

### 2. Fraktur-Inspired — blackletter.fraktur-inspired

- Intent: Gebrochene Striche mit variierenden Kurven und ausgewählten Schwüngen.
- Construction: Gebrochene Hauptzüge und kontrollierte Kurven kombinieren; historische Details bewusst auswählen.
- Parameters: strokeContrast; breakAngle; curveTension; terminalForm
- Guardrail: Nicht beliebige Spikes als Fraktur-Merkmal deklarieren.
- Acceptance probes: A G R S; FRAKTUR

### 3. Contemporary Hybrid — blackletter.contemporary-hybrid

- Intent: Ausgewählte Blackletter-Merkmale in eine moderne Graffiti-Komposition übertragen.
- Construction: Konkrete Skriptmerkmale benennen; mit zeitgenössischer Wortkomposition kombinieren.
- Parameters: sourceFeatureSet; contrast; width; compositionFlow
- Guardrail: Keine unspezifische Blackletter-Mischung; Herkunftsmerkmale dokumentieren.
- Acceptance probes: A R S T; HYBRID

## Calligraffiti (3)

Axis: hybrid letterform / movement · Engine status: documentation-only · Family card: [styles/calligraffiti.md](styles/calligraffiti.md)

### 1. Broad-Nib Calligraffiti — calligraffiti.broad-nib-calligraffiti

- Intent: Breitkantenkontrast mit großmaßstäblicher Graffiti-Komposition.
- Construction: Werkzeugwinkel festlegen; Strichkontrast konsistent ableiten; Glyphen in Wortfluss setzen.
- Parameters: nibAngle; contrastRatio; terminalCut; spacing
- Guardrail: Werkzeuglogik muss über alle Buchstaben konsistent bleiben.
- Acceptance probes: E H M T; SCRIPT

### 2. Pointed / Brush Calligraffiti — calligraffiti.pointed-brush-calligraffiti

- Intent: Elastische Striche mit druckabhängiger Breite und gestischen Enden.
- Construction: Druckkurve und Strichrichtung definieren; Übergänge und Überlagerungen kontrollieren.
- Parameters: pressureCurve; taper; strokeContrast; gestureAmplitude
- Guardrail: Nicht Brush-Optik mit zufälliger Verzerrung verwechseln.
- Acceptance probes: A R S Y; FLOW

### 3. Script-Hybrid Calligraffiti — calligraffiti.script-hybrid-calligraffiti

- Intent: Benannte Script-Merkmale werden in eine eigenständige Graffiti-Letterform übersetzt.
- Construction: Ausgangsskript benennen; ausgewählte Merkmale abstrahieren; neue Glyphenstruktur und Wortkomposition definieren.
- Parameters: scriptFeatureSet; abstraction; rhythm; connectionPolicy
- Guardrail: Keine bloße Kopie eines bestehenden Schriftzugs oder einer identifizierbaren Handschrift.
- Acceptance probes: G R S T; HYBRID

## Anti-Style / Experimental (3)

Axis: experimental grammar · Engine status: documentation-only · Family card: [styles/anti-style.md](styles/anti-style.md)

### 1. Raw / Unpolished — anti-style.raw-unpolished

- Intent: Kontrollierte Unregelmäßigkeit statt sauberer, polierter Kontur.
- Construction: Abweichungen in Breite, Ausrichtung und Kontur bewusst setzen; Glyphenidentität dokumentieren.
- Parameters: irregularityBudget; baselineDrift; widthVariance; contourRoughness
- Guardrail: Rauheit muss gestaltet und reproduzierbar sein, nicht Zufallsrauschen.
- Acceptance probes: A E M R S; STATIC

### 2. Deconstructed / Fragmented — anti-style.deconstructed-fragmented

- Intent: Gezielte Verschiebung oder Trennung ausgewählter Glyphenkomponenten.
- Construction: Basisglyph dokumentieren; Fragmente wählen und verschieben; Beziehungen und Lesesignale erhalten.
- Parameters: fragmentCount; displacement; omission; reconstructionCues
- Guardrail: Keine willkürliche Fragmentierung; Unlesbarkeit ehrlich kennzeichnen.
- Acceptance probes: K R X Z; FRACTURE

### 3. Abstract / Illegible-by-Design — anti-style.abstract-illegible

- Intent: Bewusste Bewegung von lesbarer Schrift zur visuellen Komposition.
- Construction: Ausgangswort festhalten; verbleibende Buchstabenmerkmale deklarieren; Ambiguität markieren.
- Parameters: abstractionLevel; retainedFeatures; glyphTraceability; negativeSpace
- Guardrail: Keine Lesbarkeit behaupten, wo keine mehr vorhanden ist.
- Acceptance probes: gleiches Wort in open/partial/abstract

## Global acceptance gates

1. Review every template as a monochrome front-face silhouette; treatments cannot create the only style difference.
2. Check glyph anatomy and negative-space topology before word composition.
3. Use easy and dense pair/word fixtures; label provisional glyph coverage honestly.
4. Record anchors, join types, crossings, shared contours and layer order explicitly.
5. Bound coupled parameters; no slider may silently collapse counters, necks or glyph identity.
6. Claim generator-ready only after calibrated fixtures, geometry validation and regression tests pass.
7. Keep historical claims qualified by source, region and period; operational NIGHTSHIFT subfamilies are not universal taxonomy.

## Orthogonal rendering treatments

Hollow, outline, inline, fill, extrusion/3D, chrome, shadow, drips, texture and stencil remain separate treatments. Apply them only after the selected grammar passes silhouette checks. See [RENDERING_TREATMENTS.md](RENDERING_TREATMENTS.md).

## Engine support snapshot

- base-operation: base operation exists; variants are not independently calibrated.
- partial-operation: some underlying operations exist; not a complete dedicated template renderer.
- blocked-c04: Wildstyle interlocking is blocked on the C04 relationship solver.
- context-only: context can be represented, but dedicated format presentation is incomplete.
- documentation-only: specification only; no distinct generator operation is claimed.

See [PROOF_IMPLEMENTATION_PLAN_01.md](PROOF_IMPLEMENTATION_PLAN_01.md) and [SOURCES.md](references/SOURCES.md).