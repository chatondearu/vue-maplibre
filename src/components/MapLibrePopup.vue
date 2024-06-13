<script setup lang="ts">
import type { GeoJSONFeature, LngLatLike, Map, MapLayerMouseEvent, Marker, Offset, PositionAnchor } from 'maplibre-gl'
import { Popup } from 'maplibre-gl'
import { inject, onMounted, onUnmounted, reactive, Ref, ref, toRefs, type PropType } from 'vue'
import { whenever } from '@vueuse/core'

defineOptions({
  name: 'MapLibrePopup',
})

const props = defineProps({
  lngLat: {
    type: [Array, Object] as PropType<LngLatLike>,
    default: null,
  },
  text: {
    type: String,
    default: null,
  },
  anchor: {
    type: String as PropType<PositionAnchor>,
    default: null,
    validator: (value: string) =>
      [
        'center',
        'top',
        'bottom',
        'left',
        'right',
        'top-left',
        'top-right',
        'bottom-left',
        'bottom-right',
      ].includes(value),
  },
  offset: {
    type: [Array, Object, Number] as PropType<Offset>,
    default: () => [0, 0],
  },
  className: {
    type: String,
    default: null,
  },
  maxWidth: {
    type: String,
    default: '240px',
  },
  closeButton: Boolean,
  closeOnClick: Boolean,
  closeOnMove: Boolean,
  focusAfterOpen: Boolean,
  layerId: {
    type: String,
    default: null,
  },
})

// const emit = defineEmits(['click'])
const {
  lngLat,
  text,
  anchor,
  offset,
  className,
  maxWidth,
  closeButton,
  closeOnClick,
  closeOnMove,
  focusAfterOpen,
} = toRefs(props)

const popup = ref()
const element = ref()
const highlighted = ref<GeoJSONFeature | null>(null)

const options = reactive({
  anchor,
  offset,
  className,
  maxWidth,
  closeButton,
  closeOnClick,
  closeOnMove,
  focusAfterOpen,
})

const map = inject<Ref<Map | null>>('map', ref(null))
const marker = inject<Ref<Marker | null>>('marker', ref(null))

whenever(lngLat, (lngLat) => {
  popup.value?.setLngLat(lngLat)
})

onMounted(() => {
  const popupInstance = new Popup(options)
  const mapRef = map.value

  if (text.value) {
    popupInstance.setText(text.value)
  } else if (element.value) {
    popupInstance.setDOMContent(element.value)
  }

  if (lngLat.value) {
    popupInstance.setLngLat(lngLat.value)
  }

  if (!mapRef) {
    return
  }

  const markerRef = marker.value

  if (markerRef) {
    markerRef.setPopup(popupInstance)
  } else {
    popupInstance.addTo(mapRef)

    if (props.layerId) {
      mapRef.on('mousemove', props.layerId, onMouseMove)
      mapRef.on('mouseleave', props.layerId, unsetHiglitedFeature)
    }
  }

  popup.value = popupInstance
})

onUnmounted(() => {
  const mapRef = map.value
  popup.value?.remove()

  if (mapRef && props.layerId) {
    mapRef.off('mousemove', props.layerId, onMouseMove)
    mapRef.off('mouseleave', props.layerId, unsetHiglitedFeature)
  }
})

function onMouseMove(event: MapLayerMouseEvent) {
  popup.value.setLngLat(event.lngLat)

  if (props.layerId && event.features?.length) {
    const feature = event.features[0]
    const newFeatureId = event.features[0].id
    const highlightedFeatureId = highlighted.value?.id

    if (newFeatureId !== highlightedFeatureId) {
      unsetHiglitedFeature()
      setHiglitedFeature(feature)
    }
  }
}

function unsetHiglitedFeature() {
  const mapRef = map.value

  highlighted.value = null
  popup.value.remove()

  if (mapRef) {
    mapRef.getCanvas().style.cursor = ''
  }
}

function setHiglitedFeature(feature: GeoJSONFeature) {
  const mapRef = map.value

  highlighted.value = feature

  if (mapRef) {
    popup.value.addTo(mapRef)
    mapRef.getCanvas().style.cursor = 'pointer'
  }
}
</script>

<template>
  <div v-if="$slots.element" ref="element">
    <slot name="element" :feature="highlighted" />
  </div>
  <slot :popup="popup" />
</template>

<style lang="pcss">
.maplibregl-popup {
  @apply z-popup;

  .maplibregl-popup-content {
    @apply !bg-white/90 !rounded-md !text-gray-600 !px-3 !py-2 !text-base;
  }

  &.maplibregl-popup-anchor-left {
    .maplibregl-popup-tip {
      @apply !border-r-white/90 border-4;
    }
  }

  &.maplibregl-popup-anchor-right {
    .maplibregl-popup-tip {
      @apply !border-l-white/90 border-4;
    }
  }
}
</style>
