---
"vue-maplibre": minor
---

First public release (`0.1.0`).

### Added

- Vue 3 MapLibre components with composition API and TypeScript support.
- Plugin install API with configurable default style and i18n flag.
- VitePress documentation (guide, API reference, examples).
- CI pipeline (lint, typecheck, test, build) and local `check:ci` parity command.
- Changesets-based release workflow with npm provenance publishing.

### Fixed

- Map instance lifecycle cleanup and event listener disposal in core components.
- Layer/source/marker/popup edge cases and import path stability for package builds.

### Changed

- Upgraded critical dependencies (`maplibre-gl` v5, Vue 3.5 peer range).
- Stabilized npm package exports, peer dependencies, and playground/docs tooling.
