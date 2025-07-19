import { prettifyError } from 'zod'

import { createResponse } from '@/utils/http/create_response'
import { StatusCode } from '@/utils/http/status_code'
import { prisma } from '@/utils/prisma'

import { getSession } from '../auth/session/server/get_session'
import { UpdateMailingListPreferenceValidator } from './update_mailing_list_preference_validator'

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

  const { data, error, success } =
    UpdateMailingListPreferenceValidator.safeParse(await request.json())

  if (!success) {
    return createResponse({
      status: StatusCode.BadRequest,
      error: prettifyError(error),
    })
  }

  if (data.mailing_list_preference) {
    const mailingListRecipient = await prisma.mailingListRecipient.create({
      data: {
        email: user.email,
        user_id: user.id,
      },
    })

    return createResponse({
      status: StatusCode.OK,
      data: mailingListRecipient,
    })
  }

  await prisma.mailingListRecipient.delete({
    where: {
      user_id: user.id,
    },
  })

  return createResponse({
    status: StatusCode.OK,
    data: 'Successfully removed from Mailing list',
  })
}
