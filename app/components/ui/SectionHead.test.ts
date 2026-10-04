import { mountSuspended } from '@nuxt/test-utils/runtime'
import { describe, expect, it } from 'vitest'
import SectionHead from './SectionHead.vue'

describe('UiSectionHead', () => {
  it('emits prev and next from the arrows', async () => {
    const wrapper = await mountSuspended(SectionHead, { props: { title: 'Popular' } })
    await wrapper.get('button[aria-label="Previous"]').trigger('click')
    await wrapper.get('button[aria-label="Next"]').trigger('click')
    expect(wrapper.emitted('prev')).toHaveLength(1)
    expect(wrapper.emitted('next')).toHaveLength(1)
  })

  it('hides all actions when there is no link and no arrows', async () => {
    const wrapper = await mountSuspended(SectionHead, { props: { title: 'Popular', arrows: false } })
    expect(wrapper.find('button').exists()).toBe(false)
    expect(wrapper.find('a').exists()).toBe(false)
  })
})
