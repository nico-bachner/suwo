import { prettifyError } from 'zod'

import { prisma } from '@/lib/prisma'
import { createResponse } from '@/utils/http/create_response'
import { StatusCode } from '@/utils/http/status_code'

import { getSession } from '../auth/session/server/get_session'
import { UpdateInstrumentValidator } from './update_instrument_validator'

export const POST = async (request: Request) => {
  const session = await getSession()

  if (!session) {
    return createResponse({
      status: StatusCode.Unauthorized,
      error: 'Unauthorized',
    })
  }

  const user = await prisma.user.findUnique({
    where: {
      id: session.user_id,
    },
  })

  if (!user) {
    return createResponse({
      status: StatusCode.BadRequest,
      error: 'Invalid cookie',
    })
  }

  const { data, error, success } = UpdateInstrumentValidator.safeParse(
    await request.json(),
  )

  if (!success) {
    return createResponse({
      status: StatusCode.BadRequest,
      error: prettifyError(error),
    })
  }

  const updatedUser = await prisma.profile.update({
    where: {
      user_id: user.id,
    },
    data: {
      instrument_name: data.instrument_name,
    },
  })

  return createResponse({
    status: StatusCode.OK,
    data: updatedUser,
  })
}
