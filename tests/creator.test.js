// Creator 0.1: brief -> four structurally different proposals.
import { test } from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import { loadRegistry } from '../src/glyph/load-node.js';
import { generateProposals, preflightWord, differingDimensions } from '../src/creator/proposals.js';

const contract = JSON.parse(readFileSync('contracts/style-resolver.v1.json', 'utf8'));
const profile = JSON.parse(readFileSync('data/validator-profiles/legacy-v06.v1.json', 'utf8'));
const registry = loadRegistry();
const ctx = { registry, contract, profile, cache: new Map() };
const gen = (b) => generateProposals({ word: 'ABRA', style: 'bubble', form: 'piece', priorities: { readability: 1, dynamics: 1, compactness: 1 }, seed: 1, ...b }, ctx);

test('four proposals, pairwise different in at least three composition dimensions, for every available style', () => {
  for (const style of ['bubble', 'straight', 'blockbuster']) {
    const r = gen({ style, word: 'MR PAVIAN' });
    assert.equal(r.ok, true, style); assert.equal(r.proposals.length, 4);
    for (let i = 0; i < 4; i++) for (let j = i + 1; j < 4; j++) assert.ok(differingDimensions(r.proposals[i].composition, r.proposals[j].composition).length >= 3, `${style} ${i}/${j}`);
    assert.equal(r.proposals[0].layout.items.filter(Boolean).length, 8, 'space is a gap, not a glyph');
  }
});

test('deterministic: the same brief gives the same proposals; a new seed gives a new, still valid set', () => {
  const a = gen({}), b = gen({});
  assert.deepEqual(a.proposals.map((p) => p.signature), b.proposals.map((p) => p.signature));
  const c = gen({ seed: 2 });
  assert.equal(c.ok, true);
  assert.notDeepEqual(c.proposals.map((p) => p.signature), a.proposals.map((p) => p.signature));
});

test('priorities steer the proposals in the expected direction', () => {
  const read = gen({ priorities: { readability: 2, dynamics: 0, compactness: 0 } }).proposals[0].composition;
  assert.equal(read.spacing, 'open'); assert.equal(read.slant, '0'); assert.equal(read.baseline, 'flat');
  const dyn = gen({ priorities: { readability: 0, dynamics: 2, compactness: 0 } }).proposals[0].composition;
  assert.notEqual(dyn.slant, '0'); assert.notEqual(dyn.baseline, 'flat');
  const comp = gen({ priorities: { readability: 0, dynamics: 0, compactness: 2 } }).proposals[0].composition;
  assert.equal(comp.spacing, 'tight'); assert.equal(comp.width, 'condensed');
});

test('colour is not part of generation: the palette never changes the proposals', () => {
  const a = gen({ palette: { fill: '#fff' } }), b = gen({ palette: { fill: '#f0f' } });
  assert.deepEqual(a.proposals.map((p) => p.signature), b.proposals.map((p) => p.signature));
});

test('composition places glyphs; it never changes glyph geometry', () => {
  const r = gen({});
  const hashes = r.proposals.map((p) => p.layout.items.map((it) => it.record.variants[0].geometryHash).join());
  assert.equal(new Set(hashes).size, 1, 'all four proposals use the same Bubble glyphs');
});

test('unsupported input and unavailable forms/styles are reported, not replaced', () => {
  const p = preflightWord('Köln 1', registry);
  assert.equal(p.ok, false); assert.deepEqual(p.unsupported, ['Ö', '1']);
  for (const b of [{ word: 'KÖLN' }, { form: 'tag' }, { style: 'wildstyle' }, { word: '' }, { word: 'ABCDEFGHIJKLM' }]) {
    const r = gen(b);
    assert.equal(r.ok, false, JSON.stringify(b)); assert.equal(r.proposals.length, 0); assert.ok(r.problems.length);
  }
  assert.match(gen({ form: 'tag' }).problems.join(), /HST-01/);
  assert.match(gen({ style: 'wildstyle' }).problems.join(), /C04/);
});
