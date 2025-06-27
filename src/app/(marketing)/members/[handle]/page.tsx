import { notFound } from 'next/navigation'

import { ProfileScreen } from '@/features/profile/profile_screen'
import { Profile } from '@/generated/prisma'
import { getSession } from '@/lib/auth/session/get_session'
import { NextParams } from '@/lib/next/types'
import prisma from '@/lib/prisma'

type PageProps = {
  params: NextParams<Pick<Profile, 'handle'>>
}

export default async function Page({ params }: PageProps) {
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
