<script setup lang="ts">
import { Map } from 'maplibre-gl';
import { inject, onBeforeUnmount, onMounted, ref, toRefs } from 'vue';

defineOptions({
  name: 'MapLibreControl',
})

const props = withDefaults(defineProps<{
  position?: 'top-left' | 'top-right' | 'bottom-left' | 'bottom-right'
  noStyle?: boolean
}>(), {
  position: 'top-right',
})

const { position } = toRefs(props)
const map = inject('map', ref())
const container = ref()
const control = ref()

class CustomControl {
  _map: Map | undefined
  _container: HTMLElement | undefined

  getDefaultPosition() {
    return position.value
  }

  onAdd(map: Map) {
    this._map = map
    this._container = container.value
    return this._container
  }

  onRemove() {
    this._container?.parentNode?.removeChild(this._container)
    this._map = undefined
  }
}

onMounted(() => {
  const customControl = new CustomControl()

  map.value.addControl(customControl, position.value)
  control.value = customControl
})

onBeforeUnmount(() => {
  map.value.removeControl(control.value)
})
</script>

<template>
  <div ref="container" class="text-base font-body text-grey-500" :class="{
    'm-4 rounded-md bg-white p-4 text-sm shadow-sm': !noStyle,
    '!shadow-none !bg-transparent': noStyle,
  }">
    <slot />
  </div>
</template>
