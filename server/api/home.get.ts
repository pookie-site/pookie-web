import { HomeFeedSchema, type Game } from '#shared/contracts/home'

// ponytail: mock until the backend exists; parse() keeps the mock honest to the contract.
const titles = ['Lucky Lagoon', 'Neon Rhino', 'Golden Hood', 'Moon Reapers', 'Star Fortune', 'Crown Blaze', 'Pixel Bandits', 'Cosmic Fruits', 'Jade Tiger', 'Frost Queen']

const games = (prefix: string, count: number, badge?: string): Game[] =>
  Array.from({ length: count }, (_, i) => ({
    id: `${prefix}-${i + 1}`,
    title: titles[i % titles.length]!,
    image: '/placeholders/cover.svg',
    badge: badge && i < 4 ? badge : undefined,
    to: `/games/${prefix}-${i + 1}`,
  }))

export default defineEventHandler(() => HomeFeedSchema.parse({
  popular: games('popular', 10),
  top10: games('top', 10),
  providers: [
    { id: 'evolution', name: 'Evolution', logo: '/providers/evolution.svg', to: '/providers/evolution', tag: 'live', tournament: true },
    { id: 'elk', name: 'ELK', logo: '/providers/elk.svg', to: '/providers/elk', tag: 'top', tournament: false },
    { id: 'evolution-2', name: 'Evolution', logo: '/providers/evolution.svg', to: '/providers/evolution', tournament: false },
    { id: 'elk-2', name: 'ELK', logo: '/providers/elk.svg', to: '/providers/elk', tournament: false },
    { id: 'evolution-3', name: 'Evolution', logo: '/providers/evolution.svg', to: '/providers/evolution', tournament: false },
  ],
  spotlight: {
    title: 'Hot & Cold',
    cover: '/placeholders/banner.svg',
    tabs: [
      { label: 'High RTP', games: games('rtp', 10) },
      { label: 'High Volatility', games: games('volatility', 10) },
    ],
  },
  newReleases: games('new', 10, 'New'),
  collections: ['Fruit Slots', 'Megaways', 'Bonus Buy'].map((title, i) => ({
    id: `collection-${i + 1}`,
    title,
    count: `${[120, 86, 64][i]} games`,
    banner: '/placeholders/banner.svg',
    games: games(`collection-${i + 1}`, 6),
    to: `/collections/${i + 1}`,
  })),
  liveCasino: games('live', 10),
  recommended: games('recommended', 10),
}))
