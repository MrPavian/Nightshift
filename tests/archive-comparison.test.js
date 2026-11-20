// Letterform comparison library (spec LETTERFORM_COMPARISON_LIBRARY_SPEC_01): contract, migration, build gates.
import test from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync, existsSync } from 'node:fs';
import { buildComparison } from '../src/archive/comparison.js';
import { migrateManifest, mapVisualState, mapRights } from '../src/archive/comparison-migrate.js';
import { buildComparisonData, COMPARISON_OUT, COMPARISON_DIR } from '../tools/archive-build.mjs';
import { stableStringify } from '../src/core/stable-json.js';
import { sha256Hex } from '../src/core/sha256.js';

const read = (p) => JSON.parse(readFileSync(p, 'utf8'));
const contract = read('contracts/letterform-comparison.v1.json');
const legacyText = readFileSync(`${COMPARISON_DIR}/legacy/graffiti-reference-manifest-01.json`, 'utf8');
const legacy = JSON.parse(legacyText);
const live = Object.fromEntries(['sources', 'specimens', 'observations', 'findings'].map((k) => [k, read(`${COMPARISON_DIR}/${k}.v1.json`)]));
const codes = (r) => r.diagnostics.map((d) => d.code);

// Small, valid base for rule tests: two inspected specimens from two different sources.
function fixture() {
  const s = structuredClone(live);
  const inspected = s.specimens.specimens.filter((x) => x.visualState === 'hi_fi_image_opened_and_inspected');
  const a = inspected[0], b = s.specimens.specimens.find((x) => x.visualState === 'hi_fi_image_opened_and_inspected' && x.sourceRecordId !== a.sourceRecordId)
    ?? Object.assign(structuredClone(inspected[1]), { id: 'TEST-OTHER-001', sourceRecordId: s.sources.sources.find((x) => x.id !== a.sourceRecordId).id });
  if (!s.specimens.specimens.includes(b)) s.specimens.specimens.push(b);
  const glyph = (id, sp, letter = 'A') => ({ id, specimenId: sp.id, glyph: letter, transcriptionConfidence: 'high', legibility: 'medium', observationDe: 'Test-Beobachtung (nur Testdaten).', editorialState: 'source-checked' });
  s.observations.glyphObservations = [glyph('GLY-TEST-001', a), glyph('GLY-TEST-002', b)];
  s.findings.findings = [{ id: 'FND-TEST-001', axis: 'rounded-angular', observationIds: ['GLY-TEST-001', 'GLY-TEST-002'], findingDe: 'Test-Befund.', evidenceBasisDe: 'Zwei Testbeobachtungen.', limitationDe: 'Nur Testdaten.', confidence: 'low', generatorRelevance: 'none', relatedEntries: ['construction.letter-anatomy'], editorialState: 'source-checked' }];
  return { s, a, b };
}
const run = (s, extra = {}) => buildComparison({ contract, ...s, entryIds: ['construction.letter-anatomy'], capabilities: {}, ...extra });

test('committed comparison data is valid and up to date', () => {
  const r = buildComparisonData('de');
  assert.deepEqual(r.diagnostics.filter((d) => d.severity === 'error'), []);
  assert.ok(existsSync(COMPARISON_OUT));
  assert.equal(readFileSync(COMPARISON_OUT, 'utf8'), stableStringify(r.data, 2) + '\n', `${COMPARISON_OUT} is stale — run node tools/archive-build.mjs`);
});

test('honest counts: recomputed independently from the source files; pilot gate follows the contract thresholds', () => {
  const { data } = buildComparisonData('de');
  const specs = live.specimens.specimens, inspectedIds = new Set(specs.filter((x) => ['hi_fi_image_opened_and_inspected', 'physical_item_inspected'].includes(x.visualState)).map((x) => x.id));
  const published = (o) => ['source-checked', 'editorial-reviewed', 'approved-for-archive'].includes(o.editorialState);
  const eligible = live.observations.glyphObservations.filter((g) => published(g) && inspectedIds.has(g.specimenId));
  const sourcesOf = new Set(eligible.map((g) => specs.find((x) => x.id === g.specimenId).sourceRecordId));
  const institutionsOf = new Set([...sourcesOf].map((id) => live.sources.sources.find((x) => x.id === id).institution));
  assert.equal(data.counts.specimens, specs.length);
  assert.equal(data.counts.inspectedSpecimens, inspectedIds.size);
  assert.equal(data.counts.eligibleGlyphObservations, eligible.length);
  assert.equal(data.counts.glyphSources, sourcesOf.size);
  const gate = contract.pilotGate.glyphComparison;
  assert.equal(data.counts.glyphInstitutions, institutionsOf.size);
  assert.equal(data.pilotGate.open, eligible.length >= gate.minEligibleGlyphObservations && institutionsOf.size >= gate.minIndependentInstitutions, 'gate counts archives/platforms, not source records');
  // Every exported glyph observation sits on an inspected specimen and has German text; none comes from the migrated free text.
  for (const g of data.glyphObservations) { assert.ok(inspectedIds.has(g.specimenId), g.id); assert.ok(g.observationDe.trim(), g.id); }
  assert.deepEqual(migrateManifest(legacy).observations.glyphObservations, []);
});

test('output carries display fields only: no English research notes, no image URLs, link-only display', () => {
  const text = readFileSync(COMPARISON_OUT, 'utf8');
  const { data } = JSON.parse(text) && { data: JSON.parse(text) };
  assert.doesNotMatch(text, /"raw"|letterAnatomyNotes|whatNotToCopy|wp-content\/uploads|\.(jpe?g|png|webp)"/i);
  for (const s of data.specimens) {
    assert.equal(s.displayMode, 'link-only', s.id);
    assert.match(s.itemUrl, /^https:\/\//, s.id);
    assert.ok(data.labels.visualState[s.visualState] && data.labels.imageRights[s.imageRights], s.id);
  }
});

test('migration is deterministic, complete and keeps every original value', () => {
  const a = migrateManifest(legacy), b = migrateManifest(JSON.parse(legacyText));
  assert.equal(stableStringify(a), stableStringify(b));
  assert.equal(a.sources.sources.length, legacy.source_records.length);
  assert.equal(a.specimens.specimens.length, legacy.specimens.length);
  for (const s of legacy.specimens) {
    const m = a.specimens.specimens.find((x) => x.id === s.specimen_id);
    assert.equal(m.raw.visualReviewStatus, s.visual_review_status);
    assert.equal(m.raw.rightsStatus, s.rights_status);
    assert.equal(m.raw.visibleGlyphs, s.visible_glyphs);
  }
  assert.deepEqual(a.observations.glyphObservations, [], 'no glyph observation is derived from free text');
  const report = read(`${COMPARISON_DIR}/MIGRATION_REPORT_01.json`);
  assert.equal(report.input.sha256, sha256Hex(legacyText));
  assert.equal(Object.values(report.visualStateMapping).reduce((n, x) => n + x.count, 0), 39);
  // The NGA catalogue-description mapping is either still pending or explicitly confirmed as catalogue-only.
  const nga = Object.entries(report.visualStateMapping).filter(([k]) => /nga.catalogue.visual.description/i.test(k));
  assert.ok(nga.length >= 1);
  for (const [k, v] of nga) {
    assert.equal(v.to, 'catalogue_metadata_only', k);
    const pending = report.needsConfirmation.includes(k);
    const confirmed = (report.confirmedMappings ?? []).some((c) => c.target === 'catalogue_metadata_only' && c.status === 'confirmed' && /nga catalogue visual description/i.test(c.source));
    assert.ok(pending || confirmed, `${k}: pending or confirmed`);
  }
});

test('status and rights mapping: every spelling is mapped; unknown spellings fail loudly', () => {
  for (const s of legacy.specimens) { assert.ok(contract.enums.visualState.includes(mapVisualState(s.visual_review_status))); assert.ok(contract.enums.imageRights.includes(mapRights(s.rights_status))); }
  assert.throws(() => mapVisualState('looked at it'));
  assert.throws(() => mapRights('free to use'));
});

test('a valid glyph pair and finding build; the pilot gate counts them', () => {
  const { s } = fixture();
  const r = run(s);
  assert.deepEqual(codes(r), []);
  assert.equal(r.data.counts.eligibleGlyphObservations, 2);
  assert.equal(r.data.findings.length, 1);
  assert.equal(r.data.pilotGate.open, false);
});

test('glyph eligibility gate: not inspected, not A–Z, or low confidence is rejected', () => {
  const meta = live.specimens.specimens.find((x) => x.visualState === 'catalogue_metadata_only');
  for (const [mut, label] of [[(g) => { g.specimenId = meta.id; }, 'catalogue only'], [(g) => { g.glyph = 'Ä'; }, 'not A–Z'], [(g) => { g.legibility = 'low'; }, 'low legibility'], [(g) => { g.transcriptionConfidence = 'low'; }, 'low transcription']]) {
    const { s } = fixture();
    mut(s.observations.glyphObservations[0]);
    assert.ok(codes(run(s)).includes('CMP_GLYPH_NOT_ELIGIBLE'), label);
  }
});

test('a draft glyph observation may be parked on a non-eligible specimen; publishing it there fails', () => {
  const meta = live.specimens.specimens.find((x) => x.visualState === 'catalogue_metadata_only');
  const { s } = fixture();
  Object.assign(s.observations.glyphObservations[0], { specimenId: meta.id, editorialState: 'draft' });
  s.findings.findings = [];
  const r = run(s);
  assert.ok(!codes(r).includes('CMP_GLYPH_NOT_ELIGIBLE'), 'draft is allowed');
  assert.ok(!r.data.glyphObservations.some((g) => g.id === 'GLY-TEST-001'), 'draft is not exported');
  s.observations.glyphObservations[0].editorialState = 'source-checked';
  assert.ok(codes(run(s)).includes('CMP_GLYPH_NOT_ELIGIBLE'), 'published fails');
});

test('a finding needs two observations from two independent sources', () => {
  const { s, a } = fixture();
  s.observations.glyphObservations[1].specimenId = a.id;
  assert.ok(codes(run(s)).includes('CMP_NOT_INDEPENDENT'));
  const { s: s2 } = fixture();
  s2.findings.findings[0].observationIds = ['GLY-TEST-001'];
  assert.ok(codes(run(s2)).includes('CMP_NOT_INDEPENDENT'));
});

test('published records need German text; drafts are not exported', () => {
  const { s } = fixture();
  delete s.observations.glyphObservations[0].observationDe;
  assert.ok(codes(run(s)).includes('CMP_GERMAN_TEXT'));
  const { s: s2 } = fixture();
  s2.observations.glyphObservations[0].editorialState = 'draft';
  const r = run(s2);
  assert.ok(!r.data.glyphObservations.some((g) => g.id === 'GLY-TEST-001'), 'draft not exported');
});

test('rights: image file URLs and embedding without clearance are rejected', () => {
  const { s } = fixture();
  s.specimens.specimens[0].itemUrl = 'https://example.org/wp-content/uploads/2026/10/piece.jpg';
  assert.ok(codes(run(s)).includes('CMP_BAD_URL'));
  const { s: s2 } = fixture();
  s2.specimens.specimens[0].displayMode = 'embed-permitted';
  assert.ok(codes(run(s2)).includes('CMP_RIGHTS'));
});

test('links and capabilities: dead archive links and unavailable generator capabilities are rejected', () => {
  const { s } = fixture();
  s.findings.findings[0].relatedEntries = ['construction.does-not-exist'];
  assert.ok(codes(run(s)).includes('CMP_DEAD_LINK'));
  const { s: s2 } = fixture();
  Object.assign(s2.findings.findings[0], { generatorRelevance: 'validated-capability', capability: 'study.glyph-anatomy' });
  assert.ok(codes(run(s2, { capabilities: { 'study.glyph-anatomy': { status: 'unavailable' } } })).includes('CMP_CAPABILITY'));
  assert.ok(!codes(run(s2, { capabilities: { 'study.glyph-anatomy': { status: 'available' } } })).includes('CMP_CAPABILITY'));
});

test('structure: duplicate IDs, unknown sources and bad enums are rejected', () => {
  const { s } = fixture();
  s.specimens.specimens.push(structuredClone(s.specimens.specimens[0]));
  assert.ok(codes(run(s)).includes('CMP_DUPLICATE_ID'));
  const { s: s2 } = fixture();
  s2.specimens.specimens[0].sourceRecordId = 'ACQ-NOPE-01';
  assert.ok(codes(run(s2)).includes('CMP_UNKNOWN_SOURCE'));
  const { s: s3 } = fixture();
  s3.specimens.specimens[0].visualState = 'looked-at';
  assert.ok(codes(run(s3)).includes('CMP_BAD_ENUM'));
});

test('archive app: comparison routes exist, data is cached offline, no image elements are generated', () => {
  const app = readFileSync('archive/app.js', 'utf8'), cmp = readFileSync('archive/comparison.js', 'utf8'), sw = readFileSync('archive/sw.js', 'utf8');
  assert.match(app, /case 'vergleich'/);
  assert.match(sw, /comparison\.v1\.de\.json/);
  assert.match(sw, /'comparison\.js'/);
  assert.doesNotMatch(cmp, /<img\b/);
  assert.match(cmp, /Originalquelle öffnen/);
});

// ---- Gate 3: glyph and construction comparison views ----
const { comparisonViews } = await import('../archive/comparison.js');
const esc = (s) => String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');
const views = (C) => comparisonViews(C, { esc, norm: (s) => String(s).toLowerCase(), crumbs: () => '' });
const committed = read(COMPARISON_OUT);
const cards = (html) => [...html.matchAll(/data-obs="([^"]+)"/g)].map((m) => m[1]);

test('feature tags: the README list is labelled in German; unlisted tags are exported but reported as warnings', () => {
  const L = committed.labels;
  for (const [, tags] of L.glyphFeatureGroups) for (const t of tags) assert.ok(L.glyphFeature[t], t);
  const r = buildComparisonData('de');
  const unlisted = committed.glyphObservations.flatMap((g) => g.features.filter((t) => !L.glyphFeature[t]).map((t) => `${g.id}:${t}`));
  assert.deepEqual(r.diagnostics.filter((d) => d.code === 'CMP_UNLISTED_FEATURE').map((d) => `${d.where}:${d.message.split(' ')[2]}`).sort(), unlisted.sort());
  assert.ok(r.diagnostics.filter((d) => d.code === 'CMP_UNLISTED_FEATURE').every((d) => d.severity === 'warning'));
  assert.ok(r.ok);
});

test('letter view shows exactly the eligible observations of that letter; selection ignores foreign IDs', () => {
  const V = views(committed);
  for (const c of 'ABCDEFGHIJKLMNOPQRSTUVWXYZ') {
    const expected = committed.glyphObservations.filter((g) => g.glyph === c).map((g) => g.id).sort();
    const v = V.letter(c, new URLSearchParams());
    assert.deepEqual(cards(v.html).sort(), expected, c);
    assert.doesNotMatch(v.html, /<img\b/, c);
  }
  const x = committed.glyphObservations.filter((g) => g.glyph === 'X').map((g) => g.id);
  const other = committed.glyphObservations.find((g) => g.glyph !== 'X').id;
  const sel = V.letter('X', new URLSearchParams({ auswahl: [x[0], x[1], other].join(',') })).html;
  const compared = cards(sel.split('Weitere Beobachtungen')[0]);
  assert.deepEqual(compared.sort(), [x[0], x[1]].sort(), 'only the two X observations are compared');
  assert.ok(!cards(sel).includes(other));
  assert.match(sel, /Gegenüberstellung: 2 Beobachtungen/);
  assert.match(sel, /derselben Plattform/, 'same-platform selection is flagged as not independent');
  assert.equal(V.letter('1', new URLSearchParams()), null);
});

test('letter view: direct observations and findings stay separate; findings carry basis and limits', () => {
  const f = committed.findings[0];
  const g = committed.glyphObservations.find((o) => o.id === f.observationIds[0]).glyph;
  const html = V3().letter(g, new URLSearchParams()).html;
  const [direct, interp] = html.split('Deutung über mehrere Objekte');
  assert.ok(interp, 'finding section present');
  assert.ok(!direct.includes(esc(f.findingDe)), 'finding text is not mixed into the observation cards');
  for (const k of ['findingDe', 'evidenceBasisDe', 'limitationDe']) assert.ok(interp.includes(esc(f[k])), k);
});
const V3 = () => views(committed);

test('feature view lists every observation with that tag; unknown tags are missing', () => {
  const V = V3();
  const tags = [...new Set(committed.glyphObservations.flatMap((g) => g.features))];
  for (const t of tags) {
    const expected = committed.glyphObservations.filter((g) => g.features.includes(t)).map((g) => g.id).sort();
    assert.deepEqual(cards(V.feature(t).html).sort(), expected, t);
  }
  assert.equal(V.feature('gibt-es-nicht'), null);
});

test('with the pilot gate closed, letter and feature views show the gate message and no observation cards', () => {
  const closed = structuredClone(committed);
  closed.pilotGate.open = false;
  const V = views(closed);
  const l = V.letter('X', new URLSearchParams()).html, f = V.feature('angular').html, land = V.landing().html;
  for (const h of [l, f, land]) { assert.match(h, /Forschungsansicht im Aufbau/); assert.equal(cards(h).length, 0); }
  assert.doesNotMatch(land, /#\/vergleich\/buchstabe\//);
});
