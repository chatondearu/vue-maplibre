# MapLibreNavigationControl

Wraps `maplibre-gl` `NavigationControl`.

## Props

- `showCompass?: boolean` (default: `true`)
- `showZoom?: boolean` (default: `true`)
- `visualizePitch?: boolean`
- `position?: 'top-left' | 'top-right' | 'bottom-left' | 'bottom-right'` (default: `top-right`)

## Emits

No custom emit.

## Example

```vue
<MapLibre>
  <MapLibreNavigationControl
    position="top-right"
    :show-compass="true"
    :show-zoom="true"
  />
</MapLibre>
```
