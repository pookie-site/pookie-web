import { XpProgressSchema } from '#shared/contracts/rewards'

// ponytail: mock until the backend exists. The real endpoint answers 401 to guests.
export default defineEventHandler((event) => {
  if (getCookie(event, 'mock_player') !== '1') throw createError({ statusCode: 401 })
  return XpProgressSchema.parse({
    avatar: '/placeholders/cover.svg',
    level: 'Level 4 · Explorer',
    xp: '1 240 XP',
    nextLevel: 'Level 5 at 2 000 XP',
    progress: 0.29,
    markers: [
      { label: 'Daily wheel · 200 XP ✓', position: 0.04, reached: true },
      { label: 'Weekly wheel · 1 500 XP', position: 0.34, reached: false },
    ],
    nextReward: 'Next reward: Weekly wheel in 260 XP',
  })
})
