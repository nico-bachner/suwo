import { redirect } from 'next/navigation'

import { getSession } from '@/lib/auth/session/get_session'
import prisma from '@/lib/prisma'
import { routes } from '@/routes'
import { LayoutProps } from '@/types'

export const AuthLayout = async ({ children }: LayoutProps) => {
  const { id } = await getSession()

  if (!id) {
    return children
  }

  const profile = await prisma.profile.findUnique({
    where: {
      user_id: id,
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
