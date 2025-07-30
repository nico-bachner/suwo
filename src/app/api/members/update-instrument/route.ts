import z from 'zod'

import { getSession } from '@/features/auth/session/get_session'
import { UpdateInstrumentFormValidator } from '@/lib/validators/update_instrument_form_validator'
import { createResponse } from '@/utils/http/create_response'
import { StatusCode } from '@/utils/http/status_code'
import { prisma } from '@/utils/prisma'

export const POST = async (request: Request) => {
  const { data, error, success } = UpdateInstrumentFormValidator.safeParse(
    await request.json(),
  )

  if (!success) {
    return createResponse({
      status: StatusCode.BadRequest,
      error: z.prettifyError(error),
    })
  }

  const session = await getSession()

  if (!session) {
    return createResponse({
      status: StatusCode.Unauthorized,
      error: 'Unauthorized',
    })
  }

  await prisma.userInstrument.deleteMany({
    where: {
      user_id: session.user_id,
    },
  })

  const userInstruments = await prisma.userInstrument.createManyAndReturn({
    data: data.instrument_ids.map((id) => ({
      user_id: session.user_id,
      instrument_id: id,
    })),
  })

  return createResponse({
    status: StatusCode.OK,
    data: userInstruments,
  })
}
