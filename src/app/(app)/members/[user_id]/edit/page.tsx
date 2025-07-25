import { forbidden, notFound, redirect } from 'next/navigation'
import z from 'zod'

import { getSession } from '@/features/auth/session/get_session'
import { EditProfileScreen } from '@/features/profile/edit_profile_screen'
import { routes } from '@/routes'
import { PageFileProps } from '@/utils/next_types'

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

  return <EditProfileScreen {...data} />
}
