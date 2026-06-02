<script setup lang="ts">
import { MapLibre } from 'vue-maplibre'
</script>

<template>
  <MapLibre
    :center="[2.3522, 48.8566]"
    :zoom="10"
    :double-click-zoom="false"
  />
</template>
