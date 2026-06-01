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

```vue
<MapLibrePopup
  :lng-lat="[2.3522, 48.8566]"
  text="Paris"
/>
```
