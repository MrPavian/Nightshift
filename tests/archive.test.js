// C06 — THE BLACKBOOK ARCHIVE: content pipeline, editorial rules and editor-bridge contract.
import test from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync, existsSync } from 'node:fs';
import { build, readResearch, OUT } from '../tools/archive-build.mjs';
import { buildArchive } from '../src/archive/build.js';
import { DIAGRAM_IDS } from '../src/archive/diagrams.js';
import { parseClaimsTable, inlineRefs, parseFrontMatter } from '../src/archive/parse.js';
import { stableStringify } from '../src/core/stable-json.js';
import { loadRegistry } from '../src/glyph/load-node.js';
import { BRIDGE_VERSION, BRIDGE_CAPABILITIES, BRIDGE_GLYPHS, bridgeHref, readBridgeRequest, validateBridgeParams, archiveReturnHref } from '../src/bridge/editor-bridge.js';

const result = build();
const A = result.data;
const byId = new Map(A.entries.map((e) => [e.id, e]));
const allText = (e) => [e.title, e.summary, ...Object.values(e.sections), ...e.distinctions.map((d) => `${d.label} ${d.text}`)].join('\n');

/** Rebuild with one research file changed, to test that the validator rejects bad content. */
function buildWith(path, edit) {
  const files = readResearch().map((f) => (f.path === path ? { ...f, text: edit(f.text) } : f));
  return buildArchive({ files, diagrams: DIAGRAM_IDS });
}
const codes = (r) => r.diagnostics.map((d) => d.code);

// ---------- pipeline ----------
test('archive builds from the research library without diagnostics', () => {
  assert.equal(result.ok, true);
  assert.deepEqual(result.diagnostics, []);
});

test('committed archive data is exactly the build output (no hand-maintained copy)', () => {
  assert.equal(readFileSync(OUT, 'utf8'), stableStringify(A, 2) + '\n');
  for (const { path, sha256 } of A.generatedFrom) assert.match(sha256, /^[0-9a-f]{64}$/, path);
  assert.ok(A.generatedFrom.some((g) => g.path.startsWith('research/archive/de/entries/')));
  assert.equal(A.language, 'de');
});

test('build is deterministic', () => {
  assert.equal(stableStringify(build().data), stableStringify(A));
});

// ---------- scope and coverage ----------
test('launch edition has 25–35 entries across content types', () => {
  assert.ok(A.entries.length >= 25 && A.entries.length <= 35, `${A.entries.length} entries`);
  const types = new Set(A.entries.map((e) => e.type));
  for (const t of ['history', 'scene', 'practice', 'style', 'format', 'media', 'object', 'person', 'construction', 'concept']) assert.ok(types.has(t), `missing type ${t}`);
});

test('substantial New York foundation plus contrasting international scenes', () => {
  const claimsOf = (e) => e.claimIds.map((id) => A.claims.find((c) => c.id === id));
  const nyc = A.entries.filter((e) => e.regions?.includes('New York City') || claimsOf(e).some((c) => c.ledger.length || c.sources.some((s) => /^(NYC_|SOURCE_REGISTER_NYC)/.test(s))));
  assert.ok(nyc.length >= 10, `NYC foundation entries: ${nyc.length}`);
  const intl = A.entries.filter((e) => e.type === 'scene' && !e.regions?.some((r) => ['New York City', 'Philadelphia'].includes(r)));
  assert.ok(intl.length >= 5, `international scenes: ${intl.length}`);
  for (const id of ['scene.philadelphia', 'scene.amsterdam', 'scene.paris-banlieue', 'scene.sao-paulo', 'scene.china', 'scene.dortmund', 'scene.hamburg']) assert.ok(byId.has(id), id);
});

test('modern writing is not presented as the origin of all graffiti, nor scenes as copies', () => {
  const text = A.entries.map(allText).join('\n').toLowerCase();
  for (const bad of ['geburtsort des graffiti', 'graffiti wurde in new york erfunden', 'erfand graffiti', 'kopierten new york']) assert.ok(!text.includes(bad), bad);
  assert.ok(byId.get('concept.public-inscription'), 'older public inscription has its own entry');
  assert.ok(byId.get('history.modern-name-writing').related.includes('scene.philadelphia'));
  assert.ok(byId.get('history.global-circulation').aliases.some((a) => /export|diffusion/i.test(a)), 'circulation entry captures the “export” misconception as a searchable alias');
});

test('women are integrated into the main history, not isolated', () => {
  const lp = 'person.lady-pink';
  const linkers = A.entries.filter((e) => e.id !== lp && (e.related.includes(lp) || e.inlineLinks.includes(lp))).map((e) => e.id);
  assert.ok(linkers.includes('history.modern-name-writing'), 'core NYC chapter links to Lady Pink');
  assert.ok(linkers.length >= 3, linkers.join(', '));
  assert.ok(A.timeline.some((ev) => ev.entry === lp));
  assert.ok(A.paths.some((p) => p.steps.some((s) => s.entry === lp)));
  assert.ok(allText(byId.get('scene.china')).includes('China Graffiti Girls'), 'women appear inside scene chapters too');
});

// ---------- evidence ----------
test('every claim is sourced; sources resolve; project documents only back inferences', () => {
  const sources = new Set(A.sources.map((s) => s.id));
  for (const c of A.claims) {
    assert.ok(c.sources.length || c.matrix.length, c.id);
    for (const s of c.sources) {
      if (s.startsWith('doc:')) {
        assert.ok(existsSync(s.slice(4)), s);
        assert.ok(['editorial-synthesis', 'nightshift-design-inference'].includes(c.kind), `${c.id} uses ${s}`);
      } else assert.ok(sources.has(s), `${c.id} → ${s}`);
    }
  }
});

test('every inline reference in entry text resolves to a claim', () => {
  const ids = new Set(A.claims.map((c) => c.id));
  for (const e of A.entries) {
    const refs = inlineRefs(allText(e)).claims;
    assert.ok(refs.length, `${e.id} cites nothing in its text`);
    for (const r of refs) assert.ok(ids.has(/^c\d+$/.test(r) ? `${e.id}#${r}` : r), `${e.id}: ${r}`);
  }
});

test('evidence, editorial status and image rights are separate fields with honest values', () => {
  for (const e of A.entries) {
    assert.ok(A.taxonomy.evidence.includes(e.evidence));
    assert.ok(A.taxonomy.editorialStatus.includes(e.editorialStatus));
    assert.ok(A.taxonomy.imageRights.includes(e.imageRights));
    assert.notEqual(e.editorialStatus, 'approved-for-archive', 'owner approval has not happened yet');
    assert.equal(e.imageRights === 'original-diagram', (e.diagrams ?? []).length > 0, `${e.id}: rights must match diagrams`);
  }
  for (const c of A.claims) assert.notEqual(c.evidence, 'unverified-lead', c.id);
});

test('no placeholders, no embedded third-party images', () => {
  for (const e of A.entries) {
    const t = allText(e);
    assert.doesNotMatch(t, /\b(TODO|TBD|lorem|FIXME)\b/i, e.id);
    assert.doesNotMatch(t, /<img|!\[|\.(jpe?g|png|gif|webp)\b/i, e.id);
  }
  const app = readFileSync('archive/app.js', 'utf8') + readFileSync('archive/index.html', 'utf8');
  assert.doesNotMatch(app, /<img/i);
});

test('diagrams are original SVG with accessible names and page-unique ids', () => {
  const seen = new Set();
  assert.deepEqual(Object.keys(A.diagrams).sort(), [...DIAGRAM_IDS].sort());
  for (const [id, svg] of Object.entries(A.diagrams)) {
    assert.match(svg, /^<svg [^>]*role="img"[^>]*aria-labelledby="[^"]+"/, id);
    assert.match(svg, /<title id="[^"]+">[^<]+<\/title><desc id="[^"]+">[^<]+<\/desc>/, id);
    assert.doesNotMatch(svg, /<image|href="http/i, id);
    for (const [, x] of svg.matchAll(/ id="([^"]+)"/g)) { assert.ok(!seen.has(x), `duplicate id ${x}`); seen.add(x); }
  }
});

// ---------- navigation ----------
test('no dead ends: links resolve, every entry is reachable and links onward', () => {
  for (const e of A.entries) {
    assert.ok(e.related.length >= 1, `${e.id} has no related entries`);
    for (const r of [...e.related, ...e.inlineLinks, ...e.distinctions.map((d) => d.target).filter(Boolean)]) assert.ok(byId.has(r), `${e.id} → ${r}`);
  }
  const incoming = new Set([...A.entries.flatMap((e) => [...e.related, ...e.inlineLinks]), ...A.paths.flatMap((p) => p.steps.map((s) => s.entry)), ...A.timeline.map((t) => t.entry)]);
  for (const e of A.entries) assert.ok(incoming.has(e.id), `${e.id} is unreachable`);
});

test('timeline is sorted, sourced and points at entries; learning paths are usable', () => {
  assert.ok(A.timeline.length >= 12);
  const claimIds = new Set(A.claims.map((c) => c.id));
  for (let i = 1; i < A.timeline.length; i++) assert.ok(A.timeline[i - 1].sort <= A.timeline[i].sort);
  for (const ev of A.timeline) {
    assert.ok(byId.has(ev.entry), ev.id);
    assert.ok(ev.claims.length && ev.claims.every((c) => claimIds.has(c)), ev.id);
    assert.ok(['documented', 'approximate', 'contested'].includes(ev.certainty), ev.id);
  }
  assert.ok(A.paths.length >= 2);
  for (const p of A.paths) {
    assert.ok(p.steps.length >= 3 && p.intro, p.id);
    for (const s of p.steps) assert.ok(byId.has(s.entry) && s.framing, `${p.id} → ${s.entry}`);
  }
});

test('search aliases cover practitioner terms and alternative spellings', () => {
  const aliases = new Map(A.entries.flatMap((e) => (e.aliases ?? []).map((a) => [a.toLowerCase(), e.id])));
  assert.equal(aliases.get('pichação'), 'scene.sao-paulo');
  assert.equal(aliases.get('black book'), 'object.blackbook');
  assert.equal(aliases.get('dortmunder style'), 'style.dortmund-style');
  assert.equal(aliases.get('wicked'), 'scene.philadelphia');
  assert.equal(aliases.get('punze'), 'construction.negative-space');
});

// ---------- validator rejects bad content ----------
const ENTRY = 'research/archive/de/entries/practice.tag.md';
test('validator rejects an unsourced claim, an unknown source and a dead link', () => {
  assert.ok(codes(buildWith(ENTRY, (t) => t.replace(/\| c1 \| scholarly-interpretation \| strong \| [^|]+\|/, '| c1 | scholarly-interpretation | strong |  |'))).includes('ARC_UNSOURCED_CLAIM'));
  assert.ok(codes(buildWith(ENTRY, (t) => t.replace('NYC_MODERN_WRITING_EMERGENCE_CLAIM_LEDGER_01#S3', 'NYC_MODERN_WRITING_EMERGENCE_CLAIM_LEDGER_01#S99'))).includes('ARC_UNKNOWN_SOURCE'));
  assert.ok(codes(buildWith(ENTRY, (t) => t.replace('[[practice.handstyle|Handstyle]]', '[[practice.nonexistent|Handstyle]]'))).includes('ARC_DEAD_LINK'));
});

test('validator rejects leads in published entries, placeholders and doc-sourced facts', () => {
  assert.ok(codes(buildWith(ENTRY, (t) => t.replace('| c1 | scholarly-interpretation | strong |', '| c1 | scholarly-interpretation | unverified-lead |'))).includes('ARC_LEAD_PUBLISHED'));
  assert.ok(codes(buildWith(ENTRY, (t) => t.replace('## Woran man es erkennt\n', '## Woran man es erkennt\n\nTODO ausformulieren.\n'))).includes('ARC_PLACEHOLDER'));
  assert.ok(codes(buildWith(ENTRY, (t) => t.replace('| c2 | editorial-synthesis |', '| c2 | documented-fact |'))).includes('ARC_DOC_SOURCE_KIND'));
});

test('validator rejects unknown editor capabilities and parameters the editor cannot open', () => {
  assert.ok(codes(buildWith(ENTRY, (t) => t.replace('generator: study.word-layout word=ABRA', 'generator: editor.magic-button'))).includes('ARC_UNKNOWN_CAPABILITY'));
  assert.ok(codes(buildWith(ENTRY, (t) => t.replace('generator: study.word-layout word=ABRA', 'generator: editor.contour-node-edit glyph=Z'))).includes('ARC_BRIDGE_PARAMS'));
});

test('German edition: every entry uses German section headings and the UI renders every parsed section', () => {
  for (const e of A.entries) assert.ok(e.sections.introduction, e.id);
  for (const f of readResearch().filter((x) => x.path.startsWith('research/archive/de/entries/'))) {
    assert.doesNotMatch(f.text, /^## (Introduction|Why it matters|How to recognize it|Claims|Not the same as)$/m, f.path);
    assert.match(f.text, /^## Belege$/m, f.path);
  }
  const app = readFileSync('archive/app.js', 'utf8');
  const keys = new Set(A.entries.flatMap((e) => Object.keys(e.sections)));
  for (const k of keys) assert.match(app, new RegExp(`\\['${k}', '`), `UI does not render section ${k}`);
  assert.doesNotMatch(app, /lang="en"/, 'no English-marked content in the German edition');
});

test('ledger claims are cited through German entry claims, never inline', () => {
  const withLedger = A.claims.filter((c) => c.ledger.length);
  assert.ok(withLedger.length >= 10);
  for (const c of withLedger) for (const l of c.ledger) assert.match(l.id, /^NYC-\d{3}$/);
  assert.ok(!A.claims.some((c) => c.ledger.some((l) => l.id === 'NYC-011')), 'NYC-011 has no evidence-use source');
  assert.ok(codes(buildWith(ENTRY, (t) => t.replace('[c3]', '[NYC-005]'))).includes('ARC_INLINE_LEDGER'));
});

test('claims are tied to the central claim/source matrix and the Dortmund audit; registers stay authoritative', () => {
  const linked = A.claims.filter((c) => c.matrix.length);
  assert.ok(linked.length >= 40, `${linked.length} register-linked claims`);
  const files = new Set(linked.flatMap((c) => c.matrix.map((m) => m.file)));
  assert.ok(files.has('research/BLACKBOOK_ARCHIVE_CLAIM_SOURCE_MATRIX_01.md') && files.has('research/DORTMUND_1983_1991_SOURCE_AUDIT_01.md'));
  for (const c of linked) for (const m of c.matrix) assert.ok(m.mainSource && /^([A-D]|—)/.test(m.strength), `${c.id} ${m.id}`); // "—" marks a methodological statement without a grade
  for (const id of ['style.wildstyle', 'technique.aerosol-system', 'practice.getting-up']) assert.equal(byId.get(id).editorialStatus, 'draft', `${id} comes from a draft and stays a draft`);
  assert.ok(codes(buildWith(ENTRY, (t) => t.replace('| c1 | scholarly-interpretation | strong | NYC_MODERN_WRITING_EMERGENCE_CLAIM_LEDGER_01#S3', '| c1 | scholarly-interpretation | strong | matrix:XYZ-99'))).includes('ARC_UNKNOWN_MATRIX_CLAIM'));
  assert.ok(codes(buildWith('research/BLACKBOOK_ARCHIVE_CLAIM_SOURCE_MATRIX_01.md', (t) => t.replace(/\| TAG-04 \|([^|]+)\|([^|]+)\| B \|/, '| TAG-04 |$1|$2| D |'))).includes('ARC_LEAD_PUBLISHED'), 'a D-graded register claim cannot back a published entry');
});

test('parsers read claim tables, inline references and front matter', () => {
  const rows = parseClaimsTable('| id | kind | evidence | sources | claim |\n|---|---|---|---|---|\n| c1 | practitioner-account | good | A#S1; B#S2 | Text with | no split? |');
  assert.equal(rows[0].localId, 'c1');
  assert.deepEqual(rows[0].sources, ['A#S1', 'B#S2']);
  assert.deepEqual(inlineRefs('x [c1; NYC-002] y [[a.b|label]]').claims, ['c1', 'NYC-002']);
  assert.deepEqual(parseFrontMatter('---\nid: a.b\naliases: x; y\n---\n# T').data.aliases, ['x', 'y']);
});

// ---------- editor bridge contract ----------
test('bridge contract is versioned and only exposes capabilities that exist', () => {
  assert.match(BRIDGE_VERSION, /^\d+\.\d+\.\d+$/);
  assert.equal(A.bridge.version, BRIDGE_VERSION);
  const editor = readFileSync('editor/editor.js', 'utf8'), review = readFileSync('review/app.js', 'utf8');
  // The editor derives its editable glyphs from the registry (fully-editable masters);
  // every glyph the bridge can link to must be one of them.
  assert.match(editor, /EDITABLE = registry\.list\(\)\.filter\(\(g\) => g\.variants\[0\]\.geometry\.editability === 'fully-editable'\)/);
  const editable = loadRegistry().list().filter((g) => g.variants[0].geometry.editability === 'fully-editable').map((g) => g.character);
  for (const c of BRIDGE_GLYPHS) assert.ok(editable.includes(c), `bridge glyph ${c} is editable in the editor`);
  for (const [id, c] of Object.entries(BRIDGE_CAPABILITIES)) {
    if (c.status === 'available') {
      assert.ok(['review', 'editor'].includes(c.page), id);
      assert.match(c.page === 'editor' ? editor : review, /readBridgeRequest\(location\.search, '(review|editor)'\)/, `${id}: receiver missing`);
    } else {
      assert.equal(c.status, 'unavailable', id);
      assert.match(c.after, /^C0[3-5]$/, id);
      assert.ok(c.reasonDe && c.reason, id);
    }
  }
  if (/data-tab="(\w+)"/.test(readFileSync('review/index.html', 'utf8'))) for (const t of ['live', 'word', 'plates']) assert.match(readFileSync('review/index.html', 'utf8'), new RegExp(`data-tab="${t}"`));
});

test('every active archive link targets a verified capability; future ones stay unavailable', () => {
  let active = 0;
  for (const e of A.entries) for (const g of e.generatorLinks) {
    const cap = BRIDGE_CAPABILITIES[g.capability];
    assert.equal(g.available, cap.status === 'available', `${e.id} ${g.capability}`);
    if (g.available) { active++; assert.ok(bridgeHref(g.capability, g.params, { from: e.id }), `${e.id} ${g.capability}`); }
  }
  assert.ok(active >= 3, `${active} active links`);
  assert.ok(A.entries.some((e) => e.generatorLinks.some((g) => !g.available)), 'at least one honest unavailable link is shown');
  for (const id of Object.keys(BRIDGE_CAPABILITIES)) assert.deepEqual(A.bridge.capabilities[id].linkedFrom, A.entries.filter((e) => e.generatorLinks.some((g) => g.capability === id)).map((e) => e.id).sort());
});

test('bridge links round-trip and receivers reject malformed requests', () => {
  const href = bridgeHref('study.glyph-anatomy', { glyph: 'B' }, { from: 'construction.letter-anatomy', base: '' });
  assert.equal(href, 'review/index.html?bv=1&cap=study.glyph-anatomy&glyph=B&tab=live&diag=1&from=construction.letter-anatomy');
  assert.deepEqual(readBridgeRequest(href.split('?')[1], 'review'), { capability: 'study.glyph-anatomy', glyph: 'B', tab: 'live', diag: true, from: 'construction.letter-anatomy' });
  assert.equal(readBridgeRequest(href.split('?')[1], 'editor'), null, 'wrong page');
  assert.equal(readBridgeRequest(href.split('?')[1].replace('bv=1', 'bv=2'), 'review'), null, 'unknown major version');
  assert.equal(readBridgeRequest('bv=1&cap=grammar.style-comparison', 'review'), null, 'unavailable capability');
  const evil = readBridgeRequest('bv=1&cap=editor.contour-node-edit&glyph=<x>&from=javascript:alert(1)', 'editor');
  assert.deepEqual(evil, { capability: 'editor.contour-node-edit' });
  assert.equal(bridgeHref('editor.contour-node-edit', { glyph: 'Z' }), null);
  assert.equal(bridgeHref('grammar.style-comparison', {}), null);
  assert.equal(bridgeHref('study.word-layout', { word: 'abc' }), null);
  assert.equal(validateBridgeParams('study.proof-sheets', { extra: '1' }).ok, false);
  assert.equal(archiveReturnHref('scene.paris'), '../archive/index.html#/entry/scene.paris');
  assert.equal(archiveReturnHref('../../etc'), '../archive/index.html');
});

// ---------- offline package ----------
test('offline cache lists only files that exist, including fonts and data', () => {
  const sw = readFileSync('archive/sw.js', 'utf8');
  const files = JSON.parse(sw.match(/const FILES = (\[[\s\S]*?\]);/)[1].replace(/'/g, '"').replace(/,\s*\]/, ']'));
  assert.ok(files.includes('../data/archive/archive.v1.de.json'));
  for (const f of files) assert.ok(existsSync(`archive/${f}`), f);
  assert.ok(existsSync('archive/fonts/OFL.txt'), 'font licence is shipped');
  // After a deploy the browser's HTTP cache must not hand out an old app.js through the worker.
  assert.match(sw, /fetch\(e\.request, \{ cache: 'no-cache' \}\)/);
  assert.match(sw, /new Request\(f, \{ cache: 'no-cache' \}\)/);
});

test('committed C06 proof passed and is tied to the current archive inputs', async () => {
  const { createHash } = await import('node:crypto');
  const m = JSON.parse(readFileSync('docs/reports/proof/C06/manifest.json', 'utf8'));
  assert.equal(m.result, 'pass');
  assert.ok(m.bridgeTargets >= 4 && m.claimSheets === A.entries.length);
  for (const [p, h] of Object.entries(m.inputs)) assert.equal(createHash('sha256').update(readFileSync(p)).digest('hex'), h, `${p} changed since the proof run`);
  for (const [f, h] of Object.entries(m.screenshots)) assert.equal(createHash('sha256').update(readFileSync(`docs/reports/proof/C06/${f}`)).digest('hex'), h, f);
});

test('UI follows the design system: tokens, nine sections, independent status vocabulary, no per-type colours', () => {
  const css = readFileSync('archive/app.css', 'utf8'), app = readFileSync('archive/app.js', 'utf8'), html = readFileSync('archive/index.html', 'utf8');
  for (const [t, v] of [['--bba-bg', '#111214'], ['--bba-text', '#f0eee8'], ['--bba-accent', '#d6f34a'], ['--bba-border', '#41454a']]) assert.match(css, new RegExp(`${t}: ${v};`), t);
  assert.doesNotMatch(css, /--t-(history|scene|practice|style)/, 'no per-type colour tokens (styleguide §2.1)');
  const navs = [...html.matchAll(/data-nav="([a-z]+)"/g)].map((m) => m[1]);
  assert.deepEqual(navs, ['entdecken', 'zeitleiste', 'szenen', 'stile', 'praxis', 'material', 'personen', 'glossar', 'bildarchiv']);
  for (const w of ['Entwurf', 'in Prüfung', 'freigegeben', 'zurückgezogen', 'ungeklärt', 'Link-only', 'lizenziert', 'eigene Produktion', 'gesperrt', 'teilweise geprüft']) assert.ok(app.includes(`'${w}`), w);
  for (const t of A.entries.map((e) => e.type)) assert.match(app, new RegExp(`types: \\[[^\\]]*'${t}'`), `type ${t} has a navigation section`);
});

test('text colour pairs meet WCAG 2.2 AA contrast (design system §9)', () => {
  const css = readFileSync('archive/app.css', 'utf8');
  const tok = (n) => css.match(new RegExp(`--${n}: (#[0-9a-f]{6});`))[1];
  const lum = (hex) => {
    const c = [1, 3, 5].map((i) => parseInt(hex.slice(i, i + 2), 16) / 255).map((v) => (v <= 0.03928 ? v / 12.92 : ((v + 0.055) / 1.055) ** 2.4));
    return 0.2126 * c[0] + 0.7152 * c[1] + 0.0722 * c[2];
  };
  const ratio = (a, b) => { const [x, y] = [lum(tok(a)), lum(tok(b))].sort((p, q) => q - p); return (x + 0.05) / (y + 0.05); };
  const pairs = [['bba-text', 'bba-bg', 4.5], ['bba-text-muted', 'bba-bg', 4.5], ['bba-text-subtle', 'bba-bg', 4.5], ['bba-text-muted', 'bba-surface', 4.5],
    ['bba-text-subtle', 'bba-surface', 4.5], ['paper-ink', 'paper', 4.5], ['paper-muted', 'paper', 4.5], ['bba-bg', 'bba-accent', 4.5], ['bba-accent', 'bba-bg', 3]];
  for (const [fg, bg, min] of pairs) assert.ok(ratio(fg, bg) >= min, `${fg} on ${bg}: ${ratio(fg, bg).toFixed(2)} < ${min}`);
});
