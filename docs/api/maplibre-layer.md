# MapLibreLayer

Adds a style layer to the current map and forwards layer-level interaction events.

## Props

- `id: string`
- `type?: 'fill' | 'line' | 'symbol' | 'circle' | 'heatmap' | 'fill-extrusion' | 'raster' | 'hillshade' | 'background'` (default: `fill`)
- `source?: string` (falls back to `id`)
- `sourceLayer?: string`
- `beforeId?: string`
- `layout?: object`
- `paint?: Painter`
- `filter?: FilterSpecification`
- `minzoom?: number` (default: `0`)
- `maxzoom?: number` (default: `24`)
- `metadata?: object`
- `images?: object` (name/src map loaded before layer creation)

## Emits

- `ready`
- `click`
- `mousemove`
- `mouseenter`
- `mouseleave`

## Slot

Default slot receives `get-layer`.

## Example

```vue
<MapLibreLayer
  id="roads"
  type="line"
  source="roads-source"
  :paint="{
    'line-color': '#2563eb',
    'line-width': 2,
  }"
/>
```
