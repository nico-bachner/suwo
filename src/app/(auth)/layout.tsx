import { redirect } from 'next/navigation'
import { ReactNode } from 'react'

import { getSession } from '@/lib/auth/session/get_session'
import prisma from '@/lib/prisma'

type LayoutProps = {
  children: ReactNode
}

export default async function Layout({ children }: LayoutProps) {
  const { id } = await getSession()

  if (id) {
    const profile = await prisma.profile.findUnique({
      where: {
        user_id: id,
      },
      select: {
        handle: true,
      },
    })

    if (profile) {
      redirect(`/members/${profile.handle}`)
    }
  }

  return children
}
