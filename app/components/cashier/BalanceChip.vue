<script setup lang="ts">
// Figma splite btn (608:37208): balance and coins from the API plus the deposit action.
// `compact` swaps the Deposit label for an icon, as in the 375 header.
withDefaults(defineProps<{
  balance: string
  coins: string
  depositTo: string
  compact?: boolean
  depositLabel?: string
  walletLabel?: string
}>(), { depositLabel: 'Deposit', walletLabel: 'Open wallet' })

defineEmits<{ open: [] }>()
</script>

<template>
  <div class="flex items-stretch">
    <button
      type="button"
      :aria-label="walletLabel"
      class="balance-chip__info flex w-[120px] cursor-pointer items-center justify-between rounded-l-full py-1 pr-1 pl-3 focus-visible:outline-2 focus-visible:outline-border-brand"
      @click="$emit('open')"
    >
      <span class="flex flex-col gap-0.5 text-left type-body-regular-s">
        <span class="flex items-center gap-1.5 text-header-balance-value">
          <img
            src="/icons/fill/diamond.svg"
            alt=""
            width="12"
            height="12"
          >{{ balance }}
        </span>
        <span class="flex items-center gap-1.5 text-header-balance-coins">
          <img
            src="/icons/fill/coin.svg"
            alt=""
            width="12"
            height="12"
          >{{ coins }}
        </span>
      </span>
      <UiIcon
        name="chevron-left"
        class="size-5 text-nav-header-icon"
      />
    </button>
    <UiButton
      size="large"
      :to="depositTo"
      :aria-label="compact ? depositLabel : undefined"
      class="rounded-l-none!"
      :class="compact ? 'px-2.5!' : 'px-4! type-button-label-s!'"
    >
      <UiIcon
        v-if="compact"
        name="wallet"
        class="size-5"
      />
      <template v-else>
        {{ depositLabel }}
      </template>
    </UiButton>
  </div>
</template>

<style scoped>
.balance-chip__info {
  background: linear-gradient(90deg, var(--color-header-balance-background-start) 38%, var(--color-header-balance-background-end) 103%);
}
</style>
