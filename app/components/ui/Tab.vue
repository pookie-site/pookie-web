<script setup lang="ts">
// Figma tab (251:33393). Place tabs inside an element with role="tablist".
withDefaults(defineProps<{
  active?: boolean
  size?: 'default' | 'small'
}>(), { size: 'default' })
</script>

<template>
  <button
    type="button"
    role="tab"
    :aria-selected="active"
    class="inline-flex min-w-0 cursor-pointer items-center justify-center gap-xs focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-border-brand"
    :class="[
      size === 'small' ? 'rounded-[6px] px-xs py-2xs type-body-regular-s' : 'rounded-[10px] px-s py-xs type-body-regular-m',
      active
        ? 'bg-tab-bar-tabs-default-background-active text-tab-bar-tabs-default-label-active'
        : 'bg-tab-bar-tabs-default-background-default text-tab-bar-tabs-default-label-default hover:bg-tab-bar-tabs-default-background-hover hover:text-tab-bar-tabs-default-label-hover',
    ]"
  >
    <span
      class="truncate"
      :class="{ 'max-w-38': size === 'default' }"
    ><slot /></span>
  </button>
</template>
