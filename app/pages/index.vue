<script setup lang="ts">
import type { WinsTab } from '#shared/contracts/home'

// Home page (Figma 2015:16360 guest, 2026:30590 logged in). Session D2 adds the ticker,
// hero, stories and categories 50/50 above the rails.
const { data: feed } = await useHomeFeed()

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
    class="flex flex-col gap-2xl"
  >
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
        class="w-[135px]"
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
        class="min-w-[180px] flex-1"
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
        class="w-[135px]"
      />
    </HomeRail>

    <HomeRail
      title="Collections"
      show-all-to="/collections"
      row-class="justify-[safe_center] gap-m"
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
        class="w-[135px]"
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
        class="w-[135px]"
      />
    </HomeRail>

    <section
      aria-label="Wins"
      class="flex flex-col gap-xs rounded-surface-large bg-surface-solid-s2 p-m"
    >
      <div
        role="tablist"
        class="flex gap-2xs self-start rounded-[12px] bg-tab-bar-background-default p-2xs"
      >
        <UiTab
          v-for="tab in winsTabs"
          :key="tab.id"
          :active="winsTab === tab.id"
          @click="winsTab = tab.id"
        >
          {{ tab.label }}
        </UiTab>
      </div>
      <HomeWinsTable :rows="wins" />
    </section>
  </div>
</template>
