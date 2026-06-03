# MapLibreNavigationControl

Wraps `maplibre-gl` `NavigationControl`.

## Props

- `showCompass?: boolean` (default: `true`)
- `showZoom?: boolean` (default: `true`)
- `visualizePitch?: boolean`
- `position?: 'top-left' | 'top-right' | 'bottom-left' | 'bottom-right'` (default: `top-right`)

## Emits

No custom emit.

## Example

<script setup lang="ts">
import DemoBlock from '../.vitepress/components/DemoBlock.vue'
import MapDemo from '../.vitepress/components/MapDemo.vue'
import NavigationControlDemo from '../demos/navigation-control.vue'
import source from '../demos/navigation-control.vue?raw'
</script>

<DemoBlock
title="Navigation control demo"
:source="source"

> <template #default="{ height }">

    <MapDemo :height="height">
      <NavigationControlDemo />
    </MapDemo>

  </template>
</DemoBlock>
