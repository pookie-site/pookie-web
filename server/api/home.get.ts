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

const cover = '/placeholders/cover.svg'

export default defineEventHandler(() => HomeFeedSchema.parse({
  ticker: ['$5.01', '$32.50', '$17.16', '$5.05', '$50.00', '$5.01', '$32.50', '$17.16', '$5.05', '$50.00'].map((amount, i) => ({
    id: `ticker-${i + 1}`,
    user: 'sdf*@gmail.co',
    amount,
    image: cover,
    to: `/games/popular-${i + 1}`,
  })),
  promo: {
    title: 'Bonus Store',
    text: 'Spend coins on free spins and boosts',
    image: '/banners/bonus-store.jpg',
    action: 'Open store',
    to: '/store',
  },
  stories: ['News', 'Top Win', 'Promo', 'New Release', 'New Release'].map((label, i) => ({
    id: `story-${i + 1}`,
    label,
    image: cover,
    to: `/stories/${i + 1}`,
  })),
  categories: [
    { id: 'slots', title: 'Slots', count: '4 000+ games', action: 'Play', to: '/slots', tone: 'twilight', art: [cover, cover, cover] },
    { id: 'live', title: 'Live Casino', count: '300+ live tables', action: 'Play', to: '/live', tone: 'ocean', art: [cover, cover, cover] },
  ],
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
      { label: 'High RTP', games: games('rtp', 24) },
      { label: 'High Volatility', games: games('volatility', 24) },
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
