# MapLibrePopup

Creates a popup attached to a marker or directly to the map. Can also track hovered features on a layer.

## Props

- `lngLat?: LngLatLike`
- `text?: string`
- `anchor?: PositionAnchor`
- `offset?: Offset` (default: `[0, 0]`)
- `className?: string`
- `maxWidth?: string` (default: `240px`)
- `closeButton?: boolean`
- `closeOnClick?: boolean`
- `closeOnMove?: boolean`
- `focusAfterOpen?: boolean`
- `layerId?: string` (enables hover tracking for this layer)

## Emits

No custom emit.

## Slots

- `element`: custom popup DOM content, receives `{ feature }` when used with `layerId`.
- default slot: receives `{ popup }`.

## Example

<script setup lang="ts">
import DemoBlock from '../.vitepress/components/DemoBlock.vue'
import MapDemo from '../.vitepress/components/MapDemo.vue'
import MarkerPopupDemo from '../demos/marker-popup.vue'
import source from '../demos/marker-popup.vue?raw'
</script>

<DemoBlock title="Popup component demo" :source="source">
  <template #default="{ height }">

    <MapDemo :height="height">
      <MarkerPopupDemo />
    </MapDemo>

  </template>
</DemoBlock>
