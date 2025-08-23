import { getSession } from '@/features/auth/session/get_session'
import { getUserDTO } from '@/lib/dtos/user_dto'
import { UserDTOValidator } from '@/lib/dtos/user_dto_validator'
import { createResponse } from '@/utils/http/create_response'
import { StatusCode } from '@/utils/http/status_code'
import { APIRoute } from '@/utils/next_types'
import { prisma } from '@/utils/prisma'

export const GET: APIRoute = async (_, { params }) => {
  const session = await getSession()

  if (!session) {
    return createResponse({
      status: StatusCode.Unauthorized,
      error: 'Unauthorized',
    })
  }

  const { id } = UserDTOValidator.pick({
    id: true,
  }).parse(await params)

  const user = await prisma.user.findUnique({
    where: {
      id,
    },
  })

  if (!user) {
    return createResponse({
      status: StatusCode.NotFound,
      error: 'User not found',
    })
  }

  return createResponse({
    status: StatusCode.OK,
    data: getUserDTO(user),
  })
}

export const PATCH: APIRoute = async (request, { params }) => {
  const session = await getSession()

  if (!session) {
    return createResponse({
      status: StatusCode.Unauthorized,
      error: 'Unauthorized',
    })
  }

  const { id } = UserDTOValidator.pick({
    id: true,
  }).parse(await params)

  const userData = UserDTOValidator.parse(await request.json())

  const user = await prisma.user.update({
    where: {
      id,
    },
    data: userData,
  })

  return createResponse({
    status: StatusCode.OK,
    data: getUserDTO(user),
  })
}
