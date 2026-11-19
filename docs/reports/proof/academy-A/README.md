# Prüfbelege: Buchstabenstudie A (Academy)

Erzeugt mit `npm run proof:academy`: Headless Chrome rendert die SVG und führt die Layout-Prüfung aus `tools/academy/qa.html` aus. Die PNG-Bilder wurden danach von Hand in WebP umgewandelt, damit sie das Repo nicht aufblähen.

| Datei | Inhalt |
|---|---|
| `letter-study_A_01.webp` | Vollversion, 1680 × 1188 (A4 quer) |
| `letter-study_A_01_clean.webp` | Druckversion ohne Textur und Spray |
| `letter-study_A_01_clean-graustufen.webp` | Druckversion in Graustufen: Prüfung, dass nichts allein über Farbe erklärt wird |
| `crop-2x-*.webp` | Ausschnitte der Felder 2, 4, 5, 7 und 8 in doppelter Auflösung |
| `*.qa.json` | Ergebnis der Layout-Prüfung |

## Was die Layout-Prüfung erfasst

- Jeder Text liegt innerhalb seines Feldes.
- Kein Text überlappt einen anderen.
- Kein Spritzer aus der Spray-Ebene liegt über einem Text.
- Alle sechs Anatomie-Pfeile enden im richtigen Bauteil: fünf in der Buchstabenfläche, der Pfeil zur Punze im Innenraum.
- Beide Schriften sind geladen.

Stand 16.11.2026: In beiden Versionen gibt es 0 Befunde.

## Was die Layout-Prüfung nicht erfasst

- Ob die Graffiti-Entwürfe gut aussehen und ob die Lehrinhalte stimmen. Das beurteilt der Owner.
- Die Darstellung in Inkscape, Illustrator oder beim PDF-Export. Diese Programme können die eingebetteten Schriften ignorieren, siehe `assets/fonts/academy/LICENSES.md`.
