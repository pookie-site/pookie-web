import { mountSuspended } from '@nuxt/test-utils/runtime'
import { describe, expect, it } from 'vitest'
import WinsTable, { type WinRow } from './WinsTable.vue'

const row = (id: string, win: boolean): WinRow => ({
  id, provider: 'PGSoft', game: 'Wild Bandito', image: '/x.png', user: 'eb1a8***', bet: '0.69 $', multiplier: '24.00X', payout: win ? '16.47 $' : '- 0.03 $', win,
})

describe('HomeWinsTable', () => {
  it('colours the payout by the win flag from the API', async () => {
    const wrapper = await mountSuspended(WinsTable, { props: { rows: [row('1', true), row('2', false)] } })
    const payouts = wrapper.findAll('tbody tr').map(tr => tr.find('.type-table-amount'))
    expect(payouts[0]!.classes()).toContain('text-table-value-positive')
    expect(payouts[1]!.classes()).toContain('text-table-value-negative')
  })

  it('keeps column headers for screen readers', async () => {
    const wrapper = await mountSuspended(WinsTable, { props: { rows: [] } })
    expect(wrapper.findAll('th').map(th => th.text())).toEqual(['Game', 'User', 'Bet amount', 'Multiplier', 'Payment'])
  })
})
