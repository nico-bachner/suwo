import { Profile } from '@/generated/prisma'
import { createURL } from '@/utils/http/create_url'

export const queryKeys = {
  PROFILES: () => ['members'],
  PROFILE: ({ user_id }: Pick<Profile, 'user_id'>) => ['members', user_id],
}

export const apiRoutes = {
  PROFILES: () => createURL({ path: ['api', 'members'] }),
  PROFILE: ({ user_id }: Pick<Profile, 'user_id'>) =>
    createURL({ path: ['api', 'members', user_id] }),
}

export const routes = {
  PROFILES: () => createURL({ path: ['members'] }),
  PROFILE: (user_id: Profile['user_id']) =>
    createURL({ path: ['members', user_id] }),
  EDIT_PROFILE: (user_id: Profile['user_id']) =>
    createURL({ path: ['members', user_id, 'edit'] }),
}
