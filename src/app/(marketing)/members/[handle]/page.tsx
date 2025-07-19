import { notFound } from 'next/navigation'
import z from 'zod'

import { getSession } from '@/features/auth/session/server/get_session'
import { ProfileScreen } from '@/features/profile/profile_screen'
import { PageFileProps } from '@/utils/next_types'
import { prisma } from '@/utils/prisma'

export default async function Page({ params }: PageFileProps) {
  const { data, success } = z
    .object({
      handle: z.string(),
    })
    .safeParse(await params)

  /** If the profile doesn't exist, redirect to a 404 page. */
  if (!success) {
    notFound()
  }

  const session = await getSession()
  const profile = await prisma.profile.findUnique({
    where: { handle: data.handle },
  })

  if (!profile) {
    notFound()
  }

  return <ProfileScreen profile={profile} session={session} />
}
