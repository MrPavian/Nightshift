// Prints role, screen winding and exact signed area of every contour in multi-contour glyphs.
import { importV06 } from '../src/core/legacy/import.ts';
for (const g of importV06()) {
  const c = g.variants[0]!.geometry.contours;
  if (c.length > 1) console.log(g.character, c.map((x) => `${x.role}:${x.winding}:${x.signedArea.toFixed(1)}`).join('  '));
}
