import { z } from 'zod'

// XP progress on the single XP track (ADR-001). The API sends every label and the
// fill and marker positions as 0–1 fractions; the client never computes them.
export const XpProgressSchema = z.object({
  avatar: z.string(),
  level: z.string(),
  xp: z.string(),
  nextLevel: z.string(),
  progress: z.number().min(0).max(1),
  markers: z.array(z.object({
    label: z.string(),
    position: z.number().min(0).max(1),
    reached: z.boolean(),
  })),
  nextReward: z.string(),
})

export type XpProgress = z.infer<typeof XpProgressSchema>
