<script setup lang="ts">
import type { ButtonHierarchy, ButtonTon } from '~/components/ui/Button.vue'
import type { AccentTone } from '~/components/ui/AccentSurface.vue'

// Placeholder until the home page (session D): a showcase of the base components.
const hierarchies: ButtonHierarchy[] = ['primary', 'outline', 'ghost']
const tons: ButtonTon[] = ['brand', 'default', 'accent', 'warning', 'successful', 'neutral-white', 'neutral-black']
const tones: AccentTone[] = ['plum', 'dusk', 'twilight', 'ocean', 'ember', 'bronze', 'violet', 'nebula']
const cover = 'data:image/svg+xml,%3Csvg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 3 4"%3E%3Crect width="3" height="4" fill="%23294163"/%3E%3C/svg%3E'
const activeTab = ref(0)
</script>

<template>
  <div>
    <NuxtRouteAnnouncer />
    <main class="flex flex-col gap-3xl p-m">
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
          <CatalogGameCard
            v-for="n in 4"
            :key="n"
            title="Game"
            :image="cover"
            :badge="n === 1 ? 'New' : undefined"
            class="w-[135px]"
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
    </main>
  </div>
</template>
