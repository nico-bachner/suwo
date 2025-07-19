import { forbidden, notFound, redirect } from 'next/navigation'
import z from 'zod'

import { getSession } from '@/features/auth/session/server/get_session'
import { EditProfileScreen } from '@/features/profile/edit_profile_screen'
import { routes } from '@/routes'
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

  const profile = await prisma.profile.findUnique({
    where: { handle: data.handle },
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
