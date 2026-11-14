// Static checks for the build-free test & review page (review/).
import { test } from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';

const html = readFileSync('review/index.html', 'utf8');
const app = readFileSync('review/app.js', 'utf8');
const pkg = JSON.parse(readFileSync('package.json', 'utf8'));

test('CDN fallback pins the same Three.js version as package.json', () => {
  const v = html.match(/THREE_VERSION = '([^']+)'/)[1];
  assert.equal(v, pkg.dependencies.three);
  assert.ok(html.includes("'https://cdn.jsdelivr.net/npm/three@' + THREE_VERSION + '/build/three.module.js'"));
});

test('page uses only relative repository paths (works under a GitHub Pages sub-path)', () => {
  const absolute = [...app.matchAll(/(?:get|fetch|import)\(\s*[`'"](\/[^`'"]*)/g)].map((m) => m[1]);
  assert.deepEqual(absolute, []);
  assert.ok(!/src="\//.test(html));
  for (const m of app.matchAll(/from '(\.\.\/[^']+)'/g)) assert.ok(readFileSync(new URL(m[1], new URL('../review/app.js', import.meta.url)), 'utf8').length > 0, m[1]);
});

test('page never writes maturity or canonical data', () => {
  assert.ok(!/\.maturity\s*=/.test(app));
  assert.ok(!/variants\[0\]\.geometry\s*=/.test(app));
});
