<script setup>
import { MapboxLayer } from '@deck.gl/mapbox'
import { FlowmapLayer } from '@fluctuo/layers'

defineOptions({
  name: 'FlowMapLayer',
})

const props = defineProps({
  id: {
    type: String,
    default: 'flowmap-layer',
  },
  data: {
    type: Object,
    default: () => ({ locations: [], flows: [] }),
  },
  filter: {
    type: Object,
    default: () => ({}),
  },
  darkMode: Boolean,
  opacity: { type: Number, default: 1 },
  colorScheme: { type: [String, Array], default: 'YlOrRd' },
  highlightColor: { type: String, default: '#325858' },
  animationEnabled: { type: Boolean, default: false },
  adaptiveScalesEnabled: { type: Boolean, default: true },
  locationTotalsEnabled: { type: Boolean, default: true },
  locationLabelsEnabled: { type: Boolean, default: false },
  maxTopFlowsDisplayNum: { type: Number, default: 1500 },
  fadeEnabled: { type: Boolean, default: false },
  fadeOpacityEnabled: { type: Boolean, default: true },
  fadeAmount: { type: Number, default: 30 },
  clusteringEnabled: { type: Boolean, default: false },
  clusteringMethod: { type: String, default: 'HCA' },
  clusteringAuto: { type: Boolean, default: true },
  clusteringLevel: { type: Number, default: 5 },
})
const emit = defineEmits(['hover', 'click'])

const {
  id,
  data,
  filter,
  darkMode,
  opacity,
  colorScheme,
  highlightColor,
  animationEnabled,
  adaptiveScalesEnabled,
  locationTotalsEnabled,
  locationLabelsEnabled,
  maxTopFlowsDisplayNum,
  fadeEnabled,
  fadeOpacityEnabled,
  fadeAmount,
  clusteringEnabled,
  clusteringMethod,
  clusteringAuto,
  clusteringLevel,
} = toRefs(props)

const options = reactive({
  darkMode,
  opacity,
  colorScheme,
  highlightColor,
  animationEnabled,
  adaptiveScalesEnabled,
  locationTotalsEnabled,
  locationLabelsEnabled,
  maxTopFlowsDisplayNum,
  fadeEnabled,
  fadeOpacityEnabled,
  fadeAmount,
  clusteringEnabled,
  clusteringMethod,
  clusteringAuto,
  clusteringLevel,
})

const map = inject('map', ref(null))
const flowmap = ref(null)

onMounted(() => {
  const layer = new MapboxLayer({
    id: id.value,
    type: FlowmapLayer,
    data: data.value,
    filter: filter.value,
    ...unref(options),
    pickable: true,
    getFlowColor: flow => flow.color,
    getLocationId: loc => loc.id,
    getLocationLat: loc => loc.lat,
    getLocationLon: loc => loc.lon,
    getFlowOriginId: flow => flow.origin,
    getFlowDestId: flow => flow.dest,
    getFlowMagnitude: flow => flow.count,
    getLocationName: loc => loc.name,
    getLocationCentroid: loc => [loc.lon, loc.lat],
    onHover: info => emit('hover', info),
    onClick: info => emit('click', info),
  })

  map.value.addLayer(layer)
  flowmap.value = layer
})

whenever([data, filter, options], ([data, filter, options]) => {
  flowmap.value?.setProps({
    data,
    filter,
    ...options,
  })
})

onBeforeUnmount(() => {
  map.value.removeLayer(id.value)
})
</script>

<template>
  <slot />
</template>
