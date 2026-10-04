<script setup lang="ts">
// Figma icon-button (2051:24010): round icon-only action, e.g. carousel arrows or close.
withDefaults(defineProps<{
  icon: string
  label: string
  size?: 's' | 'm'
  disabled?: boolean
}>(), { size: 's' })
</script>

<template>
  <button
    type="button"
    :aria-label="label"
    :disabled="disabled"
    class="inline-flex shrink-0 cursor-pointer items-center justify-center rounded-input bg-icon-button-background-default text-icon-button-icon-default focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-border-brand enabled:hover:bg-icon-button-background-hover enabled:hover:text-icon-button-icon-hover enabled:active:bg-icon-button-background-active enabled:active:text-icon-button-icon-active disabled:cursor-not-allowed disabled:bg-icon-button-background-disable disabled:text-icon-button-icon-disable"
    :class="size === 'm' ? 'size-9' : 'size-7'"
  >
    <UiIcon
      :name="icon"
      :class="size === 'm' ? 'size-6' : 'size-5'"
    />
  </button>
</template>
