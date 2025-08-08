import { cookies } from 'next/headers'

import { SESSION_COOKIE_NAME } from './config'
import { createJWT } from './jwt'
import { Session } from './types'

export const createSession = async ({ user_id }: Session) => {
  const cookieStore = await cookies()

  const sessionJWT = await createJWT({
    user_id,
  })

  cookieStore.set(SESSION_COOKIE_NAME, sessionJWT, {
    httpOnly: true,
    maxAge: 365 * 24 * 60 * 60, // 1 year
    path: '/',
    sameSite: 'lax',
    secure: true,
  })
}
