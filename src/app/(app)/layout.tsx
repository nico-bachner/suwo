import { redirect } from 'next/navigation'

import { getSession } from '@/features/auth/session/server/get_session'
import { routes } from '@/routes'
import { LayoutFileProps } from '@/utils/next_types'

export default async function Layout({ children }: LayoutFileProps) {
  const session = await getSession()

  if (!session) {
    return redirect(routes.LOGIN())
  }

  return children
}
