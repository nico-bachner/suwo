import { getSession } from '@/features/auth/session/get_session'
import { getUserDTO } from '@/lib/dtos/user_dto'
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

  const users = await prisma.user.findMany()

  return createResponse({
    status: StatusCode.OK,
    data: users.map(getUserDTO),
  })
}
