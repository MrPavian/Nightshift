// Phase A-02 proof run (Issue #24): before/after evidence for Bubble counter safety and Bounce collision safety.
import test from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync, existsSync } from 'node:fs';
import { join } from 'node:path';
import { generateA02, RUN_DIR_A02 } from '../tools/proof-style-plates.mjs';
import { A02_GLYPHS, A02_PAIRS, MATURITY } from '../src/proof/style-run-a02.js';

const run = generateA02();
const { manifest, summary, files } = run;

test('Phase A-02 is deterministic and the committed run is up to date', () => {
  const again = generateA02();
  for (const [p, text] of Object.entries(files)) assert.equal(again.files[p], text, p);
  for (const [p, text] of Object.entries(files)) {
    const path = join(RUN_DIR_A02, p);
    assert.ok(existsSync(path), `${path} missing — run node tools/proof-style-plates.mjs`);
    assert.equal(readFileSync(path, 'utf8'), text, `${path} is stale — run node tools/proof-style-plates.mjs`);
  }
});

test('before reproduces the Phase A-01 defect, after keeps every counter above the floors', () => {
  const floors = JSON.parse(files['report/negative-space.json']).counterSafety.params;
  for (const c of ['A', 'B', 'R']) {
    assert.ok(summary.bubble[c].minAreaRatioBefore < 0.25, `${c}: before shows the collapse`);
    assert.ok(summary.bubble[c].minAreaRatioAfter >= floors.minAreaRatio, `${c}: after area`);
    assert.ok(summary.bubble[c].minOpeningRatioAfter >= floors.minOpeningRatio, `${c}: after opening`);
    assert.ok(summary.bubble[c].distanceAfter < summary.bubble[c].distanceBefore);
  }
});

test('before shows undeclared contact for every pair and ABRA; after has none', () => {
  for (const w of [...A02_PAIRS, 'ABRA']) {
    assert.ok(summary.bounce[w].before.every((c) => c === 'intersection'), `${w} before`);
    assert.ok(summary.bounce[w].after.every((c) => c === 'safe'), `${w} after`);
  }
  const placement = JSON.parse(files['report/placement.json']);
  for (const w of Object.values(placement.words)) for (const p of w.after.pairs) {
    assert.ok(typeof p.errorBound === 'number' && typeof p.accepted.clearance === 'number');
    assert.ok(p.accepted.clearance >= p.minClearance, `${p.a}/${p.b} clearance`);
  }
});

test('plates are monochrome silhouettes; maturity labels stay rendered / measured-uncalibrated / owner-review-required', () => {
  for (const [p, svg] of Object.entries(files).filter(([k]) => k.startsWith('plates/'))) {
    assert.doesNotMatch(svg, /<(linearGradient|radialGradient|filter|pattern|image)\b/, p);
    for (const g of svg.match(/<g data-glyph-id="[^"]*"[^>]*>.*?<\/g>/g)) for (const path of g.match(/<path[^>]*>/g)) {
      assert.match(path, /data-role="fill"/); assert.match(path, /fill="#111111"/); assert.doesNotMatch(path, /stroke=/);
    }
  }
  assert.deepEqual(manifest.maturity, MATURITY);
  assert.equal(manifest.review.status, 'owner-review-required');
  assert.equal(manifest.review.automatedMaturityPromotion, false);
  assert.doesNotMatch(JSON.stringify(manifest), /generator-ready"|"approved"/);
  assert.deepEqual(manifest.fixtures.glyphs, A02_GLYPHS);
});
