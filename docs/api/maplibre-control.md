# MapLibreControl

Wraps a custom MapLibre control container so you can render Vue content in control zones.

## Props

- `position?: 'top-left' | 'top-right' | 'bottom-left' | 'bottom-right'` (default: `top-right`)
- `noStyle?: boolean` (default: `false`)

## Emits

No custom emit.

## Slot

Default slot is rendered inside the control container.

## Example

```vue
<MapLibre>
  <MapLibreControl position="top-left">
    <button type="button">
      Center map
    </button>
  </MapLibreControl>
</MapLibre>
```
