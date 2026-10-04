<script setup lang="ts">
import type { CollectionGame } from './CollectionCard.vue'

// Figma category-spotlight (2057:24603): cover with a stat switch and a two-row game grid.
// mob: cover on top, 3 columns; md: cover 240 on the left with arrows; xl: cover 320.
// The cover keeps its width; when the block grows, the grid gains columns instead of
// taller cards (one column per ~120px, see the container queries), always two rows.
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
      <div class="@container min-w-0 flex-1">
        <div
          role="tabpanel"
          class="spotlight__grid grid grid-cols-3 gap-xs md:grid-cols-4 md:gap-2.5 xl:grid-cols-5"
        >
          <CatalogThumbnail
            v-for="(game, i) in games"
            :key="`${i}-${game.title}`"
            :title="game.title"
            :image="game.image"
            class="w-full"
          />
        </div>
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
/* Always two rows: hide what does not fit the column count (3 mob, 4 md, 5 xl as in Figma). */
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

/* Wider than the 1440 frame: cards stay 110px (their size at 1440) and a column is added
   per 120px of grid (card plus the 10px gap); the remainder spreads into the gaps, so the
   block keeps its height. */

@media (width >= 80rem) {
  @container (width >= 590px) {
    .spotlight__grid { grid-template-columns: repeat(5, 110px); justify-content: space-between; }
  }
}

@container (width >= 710px) {
  .spotlight__grid { grid-template-columns: repeat(6, 110px); justify-content: space-between; }
  .spotlight__grid > :nth-child(n + 11) { display: block; }
  .spotlight__grid > :nth-child(n + 13) { display: none; }
}

@container (width >= 830px) {
  .spotlight__grid { grid-template-columns: repeat(7, 110px); justify-content: space-between; }
  .spotlight__grid > :nth-child(n + 13) { display: block; }
  .spotlight__grid > :nth-child(n + 15) { display: none; }
}

@container (width >= 950px) {
  .spotlight__grid { grid-template-columns: repeat(8, 110px); justify-content: space-between; }
  .spotlight__grid > :nth-child(n + 15) { display: block; }
  .spotlight__grid > :nth-child(n + 17) { display: none; }
}

@container (width >= 1070px) {
  .spotlight__grid { grid-template-columns: repeat(9, 110px); justify-content: space-between; }
  .spotlight__grid > :nth-child(n + 17) { display: block; }
  .spotlight__grid > :nth-child(n + 19) { display: none; }
}

@container (width >= 1190px) {
  .spotlight__grid { grid-template-columns: repeat(10, 110px); justify-content: space-between; }
  .spotlight__grid > :nth-child(n + 19) { display: block; }
  .spotlight__grid > :nth-child(n + 21) { display: none; }
}

@container (width >= 1310px) {
  .spotlight__grid { grid-template-columns: repeat(11, 110px); justify-content: space-between; }
  .spotlight__grid > :nth-child(n + 21) { display: block; }
  .spotlight__grid > :nth-child(n + 23) { display: none; }
}

@container (width >= 1430px) {
  .spotlight__grid { grid-template-columns: repeat(12, 110px); justify-content: space-between; }
  .spotlight__grid > :nth-child(n + 23) { display: block; }
  .spotlight__grid > :nth-child(n + 25) { display: none; }
}
</style>
