import { describe, expect, it } from 'vitest';
import { GlyphRegistry } from '../../src/core/registry/registry.ts';
import { deserializeRegistry, serializeRegistry } from '../../src/core/registry/serialize.ts';

describe('registry serialisation', () => {
  it('round-trips with identical bytes and stable IDs', () => {
    const a = GlyphRegistry.fromLegacyV06();
    const json = serializeRegistry(a.toSnapshot());
    const b = GlyphRegistry.fromSnapshot(deserializeRegistry(json));
    expect(serializeRegistry(b.toSnapshot())).toBe(json);
    expect(b.variant('latin.upper.B').geometry.contours.map((c) => c.contourId)).toEqual([
      'b.master.c0',
      'b.master.c1',
      'b.master.c2',
    ]);
  });

  it('rejects duplicate stable IDs', () => {
    const s = GlyphRegistry.fromLegacyV06().toSnapshot();
    s.glyphs.push(structuredClone(s.glyphs[0]!));
    expect(() => GlyphRegistry.fromSnapshot(s)).toThrow(/duplicate/);
  });

  it('rejects unknown schema versions', () => {
    expect(() => deserializeRegistry('{"schemaVersion":"2.0","glyphs":[]}')).toThrow(/unsupported schema/);
  });
});
