import { WinsSchema, WinsTabSchema } from '#shared/contracts/home'

// ponytail: mock until the backend exists.
const rows = [
  { provider: 'PGSoft', game: 'Lucky Lagoon', user: 'eb1a8*********9d51e', bet: '0.69 $', multiplier: '24.00X', payout: '16.47 $', win: true },
  { provider: 'PragmaticPlay', game: 'Neon Rhino', user: '4ab96*********50017', bet: '0.09 $', multiplier: '0.70X', payout: '- 0.03 $', win: false },
  { provider: 'AmigoGaming', game: 'Golden Hood', user: '46369*********3398b', bet: '0.08 $', multiplier: '0.00X', payout: '- 0.08 $', win: false },
  { provider: 'Endorphina', game: 'Moon Reapers', user: 'bf5cb*********343c0', bet: '0.06 $', multiplier: '0.00X', payout: '- 0.06 $', win: false },
  { provider: 'PGSoft', game: 'Star Fortune', user: '13224*********25069', bet: '0.31 $', multiplier: '4.10X', payout: '1.25 $', win: true },
  { provider: 'PGSoft', game: 'Crown Blaze', user: 'eb1a8*********9d51e', bet: '0.69 $', multiplier: '22.20X', payout: '15.24 $', win: true },
]

export default defineEventHandler((event) => {
  const tab = WinsTabSchema.catch('now').parse(getQuery(event).tab)
  const list = tab === 'now' ? rows : [...rows].reverse()
  return WinsSchema.parse(list.map((row, i) => ({ ...row, id: `${tab}-${i}`, image: '/placeholders/cover.svg' })))
})
