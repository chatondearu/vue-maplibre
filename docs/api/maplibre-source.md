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

```vue
<MapLibreSource
  id="cities"
  :source="{
    type: 'geojson',
    data: geojson,
  }"
>
  <MapLibreLayer
    id="cities-circle"
    type="circle"
    source="cities"
  />
</MapLibreSource>
```
