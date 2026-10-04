import { HomeFeedSchema, WinsSchema, type WinsTab } from '#shared/contracts/home'

// Responses are parsed against the contract, so a backend drift fails loudly here, not in a template.
export const useHomeFeed = () => useFetch('/api/home', {
  key: 'home',
  transform: data => HomeFeedSchema.parse(data),
})

export const useWins = (tab: Ref<WinsTab>) => useFetch('/api/wins', {
  query: { tab },
  transform: data => WinsSchema.parse(data),
  default: () => [],
})
