// Repository-relative input files of the canonical glyph registry.
// Shared by the Node loader and the browser loader so both build the same registry.

export const REGISTRY_INPUTS = {
  snapshot: 'data/legacy/v06-glyph-paths.json',
  overlay: 'data/semantic/abgrs-semantic-overlay.v1.json',
  parameterContract: 'contracts/glyph-parameter-contract.v1.json',
  validationContract: 'contracts/glyph-geometry-validation.v1.json',
};
export const AUTHORED_SNAPSHOTS = ['data/glyphs/authored/c02-wave1.v1.json', 'data/glyphs/authored/c02-wave2.v1.json'];
export const VALIDATOR_PROFILE = 'data/validator-profiles/legacy-v06.v1.json';
