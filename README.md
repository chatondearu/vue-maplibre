[![Updated Badge](https://badges.pufler.dev/updated/chatondearu/vue-maplibre)](https://badges.pufler.dev)
[![GitHub issues](https://img.shields.io/github/issues/chatondearu/vue-maplibre?color=brightgreen)](https://github.com/chatondearu/vue-maplibre/issues)

# This repository is currently a work in progress. We are actively developing a new GitHub project that will be released in the near future. Please check back soon for more updates and information about the project.

# vue-maplibre

A simple library for Maplibre with vue 3 components, composition api and typescript support

- Build with [unbuild](https://github.com/unjs/unbuild)
- File-to-file transpilation via [mkdist](https://github.com/unjs/mkdist)
- Playground with [vite](https://vitejs.dev/)

## Setup

```bash
# install dependencies
npm install

# start the dev app with hot reload, great for testing components
npm run dev

# build the library, available under dist
npm run build

# build the dev app, available under dev/dist
npm run dev:build

# preview the dev app locally from dev/dist
npm run dev:preview
```

## Usage
Install and configure Map Libre

```ts
// src/main.ts
import MapLibrePlugin from '@vue-maplibre'

// ...

app.use(MapLibrePlugin, {
  style: 'mapbox://styles/chatondearu/my-style',
  i18n: true, // to activate the translation on cities (Mapbox proof and need to be tested on others)
})

// ...
```

Usage as components

```vue
<script setup lang="ts">
import { MapLibre } from 'vue-maplibre'
</script>

<template>
  <MapLibre :center="[10, 40]" />
</template>
```

## Documentation

The documentation will be started when the projet will be ready for his first release.
Thanks in advance for your patience.

## Contrib

[![Contributors Display](https://badges.pufler.dev/contributors/chatondearu/vue-maplibre?size=50&padding=5&perRow=10&bots=true)](https://badges.pufler.dev)