<script setup lang="ts">
import { NuxtLink } from '#components'

// Figma game-card (2013:16321): portrait tile locked to 3:4. Give it a width (w-[135px] in rails, w-full in grids).
defineProps<{
  title: string
  image: string
  badge?: string
  to?: string
}>()
</script>

<template>
  <component
    :is="to ? NuxtLink : 'div'"
    :to="to"
    class="relative block aspect-3/4 overflow-hidden rounded-surface-small border border-game-card-border bg-game-card-background focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-border-brand"
  >
    <img
      :src="image"
      :alt="title"
      loading="lazy"
      class="absolute -inset-px size-[calc(100%+2px)] max-w-none object-cover"
    >
    <span
      v-if="badge"
      class="absolute top-[7px] left-[7px] rounded-input bg-game-card-badge-background px-1.5 py-0.5 type-body-regular-xs text-game-card-badge-text"
    >{{ badge }}</span>
  </component>
</template>
