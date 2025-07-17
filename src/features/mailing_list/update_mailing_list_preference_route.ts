import { z } from 'zod'

import { getSession } from '@/lib/auth/session/get_session'
import prisma from '@/lib/prisma'
import { createResponse } from '@/utils/http/create_response'

import { UpdateMailingListPreferenceValidator } from './update_mailing_list_preference_validator'

export const POST = async (request: Request) => {
  const { id } = await getSession()

  if (!id) {
    return createResponse({
      status: 401,
      body: { error: 'Unauthorized' },
    })
  }

  const user = await prisma.user.findUnique({
    where: {
      id,
    },
  })

  if (!user) {
    return createResponse({
      status: 400,
      body: { error: `Invalid cookie` },
    })
  }

  const { data, error, success } =
    UpdateMailingListPreferenceValidator.safeParse(await request.json())

  if (!success) {
    return createResponse({
      status: 400,
      body: { error: z.prettifyError(error) },
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
      status: 200,
      body: { data: mailingListRecipient },
    })
  }

  await prisma.mailingListRecipient.delete({
    where: {
      user_id: user.id,
    },
  })

  return createResponse({
    status: 200,
    body: { data: 'Successfully removed from Mailing list' },
  })
}
