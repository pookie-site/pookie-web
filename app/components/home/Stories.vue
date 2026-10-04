<script setup lang="ts">
import type { Story } from '#shared/contracts/home'

// Figma stories (2026:31855): round story bubbles, centred on wide screens and
// scrolling sideways when they do not fit. The ring colour is hand-set in Figma.
withDefaults(defineProps<{
  stories: Story[]
  title?: string
}>(), { title: 'Stories' })
</script>

<template>
  <nav :aria-label="title">
    <ul class="flex justify-center-safe gap-xl overflow-x-auto [scrollbar-width:none]">
      <li
        v-for="story in stories"
        :key="story.id"
        class="shrink-0"
      >
        <NuxtLink
          :to="story.to"
          class="group flex w-20 flex-col items-center gap-[7px] focus-visible:outline-none"
        >
          <span class="flex size-20 items-center justify-center rounded-full border-4 border-text-primary bg-surface-solid-s3 group-focus-visible:outline-2 group-focus-visible:outline-border-brand">
            <img
              :src="story.image"
              alt=""
              width="56"
              height="56"
              class="size-14 rounded-full object-cover"
            >
          </span>
          <span class="w-full truncate text-center type-body-regular-xs text-text-primary">{{ story.label }}</span>
        </NuxtLink>
      </li>
    </ul>
  </nav>
</template>
