import z from 'zod'

import { getSession } from '@/features/auth/session/get_session'
import { UpdateInstrumentFormInputValidator } from '@/lib/validators/form_input_validators/update_instrument_form_input_validator'
import { createResponse } from '@/utils/http/create_response'
import { StatusCode } from '@/utils/http/status_code'
import { APIRoute } from '@/utils/next_types'
import { prisma } from '@/utils/prisma'

export const GET: APIRoute = async (_, { params }) => {
  const { user_id } = z
    .object({
      user_id: z.uuid(),
    })
    .parse(await params)

  const instruments = await prisma.instrument.findMany({
    where: {
      UserInstrument: {
        some: { user_id },
      },
    },
  })

  return createResponse({
    status: StatusCode.OK,
    data: instruments,
  })
}

export const POST: APIRoute = async (request, { params }) => {
  const { user_id } = z
    .object({
      user_id: z.uuid(),
    })
    .parse(await params)

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

  const { data, error, success } = UpdateInstrumentFormInputValidator.safeParse(
    await request.json(),
  )

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

  await prisma.userInstrument.createManyAndReturn({
    data: data.instrument_ids.map((id) => ({
      user_id,
      instrument_id: id,
    })),
  })

  const instruments = await prisma.instrument.findMany({
    where: {
      UserInstrument: {
        some: { user_id },
      },
    },
  })

  return createResponse({
    status: StatusCode.Created,
    data: instruments,
  })
}
