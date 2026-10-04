import { mountSuspended, registerEndpoint } from '@nuxt/test-utils/runtime'
import { flushPromises } from '@vue/test-utils'
import { describe, expect, it, vi } from 'vitest'
import SignUpForm from './SignUpForm.vue'

const register = vi.fn(() => ({ ok: true }))
registerEndpoint('/api/auth/register', { method: 'POST', handler: register })

describe('AuthSignUpForm', () => {
  it('blocks an invalid e-mail and posts a valid sign-up', async () => {
    const wrapper = await mountSuspended(SignUpForm)
    await wrapper.find('input[type="email"]').setValue('nope')
    await wrapper.find('input[autocomplete="new-password"]').setValue('secret123')
    await wrapper.find('form').trigger('submit')
    expect(wrapper.find('[role="alert"]').text()).toBe('Enter a valid e-mail.')
    expect(register).not.toHaveBeenCalled()

    await wrapper.find('input[type="email"]').setValue('player@pookie.test')
    await wrapper.find('form').trigger('submit')
    await flushPromises()
    expect(register).toHaveBeenCalledOnce()
    expect(wrapper.find('[role="alert"]').exists()).toBe(false)
  })
})
