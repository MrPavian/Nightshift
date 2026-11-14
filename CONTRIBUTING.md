# Contributing to NIGHTSHIFT

Thanks for helping with NIGHTSHIFT ART ENGINE. This repository is designed to be understandable by human developers and AI coding assistants.

## Before starting

Read `AGENTS.md` and the project documents linked from it. Inspect the latest prototype and current branch before proposing changes.

## Good first contributions

- Audit the existing A–Z glyph coverage and report which letters are authored versus provisional.
- Create a consistent glyph review sheet with contours, counters and metrics.
- Research one style family using primary or institutional sources and document the visual grammar.
- Improve SVG export fidelity.
- Add reproducible tests for SVG generation, project serialization or deterministic seeds.
- Improve keyboard, touch and responsive interaction without changing the visual identity.

## Contribution rules

- Keep changes focused and explain the problem they solve.
- Do not overwrite historical prototype builds.
- Add new prototypes with a versioned filename.
- Update `docs/CHANGELOG.md` and the relevant design/technical documents.
- Distinguish implemented behavior from planned behavior.
- Do not add dependencies without explaining why they are necessary.
- Do not use copied artist tags, signatures or recognizable copyrighted artwork as generated output.
- Do not add real brands or logos to fictional in-game assets.

## Pull request checklist

- [ ] I read `AGENTS.md` and the relevant project docs.
- [ ] The change supports a stated roadmap item.
- [ ] I inspected the existing implementation before editing.
- [ ] I tested the changed behavior, or clearly stated why testing was not possible.
- [ ] I checked responsive/mobile behavior if the UI changed.
- [ ] I checked SVG export and persistence if those systems changed.
- [ ] I updated documentation and changelog.
- [ ] I documented remaining limitations and did not overstate completion.

## Reporting an issue

Include browser/device, steps to reproduce, expected result, actual result, screenshots or a minimal project file where possible.
