// Ticket 0.7A-T06 acceptance tests: proof sheets, fixtures, manifest, review records.
import { test } from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync, existsSync } from 'node:fs';
import { join } from 'node:path';
import { generate, RUN_DIR, readJson } from '../tools/proof-run.mjs';
import { buildProofRun } from '../src/proof/run.js';
import { GlyphRegistry } from '../src/glyph/registry.js';
import { loadRegistry } from '../src/glyph/load-node.js';
import { sha256Hex } from '../src/core/sha256.js';
import { stableStringify } from '../src/core/stable-json.js';
import { validateReviewRecord, proposeMaturity, blankReview, RUBRIC } from '../src/proof/review.js';

const run = generate();
const { manifest, files } = run;
const fixturesContract = readJson('contracts/proof-sheet-fixtures.v1.json');
const runContract = readJson('contracts/proof-sheet-run.v1.json');

test('committed proof run is up to date (except human-owned ratings)', () => {
  for (const [rel, text] of Object.entries(files)) {
    if (rel === 'review/ratings.json') continue;
    assert.equal(readFileSync(join(RUN_DIR, rel), 'utf8'), text, rel);
  }
  assert.ok(existsSync(join(RUN_DIR, 'review/ratings.json')));
});

test('identical inputs reproduce run ID, specimen IDs, plates and hashes', () => {
  const again = generate();
  assert.equal(again.manifest.runId, manifest.runId);
  assert.deepEqual(Object.keys(again.files), Object.keys(files));
  for (const k of Object.keys(files)) assert.equal(again.files[k], files[k], k);
});

test('manifest carries every field the run contract requires', () => {
  for (const field of runContract.run.required) assert.ok(field in manifest, field);
  for (const e of runContract.engineVersions) assert.ok(manifest.engineVersions[e], e);
  assert.equal(manifest.review.automatedMaturityPromotion, false);
  assert.equal(manifest.review.status, 'pending');
});

test('all canonical pair and word fixtures are present with contract coverage', () => {
  for (const f of [...fixturesContract.fixtures.pairs, ...fixturesContract.fixtures.words]) {
    const sp = manifest.specimens.find((s) => s.fixtureId === f.fixtureId);
    assert.ok(sp, f.fixtureId);
    assert.equal(sp.coverage, f.coverage, f.fixtureId);
  }
  assert.deepEqual(manifest.specimens.filter((s) => s.family === 'glyph-identity').map((s) => s.text), ['A', 'B', 'G', 'R', 'S']);
});

test('missing provisional glyphs are marked, never silently dropped', () => {
  const missing = Object.fromEntries(manifest.coverage.missingGlyphs.map((m) => [m.glyphId.slice(-1), m.reason]));
  assert.deepEqual(missing, { D: 'RENDER_UNDECLARED_TOPOLOGY', O: 'RENDER_UNDECLARED_TOPOLOGY', Q: 'RENDER_INVALID_TOPOLOGY' });
  for (const [word, chars] of [['BOMB', ['O']], ['GHOST', ['O']], ['MIND', ['D']], ['SQUE', ['Q']], ['GO', ['O']], ['RO', ['O']]]) {
    const sp = manifest.specimens.find((s) => s.text === word);
    assert.deepEqual(sp.missingSlots.map((m) => m.character), chars, word);
    assert.equal(sp.slots.length, word.length, `${word} keeps every slot`);
  }
  const words = files['plates/word-context.svg'];
  assert.equal((words.match(/data-status="missing"/g) ?? []).length, 4);
  assert.equal((files['plates/pair-context.svg'].match(/data-status="missing"/g) ?? []).length, 2);
});

test('every specimen links to existing plates and validation reports; hashes match', () => {
  for (const s of manifest.specimens) {
    assert.ok(s.plates.length && s.plates.every((p) => p in files), s.specimenId);
    assert.ok(s.validationReportRefs.every((p) => p in files), s.specimenId);
    for (const p of s.plates) assert.ok(files[p].includes(s.specimenId), `${s.specimenId} visible on ${p}`);
  }
  for (const [p, h] of Object.entries(manifest.artifactHashes)) assert.equal(sha256Hex(files[p]), h, p);
  for (const p of Object.keys(files).filter((x) => x.startsWith('plates/'))) assert.ok(files[p].includes(manifest.runId), p);
});

test('specimen identity follows canonical geometry', () => {
  const records = loadRegistry().list().map((g) => structuredClone(g));
  const a = records.find((g) => g.character === 'A');
  for (const s of a.variants[0].geometry.contours[1].segments) if ('y' in s) s.y += 1;
  a.variants[0].deliberateChanges = ['test: counter moved'];
  a.variants[0].geometryHash = sha256Hex(stableStringify(a.variants[0].geometry));
  const changed = buildProofRun({ registry: new GlyphRegistry(records, loadRegistry().meta), profile: readJson('data/validator-profiles/legacy-v06.v1.json'), fixturesContract });
  const id = (m, f) => m.specimens.find((s) => s.fixtureId === f).specimenId;
  assert.notEqual(id(changed.manifest, 'glyph-a'), id(manifest, 'glyph-a'));
  assert.notEqual(id(changed.manifest, 'word-abra'), id(manifest, 'word-abra'));
  assert.equal(id(changed.manifest, 'glyph-b'), id(manifest, 'glyph-b'), 'unrelated specimens keep their identity');
  assert.notEqual(changed.manifest.runId, manifest.runId);
});

test('generating proof sheets never changes maturity', () => {
  const registry = loadRegistry();
  const before = registry.list().map((g) => g.maturity);
  buildProofRun({ registry, profile: readJson('data/validator-profiles/legacy-v06.v1.json'), fixturesContract });
  assert.deepEqual(registry.list().map((g) => g.maturity), before);
});

// ---------- review records ----------

const spA = manifest.specimens.find((s) => s.fixtureId === 'glyph-a');
const goodReview = () => ({
  ...blankReview(manifest, spA),
  reviewId: 'rev.test.1', reviewer: 'Norman', date: '2026-11-14', stage: 'semantic', decision: 'pass',
  rationale: 'Clear A; counter reads well.',
  scores: Object.fromEntries(RUBRIC.map((r) => [r.key, ['identity', 'silhouette', 'topology', 'junctions', 'thumbnail', 'renderConsistency'].includes(r.key) ? 2 : 'cannot-judge'])),
});
const codes = (r) => validateReviewRecord(r, manifest).map((d) => d.code);

test('review template exists per authored glyph and is not a valid review by itself', () => {
  const template = JSON.parse(files['review/review-template.json']);
  assert.deepEqual(template.map((t) => t.glyphId.slice(-1)), ['A', 'B', 'G', 'R', 'S']);
  assert.ok(codes(template[0]).length > 0);
});

test('a complete review validates; rubric rules are enforced', () => {
  assert.deepEqual(codes(goodReview()), []);
  let r = goodReview(); r.scores.identity = 0;
  assert.ok(codes(r).includes('REVIEW_CRITICAL_ZERO'));
  r = goodReview(); r.scores.topology = 'cannot-judge';
  assert.ok(codes(r).includes('REVIEW_PASS_NEEDS_CRITICAL_SCORES'));
  r = goodReview(); r.decision = 'needs-revision'; r.scores.junctions = 1;
  assert.ok(codes(r).includes('REVIEW_SCORE1_NEEDS_DEFECT'));
  r.defects = [{ defectId: 'def.a.1', severity: 'minor', affectedIds: ['glyph.A.component.crossbar-zone'], note: 'crossbar joins look abrupt' }];
  assert.deepEqual(codes(r), []);
  r = goodReview(); r.defects = [{ defectId: 'def.a.2', severity: 'critical', affectedIds: [], note: 'x' }];
  assert.ok(codes(r).includes('REVIEW_CRITICAL_DEFECT'));
  r = goodReview(); r.geometryHash = 'old';
  assert.ok(codes(r).includes('REVIEW_STALE_GEOMETRY'));
  r = goodReview(); r.runId = 'run.other';
  assert.ok(codes(r).includes('REVIEW_RUN_MISMATCH'));
  r = goodReview(); r.reviewer = ' ';
  assert.ok(codes(r).includes('REVIEW_REVIEWER'));
});

test('maturity is only proposed from passed reviews, never applied', () => {
  const registry = loadRegistry();
  const a = registry.getByChar('A');
  const p = proposeMaturity(a, [goodReview()]);
  assert.deepEqual([p.current, p.proposed, p.applied], ['authored-contour', 'semantic-reviewed', false]);
  assert.equal(registry.getByChar('A').maturity, 'authored-contour');
  assert.equal(proposeMaturity(a, [{ ...goodReview(), decision: 'fail' }]).proposed, null);
  assert.equal(proposeMaturity(registry.getByChar('B'), [goodReview()]).proposed, null, 'review of A does not promote B');
});
