import { cookies } from 'next/headers'

import { Session } from '@/lib/validators/session_validator'

import { SESSION_COOKIE_NAME } from './config'
import { createJWT } from './jwt'

export const createSession = async (session: Session) => {
  const cookieStore = await cookies()

  const sessionJWT = await createJWT(session)

  cookieStore.set(SESSION_COOKIE_NAME, sessionJWT, {
    httpOnly: true,
    maxAge: 365 * 24 * 60 * 60, // 1 year
    path: '/',
    sameSite: 'lax',
    secure: true,
  })
}
