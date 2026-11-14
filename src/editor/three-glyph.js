// Three.js mesh adapter for the render model (Ticket 0.7A-T05).
//
// Meshes are derived from the same flattened render polygons as the SVG path
// (outer + declared holes). Each mesh carries canonical IDs in userData so the
// later editor (T07) can resolve picks back to the model. Three.js is imported
// here and only here (D-012).

import * as THREE from 'three';

/**
 * Build a Group of meshes for one glyph render model.
 * Coordinates: glyph-local y-down is mapped to Three.js y-up by negating y.
 * @param {object} model render model
 * @param {{color?:number|string, z?:number}} opts
 */
export function buildGlyphObject(model, { color = 0x111111, z = 0 } = {}) {
  const group = new THREE.Group();
  group.name = model.glyphId;
  group.userData = { glyphId: model.glyphId, variantId: model.variantId, revision: model.revision, geometryHash: model.geometryHash, derived: true };
  const material = new THREE.MeshBasicMaterial({ color, side: THREE.DoubleSide });
  for (const r of model.regions) {
    const shape = new THREE.Shape(toVec(r.polygons.outer.points));
    for (const h of r.polygons.holes) shape.holes.push(new THREE.Path(toVec(h.points)));
    const geometry = new THREE.ShapeGeometry(shape);
    const mesh = new THREE.Mesh(geometry, material);
    mesh.position.z = z;
    mesh.userData = { glyphId: model.glyphId, contourId: r.outer.contourId, holeContourIds: r.holes.map((h) => h.contourId), role: 'fill' };
    group.add(mesh);
  }
  return group;
}

const toVec = (points) => points.map(([x, y]) => new THREE.Vector2(x, -y));

/** Total triangulated area of a glyph object (for parity tests). */
export function meshArea(group) {
  let area = 0;
  group.traverse((o) => {
    if (!o.isMesh) return;
    const pos = o.geometry.getAttribute('position');
    const idx = o.geometry.getIndex();
    const tri = (i, j, k) => {
      const ax = pos.getX(i), ay = pos.getY(i), bx = pos.getX(j), by = pos.getY(j), cx = pos.getX(k), cy = pos.getY(k);
      area += Math.abs((bx - ax) * (cy - ay) - (by - ay) * (cx - ax)) / 2;
    };
    if (idx) for (let t = 0; t < idx.count; t += 3) tri(idx.getX(t), idx.getX(t + 1), idx.getX(t + 2));
    else for (let t = 0; t < pos.count; t += 3) tri(t, t + 1, t + 2);
  });
  return area;
}

/** True if glyph-local point (x, y-down) is covered by any triangle of the object. */
export function meshCovers(group, x, y) {
  const py = -y;
  let hit = false;
  group.traverse((o) => {
    if (hit || !o.isMesh) return;
    const pos = o.geometry.getAttribute('position');
    const idx = o.geometry.getIndex();
    const n = idx ? idx.count : pos.count;
    for (let t = 0; t < n && !hit; t += 3) {
      const [i, j, k] = idx ? [idx.getX(t), idx.getX(t + 1), idx.getX(t + 2)] : [t, t + 1, t + 2];
      const d1 = sign(x, py, pos.getX(i), pos.getY(i), pos.getX(j), pos.getY(j));
      const d2 = sign(x, py, pos.getX(j), pos.getY(j), pos.getX(k), pos.getY(k));
      const d3 = sign(x, py, pos.getX(k), pos.getY(k), pos.getX(i), pos.getY(i));
      const neg = d1 < 0 || d2 < 0 || d3 < 0, pos3 = d1 > 0 || d2 > 0 || d3 > 0;
      if (!(neg && pos3)) hit = true;
    }
  });
  return hit;
}
const sign = (px, py, ax, ay, bx, by) => (px - bx) * (ay - by) - (ax - bx) * (py - by);
