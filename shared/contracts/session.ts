import { z } from 'zod'

// Session and wallet. `player` is null for guests. Auth itself is an httpOnly cookie set by the backend.
export const SessionSchema = z.object({
  player: z.object({
    name: z.string(),
    balance: z.string(),
    coins: z.string(),
    rewards: z.number().int().nonnegative(),
  }).nullable(),
})

export type Session = z.infer<typeof SessionSchema>
