<script setup lang="ts">
import { computed } from 'vue'

const props = withDefaults(defineProps<{
  title?: string
  source?: string
  height?: number
}>(), {
  title: 'Live Demo',
  source: '',
  height: 360,
})

const hasSource = computed(() => props.source.trim().length > 0)
</script>

<template>
  <div class="demo-block">
    <div class="demo-block__preview">
      <slot :height="height" />
    </div>

    <details v-if="hasSource">
      <summary class="demo-block__summary">
        {{ title }} - source
      </summary>
      <pre><code>{{ source }}</code></pre>
    </details>
  </div>
</template>
