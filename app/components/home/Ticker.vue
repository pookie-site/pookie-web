<script setup lang="ts">
import type { TickerWin } from '#shared/contracts/home'

// Figma winning now ticker (2026:30595). The win cards are still hand-coloured in Figma,
// so they use the nearest Alias tokens. The row scrolls on every width.
withDefaults(defineProps<{
  wins: TickerWin[]
  liveLabel?: string
  title?: string
}>(), { liveLabel: 'Live', title: 'Winning now' })
</script>

<template>
  <section
    :aria-label="title"
    class="flex items-center gap-xs overflow-hidden rounded-surface-medium bg-ticker-background p-xs"
  >
    <div class="flex shrink-0 flex-col gap-2xs px-xs text-ticker-label">
      <span class="flex items-center gap-[6px] type-button-label-s">
        <span class="size-2 rounded-full bg-ticker-live-dot" />{{ liveLabel }}
      </span>
      <span class="type-body-regular-s">{{ title }}</span>
    </div>
    <ul class="flex min-w-0 gap-xs overflow-x-auto [scrollbar-width:none]">
      <li
        v-for="win in wins"
        :key="win.id"
        class="shrink-0"
      >
        <NuxtLink
          :to="win.to"
          class="flex w-[76px] flex-col gap-[2px] rounded-[5px] bg-surface-solid-s3 p-[2px] focus-visible:outline-2 focus-visible:outline-border-brand"
        >
          <img
            :src="win.image"
            alt=""
            width="72"
            height="94"
            loading="lazy"
            class="h-[94px] w-[72px] rounded-[4px] object-cover"
          >
          <span class="flex flex-col gap-2xs p-[2px]">
            <span class="truncate text-[8px] leading-[1.2] text-text-secondary">{{ win.user }}</span>
            <span class="text-[10px] leading-[1.2] font-bold text-text-accent-secondary">{{ win.amount }}</span>
          </span>
        </NuxtLink>
      </li>
    </ul>
  </section>
</template>
