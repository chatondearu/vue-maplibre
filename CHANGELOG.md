# Changelog

## 0.1.0

### Minor Changes

- e9eca66: First public release (`0.1.0`).

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

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.1.0/),
and this project follows [Semantic Versioning](https://semver.org/).

## [Unreleased]

Release notes are generated from Changesets when the "Version packages" pull request is merged on `main`.
