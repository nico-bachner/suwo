import z from 'zod'

import { getSession } from '@/features/auth/session/get_session'
import { UpdateMailingListPreferenceValidator } from '@/lib/validators/update_mailing_list_preference_validator'
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

  return createResponse({
    status: StatusCode.OK,
    data: Boolean(
      await prisma.mailingListRecipient.findUnique({
        where: {
          user_id: session.user_id,
        },
      }),
    ),
  })
}

export const POST = async (request: Request) => {
  const { data, error, success } =
    UpdateMailingListPreferenceValidator.safeParse(await request.json())

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
