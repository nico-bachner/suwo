import z from 'zod'

import { InstrumentsQueryResult } from '@/lib/queries/instruments_query'
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

  const userInstruments = await prisma.userInstrument.findMany({
    where: {
      user_id,
    },
    include: {
      instrument: true,
    },
  })

  const data: InstrumentsQueryResult = userInstruments.map(
    ({ instrument }) => instrument,
  )

  return createResponse({
    status: StatusCode.OK,
    data,
  })
}

export const POST: APIRoute = async (request, { params }) => {
  const { user_id } = z
    .object({
      user_id: z.uuid(),
    })
    .parse(await params)

  // Const session = await getSession()

  // If (!session) {
  //   Return createResponse({
  //     Status: StatusCode.Unauthorized,
  //     Error: 'Unauthorized',
  //   })
  // }

  // If (user_id !== session.user_id) {
  //   Return createResponse({
  //     Status: StatusCode.Forbidden,
  //     Error:
  //       "Users are only allowed to access their own instruments. Only admins can access other users' instruments.",
  //   })
  // }

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

  const userInstruments = await prisma.userInstrument.createManyAndReturn({
    data: data.instrument_ids.map((id) => ({
      user_id,
      instrument_id: id,
    })),
  })

  return createResponse({
    status: StatusCode.Created,
    data: userInstruments,
  })
}
