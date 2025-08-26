import { cookies } from 'next/headers'

import { SESSION_COOKIE_NAME } from '@/features/auth/config'
import { getSession } from '@/features/auth/get_current_session'
import { getSessionDTO } from '@/lib/dtos/session_dto'
import { createResponse } from '@/utils/http/create_response'
import { StatusCode } from '@/utils/http/status_code'
import { APIRoute } from '@/utils/next'
import { prisma } from '@/utils/prisma'

export const GET: APIRoute<'/api/sessions'> = async () => {
  const session = await getSession()

  if (!session) {
    return createResponse({
      status: StatusCode.Unauthorized,
      error: 'Unauthorized',
    })
  }

  const sessions = await prisma.session.findMany({
    where: {
      user_id: session.user_id,
    },
  })

  return createResponse({
    status: StatusCode.OK,
    data: sessions.map(getSessionDTO),
  })
}

export const DELETE: APIRoute<'/api/sessions'> = async () => {
  const cookieStore = await cookies()
  const session = await getSession()

  if (!session) {
    return createResponse({
      status: StatusCode.Unauthorized,
      error: 'Unauthorized',
    })
  }

  await prisma.session.deleteMany({
    where: {
      user_id: session.user_id,
    },
  })

  cookieStore.delete(SESSION_COOKIE_NAME)

  return createResponse({
    status: StatusCode.NoContent,
  })
}
