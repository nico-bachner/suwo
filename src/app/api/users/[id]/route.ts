import z from 'zod'

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
    include: {
      UserInstrument: {
        select: {
          instrument_id: true,
        },
      },
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

  const { data, error, success } = UserDTOValidator.partial().safeParse(
    await request.json(),
  )

  if (!success) {
    return createResponse({
      status: StatusCode.BadRequest,
      error: z.prettifyError(error),
    })
  }

  const user = await prisma.user.update({
    where: {
      id,
    },
    data: {
      email: data.email,
      given_name: data.given_name,
      mailing_list_preference: data.mailing_list_preference,
      family_name: data.family_name,
      usu_number: data.usu_number,
      UserInstrument: data.instruments && {
        deleteMany: {},
        create: data.instruments.map((instrument_id) => ({
          instrument_id,
        })),
      },
    },
    include: {
      UserInstrument: {
        select: {
          instrument_id: true,
        },
      },
    },
  })

  return createResponse({
    status: StatusCode.OK,
    data: getUserDTO(user),
  })
}
