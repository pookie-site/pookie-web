<script setup lang="ts">
// Figma wins-table (2057:24574). Amounts arrive formatted from the API; `win` picks the payout colour.
// Below xl it switches to the mob layout: game on the left, multiplier over payout on the right.
export interface WinRow {
  id: string
  provider: string
  game: string
  image: string
  user: string
  bet: string
  multiplier: string
  payout: string
  win: boolean
}

withDefaults(defineProps<{
  rows: WinRow[]
  columns?: [string, string, string, string, string]
}>(), { columns: () => ['Game', 'User', 'Bet amount', 'Multiplier', 'Payment'] })
</script>

<template>
  <div class="rounded-surface-small border border-table-border bg-table-background p-xs xl:p-s">
    <table class="-my-xs w-full border-separate border-spacing-y-xs xl:table-fixed">
      <thead class="max-xl:sr-only">
        <tr class="type-table-header text-table-header-text">
          <th
            scope="col"
            class="pb-1 pl-m text-left xl:w-[252px]"
          >
            {{ columns[0] }}
          </th>
          <th
            scope="col"
            class="pb-1 pl-m text-left xl:w-[216px]"
          >
            {{ columns[1] }}
          </th>
          <th
            scope="col"
            class="pb-1 pl-m text-left xl:w-[176px]"
          >
            {{ columns[2] }}
          </th>
          <th
            scope="col"
            class="pb-1 pl-m text-left xl:w-[156px]"
          >
            {{ columns[3] }}
          </th>
          <th
            scope="col"
            class="pr-6 pb-1 pl-m text-left"
          >
            {{ columns[4] }}
          </th>
        </tr>
      </thead>
      <tbody>
        <tr
          v-for="row in rows"
          :key="row.id"
          class="odd:bg-table-row-background-odd even:bg-table-row-background-even hover:bg-table-row-background-hover [&>td]:py-s [&>td:first-child]:rounded-l-surface-xsmall [&>td:last-child]:rounded-r-surface-xsmall"
        >
          <td class="w-full max-w-0 pl-s xl:w-auto xl:max-w-[none] xl:pl-m">
            <div class="flex items-center gap-s">
              <img
                :src="row.image"
                alt=""
                loading="lazy"
                class="h-10 w-8 shrink-0 rounded-surface-xsmall object-cover"
              >
              <div class="flex min-w-0 flex-col gap-0.5">
                <span class="truncate type-table-caption text-table-cell-caption">{{ row.provider }}</span>
                <span class="truncate type-table-title text-table-cell-title">{{ row.game }}</span>
              </div>
            </div>
          </td>
          <td class="truncate pl-m type-table-text text-table-cell-text max-xl:hidden">
            {{ row.user }}
          </td>
          <td class="pl-m max-xl:hidden">
            <span class="flex items-center gap-xs type-table-value text-table-cell-value">
              <UiCurrencyBadge />{{ row.bet }}
            </span>
          </td>
          <td class="pl-m type-table-value text-table-cell-value max-xl:hidden">
            {{ row.multiplier }}
          </td>
          <td class="pr-s pl-s xl:pr-6 xl:pl-m">
            <div class="flex flex-col items-end gap-0.5 whitespace-nowrap xl:flex-row xl:items-center xl:justify-start xl:gap-xs">
              <span class="type-table-value text-table-cell-value xl:hidden">{{ row.multiplier }}</span>
              <UiCurrencyBadge class="max-xl:hidden" />
              <span
                class="type-table-amount xl:type-table-value"
                :class="row.win ? 'text-table-value-positive' : 'text-table-value-negative'"
              >{{ row.payout }}</span>
            </div>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>
