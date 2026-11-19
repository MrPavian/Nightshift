// Style Library Phase A-01 proof run (frozen): honesty, finish isolation and integrity checks.
// The run was produced by resolver 1.0 and is no longer regenerated (resolver 1.1 changed Bubble);
// these tests read the committed files and verify them against their own checksums.
import test from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync, readdirSync, statSync } from 'node:fs';
import { join, relative } from 'node:path';
import { RUN_DIR, verifyFrozenRun } from '../tools/proof-style-plates.mjs';
import { loadRegistry } from '../src/glyph/load-node.js';
import { PRIMARY_GLYPHS, COMPARED_PRESETS, INK } from '../src/proof/style-run.js';

const walk = (d) => readdirSync(d).flatMap((n) => (statSync(join(d, n)).isDirectory() ? walk(join(d, n)) : [join(d, n)]));
const files = Object.fromEntries(walk(RUN_DIR).map((p) => [relative(RUN_DIR, p), readFileSync(p, 'utf8')]));
const manifest = JSON.parse(files['manifest.json']);
const report = JSON.parse(files['report/operations.json']);
const plates = Object.entries(files).filter(([p]) => p.startsWith('plates/'));

test('frozen Phase A-01 run is intact (checksums match every committed file)', () => {
  assert.deepEqual(verifyFrozenRun(RUN_DIR), []);
  const sums = JSON.parse(files['checksums.json']);
  assert.equal(sums.runId, manifest.runId);
  for (const p of Object.keys(manifest.artifactHashes)) assert.ok(p in sums, p);
});

test('primary comparison plates are monochrome silhouettes without any finish', () => {
  assert.ok(plates.length >= 4);
  for (const [p, svg] of plates) {
    assert.doesNotMatch(svg, /<(linearGradient|radialGradient|filter|pattern|image)\b/, `${p}: no gradients, filters, patterns or images`);
    const groups = svg.match(/<g data-glyph-id="[^"]*"[^>]*>.*?<\/g>/g) ?? [];
    assert.ok(groups.length > 0, `${p}: glyphs drawn`);
    for (const g of groups) {
      const paths = g.match(/<path[^>]*>/g);
      for (const path of paths) {
        assert.match(path, /data-role="fill"/, `${p}: only fill paths inside glyph groups`);
        assert.match(path, new RegExp(`fill="${INK}"`), `${p}: single ink colour`);
        assert.doesNotMatch(path, /stroke=/, `${p}: no outline`);
      }
    }
  }
  for (const [k, v] of Object.entries(manifest.renderProfile.finish)) assert.equal(v, false, `finish ${k} disabled`);
});

test('A/B/G/R/S are compared in all four implemented grammars, with maturity metadata', () => {
  const comparison = manifest.specimens.filter((s) => s.family === 'glyph-comparison');
  assert.equal(comparison.length, PRIMARY_GLYPHS.length * COMPARED_PRESETS.length);
  for (const c of PRIMARY_GLYPHS) {
    for (const p of COMPARED_PRESETS) assert.ok(comparison.some((s) => s.text === c && s.preset === p), `${c} × ${p}`);
    const g = manifest.glyphs.find((x) => x.character === c);
    assert.equal(g.maturity, 'authored-contour');
    assert.ok(g.masterGeometryHash);
  }
});

test('every drawn glyph is traceable: specimen hashes appear on its plate and validation passed', () => {
  for (const s of manifest.specimens) {
    for (const plate of s.plates) {
      for (const slot of s.slots) {
        assert.ok(files[plate].includes(`data-geometry-hash="${slot.geometryHash}"`), `${s.specimenId} ${slot.character} on ${plate}`);
        assert.equal(slot.hardChecksPassed, true, `${s.specimenId} ${slot.character} hard checks`);
      }
    }
  }
  for (const [p, h] of Object.entries(manifest.artifactHashes)) assert.match(h, /^[0-9a-f]{64}$/, p);
});

test('Blockbuster is Straight letterform + Block-fit composition, not its own alphabet', () => {
  for (const [c, g] of Object.entries(report.glyphs)) {
    const b = g.styles.blockbuster;
    assert.equal(b.request.letterform, 'straight', c);
    assert.equal(b.request.composition, 'block-fit', c);
    const ids = b.operations.map((o) => o.operationId);
    assert.ok(ids.some((id) => id.startsWith('letterform.straight.')), `${c}: straight operations recorded`);
    assert.ok(ids.some((id) => id.startsWith('composition.block-fit.')), `${c}: block-fit operations recorded`);
  }
});

test('Wildstyle interlocking is reported as skipped and never drawn', () => {
  for (const [c, g] of Object.entries(report.glyphs)) {
    const w = g.styles.wildstyle;
    assert.notEqual(w.status, 'applied', c);
    const inter = w.operations.find((o) => o.operationId === 'composition.interlocking');
    assert.equal(inter.status, 'skipped', c);
    assert.match(inter.reason, /C04/, c);
  }
  assert.equal(report.presets.wildstyle.drawn, false);
  assert.ok(!manifest.specimens.some((s) => s.preset === 'wildstyle'));
  for (const [p, svg] of plates) {
    assert.doesNotMatch(svg, /data-variant-id="[^"]*style-wildstyle/, `${p}: no wildstyle geometry`);
    assert.match(svg, /Wildstyle \(Studie\): angefragt, aber nicht gezeigt/, `${p}: limitation stated on the plate`);
  }
});

test('masters stay canonical; derived style geometry is reference-only', () => {
  const registry = loadRegistry();
  for (const g of manifest.glyphs) assert.equal(registry.getByChar(g.character).variants[0].geometryHash, g.masterGeometryHash, g.character);
  for (const [c, g] of Object.entries(report.glyphs)) {
    assert.equal(g.styles.neutral.geometryHash, g.masterGeometryHash, `${c}: neutral is the master`);
    for (const p of COMPARED_PRESETS) if (g.styles[p].derived) assert.notEqual(g.styles[p].geometryHash, g.masterGeometryHash, `${c} ${p}`);
  }
});

test('ABRA leads the word plate and coverage labels are reported honestly', () => {
  const words = manifest.specimens.filter((s) => s.family === 'word-context');
  assert.equal(words[0].text, 'ABRA');
  assert.match(words[0].coverage, /primary review set/);
  for (const w of words.filter((s) => s.text !== 'ABRA' && [...s.text].some((c) => !PRIMARY_GLYPHS.includes(c)))) assert.match(w.coverage, /owner design review pending/, w.text);
  assert.ok(manifest.coverage.fixtureContractLabels.length > 0);
});

test('human review stays pending: blank template, no ratings, no automated promotion', () => {
  assert.equal(manifest.review.status, 'pending');
  assert.equal(manifest.review.automatedMaturityPromotion, false);
  const template = JSON.parse(files['review/review-template.json']);
  assert.ok(template.length > 0);
  for (const r of template) {
    assert.equal(r.decision, null);
    assert.equal(r.reviewer, '');
    assert.equal(r.maturityAtReview, 'derived-reference-only');
    for (const v of Object.values(r.scores)) assert.equal(v, null);
  }
  assert.equal(files['review/ratings.json'], '[]\n');
});

test('reviewers can decline a verdict: unsure / cannot-assess are valid and never promote', async () => {
  const { DECISIONS, validateReviewRecord, proposeMaturity } = await import('../src/proof/review.js');
  assert.ok(DECISIONS.includes('unsure') && DECISIONS.includes('cannot-assess'));
  assert.deepEqual(manifest.review.decisionOptions, DECISIONS);
  const base = JSON.parse(files['review/review-template.json'])[0];
  for (const decision of ['unsure', 'cannot-assess']) {
    const rec = { ...base, reviewId: `rev.${decision}`, reviewer: 'Test', date: '2026-11-19', decision, rationale: 'kann ich nicht beurteilen' };
    assert.deepEqual(validateReviewRecord(rec, manifest).map((d) => d.code), [], decision);
    const glyph = loadRegistry().getByChar(rec.glyphId.split('.').pop());
    assert.equal(proposeMaturity(glyph, [rec]).proposed, null, `${decision} proposes nothing`);
  }
});
