import { Profile } from '@/generated/prisma'

export const getProfileScreenName = (profile: Profile) => {
  if (profile.display_name) {
    return profile.display_name
  }

  if (profile.family_name) {
    return `${profile.given_name} ${profile.family_name}`
  }

  return profile.given_name
}
