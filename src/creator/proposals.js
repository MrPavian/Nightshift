// Creator 0.1: brief -> four structurally different word proposals.
// Pure module (Node and browser). Structure lives in word composition (spacing, slant, baseline,
// proportion, size rhythm); colour and finish never count as a difference.
// Letters are built by the graffiti engine (skeleton -> bars -> style moves). Proposals differ in
// their style moves (which moves recur through the word) and in word composition.
import { buildLetter, BASES, MOVE_LABELS, ENGINE_VERSION } from '../style/graffiti-engine.js';
import { SKELETONS } from '../style/skeletons.js';

export const CREATOR_VERSION = 'creator/0.2.0';

export const DIMENSIONS = {
  spacing: { open: 'offen gesetzt', normal: 'normal gesetzt', tight: 'eng, überlappend' },
  slant: { 0: 'aufrecht', 6: 'leicht geneigt', 12: 'stark geneigt' },
  baseline: { flat: 'gerade Grundlinie', bounce: 'wippende Grundlinie', arc: 'Bogen', step: 'ansteigend' },
  width: { condensed: 'schmal', normal: 'normale Breite', wide: 'breit' },
  size: { uniform: 'gleich groß', accent: 'Anfang und Ende größer' },
  moves: {},
};
/** Move sets per style: each proposal picks one set; the moves in it recur through the whole word. */
export const MOVE_SETS = {
  bubble: { plain: [], drops: ['drop'] },
  straight: { plain: [], serifs: ['serif'], kicks: ['cut', 'kick'], 'serifs-kicks': ['serif', 'kick'] },
  blockbuster: { plain: [], serifs: ['serif'], cuts: ['cut'] },
  semiwild: { arrows: ['arrow'], 'arrows-kicks': ['arrow', 'kick'], 'arrows-split': ['arrow', 'cut', 'split'], 'kicks-split': ['kick', 'split'] },
};
const movesLabel = (ms) => (ms.length ? ms.map((m) => MOVE_LABELS[m]).join(' + ') : 'pur, ohne Extras');
export const DIMENSION_LABELS = { moves: 'Style-Elemente', spacing: 'Abstand', slant: 'Neigung', baseline: 'Grundlinie', width: 'Proportion', size: 'Größenrhythmus' };

export const STYLES = {
  bubble: { labelDe: 'Bubble', available: true },
  straight: { labelDe: 'Straight', available: true },
  blockbuster: { labelDe: 'Blockbuster', available: true },
  semiwild: { labelDe: 'Semi-Wild', available: true },
  wildstyle: { labelDe: 'Wildstyle', available: false, reasonDe: 'Echtes Verschränken der Buchstaben kommt später (C04). Semi-Wild zeigt schon Pfeile, Kicks und geteilte Balken.' },
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
export function preflightWord(raw, _registry = null, { maxLetters = 12 } = {}) {
  const upper = String(raw ?? '').toUpperCase().replace(/\s+/g, ' ').trim();
  const has = (c) => /^[A-Z]$/.test(c) && Boolean(SKELETONS[c]);
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
  semiwild: { slant: { 6: 0.4, 12: 0.3 }, spacing: { tight: 0.4 } },
};

/** All composition candidates with scores for the given priorities (0 = egal, 1 = wichtig, 2 = sehr wichtig). */
const MOVE_SCORE = { readability: { drop: 0, serif: -0.3, cut: -0.3, kick: -0.6, arrow: -0.8, split: -0.8 }, dynamics: { drop: 0.3, serif: 0.4, cut: 0.6, kick: 1, arrow: 1.1, split: 0.7 }, compactness: {} };
export function scoreCandidates(style, priorities, seed) {
  const out = [];
  for (const [movesId, ms] of Object.entries(MOVE_SETS[style] ?? { plain: [] })) for (const spacing of Object.keys(DIMENSIONS.spacing)) for (const slant of Object.keys(DIMENSIONS.slant)) for (const baseline of Object.keys(DIMENSIONS.baseline))
    for (const width of Object.keys(DIMENSIONS.width)) for (const size of Object.keys(DIMENSIONS.size)) {
      const c = { moves: movesId, spacing, slant, baseline, width, size }, key = Object.values(c).join('|');
      const parts = {};
      let total = 0;
      for (const [p, w] of Object.entries(priorities)) { const s = Object.entries(c).reduce((a, [d, v]) => a + (SCORE[p]?.[d]?.[v] ?? 0), 0) + ms.reduce((a, m) => a + (MOVE_SCORE[p]?.[m] ?? 0), 0); parts[p] = s; total += w * s; }
      total += Object.entries(c).reduce((a, [d, v]) => a + (AFFINITY[style]?.[d]?.[v] ?? 0), 0);
      total += hash01(`${seed}:${key}`) * 0.4; // tie-break and regenerate variety; never larger than one score step
      out.push({ composition: c, key, score: total, parts });
    }
  return out.sort((a, b) => b.score - a.score || (a.key < b.key ? -1 : 1));
}

export const differingDimensions = (a, b) => Object.keys(DIMENSIONS).filter((d) => a[d] !== b[d]);
export const movesOf = (style, id) => MOVE_SETS[style]?.[id] ?? [];

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
    const ranked = scoreCandidates(style, w, `${seed}:${lead ?? 'mix'}:${picked.length}`);
    const ok = (c) => picked.every((p) => differingDimensions(p.composition, c.composition).length >= minDiff);
    // prefer a style-move set no earlier proposal uses, so the four differ in construction, not only layout
    const pick = ranked.find((c) => ok(c) && picked.every((p) => p.composition.moves !== c.composition.moves)) ?? ranked.find(ok);
    if (!pick) break;
    picked.push({ ...pick, lead, parts: scoreCandidates(style, priorities, seed).find((c) => c.key === pick.key).parts });
  }
  return picked;
}

const SPACING = { open: 0.14, normal: 0.02, tight: -0.14 }, WIDTH = { condensed: 0.88, normal: 1, wide: 1.12 };
/** Place engine letters for one composition. Returns placements in skeleton units (baseline y = 140). */
export function placeWord(letters, c, style) {
  const n = letters.filter(Boolean).length, base = BASES[style];
  let x = 0, i = 0;
  const items = letters.map((L) => {
    if (!L) { x += 60; return null; }
    const b = L.box, accent = c.size === 'accent' && (i === 0 || i === n - 1);
    const s = c.size === 'accent' ? (accent ? 1.12 : 0.94) : 1, sx = WIDTH[c.width] * base.scaleX * s, sy = s;
    const t = n > 1 ? i / (n - 1) : 0.5;
    let y = 0, rotate = 0;
    if (c.baseline === 'bounce') { y = i % 2 ? -8 : 7; rotate = i % 2 ? 4 : -3; }
    if (c.baseline === 'arc') { y = -26 * Math.sin(Math.PI * t); rotate = (t - 0.5) * -10; }
    if (c.baseline === 'step') y = -7 * i + 3.5 * (n - 1);
    const w = (b.x1 - b.x0) * sx;
    const it = { letter: L, box: b, x, y, rotate, sx, sy, slant: Number(c.slant), width: w };
    x += w * (1 + SPACING[c.spacing] - (style === 'bubble' ? 0.12 : 0));
    i++;
    return it;
  });
  return { items, width: x };
}

/** SVG transform for one placed letter (baseline at y = 140). */
export function placementTransform(it) {
  return `translate(${r2(it.x)} ${r2(it.y)}) rotate(${r2(it.rotate)} ${r2(it.width / 2)} 70) translate(0 140) skewX(${-it.slant}) scale(${r2(it.sx)} ${r2(it.sy)}) translate(${r2(-it.box.x0)} -140)`;
}
const r2 = (n) => Math.round(n * 1000) / 1000;

/**
 * Full generation. brief: { word, style, form, priorities, palette, seed }.
 * Returns { ok, problems, proposals: [{ id, composition, explanation, focus, records }], report }.
 */
export function generateProposals(brief) {
  const pre = preflightWord(brief.word);
  const style = STYLES[brief.style], form = FORMS[brief.form];
  const problems = [...pre.problems];
  if (!style) problems.push(`Unbekannter Stil: ${brief.style}`); else if (!style.available) problems.push(`${style.labelDe}: ${style.reasonDe}`);
  if (!form) problems.push(`Unbekannte Form: ${brief.form}`); else if (!form.available) problems.push(`${form.labelDe}: ${form.reasonDe}`);
  if (problems.length) return { ok: false, problems, proposals: [] };

  const priorities = Object.fromEntries(Object.keys(PRIORITIES).map((p) => [p, Number(brief.priorities?.[p] ?? 1)]));
  const seed = Number(brief.seed ?? 1);
  const picks = pickProposals(brief.style, priorities, seed);
  if (picks.length < 4) return { ok: false, problems: ['Es ließen sich keine vier deutlich verschiedenen Vorschläge bilden.'], proposals: [] };
  const proposals = picks.map((p, i) => {
    const moves = movesOf(brief.style, p.composition.moves);
    const letters = [...pre.word].map((ch, k) => (ch === ' ' ? null : buildLetter(ch, { base: brief.style, moves, density: brief.style === 'semiwild' ? 3 : 2 }, `${seed}:${i}:${k}`)));
    return {
      id: `p${i + 1}`, composition: p.composition, signature: p.key,
      explanation: Object.entries(p.composition).map(([d, v]) => (d === 'moves' ? movesLabel(moves) : DIMENSIONS[d][v])),
      focus: p.lead ? PRIORITIES[p.lead].labelDe : null,
      layout: placeWord(letters, p.composition, brief.style),
      appliedMoves: letters.filter(Boolean).map((L) => ({ char: L.char, moves: L.applied.map((a) => a.move) })),
    };
  });
  return {
    ok: true, problems: [], proposals,
    report: {
      creatorVersion: CREATOR_VERSION, engineVersion: ENGINE_VERSION, word: pre.word, style: brief.style, form: brief.form, priorities, seed,
      limits: ['Noch keine echten Verbindungen oder Verschränkungen zwischen Buchstaben (C04).', 'Die Buchstaben-Skelette sind noch nicht mit den bearbeitbaren Mastern im Editor verknüpft.'],
    },
  };
}
