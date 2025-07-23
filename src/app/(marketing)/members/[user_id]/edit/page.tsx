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
      user_id: z.uuid(),
    })
    .safeParse(await params)

  if (!success) {
    notFound()
  }

  /** Auth check */
  const session = await getSession()

  if (!session) {
    redirect(routes.LOGIN())
  }

  if (data.user_id !== session.user_id) {
    forbidden()
  }

  /** Fetch instruments for the form */
  const instruments = await prisma.instrument.findMany()

  return <EditProfileScreen {...data} instruments={instruments} />
}
