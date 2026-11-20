// Academy content contract for lowercase a–z and numerals 0–9.
import { test } from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';

const data = JSON.parse(readFileSync('data/academy/lowercase-numerals.v1.json', 'utf8'));
const lower = 'abcdefghijklmnopqrstuvwxyz'.split('');
const numerals = '0123456789'.split('');
const directions = ['throw-up-oriented', 'block-style', 'piece-wildstyle-oriented'];

test('the content package contains exactly 26 lowercase letters and ten numerals', () => {
  assert.equal(data.schema, 'nightshift.academy.lowercase-numerals.v1');
  assert.equal(data.status, 'Entwurf');
  assert.equal(data.characters.length, 36);
  assert.deepEqual(data.characters.filter(x => x.characterType === 'lowercase').map(x => x.character), lower);
  assert.deepEqual(data.characters.filter(x => x.characterType === 'numeral').map(x => x.character), numerals);
  assert.equal(new Set(data.characters.map(x => x.id)).size, 36);
});

test('every character has anatomy, proportion guidance, five structural variants and three graffiti directions', () => {
  for (const c of data.characters) {
    assert.ok(c.anatomy.length >= 2, c.character + ' anatomy');
    assert.ok(c.proportionGuides.length > 20, c.character + ' guides');
    assert.equal(c.formVariations.length, 5, c.character + ' variants');
    assert.equal(new Set(c.formVariations.map(v => v.id)).size, 5, c.character + ' unique variant ids');
    assert.deepEqual(Object.keys(c.graffitiTransfer).sort(), [...directions].sort(), c.character + ' graffiti directions');
    for (const direction of directions) assert.ok(c.graffitiTransfer[direction].length > 20, c.character + ' ' + direction);
    assert.ok(c.learningCheck.length >= 3, c.character + ' learning tasks');
    assert.ok(c.confusionRisks.length > 10, c.character + ' confusion risks');
  }
});

test('lowercase and numeral guide systems remain distinct', () => {
  assert.deepEqual(data.sharedLowercaseSystem.guideLines, ['Ascenderlinie', 'x-Höhe', 'Grundlinie', 'Descenderlinie']);
  assert.match(data.sharedLowercaseSystem.note, /keine verkleinerten Versalien/);
  assert.match(data.sharedNumeralSystem.default, /Lining-Ziffern/);
  assert.match(data.sharedNumeralSystem.default, /keine x-Höhe/);
  assert.match(data.sharedNumeralSystem.alternatives, /eigener Satz/);
});

test('a and g preserve single- and double-storey constructions as separate families', () => {
  const a = data.characters.find(x => x.character === 'a');
  const g = data.characters.find(x => x.character === 'g');
  assert.match(a.neutralForm, /Doppelgeschossig/);
  assert.match(a.formVariations.map(x => x.description).join(' '), /einstöckig/);
  assert.match(g.neutralForm, /Doppelgeschossig/);
  assert.match(g.formVariations.map(x => x.description).join(' '), /einstöckig/);
});

test('numeral-specific ambiguity and optional conventions are explicit', () => {
  const byChar = Object.fromEntries(data.characters.filter(x => x.characterType === 'numeral').map(x => [x.character, x]));
  assert.match(byChar['0'].confusionRisks, /o/);
  assert.match(byChar['1'].confusionRisks, /I und l/);
  assert.match(byChar['4'].formVariations.map(x => x.description).join(' '), /Offenes 4; geschlossenes 4/);
  assert.match(byChar['7'].formVariations.map(x => x.description).join(' '), /Querstrich/);
  assert.match(byChar['8'].confusionRisks, /B/);
});

test('all references are linked and no external images or writer signatures are embedded', () => {
  assert.ok(data.references.length >= 4);
  for (const ref of data.references) assert.match(ref.url, /^https:\/\//);
  assert.ok(!JSON.stringify(data).includes('<image'));
  assert.match(data.productionRules.originality, /originär und fiktiv/);
  assert.match(data.sharedSafeguards.join(' '), /Keine reale Writer-Signatur/);
});
