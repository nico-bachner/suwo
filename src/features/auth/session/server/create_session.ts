import { cookies } from 'next/headers'

import { SESSION_COOKIE_NAME } from '../config'
import { createJWT } from '../lib/jwt'
import { Session } from '../types'

export const createSession = async ({ user_id }: Session) => {
  const cookieStore = await cookies()

  const expiresAt = new Date(Date.now() + 7 * 24 * 60 * 60 * 1000)
  const session = await createJWT({
    user_id,
    expiresAt,
  })

  cookieStore.set(SESSION_COOKIE_NAME, session, {
    expires: expiresAt,
    httpOnly: true,
    path: '/',
    sameSite: 'lax',
    secure: true,
  })
}
