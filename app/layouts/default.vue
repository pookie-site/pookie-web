<script setup lang="ts">
// Page shell. Breakpoints from the handoff: mob < md (bottom nav), md tablet (no sidebar,
// no bottom nav), lg icon-rail sidebar, xl full sidebar with 1024px content.
// ponytail: the logged-in flag and balance are local state until auth and wallet come from the API (session D).
const loggedIn = useState('auth:logged-in', () => false)
</script>

<template>
  <div class="min-h-dvh max-md:pb-16">
    <LayoutAppHeader
      :logged-in="loggedIn"
      balance="180.88"
      coins="5 800.45"
    />
    <div class="flex gap-6 lg:p-xs lg:pr-0">
      <LayoutAppSidebar
        :logged-in="loggedIn"
        class="sticky top-[72px] max-h-[calc(100dvh-80px)] shrink-0 self-start overflow-y-auto max-lg:hidden"
      />
      <div class="flex min-w-0 flex-1 flex-col">
        <main class="mx-auto w-full max-w-[1024px] px-xs py-m md:px-6 lg:px-6 xl:px-0">
          <slot />
        </main>
      </div>
    </div>
    <LayoutAppFooter />
    <LayoutBottomNav
      :variant="loggedIn ? 'wheel' : 'simple'"
      :rewards="14"
      class="md:hidden"
    />
  </div>
</template>
