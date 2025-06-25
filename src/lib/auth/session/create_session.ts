import { cookies } from 'next/headers'

import { createJWT } from '../jwt'
import { Session } from './types'

export const createSession = async ({ id }: Session) => {
  const expiresAt = new Date(Date.now() + 7 * 24 * 60 * 60 * 1000)
  const session = await createJWT({
    id,
    expiresAt,
  })
  const cookieStore = await cookies()

  cookieStore.set('session', session, {
    expires: expiresAt,
    httpOnly: true,
    path: '/',
    sameSite: 'lax',
    secure: true,
  })
}
