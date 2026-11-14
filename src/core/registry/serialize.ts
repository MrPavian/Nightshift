/**
 * Deterministic JSON serialisation for the glyph registry (object keys sorted recursively).
 * Identical canonical state always yields identical bytes.
 */
import type { GlyphRegistrySnapshot } from '../schema/types.ts';

function sortKeys(v: unknown): unknown {
  if (Array.isArray(v)) return v.map(sortKeys);
  if (v && typeof v === 'object') {
    return Object.fromEntries(
      Object.keys(v as Record<string, unknown>)
        .sort()
        .map((k) => [k, sortKeys((v as Record<string, unknown>)[k])]),
    );
  }
  return v;
}

export function serializeRegistry(s: GlyphRegistrySnapshot): string {
  return JSON.stringify(sortKeys(s), null, 2) + '\n';
}

export function deserializeRegistry(json: string): GlyphRegistrySnapshot {
  const parsed = JSON.parse(json) as GlyphRegistrySnapshot;
  if (parsed.schemaVersion !== '1.0') throw new Error(`deserialize: unsupported schema ${String(parsed.schemaVersion)}`);
  if (!Array.isArray(parsed.glyphs)) throw new Error('deserialize: glyphs missing');
  return parsed;
}
