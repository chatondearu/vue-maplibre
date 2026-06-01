# MapLibre

Root component that creates and owns the `maplibre-gl` `Map` instance.

## Props

| Prop              | Type               | Default     |
| ----------------- | ------------------ | ----------- |
| `center`          | `LngLatLike`       | `[10, 50]`  |
| `zoom`            | `number`           | `4`         |
| `minZoom`         | `number`           | `3`         |
| `maxZoom`         | `number`           | `7`         |
| `bounds`          | `LngLatBoundsLike` | `undefined` |
| `doubleClickZoom` | `boolean`          | `undefined` |
| `zoomControl`     | `boolean`          | `undefined` |
| `i18n`            | `boolean`          | `undefined` |

## Emits

- `ready`: when map `load` fires
- `move`: map move event with current center
- `zoomend`: zoom-end event with zoom/bounds
- `click`: map click event with `lngLat`

## Slot

Default slot is rendered only once the map instance exists.

```vue
<MapLibre v-slot="{ map }">
  <!-- use map here -->
</MapLibre>
```

## Example

```vue
<script setup lang="ts">
import { MapLibre } from 'vue-maplibre'
</script>

<template>
  <MapLibre
    :center="[2.3522, 48.8566]"
    :zoom="10"
    :double-click-zoom="false"
    @ready="(map) => console.log('ready', map)"
  />
</template>
```
