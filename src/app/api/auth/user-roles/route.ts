import { cookies } from 'next/headers'
import z from 'zod'

import { SESSION_COOKIE_NAME } from '@/features/auth/session/config'
import { verifyJWT } from '@/features/auth/session/jwt'
import { SessionValidator } from '@/features/auth/session/validator'
import { createResponse } from '@/utils/http/create_response'
import { StatusCode } from '@/utils/http/status_code'
import { APIRoute } from '@/utils/next_types'
import { prisma } from '@/utils/prisma'

export const GET: APIRoute = async () => {
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
      status: StatusCode.BadRequest,
      error: z.prettifyError(error),
    })
  }

  return createResponse({
    status: StatusCode.OK,
    data: await prisma.role.findMany({
      where: {
        UserRole: {
          some: data,
        },
      },
    }),
  })
}
