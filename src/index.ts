import type { Plugin } from 'vue'
import { defaultMapLibreConfig } from '@/utils'
import type { MapLibreConfig } from '@/utils'

import MapLibre from '@/components/MapLibre.vue'

export default {
  install: (app, options: MapLibreConfig) => {
    const maplibreConfig = {
      ...defaultMapLibreConfig,
      ...options,
    }

    app.config.globalProperties.maplibre = maplibreConfig
    app.provide('maplibre', maplibreConfig)
  },
} as Plugin

export {
  MapLibre,
}