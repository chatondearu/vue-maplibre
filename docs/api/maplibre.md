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

<script setup lang="ts">
import DemoBlock from '../.vitepress/components/DemoBlock.vue'
import MapDemo from '../.vitepress/components/MapDemo.vue'
import MapLibreDemo from '../demos/maplibre.vue'
import source from '../demos/maplibre.vue?raw'
</script>

<DemoBlock
title="MapLibre component demo"
:source="source"

> <template #default="{ height }">

    <MapDemo :height="height">
      <MapLibreDemo />
    </MapDemo>

  </template>
</DemoBlock>
