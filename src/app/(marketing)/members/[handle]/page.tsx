import { notFound } from 'next/navigation'

import { getSession } from '@/features/auth/session/server/get_session'
import { ProfileScreen } from '@/features/profile/profile_screen'
import { Profile } from '@/generated/prisma'
import { prisma } from '@/utils/prisma'
import { NextParams } from '@/utils/types'

type PageFileProps = {
  params: NextParams<Pick<Profile, 'handle'>>
}

export default async function Page({ params }: PageFileProps) {
  const { handle: handleParam } = await params

  if (!handleParam) {
    notFound()
  }

  const session = await getSession()
  const profile = await prisma.profile.findUnique({
    where: { handle: decodeURIComponent(handleParam) },
  })

  if (!profile) {
    notFound()
  }

  return <ProfileScreen profile={profile} session={session} />
}
