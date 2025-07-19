import { forbidden, notFound, redirect } from 'next/navigation'

import { getSession } from '@/features/auth/session/server/get_session'
import { EditProfileScreen } from '@/features/profile/edit_profile_screen'
import { Profile } from '@/generated/prisma'
import { routes } from '@/routes'
import { prisma } from '@/utils/prisma'
import { NextParams } from '@/utils/types'

type PageFileProps = {
  params: NextParams<Pick<Profile, 'handle'>>
}

export default async function Page({ params }: PageFileProps) {
  const { handle: handleParam } = await params

  /** If the profile doesn't exist, redirect to a 404 page. */
  if (!handleParam) {
    notFound()
  }

  const profile = await prisma.profile.findUnique({
    where: { handle: decodeURIComponent(handleParam) },
  })

  if (!profile) {
    notFound()
  }

  /** Auth check */
  const session = await getSession()

  if (!session) {
    redirect(routes.LOGIN({}))
  }

  if (session.user_id !== profile.user_id) {
    forbidden()
  }

  return <EditProfileScreen profile={profile} session={session} />
}
