<script setup lang="ts">
import { NuxtLink } from '#components'

// Figma base-button (123:19049). Colours come from the Mapped tokens
// button/<hierarchy>/<ton>/<part>/<state>; a token that does not exist for a
// combination resolves to nothing and the CSS fallback applies.
export type ButtonHierarchy = 'primary' | 'outline' | 'ghost' | 'link'
export type ButtonTon = 'brand' | 'default' | 'accent' | 'warning' | 'successful' | 'neutral-white' | 'neutral-black'

const props = withDefaults(defineProps<{
  hierarchy?: ButtonHierarchy
  ton?: ButtonTon
  size?: 'small' | 'medium' | 'large'
  iconLeft?: string
  iconRight?: string
  to?: string
  disabled?: boolean
  type?: 'button' | 'submit' | 'reset'
}>(), {
  hierarchy: 'primary',
  ton: 'brand',
  size: 'large',
  iconLeft: undefined,
  iconRight: undefined,
  to: undefined,
  type: 'button',
})

const PARTS = {
  'bg': 'background',
  'start': 'background-start',
  'end': 'background-end',
  'border': 'border',
  'label': 'label',
  'icon': 'icon',
  'inner-top': 'glow-1',
  'inner-bottom': 'glow-2',
}
const STATES = ['default', 'hover', 'active', 'disable']

const tokenVars = computed(() => {
  const base = `--color-button-${props.hierarchy}-${props.ton}`
  const vars: Record<string, string> = {}
  for (const [key, part] of Object.entries(PARTS)) {
    for (const state of STATES) vars[`--btn-${key}-${state}`] = `var(${base}-${part}-${state})`
  }
  return vars
})

// Gradient primaries carry an inner bevel; elsewhere glow-1 is an outer glow that Figma clips away.
const bevel = computed(() => props.hierarchy === 'primary' && ['accent', 'warning', 'successful'].includes(props.ton))

const SIZES = {
  small: { box: 'h-9 px-4 gap-1.5 type-button-label-s', icon: 'size-5' },
  medium: { box: 'h-10 px-5 gap-1.5 type-button-label-m', icon: 'size-5' },
  large: { box: 'h-12 px-5 gap-2 type-button-label-l', icon: 'size-6' },
}
const sizing = computed(() => SIZES[props.size])
</script>

<template>
  <component
    :is="to ? NuxtLink : 'button'"
    :to="to"
    :type="to ? undefined : type"
    :disabled="to ? undefined : disabled"
    :aria-disabled="to && disabled ? 'true' : undefined"
    class="ui-button inline-flex shrink-0 items-center justify-center whitespace-nowrap rounded-input"
    :class="[hierarchy === 'link' ? 'ui-button--link gap-2 px-0.5 type-button-label-l' : sizing.box, { 'ui-button--bevel': bevel }]"
    :style="tokenVars"
  >
    <UiIcon
      v-if="iconLeft"
      :name="iconLeft"
      class="ui-button__icon"
      :class="sizing.icon"
    />
    <span><slot /></span>
    <UiIcon
      v-if="iconRight"
      :name="iconRight"
      class="ui-button__icon"
      :class="sizing.icon"
    />
  </component>
</template>

<style scoped>
.ui-button {
  --btn-state-bg: var(--btn-bg-default, transparent);
  --btn-state-image: linear-gradient(163deg, var(--btn-start-default), var(--btn-end-default));
  --btn-state-border: var(--btn-border-default, transparent);
  --btn-state-label: var(--btn-label-default);
  --btn-state-icon: var(--btn-icon-default, var(--btn-state-label));

  border: 1px solid var(--btn-state-border);
  background-color: var(--btn-state-bg);
  background-image: var(--btn-state-image);
  color: var(--btn-state-label);
  cursor: pointer;
}

.ui-button--link {
  border-width: 0;
}

.ui-button--bevel {
  box-shadow: inset 0 2px 2px var(--btn-inner-top-default), inset 0 -2px 2px var(--btn-inner-bottom-default);
}

.ui-button:hover:not(:disabled, [aria-disabled='true']) {
  --btn-state-bg: var(--btn-bg-hover, var(--btn-bg-default, transparent));
  --btn-state-image: linear-gradient(163deg, var(--btn-start-hover), var(--btn-end-hover));
  --btn-state-border: var(--btn-border-hover, var(--btn-border-default, transparent));
  --btn-state-label: var(--btn-label-hover, var(--btn-label-default));
  --btn-state-icon: var(--btn-icon-hover, var(--btn-state-label));
}

.ui-button--bevel:hover:not(:disabled, [aria-disabled='true']) {
  box-shadow: inset 0 2px 2px var(--btn-inner-top-hover);
}

.ui-button:active:not(:disabled, [aria-disabled='true']) {
  --btn-state-bg: var(--btn-bg-active, var(--btn-bg-default, transparent));
  --btn-state-image: none;
  --btn-state-border: var(--btn-border-active, var(--btn-border-default, transparent));
  --btn-state-label: var(--btn-label-active, var(--btn-label-default));
  --btn-state-icon: var(--btn-icon-active, var(--btn-state-label));

  box-shadow: none;
}

.ui-button:disabled,
.ui-button[aria-disabled='true'] {
  --btn-state-bg: var(--btn-bg-disable, var(--btn-bg-default, transparent));
  --btn-state-image: none;
  --btn-state-border: var(--btn-border-disable, var(--btn-border-default, transparent));
  --btn-state-label: var(--btn-label-disable, var(--btn-label-default));
  --btn-state-icon: var(--btn-icon-disable, var(--btn-state-label));

  box-shadow: none;
  cursor: not-allowed;
  opacity: 0.5;
}

.ui-button:focus-visible {
  outline: 2px solid var(--color-border-brand);
  outline-offset: 2px;
}

.ui-button__icon {
  color: var(--btn-state-icon);
}
</style>
