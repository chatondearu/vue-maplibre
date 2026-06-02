import { defineConfig } from 'vitepress'
import { fileURLToPath, URL } from 'node:url'

export default defineConfig({
  title: 'vue-maplibre',
  description: 'Vue 3 components for MapLibre GL',
  base: '/vue-maplibre/',
  vite: {
    resolve: {
      alias: {
        'vue-maplibre': fileURLToPath(new URL('../../src/index.ts', import.meta.url)),
      },
    },
  },
  themeConfig: {
    nav: [
      { text: 'Guide', link: '/guide/getting-started' },
      { text: 'API', link: '/api/components' },
      { text: 'Examples', link: '/examples/basic-map' },
    ],
    sidebar: [
      {
        text: 'Guide',
        items: [
          { text: 'Getting Started', link: '/guide/getting-started' },
          { text: 'Plugin Config', link: '/guide/plugin-config' },
        ],
      },
      {
        text: 'API',
        items: [
          { text: 'Components Overview', link: '/api/components' },
          { text: 'MapLibre', link: '/api/maplibre' },
          { text: 'MapLibreControl', link: '/api/maplibre-control' },
          { text: 'MapLibreLayer', link: '/api/maplibre-layer' },
          { text: 'MapLibreLocale', link: '/api/maplibre-locale' },
          { text: 'MapLibreMarker', link: '/api/maplibre-marker' },
          { text: 'MapLibreNavigationControl', link: '/api/maplibre-navigation-control' },
          { text: 'MapLibrePopup', link: '/api/maplibre-popup' },
          { text: 'MapLibreSource', link: '/api/maplibre-source' },
          { text: 'MapLibreSourceGeojson', link: '/api/maplibre-source-geojson' },
        ],
      },
      {
        text: 'Examples',
        items: [
          { text: 'Basic Map', link: '/examples/basic-map' },
          { text: 'GeoJSON Layer', link: '/examples/geojson-layer' },
          { text: 'Marker and Popup', link: '/examples/marker-popup' },
        ],
      },
    ],
  },
})
