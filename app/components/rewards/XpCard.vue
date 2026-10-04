<script setup lang="ts">
import { XpProgressSchema } from '#shared/contracts/rewards'

// Figma xp card (2026:30678): the player's spot on the shared XP track (ADR-001) and the
// nearest milestone. Every label and position comes from /api/xp; nothing is computed here.
withDefaults(defineProps<{
  name: string
  action?: string
  actionTo?: string
}>(), { action: 'Reward Hub', actionTo: '/rewards' })

const { data: xp } = await useFetch('/api/xp', {
  key: 'xp',
  transform: data => XpProgressSchema.parse(data),
})
const percent = (value: number) => `${value * 100}%`
</script>

<template>
  <article class="relative flex flex-col gap-xl overflow-hidden rounded-surface-large border border-promo-card-border p-m md:p-xl">
    <UiAccentSurface tone="plum" />
    <template v-if="xp">
      <div class="relative flex items-center gap-s">
        <img
          :src="xp.avatar"
          alt=""
          width="56"
          height="56"
          class="size-14 shrink-0 rounded-full object-cover"
        >
        <div class="flex min-w-0 flex-col gap-[2px]">
          <h2 class="truncate type-heading-bold-h4 text-promo-card-title">
            Welcome back, {{ name }}
          </h2>
          <p class="type-body-regular-sm text-promo-card-text">
            {{ xp.level }}
          </p>
        </div>
      </div>

      <div class="relative flex flex-col gap-xs">
        <div class="flex items-start justify-between gap-xs">
          <span class="type-button-label-s text-reward-card-xp">{{ xp.xp }}</span>
          <span class="type-body-regular-s text-reward-card-locked">{{ xp.nextLevel }}</span>
        </div>
        <div
          role="progressbar"
          :aria-valuenow="Math.round(xp.progress * 100)"
          aria-valuemin="0"
          aria-valuemax="100"
          :aria-valuetext="`${xp.xp}, ${xp.nextLevel}`"
          class="relative h-2.5 rounded-input bg-xp-bar-track"
        >
          <div
            class="h-full rounded-input bg-xp-bar-fill"
            :style="{ width: percent(xp.progress) }"
          />
          <span
            v-for="marker in xp.markers"
            :key="marker.label"
            class="absolute top-1/2 h-3.5 w-1 -translate-y-1/2 rounded-full bg-xp-bar-marker"
            :style="{ left: percent(marker.position) }"
          />
        </div>
        <div class="flex justify-between gap-xs type-body-regular-xs text-reward-card-text">
          <span
            v-for="marker in xp.markers"
            :key="marker.label"
          >{{ marker.label }}</span>
        </div>
      </div>

      <div class="relative flex items-center gap-xl">
        <p class="min-w-0 flex-1 type-body-regular-sm text-promo-card-text">
          {{ xp.nextReward }}
        </p>
        <UiButton
          hierarchy="outline"
          ton="default"
          :to="actionTo"
        >
          {{ action }}
        </UiButton>
      </div>
    </template>
  </article>
</template>
