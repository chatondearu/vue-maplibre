<script setup lang="ts">
import { MapLibre, MapLibreSourceGeojson } from 'vue-maplibre'

const geojson = {
  type: 'FeatureCollection',
  features: [
    {
      type: 'Feature',
      id: 'paris',
      geometry: {
        type: 'Point',
        coordinates: [2.3522, 48.8566],
      },
      properties: {},
    },
  ],
}
</script>

<template>
  <MapLibre
    :center="[2.3522, 48.8566]"
    :zoom="11"
  >
    <MapLibreSourceGeojson
      id="cities"
      :data="geojson"
      :layer-props="{
        id: 'cities-circle',
        type: 'circle',
        paint: {
          'circle-radius': 6,
          'circle-color': '#16a34a',
        },
      }"
    />
  </MapLibre>
</template>
