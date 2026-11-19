# Foam board

#kanban #foam

Execution status for this repo. **Source of truth**. GitHub Projects is not.
GitHub Issues are optional (`github_issue` in frontmatter).

One markdown file per card. Readers glob `foam/board/*.md` and skip
`README.md` plus names starting with `_`. Files without required frontmatter
are not cards. Do not add a hand-edited `index.md` here.

Status flow: **Backlog → Ready → In progress → In review → Done**.

## Frontmatter

Copy [_template.md](_template.md). Required: `status`, `priority`, `updated`.
Optional: `title`, `github_issue`, `blocked_by`.

Filename: `{slug}.md`. When `github_issue` is set, prefer `{N}-{slug}.md`.

One-shot map from existing GitHub issues (not a loop): `cda-foam` `import-board.sh`.
Ready listing: `cda-kanban` `foam-board.sh list-ready`.
