import { mountSuspended, registerEndpoint } from '@nuxt/test-utils/runtime'
import { flushPromises } from '@vue/test-utils'
import { describe, expect, it } from 'vitest'
import type { HomeFeed } from '#shared/contracts/home'
import Index from './index.vue'

const game = (id: string) => ({ id, title: `Game ${id}`, image: '/x.svg', to: `/games/${id}` })
const feed: HomeFeed = {
  popular: [game('p1')],
  top10: [game('t1')],
  providers: [],
  spotlight: { title: 'Hot & Cold', cover: '/x.svg', tabs: [{ label: 'High RTP', games: [game('s1')] }] },
  newReleases: [],
  collections: [],
  liveCasino: [],
  recommended: [],
}
const winRow = (tab: string) => ({ id: tab, provider: 'P', game: `Win ${tab}`, image: '/x.svg', user: 'u', bet: '1 $', multiplier: '2X', payout: '2 $', win: true })

registerEndpoint('/api/home', () => feed)
registerEndpoint('/api/wins', event => [winRow(new URL(event.node.req.url!, 'http://x').searchParams.get('tab')!)])

describe('home page', () => {
  it('renders the feed and refetches wins when the tab changes', async () => {
    const wrapper = await mountSuspended(Index)
    expect(wrapper.text()).toContain('Popular')
    expect(wrapper.text()).toContain('Win now')

    await wrapper.findAll('[role="tab"]').find(tab => tab.text() === 'Win Last Week')!.trigger('click')
    await flushPromises()
    expect(wrapper.text()).toContain('Win last-week')
  })
})
