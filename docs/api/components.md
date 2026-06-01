# Components API overview

## Exported components

- [`MapLibre`](/api/maplibre)
- [`MapLibreControl`](/api/maplibre-control)
- [`MapLibreLayer`](/api/maplibre-layer)
- [`MapLibreLocale`](/api/maplibre-locale)
- [`MapLibreMarker`](/api/maplibre-marker)
- [`MapLibreNavigationControl`](/api/maplibre-navigation-control)
- [`MapLibrePopup`](/api/maplibre-popup)
- [`MapLibreSource`](/api/maplibre-source)
- [`MapLibreSourceGeojson`](/api/maplibre-source-geojson)

## Composition model

`MapLibre` provides a `map` ref through Vue provide/inject.

Children consume the map instance and register behavior:

- source lifecycle: `MapLibreSource`
- layer lifecycle and layer events: `MapLibreLayer`
- higher-level GeoJSON utilities: `MapLibreSourceGeojson`
- markers/popups/controls: dedicated wrappers

## Event strategy

Most components forward MapLibre events through Vue emits and include map-related payloads.

See detailed pages:

- [MapLibre](/api/maplibre)
- [MapLibreControl](/api/maplibre-control)
- [MapLibreLayer](/api/maplibre-layer)
- [MapLibreLocale](/api/maplibre-locale)
- [MapLibreMarker](/api/maplibre-marker)
- [MapLibreNavigationControl](/api/maplibre-navigation-control)
- [MapLibrePopup](/api/maplibre-popup)
- [MapLibreSource](/api/maplibre-source)
- [MapLibreSourceGeojson](/api/maplibre-source-geojson)
