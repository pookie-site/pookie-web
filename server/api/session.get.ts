import { SessionSchema } from '#shared/contracts/session'

// ponytail: mock auth. The `mock_player` cookie stands in for the backend's httpOnly session
// cookie; the showcase page toggles it. Replace with the real session endpoint.
export default defineEventHandler(event => SessionSchema.parse({
  player: getCookie(event, 'mock_player') === '1'
    ? { name: 'User123456', balance: '180.88', coins: '5 800.45', rewards: 14 }
    : null,
}))
