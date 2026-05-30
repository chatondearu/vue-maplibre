<script setup lang="ts">
import { whenever } from '@vueuse/core'
import type { Map, MarkerOptions } from 'maplibre-gl'
import { LngLat, Marker } from 'maplibre-gl'
import { inject, onMounted, onUnmounted, provide, ref, type Ref, toRefs, watch } from 'vue'

defineOptions({
  name: 'MapLibreMarker',
})

interface MapLibreMarkerProps {
  lngLat: LngLat | [number, number] | { lng: number; lat: number }
  anchor?: 'center' | 'top' | 'bottom' | 'left' | 'right' | 'top-left' | 'top-right' | 'bottom-left' | 'bottom-right'
  zIndex?: number
  offset?: [number, number] | { x: number; y: number }
  draggable?: boolean
  clickTolerance?: number
  rotation?: number
  pitchAlignment?: 'auto' | 'map' | 'viewport'
  rotationAlignment?: 'auto' | 'map' | 'viewport'
}

const props = withDefaults(defineProps<MapLibreMarkerProps>(), {
  anchor: 'center',
  zIndex: 0,
  offset: () => [0, 0],
  draggable: false,
  clickTolerance: 3,
  rotation: 0,
  pitchAlignment: 'auto',
  rotationAlignment: 'auto',
})

const emit = defineEmits(['click', 'mouseenter', 'mouseleave'])
const {
  lngLat,
  anchor,
  offset,
  draggable,
  clickTolerance,
  rotation,
  pitchAlignment,
  rotationAlignment,
} = toRefs(props)

const map = inject<Ref<Map | null>>('map', ref(null))
const marker = ref<Marker | null>(null)
const element = ref<HTMLElement | null>(null)

onMounted(() => {
  const el = element.value

  if (el) {
    initMarker(el)
  }
})

function initMarker(el: HTMLElement) {
  const mapRef = map.value

  if (!mapRef) {
    return
  }

  if (marker.value) {
    marker.value.remove()
  }

  el.style.zIndex = String(props.zIndex)

  const markerOptions: MarkerOptions = {
    anchor: anchor.value,
    offset: offset.value,
    draggable: draggable.value,
    clickTolerance: clickTolerance.value,
    rotation: rotation.value,
    pitchAlignment: pitchAlignment.value,
    rotationAlignment: rotationAlignment.value,
    element: el,
  }

  const markerInstance = new Marker(markerOptions)
    .setLngLat(lngLat.value)
    .addTo(mapRef)

  el.addEventListener('click', onClick)
  el.addEventListener('mouseenter', onMouseEnter)
  el.addEventListener('mouseleave', onMouseLeave)

  marker.value = markerInstance
}

whenever(element, initMarker)

watch(lngLat, lngLat => marker.value?.setLngLat(lngLat))
watch(draggable, draggable => marker.value?.setDraggable(draggable))
watch(rotation, rotation => marker.value?.setRotation(rotation))

onUnmounted(() => {
  const el = element.value
  el?.removeEventListener('click', onClick)
  el?.removeEventListener('mouseenter', onMouseEnter)
  el?.removeEventListener('mouseleave', onMouseLeave)

  marker.value?.remove()
})

function onClick() {
  emit('click', marker.value)
}
function onMouseEnter() {
  emit('mouseenter', marker.value)
}
function onMouseLeave() {
  emit('mouseleave', marker.value)
}

provide('marker', marker)
</script>

<template>
  <div ref="element">
    <slot name="element">
      <div class="h-2 w-2 bg-red-500" />
    </slot>
  </div>
  <slot v-if="marker" :marker="marker" />
</template>
