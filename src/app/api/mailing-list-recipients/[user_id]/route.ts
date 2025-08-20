import z from 'zod'

import { getSession } from '@/features/auth/session/get_session'
import { UpdateMailingListPreferenceFormInputValidator } from '@/lib/validators/form_input_validators/update_mailing_list_preference_form_input_validator'
import { MailingListRecipientValidator } from '@/lib/validators/mailing_list_recipient'
import { createResponse } from '@/utils/http/create_response'
import { StatusCode } from '@/utils/http/status_code'
import { APIRoute } from '@/utils/next_types'
import { prisma } from '@/utils/prisma'

export const GET: APIRoute = async (_, { params }) => {
  const { user_id } = MailingListRecipientValidator.pick({
    user_id: true,
  }).parse(await params)

  return createResponse({
    status: StatusCode.OK,
    data: await prisma.mailingListRecipient.findUnique({
      where: {
        user_id,
      },
    }),
  })
}

export const POST: APIRoute = async (request: Request, { params }) => {
  const { user_id } = MailingListRecipientValidator.pick({
    user_id: true,
  }).parse(await params)

  const { data, error, success } =
    UpdateMailingListPreferenceFormInputValidator.safeParse(
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

  const user = await prisma.user.findUnique({
    where: {
      id: user_id,
    },
  })

  if (!user) {
    return createResponse({
      status: StatusCode.NotFound,
      error: 'User not found',
    })
  }

  if (data.mailing_list_preference) {
    const mailingListRecipient = await prisma.mailingListRecipient.create({
      data: {
        user_id: user.id,
        email: user.email,
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
