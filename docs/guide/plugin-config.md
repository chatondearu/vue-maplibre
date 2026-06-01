# Plugin Config

`app.use(VueMapLibre, config)` accepts `MapLibreConfig`.

## Type

```ts
interface MapLibreConfig {
  i18n?: boolean
  style: string
}
```

## Defaults

- `i18n: false`
- `style: https://basemaps.cartocdn.com/gl/positron-gl-style/style.json`

## Notes

- `i18n` enables `MapLibreLocale` behavior when the component is mounted.
- Mapbox URL transformations use `VITE_MAPBOX_TOKEN` when the style references Mapbox URLs.
