import { redirect } from 'next/navigation'
import { ReactNode } from 'react'

import { getSession } from '@/lib/auth/session'

type LayoutProps = {
  children: ReactNode
}

export default async function Layout({ children }: LayoutProps) {
  const { id } = await getSession()

  if (id) {
    redirect(`/members/${id}`)
  }

  return children
}
