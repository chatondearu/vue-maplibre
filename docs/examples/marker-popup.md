# Marker and Popup

<script setup lang="ts">
import DemoBlock from '../.vitepress/components/DemoBlock.vue'
import MapDemo from '../.vitepress/components/MapDemo.vue'
import MarkerPopupDemo from '../demos/marker-popup.vue'
import source from '../demos/marker-popup.vue?raw'
</script>

<DemoBlock
title="Marker + popup demo"
:source="source"

> <template #default="{ height }">

    <MapDemo :height="height">
      <MarkerPopupDemo />
    </MapDemo>

  </template>
</DemoBlock>
