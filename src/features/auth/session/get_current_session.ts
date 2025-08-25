import { jwtVerify } from 'jose'
import { cookies } from 'next/headers'

import { Session } from '@/generated/prisma'
import { prisma } from '@/utils/prisma'

import { JWT_ALGORITHM, JWT_KEY, SESSION_COOKIE_NAME } from './config'
import { createSession } from './create_session'

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

  try {
    const { payload } = await jwtVerify(sessionCookie.value, JWT_KEY, {
      algorithms: [JWT_ALGORITHM],
    })

    if (!payload.jti) {
      cookieStore.delete(SESSION_COOKIE_NAME)

      return null
    }

    const oldSession = await prisma.session.findUnique({
      where: {
        id: payload.jti,
      },
    })

    if (!oldSession) {
      cookieStore.delete(SESSION_COOKIE_NAME)

      return null
    }

    await prisma.session.delete({
      where: {
        id: oldSession.id,
      },
    })

    // If the session is valid, create a new session cookie to refresh it
    const session = await createSession({ user_id: oldSession.user_id })

    return session
  } catch {
    // If the JWT is invalid, delete the session cookie
    cookieStore.delete(SESSION_COOKIE_NAME)

    return null
  }
}
