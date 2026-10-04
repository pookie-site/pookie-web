<script setup lang="ts">
// Home rail: section-head over a horizontal scroller. Arrows page the scroller by its width;
// below md they are hidden and the row scrolls by touch.
withDefaults(defineProps<{
  title: string
  showAllTo?: string
  rowClass?: string
}>(), { showAllTo: undefined, rowClass: 'gap-xs md:gap-s' })

const scroller = useTemplateRef('scroller')
const page = (dir: 1 | -1) => scroller.value?.scrollBy({ left: dir * scroller.value.clientWidth, behavior: 'smooth' })
</script>

<template>
  <section class="flex flex-col gap-s">
    <UiSectionHead
      :title="title"
      :show-all-to="showAllTo"
      @prev="page(-1)"
      @next="page(1)"
    >
      <template
        v-if="$slots.icon"
        #icon
      >
        <slot name="icon" />
      </template>
    </UiSectionHead>
    <div
      ref="scroller"
      class="flex snap-x overflow-x-auto overflow-y-hidden [scrollbar-width:none] *:shrink-0 *:snap-start"
      :class="rowClass"
    >
      <slot />
    </div>
  </section>
</template>
