// Node-only convenience loader for tools and tests (reads repository files).
// Browser code should fetch the same JSON files and call GlyphRegistry.build.
import { readFileSync } from 'node:fs';
import { GlyphRegistry } from './registry.js';

import { REGISTRY_INPUTS, AUTHORED_SNAPSHOTS } from './inputs.js';

export const DEFAULT_INPUTS = REGISTRY_INPUTS;

export { AUTHORED_SNAPSHOTS };

export function readInputs(paths = DEFAULT_INPUTS, authoredPaths = AUTHORED_SNAPSHOTS) {
  const inputs = Object.fromEntries(Object.entries(paths).map(([k, p]) => [k, JSON.parse(readFileSync(p, 'utf8'))]));
  inputs.authored = authoredPaths.map((sourcePath) => ({ sourcePath, snapshot: JSON.parse(readFileSync(sourcePath, 'utf8')) }));
  return inputs;
}

export const loadRegistry = (paths) => GlyphRegistry.build(readInputs(paths));
