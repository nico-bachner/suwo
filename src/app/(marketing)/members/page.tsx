import { ProfilesScreen } from '@/features/profile/profiles_screen'
import { prisma } from '@/utils/prisma'

export default async function Page() {
  const profiles = await prisma.profile.findMany()

  return <ProfilesScreen profiles={profiles} />
}
