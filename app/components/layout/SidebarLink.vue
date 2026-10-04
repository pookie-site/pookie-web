<script setup lang="ts">
// Figma nav-side-menu-item (239:21927): optional 20px icon in a 28px box, then the label.
// In the lg icon rail the label is kept for screen readers only.
defineProps<{
  label: string
  to: string
  icon?: string
}>()
</script>

<template>
  <NuxtLink
    :to="to"
    class="flex items-center gap-1 rounded-surface-xsmall p-1 type-body-regular-sm text-nav-side-menu-item-text-default hover:bg-nav-side-menu-item-background-hover hover:text-nav-side-menu-item-text-hover focus-visible:outline-2 focus-visible:outline-border-brand max-xl:justify-center [&.router-link-active]:bg-nav-side-menu-item-background-active [&.router-link-active]:text-nav-side-menu-item-text-active"
  >
    <span
      v-if="icon"
      class="flex size-7 shrink-0 items-center justify-center"
    >
      <img
        :src="`/icons/fill/${icon}.svg`"
        alt=""
        width="20"
        height="20"
      >
    </span>
    <span
      class="flex h-6 items-center"
      :class="{ 'max-xl:sr-only': icon }"
    >{{ label }}</span>
  </NuxtLink>
</template>
