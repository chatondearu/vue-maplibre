[![GitHub issues](https://img.shields.io/github/issues/chatondearu/vue-maplibre?color=brightgreen)](https://github.com/chatondearu/vue-maplibre/issues)
[![CI](https://github.com/chatondearu/vue-maplibre/actions/workflows/ci.yml/badge.svg)](https://github.com/chatondearu/vue-maplibre/actions/workflows/ci.yml)

# vue-maplibre

Vue 3 components and plugin helpers for building map interfaces with MapLibre GL.

## Status

This project is currently in active development and targets an initial `0.x` release.

Current priorities are tracked in the [release readiness backlog](https://github.com/chatondearu/vue-maplibre/issues/9).

## Installation

```bash
pnpm add vue-maplibre maplibre-gl
```

`maplibre-gl` is required at runtime by the components.

## Quickstart

```ts
// main.ts
import { createApp } from 'vue'
import VueMapLibre from 'vue-maplibre'
import App from './App.vue'

const app = createApp(App)

app.use(VueMapLibre, {
  style: 'https://basemaps.cartocdn.com/gl/positron-gl-style/style.json',
  i18n: false,
})

app.mount('#app')
```

```vue
<script setup lang="ts">
import { MapLibre } from 'vue-maplibre'
</script>

<template>
  <MapLibre :center="[10, 40]" :zoom="5" />
</template>
```

## Public API (current)

### Plugin

- Default export: `VueMapLibre`
- Install signature:
  - `app.use(VueMapLibre, { style, i18n? })`

### Component

- `MapLibre`
  - Props:
    - `center?: LngLatLike`
    - `zoom?: number`
    - `minZoom?: number`
    - `maxZoom?: number`
    - `bounds?: LngLatBoundsLike`
    - `doubleClickZoom?: boolean`
    - `zoomControl?: boolean`
    - `i18n?: boolean`
  - Events:
    - `ready`
    - `move`
    - `zoomend`
    - `click`

## Environment notes

- Mapbox URL transformation uses `VITE_MAPBOX_TOKEN` when needed by your style URLs.
- MapLibre CSS is imported by the map component.

## Development

```bash
pnpm install
pnpm dev
pnpm lint
pnpm build
```

## Contributing

Please read [CONTRIBUTING.md](./CONTRIBUTING.md) before opening a pull request.