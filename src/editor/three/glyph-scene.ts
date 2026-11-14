/**
 * ThreeEditorAdapter (first slice): builds derived three.js objects from canonical glyph
 * records. Scene objects carry stable canonical IDs in userData and are never persisted;
 * rebuilding from the registry always reproduces them.
 */
import * as THREE from 'three';
import type { GlyphDefinition, VectorContour } from '../../core/schema/types.ts';

export interface GlyphSceneObject {
  glyphId: string;
  variantId: string;
  group: THREE.Group;
  hitArea: THREE.Mesh;
}

const COLORS = { authored: 0xd7ff45, provisional: 0x6f7a88, select: 0xff6847 };

/** Display-only polyline of a contour. Quadratics are sampled for drawing; canonical data stays exact. */
export function contourPolyline(c: VectorContour, samplesPerCurve = 16): THREE.Vector3[] {
  const pts: THREE.Vector3[] = [];
  let p = { x: 0, y: 0 };
  for (const s of c.segments) {
    if (s.type === 'move' || s.type === 'line') {
      p = { x: s.x, y: s.y };
      pts.push(new THREE.Vector3(p.x, -p.y, 0));
    } else if (s.type === 'quadratic') {
      const p0 = p;
      for (let i = 1; i <= samplesPerCurve; i++) {
        const t = i / samplesPerCurve, u = 1 - t;
        pts.push(new THREE.Vector3(u * u * p0.x + 2 * u * t * s.cx + t * t * s.x, -(u * u * p0.y + 2 * u * t * s.cy + t * t * s.y), 0));
      }
      p = { x: s.x, y: s.y };
    } else if (s.type === 'cubic') {
      const p0 = p;
      for (let i = 1; i <= samplesPerCurve; i++) {
        const t = i / samplesPerCurve, u = 1 - t;
        const x = u ** 3 * p0.x + 3 * u * u * t * s.c1x + 3 * u * t * t * s.c2x + t ** 3 * s.x;
        const y = u ** 3 * p0.y + 3 * u * u * t * s.c1y + 3 * u * t * t * s.c2y + t ** 3 * s.y;
        pts.push(new THREE.Vector3(x, -y, 0));
      }
      p = { x: s.x, y: s.y };
    }
  }
  return pts;
}

export function buildGlyphObject(g: GlyphDefinition): GlyphSceneObject {
  const v = g.variants[0];
  if (!v) throw new Error(`scene: ${g.glyphId} has no variant`);
  const group = new THREE.Group();
  group.name = g.glyphId;
  group.userData = { glyphId: g.glyphId, variantId: v.variantId, revision: g.revision };
  const color = g.maturity === 'provisional' ? COLORS.provisional : COLORS.authored;

  for (const c of v.geometry.contours) {
    const geo = new THREE.BufferGeometry().setFromPoints(contourPolyline(c));
    const mat = new THREE.LineBasicMaterial({ color });
    const line = new THREE.LineLoop(geo, mat);
    line.userData = { contourId: c.contourId, role: c.role };
    group.add(line);
  }

  const b = g.baseMetrics.visibleBounds;
  const hit = new THREE.Mesh(
    new THREE.PlaneGeometry(b.maxX - b.minX, b.maxY - b.minY),
    new THREE.MeshBasicMaterial({ color: COLORS.select, transparent: true, opacity: 0, depthWrite: false }),
  );
  hit.position.set((b.minX + b.maxX) / 2, -(b.minY + b.maxY) / 2, -0.1);
  hit.userData = { glyphId: g.glyphId };
  group.add(hit);

  return { glyphId: g.glyphId, variantId: v.variantId, group, hitArea: hit };
}

export function setSelected(o: GlyphSceneObject, selected: boolean): void {
  (o.hitArea.material as THREE.MeshBasicMaterial).opacity = selected ? 0.12 : 0;
}

export function disposeGlyphObject(o: GlyphSceneObject): void {
  o.group.traverse((x) => {
    if (x instanceof THREE.Mesh || x instanceof THREE.Line) {
      x.geometry.dispose();
      (x.material as THREE.Material).dispose();
    }
  });
}
