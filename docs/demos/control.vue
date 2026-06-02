<script setup lang="ts">
import { MapLibre, MapLibreControl } from 'vue-maplibre'
</script>

<template>
  <MapLibre
    :center="[2.3522, 48.8566]"
    :zoom="11"
  >
    <MapLibreControl position="top-left">
      <button
        type="button"
        class="demo-control-btn"
      >
        Center map
      </button>
    </MapLibreControl>
  </MapLibre>
</template>

<style scoped>
.demo-control-btn {
  border: 1px solid #cbd5e1;
  border-radius: 6px;
  background: #ffffff;
  color: #0f172a;
  padding: 6px 10px;
  font-size: 13px;
}
</style>
