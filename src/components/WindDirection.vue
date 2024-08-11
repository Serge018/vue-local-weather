<script setup lang="ts">
import { computed } from 'vue';
interface Props {
  degrees: number;
}
const props = defineProps<Props>();
const windStyle = computed(() => ({
  transform: 'rotate(' + props.degrees + 'deg)',
}));
</script>

<template>
  <span>
    <span area-hidden="true" class="inline-block" data-testid="wind-direction-arrow" :style="windStyle">⬇</span>
  </span>
  <span class="sr-only" data-testid="wind-direction-sr">Wind direction: {{ degrees }} degrees</span>
</template>