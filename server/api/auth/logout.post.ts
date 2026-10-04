// ponytail: mock logout. Clears the mock session cookie; the real backend clears its own.
export default defineEventHandler((event) => {
  deleteCookie(event, 'mock_player', { path: '/' })
  return { ok: true }
})
