<script setup lang="ts">
import type { AddLayerObject, FilterSpecification, Map, MapLayerMouseEvent, Painter, StyleImage } from 'maplibre-gl'
import { inject, onBeforeUnmount, onMounted, reactive, ref, Ref, toRefs, watch } from 'vue';
import { whenever } from '@vueuse/core';
import { loadImage } from '~/utils/image';

defineOptions({
  name: 'MapLibreLayer',
})

// Layer properties https://maplibre.org/maplibre-style-spec/layers/
const props = withDefaults(defineProps<MapLibreLayerProps>(), {
  type: 'fill',
  maxzoom: 24,
  minzoom: 0,
  beforeId: undefined,
  filter: undefined,
  paint: undefined,
})

const emit = defineEmits([
  'ready',
  'click',
  'mousemove',
  'mouseenter',
  'mouseleave',
])

interface MapLibreLayerProps {
  id: string
  beforeId?: string
  type?: 'fill' | 'line' | 'symbol' | 'circle' | 'heatmap' | 'fill-extrusion' | 'raster' | 'hillshade' | 'background'
  layout?: object
  filter?: FilterSpecification
  maxzoom?: number
  minzoom?: number
  metadata?: object
  paint?: Painter
  source?: string
  sourceLayer?: string
  selectedFeatures?: string[]
  images?: object
}

const map = inject<Ref<Map | null>>('map', ref(null))

const onClick = (event: MapLayerMouseEvent, ...args: any[]) => emit('click', event, ...args)
const onMouseMove = (event: MapLayerMouseEvent, ...args: any[]) => emit('mousemove', event, ...args)
const onMouseEnter = (event: MapLayerMouseEvent, ...args: any[]) => emit('mouseenter', event, ...args)
const onMouseLeave = (event: MapLayerMouseEvent, ...args: any[]) => emit('mouseleave', event, ...args)

const {
  id,
  beforeId,
  type,
  layout,
  filter,
  maxzoom,
  minzoom,
  metadata,
  paint,
  source,
  sourceLayer,
} = toRefs(props)

const ready = ref(false)

const layerOptions = reactive({
  id,
  beforeId,
  type,
  layout,
  filter,
  maxzoom,
  minzoom,
  metadata,
  paint,
  'source': source || id,
  'source-layer': sourceLayer,
})

watch([maxzoom, minzoom], ([maxzoom, minzoom]) =>
  map.value?.setLayerZoomRange(id.value, maxzoom, minzoom))

whenever(beforeId, beforeId => map.value?.moveLayer(id.value, beforeId))

whenever(filter, filter => map.value?.setFilter(id.value, filter))

whenever(paint, (paint) => {
  Object.entries(paint).forEach(([propertyName, value]) => {
    map.value?.setPaintProperty(id.value, propertyName, value)
  })
})

onMounted(async () => {
  const mapRef = map.value
  const layerId = id.value

  if (props.images) {
    for (const img of Object.entries(props.images)) {
      const [name, src] = img
      await addImageToMap(name, src)
    }
  }

  setLayer()

  mapRef?.on('click', layerId, onClick)
  mapRef?.on('mousemove', layerId, onMouseMove)
  mapRef?.on('mouseenter', layerId, onMouseEnter)
  mapRef?.on('mouseleave', layerId, onMouseLeave)

  ready.value = true
  emit('ready')
})

onBeforeUnmount(() => {
  const mapRef = map.value
  const layerId = id.value

  mapRef?.off('click', layerId, onClick)
  mapRef?.off('mousemove', layerId, onMouseMove)
  mapRef?.off('mouseenter', layerId, onMouseEnter)
  mapRef?.off('mouseleave', layerId, onMouseLeave)
  removeLayer()
})

async function addImageToMap(name: string, src: string): Promise<HTMLImageElement | StyleImage | null> {
  const mapRef = map.value

  if (!mapRef) {
    return null
  }

  const previusImg = mapRef.getImage(name)

  if (previusImg) {
    return previusImg
  }

  try {
    const image = await loadImage({ src }) as HTMLImageElement

    mapRef.addImage(name, image)
    return image
  } catch (e) {
    console.warn('cannot load image to map', name, e)
    return null
  }
}

function removeLayer() {
  if (getLayer()) {
    map.value?.removeLayer(id.value)
  }
}

function setLayer() {
  map.value?.addLayer(
    Object.entries(layerOptions).reduce((acc, [key, value]) => {
      if (typeof value !== 'undefined' && value !== null) {
        acc[key] = value
      }

      return acc
    }, {} as { [key: string]: any }) as AddLayerObject,
  )
}

function getLayer() {
  return map.value?.getLayer(id.value)
}
</script>

<template>
  <slot v-if="ready" :get-layer="() => getLayer()" />
</template>
