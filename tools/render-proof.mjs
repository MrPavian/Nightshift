#!/usr/bin/env node
// Ticket 0.7A-T05 proof run: renders A/B/G/R/S with the SVG and Three.js
// renderers in headless Chrome, checks probe pixels and silhouette parity,
// captures a proof-sheet screenshot and writes a manifest with hashes.
// Usage: node tools/render-proof.mjs [--no-capture]
import { readFileSync, writeFileSync, mkdirSync } from 'node:fs';
import { createHash } from 'node:crypto';
import { startServer, chrome, preText } from './lib/headless.mjs';

const OUT_DIR = 'docs/reports/proof/T05';
const PAGE = '/tools/proof/render-proof.html';

const { server, port } = await startServer();
const url = `http://127.0.0.1:${port}${PAGE}`;
let exit = 1;
try {
  const dom = await chrome(['--virtual-time-budget=30000', '--dump-dom', url]);
  const text = preText(dom, 'out') ?? 'PROOF-FAIL no output';
  const pass = text.startsWith('PROOF-PASS');
  const data = JSON.parse(text.replace(/^PROOF-(PASS|FAIL) /, ''));
  for (const r of data.results ?? []) {
    const ok = r.probes.filter((p) => p.ok).length;
    console.log(`${r.glyph}: probes ${ok}/${r.probes.length}, edge-band differing px ${r.parity.differingPixels}, outside band ${r.parity.differingOutsideEdgeBand}`);
  }
  for (const c of data.controls ?? []) console.log(`control ${c.control} on ${c.surface}: ${c.detected ? 'detected (good)' : 'NOT detected'}`);
  if (data.error) console.error(data.error);
  if (!process.argv.includes('--no-capture')) {
    mkdirSync(OUT_DIR, { recursive: true });
    const png = `${OUT_DIR}/render-proof.png`;
    await chrome(['--virtual-time-budget=30000', '--window-size=1220,1290', `--screenshot=${png}`, url]);
    const hash = (p) => createHash('sha256').update(readFileSync(p)).digest('hex');
    const manifest = {
      proofRunId: 'proof.0.7A-T05.render',
      page: PAGE,
      result: pass ? 'pass' : 'fail',
      renderSettings: { three: data.three, scale: data.scale, ink: { light: '#111111', dark: '#ece8dd', texture: '#111111' }, surfaces: ['light #f2efe6', 'dark #16181d', 'texture (deterministic SVG pattern)'], antialias: false },
      inputs: Object.fromEntries(['data/legacy/v06-glyph-paths.json', 'data/semantic/abgrs-semantic-overlay.v1.json', 'data/validator-profiles/legacy-v06.v1.json']
        .map((p) => [p, hash(p)])),
      negativeControls: data.controls ?? [],
      glyphs: (data.results ?? []).map((r) => ({ glyph: r.glyph, revision: r.revision, geometryHash: r.geometryHash, parity: r.parity,
        probes: r.probes.length, probesPassed: r.probes.filter((p) => p.ok).length })),
      artifacts: { 'render-proof.png': { sha256: hash(png), note: 'Screenshot bytes may vary across Chrome versions; pass/fail comes from the probe and parity checks.' } },
      review: { status: 'pending', note: 'Automated proof only. No maturity change. Human review per research/GLYPH_VISUAL_REVIEW_PROTOCOL_01.md.' },
    };
    writeFileSync(`${OUT_DIR}/manifest.json`, JSON.stringify(manifest, null, 2) + '\n');
    console.log(`Wrote ${png} and ${OUT_DIR}/manifest.json`);
  }
  console.log(pass ? 'PROOF-PASS' : 'PROOF-FAIL');
  exit = pass ? 0 : 1;
} catch (e) {
  console.error(e.message);
} finally {
  server.close();
}
process.exit(exit);
