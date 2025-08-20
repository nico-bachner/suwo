import { getSession } from '@/features/auth/session/get_session'
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

export const POST: APIRoute = async (_, { params }) => {
  const { user_id } = MailingListRecipientValidator.pick({
    user_id: true,
  }).parse(await params)

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

  const mailingListRecipient = await prisma.mailingListRecipient.create({
    data: {
      user_id: user.id,
      email: user.email,
    },
  })

  return createResponse({
    status: StatusCode.Created,
    data: mailingListRecipient,
  })
}

export const DELETE: APIRoute = async (_, { params }) => {
  const { user_id } = MailingListRecipientValidator.pick({
    user_id: true,
  }).parse(await params)

  const session = await getSession()

  if (!session) {
    return createResponse({
      status: StatusCode.Unauthorized,
      error: 'Unauthorized',
    })
  }

  await prisma.mailingListRecipient.delete({
    where: {
      user_id,
    },
  })

  return createResponse({
    status: StatusCode.NoContent,
  })
}
