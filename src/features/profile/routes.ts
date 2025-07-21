import { Profile } from '@/generated/prisma'
import { createURL } from '@/utils/http/create_url'

import { profilesQuery } from './profiles_query'

export const queries = {
  profilesQuery,
}

export const queryKeys = {
  PROFILES: () => ['members'],
}

export const apiRoutes = {
  PROFILES: () => createURL({ path: ['api', 'members'] }),
  UPDATE_INSTRUMENT: () =>
    createURL({ path: ['api', 'members', 'update-instrument'] }),
}

export const routes = {
  PROFILES: () => createURL({ path: ['members'] }),
  PROFILE: ({ handle }: Pick<Profile, 'handle'>) =>
    createURL({ path: ['members', handle] }),
}
