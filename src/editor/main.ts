import * as THREE from 'three';
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';
import { GlyphRegistry } from '../core/registry/registry.ts';
import { buildGlyphObject, setSelected, type GlyphSceneObject } from './three/glyph-scene.ts';

const host = document.getElementById('viewport')!;
const info = document.getElementById('info')!;

const registry = GlyphRegistry.fromLegacyV06();

const renderer = new THREE.WebGLRenderer({ antialias: true });
renderer.setPixelRatio(Math.min(devicePixelRatio, 2));
host.append(renderer.domElement);

const scene = new THREE.Scene();
scene.background = new THREE.Color(0x14181e);

const camera = new THREE.OrthographicCamera(-1, 1, 1, -1, -1000, 1000);
camera.position.set(0, 0, 10);
const controls = new OrbitControls(camera, renderer.domElement);
controls.enableRotate = false;
controls.screenSpacePanning = true;
controls.mouseButtons = { LEFT: THREE.MOUSE.PAN, MIDDLE: THREE.MOUSE.DOLLY, RIGHT: THREE.MOUSE.PAN };

// Lay A–Z out in a 7-column grid; layout is presentation state only.
const COLS = 7, CELL_W = 140, CELL_H = 190;
const objects: GlyphSceneObject[] = registry.all().map((g, i) => {
  const o = buildGlyphObject(g);
  o.group.position.set((i % COLS) * CELL_W, -Math.floor(i / COLS) * CELL_H, 0);
  scene.add(o.group);
  return o;
});
const rows = Math.ceil(objects.length / COLS);
const centre = new THREE.Vector3(((COLS - 1) * CELL_W + 110) / 2, -((rows - 1) * CELL_H + 150) / 2, 0);
const VIEW_H = rows * CELL_H + 60;

function resize(): void {
  const w = host.clientWidth, h = host.clientHeight;
  renderer.setSize(w, h, false);
  const aspect = w / h;
  const halfH = Math.max(VIEW_H, (COLS * CELL_W + 60) / aspect) / 2;
  camera.left = -halfH * aspect; camera.right = halfH * aspect;
  camera.top = halfH; camera.bottom = -halfH;
  camera.updateProjectionMatrix();
}
camera.position.set(centre.x, centre.y, 10);
controls.target.copy(centre).setZ(0);
resize();
new ResizeObserver(resize).observe(host);

let selected: GlyphSceneObject | null = null;
const ray = new THREE.Raycaster();
const ndc = new THREE.Vector2();

function describe(o: GlyphSceneObject): void {
  const g = registry.get(o.glyphId as `latin.upper.${string}`);
  const v = registry.variant(g.glyphId);
  const t = g.semanticGraph.topology;
  const b = g.baseMetrics.visibleBounds;
  const rows: [string, string][] = [
    ['Glyph', g.glyphId],
    ['Variante', v.variantId],
    ['Reife', g.maturity],
    ['Geometrie', g.geometryStatus],
    ['Konturen', String(t.contourCount)],
    ['Counter', t.counterIds.length ? t.counterIds.join(', ') : '—'],
    ['Apertur', t.apertureStatus],
    ['Bounds', `${b.minX}…${b.maxX} × ${b.minY}…${b.maxY}`],
    ['Metriken', g.baseMetrics.calibrated ? 'kalibriert' : 'nicht kalibriert'],
    ['Quelle', `${g.legacySource.map}-Map, v0.6`],
  ];
  info.innerHTML = rows.map(([k, v]) => `<dt>${k}</dt><dd>${v}</dd>`).join('');
}

let downAt = { x: 0, y: 0 };
renderer.domElement.addEventListener('pointerdown', (e) => { downAt = { x: e.clientX, y: e.clientY }; });
renderer.domElement.addEventListener('pointerup', (e) => {
  if (Math.hypot(e.clientX - downAt.x, e.clientY - downAt.y) > 4) return; // was a pan
  const r = renderer.domElement.getBoundingClientRect();
  ndc.set(((e.clientX - r.left) / r.width) * 2 - 1, -((e.clientY - r.top) / r.height) * 2 + 1);
  ray.setFromCamera(ndc, camera);
  const hit = ray.intersectObjects(objects.map((o) => o.hitArea))[0];
  if (selected) setSelected(selected, false);
  selected = hit ? objects.find((o) => o.hitArea === hit.object) ?? null : null;
  if (selected) { setSelected(selected, true); describe(selected); }
});

renderer.setAnimationLoop(() => { controls.update(); renderer.render(scene, camera); });

// Exposed for automated browser checks only.
(window as unknown as { __nightshift: unknown }).__nightshift = { registry, scene, objects, camera };
