<script setup lang="ts">
// Figma header (151:16180): 375 layout below lg, 1440 layout from lg. The left block
// matches the sidebar width at xl so the logo sits above it.
defineProps<{
  loggedIn: boolean
  balance?: string
  coins?: string
}>()

defineEmits<{ search: [], chat: [], wallet: [] }>()
</script>

<template>
  <header class="sticky top-0 z-30 flex items-center justify-between border-b border-nav-header-border bg-nav-header-background px-xs py-2.5 lg:h-16 lg:py-0 lg:pr-10 lg:pl-2">
    <div class="flex items-center gap-4 xl:gap-20">
      <NuxtLink
        to="/"
        aria-label="Pookie home"
        class="flex w-[98px] justify-center xl:w-[248px]"
      >
        <UiIcon
          name="brand/logo"
          class="h-[21px] w-[79px] text-nav-header-logo"
        />
      </NuxtLink>
      <div class="flex items-center gap-4 max-lg:hidden">
        <LayoutHeaderIconButton
          icon="search"
          label="Search"
          @click="$emit('search')"
        />
        <NuxtLink
          v-if="loggedIn"
          to="/rewards"
          class="flex items-center gap-1 type-button-label-s text-nav-header-link"
        >
          <span class="flex size-10 items-center justify-center rounded-full border border-nav-icon-button-border-default bg-nav-icon-button-background-default">
            <img
              src="/icons/fill/cake.svg"
              alt=""
              width="20"
              height="20"
            >
          </span>
          Reward HUB
        </NuxtLink>
      </div>
    </div>

    <div class="flex items-center gap-2 lg:gap-3">
      <template v-if="loggedIn">
        <CashierBalanceChip
          :balance="balance ?? ''"
          :coins="coins ?? ''"
          deposit-to="/cashier"
          class="lg:hidden"
          compact
          @open="$emit('wallet')"
        />
        <CashierBalanceChip
          :balance="balance ?? ''"
          :coins="coins ?? ''"
          deposit-to="/cashier"
          class="max-lg:hidden"
          @open="$emit('wallet')"
        />
        <LayoutHeaderIconButton
          icon="notifications"
          label="Notifications"
          class="max-lg:order-first"
        />
        <LayoutHeaderIconButton
          icon="chat"
          label="Chat"
          class="max-lg:hidden"
          @click="$emit('chat')"
        />
      </template>
      <template v-else>
        <UiButton
          size="large"
          to="/signup"
          class="px-4! type-button-label-s!"
        >
          Join Now
        </UiButton>
        <LayoutHeaderIconButton
          icon="chat"
          label="Chat"
          @click="$emit('chat')"
        />
      </template>
      <button
        type="button"
        aria-label="Language: English"
        class="flex size-10 items-center justify-center max-lg:hidden"
      >
        <img
          src="/icons/flags/au.svg"
          alt=""
          width="22"
          height="22"
        >
      </button>
    </div>
  </header>
</template>
