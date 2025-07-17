import { cookies } from 'next/headers'
import { cache } from 'react'

import { verifyJWT } from '../jwt'
import { Session } from './types'
import { SessionValidator } from './validator'

export const getSession = cache(async (): Promise<Session> => {
  const cookieStore = await cookies()
  const sessionCookie = cookieStore.get('session')

  if (!sessionCookie) {
    return {
      id: null,
    }
  }

  const decryptedSessionCookie = await verifyJWT(sessionCookie.value)
  const { data, success } = SessionValidator.safeParse(decryptedSessionCookie)

  if (!success) {
    return {
      id: null,
    }
  }

  return data
})
