import { cookies } from 'next/headers'
import { prettifyError } from 'zod'

import { SESSION_COOKIE_NAME } from '@/features/auth/session/config'
import { verifyJWT } from '@/features/auth/session/jwt'
import { SessionValidator } from '@/features/auth/session/validator'
import { createResponse } from '@/utils/http/create_response'
import { StatusCode } from '@/utils/http/status_code'

export const GET = async () => {
  const cookieStore = await cookies()
  const sessionCookie = cookieStore.get(SESSION_COOKIE_NAME)

  if (!sessionCookie) {
    return createResponse({
      status: StatusCode.OK,
      data: null,
    })
  }

  const decryptedSessionCookie = await verifyJWT(sessionCookie.value)
  const { data, error, success } = SessionValidator.safeParse(
    decryptedSessionCookie,
  )

  if (!success) {
    return createResponse({
      status: StatusCode.InternalServerError,
      error: `Invalid session cookie:\n${prettifyError(error)}`,
    })
  }

  return createResponse({
    status: StatusCode.OK,
    data,
  })
}

export const DELETE = async () => {
  const cookieStore = await cookies()
  cookieStore.delete(SESSION_COOKIE_NAME)

  return createResponse({
    status: StatusCode.NoContent,
  })
}
