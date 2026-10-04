<script setup lang="ts">
// Figma footer (261:36777): mob layout below xl, desktop layout from xl.
// ponytail: link lists are static until the CMS/API owns navigation.
const columns = [
  { title: 'Games:', links: [['All games', '/games'], ['Slots', '/slots'], ['Popular', '/popular'], ['Jackpot Game', '/jackpot'], ['Megaways', '/megaways'], ['Drops and Wins', '/drops-and-wins']] },
  { title: 'Promotions:', links: [['Bonuses', '/bonuses'], ['Promotions', '/promotions'], ['VIP Program', '/vip'], ['Wheel of Fortune', '/wheel'], ['Missions', '/missions'], ['Tournaments', '/tournaments']] },
  { title: 'Information:', links: [['Terms & Conditions', '/terms'], ['Responsible Gaming', '/responsible-gaming']] },
  { title: 'Help Center:', links: [['FAQ', '/faq'], ['Contacts', '/contacts']] },
]
const payments = ['visa', 'mastercard', 'skrill', 'paysafecard', 'neteller']
const socials = ['twitch', 'facebook', 'x', 'reddit', 'instagram', 'youtube', 'telegram', 'tiktok', 'linkedin']
const stores = [{ icon: 'apple', label: 'App Store' }, { icon: 'google-play', label: 'Google Play' }]

const toTop = () => window.scrollTo({ top: 0, behavior: 'smooth' })
</script>

<template>
  <footer class="relative border-t border-nav-footer-border bg-nav-footer-background px-m pt-[22px] pb-10">
    <button
      type="button"
      aria-label="Back to top"
      class="absolute top-[21px] right-m flex size-10 cursor-pointer items-center justify-center rounded-full bg-nav-footer-button-background text-nav-footer-button-icon xl:right-7"
      @click="toTop"
    >
      <svg
        viewBox="0 0 24 24"
        class="size-5"
        fill="none"
        stroke="currentColor"
        stroke-width="2.5"
        stroke-linecap="round"
        stroke-linejoin="round"
      ><path d="M12 20V4M5 11l7-7 7 7" /></svg>
    </button>

    <div class="mx-auto flex max-w-[1024px] flex-col gap-[22px] xl:max-w-[calc(1024px+272px)] xl:pl-[272px]">
      <div class="flex flex-col gap-6 xl:flex-row xl:items-start xl:justify-between">
        <button
          type="button"
          class="flex w-[156px] items-center gap-2.5 rounded-surface-xsmall px-2 py-1 text-left"
        >
          <img
            src="/icons/flags/au.svg"
            alt=""
            width="24"
            height="24"
          >
          <span class="flex flex-col gap-1">
            <span class="type-body-regular-sm text-nav-footer-text">Australia</span>
            <span class="type-body-regular-s text-nav-footer-link">English</span>
          </span>
        </button>
        <ul
          class="flex flex-wrap items-center justify-center gap-x-5 gap-y-2 border-y border-separator-subtle py-6 xl:border-0 xl:p-0 xl:pr-16"
          aria-label="Payment methods"
        >
          <li
            v-for="p in payments"
            :key="p"
          >
            <span class="sr-only">{{ p }}</span>
            <UiIcon
              :name="`payments/${p}`"
              class="h-9 w-[104px] text-nav-footer-social-icon"
            />
          </li>
        </ul>
      </div>

      <hr class="border-separator-subtle max-xl:hidden">

      <div class="flex flex-col gap-6 xl:flex-row xl:justify-between">
        <nav
          class="grid grid-cols-2 gap-x-4 gap-y-6 xl:flex xl:gap-16"
          aria-label="Footer"
        >
          <div
            v-for="col in columns"
            :key="col.title"
            class="flex flex-col gap-s"
          >
            <h2 class="type-heading-regular-h5 text-nav-footer-title">
              {{ col.title }}
            </h2>
            <ul class="flex flex-col gap-2">
              <li
                v-for="[label, to] in col.links"
                :key="to"
                class="flex items-center gap-2"
              >
                <span class="size-1 rounded-full bg-nav-footer-bullet" />
                <NuxtLink
                  :to="to"
                  class="type-body-regular-sm text-nav-footer-link hover:underline"
                >
                  {{ label }}
                </NuxtLink>
              </li>
            </ul>
          </div>
        </nav>

        <div class="flex flex-col gap-6 max-xl:flex-col-reverse xl:gap-[26px]">
          <div class="flex flex-col gap-s">
            <h2 class="type-heading-regular-h5 text-nav-footer-title">
              We are on social media:
            </h2>
            <ul class="flex flex-wrap gap-2 xl:w-[159px]">
              <li
                v-for="s in socials"
                :key="s"
              >
                <a
                  :href="`https://${s}.com`"
                  target="_blank"
                  rel="noopener noreferrer"
                  :aria-label="s"
                >
                  <img
                    :src="`/icons/social/${s}.svg`"
                    alt=""
                    class="size-8 xl:size-6"
                  >
                </a>
              </li>
            </ul>
          </div>
          <div class="flex flex-col gap-s">
            <h2 class="type-heading-regular-h5 text-nav-footer-title">
              Download the app
            </h2>
            <div class="flex gap-2">
              <a
                v-for="s in stores"
                :key="s.icon"
                href="#"
                class="flex h-8 w-[148px] items-center justify-center gap-1.5 rounded-full bg-nav-footer-button-background"
                :aria-label="`Download on ${s.label}`"
              >
                <img
                  :src="`/icons/fill/${s.icon}.svg`"
                  alt=""
                  width="16"
                  height="16"
                >
                <span class="flex flex-col text-nav-footer-text">
                  <span class="font-button text-[5px] leading-none uppercase">Download</span>
                  <span class="font-button text-[8px] leading-none font-bold">Application</span>
                </span>
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  </footer>
</template>
