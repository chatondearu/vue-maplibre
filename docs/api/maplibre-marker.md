# MapLibreMarker

Creates a MapLibre marker and optionally exposes marker content/popup composition through slots.

## Props

- `lngLat: LngLat | [number, number] | { lng: number, lat: number }`
- `anchor?: 'center' | 'top' | 'bottom' | 'left' | 'right' | 'top-left' | 'top-right' | 'bottom-left' | 'bottom-right'` (default: `center`)
- `zIndex?: number` (default: `0`)
- `offset?: [number, number] | { x: number, y: number }` (default: `[0, 0]`)
- `draggable?: boolean` (default: `false`)
- `clickTolerance?: number` (default: `3`)
- `rotation?: number` (default: `0`)
- `pitchAlignment?: 'auto' | 'map' | 'viewport'` (default: `auto`)
- `rotationAlignment?: 'auto' | 'map' | 'viewport'` (default: `auto`)

## Emits

- `click`
- `mouseenter`
- `mouseleave`

## Slots

- `element`: custom marker element (fallback is a red dot).
- default slot: receives `{ marker }`.

## Example

<script setup lang="ts">
import DemoBlock from '../.vitepress/components/DemoBlock.vue'
import MapDemo from '../.vitepress/components/MapDemo.vue'
import MarkerPopupDemo from '../demos/marker-popup.vue'
import source from '../demos/marker-popup.vue?raw'
</script>

<DemoBlock
title="Marker component demo"
:source="source"

> <template #default="{ height }">

    <MapDemo :height="height">
      <MarkerPopupDemo />
    </MapDemo>

  </template>
</DemoBlock>
