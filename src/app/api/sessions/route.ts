import { getSession } from '@/features/auth/session/get_current_session'
import { createResponse } from '@/utils/http/create_response'
import { StatusCode } from '@/utils/http/status_code'
import { APIRoute } from '@/utils/next'
import { prisma } from '@/utils/prisma'

export const DELETE: APIRoute<'/api/sessions'> = async () => {
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

  return createResponse({
    status: StatusCode.NoContent,
  })
}
