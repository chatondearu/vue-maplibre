<script setup lang="ts">
import { MapLibre, MapLibreMarker, MapLibrePopup } from 'vue-maplibre'
</script>

<template>
  <MapLibre
    :center="[2.3522, 48.8566]"
    :zoom="12"
  >
    <MapLibreMarker :lng-lat="[2.3522, 48.8566]">
      <template #element>
        <div class="demo-marker" />
      </template>
      <MapLibrePopup text="Paris marker" />
    </MapLibreMarker>
  </MapLibre>
</template>

<style scoped>
.demo-marker {
  width: 12px;
  height: 12px;
  border-radius: 9999px;
  background: #ef4444;
}
</style>
