// NIGHTSHIFT 0.7A-T07 editor: one complete, validated Three.js edit loop.
//
// Canonical state lives in EditorStore. The Three.js scene is always rebuilt
// from either the committed record or a provisional preview candidate; meshes
// are never edited as persistence. Selection is bound to stable canonical IDs.

import * as THREE from 'three';
import { GlyphRegistry } from '../src/glyph/registry.js';
import { validateGlyphGeometry } from '../src/glyph/validate-geometry.js';
import { buildRenderModel } from '../src/render/render-model.js';
import { buildGlyphObject } from '../src/editor/three-glyph.js';
import { flattenContour } from '../src/geometry/flatten.js';
import { EditorStore, moveNodeCommand } from '../src/model/editor-store.js';
import { disabledParameterOperations, findNode } from '../src/model/operations.js';

const $ = (s) => document.querySelector(s);
const esc = (s) => String(s ?? '').replace(/&/g, '&amp;').replace(/</g, '&lt;');
const get = async (p) => { const r = await fetch(p); if (!r.ok) throw new Error(`${p}: HTTP ${r.status}`); return r.json(); };
const EDITABLE = ['A', 'B', 'G', 'R', 'S'];
const STORAGE_KEY = 'nightshift.editor.project.v1';
const SNAP = 0.5;
const snap = (v) => Math.round(v / SNAP) * SNAP;

// ---------- state ----------
let registry, profile, paramContract, store, disabledOps;
let glyphId = 'latin.upper.A';
let mode = 'contour';
let selection = { glyphId, nodeId: null };
let interaction = null;           // active drag {id, nodeId, startRevision, lastPreview}
const view = { zoom: 1, panX: 0, panY: 0 }; // view state: never part of the canonical store
let banner = { text: '', cls: '' };

// ---------- three ----------
const canvas = $('#canvas');
const renderer = new THREE.WebGLRenderer({ canvas, antialias: true, preserveDrawingBuffer: true });
renderer.outputColorSpace = THREE.SRGBColorSpace;
const scene = new THREE.Scene();
scene.background = new THREE.Color('#e4e0d4');
const camera = new THREE.OrthographicCamera(-1, 1, 1, -1, -10, 10);
const root = new THREE.Group();
scene.add(root);
let handles = [];                 // [{mesh, nodeId, x, y}]

function frame() {
  const b = store.get(glyphId).baseMetrics.visibleBounds;
  return { cx: (b.minX + b.maxX) / 2, cy: (b.minY + b.maxY) / 2, h: b.maxY - b.minY + 50, w: b.maxX - b.minX + 50 };
}
function worldPerPixel() { return (camera.top - camera.bottom) / canvas.clientHeight; }
function updateCamera() {
  const w = canvas.clientWidth, h = canvas.clientHeight;
  renderer.setPixelRatio(Math.min(2, window.devicePixelRatio || 1));
  renderer.setSize(w, h, false);
  const f = frame();
  const aspect = w / h;
  let halfH = Math.max(f.h / 2, f.w / 2 / aspect) / view.zoom;
  camera.left = -halfH * aspect; camera.right = halfH * aspect; camera.top = halfH; camera.bottom = -halfH;
  camera.position.set(f.cx + view.panX, -(f.cy + view.panY), 5);
  camera.updateProjectionMatrix();
}
function draw() { updateCamera(); renderer.render(scene, camera); }
function toGlyph(evt) {
  const r = canvas.getBoundingClientRect();
  const nx = ((evt.clientX - r.left) / r.width) * 2 - 1, ny = -(((evt.clientY - r.top) / r.height) * 2 - 1);
  const v = new THREE.Vector3(nx, ny, 0).unproject(camera);
  return { x: v.x, y: -v.y };
}

/** Rebuild the derived scene from a canonical record (committed or preview). */
function rebuildScene(record, { provisional = false, report = null } = {}) {
  root.clear();
  handles = [];
  const rep = report ?? validateGlyphGeometry(record, profile);
  root.userData = { glyphId: record.glyphId, revision: record.revision, geometryHash: record.variants[0].geometryHash, provisional, valid: rep.hardChecksPassed };
  if (rep.hardChecksPassed) {
    const model = buildRenderModel(record, rep);
    root.add(buildGlyphObject(model, { color: new THREE.Color(provisional ? '#3b3a36' : '#111111') }));
  }
  // Contour outlines (always; dashed red when the candidate is invalid).
  for (const c of record.variants[0].geometry.contours) {
    const poly = flattenContour(c, 0.2);
    const pts = poly.points.map(([x, y]) => new THREE.Vector3(x, -y, 0.5));
    const geom = new THREE.BufferGeometry().setFromPoints(pts);
    const mat = rep.hardChecksPassed
      ? new THREE.LineBasicMaterial({ color: provisional ? '#1e88e5' : '#7a766b' })
      : new THREE.LineDashedMaterial({ color: '#c62828', dashSize: 3, gapSize: 2 });
    const line = new THREE.LineLoop(geom, mat);
    if (!rep.hardChecksPassed) line.computeLineDistances();
    line.userData = { contourId: c.contourId };
    root.add(line);
  }
  if (mode === 'contour') buildHandles(record);
  draw();
}

function buildHandles(record) {
  const wpp = worldPerPixel() || 1;
  for (const c of record.variants[0].geometry.contours) {
    for (const s of c.segments) {
      if (!s.nodeId) continue;
      const selected = s.nodeId === selection.nodeId;
      const r = (selected ? 8 : 5.5) * wpp;
      const g = new THREE.Group();
      g.position.set(s.x, -s.y, 1);
      g.add(new THREE.Mesh(new THREE.CircleGeometry(r, 20), new THREE.MeshBasicMaterial({ color: selected ? '#111111' : '#ffffff' })));
      const ring = new THREE.Mesh(new THREE.RingGeometry(r, r + 1.6 * wpp, 24), new THREE.MeshBasicMaterial({ color: '#111111' }));
      g.add(ring);
      if (selected) g.add(new THREE.Mesh(new THREE.RingGeometry(r + 3 * wpp, r + 4.2 * wpp, 28), new THREE.MeshBasicMaterial({ color: '#c62828' })));
      g.userData = { nodeId: s.nodeId, contourId: c.contourId, kind: 'node' };
      root.add(g);
      handles.push({ group: g, nodeId: s.nodeId, x: s.x, y: s.y });
    }
  }
}

function pickNode(evt) {
  const p = toGlyph(evt);
  const limit = 16 * worldPerPixel();
  let best = null;
  for (const h of handles) {
    const d = Math.hypot(h.x - p.x, h.y - p.y);
    if (d <= limit && (!best || d < best.d)) best = { d, nodeId: h.group.userData.nodeId };
  }
  return best?.nodeId ?? null;
}
function pickGlyph(evt) {
  const r = canvas.getBoundingClientRect();
  const ray = new THREE.Raycaster();
  ray.setFromCamera(new THREE.Vector2(((evt.clientX - r.left) / r.width) * 2 - 1, -(((evt.clientY - r.top) / r.height) * 2 - 1)), camera);
  const hit = ray.intersectObjects(root.children, true).find((h) => h.object.isMesh && h.object.userData.glyphId);
  return hit?.object.userData.glyphId ?? null;
}

// ---------- interaction (shared by pointer UI and self-test) ----------
function dragStart(nodeId) {
  selection = { glyphId, nodeId };
  interaction = { id: `ix.${Date.now().toString(36)}.${Math.random().toString(36).slice(2, 6)}`, nodeId, startRevision: store.revision(glyphId), lastPreview: null };
  refreshUi();
}
function dragMove(to) {
  if (!interaction) return null;
  const cmd = moveNodeCommand(store, glyphId, interaction.nodeId, { x: snap(to.x), y: snap(to.y) }, { interactionId: interaction.id, expectedRevision: interaction.startRevision });
  const pv = store.preview(cmd);
  interaction.lastPreview = { cmd, ok: pv.ok };
  if (pv.candidate) rebuildScene(pv.candidate, { provisional: true, report: pv.report });
  setBanner(pv.ok ? `VORSCHAU (provisorisch) · gültig · (${cmd.payload.to.x}, ${cmd.payload.to.y})` : `VORSCHAU (provisorisch) · würde abgelehnt: ${pv.message}`, pv.ok ? 'ok' : 'err');
  return pv;
}
function dragEnd() {
  if (!interaction) return null;
  const pending = interaction.lastPreview;
  interaction = null;
  if (!pending) { refreshUi(); return null; }
  const res = store.submit(pending.cmd);
  setBanner(res.committed ? `Übernommen: ${res.entry.description} (Rev. ${res.entry.before_revision} → ${res.entry.after_revision})` : `Abgelehnt (${res.code}): ${res.message} — übernommener Stand wiederhergestellt.`, res.committed ? 'ok' : 'err');
  refreshUi();
  return res;
}
function cancelInteraction(reason = 'cancel') {
  if (!interaction) return;
  interaction = null;
  setBanner(`Abgebrochen (${reason}) — übernommener Stand wiederhergestellt.`, 'warn');
  refreshUi();
}
function nudge(dx, dy) {
  if (!selection.nodeId) return null;
  const n = findNode(store.get(glyphId), selection.nodeId)?.segment;
  if (!n) return null;
  const res = store.submit(moveNodeCommand(store, glyphId, selection.nodeId, { x: n.x + dx, y: n.y + dy }));
  setBanner(res.committed ? `Übernommen: ${res.entry.description}` : `Abgelehnt (${res.code}): ${res.message}`, res.committed ? 'ok' : 'err');
  refreshUi();
  return res;
}
function undo() { const r = store.undo(); setBanner(r.committed ? `Rückgängig (Rev. ${r.after_revision})` : 'Nichts rückgängig zu machen.', r.committed ? 'ok' : 'warn'); refreshUi(); return r; }
function redo() { const r = store.redo(); setBanner(r.committed ? `Wiederholt (Rev. ${r.after_revision})` : 'Nichts zu wiederholen.', r.committed ? 'ok' : 'warn'); refreshUi(); return r; }

let pan = null;
canvas.addEventListener('pointerdown', (e) => {
  try { canvas.setPointerCapture(e.pointerId); } catch { /* synthetic or inactive pointer */ }
  if (mode === 'contour') {
    const nodeId = pickNode(e);
    if (nodeId) { dragStart(nodeId); return; }
  } else {
    const g = pickGlyph(e);
    selection = { glyphId: g ? glyphId : null, nodeId: null };
    refreshUi();
  }
  pan = { x: e.clientX, y: e.clientY, panX: view.panX, panY: view.panY };
});
canvas.addEventListener('pointermove', (e) => {
  if (interaction) { dragMove(toGlyph(e)); return; }
  if (pan) {
    const wpp = worldPerPixel();
    view.panX = pan.panX - (e.clientX - pan.x) * wpp;
    view.panY = pan.panY - (e.clientY - pan.y) * wpp;
    draw();
  }
});
canvas.addEventListener('pointerup', () => { if (interaction) dragEnd(); pan = null; });
canvas.addEventListener('pointercancel', () => { cancelInteraction('pointer-cancel'); pan = null; });
canvas.addEventListener('wheel', (e) => { e.preventDefault(); setZoom(view.zoom * (e.deltaY < 0 ? 1.15 : 1 / 1.15)); }, { passive: false });
window.addEventListener('keydown', (e) => {
  if (e.target.closest('input, textarea')) return;
  if (e.key === 'Escape') { if (interaction) cancelInteraction('escape'); else { selection = { glyphId, nodeId: null }; refreshUi(); } }
  else if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === 'z') { e.preventDefault(); e.shiftKey ? redo() : undo(); }
  else if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === 'y') { e.preventDefault(); redo(); }
  else if (e.key.startsWith('Arrow') && selection.nodeId) {
    e.preventDefault();
    const d = { ArrowLeft: [-1, 0], ArrowRight: [1, 0], ArrowUp: [0, -1], ArrowDown: [0, 1] }[e.key];
    nudge(...d);
  }
});
window.addEventListener('resize', () => refreshUi());
function setZoom(z) { view.zoom = Math.max(0.3, Math.min(12, z)); refreshUi(); }

// ---------- UI ----------
function setBanner(text, cls) { banner = { text, cls }; }

function refreshUi() {
  const committed = store.get(glyphId);
  if (!interaction) rebuildScene(committed);
  $('#banner').textContent = banner.text || (mode === 'contour' ? 'Punkt antippen und ziehen.' : 'Buchstaben antippen, um ihn auszuwählen.');
  $('#banner').className = banner.cls;
  for (const b of document.querySelectorAll('#glyphbar button')) b.setAttribute('aria-pressed', String(b.dataset.id === glyphId));
  $('#mode-select').setAttribute('aria-pressed', String(mode === 'select'));
  $('#mode-contour').setAttribute('aria-pressed', String(mode === 'contour'));
  $('#undo').disabled = !store.undoStack.length;
  $('#redo').disabled = !store.redoStack.length;
  for (const b of document.querySelectorAll('#nudge button')) b.disabled = !selection.nodeId;

  // Inspector: breadcrumb glyph › contour › node, plus semantic context.
  const node = selection.nodeId ? findNode(committed, selection.nodeId) : null;
  if (node) {
    const comps = committed.semanticGraph.components.filter((c) => [...c.geometryRefs, ...c.candidateGeometryRefs].some((ref) => ref === node.segment.segmentId || ref === node.contour.contourId));
    $('#inspector').innerHTML = `<div><code>${esc(glyphId)}</code> › <code>${esc(node.contour.contourId.replace(/^glyph\.[A-Z]\./, ''))}</code> › <code>${esc(selection.nodeId.split('.').slice(-2).join('.'))}</code></div>
      <div>Position: (${node.segment.x}, ${node.segment.y}) · Rolle: ${esc(node.contour.role)}</div>
      <div>Bauteil: ${comps.map((c) => `${esc(c.label)} <span class="muted">(${esc(c.mappingStatus)})</span>`).join(', ') || '—'}</div>`;
  } else if (selection.glyphId) {
    $('#inspector').innerHTML = `<div><code>${esc(glyphId)}</code> · ${esc(committed.variants[0].variantId)} · ${esc(committed.maturity)}</div><div>Rev. ${committed.revision} · geom ${committed.variants[0].geometryHash.slice(0, 10)}</div>`;
  } else $('#inspector').textContent = '—';

  const rep = validateGlyphGeometry(committed, profile);
  const errs = rep.diagnostics.filter((d) => d.severity === 'error').length;
  const warns = [...new Set(rep.diagnostics.filter((d) => d.severity === 'warning').map((d) => d.code))];
  $('#validation').innerHTML = `<div class="${rep.hardChecksPassed ? 'ok' : 'err'}">${rep.hardChecksPassed ? 'Alle harten Prüfungen bestanden' : `${errs} Fehler`}</div>
    <div>Innenräume: ${rep.negativeSpace.counters.map((c) => (c.boundedFace ? 'umschlossen' : 'NICHT umschlossen')).join(', ') || 'keine'} · Wand min: ${rep.clearance.counterWalls.map((w) => w.minimumDistance.toFixed(1)).join(' / ') || '—'} (unkalibriert)</div>
    <div class="muted">Hinweise (blockieren nicht): ${warns.map(esc).join(', ') || '—'}</div>`;

  const hist = store.undoStack.filter((h) => h.glyphId === glyphId);
  $('#history').innerHTML = hist.map((h) => `<li>${esc(h.description)} <span class="muted">Rev. ${h.before_revision}→${h.after_revision}</span></li>`).join('');
  $('#history-empty').hidden = hist.length > 0;
  $('#project').textContent = `${store.dirty ? 'Ungespeicherte Änderungen' : 'Gespeichert'} · ${store.undoStack.length} Schritt(e) · Redo ${store.redoStack.length}`;

  const ch = glyphId.slice(-1);
  const ops = Object.entries(disabledOps).filter(([id]) => id.startsWith(`glyph.${ch}.`));
  $('#params').innerHTML = ops.map(([id, op]) => `<div class="param"><label>${esc(id.replace(`glyph.${ch}.`, ''))}<input type="range" disabled title="${esc(op.reason)}"></label></div>`).join('') || '<p class="muted">—</p>';
}

function setupControls() {
  $('#glyphbar').innerHTML = EDITABLE.map((c) => `<button data-id="latin.upper.${c}">${c}</button>`).join('') + '<span class="muted">Andere Buchstaben sind provisorisch (nur Referenz).</span>';
  for (const b of document.querySelectorAll('#glyphbar button')) b.addEventListener('click', () => { if (interaction) cancelInteraction('glyph-switch'); glyphId = b.dataset.id; selection = { glyphId, nodeId: null }; view.zoom = 1; view.panX = view.panY = 0; banner = { text: '', cls: '' }; refreshUi(); });
  $('#mode-select').addEventListener('click', () => { mode = 'select'; refreshUi(); });
  $('#mode-contour').addEventListener('click', () => { mode = 'contour'; refreshUi(); });
  $('#undo').addEventListener('click', undo);
  $('#redo').addEventListener('click', redo);
  $('#zoom-in').addEventListener('click', () => setZoom(view.zoom * 1.25));
  $('#zoom-out').addEventListener('click', () => setZoom(view.zoom / 1.25));
  $('#zoom-reset').addEventListener('click', () => { view.zoom = 1; view.panX = view.panY = 0; refreshUi(); });
  for (const b of document.querySelectorAll('#nudge button')) b.addEventListener('click', () => nudge(Number(b.dataset.dx), Number(b.dataset.dy)));
  $('#save').addEventListener('click', () => {
    try { localStorage.setItem(STORAGE_KEY, store.save()); setBanner('Im Browser gespeichert.', 'ok'); } catch (err) { setBanner(`Speichern nicht möglich: ${err.message}`, 'err'); }
    refreshUi();
  });
  $('#load').addEventListener('click', () => {
    let text = null;
    try { text = localStorage.getItem(STORAGE_KEY); } catch { /* unavailable */ }
    if (!text) { setBanner('Kein gespeichertes Projekt im Browser.', 'warn'); refreshUi(); return; }
    store = EditorStore.load(text, profile, disabledOps);
    selection = { glyphId, nodeId: null };
    setBanner('Projekt geladen.', 'ok');
    refreshUi();
  });
  $('#download').addEventListener('click', () => {
    const a = Object.assign(document.createElement('a'), { href: URL.createObjectURL(new Blob([store.save()], { type: 'application/json' })), download: 'nightshift-project.json' });
    a.click();
    refreshUi();
  });
  $('#reset').addEventListener('click', () => { store = new EditorStore(registry.list(), profile, disabledOps); selection = { glyphId, nodeId: null }; setBanner('Auf v0.6-Import zurückgesetzt (nicht gespeichert).', 'warn'); refreshUi(); });
}

// ---------- boot ----------
const selftest = { ready: false, steps: {}, errors: [] };
window.addEventListener('error', (e) => selftest.errors.push(String(e.message)));
try {
  const [snapshot, overlay, parameterContract, validationContract] = await Promise.all([
    get('../data/legacy/v06-glyph-paths.json'), get('../data/semantic/abgrs-semantic-overlay.v1.json'),
    get('../contracts/glyph-parameter-contract.v1.json'), get('../contracts/glyph-geometry-validation.v1.json'),
  ]);
  profile = await get('../data/validator-profiles/legacy-v06.v1.json');
  paramContract = parameterContract;
  registry = GlyphRegistry.build({ snapshot, overlay, parameterContract, validationContract });
  disabledOps = disabledParameterOperations(paramContract);
  store = new EditorStore(registry.list(), profile, disabledOps);
  setupControls();
  refreshUi();
  selftest.ready = true;
  if (location.search.includes('selftest')) runSelftest();
} catch (e) {
  $('#banner').textContent = `Fehler: ${e.message}`;
  selftest.errors.push(e.message);
}
publish();

function publish() {
  let pre = document.getElementById('selftest');
  if (!pre) { pre = Object.assign(document.createElement('pre'), { id: 'selftest', hidden: true }); document.body.append(pre); }
  pre.textContent = JSON.stringify(selftest);
}

/** Scripted acceptance run through the same handlers the pointer UI uses. */
function runSelftest() {
  const S = selftest.steps;
  const A = 'latin.upper.A', APEX = 'glyph.A.contour.outer.node.02', CNODE = 'glyph.A.contour.counter.primary.node.01';
  const hash = () => store.get(A).variants[0].geometryHash;
  const sceneHash = () => root.userData.geometryHash;
  const original = hash();

  dragStart(APEX);
  const pv = dragMove({ x: 42.2, y: 4.1 });
  S.previewValid = pv.ok && root.userData.provisional === true && store.revision(A) === registry.get(A).revision;
  const c = dragEnd();
  S.commit = c.committed && hash() !== original && sceneHash() === hash() && root.userData.provisional === false && node(APEX).x === 42 && node(APEX).y === 4;
  const edited = hash();

  dragStart(CNODE);
  const bad = dragMove({ x: 5, y: 60 });
  S.previewInvalidMarked = !bad.ok && root.userData.valid === false && root.userData.provisional === true;
  const rej = dragEnd();
  S.rejectRestores = !rej.committed && hash() === edited && sceneHash() === edited && root.userData.provisional === false;

  dragStart(APEX); dragMove({ x: 30, y: 30 }); cancelInteraction('selftest');
  S.cancelRestores = hash() === edited && sceneHash() === edited;

  const saved = store.save(); store.dirty = true; const rev = store.revision(A);
  setZoom(3); view.panX = 20; draw();
  S.cameraNotGeometry = store.save() === saved && store.revision(A) === rev;
  setZoom(1); view.panX = 0;

  const stale = store.submit(moveNodeCommand(store, A, APEX, { x: 41, y: 8 }, { expectedRevision: rev - 1 }));
  S.staleRejected = !stale.committed && stale.code === 'CMD_REVISION_CONFLICT' && hash() === edited;

  undo();
  S.undo = hash() === original && sceneHash() === original;
  redo();
  S.redo = hash() === edited && sceneHash() === edited;

  selection = { glyphId: A, nodeId: APEX };
  const text = store.save();
  store = EditorStore.load(text, profile, disabledOps);
  refreshUi();
  S.saveReload = store.save() === text && hash() === edited && handles.some((h) => h.nodeId === APEX);

  const n = nudge(1, 0);
  S.nudgeAlternative = n.committed && node(APEX).x === 43;

  // Real pointer path: synthetic PointerEvents at the handle's screen position.
  const screenOf = (x, y) => {
    const v = new THREE.Vector3(x, -y, 0).project(camera);
    const r = canvas.getBoundingClientRect();
    return { clientX: r.left + ((v.x + 1) / 2) * r.width, clientY: r.top + ((1 - v.y) / 2) * r.height };
  };
  const fire = (type, pt) => canvas.dispatchEvent(new PointerEvent(type, { ...pt, bubbles: true, pointerId: 7, pointerType: 'touch', isPrimary: true }));
  const NODE3 = 'glyph.A.contour.outer.node.03';
  const n3 = node(NODE3);
  const before = hash();
  fire('pointerdown', screenOf(n3.x, n3.y));
  fire('pointermove', screenOf(n3.x + 3, n3.y - 2));
  fire('pointerup', screenOf(n3.x + 3, n3.y - 2));
  S.pointerPath = hash() !== before && node(NODE3).x === n3.x + 3 && node(NODE3).y === n3.y - 2 && store.undoStack.at(-1).affected_entity_ids[0] === NODE3;

  S.paramsDisabled = document.querySelectorAll('#params input[type=range]').length > 0 && [...document.querySelectorAll('#params input')].every((i) => i.disabled);
  selftest.pass = Object.values(S).every(Boolean) && selftest.errors.length === 0;
  publish();
}
function node(id) { return findNode(store.get('latin.upper.A'), id).segment; }
