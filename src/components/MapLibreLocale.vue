<script setup lang="ts">
import type { ExpressionSpecification, FormattedSpecification, Map, PropertyValueSpecification } from 'maplibre-gl'
import type { Ref } from 'vue'
import { inject, onBeforeUnmount, ref, watch } from 'vue'

defineOptions({
  name: 'MapLibreLocale',
})

const map = inject<Ref<Map | null>>('map', ref(null))
const locale = ref(getDefaultLocale())

function updateTextFieldsInLayers(map: Map, locale: string) {
  // Update the text-field property of all symbol layers
  const layers = map.getStyle().layers ?? []

  layers.forEach((layer) => {
    if (layer.type === 'symbol') {
      const layerTextFieldProp = map.getLayoutProperty(layer.id, 'text-field')

      if (isExpressionLayoutProperty(layerTextFieldProp)) {
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

watch([map, locale], ([mapRef, localeRef]) => {
  if (!mapRef) {
    return
  }

  updateTextFieldsInLayers(mapRef, localeRef)
}, { immediate: true })

if (typeof window !== 'undefined') {
  window.addEventListener('languagechange', updateLocale)
}

onBeforeUnmount(() => {
  if (typeof window !== 'undefined') {
    window.removeEventListener('languagechange', updateLocale)
  }
})

function getDefaultLocale() {
  if (typeof navigator !== 'undefined' && navigator.language) {
    return navigator.language
  }

  return 'en'
}

function updateLocale() {
  locale.value = getDefaultLocale()
}

function isExpressionLayoutProperty(
  value: PropertyValueSpecification<FormattedSpecification> | undefined,
): value is ExpressionSpecification {
  return Array.isArray(value) && (value[0] === 'coalesce' || value[0] === 'get')
}
</script>

<template>
  <slot />
</template>
