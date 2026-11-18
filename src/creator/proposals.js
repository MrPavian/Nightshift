// Creator 0.1: brief -> four structurally different word proposals.
// Pure module (Node and browser). Structure lives in word composition (spacing, slant, baseline,
// proportion, size rhythm); colour and finish never count as a difference.
// Honest scope: glyph shapes come from the style resolver (C03); there are no per-letter variant
// choices and no letter connections yet (C04).
import { resolveStyle } from '../style/resolver.js';
import { glyphPolygons } from '../style/render.js';
import { bounds } from '../style/polygon.js';

export const CREATOR_VERSION = 'creator/0.1.0';

export const DIMENSIONS = {
  spacing: { open: 'offen gesetzt', normal: 'normal gesetzt', tight: 'eng, überlappend' },
  slant: { 0: 'aufrecht', 6: 'leicht geneigt', 12: 'stark geneigt' },
  baseline: { flat: 'gerade Grundlinie', bounce: 'wippende Grundlinie', arc: 'Bogen', step: 'ansteigend' },
  width: { condensed: 'schmal', normal: 'normale Breite', wide: 'breit' },
  size: { uniform: 'gleich groß', accent: 'Anfang und Ende größer' },
};
export const DIMENSION_LABELS = { spacing: 'Abstand', slant: 'Neigung', baseline: 'Grundlinie', width: 'Proportion', size: 'Größenrhythmus' };

export const STYLES = {
  bubble: { labelDe: 'Bubble', available: true },
  straight: { labelDe: 'Straight', available: true },
  blockbuster: { labelDe: 'Blockbuster', available: true },
  wildstyle: { labelDe: 'Wildstyle', available: false, reasonDe: 'Braucht Verbindungen zwischen Buchstaben (C04). Kommt später.' },
};
export const FORMS = {
  'throw-up': { labelDe: 'Throw-up', available: true },
  piece: { labelDe: 'Piece', available: true },
  tag: { labelDe: 'Tag', available: false, reasonDe: 'Tags brauchen eine eigene Handstyle-Technik mit Strichen und Schwung (HST-01). Kommt später.' },
};
export const PRIORITIES = {
  readability: { labelDe: 'Lesbarkeit' },
  dynamics: { labelDe: 'Dynamik' },
  compactness: { labelDe: 'Kompaktheit' },
};

/** Validate and normalise the word: A–Z and single spaces only; everything else is reported, never replaced silently. */
export function preflightWord(raw, registry, { maxLetters = 12 } = {}) {
  const upper = String(raw ?? '').toUpperCase().replace(/\s+/g, ' ').trim();
  const has = (c) => { if (!/^[A-Z]$/.test(c)) return false; try { return Boolean(registry.getByChar(c)); } catch { return false; } };
  const unsupported = [...new Set([...upper].filter((c) => c !== ' ' && !has(c)))];
  const letters = [...upper].filter((c) => c !== ' ').length;
  const problems = [];
  if (!letters) problems.push('Bitte ein Wort oder einen Namen eingeben.');
  if (unsupported.length) problems.push(`Nicht unterstützt: ${unsupported.join(' ')}. Erlaubt sind A–Z und Leerzeichen${unsupported.some((c) => 'ÄÖÜ'.includes(c)) ? ' (Umlaute bitte als AE, OE, UE schreiben)' : ''}.`);
  if (letters > maxLetters) problems.push(`Höchstens ${maxLetters} Buchstaben.`);
  return { word: upper, ok: problems.length === 0, problems, unsupported };
}

// Deterministic 32-bit hash -> [0,1)
function hash01(str) { let h = 2166136261; for (const c of str) { h ^= c.charCodeAt(0); h = Math.imul(h, 16777619); } return ((h >>> 0) % 100000) / 100000; }

const SCORE = {
  readability: { spacing: { open: 2, normal: 1, tight: -1 }, slant: { 0: 1, 6: 0, 12: -1 }, baseline: { flat: 1, step: 0, bounce: -0.5, arc: -0.5 }, width: { condensed: 0, normal: 1, wide: 0.5 }, size: { uniform: 0.5, accent: 0 } },
  dynamics: { spacing: { open: 0, normal: 0, tight: 0.5 }, slant: { 0: 0, 6: 1, 12: 2 }, baseline: { flat: 0, step: 1, bounce: 1.5, arc: 1.5 }, width: { condensed: 0.3, normal: 0, wide: 0 }, size: { uniform: 0, accent: 1 } },
  compactness: { spacing: { open: -1, normal: 1, tight: 2 }, slant: { 0: 0, 6: 0, 12: 0 }, baseline: { flat: 1, step: 0, bounce: 0, arc: -0.5 }, width: { condensed: 1.5, normal: 0, wide: -1 }, size: { uniform: 0.5, accent: 0 } },
};
const AFFINITY = {
  bubble: { spacing: { tight: 0.6 }, baseline: { bounce: 0.6 } },
  straight: { slant: { 6: 0.5 } },
  blockbuster: { baseline: { flat: 0.6 }, width: { wide: 0.5 }, slant: { 0: 0.3 } },
};

/** All composition candidates with scores for the given priorities (0 = egal, 1 = wichtig, 2 = sehr wichtig). */
export function scoreCandidates(style, priorities, seed) {
  const out = [];
  for (const spacing of Object.keys(DIMENSIONS.spacing)) for (const slant of Object.keys(DIMENSIONS.slant)) for (const baseline of Object.keys(DIMENSIONS.baseline))
    for (const width of Object.keys(DIMENSIONS.width)) for (const size of Object.keys(DIMENSIONS.size)) {
      const c = { spacing, slant, baseline, width, size }, key = Object.values(c).join('|');
      const parts = {};
      let total = 0;
      for (const [p, w] of Object.entries(priorities)) { const s = Object.entries(c).reduce((a, [d, v]) => a + (SCORE[p]?.[d]?.[v] ?? 0), 0); parts[p] = s; total += w * s; }
      total += Object.entries(c).reduce((a, [d, v]) => a + (AFFINITY[style]?.[d]?.[v] ?? 0), 0);
      total += hash01(`${seed}:${key}`) * 0.4; // tie-break and regenerate variety; never larger than one score step
      out.push({ composition: c, key, score: total, parts });
    }
  return out.sort((a, b) => b.score - a.score || (a.key < b.key ? -1 : 1));
}

export const differingDimensions = (a, b) => Object.keys(DIMENSIONS).filter((d) => a[d] !== b[d]);

/** Greedy pick of `count` candidates that pairwise differ in at least `minDiff` dimensions. */
export function pickDiverse(candidates, count = 4, minDiff = 2) {
  const picked = [];
  for (const c of candidates) {
    if (picked.every((p) => differingDimensions(p.composition, c.composition).length >= minDiff)) picked.push(c);
    if (picked.length === count) break;
  }
  return picked;
}

/**
 * Four slots: each of the priorities the user cares about leads one slot (its weight is boosted),
 * remaining slots use the plain weights. Every pick must differ from all earlier picks in at least
 * `minDiff` composition dimensions, so the four never collapse into near-copies.
 */
export function pickProposals(style, priorities, seed, { count = 4, minDiff = 3, boost = 2 } = {}) {
  const leads = Object.entries(priorities).filter(([, w]) => w > 0).sort((a, b) => b[1] - a[1] || (a[0] < b[0] ? -1 : 1)).map(([k]) => k);
  const slots = [...leads.slice(0, count), ...Array(Math.max(0, count - leads.length)).fill(null)];
  const picked = [];
  for (const lead of slots) {
    const w = lead ? { ...priorities, [lead]: priorities[lead] + boost } : priorities;
    const pick = scoreCandidates(style, w, `${seed}:${lead ?? 'mix'}:${picked.length}`).find((c) => picked.every((p) => differingDimensions(p.composition, c.composition).length >= minDiff));
    if (!pick) break;
    picked.push({ ...pick, lead, parts: scoreCandidates(style, priorities, seed).find((c) => c.key === pick.key).parts });
  }
  return picked;
}

const SPACING = { open: 0.16, normal: 0.05, tight: -0.12 }, WIDTH = { condensed: 0.86, normal: 1, wide: 1.14 };
/** Place glyph records for one composition. Returns placements in glyph units plus the word box. */
export function placeWord(records, c) {
  const n = records.filter(Boolean).length;
  let x = 0, i = 0;
  const items = records.map((rec) => {
    if (!rec) { x += 44; return null; }
    const b = bounds(glyphPolygons(rec).map((p) => p.poly));
    const accent = c.size === 'accent' && (i === 0 || i === n - 1);
    const s = c.size === 'accent' ? (accent ? 1.12 : 0.94) : 1, sx = WIDTH[c.width] * s, sy = s;
    const t = n > 1 ? i / (n - 1) : 0.5;
    let y = 0, rotate = 0;
    if (c.baseline === 'bounce') { y = i % 2 ? -7 : 6; rotate = i % 2 ? 4 : -3; }
    if (c.baseline === 'arc') { y = -24 * Math.sin(Math.PI * t); rotate = (t - 0.5) * -10; }
    if (c.baseline === 'step') y = -6 * i + 3 * (n - 1);
    const w = b.w * sx;
    const it = { record: rec, box: b, x, y, rotate, sx, sy, slant: Number(c.slant), width: w };
    x += w * (1 + SPACING[c.spacing]);
    i++;
    return it;
  });
  return { items, width: x };
}

/** SVG transform for one placed glyph (glyph units; baseline at y = 132). */
export function placementTransform(it) {
  return `translate(${r2(it.x)} ${r2(it.y)}) rotate(${r2(it.rotate)} ${r2(it.width / 2)} 70) translate(0 132) skewX(${-it.slant}) scale(${r2(it.sx)} ${r2(it.sy)}) translate(${r2(-it.box.x0)} -132)`;
}
const r2 = (n) => Math.round(n * 1000) / 1000;

/**
 * Full generation. brief: { word, style, form, priorities, palette, seed }.
 * Returns { ok, problems, proposals: [{ id, composition, explanation, focus, records }], report }.
 */
export function generateProposals(brief, { registry, contract, profile, cache = new Map() }) {
  const pre = preflightWord(brief.word, registry);
  const style = STYLES[brief.style], form = FORMS[brief.form];
  const problems = [...pre.problems];
  if (!style) problems.push(`Unbekannter Stil: ${brief.style}`); else if (!style.available) problems.push(`${style.labelDe}: ${style.reasonDe}`);
  if (!form) problems.push(`Unbekannte Form: ${brief.form}`); else if (!form.available) problems.push(`${form.labelDe}: ${form.reasonDe}`);
  if (problems.length) return { ok: false, problems, proposals: [] };

  const resolved = [...pre.word].map((ch) => {
    if (ch === ' ') return null;
    const k = `${brief.style}:${ch}`;
    if (!cache.has(k)) cache.set(k, resolveStyle(registry.getByChar(ch), brief.style, { contract, profile }));
    return cache.get(k);
  });
  const records = resolved.map((r, i) => (r ? r.derived ?? registry.getByChar(pre.word[i]) : null));
  const priorities = Object.fromEntries(Object.keys(PRIORITIES).map((p) => [p, Number(brief.priorities?.[p] ?? 1)]));
  const seed = Number(brief.seed ?? 1);
  const picks = pickProposals(brief.style, priorities, seed);
  if (picks.length < 4) return { ok: false, problems: ['Es ließen sich keine vier deutlich verschiedenen Vorschläge bilden.'], proposals: [] };
  const proposals = picks.map((p, i) => {
    const focus = p.lead ?? null;
    return {
      id: `p${i + 1}`, composition: p.composition, signature: p.key,
      explanation: Object.entries(p.composition).map(([d, v]) => DIMENSIONS[d][v]),
      focus: focus ? PRIORITIES[focus].labelDe : null,
      layout: placeWord(records, p.composition),
    };
  });
  return {
    ok: true, problems: [], proposals,
    report: {
      creatorVersion: CREATOR_VERSION, word: pre.word, style: brief.style, form: brief.form, priorities, seed,
      glyphs: resolved.filter(Boolean).map((r) => ({ character: r.character, status: r.status, geometryHash: r.geometryHash })),
      limits: ['Unterschiede entstehen in der Wortkomposition; noch keine Buchstabenvarianten je Vorschlag.', 'Keine Verbindungen zwischen Buchstaben (kommt mit C04).'],
    },
  };
}
