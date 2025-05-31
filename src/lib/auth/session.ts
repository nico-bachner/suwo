import { cookies } from 'next/headers'
import { cache } from 'react'

import { createJWT, verifyJWT } from './jwt'

export const createSession = async (id: number) => {
  const expiresAt = new Date(Date.now() + 7 * 24 * 60 * 60 * 1000)
  const session = await createJWT({
    id,
    expiresAt,
  })
  const cookieStore = await cookies()

  cookieStore.set('session', session, {
    expires: expiresAt,
    httpOnly: true,
    path: '/',
    sameSite: 'lax',
    secure: true,
  })
}

export const deleteSession = async () => {
  const cookieStore = await cookies()

  cookieStore.delete('session')
}

export const getSession = cache(
  async (): Promise<
    | {
        isAuth: true
        id: number
      }
    | {
        isAuth: false
        id: null
      }
  > => {
    const cookieStore = await cookies()

    const sessionCookie = cookieStore.get('session')

    if (!sessionCookie) {
      return {
        isAuth: false,
        id: null,
      }
    }

    const decryptedSessionCookie = await verifyJWT(sessionCookie.value)
    const id = parseInt(decryptedSessionCookie.id as string, 10)

    if (!id) {
      return {
        id: null,
        isAuth: false,
      }
    }

    return {
      id,
      isAuth: true,
    }
  },
)
