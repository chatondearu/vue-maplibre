<script setup lang="ts">
import { whenever } from '@vueuse/core'
import { LngLat, Marker } from 'maplibre-gl'
import { inject, onMounted, onUnmounted, provide, reactive, ref, toRefs, watch } from 'vue'

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

const options = reactive({
  anchor,
  offset,
  draggable,
  clickTolerance,
  rotation,
  pitchAlignment,
  rotationAlignment,
})

const map = inject('map', ref(null))
const marker = ref()
const element = ref()

onMounted(() => {
  const el = element.value

  if (el) {
    initMarker(el)
  }
})

function initMarker(el) {
  if (marker.value) {
    marker.value.remove()
  }

  el.style.zIndex = props.zIndex

  const markerInstance = new Marker({
    ...options,
    element: el,
  })
    .setLngLat(lngLat.value)
    .addTo(map.value)

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
  <div v-if="$slots.element" ref="element">
    <slot name="element">
      <div class="h-2 w-2 bg-red-500" />
    </slot>
  </div>
  <slot v-if="marker" :marker="marker" />
</template>
