// C03 proof: every letter A–Z in each style preset, monochrome, plus the resolver report.
//   node tools/proof-styles.mjs [outDir]
// Writes style-grammar-A-Z.svg, style-word-fixtures.svg and resolver-report.json.
import { readFileSync, writeFileSync, mkdirSync } from 'node:fs';
import { loadRegistry } from '../src/glyph/load-node.js';
import { validateGlyphGeometry } from '../src/glyph/validate-geometry.js';
import { buildRenderModel } from '../src/render/render-model.js';
import { glyphGroup } from '../src/render/svg.js';
import { resolveStyle, RESOLVER_VERSION } from '../src/style/resolver.js';
import { paintGlyph, layoutWord } from '../src/style/render.js';

const out = process.argv[2] ?? 'docs/reports/proof/C03';
mkdirSync(out, { recursive: true });
const contract = JSON.parse(readFileSync('contracts/style-resolver.v1.json', 'utf8'));
const profile = JSON.parse(readFileSync('data/validator-profiles/legacy-v06.v1.json', 'utf8'));
const registry = loadRegistry();
const PRESETS = ['neutral', 'straight', 'bubble', 'blockbuster', 'wildstyle'];
const f2 = (n) => Math.round(n * 100) / 100;
const esc = (s) => String(s).replace(/[&<>"]/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' })[c]);

const results = {};
for (const p of PRESETS) for (const g of registry.list()) results[`${p}:${g.character}`] = resolveStyle(g, p, { contract, profile });
const model = (g, res) => { const rec = res.derived ?? g; return buildRenderModel(rec, validateGlyphGeometry(rec, profile)); };
const advance = (g, res) => { const rec = res.derived ?? g; const xs = rec.variants[0].geometry.contours.flatMap((c) => c.segments.filter((s) => s.type !== 'close').map((s) => s.x)); return { x0: Math.min(...xs), x1: Math.max(...xs) }; };

// ---- sheet A–Z ----
const cell = 70, scale = 0.42, left = 175, top = 70, rowH = 92;
const W = left + 26 * cell + 20, H = top + PRESETS.length * rowH + 80;
let svg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${W} ${H}" width="${W}" height="${H}" font-family="system-ui, sans-serif"><rect width="100%" height="100%" fill="#fff"/>`;
svg += `<text x="20" y="34" font-size="20" font-weight="700">C03 Stilgrammatik: Großbuchstaben A–Z, monochrom</text><text x="20" y="56" font-size="13" fill="#555">${esc(RESOLVER_VERSION)} · Zeichen = Status: ✓ angewendet, = unverändert, ½ teilweise, ↺ neutrale Rückfallform</text>`;
const mark = { applied: '✓', unchanged: '=', partial: '½', fallback: '↺' };
PRESETS.forEach((p, ri) => {
  const y = top + ri * rowH;
  svg += `<text x="20" y="${y + 40}" font-size="15" font-weight="700">${esc(contract.presets[p].labelDe)}</text><text x="20" y="${y + 58}" font-size="11" fill="#555">${esc(contract.presets[p].letterform)} + ${esc(contract.presets[p].composition)}</text>`;
  registry.list().forEach((g, ci) => {
    const res = results[`${p}:${g.character}`], m = model(g, res);
    const x = left + ci * cell;
    svg += glyphGroup(m, { transform: `translate(${x + 4} ${y}) scale(${scale})` });
    svg += `<text x="${x + 30}" y="${y + 78}" font-size="11" text-anchor="middle" fill="#555">${g.character} ${mark[res.status]}</text>`;
  });
});
svg += `<text x="20" y="${H - 34}" font-size="12" fill="#333">Wildstyle: Verschränkung braucht den Beziehungslöser (C04); gezeigt wird nur die Buchstabenform, nichts ist verschränkt.</text>`;
svg += `<text x="20" y="${H - 16}" font-size="12" fill="#333">Straight ändert nur Kurven und spitze Ecken; Buchstaben mit rechten Winkeln bleiben gleich (=). Blockbuster = Straight + Blockfit.</text></svg>`;
writeFileSync(`${out}/style-grammar-A-Z.svg`, svg);

// ---- word fixtures (styled: rendering axis and word composition applied) ----
const fixtures = JSON.parse(readFileSync('contracts/proof-sheet-fixtures.v1.json', 'utf8'));
const words = (fixtures.fixtures?.words ?? []).map((w) => (typeof w === 'string' ? w : w.text ?? w.word)).filter(Boolean).slice(0, 6);
const INK = '#111';
const RENDERING = {
  neutral: { fill: INK }, straight: { fill: INK }, wildstyle: { fill: INK },
  bubble: { fill: '#F4F1EA', outline: { color: INK, width: 9 }, depth: { dx: 9, dy: 9, color: INK }, highlights: true },
  blockbuster: { fill: '#F4F1EA', outline: { color: INK, width: 7 }, depth: { dx: 12, dy: 10, color: '#4A2A63' } },
};
const s2 = 0.36, lineH = 72, W2 = 820;
let w2 = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${W2} ${30 + words.length * PRESETS.length * lineH}" width="${W2}" font-family="system-ui, sans-serif"><rect width="100%" height="100%" fill="#EFECE6"/>`;
let yy = 18;
for (const word of words) for (const p of PRESETS) {
  w2 += `<text x="10" y="${yy + 34}" font-size="12" fill="#555">${esc(contract.presets[p].labelDe)}</text>`;
  const recs = [...word.toUpperCase()].map((ch) => { const g = registry.getByChar(ch); const r = results[`${p}:${ch}`]; return r.derived ?? g; });
  const comp = contract.presets[p].composition === 'bounce' ? 'bounce' : 'neutral';
  for (const it of layoutWord(recs, comp, contract.operations['composition.bounce'].params)) {
    const cx = (it.box.x0 + it.box.x1) / 2;
    w2 += paintGlyph(it.record, RENDERING[p], `translate(${f2(170 + it.x * s2)} ${f2(yy + it.y * s2)}) scale(${s2}) rotate(${it.rotate} ${f2(cx)} 70)`);
  }
  yy += lineH;
}
writeFileSync(`${out}/style-word-fixtures.svg`, w2 + '</svg>');

// ---- report ----
const report = { resolverVersion: RESOLVER_VERSION, contract: `${contract.contractId}@${contract.version}`, words, glyphs: Object.fromEntries(Object.entries(results).map(([k, r]) => [k, { status: r.status, geometryHash: r.geometryHash, operations: r.operations }])) };
const count = (p, st) => registry.list().filter((g) => results[`${p}:${g.character}`].status === st).length;
report.summary = Object.fromEntries(PRESETS.map((p) => [p, Object.fromEntries(['applied', 'unchanged', 'partial', 'fallback'].map((st) => [st, count(p, st)]))]));
writeFileSync(`${out}/resolver-report.json`, JSON.stringify(report, null, 2) + '\n');
console.log(JSON.stringify(report.summary));
