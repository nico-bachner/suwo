import { JWTPayload, SignJWT, jwtVerify } from 'jose'

const key = new TextEncoder().encode(process.env.SESSION_SECRET)

export const createJWT = (payload: JWTPayload) =>
  new SignJWT(payload)
    .setProtectedHeader({ alg: 'HS256' })
    .setIssuedAt()
    .setExpirationTime('7d')
    .sign(key)

export const verifyJWT = async (session: string) => {
  const { payload } = await jwtVerify(session, key, {
    algorithms: ['HS256'],
  })

  return payload
}
