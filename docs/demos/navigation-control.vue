<script setup lang="ts">
import { MapLibre, MapLibreNavigationControl } from 'vue-maplibre'
</script>

<template>
  <MapLibre
    :center="[2.3522, 48.8566]"
    :zoom="11"
  >
    <MapLibreNavigationControl
      position="top-right"
      :show-compass="true"
      :show-zoom="true"
    />
  </MapLibre>
</template>
