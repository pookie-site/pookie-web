<script setup lang="ts">
import type { CollectionGame } from './CollectionCard.vue'

// Figma category-spotlight (2057:24603): cover with a stat switch and a two-row game grid.
// mob: cover on top, 3 columns; md: cover 240 on the left, 4 columns and arrows; xl: cover 320, 5 columns.
withDefaults(defineProps<{
  title: string
  cover: string
  tabs: string[]
  games: CollectionGame[]
  prevLabel?: string
  nextLabel?: string
}>(), { prevLabel: 'Previous', nextLabel: 'Next' })

const active = defineModel<number>({ default: 0 })
defineEmits<{ prev: [], next: [] }>()
</script>

<template>
  <section class="flex flex-col overflow-hidden rounded-surface-large border border-spotlight-border bg-spotlight-background md:flex-row">
    <div class="flex shrink-0 flex-col md:w-60 md:bg-spotlight-panel xl:w-80">
      <img
        :src="cover"
        alt=""
        loading="lazy"
        class="h-[150px] w-full object-cover opacity-60 md:h-auto md:min-h-0 md:flex-1"
      >
      <div class="flex flex-col gap-s p-m">
        <h2 class="type-heading-bold-h5 text-spotlight-title">
          {{ title }}
        </h2>
        <div
          role="tablist"
          :aria-label="title"
          class="flex gap-xs"
        >
          <UiTab
            v-for="(tab, i) in tabs"
            :key="tab"
            :active="active === i"
            @click="active = i"
          >
            {{ tab }}
          </UiTab>
        </div>
      </div>
    </div>
    <div class="flex min-w-0 flex-1 items-center gap-s px-s pb-s md:p-m">
      <UiIconButton
        icon="chevron-left"
        :label="prevLabel"
        class="max-md:hidden"
        @click="$emit('prev')"
      />
      <div
        role="tabpanel"
        class="spotlight__grid grid min-w-0 flex-1 grid-cols-3 gap-xs md:grid-cols-4 md:gap-2.5 xl:grid-cols-5"
      >
        <CatalogGameCard
          v-for="game in games"
          :key="game.title"
          :title="game.title"
          :image="game.image"
          class="w-full"
        />
      </div>
      <UiIconButton
        icon="chevron-right"
        :label="nextLabel"
        class="max-md:hidden"
        @click="$emit('next')"
      />
    </div>
  </section>
</template>

<style scoped>
/* Always two rows: hide what does not fit the column count. */
.spotlight__grid > :nth-child(n + 7) {
  display: none;
}

@media (width >= 48rem) {
  .spotlight__grid > :nth-child(n + 7) {
    display: block;
  }

  .spotlight__grid > :nth-child(n + 9) {
    display: none;
  }
}

@media (width >= 80rem) {
  .spotlight__grid > :nth-child(n + 9) {
    display: block;
  }

  .spotlight__grid > :nth-child(n + 11) {
    display: none;
  }
}
</style>
