<script setup lang="ts">
// Figma collection-card (2025:18128): cover banner, 2x3 game preview, title, count, See all.
// Collections rail: `flex justify-[safe_center] overflow-x-auto` so one or two cards centre.
export interface CollectionGame {
  title: string
  image: string
}

withDefaults(defineProps<{
  title: string
  count: string
  banner: string
  games: CollectionGame[]
  to: string
  seeAllLabel?: string
}>(), { seeAllLabel: 'See all' })
</script>

<template>
  <article class="flex w-[330px] min-w-[320px] shrink-0 flex-col overflow-hidden rounded-surface-large border border-collection-card-border bg-collection-card-background">
    <img
      :src="banner"
      alt=""
      loading="lazy"
      class="h-[150px] w-full object-cover opacity-60"
    >
    <div class="grid grid-cols-3 gap-xs px-m pt-m">
      <CatalogGameCard
        v-for="game in games.slice(0, 6)"
        :key="game.title"
        :title="game.title"
        :image="game.image"
        class="w-full"
      />
    </div>
    <div class="flex items-center justify-between gap-xs p-m whitespace-nowrap">
      <div class="flex min-w-0 flex-col gap-0.5">
        <h3 class="truncate type-heading-bold-h5 text-collection-card-title">
          {{ title }}
        </h3>
        <span class="type-body-regular-s text-collection-card-count">{{ count }}</span>
      </div>
      <NuxtLink
        :to="to"
        class="type-button-label-s text-collection-card-link hover:underline"
      >
        {{ seeAllLabel }}
      </NuxtLink>
    </div>
  </article>
</template>
