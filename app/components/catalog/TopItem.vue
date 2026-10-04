<script setup lang="ts">
// Figma top-item (2025:18127): big rank number behind a game card; top 3 filled, the rest
// outlined. 189×182 from md; below md the whole item scales to 72% (136×131), as in Figma.
const props = defineProps<{
  rank: number
  title: string
  image: string
  to?: string
}>()

const top3 = computed(() => props.rank <= 3)
</script>

<template>
  <div
    class="relative h-[131px] w-[136px] shrink-0 md:h-[182px] md:w-[189px]"
    :class="{ 'overflow-hidden': !top3 }"
  >
    <div class="absolute top-0 left-0 h-[182px] w-[189px] origin-top-left max-md:scale-[0.72]">
      <span
        aria-hidden="true"
        class="absolute top-1/2 left-0 -translate-y-1/2 font-heading text-[150px] leading-[150px] font-black tracking-[-9px]"
        :class="top3 ? 'text-top-list-rank-fill' : 'top-item__outline text-transparent'"
      >{{ rank }}</span>
      <CatalogThumbnail
        :title="`${rank}. ${title}`"
        :image="image"
        :to="to"
        class="absolute top-0 left-[54px] w-[135px]"
      />
    </div>
  </div>
</template>

<style scoped>
.top-item__outline {
  -webkit-text-stroke: 1px var(--color-top-list-rank-stroke);
}
</style>
