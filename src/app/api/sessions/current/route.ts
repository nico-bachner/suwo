import { cookies } from 'next/headers'

import { SESSION_COOKIE_NAME } from '@/features/auth/config'
import { getSession } from '@/features/auth/get_current_session'
import { getSessionDTO } from '@/lib/dtos/session_dto'
import { createResponse } from '@/utils/http/create_response'
import { StatusCode } from '@/utils/http/status_code'
import { prisma } from '@/utils/prisma'

export const GET = async () => {
  const session = await getSession()

  if (!session) {
    return createResponse({
      status: StatusCode.Unauthorized,
      error: 'Unauthorized',
    })
  }

  return createResponse({
    status: StatusCode.OK,
    data: getSessionDTO(session),
  })
}

export const DELETE = async () => {
  const cookieStore = await cookies()
  const session = await getSession()

  if (!session) {
    return createResponse({
      status: StatusCode.NotFound,
      error: 'Session cookie not found',
    })
  }

  await prisma.session.delete({
    where: {
      id: session.id,
    },
  })

  cookieStore.delete(SESSION_COOKIE_NAME)

  return createResponse({
    status: StatusCode.NoContent,
  })
}
