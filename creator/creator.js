// NIGHTSHIFT Creator 0.1: word -> brief -> four proposals -> choose -> export.
import { generateProposals, STYLES, FORMS, PRIORITIES, CREATOR_VERSION, placementTransform } from '../src/creator/proposals.js';
import { renderLetters, ENGINE_VERSION } from '../src/style/graffiti-engine.js';

const $ = (id) => document.getElementById(id);
const esc = (s) => String(s).replace(/[&<>"]/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' })[c]);
const PALETTES = [
  { id: 'chrom', labelDe: 'Chrom und Schwarz', fill: '#E9E7E2', outline: '#111111', depth: '#111111' },
  { id: 'gelb', labelDe: 'Gelb und Violett', fill: '#F5D400', outline: '#2A1640', depth: '#8756A7' },
  { id: 'weiss-rot', labelDe: 'Weiß und Rot', fill: '#FFFFFF', outline: '#B3122E', depth: '#5A0A17' },
  { id: 'mint', labelDe: 'Mint und Schwarz', fill: '#7FE0C2', outline: '#0E1A17', depth: '#1E4D43' },
  { id: 'pink', labelDe: 'Pink und Blau', fill: '#F59BE6', outline: '#14213D', depth: '#2E4FA8' },
];
const PRIO_LEVELS = [['0', 'egal'], ['1', 'wichtig'], ['2', 'sehr wichtig']];
const state = { form: 'piece', style: 'bubble', priorities: { readability: 1, dynamics: 1, compactness: 1 }, palette: { ...PALETTES[0] }, seed: 1, result: null, chosen: null };
try { Object.assign(state, JSON.parse(localStorage.getItem('nightshift.creator.brief') ?? '{}'), { result: null, chosen: null }); } catch { /* storage unavailable: defaults */ }

// ---------- controls ----------
const seg = (name, entries, current) => entries.map(([v, e]) => `<label><input type="radio" name="${name}" value="${esc(v)}"${v === current ? ' checked' : ''}${e.available === false ? ' disabled' : ''}><span>${esc(e.labelDe)}${e.available === false ? ' (später)' : ''}</span></label>`).join('');
$('forms').innerHTML = seg('form', Object.entries(FORMS), state.form);
$('styles').innerHTML = seg('style', Object.entries(STYLES), state.style);
$('priorities').innerHTML = Object.entries(PRIORITIES).map(([k, p]) => `<div class="row" role="radiogroup" aria-label="${esc(p.labelDe)}"><span>${esc(p.labelDe)}</span><div class="seg">${seg(`prio-${k}`, PRIO_LEVELS.map(([v, l]) => [v, { labelDe: l }]), String(state.priorities[k]))}</div></div>`).join('');
$('palettes').innerHTML = PALETTES.map((p) => `<button type="button" class="swatch" data-id="${p.id}" aria-pressed="${p.id === state.palette.id}" aria-label="${esc(p.labelDe)}" title="${esc(p.labelDe)}"><i style="background:${p.fill}"></i><i style="background:${p.outline}"></i><i style="background:${p.depth}"></i></button>`).join('');
$('form-hint').textContent = Object.values(FORMS).filter((f) => !f.available).map((f) => `${f.labelDe}: ${f.reasonDe}`).join(' ');
$('style-hint').textContent = Object.values(STYLES).filter((f) => !f.available).map((f) => `${f.labelDe}: ${f.reasonDe}`).join(' ');
const syncColors = () => { $('c-fill').value = state.palette.fill; $('c-outline').value = state.palette.outline; $('c-depth').value = state.palette.depth; };
syncColors();
if (state.word) $('word').value = state.word;

const save = () => { try { localStorage.setItem('nightshift.creator.brief', JSON.stringify({ word: $('word').value, form: state.form, style: state.style, priorities: state.priorities, palette: state.palette, seed: state.seed })); } catch { /* ignore */ } };

// ---------- rendering ----------
function rendering(neutral) {
  if (neutral) return { fill: '#111' };
  const p = state.palette;
  return state.form === 'throw-up'
    ? { fill: p.fill, outline: p.outline, outlineWidth: 8, highlights: true }
    : { fill: p.fill, outline: p.outline, outlineWidth: 7, depth: { dx: 12, dy: 11, color: p.depth }, highlights: true };
}
function wordSvg(layout, neutral, { width = null } = {}) {
  const vb = [-50, -80, layout.width + 120, 320];
  const body = renderLetters(layout.items.filter(Boolean).map((it) => ({ letter: it.letter, transform: placementTransform(it) })), rendering(neutral));
  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="${vb.join(' ')}"${width ? ` width="${width}" height="${Math.round((width * vb[3]) / vb[2])}"` : ''} role="img" aria-label="${esc(state.result?.report.word ?? '')}">${body}</svg>`;
}

function renderCards() {
  const r = state.result, neutral = $('neutral').checked;
  $('cards').innerHTML = r.proposals.map((p, i) => `<li class="card${state.chosen === i ? ' selected' : ''}">
    <div class="art">${wordSvg(p.layout, neutral)}</div>
    <div class="meta"><h3>Vorschlag ${i + 1}${p.focus ? ` <small>· stark in ${esc(p.focus)}</small>` : ''}</h3>
      <ul>${p.explanation.map((e) => `<li>${esc(e)}</li>`).join('')}</ul>
      <button type="button" class="btn pick" data-i="${i}" aria-pressed="${state.chosen === i}">${state.chosen === i ? 'Ausgewählt' : 'Diesen nehmen'}</button></div></li>`).join('');
  $('limits').textContent = `Grenzen dieser Version: ${r.report.limits.join(' ')}`;
}
function renderChosen() {
  const p = state.result.proposals[state.chosen];
  $('stage').innerHTML = wordSvg(p.layout, false);
  $('chosen').hidden = false;
}

// ---------- actions ----------
async function generate() {
  const go = $('go');
  go.disabled = true; go.textContent = 'Wird erzeugt …';
  try {
    const res = generateProposals({ word: $('word').value, style: state.style, form: state.form, priorities: state.priorities, seed: state.seed });
    $('word-msg').textContent = res.ok ? '' : res.problems.join(' ');
    if (!res.ok) { $('results').hidden = true; $('chosen').hidden = true; return; }
    state.result = res; state.chosen = null;
    $('results').hidden = false; $('chosen').hidden = true;
    renderCards();
    save();
    $('res-title').focus?.();
  } finally { go.disabled = false; go.textContent = 'Vorschläge erzeugen'; document.documentElement.dataset.generated = String((Number(document.documentElement.dataset.generated) || 0) + 1); }
}

$('brief').addEventListener('submit', (e) => { e.preventDefault(); generate(); });
$('brief').addEventListener('change', (e) => {
  const t = e.target;
  if (t.name === 'form') state.form = t.value;
  if (t.name === 'style') state.style = t.value;
  if (t.name?.startsWith('prio-')) state.priorities[t.name.slice(5)] = Number(t.value);
  if (t.type === 'color') { state.palette = { ...state.palette, id: 'eigen', [t.id.slice(2)]: t.value }; document.querySelectorAll('.swatch').forEach((b) => b.setAttribute('aria-pressed', 'false')); repaint(); }
  if (t.name === 'form') repaint(); // form changes finish only; construction stays
  save();
});
$('palettes').addEventListener('click', (e) => {
  const b = e.target.closest('.swatch'); if (!b) return;
  state.palette = { ...PALETTES.find((p) => p.id === b.dataset.id) };
  document.querySelectorAll('.swatch').forEach((x) => x.setAttribute('aria-pressed', String(x === b)));
  syncColors(); repaint(); save();
});
// Colour and form only repaint; they never regenerate or change the proposals' construction.
function repaint() { if (state.result) { renderCards(); if (state.chosen != null) renderChosen(); } }
$('neutral').addEventListener('change', renderCards);
$('again').addEventListener('click', () => { state.seed += 1; generate(); });
$('cards').addEventListener('click', (e) => {
  const b = e.target.closest('.pick'); if (!b) return;
  state.chosen = Number(b.dataset.i); renderCards(); renderChosen();
  $('chosen').scrollIntoView({ behavior: matchMedia('(prefers-reduced-motion: reduce)').matches ? 'auto' : 'smooth' });
});

// ---------- export ----------
const fileBase = () => `nightshift-${state.result.report.word.replace(/\s+/g, '-').toLowerCase()}-v${state.chosen + 1}`;
function download(name, blob) { const a = document.createElement('a'); a.href = URL.createObjectURL(blob); a.download = name; document.body.append(a); a.click(); a.remove(); setTimeout(() => URL.revokeObjectURL(a.href), 2000); }
$('dl-svg').addEventListener('click', () => download(`${fileBase()}.svg`, new Blob([wordSvg(state.result.proposals[state.chosen].layout, false)], { type: 'image/svg+xml' })));
$('dl-png').addEventListener('click', async () => {
  const svg = wordSvg(state.result.proposals[state.chosen].layout, false, { width: 2000 });
  const img = new Image(); img.src = URL.createObjectURL(new Blob([svg], { type: 'image/svg+xml' }));
  await img.decode();
  const c = document.createElement('canvas'); c.width = img.width; c.height = img.height;
  c.getContext('2d').drawImage(img, 0, 0);
  c.toBlob((b) => download(`${fileBase()}.png`, b), 'image/png');
});
$('dl-json').addEventListener('click', () => {
  const p = state.result.proposals[state.chosen];
  const artifact = {
    schema: 'nightshift.game-artwork.v0', creatorVersion: CREATOR_VERSION, createdAt: new Date().toISOString(),
    brief: { word: state.result.report.word, form: state.form, style: state.style, priorities: state.result.report.priorities, seed: state.result.report.seed },
    composition: p.composition, rendering: rendering(false), engineVersion: ENGINE_VERSION,
    placements: p.layout.items.map((it) => (it ? { char: it.letter.char, moves: it.letter.applied, transform: placementTransform(it) } : { space: true })),
    svg: wordSvg(p.layout, false), limits: state.result.report.limits,
  };
  download(`${fileBase()}.json`, new Blob([JSON.stringify(artifact, null, 2)], { type: 'application/json' }));
});

$('version').textContent = `${CREATOR_VERSION} · ${ENGINE_VERSION} · Buchstaben aus Skelett, Balken und Style-Elementen. Vorschläge unterscheiden sich in Style-Elementen und Wortkomposition.`;
document.documentElement.dataset.ready = 'true';
// ?auto=1 generates once on load (used by the browser check and for shareable demo links).
const q = new URLSearchParams(location.search);
if (q.get('word')) $('word').value = q.get('word');
if (q.get('style') && STYLES[q.get('style')]?.available) { state.style = q.get('style'); document.querySelector(`input[name=style][value="${state.style}"]`).checked = true; }
if (q.get('auto')) generate();
