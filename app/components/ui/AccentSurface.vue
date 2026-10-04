<script setup lang="ts">
// Figma accent-surface (2029:21577): gradient background layer. Put it first
// inside a card that is `relative overflow-hidden`; it fills the card.
// ponytail: Figma's skewed radial gradients approximated with CSS ellipses
// (centre and stops taken from Figma); export SVGs if a tone drifts visibly.
export type AccentTone = 'plum' | 'dusk' | 'twilight' | 'ocean' | 'ember' | 'bronze' | 'violet' | 'nebula'

const props = defineProps<{ tone: AccentTone }>()

const CENTRES: Record<Exclude<AccentTone, 'dusk'>, string> = {
  plum: '22% 12%',
  twilight: '36% 0%',
  ocean: '25% 9%',
  ember: '32% 14%',
  bronze: '32% 22%',
  violet: '35% 24%',
  nebula: '63% 43%',
}

const background = computed(() => {
  const start = `var(--color-accent-surface-${props.tone}-start)`
  const end = `var(--color-accent-surface-${props.tone}-end)`
  if (props.tone === 'dusk') return `linear-gradient(to bottom, ${start}, ${end})`
  const startStop = props.tone === 'nebula' ? ' 21%' : ''
  const endStop = props.tone === 'plum' ? ' 94%' : ''
  return `radial-gradient(farthest-corner at ${CENTRES[props.tone]}, ${start}${startStop}, ${end}${endStop})`
})
</script>

<template>
  <div
    aria-hidden="true"
    class="pointer-events-none absolute inset-0"
    :style="{ background }"
  />
</template>
