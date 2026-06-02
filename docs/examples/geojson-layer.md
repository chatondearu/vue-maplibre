# GeoJSON Layer

<script setup lang="ts">
import DemoBlock from '../.vitepress/components/DemoBlock.vue'
import MapDemo from '../.vitepress/components/MapDemo.vue'
import GeojsonLayerDemo from '../demos/geojson-layer.vue'
import source from '../demos/geojson-layer.vue?raw'
</script>

<DemoBlock
  title="GeoJSON source demo"
  :source="source"
>
  <template #default="{ height }">
    <MapDemo :height="height">
      <GeojsonLayerDemo />
    </MapDemo>
  </template>
</DemoBlock>
