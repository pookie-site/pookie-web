<script setup lang="ts">
import type { WinsTab } from '#shared/contracts/home'

// Home page (Figma 2015:16360 guest, 2026:30590 logged in). The hero pairs the promo with
// the XP card for players and the sign-up form for guests.
const { data: feed } = await useHomeFeed()
const { data: session } = await useSession()
const player = computed(() => session.value.player)

const spotlightTab = ref(0)
const spotlightGames = computed(() => feed.value?.spotlight.tabs[spotlightTab.value]?.games ?? [])

const winsTabs: { id: WinsTab, label: string }[] = [
  { id: 'now', label: 'Winning Now' },
  { id: 'last-week', label: 'Win Last Week' },
]
const winsTab = ref<WinsTab>('now')
const { data: wins } = await useWins(winsTab)

useSeoMeta({ title: 'Pookie' })
</script>

<template>
  <div
    v-if="feed"
    class="flex flex-col gap-xl xl:gap-2xl"
  >
    <HomeTicker :wins="feed.ticker" />

    <div class="grid gap-xl md:grid-cols-2 xl:grid-cols-[minmax(0,1fr)_354px]">
      <HomePromoCard
        :title="feed.promo.title"
        :text="feed.promo.text"
        :image="feed.promo.image"
        :action="feed.promo.action"
        :to="feed.promo.to"
        :note="player ? `${player.coins} coins` : undefined"
        class="min-h-[170px]"
      />
      <RewardsXpCard
        v-if="player"
        :name="player.name"
      />
      <div
        v-else
        class="rounded-surface-large border border-promo-card-border bg-promo-card-background p-m md:p-xl"
      >
        <AuthSignUpForm />
      </div>
    </div>

    <HomeStories :stories="feed.stories" />

    <div class="grid gap-s md:grid-cols-2 md:gap-m">
      <CatalogCategoryCard
        v-for="category in feed.categories"
        :key="category.id"
        :title="category.title"
        :count="category.count"
        :action="category.action"
        :to="category.to"
        :tone="category.tone"
        :art="category.art"
      />
    </div>

    <HomeRail
      title="Popular"
      show-all-to="/games/popular"
    >
      <template #icon>
        <img
          src="/icons/fill/diamond.svg"
          alt=""
        >
      </template>
      <CatalogThumbnail
        v-for="game in feed.popular"
        :key="game.id"
        :title="game.title"
        :image="game.image"
        :badge="game.badge"
        :to="game.to"
        class="w-[104px] md:w-[135px]"
      />
    </HomeRail>

    <HomeRail
      title="Top 10 this week"
      show-all-to="/games/top"
      row-class="gap-xs"
    >
      <template #icon>
        <img
          src="/icons/fill/cup.svg"
          alt=""
        >
      </template>
      <CatalogTopItem
        v-for="(game, i) in feed.top10"
        :key="game.id"
        :rank="i + 1"
        :title="game.title"
        :image="game.image"
        :to="game.to"
      />
    </HomeRail>

    <HomeRail
      title="Providers"
      show-all-to="/providers"
      row-class="gap-m"
    >
      <template #icon>
        <img
          src="/icons/fill/coin.svg"
          alt=""
        >
      </template>
      <CatalogProviderCard
        v-for="provider in feed.providers"
        :key="provider.id"
        :name="provider.name"
        :logo="provider.logo"
        :to="provider.to"
        :tag="provider.tag"
        :tournament="provider.tournament"
        class="min-w-[150px] flex-1 md:min-w-[180px]"
      />
    </HomeRail>

    <CatalogCategorySpotlight
      v-model="spotlightTab"
      :title="feed.spotlight.title"
      :cover="feed.spotlight.cover"
      :tabs="feed.spotlight.tabs.map(tab => tab.label)"
      :games="spotlightGames"
    />

    <HomeRail
      title="New releases"
      show-all-to="/games/new"
    >
      <template #icon>
        <img
          src="/icons/fill/gift.svg"
          alt=""
        >
      </template>
      <CatalogThumbnail
        v-for="game in feed.newReleases"
        :key="game.id"
        :title="game.title"
        :image="game.image"
        :badge="game.badge"
        :to="game.to"
        class="w-[104px] md:w-[135px]"
      />
    </HomeRail>

    <HomeRail
      title="Collections"
      show-all-to="/collections"
      row-class="justify-center-safe gap-m"
    >
      <template #icon>
        <img
          src="/icons/fill/cherry.svg"
          alt=""
        >
      </template>
      <CatalogCollectionCard
        v-for="collection in feed.collections"
        :key="collection.id"
        :title="collection.title"
        :count="collection.count"
        :banner="collection.banner"
        :games="collection.games"
        :to="collection.to"
      />
    </HomeRail>

    <HomeRail
      title="Live Casino"
      show-all-to="/live"
    >
      <template #icon>
        <img
          src="/icons/fill/wheel.svg"
          alt=""
        >
      </template>
      <CatalogThumbnail
        v-for="game in feed.liveCasino"
        :key="game.id"
        :title="game.title"
        :image="game.image"
        :badge="game.badge"
        :to="game.to"
        class="w-[104px] md:w-[135px]"
      />
    </HomeRail>

    <HomeRail
      title="Recommended for you"
      show-all-to="/games/recommended"
    >
      <template #icon>
        <img
          src="/icons/fill/heart.svg"
          alt=""
        >
      </template>
      <CatalogThumbnail
        v-for="game in feed.recommended"
        :key="game.id"
        :title="game.title"
        :image="game.image"
        :badge="game.badge"
        :to="game.to"
        class="w-[104px] md:w-[135px]"
      />
    </HomeRail>

    <section
      aria-label="Wins"
      class="flex flex-col gap-xs rounded-surface-large bg-surface-solid-s2 p-xs md:p-m"
    >
      <div
        role="tablist"
        class="flex gap-2xs rounded-[12px] bg-tab-bar-background-default p-2xs md:self-start"
      >
        <UiTab
          v-for="tab in winsTabs"
          :key="tab.id"
          :active="winsTab === tab.id"
          class="max-md:flex-1"
          @click="winsTab = tab.id"
        >
          {{ tab.label }}
        </UiTab>
      </div>
      <HomeWinsTable :rows="wins" />
    </section>
  </div>
</template>
