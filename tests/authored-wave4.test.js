// C02 wave 4: authored J and U masters (base-curve, hook and open-top systems). Completes C02 authoring.
import { test } from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import { loadRegistry } from '../src/glyph/load-node.js';
import { validateGlyphGeometry } from '../src/glyph/validate-geometry.js';
import { buildRenderModel } from '../src/render/render-model.js';
import { sha256Hex } from '../src/core/sha256.js';

const profile = JSON.parse(readFileSync('data/validator-profiles/legacy-v06.v1.json', 'utf8'));
const snapshot = JSON.parse(readFileSync('data/glyphs/authored/c02-wave4.v1.json', 'utf8'));
const plan = JSON.parse(readFileSync('contracts/alphabet-authoring-plan.v1.json', 'utf8'));
const registry = loadRegistry();

test('wave 4 covers J and U; hash-consistent; original provenance, review pending', () => {
  assert.deepEqual(plan.waves.find((w) => w.id === 'wave-4').glyphs.slice().sort(), ['J', 'U']);
  assert.deepEqual(Object.keys(snapshot.glyphs).sort(), ['J', 'U']);
  for (const g of Object.values(snapshot.glyphs)) assert.equal(sha256Hex(g.outer.d), g.outer.sha256);
  assert.equal(snapshot.provenance.kind, 'claude-authored');
  assert.equal(snapshot.provenance.review, 'pending');
});

test('J and U pass hard and identity checks; curve walls hold 23 units; both sit exactly on the baseline', () => {
  for (const ch of ['J', 'U']) {
    const g = registry.getByChar(ch), r = validateGlyphGeometry(g, profile);
    assert.equal(r.hardChecksPassed, true, ch);
    for (const k of ['single-required-connected-contour', 'no-unintended-self-intersection', 'no-enclosed-counter']) assert.equal(r.identityChecks.find((i) => i.name === k).status, 'passed', `${ch} ${k}`);
    const walls = r.clearance.boundarySelfProximity.filter((m) => m.side === 'filled' && m.minimumDistance < 30).map((m) => m.minimumDistance);
    assert.ok(walls.length && walls.every((d) => d > 22 && d < 27), `${ch} walls ${walls}`);
    assert.equal(g.baseMetrics.visibleBounds.maxY, 132, `${ch} baseline (v0.6 overshot to 135–136)`);
    assert.ok(buildRenderModel(g, r));
  }
});

test('C02 authoring is complete: every letter A–Z has an editable authored master with its v0.6 base kept for reference (waves 1–4); none is reviewed', () => {
  const all = registry.list();
  assert.equal(all.length, 26);
  for (const g of all) {
    assert.equal(g.maturity, 'authored-contour', g.character);
    assert.equal(g.variants[0].geometry.editability, 'fully-editable', g.character);
    // Waves 1–4 keep their v0.6 base as a reference-only second variant; wave 0 (A B G R S) was authored on the v0.6 geometry itself.
    if ('ABGRS'.includes(g.character)) assert.equal(g.variants.length, 1, g.character);
    else assert.equal(g.variants.at(-1).geometry.editability, 'reference-only', g.character);
    assert.deepEqual(g.review, [], `${g.character}: no review may be claimed`);
    assert.ok(g.semanticGraph.components.length >= 2, `${g.character} has component proposals`);
  }
});
