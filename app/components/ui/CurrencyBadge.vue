<script setup lang="ts">
// Figma currency-badge (2044:20555): round marker before amounts.
withDefaults(defineProps<{ symbol?: string }>(), { symbol: '$' })
</script>

<template>
  <span
    aria-hidden="true"
    class="inline-flex size-4.5 shrink-0 items-center justify-center rounded-input bg-table-currency-badge-background font-heading text-[11px] font-extrabold text-table-currency-badge-text"
  >{{ symbol }}</span>
</template>
