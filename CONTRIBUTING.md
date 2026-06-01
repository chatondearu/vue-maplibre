# Contributing to vue-maplibre

Thanks for considering contributing.

## Development setup

1. Fork and clone the repository.
2. Install dependencies:
   - `pnpm install`
3. Start playground:
   - `pnpm dev`

## Local quality checks

Run the full local pipeline before opening a pull request:

- `pnpm lint`
- `pnpm typecheck`
- `pnpm test`
- `pnpm build`

Or run:

- `pnpm check`

To mirror CI lint behavior exactly before pushing:

- `pnpm install --frozen-lockfile && pnpm lint`
- or run `pnpm check:ci` for full CI parity checks (lint, typecheck, test, build, docs build)

## Branch and commit conventions

- Branch naming:
  - `fix/<issue-id>-<scope>`
  - `feat/<issue-id>-<scope>`
  - `docs/<issue-id>-<scope>`
  - `chore/<issue-id>-<scope>`
- Commit messages follow Conventional Commits.
- Link an issue in commits or PR body (`Closes #<id>`).

## Pull request guidelines

- Keep PRs focused and small.
- Add or update tests when behavior changes.
- Update documentation when public APIs or usage change.
- Fill the pull request template completely.
