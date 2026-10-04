<script setup lang="ts">
import type { AccentTone } from '~/components/ui/AccentSurface.vue'

// Figma category card (2026:31824): accent background, title, count, Play, and three
// fanned game covers on the right. 140px tall on mobile, 168px from md.
defineProps<{
  title: string
  count: string
  action: string
  to: string
  tone: AccentTone
  art: string[]
}>()

// Offsets from the Figma mob (359) and desktop (504) cards.
const fan = [
  'right-[103px] top-[20%] rotate-10 xl:right-[168px]',
  'right-[56px] top-[9%] z-10 xl:right-[87px]',
  'right-[-13px] top-[13%] -rotate-10 xl:right-[6px]',
]
</script>

<template>
  <article class="relative h-[140px] overflow-hidden rounded-surface-large border border-category-card-border bg-category-card-background md:h-[168px]">
    <UiAccentSurface :tone="tone" />
    <img
      v-for="(src, i) in art"
      :key="i"
      :src="src"
      alt=""
      width="96"
      height="128"
      loading="lazy"
      class="absolute h-32 w-24 rounded-[12px] object-cover"
      :class="fan[i]"
    >
    <div class="relative flex h-full flex-col items-start justify-between p-m md:p-xl">
      <div class="flex flex-col gap-2xs">
        <h2 class="type-heading-bold-h2 text-promo-card-title">
          {{ title }}
        </h2>
        <p class="type-body-regular-m text-category-card-count">
          {{ count }}
        </p>
      </div>
      <UiButton :to="to">
        {{ action }}
      </UiButton>
    </div>
  </article>
</template>
