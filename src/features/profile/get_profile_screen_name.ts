import { Profile } from '@/generated/prisma'

export const getProfileScreenName = (
  profile: Pick<Profile, 'given_name' | 'family_name'>,
) => {
  if (profile.family_name) {
    return `${profile.given_name} ${profile.family_name}`
  }

  return profile.given_name
}
