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

```vue
<MapLibreMarker
  :lng-lat="[2.3522, 48.8566]"
  @click="(marker) => console.log(marker)"
>
  <template #element>
    <div class="h-3 w-3 rounded-full bg-red-500" />
  </template>
</MapLibreMarker>
```
