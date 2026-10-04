<script setup lang="ts">
// Figma side bar (151:17495). Full 248px from xl; an icon rail between lg and xl.
// ponytail: menu entries are static until the CMS/API owns navigation.
const props = defineProps<{ loggedIn: boolean }>()

const area = ref(0)

interface NavItem { label: string, to: string, icon?: string }

const personal: NavItem[] = [
  { label: 'Favorite', to: '/favorites', icon: 'heart' },
  { label: 'Recently played', to: '/recent', icon: 'recent' },
]
const features: NavItem[] = [
  { label: 'Mission', to: '/missions', icon: 'goal' },
  { label: 'Tournament', to: '/tournaments', icon: 'cup' },
  { label: 'Wheel of Fortune', to: '/wheel', icon: 'wheel' },
  { label: 'Loyalty Program', to: '/loyalty', icon: 'cake' },
]
const info: NavItem[] = [
  { label: 'Providers', to: '/providers' },
  { label: 'Responsible gaming', to: '/responsible-gaming' },
  { label: 'Information Centre', to: '/info' },
  { label: 'FAQ', to: '/faq' },
]
const categories = [
  { palette: 1, label: 'Slots', icon: '/categories/slots.png', to: '/slots' },
  { palette: 2, label: 'Live', icon: '/categories/live.png', to: '/live' },
  { palette: 3, label: 'Table', icon: '/categories/table.png', to: '/table' },
  { palette: 4, label: 'Bingo', icon: '/categories/bingo.png', to: '/bingo' },
  { palette: 9, label: 'All slots', icon: '/icons/fill/cherry.svg', to: '/games' },
]

const sections = computed(() => props.loggedIn ? [personal] : [])
</script>

<template>
  <aside
    class="flex w-[72px] flex-col gap-s rounded-surface-medium border border-nav-side-menu-border bg-nav-side-menu-background p-xs xl:w-[248px]"
    aria-label="Main menu"
  >
    <NuxtLink
      to="/store"
      class="sidebar-banner relative flex h-20 items-center justify-center overflow-hidden rounded-surface-small max-xl:hidden"
    >
      <img
        src="/banners/bonus-store.jpg"
        alt=""
        class="absolute inset-0 size-full object-cover opacity-40 blur-[2px]"
      >
      <span class="relative w-[134px] text-center type-heading-bold-h2 text-nav-side-menu-banner-title">Bonus Store</span>
    </NuxtLink>

    <div
      role="tablist"
      aria-label="Product"
      class="flex gap-3xs rounded-[10px] bg-tab-bar-background-default p-3xs max-xl:hidden"
    >
      <UiTab
        v-for="(tab, i) in ['Casino', 'Sport']"
        :key="tab"
        size="small"
        :active="area === i"
        class="flex-1"
        @click="area = i"
      >
        {{ tab }}
      </UiTab>
    </div>

    <nav
      v-for="(items, s) in sections"
      :key="s"
      class="flex flex-col gap-0.5"
    >
      <LayoutSidebarLink
        v-for="item in items"
        :key="item.to"
        v-bind="item"
      />
    </nav>

    <div class="grid grid-cols-1 gap-xs xl:grid-cols-4">
      <CatalogCategoryTile
        v-for="c in categories"
        :key="c.to"
        v-bind="c"
      />
    </div>

    <hr class="border-separator-subtle">

    <nav class="flex flex-col gap-0.5">
      <LayoutSidebarLink
        v-for="item in features"
        :key="item.to"
        v-bind="item"
      />
    </nav>

    <nav class="flex flex-col gap-0.5 rounded-surface-small bg-nav-side-menu-section-background p-xs max-xl:hidden">
      <LayoutSidebarLink
        v-for="item in info"
        :key="item.to"
        v-bind="item"
      />
    </nav>
  </aside>
</template>

<style scoped>
.sidebar-banner {
  border: 1px solid transparent;
  background:
    linear-gradient(var(--color-nav-side-menu-banner-background), var(--color-nav-side-menu-banner-background)) padding-box,
    linear-gradient(180deg, var(--color-nav-side-menu-banner-border-start), var(--color-nav-side-menu-banner-border-end)) border-box;
}
</style>
