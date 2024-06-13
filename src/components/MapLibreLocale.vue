<script setup lang="ts">
import { whenever } from '@vueuse/core';
import type { Map } from 'maplibre-gl'
import { inject, Ref } from 'vue';

defineOptions({
  name: 'MapLibreLocale',
})

const { locale } = useI18n()
const map = inject<Ref<Map>>('map')

function updateTextFieldsInLayers(map: Map, locale: string) {
  // Update the text-field property of all symbol layers
  map.getStyle().layers.forEach((layer) => {
    if (layer.type === 'symbol') {
      const layerTextFieldProp = map.getLayoutProperty(layer.id, 'text-field')

      if (layerTextFieldProp[0] === 'coalesce' || layerTextFieldProp[0] === 'get') {
        // check if the text-field property is already a coalesce or a simple get function
        // and add the locale to a new coalesce function

        const newLocaleProp = [
          [
            'get',
            `name_${locale}`, // e.g. name_en-US, name_fr
          ],
        ]

        if (locale.includes('-')) {
          // if the locale is a language-region code, try to fallback to the language code
          const languageCode = locale.split('-')[0]
          newLocaleProp.push([
            'get',
            `name_${languageCode}`, // e.g. name_en, name_fr
          ])
        }

        map.setLayoutProperty(layer.id, 'text-field', [
          'coalesce',
          ...newLocaleProp,
          [
            'get',
            'name_en',
          ],
          [
            'get',
            'name',
          ],
        ])
      }
    }
  })
}

if (map) {
  whenever(map, (map) => {
    // Add RTL support if you want to support Arabic
    // mapboxgl.setRTLTextPlugin('https://api.mapbox.com/mapbox-gl-js/plugins/mapbox-gl-rtl-text/v0.10.1/mapbox-gl-rtl-text.js');

    updateTextFieldsInLayers(map, locale.value)
  })
}

whenever(locale, (locale) => {
  if (!map) {
    return
  }

  updateTextFieldsInLayers(map.value, locale)
})
</script>

<template>
  <slot />
</template>
