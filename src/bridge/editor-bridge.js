// Archive ⇄ editor bridge contract (C06; completed in C07).
//
// One module is used by both sides: the archive builds links with `bridgeHref`,
// the review and editor pages read them with `readBridgeRequest`. Capabilities
// are discovered from BRIDGE_CAPABILITIES; only `available` ones may produce a
// link, and each available capability names the page that actually implements
// it. Future capabilities (C03–C05) are declared `unavailable` with a reason so
// the archive can show them honestly without simulating them.
//
// Versioning: BRIDGE_VERSION follows semver. Adding a capability or an optional
// parameter is a minor bump; renaming/removing a capability or parameter, or
// changing its meaning, is a major bump. Links carry `bv=<major>` and receivers
// ignore requests from an unknown major version.

export const BRIDGE_VERSION = '1.1.0'; // 1.1.0: German descriptions (descriptionDe)
const MAJOR = BRIDGE_VERSION.split('.')[0];

/** Glyphs with authored masters that the current editor can open (see editor/editor.js EDITABLE). */
export const BRIDGE_GLYPHS = ['A', 'B', 'G', 'R', 'S'];
const TABS = ['live', 'word', 'plates', 'review'];
const ENTRY_ID = /^[a-z]+\.[a-z0-9-]+$/;

const glyph = { type: 'enum', values: BRIDGE_GLYPHS };

export const BRIDGE_CAPABILITIES = {
  'study.glyph-anatomy': {
    status: 'available', page: 'review', labelDe: 'Anatomie im Prüfstand ansehen', label: 'Glyph anatomy viewer',
    description: 'Opens the review page on one authored glyph with diagnostic overlay (counters, aperture, measurements).',
    descriptionDe: 'Öffnet den Prüfstand mit diesem Buchstaben und Diagnose-Ansicht: Punzen, Öffnungen, Messwerte.',
    params: { glyph }, fixed: { tab: 'live', diag: '1' },
  },
  'editor.contour-node-edit': {
    status: 'available', page: 'editor', labelDe: 'Im Editor bearbeiten', label: 'Edit contour nodes (validated)',
    description: 'Opens the contour editor on one authored glyph; every change is validated before it is accepted.',
    descriptionDe: 'Öffnet den Editor mit diesem Buchstaben. Jede Änderung wird geprüft, bevor sie übernommen wird.',
    params: { glyph }, fixed: {},
  },
  'study.word-layout': {
    status: 'available', page: 'review', labelDe: 'Wort im Prüfstand setzen', label: 'Word tester (naive layout)',
    description: 'Sets a word from canonical glyphs with a fixed gap; provisional letters are marked.',
    descriptionDe: 'Setzt ein Wort aus den Buchstaben des Spiels mit festem Abstand; vorläufige Buchstaben sind markiert.',
    params: { word: { type: 'word', max: 12 } }, fixed: { tab: 'word' },
  },
  'study.proof-sheets': {
    status: 'available', page: 'review', labelDe: 'Prüfbögen öffnen', label: 'Proof sheets',
    description: 'Neutral identity, topology, pair and word plates of the current proof run.',
    descriptionDe: 'Die Prüfbögen des aktuellen Prüflaufs: Buchstaben, Topologie, Paare und Wörter.',
    params: {}, fixed: { tab: 'plates' },
  },
  'grammar.style-comparison': {
    status: 'unavailable', after: 'C03', labelDe: 'Stilvergleich', label: 'Style grammar comparison',
    reasonDe: 'Kommt mit dem Stil-Resolver (Paket C03).', reason: 'Requires the style resolver (C03).',
  },
  'relationship.connection-study': {
    status: 'unavailable', after: 'C04', labelDe: 'Verbindungsstudie', label: 'Letter connection study',
    reasonDe: 'Kommt mit dem Beziehungs-Solver (Paket C04).', reason: 'Requires the relationship solver (C04).',
  },
  'surface.format-preview': {
    status: 'unavailable', after: 'C05', labelDe: 'Flächen-Vorschau', label: 'Surface / format preview',
    reasonDe: 'Kommt mit Blackbook-Bearbeitung und Export (Paket C05).', reason: 'Requires blackbook editing and export (C05).',
  },
};

const PAGES = { review: 'review/index.html', editor: 'editor/index.html' };

function checkParam(spec, v) {
  if (v == null) return false;
  if (spec.type === 'enum') return spec.values.includes(v);
  if (spec.type === 'word') return /^[A-Z]+$/.test(v) && v.length <= spec.max;
  return false;
}

/**
 * Build a link from an archive entry to a capability. `base` is the path from the
 * calling page to the site root (the archive lives one level down: '../').
 * Returns null for unknown/unavailable capabilities or invalid parameters.
 */
export function bridgeHref(capabilityId, params = {}, { from, base = '../' } = {}) {
  const cap = BRIDGE_CAPABILITIES[capabilityId];
  if (!cap || cap.status !== 'available') return null;
  const q = new URLSearchParams({ bv: MAJOR, cap: capabilityId });
  for (const [k, spec] of Object.entries(cap.params)) {
    if (!checkParam(spec, params[k])) return null;
    q.set(k, params[k]);
  }
  for (const [k, v] of Object.entries(cap.fixed)) q.set(k, v);
  if (from && ENTRY_ID.test(from)) q.set('from', from);
  return `${base}${PAGES[cap.page]}?${q}`;
}

/** Validate parameters for a capability without building a URL (used by the archive build). */
export function validateBridgeParams(capabilityId, params) {
  const cap = BRIDGE_CAPABILITIES[capabilityId];
  if (!cap) return { ok: false, problem: 'unknown capability' };
  if (cap.status !== 'available') return { ok: true, available: false };
  for (const [k, spec] of Object.entries(cap.params)) if (!checkParam(spec, params[k])) return { ok: false, problem: `parameter ${k}=${params[k] ?? '(missing)'} is not accepted` };
  const extra = Object.keys(params).filter((k) => !(k in cap.params));
  if (extra.length) return { ok: false, problem: `unknown parameter(s): ${extra.join(', ')}` };
  return { ok: true, available: true };
}

/**
 * Receiver side: read a bridge request from `location.search` for `page`.
 * Only known keys with valid values are returned; anything else is dropped.
 */
export function readBridgeRequest(search, page) {
  const q = new URLSearchParams(search);
  if (q.get('bv') !== MAJOR) return null;
  const cap = BRIDGE_CAPABILITIES[q.get('cap')];
  if (!cap || cap.status !== 'available' || cap.page !== page) return null;
  const out = { capability: q.get('cap') };
  for (const [k, spec] of Object.entries(cap.params)) if (checkParam(spec, q.get(k))) out[k] = q.get(k);
  if (TABS.includes(q.get('tab'))) out.tab = q.get('tab');
  if (q.get('diag') === '1') out.diag = true;
  const from = q.get('from');
  if (from && ENTRY_ID.test(from)) out.from = from;
  return out;
}

/** Link from a receiving page back to the archive entry (root-relative to review/ and editor/). */
export function archiveReturnHref(from) {
  return ENTRY_ID.test(from ?? '') ? `../archive/index.html#/entry/${from}` : '../archive/index.html';
}

/** Insert a small, accessible "back to archive" link at the top of a receiving page. */
export function mountReturnLink(doc, req) {
  if (!req?.from) return null;
  const a = doc.createElement('a');
  a.className = 'bridge-return';
  a.href = archiveReturnHref(req.from);
  a.textContent = '← Zurück zum Archiv-Eintrag';
  a.setAttribute('data-bridge-from', req.from);
  a.style.cssText = 'display:inline-block;margin:6px 12px;padding:6px 10px;border-radius:6px;background:#111;color:#fff;font:14px/1.3 system-ui,sans-serif;text-decoration:none';
  doc.body.prepend(a);
  return a;
}
