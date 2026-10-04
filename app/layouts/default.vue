<script setup lang="ts">
// Page shell. Breakpoints from the handoff: mob < md (bottom nav), md tablet (no sidebar,
// no bottom nav), lg icon-rail sidebar, xl full sidebar and fluid content with 72px gutters
// (72 = the 24px flex gap + pl-12). Space above the footer: 96 mob, 48 tablet, 80 desktop;
// from lg the wrapper's p-xs adds 8px, so main's bottom padding is 8px less there.
const { data: session } = await useSession()
const player = computed(() => session.value.player)
const loggedIn = computed(() => !!player.value)
</script>

<template>
  <div class="min-h-dvh max-md:pb-16">
    <LayoutAppHeader
      :logged-in="loggedIn"
      :balance="player?.balance"
      :coins="player?.coins"
    />
    <div class="flex gap-6 lg:p-xs lg:pr-0">
      <LayoutAppSidebar
        :logged-in="loggedIn"
        class="sticky top-[72px] max-h-[calc(100dvh-80px)] shrink-0 self-start overflow-y-auto max-lg:hidden"
      />
      <div class="flex min-w-0 flex-1 flex-col">
        <main class="mx-auto w-full max-w-[1024px] px-xs pt-m pb-24 md:px-6 md:pb-12 lg:pb-10 xl:max-w-[none] xl:pr-[72px] xl:pb-[72px] xl:pl-12">
          <slot />
        </main>
      </div>
    </div>
    <LayoutAppFooter />
    <LayoutBottomNav
      :variant="loggedIn ? 'wheel' : 'simple'"
      :rewards="player?.rewards"
      class="md:hidden"
    />
  </div>
</template>
