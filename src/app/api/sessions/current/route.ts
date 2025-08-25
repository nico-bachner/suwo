import { cookies } from 'next/headers'

import { SESSION_COOKIE_NAME } from '@/features/auth/session/config'
import { getCurrentSession } from '@/features/auth/session/get_current_session'
import { createResponse } from '@/utils/http/create_response'
import { StatusCode } from '@/utils/http/status_code'
import { prisma } from '@/utils/prisma'

export const GET = async () => {
  const session = await getCurrentSession()

  if (!session) {
    return createResponse({
      status: StatusCode.NotFound,
      error: 'Session cookie not found',
    })
  }

  return createResponse({
    status: StatusCode.OK,
    data: session,
  })
}

export const DELETE = async () => {
  const cookieStore = await cookies()

  const oldSession = await getCurrentSession()

  if (oldSession) {
    await prisma.session.delete({
      where: {
        id: oldSession.id,
      },
    })
  }

  cookieStore.delete(SESSION_COOKIE_NAME)

  return createResponse({
    status: StatusCode.NoContent,
  })
}
