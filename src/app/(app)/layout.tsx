import { redirect } from 'next/navigation'

import { getSession } from '@/features/auth/session/server/get_session'
import { routes } from '@/routes'
import { LayoutFileProps } from '@/utils/next_types'
import { prisma } from '@/utils/prisma'

export default async function Layout({ children }: LayoutFileProps) {
  const session = await getSession()

  if (!session) {
    return redirect(routes.LOGIN())
  }

  const profile = await prisma.profile.findUnique({
    where: {
      user_id: session.user_id,
    },
    select: {
      handle: true,
    },
  })

  if (!profile) {
    throw new Error('Invalid session: profile not found')
  }

  return children
}
