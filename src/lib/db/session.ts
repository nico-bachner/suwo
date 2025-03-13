import { JWTPayload, SignJWT, jwtVerify } from 'jose'
import { cookies } from 'next/headers'
import { cache } from 'react'

const secretKey = process.env.SESSION_SECRET
const encodedKey = new TextEncoder().encode(secretKey)

export async function encrypt(payload: JWTPayload) {
  return new SignJWT(payload)
    .setProtectedHeader({ alg: 'HS256' })
    .setIssuedAt()
    .setExpirationTime('7d')
    .sign(encodedKey)
}

export async function decrypt(session: string | undefined = '') {
  const { payload } = await jwtVerify(session, encodedKey, {
    algorithms: ['HS256'],
  })

  return payload
}

export async function createSession(id: number) {
  const expiresAt = new Date(Date.now() + 7 * 24 * 60 * 60 * 1000)
  const session = await encrypt({ id, expiresAt })
  const cookieStore = await cookies()

  cookieStore.set('session', session, {
    httpOnly: true,
    secure: true,
    expires: expiresAt,
    sameSite: 'lax',
    path: '/',
  })
}

export const getSession = cache(
  async (): Promise<
    | {
        isAuth: true
        id: number
      }
    | {
        isAuth: false
      }
  > => {
    const cookieStore = await cookies()

    const sessionCookie = cookieStore.get('session')

    if (!sessionCookie) {
      return {
        isAuth: false,
      }
    }

    const decryptedSessionCookie = await decrypt(sessionCookie.value)
    const id = parseInt(decryptedSessionCookie.id as string)

    if (!id) {
      return {
        isAuth: false,
      }
    }

    return {
      isAuth: true,
      id,
    }
  },
)
