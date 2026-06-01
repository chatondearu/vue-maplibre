import { defineConfig } from 'vitepress'

export default defineConfig({
  title: 'vue-maplibre',
  description: 'Vue 3 components for MapLibre GL',
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
