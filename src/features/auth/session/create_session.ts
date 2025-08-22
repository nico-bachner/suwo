import { cookies } from 'next/headers'

import { Session } from '@/lib/validators/session_validator'

import { SESSION_COOKIE_MAX_AGE, SESSION_COOKIE_NAME } from './config'
import { createJWT } from './jwt'

export const createSession = async (session: Session) => {
  const cookieStore = await cookies()

  const sessionJWT = await createJWT(session)

  cookieStore.set(SESSION_COOKIE_NAME, sessionJWT, {
    httpOnly: true,
    maxAge: SESSION_COOKIE_MAX_AGE,
    path: '/',
    sameSite: 'lax',
    secure: true,
  })
}
