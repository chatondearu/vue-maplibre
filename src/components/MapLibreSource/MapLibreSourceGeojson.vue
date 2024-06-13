<script setup lang="ts">
import Spiderfy from '@nazka/map-gl-js-spiderfy'

import type { GeoJSONFeature, Map, MapLayerMouseEvent, MapMouseEvent } from 'maplibre-gl'
import { useSource } from '@/composables/layerSource'
import { computed, inject, onBeforeUnmount, onMounted, Ref, ref, shallowRef, toRefs, watch } from 'vue';
import { whenever } from '@vueuse/core';

defineOptions({
  name: 'MapLibreSourceGeojson',
})

// Layer properties https://maplibre.org/maplibre-style-spec/layers/
const props = withDefaults(defineProps<MapLibreSourceGeojsonProps>(), {
  geojsonOptions: () => ({
    generateId: true,
  }),
  clusterOptions: () => ({
    cluster: false,
  }),
  spiderify: false,
  selectedFeatures: null,
})

const emit = defineEmits([
  'ready',
  'click',
  'mousemove',
  'highlight',
  'unhighlight',
])

type Layer = Record<string, any>

interface MapLibreSourceGeojsonProps {
  id: string
  data: string | GeoJSON.FeatureCollection
  layerProps?: Layer | Layer[]
  geojsonOptions?: {
    promoteId?: string
    generateId?: boolean
  }
  clusterOptions?: {
    cluster: boolean
    clusterRadius?: number
    clusterMaxZoom?: number
  }
  selectedFeatures?: string[] | null
  spiderify?: string[] | boolean | null
  spiderifyOptions?: object
}

const { id, data, spiderify, spiderifyOptions, clusterOptions } = toRefs(props)

const ready = ref(false)
const highlighted = ref<string | null>(null)
const features = shallowRef<GeoJSON.Feature[]>([])
const clusters = shallowRef<object[]>([])

const map = inject<Ref<Map | null>>('map', ref(null))
const spider = ref<Spiderfy | null>(null)

const layers = computed(() => {
  const layers = props.layerProps
  return Array.isArray(layers) ? layers : [layers]
})

const { getSource } = useSource(id)

whenever(data, (data) => {
  getSource()?.setData(data)
})
whenever(clusterOptions, (clusterOptions) => {
  getSource()?.setClusterOptions(clusterOptions)
})

// Set selected features for higlighting
watch([() => props.selectedFeatures, ready], ([selectedFeatures, ready]) => {
  if (selectedFeatures && ready) {
    const mapRef = map.value
    const sourceId = id.value

    if (mapRef && sourceId) {
      const features = mapRef.querySourceFeatures(sourceId, {
        filter: ['has', 'selected'],
      })

      features.forEach((feature) => {
        mapRef.removeFeatureState(
          {
            source: sourceId,
            id: feature.id,
          },
          'selected',
        )
      })

      selectedFeatures.forEach((featureId) => {
        mapRef.setFeatureState(
          {
            source: sourceId,
            id: featureId,
          },
          { selected: true },
        )
      })
    }
  }
})

onMounted(() => {
  // Set cluster options and add spiderfy
  const mapRef = map.value

  if (clusterOptions.value && mapRef) {
    mapRef.on('data', (e) => {
      const idRef = id.value

      if ('sourceId' in e && e.sourceId === idRef && 'isSourceLoaded' in e && e.isSourceLoaded) {
        if (spiderify.value) {
          spider.value = new Spiderfy(mapRef, {
            ...spiderifyOptions.value,
          })
        }

        if (!ready.value) {
          mapRef.on('zoomend', updateCluster)
        }

        ready.value = true
        updateCluster()
      }
    })
  } else {
    ready.value = true
  }
})

onBeforeUnmount(() => {
  if (clusterOptions.value) {
    map.value?.off('zoomend', updateCluster)
  }

  if (spider.value) {
    spider.value?.unspiderfyAll()
  }
})

function updateCluster() {
  const mapRef = map.value

  if (clusterOptions.value.cluster && mapRef) {
    const sourceId = id.value
    const sourceFeatures = mapRef.querySourceFeatures(sourceId)
    const clustersTemp: Record<string, GeoJSONFeature> = {}
    const featuresTemp: Record<string, GeoJSONFeature> = {}

    sourceFeatures.forEach((feature) => {
      if (feature.properties.cluster) {
        clustersTemp[feature.properties.cluster_id] = feature
      } else if (feature.id != null) {
        featuresTemp[feature.id] = feature
      } else {
        console.warn('Feature without id', feature)
      }
    })

    clusters.value = Object.values(clustersTemp)
    features.value = Object.values(featuresTemp)
  }
}

function setHiglitedFeature(featureId: string) {
  highlighted.value = featureId

  map.value?.setFeatureState(
    {
      source: id.value,
      id: featureId,
    },
    { hover: true },
  )
}

function unsetHiglitedFeature(featureId: string) {
  highlighted.value = null

  map.value?.setFeatureState(
    { source: id.value, id: featureId },
    { hover: false },
  )
}

const onClick = (event: MapMouseEvent) => emit('click', event)

function onMouseMove(event: MapLayerMouseEvent) {
  if (!ready.value) {
    return
  }

  if (event.features && event.features?.length > 0) {
    const newFeatureId = event.features[0].id as string
    const highlightedFeatureId = highlighted.value

    if (newFeatureId !== highlightedFeatureId) {
      if (highlightedFeatureId) {
        unsetHiglitedFeature(highlightedFeatureId)
      }
      setHiglitedFeature(newFeatureId)
      emit('highlight', event)
    }
  }

  emit('mousemove', event)
}

function onMouseLeave() {
  if (!ready.value) {
    return
  }

  const highlightedFeatureId = highlighted.value

  if (highlightedFeatureId) {
    unsetHiglitedFeature(highlightedFeatureId)
    emit('unhighlight', highlightedFeatureId)
  }
}

function onLayerReady(layerId: string) {
  const spiderRef = spider.value
  const spiderifyRef = spiderify.value

  if (spiderRef) {
    if (Array.isArray(spiderifyRef)) {
      if (spiderifyRef.includes(layerId)) {
        spiderRef.applyTo(layerId)
      }
    } else {
      spiderRef.applyTo(layerId)
    }
  }
}
</script>

<template>
  <MapLibreSource :id="id" :source="{
    type: 'geojson',
    data,
    ...(geojsonOptions ? geojsonOptions : {}),
    ...(clusterOptions ? clusterOptions : {}),
  }">
    <template v-if="ready">
      <MapLibreLayer v-for="(layer, key) in layers" :id="layer.id || id" :key="layer.id || key" :source="id"
        v-bind="layer" @click="onClick" @mousemove="onMouseMove" @mouseleave="onMouseLeave"
        @ready="() => onLayerReady(layer.id || id)" />
      <slot :get-source="() => getSource()" :get-layer="() => map?.getLayer(id)" :clusters="clusters"
        :features="features" :on-click="onClick" :on-mouse-move="onMouseMove" :on-mouse-leave="onMouseLeave" />
    </template>
  </MapLibreSource>
</template>
