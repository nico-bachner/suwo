import { cookies } from 'next/headers'

import { Session, SessionValidator } from '@/lib/validators/session_validator'

import { SESSION_COOKIE_NAME } from './config'
import { verifyJWT } from './jwt'

/**
 * **SERVER USE ONLY**
 *
 * Retrieves the current session data from the user's session cookie.
 *
 * @returns The current session if it exists, otherwise null.
 */
export const getSession = async (): Promise<Session | null> => {
  const cookieStore = await cookies()
  const sessionCookie = cookieStore.get(SESSION_COOKIE_NAME)

  if (!sessionCookie) {
    return null
  }

  return SessionValidator.parse(await verifyJWT(sessionCookie.value))
}
