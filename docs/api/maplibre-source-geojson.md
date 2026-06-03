# MapLibreSourceGeojson

High-level helper around `MapLibreSource` + `MapLibreLayer` for GeoJSON data.

## Props

| Prop               | Type                                           | Notes                                            |
| ------------------ | ---------------------------------------------- | ------------------------------------------------ |
| `id`               | `string`                                       | Source id                                        |
| `data`             | `string \| GeoJSON.FeatureCollection`          | GeoJSON source payload                           |
| `layerProps`       | `Layer \| Layer[]`                             | Layer definition(s) forwarded to `MapLibreLayer` |
| `geojsonOptions`   | `{ promoteId?, generateId? }`                  | Source options                                   |
| `clusterOptions`   | `{ cluster, clusterRadius?, clusterMaxZoom? }` | Runtime cluster options                          |
| `selectedFeatures` | `string[] \| null`                             | Applied through feature state                    |
| `spiderify`        | `string[] \| boolean \| null`                  | Layer filtering for spiderfy                     |
| `spiderifyOptions` | `object`                                       | Passed to spiderfy plugin                        |

## Emits

- `ready`
- `click`
- `mousemove`
- `highlight`
- `unhighlight`

## Slot payload

The default slot exposes:

- `get-source`
- `get-layer`
- `clusters`
- `features`
- `on-click`
- `on-mouse-move`
- `on-mouse-leave`

## Example

<script setup lang="ts">
import DemoBlock from '../.vitepress/components/DemoBlock.vue'
import MapDemo from '../.vitepress/components/MapDemo.vue'
import GeojsonLayerDemo from '../demos/geojson-layer.vue'
import source from '../demos/geojson-layer.vue?raw'
</script>

<DemoBlock
title="GeoJSON source helper demo"
:source="source"

> <template #default="{ height }">

    <MapDemo :height="height">
      <GeojsonLayerDemo />
    </MapDemo>

  </template>
</DemoBlock>
