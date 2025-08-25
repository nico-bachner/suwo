import { createResponse } from '@/utils/http/create_response'
import { StatusCode } from '@/utils/http/status_code'
import { APIRoute } from '@/utils/next'
import { prisma } from '@/utils/prisma'

export const DELETE: APIRoute<'/api/sessions/[user_id]'> = async (
  _,
  { params },
) => {
  const { user_id } = await params

  await prisma.session.deleteMany({
    where: {
      user_id,
    },
  })

  return createResponse({
    status: StatusCode.NoContent,
  })
}
