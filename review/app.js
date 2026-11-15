// NIGHTSHIFT 0.7A test & review page. Runs the real pipeline in the browser:
// legacy snapshot → registry + overlay → validator → render model → SVG / Three.js.
// Static and build-free: works from any static host serving the repository root.

import { GlyphRegistry } from '../src/glyph/registry.js';
import { readBridgeRequest, mountReturnLink } from '../src/bridge/editor-bridge.js';
import { ALPHABET } from '../src/glyph/ids.js';
import { glyphGroup } from '../src/render/svg.js';
import { resolveGlyphs, buildSpecimen } from '../src/proof/specimens.js';
import { contextPlate } from '../src/proof/plates.js';
import { RUBRIC, DECISIONS, STAGES, SEVERITIES, blankReview, validateReviewRecord, proposeMaturity } from '../src/proof/review.js';

const RUN_DIR = '../docs/reports/proof/T06/';
const $ = (s) => document.querySelector(s);
const esc = (s) => String(s ?? '').replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/"/g, '&quot;');
const get = async (p) => { const r = await fetch(p); if (!r.ok) throw new Error(`${p}: HTTP ${r.status}`); return r.json(); };
const selftest = { ready: false, tiles: 0, rendered: 0, missing: [], three: 'pending', errors: [] };
window.addEventListener('error', (e) => selftest.errors.push(String(e.message)));

const SURFACES = {
  light: { fill: '#f2efe6', ink: '#111111' },
  dark: { fill: '#16181d', ink: '#ece8dd' },
  texture: { fill: 'url(#tex)', ink: '#111111' },
};
const TEXTURE_DEFS = '<defs><pattern id="tex" patternUnits="userSpaceOnUse" width="9" height="9" patternTransform="rotate(30)"><rect width="9" height="9" fill="#8a7f6a"/><rect width="4" height="9" fill="#b9ad92"/><circle cx="6.5" cy="4.5" r="1.3" fill="#5d5546"/></pattern></defs>';
const REFUSAL_TEXT = {
  RENDER_INVALID_TOPOLOGY: 'besteht die Geometrieprüfung nicht (z. B. nicht festgelegte Kreuzung)',
  RENDER_UNDECLARED_TOPOLOGY: 'Teilformen ohne festgelegte Rolle (Loch? Überlappung?)',
};

let registry, profile, manifest, resolved, current = 'A';
let three = null;
let records = {};

// ---------- boot ----------
try {
  const [snapshot, overlay, parameterContract, validationContract] = await Promise.all([
    get('../data/legacy/v06-glyph-paths.json'), get('../data/semantic/abgrs-semantic-overlay.v1.json'),
    get('../contracts/glyph-parameter-contract.v1.json'), get('../contracts/glyph-geometry-validation.v1.json'),
  ]);
  profile = await get('../data/validator-profiles/legacy-v06.v1.json');
  manifest = await get(`${RUN_DIR}manifest.json`).catch(() => null);
  registry = GlyphRegistry.build({ snapshot, overlay, parameterContract, validationContract });
  resolved = resolveGlyphs(registry, profile, [...ALPHABET]);
  const counts = { rendered: 0, prov: 0, missing: 0 };
  for (const r of resolved.values()) counts[r.status === 'rendered' ? 'rendered' : r.status === 'missing' ? 'missing' : 'prov']++;
  $('#status').textContent = `${registry.list().length} Glyphen · ${counts.rendered} Master · ${counts.prov} provisorisch · ${counts.missing} verweigert · Registry fehlerfrei: ${registry.isValid ? 'ja' : 'NEIN'}${manifest ? ` · Prüflauf ${manifest.runId}` : ''}`;
  buildTiles();
  showDetail('A');
  setupTabs();
  setupWord();
  buildPlates();
  buildReview();
  applyBridgeRequest(readBridgeRequest(location.search, 'review'));
  selftest.ready = true;
} catch (e) {
  $('#status').textContent = `Fehler: ${e.message}`;
  selftest.errors.push(e.message);
}
publishSelftest();

function publishSelftest() {
  let pre = document.getElementById('selftest');
  if (!pre) { pre = document.createElement('pre'); pre.id = 'selftest'; pre.hidden = true; document.body.append(pre); }
  pre.textContent = JSON.stringify(selftest);
}

// ---------- archive bridge (src/bridge/editor-bridge.js) ----------
function applyBridgeRequest(req) {
  if (!req) return;
  selftest.bridge = req;
  mountReturnLink(document, req);
  if (req.diag) $('#diag').checked = true;
  if (req.glyph) showDetail(req.glyph);
  if (req.word) { $('#word').value = req.word; $('#word').dispatchEvent(new Event('input')); }
  if (req.tab) document.querySelector(`nav button[data-tab="${req.tab}"]`)?.click();
}

// ---------- tabs ----------
function setupTabs() {
  for (const b of document.querySelectorAll('nav button')) {
    b.addEventListener('click', () => {
      for (const x of document.querySelectorAll('nav button')) x.setAttribute('aria-selected', String(x === b));
      for (const s of document.querySelectorAll('main > section')) s.hidden = s.id !== `tab-${b.dataset.tab}`;
      if (b.dataset.tab === 'live') renderThree();
    });
  }
}

// ---------- A–Z grid ----------
function miniSvg(r, surface = 'light', diagnostic = false, height = 70) {
  const b = r.glyph.baseMetrics.visibleBounds;
  const pad = 10;
  const vb = `${b.minX - pad} ${b.minY - pad} ${b.maxX - b.minX + 2 * pad} ${b.maxY - b.minY + 2 * pad + (diagnostic ? 10 : 0)}`;
  const s = SURFACES[surface];
  const bg = `${surface === 'texture' ? TEXTURE_DEFS : ''}<rect x="${b.minX - pad}" y="${b.minY - pad}" width="${b.maxX - b.minX + 2 * pad}" height="${b.maxY - b.minY + 2 * pad + 10}" fill="${s.fill}"/>`;
  let body;
  if (r.status === 'missing') {
    body = `<rect x="${b.minX}" y="${b.minY}" width="${b.maxX - b.minX}" height="${b.maxY - b.minY}" fill="none" stroke="#c62828" stroke-width="2" stroke-dasharray="6 4"/><text x="${(b.minX + b.maxX) / 2}" y="${(b.minY + b.maxY) / 2 + 12}" font-size="40" text-anchor="middle" fill="#c62828" font-family="monospace">${r.glyph.character}</text>`;
  } else {
    const ink = r.status === 'rendered-provisional' && surface !== 'dark' ? '#8f8a7e' : s.ink;
    body = glyphGroup(r.model, { fill: ink, diagnostic });
  }
  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="${vb}" style="height:${height}px" preserveAspectRatio="xMidYMid meet">${bg}${body}</svg>`;
}

function badge(r) {
  if (r.status === 'rendered') return '<span class="badge b-authored">Master</span>';
  if (r.status === 'rendered-provisional') return '<span class="badge b-prov">provisorisch</span>';
  return '<span class="badge b-missing">verweigert</span>';
}

function buildTiles() {
  const grid = $('#az');
  for (const ch of ALPHABET) {
    const r = resolved.get(ch);
    const t = document.createElement('div');
    t.className = 'tile';
    t.dataset.ch = ch;
    t.innerHTML = `${miniSvg(r)}<div>${ch} ${badge(r)}</div>`;
    t.addEventListener('click', () => showDetail(ch));
    grid.append(t);
    selftest.tiles++;
    if (r.status === 'missing') selftest.missing.push(ch); else selftest.rendered++;
  }
  $('#surface').addEventListener('change', () => showDetail(current));
  $('#diag').addEventListener('change', () => showDetail(current));
}

function showDetail(ch) {
  current = ch;
  for (const t of document.querySelectorAll('.tile')) t.setAttribute('aria-pressed', String(t.dataset.ch === ch));
  const r = resolved.get(ch);
  const surface = $('#surface').value, diag = $('#diag').checked;
  $('#detail-title').textContent = `${ch} — ${r.glyph.variants[0].variantId} · ${r.glyph.maturity}`;
  $('#svgview').innerHTML = miniSvg(r, surface, diag, 320);
  const rep = r.report;
  const errs = rep.diagnostics.filter((d) => d.severity === 'error');
  const warns = rep.diagnostics.filter((d) => d.severity === 'warning');
  const walls = rep.clearance.counterWalls.map((w) => w.minimumDistance.toFixed(1)).join(' / ') || '—';
  const checks = rep.identityChecks.map((c) => `<li><code>${esc(c.name)}</code>: <b>${esc(c.status)}</b> — ${esc(c.reason)}</li>`).join('');
  $('#detail-info').innerHTML = `
    <table>
      <tr><th>Geometrieprüfung</th><td>${rep.hardChecksPassed ? '<span class="msg-ok">alle harten Prüfungen bestanden</span>' : `<span class="msg-err">${errs.length} Fehler</span>`}</td></tr>
      <tr><th>Darstellung</th><td>${r.status === 'missing' ? `<span class="msg-err">verweigert: ${esc(REFUSAL_TEXT[r.reason] ?? r.reason)}</span>` : 'gerendert aus deklarierter Topologie'}</td></tr>
      <tr><th>Innenräume</th><td>${rep.negativeSpace.counters.length ? rep.negativeSpace.counters.map((c) => (c.boundedFace ? 'umschlossen' : 'NICHT umschlossen')).join(', ') : 'keine'} · Öffnung: ${esc(r.glyph.semanticGraph.topology.apertureStatus)}</td></tr>
      <tr><th>Wand um Innenraum</th><td>${walls} (unkalibriert)</td></tr>
      <tr><th>Komponenten</th><td>${r.glyph.semanticGraph.components.map((c) => `${esc(c.label)} <span class="muted">(${esc(c.mappingStatus)})</span>`).join(', ') || '—'}</td></tr>
      <tr><th>Meldungen</th><td>${[...errs, ...warns].map((d) => `<div><code>${esc(d.code)}</code> ${esc(d.message)}</div>`).join('') || '—'}</td></tr>
    </table>
    ${checks ? `<p class="muted" style="margin-top:8px">Identitätsprüfungen:</p><ul class="muted">${checks}</ul>` : ''}`;
  renderThree();
}

// ---------- Three.js viewport ----------
async function renderThree() {
  const canvas = $('#three');
  if (!canvas.clientWidth) return;
  try {
    if (!three) {
      const THREE = await import('three');
      const { buildGlyphObject } = await import('../src/editor/three-glyph.js');
      const renderer = new THREE.WebGLRenderer({ canvas, antialias: true, preserveDrawingBuffer: true });
      renderer.outputColorSpace = THREE.SRGBColorSpace;
      const scene = new THREE.Scene();
      scene.background = new THREE.Color('#e4e0d4');
      const camera = new THREE.PerspectiveCamera(35, 1, 1, 2000);
      const pivot = new THREE.Group();
      scene.add(pivot);
      three = { THREE, renderer, scene, camera, pivot, buildGlyphObject, rotX: -0.12, rotY: 0.35 };
      let drag = null;
      canvas.addEventListener('pointerdown', (e) => { drag = [e.clientX, e.clientY]; canvas.setPointerCapture(e.pointerId); });
      canvas.addEventListener('pointermove', (e) => {
        if (!drag) return;
        three.rotY += (e.clientX - drag[0]) * 0.01; three.rotX += (e.clientY - drag[1]) * 0.01;
        three.rotX = Math.max(-1.2, Math.min(1.2, three.rotX));
        drag = [e.clientX, e.clientY];
        draw();
      });
      canvas.addEventListener('pointerup', () => { drag = null; });
    }
    const { THREE, pivot, buildGlyphObject } = three;
    pivot.clear();
    const r = resolved.get(current);
    const surface = $('#surface').value;
    const b = r.glyph.baseMetrics.visibleBounds;
    const cx = (b.minX + b.maxX) / 2, cy = -(b.minY + b.maxY) / 2;
    const plane = new THREE.Mesh(new THREE.PlaneGeometry(b.maxX - b.minX + 60, b.maxY - b.minY + 60), new THREE.MeshBasicMaterial({ map: surfaceTexture(THREE, surface) }));
    plane.position.set(cx, cy, -0.5);
    pivot.add(plane);
    if (r.model) {
      const ink = r.status === 'rendered-provisional' && surface !== 'dark' ? '#8f8a7e' : SURFACES[surface].ink;
      pivot.add(buildGlyphObject(r.model, { color: new THREE.Color(ink) }));
    }
    pivot.children.forEach((o) => o.position.set(o.position.x - cx, o.position.y - cy, o.position.z));
    three.camera.position.set(0, 0, 330);
    draw();
    selftest.three = 'ok';
  } catch (e) {
    selftest.three = `error: ${e.message}`;
    canvas.replaceWith(Object.assign(document.createElement('p'), { className: 'msg-err', textContent: `Three.js konnte nicht geladen werden: ${e.message}` }));
  }
  publishSelftest();
}
function draw() {
  const { renderer, scene, camera, pivot, rotX, rotY } = three;
  const c = renderer.domElement;
  const w = c.clientWidth, h = c.clientHeight;
  renderer.setPixelRatio(Math.min(2, window.devicePixelRatio || 1));
  renderer.setSize(w, h, false);
  camera.aspect = w / h; camera.updateProjectionMatrix();
  pivot.rotation.set(rotX, rotY, 0);
  renderer.render(scene, camera);
}
function surfaceTexture(THREE, surface) {
  const c = document.createElement('canvas'); c.width = c.height = 256;
  const g = c.getContext('2d');
  if (surface === 'texture') {
    g.fillStyle = '#8a7f6a'; g.fillRect(0, 0, 256, 256);
    g.save(); g.translate(128, 128); g.rotate(Math.PI / 6); g.fillStyle = '#b9ad92';
    for (let x = -400; x < 400; x += 18) g.fillRect(x, -400, 8, 800);
    g.restore();
  } else { g.fillStyle = SURFACES[surface].fill; g.fillRect(0, 0, 256, 256); }
  const t = new THREE.CanvasTexture(c); t.colorSpace = THREE.SRGBColorSpace; t.wrapS = t.wrapT = THREE.RepeatWrapping; t.repeat.set(2, 2);
  return t;
}
window.addEventListener('resize', () => three && draw());

// ---------- word ----------
function setupWord() {
  const update = () => {
    const text = $('#word').value.toUpperCase().replace(/[^A-Z]/g, '');
    if (!text) { $('#wordview').innerHTML = ''; $('#word-info').textContent = 'Nur A–Z.'; return; }
    const sp = buildSpecimen({ fixtureId: 'live', text, family: 'word-context' }, resolved, 'live');
    $('#wordview').innerHTML = contextPlate([sp], resolved, 'live (nicht Teil eines Prüflaufs)', { title: `Live: ${text}`, columns: 1, scale: 0.5 }).replace('<svg ', '<svg style="width:100%;height:auto" ');
    $('#word-info').textContent = `${sp.coverage}${sp.missingSlots.length ? ` · fehlt: ${sp.missingSlots.map((m) => m.character).join(', ')}` : ''}`;
  };
  $('#word').addEventListener('input', update);
  update();
}

// ---------- plates ----------
function buildPlates() {
  if (!manifest) { $('#run-info').textContent = 'Kein Prüflauf gefunden.'; return; }
  const cov = manifest.coverage;
  $('#run-info').innerHTML = `
    <div><b>${esc(manifest.runId)}</b> · Review-Status: <b>${esc(manifest.review.status)}</b> · automatische Reifegrad-Änderung: ${manifest.review.automatedMaturityPromotion ? 'ja' : 'nein'}</div>
    <div>Fehlende Glyphen: ${cov.missingGlyphs.map((m) => `${m.glyphId.slice(-1)} (${esc(m.reason)})`).join(', ') || '—'}</div>
    <div>Paare: ${Object.entries(cov.pairs).map(([k, v]) => `${k}${v === 'authored-subset' ? '' : '*'}`).join(' ')} · Wörter: ${Object.entries(cov.words).map(([k, v]) => `${k}${v === 'authored-subset' ? '' : '*'}`).join(' ')} <span class="muted">(* = enthält provisorische Glyphen)</span></div>
    <div>Noch nicht umgesetzt: ${Object.keys(manifest.proofFamilies.notImplemented).join(', ')}</div>`;
  const plates = [...new Set(manifest.specimens.flatMap((s) => s.plates))];
  $('#plates').innerHTML = plates.map((p) => `<div class="card plate"><h2>${esc(p.replace('plates/', '').replace('.svg', ''))}</h2><a href="${RUN_DIR}${p}" target="_blank" rel="noopener"><img src="${RUN_DIR}${p}" alt="${esc(p)}" loading="lazy"></a><p class="muted">sha256 ${esc(manifest.artifactHashes[p]?.slice(0, 16))}…</p></div>`).join('');
}

// ---------- review ----------
const storeKey = () => `nightshift.review.${manifest?.runId}`;
function loadRecords() { try { return JSON.parse(localStorage.getItem(storeKey()) ?? '{}'); } catch { return {}; } }
function saveRecords(all) { try { localStorage.setItem(storeKey(), JSON.stringify(all)); } catch { /* storage unavailable: keep in memory */ } }

function buildReview() {
  if (!manifest) { $('#rv-form').textContent = 'Ohne Prüflauf ist keine Bewertung möglich.'; return; }
  records = loadRecords();
  const iso = manifest.specimens.filter((s) => s.family === 'glyph-identity');
  $('#rv-glyph').innerHTML = iso.map((s) => `<option value="${esc(s.specimenId)}">${esc(s.text)}</option>`).join('');
  $('#rv-glyph').addEventListener('change', renderForm);
  $('#rv-export').addEventListener('click', () => {
    const list = Object.values(records);
    const blob = new Blob([JSON.stringify(list, null, 2) + '\n'], { type: 'application/json' });
    const a = Object.assign(document.createElement('a'), { href: URL.createObjectURL(blob), download: 'ratings.json' });
    a.click();
  });
  $('#rv-import').addEventListener('change', async (e) => {
    const f = e.target.files[0]; if (!f) return;
    try { for (const r of JSON.parse(await f.text())) records[r.specimenId] = r; saveRecords(records); renderForm(); }
    catch (err) { alert(`Import fehlgeschlagen: ${err.message}`); }
  });
  renderForm();
}

function renderForm() {
  const spId = $('#rv-glyph').value;
  const sp = manifest.specimens.find((s) => s.specimenId === spId);
  const rec = records[spId] ?? { ...blankReview(manifest, sp), reviewId: `rev.${sp.fixtureId}.${Date.now().toString(36)}`, date: new Date().toISOString().slice(0, 10) };
  records[spId] = rec;
  const glyph = registry.get(rec.glyphId);
  const ids = [...glyph.semanticGraph.components.map((c) => c.id), ...glyph.variants[0].geometry.contours.map((c) => c.contourId)];
  const scoreSel = (k) => `<select data-score="${k}">${[['', '—'], ['0', '0'], ['1', '1'], ['2', '2'], ['3', '3'], ['cannot-judge', 'nicht beurteilbar']].map(([v, l]) => `<option value="${v}" ${String(rec.scores[k] ?? '') === v ? 'selected' : ''}>${l}</option>`).join('')}</select>`;
  $('#rv-form').innerHTML = `
    <div class="row">
      <div>${miniSvg(resolved.get(sp.text), 'light', true, 220)}</div>
      <div>
        <div class="controls">
          <label>Prüfer <input data-f="reviewer" value="${esc(rec.reviewer)}" placeholder="Name"></label>
          <label>Datum <input data-f="date" type="date" value="${esc(rec.date)}"></label>
          <label>Stufe <select data-f="stage">${STAGES.map((s) => `<option ${rec.stage === s ? 'selected' : ''}>${s}</option>`).join('')}</select></label>
        </div>
        <table>${RUBRIC.map((r) => `<tr><td>${esc(r.label)}${r.critical ? ' <b>*</b>' : ''}</td><td>${scoreSel(r.key)}</td></tr>`).join('')}</table>
      </div>
    </div>
    <div class="controls"><label>Entscheidung <select data-f="decision"><option value="">—</option>${DECISIONS.map((d) => `<option ${rec.decision === d ? 'selected' : ''}>${d}</option>`).join('')}</select></label></div>
    <label>Begründung<textarea data-f="rationale">${esc(rec.rationale)}</textarea></label>
    <h2 style="margin-top:10px">Mängel</h2>
    <div id="defects">${rec.defects.map((d, i) => `
      <div class="controls" data-defect="${i}">
        <select data-d="severity">${SEVERITIES.map((s) => `<option ${d.severity === s ? 'selected' : ''}>${s}</option>`).join('')}</select>
        <select data-d="affected"><option value="">betrifft …</option>${ids.map((id) => `<option ${d.affectedIds?.[0] === id ? 'selected' : ''}>${esc(id)}</option>`).join('')}</select>
        <input data-d="note" value="${esc(d.note)}" placeholder="Beschreibung" style="flex:1">
        <button class="btn alt" data-remove="${i}">✕</button>
      </div>`).join('')}</div>
    <button class="btn alt" id="add-defect">+ Mangel</button>
    <div id="rv-msgs" style="margin-top:10px"></div>`;
  const sync = () => {
    for (const el of document.querySelectorAll('#rv-form [data-f]')) rec[el.dataset.f] = el.value || (el.dataset.f === 'decision' ? null : '');
    for (const el of document.querySelectorAll('#rv-form [data-score]')) {
      const v = el.value; rec.scores[el.dataset.score] = v === '' ? null : v === 'cannot-judge' ? v : Number(v);
    }
    rec.defects = [...document.querySelectorAll('#rv-form [data-defect]')].map((row, i) => ({
      defectId: `def.${sp.fixtureId}.${i + 1}`,
      severity: row.querySelector('[data-d="severity"]').value,
      affectedIds: row.querySelector('[data-d="affected"]').value ? [row.querySelector('[data-d="affected"]').value] : [],
      note: row.querySelector('[data-d="note"]').value,
    }));
    saveRecords(records);
    const msgs = validateReviewRecord(rec, manifest);
    const prop = proposeMaturity(glyph, msgs.length ? [] : [rec]);
    $('#rv-msgs').innerHTML = (msgs.length
      ? msgs.map((m) => `<div class="msg-err">${esc(m.code)} — ${esc(m.message)}</div>`).join('')
      : '<div class="msg-ok">Bewertung vollständig und regelkonform.</div>') +
      `<div class="muted">Reifegrad: ${esc(prop.current)}${prop.proposed ? ` → Vorschlag <b>${esc(prop.proposed)}</b> (nicht angewendet)` : ' (kein Vorschlag)'}</div>`;
  };
  $('#rv-form').oninput = sync;
  $('#rv-form').onchange = sync;
  $('#add-defect').addEventListener('click', () => { rec.defects.push({ severity: 'minor', affectedIds: [], note: '' }); renderForm(); });
  for (const b of document.querySelectorAll('[data-remove]')) b.addEventListener('click', () => { rec.defects.splice(Number(b.dataset.remove), 1); renderForm(); });
  sync();
}
