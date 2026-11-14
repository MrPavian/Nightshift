#!/usr/bin/env node
// Extract the exact glyph path strings from the immutable Build 0.6 prototype
// into a versioned legacy snapshot (data/legacy/v06-glyph-paths.json).
//
// The prototype file is only read, never modified. Path strings are copied
// verbatim; each carries a SHA-256 hash and a source locator so the snapshot
// can be re-verified against the prototype at any time (see tests).
//
// Usage: node tools/extract-v06-paths.mjs [--check]
//   --check  verify the committed snapshot instead of writing it.

import { readFileSync, writeFileSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { dirname, join } from 'node:path';
import vm from 'node:vm';
import { sha256Hex } from '../src/core/sha256.js';
import { stableStringify } from '../src/core/stable-json.js';

const ROOT = join(dirname(fileURLToPath(import.meta.url)), '..');
export const PROTOTYPE_PATH = 'prototypes/nightshift_art_engine_v06.html';
export const SNAPSHOT_PATH = 'data/legacy/v06-glyph-paths.json';

/** Locate a `const NAME={...};` literal and return its text and 1-based line range. */
function locateLiteral(source, name) {
  const lines = source.split('\n');
  const start = lines.findIndex((l) => l.startsWith(`const ${name}={`));
  if (start < 0) throw new Error(`const ${name} not found in prototype`);
  let end = start;
  while (end < lines.length && !/};\s*$/.test(lines[end])) end++;
  const text = lines.slice(start, end + 1).join('\n');
  const literal = text.slice(text.indexOf('=') + 1).replace(/;\s*$/, '');
  return { literal, lineStart: start + 1, lineEnd: end + 1, lines: lines.slice(start, end + 1) };
}

/** Evaluate a pure data literal in an empty sandbox (no globals, short timeout). */
function evalLiteral(literal) {
  return vm.runInNewContext(`(${literal})`, Object.create(null), { timeout: 100 });
}

function lineOf(block, key) {
  const idx = block.lines.findIndex((l) => l.startsWith(`${key}:`) || l.includes(`,${key}:`) || l.startsWith(`{${key}:`) || l.includes(`{${key}:`));
  return idx < 0 ? null : block.lineStart + idx;
}

export function buildSnapshot(source) {
  const mBlock = locateLiteral(source, 'M');
  const fBlock = locateLiteral(source, 'F');
  const M = evalLiteral(mBlock.literal);
  const F = evalLiteral(fBlock.literal);

  const glyphs = {};
  for (const ch of 'ABCDEFGHIJKLMNOPQRSTUVWXYZ') {
    if (M[ch]) {
      const [outer, inner] = M[ch];
      glyphs[ch] = {
        sourceTable: 'M',
        sourceLine: lineOf(mBlock, ch),
        outer: { d: outer, sha256: sha256Hex(outer) },
        inner: inner.map((d) => ({ d, sha256: sha256Hex(d) })),
        // v0.6 glyph(): custom glyphs with holes render evenodd, otherwise nonzero.
        legacyRenderFillRule: inner.length ? 'evenodd' : 'nonzero',
      };
    } else if (F[ch]) {
      glyphs[ch] = {
        sourceTable: 'F',
        sourceLine: lineOf(fBlock, ch),
        combined: { d: F[ch], sha256: sha256Hex(F[ch]) },
        legacyRenderFillRule: 'nonzero',
      };
    } else {
      throw new Error(`Glyph ${ch} not present in v0.6 M or F tables`);
    }
  }

  return {
    snapshotId: 'nightshift.legacy.v06-glyph-paths',
    schemaVersion: '1.0',
    source: {
      path: PROTOTYPE_PATH,
      sha256: sha256Hex(source),
      tables: {
        M: { lineStart: mBlock.lineStart, lineEnd: mBlock.lineEnd, role: 'custom outer path + hole array' },
        F: { lineStart: fBlock.lineStart, lineEnd: fBlock.lineEnd, role: 'provisional combined path string' },
      },
    },
    notes: [
      'Exact verbatim copies of v0.6 path strings. Never edit by hand; regenerate with tools/extract-v06-paths.mjs.',
      'Coordinates are the v0.6 local frame (y increases downward); not a production coordinate standard.',
    ],
    glyphs,
  };
}

export function readPrototype(root = ROOT) {
  return readFileSync(join(root, PROTOTYPE_PATH), 'utf8');
}

if (process.argv[1] === fileURLToPath(import.meta.url)) {
  const snapshot = buildSnapshot(readPrototype());
  const text = stableStringify(snapshot, 2) + '\n';
  const target = join(ROOT, SNAPSHOT_PATH);
  if (process.argv.includes('--check')) {
    const current = readFileSync(target, 'utf8');
    if (current !== text) {
      console.error(`Snapshot ${SNAPSHOT_PATH} does not match prototype extraction.`);
      process.exit(1);
    }
    console.log('Snapshot matches prototype.');
  } else {
    writeFileSync(target, text);
    console.log(`Wrote ${SNAPSHOT_PATH} (${Object.keys(snapshot.glyphs).length} glyphs).`);
  }
}
