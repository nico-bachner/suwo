import { redirect } from 'next/navigation'

import prisma from '@/lib/prisma'
import { routes } from '@/routes'
import { LayoutFileProps } from '@/types'

import { getSession } from './session/server/get_session'

export const AuthLayout = async ({ children }: LayoutFileProps) => {
  const session = await getSession()

  if (!session) {
    return children
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

  redirect(routes.PROFILE(profile.handle))
}
