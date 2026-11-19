// Academy reference set A–Z (owner-approved draft sheets) and its correction list.
import { test } from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync, existsSync } from 'node:fs';

const data = JSON.parse(readFileSync('data/academy/uppercase-reference.v1.json', 'utf8'));
const LETTERS = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'.split('');

test('all 26 letters, each with sheet, thumbnail, practice word and at least one correction', () => {
  assert.deepEqual(Object.keys(data.letters), LETTERS);
  for (const c of LETTERS) {
    const L = data.letters[c];
    assert.ok(existsSync(L.image) && existsSync(L.thumb), `${c} files`);
    assert.match(L.practiceWord, /^[A-ZÄÖÜ]{3,}$/, `${c} practice word`);
    assert.ok(L.practiceWord.includes(c), `${c} practice word contains the letter`);
    assert.ok(L.issues.length >= 1, `${c} has corrections`);
  }
});

test('every correction names a panel (0 = header, 1–9), a known kind, the problem and the fix', () => {
  const all = [...data.general.map((g) => ({ ...g, panel: g.panels[0] })), ...LETTERS.flatMap((c) => data.letters[c].issues)];
  for (const i of all) {
    assert.ok(Number.isInteger(i.panel) && i.panel >= 0 && i.panel <= 9, JSON.stringify(i));
    assert.ok(data.kinds.includes(i.kind), i.kind);
    assert.ok(i.issue.length > 5 && i.correction.length > 2);
  }
});

test('status stays honest: draft, AI review only, no human review claimed', () => {
  assert.equal(data.status, 'Entwurf');
  assert.match(data.review.by, /KI/);
  assert.match(data.review.method, /Keine Prüfung durch Menschen/);
});

test('general notes cover the known template errors', () => {
  const ids = data.general.map((g) => g.id);
  for (const id of ['feld-3-verhaeltnisse', 'feld-8-throw-up', 'feld-8-keine-stufen', 'feld-7-bewegung', 'feld-2-punze']) assert.ok(ids.includes(id), id);
});

test('gallery and booklet exist and are marked as draft', () => {
  for (const f of ['academy/index.html', 'academy/app.js', 'academy/heft.html', 'academy/heft.pdf']) assert.ok(existsSync(f), f);
  assert.match(readFileSync('academy/index.html', 'utf8'), /Entwurf, Version 1/);
  assert.match(readFileSync('academy/heft.html', 'utf8'), /Entwurf, Version 1/);
});
