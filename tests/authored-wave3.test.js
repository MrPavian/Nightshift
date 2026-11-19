// C02 wave 3: authored K M N V W X Y Z masters (diagonal, branch, valley and crossing systems).
import { test } from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import { loadRegistry } from '../src/glyph/load-node.js';
import { validateGlyphGeometry } from '../src/glyph/validate-geometry.js';
import { buildRenderModel } from '../src/render/render-model.js';
import { sha256Hex } from '../src/core/sha256.js';
import { G } from '../tools/lib/wave3-construction.mjs';
import { strokes } from '../tools/lib/stroke-measure.mjs';

const profile = JSON.parse(readFileSync('data/validator-profiles/legacy-v06.v1.json', 'utf8'));
const snapshot = JSON.parse(readFileSync('data/glyphs/authored/c02-wave3.v1.json', 'utf8'));
const plan = JSON.parse(readFileSync('contracts/alphabet-authoring-plan.v1.json', 'utf8'));
const registry = loadRegistry();
const WAVE3 = ['K', 'M', 'N', 'V', 'W', 'X', 'Y', 'Z'];

test('wave 3 covers the plan’s glyphs; committed paths equal the construction; provenance original, review pending', () => {
  assert.deepEqual(plan.waves.find((w) => w.id === 'wave-3').glyphs.slice().sort(), [...WAVE3].sort());
  assert.deepEqual(Object.keys(snapshot.glyphs).sort(), [...WAVE3].sort());
  for (const ch of WAVE3) {
    const g = snapshot.glyphs[ch];
    assert.equal(g.outer.d, G[ch], `${ch} differs from tools/lib/wave3-construction.mjs`);
    assert.equal(sha256Hex(g.outer.d), g.outer.sha256);
  }
  assert.equal(snapshot.provenance.kind, 'claude-authored');
  assert.equal(snapshot.provenance.review, 'pending');
});

test('diagonal strokes hold the family thickness (perpendicular 23.5–27 units)', () => {
  for (const ch of ['K', 'N', 'V', 'W', 'X', 'Y', 'Z']) {
    const diag = strokes(G[ch]).filter((s) => s.diagonal && s.dist < 40).map((s) => s.dist);
    assert.ok(diag.length >= 1, `${ch} has measurable diagonal strokes`);
    for (const d of diag) assert.ok(d >= 23.5 && d <= 27, `${ch}: ${d}`);
  }
  // M: the diagonal edges are parallel lines 25 units apart by construction (overlap too short for the edge-pair measure).
  const pts = [...G.M.matchAll(/(\d+) (\d+)/g)].map((m) => [+m[1], +m[2]]);
  const [a, b] = [pts[2], pts[3]], c = pts[10];
  const n = Math.hypot(b[0] - a[0], b[1] - a[1]);
  const dist = Math.abs((c[0] - a[0]) * (b[1] - a[1]) - (c[1] - a[1]) * (b[0] - a[0])) / n;
  assert.ok(Math.abs(dist - 25) <= 1, `M diagonal ${dist}`);
});

test('all wave 3 masters pass hard validation and identity checks; distinctions stay for human review', () => {
  for (const ch of WAVE3) {
    const g = registry.getByChar(ch), r = validateGlyphGeometry(g, profile);
    assert.equal(g.maturity, 'authored-contour', ch);
    assert.equal(g.variants[1].geometry.editability, 'reference-only', ch);
    assert.equal(r.hardChecksPassed, true, ch);
    const id = Object.fromEntries(r.identityChecks.map((i) => [i.name, i.status]));
    for (const k of ['single-required-connected-contour', 'no-unintended-self-intersection', 'no-enclosed-counter']) assert.equal(id[k], 'passed', `${ch} ${k}`);
    assert.ok(r.identityChecks.some((i) => i.name.endsWith('-review') && i.status === 'not-evaluable'), ch);
    assert.ok(buildRenderModel(g, r), ch);
  }
});

test('components partition each outline exactly once and every reference resolves', () => {
  for (const ch of WAVE3) {
    const g = registry.getByChar(ch);
    const segs = g.variants[0].geometry.contours[0].segments.filter((s) => s.segmentId && !/seg\.00$/.test(s.segmentId)).map((s) => s.segmentId);
    const assigned = g.semanticGraph.components.flatMap((c) => c.candidateGeometryRefs);
    assert.deepEqual([...assigned].sort(), [...segs].sort(), `${ch} partition`);
    const nodes = new Set(g.variants[0].geometry.contours[0].segments.map((s) => s.nodeId));
    for (const r of g.semanticGraph.junctions.flatMap((j) => j.candidateNodeRefs)) assert.ok(nodes.has(r), `${ch} ${r}`);
  }
});

test('structural distinctions that geometry can show: V meets the baseline, Y has a stem, X crosses, M has a valley', () => {
  const ys = (ch) => [...G[ch].matchAll(/(\d+) (\d+)/g)].map((m) => [+m[1], +m[2]]);
  assert.deepEqual(ys('V').filter(([, y]) => y === 132).map(([x]) => x), [64, 40]);
  assert.ok(ys('Y').some(([x, y]) => x === 39 && y === 132) && ys('Y').some(([x, y]) => x === 65 && y === 132), 'Y stem as T');
  assert.equal(registry.getByChar('X').semanticGraph.junctions[0].kind, 'crossing');
  const valley = ys('M').find(([x, y]) => x === 57 && y > 60);
  assert.ok(valley && valley[1] < 132, 'M valley above the baseline');
});
