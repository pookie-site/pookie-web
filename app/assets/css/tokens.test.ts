// @vitest-environment node
import { readFileSync } from 'node:fs'
import { describe, expect, it } from 'vitest'

const css = readFileSync(new URL('./tokens.css', import.meta.url), 'utf8')
const defined = new Set([...css.matchAll(/^\s*(--[\w-]+):/gm)].map(m => m[1]))
const used = new Set([...css.matchAll(/var\((--[\w-]+)\)/g)].map(m => m[1]))

describe('tokens.css', () => {
  it('has no broken references in the Mapped -> Alias -> Brand chain', () => {
    expect([...used].filter(name => !defined.has(name))).toEqual([])
  })

  it('never lets an Alias or Mapped colour hold a raw value', () => {
    const raw = [...css.matchAll(/^\s*(--color-[\w-]+):\s*(?!\s|var\()/gm)].map(m => m[1])
    expect(raw).toEqual([])
  })
})
