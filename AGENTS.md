# AGENTS.md

This document helps contributors and coding agents work safely and consistently in `vue-maplibre`.

## Project Snapshot

- **Type:** Vue 3 + TypeScript component library for MapLibre GL.
- **Package manager:** `pnpm` (locked to `11.5.0`).
- **Node:** `22.22.3`.
- **Build toolchain:** `unbuild` + `mkdist`.
- **Tests:** `vitest` (`jsdom` environment).
- **Linting:** ESLint with `@antfu/eslint-config`.
- **Docs:** VitePress in `docs/` workspace package.

## Repository Layout

- `src/index.ts`: plugin entry (`app.use(...)`) and public exports.
- `src/components/`: Vue components (`MapLibre`, controls, marker, popup, source, layers).
- `src/composables/`: shared source helpers (`useSource`).
- `src/utils/`: config defaults and utility helpers.
- `playground/`: local manual testing app.
- `docs/`: user documentation and API guides.
- `.github/workflows/`: CI and release automation.

## Local Setup

```bash
pnpm install
pnpm dev
```

Recommended checks before opening a PR:

```bash
pnpm lint
pnpm typecheck
pnpm test
pnpm build
```

Or run everything in one command:

```bash
pnpm check
```

## Coding Standards

- Keep all imports at the top of files (no inline imports).
- Use `<script setup lang="ts">` for Vue SFCs.
- Prefer explicit prop and emit typing in TypeScript.
- Keep component APIs backward compatible when possible.
- Avoid silent behavior changes in map interactions (events, layer/source lifecycle).
- Keep comments short and in English, only when code intent is non-obvious.

## Quality and Review Expectations

When changing behavior:

1. Add or update tests (unit tests at minimum).
2. Update docs in `docs/` for public API changes.
3. Run the full local quality pipeline (`pnpm check`).
4. Validate release-related changes against Changesets workflow.

## Commit and Branch Conventions

- Follow **Conventional Commits** (for example: `fix: correct layer zoom range order`).
- Keep commits focused and atomic.
- Preferred branch names:
  - `fix/<issue-id>-<scope>`
  - `feat/<issue-id>-<scope>`
  - `docs/<issue-id>-<scope>`
  - `chore/<issue-id>-<scope>`

## CI and Release Notes

- CI workflow (`.github/workflows/ci.yml`) runs lint, typecheck, test, build.
- Release workflow (`.github/workflows/release.yml`) uses Changesets.
- Publishing is configured for npm Trusted Publisher (OIDC).
- For versioning:
  - `pnpm changeset`
  - `pnpm version-packages`
  - `pnpm release`

## MapLibre-Specific Guardrails

- Always unregister map listeners in lifecycle cleanup hooks.
- Guard against null injected refs (`map`, `marker`) before method calls.
- Preserve source/layer IDs and event contracts unless a breaking change is intentional.
- Validate mutable watcher logic for map state updates (`zoom`, `bounds`, `feature-state`).

## Contribution Checklist

Before requesting review:

- [ ] Code compiles and typechecks.
- [ ] Lint passes with no new violations.
- [ ] Tests pass locally; new logic has coverage.
- [ ] Docs updated for any API behavior changes.
- [ ] Changeset added if release impact is intended.
- [ ] PR description explains intent, risk, and validation performed.
