<script setup lang="ts">
import { useSource } from '@/composables/layerSource'
import { Map, SourceSpecification } from 'maplibre-gl';
import { inject, nextTick, onBeforeUnmount, onMounted, Ref, ref, toRefs } from 'vue';

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

const map = inject<Ref<Map | undefined>>('map', ref())
const ready = ref(false)
const { id } = toRefs(props)

const { removeSource, updateSource, getSource } = useSource(id)

onMounted(() => {
  updateSource(props.source)

  map.value?.on('data', (e) => {
    if (e.sourceId === id.value && e.isSourceLoaded) {
      ready.value = true
    }
  })

  map.value?.on('click', id.value, onClick)
})

onBeforeUnmount(async () => {
  map.value?.off('click', id.value, onClick)
  ready.value = false
  await nextTick()
  removeSource()
})

function onClick(event) {
  emit('click', event)
}
</script>

<template>
  <slot v-if="ready" :get-source="() => getSource()" />
</template>
