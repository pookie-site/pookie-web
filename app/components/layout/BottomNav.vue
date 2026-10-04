<script setup lang="ts">
// Figma bottom-nav_bar (172:22946), mobile only. State=wheel for players (wheel button in
// the middle), State=simple for guests. `rewards` is the badge count from the API.
// ponytail: the wheel notch in the bar is drawn as a plain rounded bar; add the SVG cut-out if needed.
const props = defineProps<{
  variant: 'wheel' | 'simple'
  rewards?: number
}>()

defineEmits<{ menu: [] }>()

const items = computed(() => props.variant === 'wheel'
  ? [{ icon: 'cherry', label: 'Slots', to: '/slots' }, null, { icon: 'cake', label: 'Reward HUB', to: '/rewards', badge: true }, { icon: 'search', label: 'Search', to: '/search' }]
  : [{ icon: 'cherry', label: 'Slots', to: '/slots' }, { icon: 'cake', label: 'Reward HUB', to: '/rewards', badge: true }, { icon: 'chat', label: 'Chat', to: '/chat' }, { icon: 'search', label: 'Search', to: '/search' }])
</script>

<template>
  <nav
    class="fixed inset-x-0 bottom-0 z-30 h-16 bg-nav-bottom-background"
    aria-label="Quick menu"
  >
    <div class="bottom-nav__bar absolute inset-x-1 bottom-1 flex h-[60px] items-stretch justify-between rounded-3xl p-1">
      <button
        type="button"
        class="bottom-nav__item"
        @click="$emit('menu')"
      >
        <img
          src="/icons/fill/menu.svg"
          alt=""
          width="20"
          height="20"
        >
        <span>Menu</span>
      </button>
      <template
        v-for="(item, i) in items"
        :key="i"
      >
        <span
          v-if="!item"
          class="w-16 shrink-0"
        />
        <NuxtLink
          v-else
          :to="item.to"
          class="bottom-nav__item"
        >
          <span class="relative">
            <img
              :src="`/icons/fill/${item.icon}.svg`"
              alt=""
              width="20"
              height="20"
            >
            <span
              v-if="item.badge && rewards"
              class="absolute -top-2 left-4 flex size-3.5 items-center justify-center rounded-full bg-nav-bottom-badge-background type-body-regular-xxs text-nav-bottom-badge-text"
            >{{ rewards }}</span>
          </span>
          <span>{{ item.label }}</span>
        </NuxtLink>
      </template>
    </div>
    <NuxtLink
      v-if="variant === 'wheel'"
      to="/wheel"
      aria-label="Wheel of Fortune"
      class="bottom-nav__wheel absolute -top-[26px] left-1/2 size-[60px] -translate-x-1/2 overflow-hidden rounded-full"
    >
      <img
        src="/brand/wheel.png"
        alt=""
        class="size-full object-cover"
      >
    </NuxtLink>
  </nav>
</template>

<style scoped>
.bottom-nav__bar,
.bottom-nav__wheel {
  border: 1px solid transparent;
  background:
    radial-gradient(144px 24px at 50% 0, var(--color-nav-bottom-bar-glow-start), var(--color-nav-bottom-bar-glow-end)) padding-box,
    linear-gradient(var(--color-nav-bottom-bar-background), var(--color-nav-bottom-bar-background)) padding-box,
    linear-gradient(180deg, var(--color-nav-bottom-bar-border-start), var(--color-nav-bottom-bar-border-end)) border-box;
}

.bottom-nav__item {
  display: flex;
  flex: 1 0 0;
  flex-direction: column;
  align-items: center;
  gap: 4px;
  border-radius: 20px;
  padding-block: 8px;
  font-family: var(--font-body);
  font-size: var(--text-body-xs);
  line-height: 0.75rem;
  color: var(--color-nav-bottom-item-label-default);
  cursor: pointer;
}

.bottom-nav__item.router-link-active {
  background: var(--color-nav-bottom-item-background-active);
  color: var(--color-nav-bottom-item-label-active);
}
</style>
