<script setup lang="ts">
defineProps<{
  height?: number
}>()
</script>

<template>
  <ClientOnly>
    <div
      class="map-demo"
      :style="{ minHeight: `${height ?? 360}px` }"
    >
      <slot />
    </div>
  </ClientOnly>
</template>
