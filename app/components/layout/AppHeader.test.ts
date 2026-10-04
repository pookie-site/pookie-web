import { mountSuspended } from '@nuxt/test-utils/runtime'
import { describe, expect, it } from 'vitest'
import AppHeader from './AppHeader.vue'

describe('LayoutAppHeader', () => {
  it('offers sign-up to guests', async () => {
    const wrapper = await mountSuspended(AppHeader, { props: { loggedIn: false } })
    expect(wrapper.text()).toContain('Join Now')
    expect(wrapper.text()).not.toContain('Deposit')
  })

  it('shows the balance from props and the deposit action to players', async () => {
    const wrapper = await mountSuspended(AppHeader, { props: { loggedIn: true, balance: '180.88', coins: '5 800.45' } })
    expect(wrapper.text()).toContain('180.88')
    expect(wrapper.text()).toContain('5 800.45')
    expect(wrapper.text()).toContain('Deposit')
    expect(wrapper.text()).not.toContain('Join Now')
  })
})
