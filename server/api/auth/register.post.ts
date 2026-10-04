import { RegisterSchema } from '#shared/contracts/auth'

// ponytail: mock sign-up. Accepts any valid email and password and logs the player in
// through the mock session cookie; the real backend sets its own httpOnly session.
export default defineEventHandler(async (event) => {
  await readValidatedBody(event, RegisterSchema.parse)
  setCookie(event, 'mock_player', '1', { path: '/', sameSite: 'lax' })
  return { ok: true }
})
