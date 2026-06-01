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

```vue
<MapLibreSourceGeojson
  id="cities"
  :data="geojson"
  :layer-props="{
    id: 'cities-circle',
    type: 'circle',
    paint: {
      'circle-radius': 5,
      'circle-color': '#2563eb'
    }
  }"
  @click="(event) => console.log(event)"
/>
```
