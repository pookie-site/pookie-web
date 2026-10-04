<script setup lang="ts">
import { NuxtLink } from '#components'

// Figma thumbnail (2091:27261, was game-card): portrait tile locked to 3:4. Give it a width
// (w-[135px] in rails, w-full in grids). Hover or keyboard focus shows thumbnail-overlay;
// its size L/M/S/xs follows the card width through a container query.
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
    class="thumbnail group relative block aspect-3/4 self-start overflow-hidden rounded-surface-small border border-thumbnail-border bg-thumbnail-background focus-visible:outline-none"
  >
    <img
      :src="image"
      :alt="title"
      loading="lazy"
      class="absolute -inset-px size-[calc(100%+2px)] max-w-[none] object-cover"
    >
    <span
      v-if="badge"
      class="absolute top-[7px] left-[7px] rounded-input bg-thumbnail-badge-background px-1.5 py-0.5 type-body-regular-xs text-thumbnail-badge-text"
    >{{ badge }}</span>
    <span
      v-if="to"
      aria-hidden="true"
      class="thumbnail__overlay absolute inset-0 flex flex-col items-center justify-between bg-thumbnail-overlay-background text-center text-thumbnail-overlay-title opacity-0 transition-opacity group-hover:opacity-100 group-focus-visible:opacity-100"
    >
      <span class="thumbnail__title line-clamp-2">{{ title }}</span>
      <span class="thumbnail__play flex items-center justify-center rounded-full bg-play-button-background text-play-button-icon">
        <svg
          viewBox="0 0 24 24"
          class="size-1/2 translate-x-[6%]"
        ><path
          d="M7 4.5v15l12.5-7.5z"
          fill="currentColor"
        /></svg>
      </span>
      <span class="thumbnail__spacer" />
    </span>
  </component>
</template>

<style scoped>
.thumbnail {
  container-type: inline-size;
}

.thumbnail:hover,
.thumbnail:focus-visible {
  border-color: var(--color-thumbnail-border-hover);
  box-shadow: 0 0 5px var(--color-thumbnail-glow-hover), inset 0 0 0 1px var(--color-thumbnail-border-hover);
}

.thumbnail__play {
  box-shadow: 0 0 4px var(--color-play-button-glow);
}

/* Overlay sizes from Figma thumbnail-overlay: xs < 100, S < 150, M < 190, L from 190. */
.thumbnail__overlay { padding: 6px; }
.thumbnail__title { font-family: var(--font-body); font-size: var(--text-body-s); line-height: 0.875rem; align-self: stretch; }
.thumbnail__play { width: 32px; height: 32px; }
.thumbnail__spacer { height: 20px; }

@container (width < 100px) {
  .thumbnail__title { -webkit-line-clamp: 1; text-align: left; }
}

@container (width >= 100px) {
  .thumbnail__overlay { padding: 10px; }
  .thumbnail__play { width: 40px; height: 40px; }
}

@container (width >= 150px) {
  .thumbnail__overlay { padding: 12px; }
  .thumbnail__title { font-size: var(--text-body-m); line-height: 1.25rem; }
  .thumbnail__play { width: 56px; height: 56px; }
  .thumbnail__spacer { height: 24px; }
}

@container (width >= 190px) {
  .thumbnail__overlay { padding: 16px; }
  .thumbnail__title { font-size: var(--text-body-l); line-height: 1.5rem; }
  .thumbnail__play { width: 72px; height: 72px; }
}
</style>
