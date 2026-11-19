// Creator 0.2: brief -> four proposals built by the graffiti engine (skeleton -> bars -> style moves).
import { test } from 'node:test';
import assert from 'node:assert/strict';
import { generateProposals, preflightWord, differingDimensions, MOVE_SETS } from '../src/creator/proposals.js';
import { buildLetter, BASES, renderLetters } from '../src/style/graffiti-engine.js';
import { SKELETONS } from '../src/style/skeletons.js';

const gen = (b) => generateProposals({ word: 'ABRA', style: 'semiwild', form: 'piece', priorities: { readability: 1, dynamics: 1, compactness: 1 }, seed: 1, ...b });
const STYLES = ['bubble', 'straight', 'blockbuster', 'semiwild'];

test('every letter A–Z has a skeleton; terminals and bars point to real strokes', () => {
  assert.equal(Object.keys(SKELETONS).length, 26);
  for (const [c, sk] of Object.entries(SKELETONS)) {
    for (const t of sk.terminals) assert.ok(sk.strokes[t.s] && ['start', 'end'].includes(t.e), c);
    for (const b of sk.bars) assert.ok(sk.strokes[b], c);
    for (const p of sk.strokes.flat()) assert.ok(p[1] >= -2 && p[1] <= 150, `${c} inside cap height`);
  }
});

test('engine: style moves sit only on free bar ends, recur through the word and never exceed the density', () => {
  for (const ch of Object.keys(SKELETONS)) {
    const L = buildLetter(ch, { base: 'semiwild', moves: ['arrow', 'kick', 'cut', 'split'], density: 3 }, 1);
    const ends = L.applied.filter((a) => a.move !== 'split');
    assert.ok(ends.length <= 3, ch);
    for (const a of ends) assert.ok(SKELETONS[ch].terminals.some((t) => t.s === a.stroke && t.e === a.end), `${ch} ${a.move} on a terminal`);
    for (const a of L.applied.filter((x) => x.move === 'split')) assert.ok(SKELETONS[ch].bars.includes(a.stroke));
  }
  const r = gen({});
  for (const p of r.proposals) {
    const allowed = new Set(MOVE_SETS.semiwild[p.composition.moves]);
    for (const l of p.appliedMoves) for (const m of l.moves) assert.ok(allowed.has(m), 'only the moves of the chosen set appear');
  }
});

test('the four proposals differ in style moves (construction), not only in layout', () => {
  for (const style of STYLES) {
    const r = gen({ style, word: 'MR PAVIAN' });
    assert.equal(r.ok, true, style); assert.equal(r.proposals.length, 4);
    for (let i = 0; i < 4; i++) for (let j = i + 1; j < 4; j++) assert.ok(differingDimensions(r.proposals[i].composition, r.proposals[j].composition).length >= 3);
    const sets = new Set(r.proposals.map((p) => p.composition.moves));
    assert.ok(sets.size >= Math.min(Object.keys(MOVE_SETS[style]).length, 3) - (style === 'bubble' ? 1 : 0), `${style}: ${[...sets]}`);
    assert.equal(r.proposals[0].layout.items.filter(Boolean).length, 8, 'space is a gap, not a letter');
  }
});

test('base styles build differently: bar width, round vs square bars', () => {
  assert.ok(BASES.bubble.W > BASES.blockbuster.W && BASES.blockbuster.W > BASES.straight.W);
  assert.ok(buildLetter('A', { base: 'bubble', moves: [] }, 1).parts.every((p) => p.pts));
  assert.ok(buildLetter('A', { base: 'straight', moves: [] }, 1).parts.every((p) => p.poly));
});

test('deterministic for a seed; a new seed gives a new valid set', () => {
  const a = gen({}), b = gen({});
  assert.deepEqual(a.proposals.map((p) => p.signature), b.proposals.map((p) => p.signature));
  assert.deepEqual(a.proposals.map((p) => p.appliedMoves), b.proposals.map((p) => p.appliedMoves));
  const c = gen({ seed: 2 });
  assert.equal(c.ok, true);
  assert.notDeepEqual(c.proposals.map((p) => [p.signature, p.appliedMoves]), a.proposals.map((p) => [p.signature, p.appliedMoves]));
});

test('priorities steer: readability -> calm and open, dynamics -> leaning with more moves', () => {
  const read = gen({ style: 'straight', priorities: { readability: 2, dynamics: 0, compactness: 0 } }).proposals[0].composition;
  assert.equal(read.spacing, 'open'); assert.equal(read.slant, '0');
  const dyn = gen({ style: 'straight', priorities: { readability: 0, dynamics: 2, compactness: 0 } }).proposals[0].composition;
  assert.notEqual(dyn.slant, '0'); assert.notEqual(dyn.moves, 'plain');
});

test('colour is rendering only: same proposals for any palette; render is valid SVG markup', () => {
  const a = gen({ palette: { fill: '#fff' } }), b = gen({ palette: { fill: '#f0f' } });
  assert.deepEqual(a.proposals.map((p) => p.signature), b.proposals.map((p) => p.signature));
  const svg = renderLetters([{ letter: buildLetter('R', { base: 'straight', moves: ['kick'] }, 1), transform: '' }], { fill: '#fff', outline: '#000', depth: { dx: 5, dy: 5, color: '#333' }, highlights: true });
  assert.match(svg, /<g class="depth">/); assert.ok(!svg.includes('NaN'));
});

test('unsupported input and unavailable forms/styles are reported, not replaced', () => {
  const p = preflightWord('Köln 1');
  assert.equal(p.ok, false); assert.deepEqual(p.unsupported, ['Ö', '1']);
  for (const b of [{ word: 'KÖLN' }, { form: 'tag' }, { style: 'wildstyle' }, { word: '' }, { word: 'ABCDEFGHIJKLM' }]) {
    const r = gen(b);
    assert.equal(r.ok, false, JSON.stringify(b)); assert.equal(r.proposals.length, 0); assert.ok(r.problems.length);
  }
  assert.match(gen({ form: 'tag' }).problems.join(), /HST-01/);
  assert.match(gen({ style: 'wildstyle' }).problems.join(), /C04/);
});
