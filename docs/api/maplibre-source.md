# MapLibreSource

Registers and manages a map source lifecycle.

## Props

- `id: string`
- `source: SourceSpecification` (default: empty GeoJSON feature collection)

## Emits

- `click`: emitted when clicked rendered features belong to this source.

## Slot

Default slot receives `get-source`.

## Example

<script setup lang="ts">
import DemoBlock from '../.vitepress/components/DemoBlock.vue'
import MapDemo from '../.vitepress/components/MapDemo.vue'
import GeojsonLayerDemo from '../demos/geojson-layer.vue'
import source from '../demos/geojson-layer.vue?raw'
</script>

<DemoBlock
  title="Source lifecycle demo"
  :source="source"
>
  <template #default="{ height }">
    <MapDemo :height="height">
      <GeojsonLayerDemo />
    </MapDemo>
  </template>
</DemoBlock>
