<script setup lang="ts">
// Figma game-category-item (239:23322). Colours come from the universal slot tokens
// game-category-item/<slot>/*; the category data decides which slot (1–9) it uses.
const props = defineProps<{
  palette: number
  label: string
  icon: string
  to: string
  active?: boolean
}>()

const vars = computed(() => {
  const t = (part: string) => `var(--color-game-category-item-${props.palette}-${part})`
  return {
    '--tile-bg': t('bg-default'),
    '--tile-bg-active': t('bg-active'),
    '--tile-glow': t('glow-default'),
    '--tile-glow-active': t('glow-active'),
    '--tile-fade': t('glow-fade-default'),
    '--tile-border-start': t('border-start-active'),
    '--tile-border-end': t('border-end-active'),
  }
})
</script>

<template>
  <NuxtLink
    :to="to"
    :aria-current="active ? 'page' : undefined"
    class="category-tile flex h-[60px] min-w-14 flex-col items-center justify-center gap-1 rounded-surface-xsmall px-1.5 py-1 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-border-brand"
    :class="{ 'category-tile--active': active }"
    :style="vars"
  >
    <img
      :src="icon"
      alt=""
      class="size-7 object-contain"
    >
    <span class="text-center type-body-regular-xs text-nav-side-menu-item-text-default uppercase">{{ label }}</span>
  </NuxtLink>
</template>

<style scoped>
/* Glow ellipse and stops from the Figma paint styles game-category-item/<n>-bg-*. */
.category-tile {
  border: 1px solid transparent;
  background:
    radial-gradient(47px 45px at 50% 125%, color-mix(in srgb, var(--tile-glow) 60%, transparent), transparent 75%) padding-box,
    linear-gradient(var(--tile-bg), var(--tile-bg)) padding-box;
}

.category-tile:hover,
.category-tile--active {
  background:
    radial-gradient(47px 45px at 50% 125%, var(--tile-glow-active) 20%, var(--tile-fade) 80%) padding-box,
    radial-gradient(47px 45px at 50% 125%, var(--tile-glow), var(--tile-fade) 75%) padding-box,
    linear-gradient(var(--tile-bg-active), var(--tile-bg-active)) padding-box;
}

.category-tile--active {
  background:
    radial-gradient(47px 45px at 50% 125%, var(--tile-glow-active) 20%, var(--tile-fade) 80%) padding-box,
    radial-gradient(47px 45px at 50% 125%, var(--tile-glow), var(--tile-fade) 75%) padding-box,
    linear-gradient(var(--tile-bg-active), var(--tile-bg-active)) padding-box,
    linear-gradient(135deg, var(--tile-border-start), var(--tile-border-end)) border-box;
}
</style>
