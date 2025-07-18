import { Profile } from '@/generated/prisma'

import { Session } from '../auth/session/types'

export type ProfilesScreenProps = {
  profiles: Profile[]
}

export type ProfileScreenProps = {
  profile: Profile
  session: Session | null
}
