'use server'

import { cookies } from 'next/headers'

import { SESSION_COOKIE_NAME } from './config'
import { verifyJWT } from './jwt'
import { Session } from './types'
import { SessionValidator } from './validator'

export const getSession = async (): Promise<Session | null> => {
  const cookieStore = await cookies()
  const sessionCookie = cookieStore.get(SESSION_COOKIE_NAME)

  if (!sessionCookie) {
    return null
  }

  const decryptedSessionCookie = await verifyJWT(sessionCookie.value)
  const { data, success } = SessionValidator.safeParse(decryptedSessionCookie)

  if (!success) {
    return null
  }

  return data
}
