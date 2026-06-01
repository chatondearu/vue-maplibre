# Getting Started

## Install

```bash
pnpm add vue-maplibre maplibre-gl
```

## Register plugin

```ts
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

## Render a first map

```vue
<script setup lang="ts">
import { MapLibre } from 'vue-maplibre'
</script>

<template>
  <MapLibre
    :center="[2.3522, 48.8566]"
    :zoom="11"
  />
</template>
```

## Requirements

- Vue `^3.5.0`
- maplibre-gl `^5.24.0`
- Node `22.22.3`
- pnpm `11.5.0`
