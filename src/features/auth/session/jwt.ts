import { JWTPayload, SignJWT, jwtVerify } from 'jose'

import { JWT_ALGORITHM, JWT_EXPIRATION_TIME, JWT_KEY } from './config'

export const createJWT = (payload: JWTPayload) =>
  new SignJWT(payload)
    .setProtectedHeader({ alg: JWT_ALGORITHM })
    .setIssuedAt()
    .setExpirationTime(Date.now() + JWT_EXPIRATION_TIME)
    .sign(JWT_KEY)

export const verifyJWT = async (session: string) => {
  try {
    const { payload } = await jwtVerify(session, JWT_KEY, {
      algorithms: [JWT_ALGORITHM],
    })

    return payload
  } catch {
    return null
  }
}
