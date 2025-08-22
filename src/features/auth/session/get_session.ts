import { cookies } from 'next/headers'

import { Session, SessionValidator } from '@/lib/validators/session_validator'

import { SESSION_COOKIE_NAME } from './config'
import { createSession } from './create_session'
import { deleteSession } from './delete_session'
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

  const session = SessionValidator.nullable().parse(
    await verifyJWT(sessionCookie.value),
  )

  if (!session) {
    // If the session is invalid, delete it
    await deleteSession()

    return null
  }

  // If the session is valid, create a new session cookie to refresh it
  await createSession(session)

  return session
}
