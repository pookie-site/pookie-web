<script setup lang="ts">
import { RegisterSchema } from '#shared/contracts/auth'

// Figma registration form (2019:17921), same as the Reg modal. Validates with the shared
// zod contract, posts to /api/auth/register, then reloads the session.
// ponytail: plain inputs until a UiInput exists; promote these when the Reg modal is built.
const email = ref('')
const password = ref('')
const showPassword = ref(false)
const passwordId = useId()
const error = ref('')
const pending = ref(false)

async function submit() {
  const parsed = RegisterSchema.safeParse({ email: email.value, password: password.value })
  if (!parsed.success) {
    error.value = parsed.error.issues[0]?.path[0] === 'email' ? 'Enter a valid e-mail.' : 'Password needs at least 8 characters.'
    return
  }
  error.value = ''
  pending.value = true
  try {
    await $fetch('/api/auth/register', { method: 'POST', body: parsed.data })
    await refreshNuxtData('session')
  }
  catch {
    error.value = 'Sign-up failed. Try again.'
  }
  finally {
    pending.value = false
  }
}

const field = 'flex h-12 items-center overflow-hidden rounded-input border border-input-field-border-default bg-input-field-bg-default focus-within:border-input-field-border-active hover:border-input-field-border-hover'
const leading = 'flex h-full items-center gap-s pl-s text-input-leading-icon-default after:h-full after:w-px after:bg-input-divider'
const input = 'h-full min-w-0 flex-1 bg-transparent pr-xs pl-m type-body-regular-m text-input-field-value-default caret-input-field-caret outline-none placeholder:text-input-field-placeholder-default'
</script>

<template>
  <form
    class="flex flex-col gap-2xl"
    novalidate
    @submit.prevent="submit"
  >
    <div class="flex flex-col gap-2xl">
      <div class="flex flex-col gap-s">
        <label :class="field">
          <span :class="leading"><UiIcon
            name="mail"
            class="size-5"
          /></span>
          <span class="sr-only">E-mail</span>
          <input
            v-model="email"
            type="email"
            autocomplete="email"
            placeholder="Enter your e-mail"
            required
            :class="input"
          >
        </label>
        <div :class="field">
          <span :class="leading"><UiIcon
            name="lock"
            class="size-5"
          /></span>
          <label
            :for="passwordId"
            class="sr-only"
          >Password</label>
          <input
            :id="passwordId"
            v-model="password"
            :type="showPassword ? 'text' : 'password'"
            autocomplete="new-password"
            placeholder="Password"
            minlength="8"
            required
            :class="input"
          >
          <button
            type="button"
            class="flex h-full cursor-pointer items-center pr-s text-input-trailing-icon-default hover:text-input-trailing-icon-hover"
            :aria-label="showPassword ? 'Hide password' : 'Show password'"
            :aria-pressed="showPassword"
            @click="showPassword = !showPassword"
          >
            <UiIcon
              name="eye-off"
              class="size-6"
            />
          </button>
        </div>
        <p
          v-if="error"
          role="alert"
          class="type-body-regular-s text-input-hint-error"
        >
          {{ error }}
        </p>
      </div>
      <div class="flex flex-col items-center gap-m">
        <UiButton
          type="submit"
          :disabled="pending"
          class="w-full"
        >
          Join Now &amp; Get Bonus
        </UiButton>
        <p class="flex items-center gap-2xs type-body-regular-sm text-text-tertiary">
          Do you have an account?
          <UiButton
            hierarchy="link"
            ton="default"
            size="small"
            to="/login"
            class="type-button-label-s!"
          >
            Sign In
          </UiButton>
        </p>
      </div>
    </div>
    <p class="text-center type-body-regular-sm text-text-secondary opacity-70">
      By registering, you confirm that you are over 18 years old and agree to the
      <NuxtLink
        to="/terms"
        class="text-text-link underline"
      >Terms of Condition</NuxtLink>
    </p>
  </form>
</template>
