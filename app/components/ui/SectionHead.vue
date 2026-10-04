<script setup lang="ts">
// Figma section-head (2013:16325): rail header. Arrows hide below md, where rails scroll by touch.
withDefaults(defineProps<{
  title: string
  showAllTo?: string
  showAllLabel?: string
  arrows?: boolean
  prevLabel?: string
  nextLabel?: string
}>(), {
  showAllTo: undefined,
  showAllLabel: 'Show all',
  arrows: true,
  prevLabel: 'Previous',
  nextLabel: 'Next',
})

defineEmits<{ prev: [], next: [] }>()
</script>

<template>
  <div class="flex items-center justify-between gap-xs">
    <h2 class="flex min-w-0 items-center gap-xs type-heading-bold-h5 text-section-head-title">
      <span
        v-if="$slots.icon"
        class="flex size-5 shrink-0 items-center justify-center"
      ><slot name="icon" /></span>
      <span class="truncate">{{ title }}</span>
    </h2>
    <div
      v-if="showAllTo || arrows"
      class="flex shrink-0 items-center gap-xs"
    >
      <UiButton
        v-if="showAllTo"
        hierarchy="link"
        ton="default"
        :to="showAllTo"
      >
        {{ showAllLabel }}
      </UiButton>
      <template v-if="arrows">
        <UiIconButton
          icon="chevron-left"
          :label="prevLabel"
          class="max-md:hidden"
          @click="$emit('prev')"
        />
        <UiIconButton
          icon="chevron-right"
          :label="nextLabel"
          class="max-md:hidden"
          @click="$emit('next')"
        />
      </template>
    </div>
  </div>
</template>
