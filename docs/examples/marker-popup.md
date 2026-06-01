# Marker and Popup

```vue
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
        <div class="h-3 w-3 rounded-full bg-red-500" />
      </template>

      <MapLibrePopup text="Paris marker" />
    </MapLibreMarker>
  </MapLibre>
</template>
```
