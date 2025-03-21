import { redirect } from 'next/navigation'

import { getSession } from '@/lib/auth/session'

type LayoutProps = {
  children: React.ReactNode
}

export default async function Layout({ children }: LayoutProps) {
  const { id } = await getSession()

  if (id) {
    redirect(`/members/${id}`)
  }

  return children
}
