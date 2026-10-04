<script setup lang="ts">
import { NuxtLink } from '#components'

// Figma reward-card (2013:16392). Every reward unlocks at a mark on the shared XP track;
// `xp` is the label the API sends (e.g. "Unlocked at 200 XP"), never computed here.
defineProps<{
  title: string
  text: string
  xp: string
  action: string
  locked?: boolean
  to?: string
}>()
</script>

<template>
  <article
    class="flex flex-col items-start gap-s rounded-surface-medium border bg-reward-card-background p-m"
    :class="locked ? 'border-reward-card-border' : 'border-reward-card-border-active'"
  >
    <div
      class="flex size-11 items-center justify-center rounded-surface-small bg-reward-card-icon-background"
      :class="{ 'opacity-50': locked }"
    >
      <slot name="icon" />
    </div>
    <h3 class="type-heading-bold-h5 text-reward-card-title">
      {{ title }}
    </h3>
    <p class="type-body-regular-sm text-reward-card-text">
      {{ text }}
    </p>
    <div
      class="flex w-full items-center justify-between gap-xs whitespace-nowrap"
      :class="locked ? 'text-reward-card-locked' : 'text-reward-card-xp'"
    >
      <span class="type-body-regular-s">{{ xp }}</span>
      <NuxtLink
        v-if="to && !locked"
        :to="to"
        class="type-button-label-s hover:underline"
      >
        {{ action }}
      </NuxtLink>
      <span
        v-else
        class="type-button-label-s"
      >{{ action }}</span>
    </div>
  </article>
</template>
