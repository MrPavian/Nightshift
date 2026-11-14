// Node-only convenience loader for tools and tests (reads repository files).
// Browser code should fetch the same JSON files and call GlyphRegistry.build.
import { readFileSync } from 'node:fs';
import { GlyphRegistry } from './registry.js';

export const DEFAULT_INPUTS = {
  snapshot: 'data/legacy/v06-glyph-paths.json',
  overlay: 'data/semantic/abgrs-semantic-overlay.v1.json',
  parameterContract: 'contracts/glyph-parameter-contract.v1.json',
  validationContract: 'contracts/glyph-geometry-validation.v1.json',
};

export function readInputs(paths = DEFAULT_INPUTS) {
  return Object.fromEntries(Object.entries(paths).map(([k, p]) => [k, JSON.parse(readFileSync(p, 'utf8'))]));
}

export const loadRegistry = (paths) => GlyphRegistry.build(readInputs(paths));
