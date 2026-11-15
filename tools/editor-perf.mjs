#!/usr/bin/env node
// Editor responsiveness benchmark (fix for the reported phone freeze).
// Moves every on-curve node of every editable glyph to a grid of targets across
// and beyond the glyph — including positions that drag a counter through the
// outer contour, the case that froze the editor — and times each preview
// validation. Fails if any single validation exceeds the budget.
// Usage: node tools/editor-perf.mjs [--budget-ms 250] [--grid 7]
import { readFileSync } from 'node:fs';
import { loadRegistry } from '../src/glyph/load-node.js';
import { EditorStore, moveNodeCommand } from '../src/model/editor-store.js';

const arg = (k, d) => { const i = process.argv.indexOf(k); return i > 0 ? Number(process.argv[i + 1]) : d; };
const BUDGET = arg('--budget-ms', 250), GRID = arg('--grid', 7);
const profile = JSON.parse(readFileSync('data/validator-profiles/legacy-v06.v1.json', 'utf8'));
const store = new EditorStore(loadRegistry().list(), profile);
const EDITABLE = ['A', 'B', 'G', 'R', 'S'];

let n = 0, worst = { ms: 0 }, over = 0;
const times = [];
for (const ch of EDITABLE) {
  const id = `latin.upper.${ch}`;
  const rec = store.get(id);
  const b = rec.baseMetrics.visibleBounds;
  const w = b.maxX - b.minX, h = b.maxY - b.minY;
  const nodes = rec.variants[0].geometry.contours.flatMap((c) => c.segments.filter((s) => s.nodeId).map((s) => s.nodeId));
  for (const nodeId of nodes) {
    for (let i = 0; i < GRID; i++) for (let j = 0; j < GRID; j++) {
      const to = { x: b.minX - 0.15 * w + (1.3 * w * i) / (GRID - 1), y: b.minY - 0.15 * h + (1.3 * h * j) / (GRID - 1) };
      const t0 = performance.now();
      store.preview(moveNodeCommand(store, id, nodeId, to));
      const ms = performance.now() - t0;
      times.push(ms); n++;
      if (ms > worst.ms) worst = { ms, glyph: ch, nodeId, to };
      if (ms > BUDGET) over++;
    }
  }
}
times.sort((a, b) => a - b);
const pct = (p) => times[Math.min(times.length - 1, Math.floor(p * times.length))].toFixed(1);
const result = { validations: n, medianMs: Number(pct(0.5)), p95Ms: Number(pct(0.95)), p99Ms: Number(pct(0.99)), worst: { ...worst, ms: Number(worst.ms.toFixed(1)) }, budgetMs: BUDGET, overBudget: over };
console.log(`${over ? 'EDITOR-PERF-FAIL' : 'EDITOR-PERF-PASS'} ${JSON.stringify(result)}`);
process.exitCode = over ? 1 : 0;
