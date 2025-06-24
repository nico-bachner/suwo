import { forbidden, notFound, redirect } from 'next/navigation'

import { LINKS } from '@/config'
import { EditProfileScreen } from '@/features/profiles/edit_profile_screen'
import { Profile } from '@/generated/prisma'
import { getSession } from '@/lib/auth/session/get_session'
import { NextParams } from '@/lib/next/types'
import prisma from '@/lib/prisma'

type PageProps = {
  params: NextParams<Pick<Profile, 'handle'>>
}

export default async function Page({ params }: PageProps) {
  const { handle: handleParam } = await params

  /**
   * If the profile doesn't exist, redirect to a 404 page.
   */
  if (!handleParam) {
    notFound()
  }

  const profile = await prisma.profile.findUnique({
    where: { handle: decodeURIComponent(handleParam) },
  })

  if (!profile) {
    notFound()
  }

  /**
   * Auth check
   */
  const session = await getSession()

  if (!session.id) {
    redirect(LINKS.LOG_IN.href)
  }

  if (session.id !== profile.user_id) {
    forbidden()
  }


  return (
    <EditProfileScreen profile={profile} session={session} />
  )
}
