import z from 'zod'

import { getSession } from '@/features/auth/session/get_session'
import { UserInstrumentValidator } from '@/lib/validators/user_instrument_validator'
import { createResponse } from '@/utils/http/create_response'
import { StatusCode } from '@/utils/http/status_code'
import { APIRoute } from '@/utils/next_types'
import { prisma } from '@/utils/prisma'

export const GET: APIRoute = async (_, { params }) => {
  const { user_id } = UserInstrumentValidator.pick({ user_id: true }).parse(
    await params,
  )

  const userInstruments = await prisma.userInstrument.findMany({
    where: {
      user_id,
    },
  })

  return createResponse({
    status: StatusCode.OK,
    data: userInstruments.map(({ instrument_id }) => instrument_id),
  })
}

export const PUT: APIRoute = async (request, { params }) => {
  const { user_id } = UserInstrumentValidator.pick({ user_id: true }).parse(
    await params,
  )

  const session = await getSession()

  if (!session) {
    return createResponse({
      status: StatusCode.Unauthorized,
      error: 'Users must be logged in to access their instruments.',
    })
  }

  if (user_id !== session.user_id) {
    return createResponse({
      status: StatusCode.Forbidden,
      error:
        "Users are only allowed to access their own instruments. Only admins can access other users' instruments.",
    })
  }

  const { data, error, success } = z
    .array(UserInstrumentValidator.shape.instrument_id)
    .safeParse(await request.json())

  if (!success) {
    return createResponse({
      status: StatusCode.BadRequest,
      error: z.prettifyError(error),
    })
  }

  await prisma.userInstrument.deleteMany({
    where: {
      user_id,
    },
  })

  const userInstruments = await prisma.userInstrument.createManyAndReturn({
    data: data.map((id) => ({
      user_id,
      instrument_id: id,
    })),
  })

  return createResponse({
    status: StatusCode.OK,
    data: userInstruments.map(({ instrument_id }) => instrument_id),
  })
}
