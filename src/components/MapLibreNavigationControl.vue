<script setup lang="ts">
import { NavigationControl } from 'maplibre-gl'
import { inject, onBeforeUnmount, onMounted, reactive, ref, toRefs } from 'vue';

defineOptions({
  name: 'MapLibreNavigationControl',
})

const props = defineProps({
  showCompass: {
    type: Boolean,
    default: true,
  },
  showZoom: {
    type: Boolean,
    default: true,
  },
  visualizePitch: Boolean,
  position: {
    type: String,
    default: 'top-right',
    validator: value =>
      ['top-left', 'top-right', 'bottom-left', 'bottom-right'].includes(value),
  },
})

const { position, showCompass, showZoom, visualizePitch } = toRefs(props)
const map = inject('map', ref(null))
const navigation = ref(null)

const options = reactive({
  showCompass,
  showZoom,
  visualizePitch,
})

onMounted(() => {
  const navigationControl = new NavigationControl(options)

  map.value.addControl(navigationControl, position.value)
  navigation.value = navigationControl
})

onBeforeUnmount(() => {
  map.value.removeControl(navigation.value)
})
</script>

<template>
  <slot />
</template>
