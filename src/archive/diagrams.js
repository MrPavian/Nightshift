// Original explanatory diagrams for THE BLACKBOOK ARCHIVE (C06).
// All drawings are generated here from abstract shapes or from NIGHTSHIFT's own
// canonical glyph geometry. No external image, photograph or writer's work is
// reproduced. Each diagram returns an accessible SVG string.
// Text is German (the current edition); an English edition needs a string table here.

import { glyphGroup } from '../render/svg.js';

export const DIAGRAM_IDS = [
  'diagram.writing-forms',
  'diagram.subway-circulation',
  'diagram.documentation-chain',
  'diagram.circulation-network',
  'diagram.letter-anatomy',
  'diagram.negative-space',
  'diagram.evidence-layers',
];

const INK = '#16161a', PAPER = '#f3f4f1', MUTE = '#6d675c', ACCENT = '#c8372d', BLUE = '#2b5c8a';
const svg = (w, h, title, desc, body) =>
  `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${w} ${h}" role="img" aria-labelledby="t d" font-family="ui-sans-serif, system-ui, sans-serif"><title id="t">${title}</title><desc id="d">${desc}</desc><rect width="${w}" height="${h}" rx="10" fill="${PAPER}"/>${body}</svg>`;
const label = (x, y, text, size = 13, fill = INK, anchor = 'middle', weight = 600) =>
  `<text x="${x}" y="${y}" font-size="${size}" fill="${fill}" text-anchor="${anchor}" font-weight="${weight}">${text}</text>`;
const note = (x, y, text, anchor = 'middle') => label(x, y, text, 11, MUTE, anchor, 400);

/** Tag, throw-up and piece as related but distinct forms (not a ladder). */
function writingForms() {
  const tag = `<path d="M40 120 C55 70 70 70 72 112 C74 140 88 72 100 78 C112 84 96 128 118 104 C130 92 132 76 148 86 C160 94 150 124 176 96" fill="none" stroke="${INK}" stroke-width="4" stroke-linecap="round" stroke-linejoin="round"/><path d="M44 134 L176 128" stroke="${INK}" stroke-width="3" stroke-linecap="round"/>`;
  const bubble = (x) => `<rect x="${x}" y="62" width="58" height="76" rx="29" fill="#eae6dc" stroke="${INK}" stroke-width="5"/>`;
  const throwUp = `<g transform="translate(212 0)">${bubble(0)}${bubble(46)}${bubble(92)}</g>`;
  const block = (x, d) => `<g transform="translate(${x} 0)"><path d="${d}" transform="translate(6 6)" fill="${MUTE}"/><path d="${d}" fill="${ACCENT}" stroke="${INK}" stroke-width="4" stroke-linejoin="round"/></g>`;
  const piece = `<g transform="translate(410 0)">${block(0, 'M0 140 L0 70 L22 56 L50 56 L64 70 L64 140 L46 140 L46 116 L18 116 L18 140 Z M18 100 L46 100 L46 76 L18 76 Z')}${block(76, 'M0 56 L50 56 L66 72 L66 92 L56 98 L66 106 L66 126 L50 140 L0 140 Z M18 74 L18 92 L44 92 L44 74 Z M18 106 L18 122 L46 122 L46 106 Z')}</g>`;
  return svg(600, 220, 'Tag, Throw-up und Piece', 'Drei schematische Zeichnungen: ein Tag in einer Linie, ein Throw-up aus runden, umrandeten Buchstaben und ein Piece mit Füllung, Kontur und Schatten. Es sind verwandte Formen, die nebeneinander bestehen, keine Stufen, die jeder Writer durchlaufen muss.',
    `${tag}${throwUp}${piece}${label(108, 176, 'Tag')}${note(108, 194, 'der Name als Geste')}${label(305, 176, 'Throw-up')}${note(305, 194, 'schnell, umrandet, gefüllt')}${label(481, 176, 'Piece')}${note(481, 194, 'komponiert, in Schichten')}<path d="M190 200 L230 200 M380 200 L420 200" stroke="${MUTE}" stroke-dasharray="3 4"/>${note(300, 214, 'verwandte Formen nebeneinander – keine Pflicht-Leiter')}`);
}

/** A subway car carrying work through many neighbourhoods. */
function subwayCirculation() {
  const stops = [[60, 'Depot'], [170, 'Halt'], [280, 'Halt'], [390, 'Halt'], [500, 'Endstation']];
  const line = `<path d="M60 120 L500 120" stroke="${INK}" stroke-width="6" stroke-linecap="round"/>` +
    stops.map(([x, t]) => `<circle cx="${x}" cy="120" r="9" fill="${PAPER}" stroke="${INK}" stroke-width="4"/>${note(x, 150, t)}`).join('');
  const car = `<g transform="translate(205 72)"><rect width="120" height="34" rx="6" fill="#d9d4c8" stroke="${INK}" stroke-width="3"/><rect x="10" y="8" width="100" height="18" rx="3" fill="${ACCENT}"/><circle cx="24" cy="38" r="5" fill="${INK}"/><circle cx="96" cy="38" r="5" fill="${INK}"/></g><path d="M335 89 L370 89" stroke="${ACCENT}" stroke-width="3" marker-end="url(#ar)"/>`;
  const viewers = [170, 280, 390, 500].map((x) => `<g transform="translate(${x} 178)"><circle r="6" fill="${BLUE}"/><path d="M-9 20 Q0 4 9 20" fill="${BLUE}"/></g>`).join('');
  return svg(560, 230, 'Die U-Bahn als fahrende Ausstellung', 'Schematische Linie mit Haltestellen. Ein bemalter Wagen fährt vom Depot durch mehrere Stationen; an jeder sieht ein anderes Publikum dasselbe Werk.',
    `<defs><marker id="ar" viewBox="0 0 10 10" refX="8" refY="5" markerWidth="7" markerHeight="7" orient="auto"><path d="M0 0 L10 5 L0 10 Z" fill="${ACCENT}"/></marker></defs>${line}${car}${viewers}${label(280, 40, 'An einem Ort gemalt, an vielen gesehen')}${note(280, 222, 'schematisch – kein echter Linienplan')}`);
}

/** Event, photograph, publication and archive have different dates and rights. */
function documentationChain() {
  const steps = [['Werk', 'entstanden · Datum'], ['Foto', 'aufgenommen · Fotograf, Datum'], ['Publikation', 'gedruckt · Hrsg., Jahr'], ['Archiv', 'verwahrt · Institution, Rechte']];
  const box = (i, [t, n]) => {
    const x = 20 + i * 140;
    return `<rect x="${x}" y="60" width="120" height="70" rx="8" fill="#fff" stroke="${INK}" stroke-width="2.5"/>${label(x + 60, 92, t)}${note(x + 60, 114, n)}` +
      (i < 3 ? `<path d="M${x + 122} 95 L${x + 138} 95" stroke="${INK}" stroke-width="3" marker-end="url(#ar2)"/>` : '');
  };
  return svg(580, 190, 'Vom Werk zum Archiv', 'Vier Kästen: das Werk, sein Foto, eine Publikation und ein Archiveintrag. Jeder Schritt hat eigenes Datum, eigene Urheber und eigene Rechte; ein Foto dokumentiert ein Werk, ist aber nicht das Werk.',
    `<defs><marker id="ar2" viewBox="0 0 10 10" refX="8" refY="5" markerWidth="7" markerHeight="7" orient="auto"><path d="M0 0 L10 5 L0 10 Z" fill="${INK}"/></marker></defs>${steps.map((s, i) => box(i, s)).join('')}${label(290, 36, 'Jeder Schritt hat eigenes Datum, eigene Urheber und Rechte', 14)}${note(290, 166, 'Beleg über ein Werk ≠ das Werk · Weiterverwendung braucht Einzelerlaubnis')}`);
}

/** Circulation as a network with exchange, not a one-way export. */
function circulationNetwork() {
  const nodes = { nyc: [300, 70, 'New York'], phl: [130, 70, 'Philadelphia'], ams: [480, 140, 'Amsterdam'], par: [400, 250, 'Paris'], sp: [130, 240, 'São Paulo'], cn: [560, 290, 'China'], ruhr: [270, 300, 'Ruhrgebiet'] };
  const edges = [['phl', 'nyc'], ['nyc', 'ams'], ['nyc', 'par'], ['nyc', 'ruhr'], ['ams', 'ruhr'], ['par', 'ruhr'], ['nyc', 'sp'], ['nyc', 'cn'], ['par', 'cn']];
  const R = 32;
  const e = edges.map(([a, b]) => {
    const [x1, y1] = nodes[a], [x2, y2] = nodes[b];
    const d = Math.hypot(x2 - x1, y2 - y1), ux = (x2 - x1) / d, uy = (y2 - y1) / d;
    const f = (n) => Math.round(n * 10) / 10;
    return `<path d="M${f(x1 + ux * R)} ${f(y1 + uy * R)} L${f(x2 - ux * R)} ${f(y2 - uy * R)}" stroke="${MUTE}" stroke-width="2" marker-end="url(#ar3)" marker-start="url(#ar3)"/>`;
  }).join('');
  const n = Object.values(nodes).map(([x, y, t]) => `<circle cx="${x}" cy="${y}" r="24" fill="#fff" stroke="${INK}" stroke-width="2.5"/><circle cx="${x}" cy="${y}" r="8" fill="${ACCENT}"/><rect x="${x - 44}" y="${y + 29}" width="88" height="18" rx="3" fill="${PAPER}"/>${label(x, y + 42, t, 12)}`).join('');
  const local = ['ams', 'sp', 'cn'].map((k) => `<circle cx="${nodes[k][0]}" cy="${nodes[k][1]}" r="29" fill="none" stroke="${BLUE}" stroke-width="2" stroke-dasharray="4 4"/>`).join('');
  return svg(660, 390, 'Austausch und lokale Aneignung', 'Netz von Szenen, verbunden durch Pfeile in beide Richtungen. Gestrichelte Ringe markieren Szenen mit eigener früherer oder paralleler Schreibtradition. Das Diagramm ist schematisch und zeigt weder Daten noch alle Szenen.',
    `<defs><marker id="ar3" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse"><path d="M0 0 L10 5 L0 10 Z" fill="${MUTE}"/></marker></defs>${e}${local}${n}${note(330, 374, 'Austausch in beide Richtungen · gestrichelt: lokale Tradition mit eigener Geschichte · schematisch, unvollständig')}`);
}

/** Letter anatomy from NIGHTSHIFT's canonical B. models: {B: renderModel, graph: semanticGraph} */
function letterAnatomy(ctx) {
  const m = ctx?.models?.B;
  if (!m) return null;
  const callouts = [[-8, 70, 'Stamm'], [118, 34, 'oberer Bauch'], [124, 110, 'unterer Bauch'], [30, 4, 'Punze'], [52, 150, 'Punze'], [104, 69, 'Verbindung (Taille)']];
  const lines = [[-8, 70, 18, 70], [118, 34, 92, 40], [124, 110, 98, 104], [34, 6, 44, 40], [52, 150, 56, 98], [104, 69, 80, 69]];
  return svg(420, 260, 'Buchstabenanatomie: B', 'Das kanonische B von NIGHTSHIFT mit beschriftetem Stamm, zwei Bäuchen, zwei geschlossenen Punzen und der Verbindung (Taille), an der die Bäuche zusammentreffen.',
    `<g transform="translate(140 50) scale(1.15)">${glyphGroup(m, { fill: INK, diagnostic: true })}${lines.map(([a, b, c, d]) => `<path d="M${a} ${b} L${c} ${d}" stroke="${ACCENT}" stroke-width="1.4"/>`).join('')}${callouts.map(([x, y, t]) => `<text x="${x}" y="${y - 3}" font-size="9" fill="${ACCENT}" text-anchor="${x < 40 ? 'end' : 'start'}">${t}</text>`).join('')}</g>${note(210, 236, 'kanonische NIGHTSHIFT-Geometrie · Prüfung ausstehend')}`);
}

/** Counter vs open interior: A, B, G, S. */
function negativeSpace(ctx) {
  const ms = ['A', 'B', 'G', 'S'].map((c) => ctx?.models?.[c]);
  if (ms.some((m) => !m)) return null;
  const caps = [['1 Punze', 'geschlossen'], ['2 Punzen', 'geschlossen'], ['offenes Inneres', 'Öffnung in Prüfung'], ['keine Punze', 'eine durchgehende Form']];
  const body = ms.map((m, i) => `<g transform="translate(${20 + i * 130} 40) scale(0.9)">${glyphGroup(m, { fill: INK, diagnostic: true })}</g>${label(70 + i * 130, 185, caps[i][0], 12)}${note(70 + i * 130, 202, caps[i][1])}`).join('');
  return svg(540, 230, 'Negativraum: Punzen und Öffnungen', 'Die Buchstaben A, B, G und S aus dem kanonischen Satz von NIGHTSHIFT. A und B haben geschlossene Punzen (gestrichelt), G hat ein nach außen offenes Inneres, S hat keine.', body);
}

/** The four kinds of statements the archive separates. */
function evidenceLayers() {
  const rows = [['Dokumentierte Tatsache', 'was ein datiertes Dokument zeigt', INK], ['Aussage aus der Szene', 'was ein Writer erinnert oder sagt', BLUE], ['Wissenschaftliche Deutung', 'wie Forschende es erklären', '#5b6b3a'], ['NIGHTSHIFT-Designannahme', 'wie dieses Spiel es modelliert', ACCENT]];
  return svg(520, 230, 'Vier Arten von Aussagen', 'Vier beschriftete Streifen: dokumentierte Tatsache, Aussage aus der Szene, wissenschaftliche Deutung und NIGHTSHIFT-Designannahme. Das Archiv ordnet jede Aussage einer davon zu.',
    rows.map(([t, n, c], i) => `<rect x="20" y="${20 + i * 50}" width="12" height="38" rx="3" fill="${c}"/>${label(46, 38 + i * 50, t, 14, INK, 'start')}${note(46, 54 + i * 50, n, 'start')}`).join(''));
}

const RENDERERS = {
  'diagram.writing-forms': writingForms,
  'diagram.subway-circulation': subwayCirculation,
  'diagram.documentation-chain': documentationChain,
  'diagram.circulation-network': circulationNetwork,
  'diagram.letter-anatomy': letterAnatomy,
  'diagram.negative-space': negativeSpace,
  'diagram.evidence-layers': evidenceLayers,
};

/** @returns {string|null} SVG markup, or null if the diagram needs glyph models that are unavailable. */
export function renderDiagram(id, ctx = {}) {
  const fn = RENDERERS[id];
  if (!fn) throw new Error(`Unknown diagram ${id}`);
  const out = fn(ctx);
  // The shared renderer's diagnostic labels are English; the German edition translates them here.
  const localised = out && out.replaceAll('APERTURE UNRESOLVED (AUD-01)', 'ÖFFNUNG UNGEKLÄRT (AUD-01)');
  return localised && scopeIds(localised, id.replace(/^diagram\./, 'dg-'));
}

/** Prefix every element id (and its references) so several diagrams can share one page. */
function scopeIds(svgText, prefix) {
  const ids = [...svgText.matchAll(/ id="([^"]+)"/g)].map((m) => m[1]);
  let s = svgText;
  for (const id of ids) {
    s = s.replaceAll(` id="${id}"`, ` id="${prefix}-${id}"`).replaceAll(`url(#${id})`, `url(#${prefix}-${id})`);
  }
  return s.replace(/aria-labelledby="([^"]+)"/, (_, v) => `aria-labelledby="${v.split(' ').map((x) => `${prefix}-${x}`).join(' ')}"`);
}
