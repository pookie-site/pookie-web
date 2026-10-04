<script setup lang="ts">
// Monochrome icon from public/icons, painted with currentColor. Size it with a class (size-5).
defineProps<{ name: string }>()
</script>

<template>
  <span
    aria-hidden="true"
    class="ui-icon inline-block shrink-0 bg-current"
    :style="{ maskImage: `url(/icons/${name}.svg)` }"
  />
</template>

<style scoped>
.ui-icon {
  mask-size: contain;
  mask-repeat: no-repeat;
  mask-position: center;
}
</style>
