// Browser loader: fetches the registry inputs relative to the repository root.
import { REGISTRY_INPUTS, AUTHORED_SNAPSHOTS, VALIDATOR_PROFILE } from './inputs.js';
import { GlyphRegistry } from './registry.js';

const getJson = async (url) => {
  const r = await fetch(url);
  if (!r.ok) throw new Error(`${url}: HTTP ${r.status}`);
  return r.json();
};

/** @param {string} root URL prefix of the repository root, e.g. '../' */
export async function loadRegistryInputs(root) {
  const entries = await Promise.all(Object.entries(REGISTRY_INPUTS).map(async ([k, p]) => [k, await getJson(root + p)]));
  const inputs = Object.fromEntries(entries);
  inputs.authored = await Promise.all(AUTHORED_SNAPSHOTS.map(async (sourcePath) => ({ sourcePath, snapshot: await getJson(root + sourcePath) })));
  return inputs;
}

export async function loadRegistryAndProfile(root) {
  const [inputs, profile] = await Promise.all([loadRegistryInputs(root), getJson(root + VALIDATOR_PROFILE)]);
  return { registry: GlyphRegistry.build(inputs), profile, inputs };
}
