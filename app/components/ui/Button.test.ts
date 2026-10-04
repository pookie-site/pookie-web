import { mountSuspended } from '@nuxt/test-utils/runtime'
import { describe, expect, it } from 'vitest'
import Button from './Button.vue'

describe('UiButton', () => {
  it('maps hierarchy and ton to the Mapped button tokens', async () => {
    const wrapper = await mountSuspended(Button, { props: { hierarchy: 'outline', ton: 'neutral-white' } })
    const style = wrapper.attributes('style')
    expect(style).toContain('--btn-bg-hover: var(--color-button-outline-neutral-white-background-hover)')
    expect(style).toContain('--btn-label-disable: var(--color-button-outline-neutral-white-label-disable)')
  })

  it('renders a disabled button, or a link with aria-disabled', async () => {
    const button = await mountSuspended(Button, { props: { disabled: true } })
    expect(button.element.tagName).toBe('BUTTON')
    expect(button.attributes('disabled')).toBeDefined()

    const link = await mountSuspended(Button, { props: { to: '/lobby', disabled: true } })
    expect(link.element.tagName).toBe('A')
    expect(link.attributes('aria-disabled')).toBe('true')
    expect(link.attributes('type')).toBeUndefined()
  })
})
