<script setup lang="ts">
import type { ButtonHierarchy, ButtonTon } from '~/components/ui/Button.vue'
import type { AccentTone } from '~/components/ui/AccentSurface.vue'
import type { WinRow } from '~/components/home/WinsTable.vue'

// Component showcase until Storybook is set up. The checkbox flips the mock session cookie.
const hierarchies: ButtonHierarchy[] = ['primary', 'outline', 'ghost']
const tons: ButtonTon[] = ['brand', 'default', 'accent', 'warning', 'successful', 'neutral-white', 'neutral-black']
const tones: AccentTone[] = ['plum', 'dusk', 'twilight', 'ocean', 'ember', 'bronze', 'violet', 'nebula']
const cover = 'data:image/svg+xml,%3Csvg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 3 4"%3E%3Crect width="3" height="4" fill="%23294163"/%3E%3C/svg%3E'
const activeTab = ref(0)
const mockPlayer = useCookie<string | null>('mock_player')
const loggedIn = computed({
  get: () => mockPlayer.value === '1',
  set: (value) => {
    mockPlayer.value = value ? '1' : null
    refreshNuxtData('session')
  },
})
const spotlightTab = ref(0)
const games = Array.from({ length: 10 }, (_, i) => ({ title: `Game ${i + 1}`, image: cover }))
const wins: WinRow[] = [
  { id: '1', provider: 'PGSoft', game: 'Wild Bandito', image: cover, user: 'eb1a8*********9d51e', bet: '0.69 $', multiplier: '24.00X', payout: '16.47 $', win: true },
  { id: '2', provider: 'PragmaticPlay', game: 'The Dog House Megaways', image: cover, user: '4ab96*********50017', bet: '0.09 $', multiplier: '0.70X', payout: '- 0.03 $', win: false },
  { id: '3', provider: 'AmigoGaming', game: '3 Fortune Souls', image: cover, user: '46369*********3398b', bet: '0.08 $', multiplier: '0.00X', payout: '- 0.08 $', win: false },
]
</script>

<template>
  <div class="flex flex-col gap-3xl">
    <label class="flex items-center gap-xs type-body-regular-sm text-text-secondary">
      <input
        v-model="loggedIn"
        type="checkbox"
      > Logged in (shell preview)
    </label>
    <h1 class="type-heading-bold-h1">
      Pookie components
    </h1>

    <section
      v-for="hierarchy in hierarchies"
      :key="hierarchy"
      class="flex flex-wrap gap-s"
    >
      <UiButton
        v-for="ton in tons"
        :key="ton"
        :hierarchy="hierarchy"
        :ton="ton"
        icon-left="chevron-left"
        icon-right="chevron-right"
      >
        Play
      </UiButton>
      <UiButton
        :hierarchy="hierarchy"
        disabled
      >
        Play
      </UiButton>
    </section>

    <section class="flex flex-wrap items-center gap-s">
      <UiButton size="small">
        Small
      </UiButton>
      <UiButton size="medium">
        Medium
      </UiButton>
      <UiButton>Large</UiButton>
      <UiButton
        hierarchy="link"
        ton="default"
        to="/"
      >
        Show all
      </UiButton>
      <UiIconButton
        icon="chevron-right"
        label="Next"
      />
      <UiIconButton
        icon="chevron-right"
        label="Next"
        size="m"
      />
      <UiIconButton
        icon="chevron-right"
        label="Next"
        disabled
      />
      <UiCurrencyBadge />
    </section>

    <div
      role="tablist"
      class="flex gap-xs"
    >
      <UiTab
        v-for="(tab, i) in ['All wins', 'High rollers', 'Lucky wins']"
        :key="tab"
        :active="activeTab === i"
        @click="activeTab = i"
      >
        {{ tab }}
      </UiTab>
    </div>

    <section class="flex flex-col gap-m">
      <UiSectionHead
        title="Popular"
        show-all-to="/"
      >
        <template #icon>
          <img
            src="/icons/cup.svg"
            alt=""
            width="14"
            height="16"
          >
        </template>
      </UiSectionHead>
      <div class="flex gap-xs overflow-x-auto">
        <CatalogThumbnail
          v-for="(w, n) in [198, 171, 135, 122, 80]"
          :key="w"
          title="Great Rhino Megaways"
          :image="cover"
          :badge="n === 0 ? 'New' : undefined"
          to="/"
          class="shrink-0"
          :style="{ width: `${w}px` }"
        />
      </div>
    </section>

    <section class="grid grid-cols-2 gap-m md:grid-cols-4">
      <div
        v-for="tone in tones"
        :key="tone"
        class="relative h-[200px] overflow-hidden rounded-surface-large"
      >
        <UiAccentSurface :tone="tone" />
        <span class="relative p-m type-body-regular-m">{{ tone }}</span>
      </div>
    </section>

    <section class="flex flex-wrap gap-m">
      <RewardsRewardCard
        title="Lucky Wheel"
        text="Daily spin for free spins and coins"
        xp="Unlocked at 200 XP"
        action="Spin now"
        to="/"
        class="w-[245px]"
      >
        <template #icon>
          <img
            src="/icons/cup.svg"
            alt=""
            width="21"
            height="24"
          >
        </template>
      </RewardsRewardCard>
      <RewardsRewardCard
        title="Lucky Wheel"
        text="Daily spin for free spins and coins"
        xp="Unlocked at 200 XP"
        action="Spin now"
        locked
        class="w-[245px]"
      >
        <template #icon>
          <img
            src="/icons/cup.svg"
            alt=""
            width="21"
            height="24"
          >
        </template>
      </RewardsRewardCard>
    </section>

    <section class="flex gap-xs overflow-x-auto">
      <CatalogTopItem
        v-for="n in 4"
        :key="n"
        :rank="n"
        title="Game"
        :image="cover"
      />
    </section>

    <section class="flex flex-wrap gap-m">
      <CatalogProviderCard
        name="ELK"
        logo="/providers/elk.svg"
        to="/"
        tournament
      />
      <CatalogProviderCard
        name="Evolution"
        logo="/providers/evolution.svg"
        to="/"
        tag="top"
        tournament
      />
      <CatalogProviderCard
        name="Evolution"
        logo="/providers/evolution.svg"
        to="/"
        tag="live"
        tournament
      />
    </section>

    <section class="flex justify-center-safe gap-m overflow-x-auto">
      <CatalogCollectionCard
        title="Game collection"
        count="48 games"
        :banner="cover"
        :games="games"
        to="/"
      />
    </section>

    <CatalogCategorySpotlight
      v-model="spotlightTab"
      title="Hot &amp; Cold"
      :cover="cover"
      :tabs="['High RTP', 'High Volatility']"
      :games="games"
    />

    <HomeWinsTable :rows="wins" />
  </div>
</template>
