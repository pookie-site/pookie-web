import { z } from 'zod'

// API contract for the home page. Money and multipliers arrive preformatted; the client only displays them.

export const GameSchema = z.object({
  id: z.string(),
  title: z.string(),
  image: z.string(),
  badge: z.string().optional(),
  to: z.string(),
})

export const ProviderSchema = z.object({
  id: z.string(),
  name: z.string(),
  logo: z.string(),
  to: z.string(),
  tag: z.enum(['top', 'live']).optional(),
  tournament: z.boolean(),
})

export const CollectionSchema = z.object({
  id: z.string(),
  title: z.string(),
  count: z.string(),
  banner: z.string(),
  games: z.array(GameSchema),
  to: z.string(),
})

export const SpotlightSchema = z.object({
  title: z.string(),
  cover: z.string(),
  tabs: z.array(z.object({ label: z.string(), games: z.array(GameSchema) })).min(1),
})

export const HomeFeedSchema = z.object({
  popular: z.array(GameSchema),
  top10: z.array(GameSchema),
  providers: z.array(ProviderSchema),
  spotlight: SpotlightSchema,
  newReleases: z.array(GameSchema),
  collections: z.array(CollectionSchema),
  liveCasino: z.array(GameSchema),
  recommended: z.array(GameSchema),
})

export const WinsTabSchema = z.enum(['now', 'last-week'])

export const WinRowSchema = z.object({
  id: z.string(),
  provider: z.string(),
  game: z.string(),
  image: z.string(),
  user: z.string(),
  bet: z.string(),
  multiplier: z.string(),
  payout: z.string(),
  win: z.boolean(),
})

export const WinsSchema = z.array(WinRowSchema)

export type Game = z.infer<typeof GameSchema>
export type HomeFeed = z.infer<typeof HomeFeedSchema>
export type WinsTab = z.infer<typeof WinsTabSchema>
