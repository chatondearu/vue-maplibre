<script setup lang="ts">
import type { MapDataEvent, Map as MapLibreMap, MapMouseEvent, SourceSpecification } from 'maplibre-gl'
import type { Ref } from 'vue'
import { inject, nextTick, onBeforeUnmount, onMounted, ref, toRefs } from 'vue'
import { useSource } from '../../composables/layerSource'

defineOptions({
  name: 'MapLibreSource',
})

// see for source properties https://maplibre.org/maplibre-style-spec/sources/
const props = withDefaults(defineProps<MapLibreSourceProps>(), {
  source: () => ({
    type: 'geojson',
    data: {
      type: 'FeatureCollection',
      features: [],
    },
  }),
})

const emit = defineEmits(['click'])

interface MapLibreSourceProps {
  id: string
  source: SourceSpecification
}

const map = inject<Ref<MapLibreMap | null>>('map', ref(null))
const ready = ref(false)
const { id } = toRefs(props)

const { removeSource, updateSource, getSource } = useSource(id)

onMounted(() => {
  updateSource(props.source)
  map.value?.on('data', onMapData)
  map.value?.on('click', onMapClick)
})

onBeforeUnmount(async () => {
  map.value?.off('data', onMapData)
  map.value?.off('click', onMapClick)
  ready.value = false
  await nextTick()
  removeSource()
})

function onMapData(event: MapDataEvent) {
  if (event.sourceId === id.value && event.isSourceLoaded) {
    ready.value = true
  }
}

function onMapClick(event: MapMouseEvent) {
  const mapRef = map.value

  if (!mapRef) {
    return
  }

  const features = mapRef
    .queryRenderedFeatures(event.point)
    .filter(feature => feature.source === id.value)

  if (features.length > 0) {
    emit('click', {
      event,
      features,
    })
  }
}
</script>

<template>
  <slot
    v-if="ready"
    :get-source="() => getSource()"
  />
</template>
