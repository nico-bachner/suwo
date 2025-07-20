import { Profile } from '@/generated/prisma'

import { profilesQuery } from './profiles_query'

export const queries = {
  profilesQuery,
}

export const queryKeys = {
  PROFILES: () => ['members'],
}

export const apiRoutes = {
  PROFILES: () => `/api/members`,
  UPDATE_INSTRUMENT: () =>
    [apiRoutes.PROFILES(), 'update-instrument'].join('/'),
}

export const routes = {
  PROFILES: () => '/members',
  PROFILE: ({ handle }: Pick<Profile, 'handle'>) =>
    [routes.PROFILES(), handle].join('/'),
}
