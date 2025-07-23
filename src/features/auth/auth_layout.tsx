import { redirect } from 'next/navigation'

import { routes } from '@/routes'
import { LayoutFileProps } from '@/utils/next_types'

import { getSession } from './session/server/get_session'

export const AuthLayout = async ({ children }: LayoutFileProps) => {
  const session = await getSession()

  if (!session) {
    return children
  }

  redirect(routes.PROFILE(session))
}
