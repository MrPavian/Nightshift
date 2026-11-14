import { readdirSync, readFileSync, statSync } from 'node:fs';
import { join } from 'node:path';
import { describe, expect, it } from 'vitest';

function files(dir: string): string[] {
  return readdirSync(dir).flatMap((f) => {
    const p = join(dir, f);
    return statSync(p).isDirectory() ? files(p) : p.endsWith('.ts') ? [p] : [];
  });
}

describe('architecture boundary (D-003/D-010)', () => {
  it('src/core imports neither three.js, the DOM nor Node built-ins', () => {
    const offenders: string[] = [];
    for (const f of files('src/core')) {
      const src = readFileSync(f, 'utf8');
      if (/from\s+['"]three/.test(src)) offenders.push(`${f}: three`);
      if (/from\s+['"]node:/.test(src)) offenders.push(`${f}: node built-in`);
      if (/\b(document|window|HTMLElement|localStorage)\b/.test(src.replace(/\/\*[\s\S]*?\*\/|\/\/.*$/gm, ''))) offenders.push(`${f}: DOM`);
    }
    expect(offenders).toEqual([]);
  });
});
