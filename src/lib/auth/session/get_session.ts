import { cookies } from 'next/headers'
import { cache } from 'react'

import { verifyJWT } from '../jwt'
import { Session } from './types'

export const getSession = cache(async () => {
  const cookieStore = await cookies()

  const sessionCookie = cookieStore.get('session')

  if (!sessionCookie) {
    return {
      id: null,
    }
  }

  const decryptedSessionCookie = await verifyJWT(sessionCookie.value)
  const { id } = decryptedSessionCookie as Session

  if (!id) {
    return {
      id: null,
    }
  }

  return {
    id,
  }
})
