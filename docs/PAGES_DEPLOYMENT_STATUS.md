# GitHub Pages Deployment Status

Checked: 2026-11-14

## Repository state

- Default branch: `main` (commit `4825a8c`).
- The default branch contains the legacy prototype at `prototypes/nightshift_art_engine_v06.html`; it does not contain the production `src/` editor, package manifest, or Pages workflow.
- The actual Build 0.7 editor and the Actions workflows are in open PR #2, branch `claude/adoring-hopper-djerc9`. PR #1 is also open. Neither PR was merged.
- Repository branches observed: `main`, `claude/adoring-hopper-djerc9`, and `claude/0.7a-t01-t02-glyph-registry`.
- Pages source is already set to GitHub Actions.

## Editor and build

PR #2 contains a real Vite + TypeScript + Three.js editor, not a placeholder. It renders the A–Z glyph registry as selectable diagnostic outlines with a record inspector. It remains an early editor slice: filled rendering, semantic overlays, geometry validation, and editing are not implemented yet.

The project uses Node.js 22, Vite 8, TypeScript 7, Vitest 5, and Three.js 0.187.0. Its scripts are `npm run dev`, `npm test`, `npm run build`, `npm run typecheck`, and `npm run extract:v06`.

The Vite build is configured with `base: './'`, which supports the repository subpath. The HTML module entry previously used the root-absolute `/src/editor/main.ts`, which would resolve outside `/Nightshift/`; it was changed to `./src/editor/main.ts` in PR #2.

## Actions and verification

- `.github/workflows/ci.yml` runs `npm ci`, `npm test`, and `npm run build` on non-main pushes and pull requests.
- `.github/workflows/deploy-pages.yml` builds and uploads `dist/`, then uses `actions/deploy-pages@v4`.
- On 2026-11-14, the workflow completed `npm ci`, `npm test` (23/23), `npm run build`, Pages configuration, and artifact upload successfully.
- The deploy job failed before deployment because GitHub Environment protection rules do not allow `claude/adoring-hopper-djerc9` to deploy to `github-pages`.
- The requested Pages URL has therefore not been verified as serving this editor.

## Next steps

1. Keep PR #2 open for review; do not merge without the repository owner's approval.
2. To publish this exact editor without merging, add `claude/adoring-hopper-djerc9` (or an appropriate preview branch) to the allowed deployment branches for the `github-pages` environment, then rerun the Pages workflow and verify the live URL and browser interaction.
3. Alternatively, after approval, merge PR #2. Its existing deploy workflow targets pushes to `main`; the resulting main-branch run can deploy without allowing a feature branch into the Pages environment.
4. After deployment, verify the HTTP response, module and asset requests under `/Nightshift/`, and selection/inspector behavior in a browser.

## Current limitation

GitHub Actions can build the real editor artifact, but repository environment protection prevents publishing the unmerged PR branch. No production prototype files were replaced.
