<script setup lang="ts">
import { MapLibre, MapLibreLocale } from 'vue-maplibre'
</script>

<template>
  <MapLibre
    :center="[2.3522, 48.8566]"
    :zoom="10"
    :i18n="true"
  >
    <MapLibreLocale />
  </MapLibre>
</template>
