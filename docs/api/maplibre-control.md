# MapLibreControl

Wraps a custom MapLibre control container so you can render Vue content in control zones.

## Props

- `position?: 'top-left' | 'top-right' | 'bottom-left' | 'bottom-right'` (default: `top-right`)
- `noStyle?: boolean` (default: `false`)

## Emits

No custom emit.

## Slot

Default slot is rendered inside the control container.

## Example

<script setup lang="ts">
import DemoBlock from '../.vitepress/components/DemoBlock.vue'
import MapDemo from '../.vitepress/components/MapDemo.vue'
import ControlDemo from '../demos/control.vue'
import source from '../demos/control.vue?raw'
</script>

<DemoBlock
  title="Custom control demo"
  :source="source"
>
  <template #default="{ height }">
    <MapDemo :height="height">
      <ControlDemo />
    </MapDemo>
  </template>
</DemoBlock>
