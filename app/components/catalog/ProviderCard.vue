<script setup lang="ts">
import { NuxtLink } from '#components'

// Figma item prov (626:60056). Figma paints it with Brand and raw colours, so this maps
// them to the nearest Alias tokens until provider-card/* Mapped tokens exist.
const props = withDefaults(defineProps<{
  name: string
  logo: string
  to: string
  tag?: 'top' | 'live'
  tournament?: boolean
  tournamentLabel?: string
}>(), { tag: undefined, tournamentLabel: 'Tournament' })

const tagClass = computed(() => props.tag === 'live' ? 'bg-alert-error text-text-primary' : 'bg-surface-accent-secondary text-text-on-accent')
</script>

<template>
  <NuxtLink
    :to="to"
    class="provider-card relative flex items-center justify-center overflow-hidden rounded-surface-xsmall bg-surface-solid-s3 px-[18px] py-m focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-border-brand"
    :class="tag ? `provider-card--${tag}` : 'border border-surface-solid-s3'"
  >
    <img
      :src="logo"
      :alt="name"
      width="138"
      height="42"
      loading="lazy"
      class="h-[42px] w-[138px] object-contain"
    >
    <span
      v-if="tag"
      class="absolute top-[11px] -left-[17px] w-14 -rotate-45 text-center text-[10px] leading-[10px] font-bold uppercase"
      :class="tagClass"
    ><span class="block pt-0.5 pb-0.5">{{ tag }}</span></span>
    <span
      v-if="tournament"
      class="absolute top-0 right-0 rounded-tr-surface-xsmall rounded-bl-surface-xsmall bg-surface-accent-secondary px-1 pt-2 pb-1 text-[10px] leading-[10px] font-bold text-text-on-accent"
    >{{ tournamentLabel }}</span>
  </NuxtLink>
</template>

<style scoped>
.provider-card--top,
.provider-card--live {
  border: 2px solid transparent;
  background:
    linear-gradient(var(--color-surface-solid-s3), var(--color-surface-solid-s3)) padding-box,
    linear-gradient(to left, var(--color-border-b1) 14%, var(--provider-accent)) border-box;
}

.provider-card--top {
  --provider-accent: var(--color-surface-accent-secondary);
}

.provider-card--live {
  --provider-accent: var(--color-alert-error);
}
</style>
