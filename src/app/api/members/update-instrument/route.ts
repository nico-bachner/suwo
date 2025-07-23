import { prettifyError } from 'zod'

import { getSession } from '@/features/auth/session/get_session'
import { UpdateInstrumentValidator } from '@/features/profile/update_instrument_validator'
import { createResponse } from '@/utils/http/create_response'
import { StatusCode } from '@/utils/http/status_code'
import { prisma } from '@/utils/prisma'

export const POST = async (request: Request) => {
  const { data, error, success } = UpdateInstrumentValidator.safeParse(
    await request.json(),
  )

  if (!success) {
    return createResponse({
      status: StatusCode.BadRequest,
      error: prettifyError(error),
    })
  }

  const session = await getSession()

  if (!session) {
    return createResponse({
      status: StatusCode.Unauthorized,
      error: 'Unauthorized',
    })
  }

  return createResponse({
    status: StatusCode.OK,
    data: await prisma.profile.update({
      where: {
        user_id: session.user_id,
      },
      data: {
        instrument_name: data.instrument_name,
      },
    }),
  })
}
