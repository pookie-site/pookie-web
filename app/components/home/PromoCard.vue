<script setup lang="ts">
// Figma promo card · bonus store (2026:31944): art at 35% over the card background,
// text and actions pinned to the bottom. `note` is an optional label next to the button.
defineProps<{
  title: string
  text: string
  image: string
  action: string
  to: string
  note?: string
}>()
</script>

<template>
  <article class="relative flex flex-col justify-end gap-xs overflow-hidden rounded-surface-large bg-promo-card-background p-m md:p-xl">
    <img
      :src="image"
      alt=""
      class="absolute inset-0 size-full object-cover opacity-35"
    >
    <h2 class="relative type-heading-bold-h2 text-promo-card-title">
      {{ title }}
    </h2>
    <p class="relative type-body-regular-m text-promo-card-text">
      {{ text }}
    </p>
    <div class="relative flex items-center gap-s pt-xs">
      <UiButton :to="to">
        {{ action }}
      </UiButton>
      <span
        v-if="note"
        class="type-button-label-m text-reward-card-xp"
      >{{ note }}</span>
    </div>
  </article>
</template>
