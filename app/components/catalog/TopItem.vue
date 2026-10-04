<script setup lang="ts">
// Figma top-item (2025:18127): big rank number behind a game card; top 3 filled, the rest outlined.
const props = defineProps<{
  rank: number
  title: string
  image: string
  to?: string
}>()

const top3 = computed(() => props.rank <= 3)
</script>

<template>
  <div class="relative h-[182px] w-[196px] shrink-0">
    <span
      aria-hidden="true"
      class="absolute top-5 left-0 w-22 text-right font-heading text-[150px] leading-[150px] font-black tracking-[-9px]"
      :class="top3 ? 'text-top-list-rank-fill' : 'top-item__outline text-transparent'"
    >{{ rank }}</span>
    <CatalogThumbnail
      :title="`${rank}. ${title}`"
      :image="image"
      :to="to"
      class="absolute top-0 left-15 w-[135px]"
    />
  </div>
</template>

<style scoped>
.top-item__outline {
  -webkit-text-stroke: 1px var(--color-top-list-rank-stroke);
}
</style>
