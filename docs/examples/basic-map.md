# Basic Map

<script setup lang="ts">
import DemoBlock from '../.vitepress/components/DemoBlock.vue'
import MapDemo from '../.vitepress/components/MapDemo.vue'
import BasicMapDemo from '../demos/basic-map.vue'
import source from '../demos/basic-map.vue?raw'
</script>

<DemoBlock
  title="Basic map demo"
  :source="source"
>
  <template #default="{ height }">
    <MapDemo :height="height">
      <BasicMapDemo />
    </MapDemo>
  </template>
</DemoBlock>
