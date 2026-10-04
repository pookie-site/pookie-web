import { SessionSchema } from '#shared/contracts/session'

// One shared fetch: the layout and pages read the same `session` key.
export const useSession = () => useFetch('/api/session', {
  key: 'session',
  transform: data => SessionSchema.parse(data),
  default: () => ({ player: null }),
})
