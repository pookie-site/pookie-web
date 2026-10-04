<script setup lang="ts">
import { NuxtLink } from '#components'

// Figma icon btn (175:24959): 40px round header action with a full-colour 20px icon.
defineProps<{
  icon: string
  label: string
  to?: string
}>()
</script>

<template>
  <component
    :is="to ? NuxtLink : 'button'"
    :to="to"
    :type="to ? undefined : 'button'"
    :aria-label="label"
    class="flex size-10 shrink-0 cursor-pointer items-center justify-center rounded-full border border-nav-icon-button-border-default bg-nav-icon-button-background-default hover:bg-nav-icon-button-background-hover focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-border-brand"
  >
    <img
      :src="`/icons/fill/${icon}.svg`"
      alt=""
      width="20"
      height="20"
    >
  </component>
</template>
