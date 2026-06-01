<script setup lang="ts">
import {
  isMapboxURL,
  transformMapboxUrl,
} from 'maplibregl-mapbox-request-transformer'
import type { LngLatBoundsLike, LngLatLike, MapLibreEvent, MapMouseEvent } from 'maplibre-gl'
import { Map } from 'maplibre-gl'
import { computed, inject, onBeforeUnmount, onMounted, provide, ref, toRefs, watch } from 'vue'
import { whenever } from '@vueuse/core'
import { defaultMapLibreConfig } from '../utils'
import type { MapLibreConfig } from '../utils'

import MapLibreLocale from './MapLibreLocale.vue'

defineOptions({
  name: 'MapLibre',
})

const props = withDefaults(defineProps<MapLibreProps>(), {
  center: () => [10, 50],
  bounds: undefined,
  zoom: 4,
  maxZoom: 7,
  minZoom: 3,
})

const emit = defineEmits(['ready', 'move', 'zoomend', 'click'])

const maplibreConfig = inject<MapLibreConfig>('maplibre', defaultMapLibreConfig)

interface MapLibreProps {
  center?: LngLatLike
  zoom?: number
  maxZoom?: number
  minZoom?: number
  bounds?: LngLatBoundsLike
  doubleClickZoom?: boolean
  zoomControl?: boolean
  i18n?: boolean
}

const { center, zoom, maxZoom, minZoom, bounds, doubleClickZoom }
  = toRefs(props)

const map = ref<Map | null>(null)
const container = ref<HTMLElement | null>(null)
const showI18n = computed(() => props.i18n || maplibreConfig.i18n)

// https://github.com/rowanwins/maplibregl-mapbox-request-transformer
function transformRequest(url = '', resourceType = '') {
  if (isMapboxURL(url)) {
    return transformMapboxUrl(
      url,
      resourceType,
      import.meta.env.VITE_MAPBOX_TOKEN,
    )
  }

  return { url }
}

onMounted(() => {
  const containerRef = container.value

  if (!containerRef) {
    return
  }

  const mapInstance = new Map({
    container: containerRef,
    style: maplibreConfig.style,
    transformRequest,
    center: center.value,
    zoom: zoom.value,
    minZoom: minZoom.value,
    maxZoom: maxZoom.value,
    bounds: bounds.value,
  })

  mapInstance.on('load', () => {
    map.value = mapInstance
    mapInstance.on('move', onMove)
    mapInstance.on('zoomend', onZoomEnd)
    mapInstance.on('click', onClick)
    emit('ready', mapInstance)
  })
})

onBeforeUnmount(() => {
  const mapInstance = map.value

  if (!mapInstance) {
    return
  }

  mapInstance.off('move', onMove)
  mapInstance.off('zoomend', onZoomEnd)
  mapInstance.off('click', onClick)
  mapInstance.remove()
  map.value = null
})

function onMove(event: MapLibreEvent) {
  const mapInstance = map.value

  if (!mapInstance) {
    return
  }

  emit('move', {
    event,
    center: mapInstance.getCenter(),
    map: mapInstance,
  })
}

function onZoomEnd(event: MapLibreEvent) {
  const mapInstance = map.value

  if (!mapInstance) {
    return
  }

  emit('zoomend', {
    event,
    zoom: mapInstance.getZoom(),
    bounds: mapInstance.getBounds(),
    map: mapInstance,
  })
}

function onClick(event: MapMouseEvent) {
  const mapInstance = map.value

  if (!mapInstance) {
    return
  }

  emit('click', {
    event,
    lngLat: event.lngLat,
    map: mapInstance,
  })
}

watch(doubleClickZoom, (doubleClickZoom) => {
  if (doubleClickZoom == null) {
    return
  }

  if (doubleClickZoom) {
    map.value?.doubleClickZoom.enable()
  } else {
    map.value?.doubleClickZoom.disable()
  }
})

whenever(bounds, (bounds) => {
  map.value?.fitBounds(bounds)
})

whenever(center, (center) => {
  map.value?.setCenter(center)
})

whenever(zoom, (zoom) => {
  map.value?.setZoom(zoom)
})

provide('map', map)
</script>

<template>
  <div
    ref="container"
    class="relative h-full w-full flex-1"
  >
    <MapLibreLocale v-if="showI18n" />
    <slot
      v-if="map"
      :map="map"
    />
  </div>
</template>

<style>
@import 'maplibre-gl/dist/maplibre-gl.css';

.mapboxgl-ctrl-bottom-left,
.mapboxgl-ctrl-bottom-right,
.mapboxgl-ctrl-top-left,
.mapboxgl-ctrl-top-right,
.maplibregl-ctrl-bottom-left,
.maplibregl-ctrl-bottom-right,
.maplibregl-ctrl-top-left,
.maplibregl-ctrl-top-right {
  pointer-events: all;
}
</style>
