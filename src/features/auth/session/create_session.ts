import { SignJWT } from 'jose'
import { cookies } from 'next/headers'

import { getSessionDTO } from '@/lib/dtos/session_dto'
import { SessionDTO } from '@/lib/dtos/session_dto_validator'
import { prisma } from '@/utils/prisma'

import {
  JWT_ALGORITHM,
  JWT_KEY,
  SESSION_COOKIE_MAX_AGE,
  SESSION_COOKIE_NAME,
} from './config'

/**
 * **SERVER USE ONLY**
 *
 * Creates a new session cookie for the user.
 *
 * @param session - The session data to store in the cookie.
 * @returns The created session.
 */
export const createSession = async ({
  user_id,
}: {
  user_id: string
}): Promise<SessionDTO> => {
  const cookieStore = await cookies()

  const session = await prisma.session.create({
    data: {
      user_id,
    },
  })

  const sessionJWT = await new SignJWT({
    jti: session.id,
    sub: user_id,
    iat: Math.floor(new Date(session.created_at).getTime() / 1000),
  })
    .setProtectedHeader({ alg: JWT_ALGORITHM })
    .setIssuedAt()
    .setExpirationTime(Date.now() + SESSION_COOKIE_MAX_AGE * 1000) // Convert to milliseconds for JWT expiration
    .sign(JWT_KEY)

  cookieStore.set(SESSION_COOKIE_NAME, sessionJWT, {
    httpOnly: true,
    maxAge: SESSION_COOKIE_MAX_AGE,
    path: '/',
    sameSite: 'lax',
    secure: true,
  })

  return getSessionDTO(session)
}
