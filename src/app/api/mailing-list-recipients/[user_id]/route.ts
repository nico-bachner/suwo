import { getSession } from '@/features/auth/session/get_session'
import { getMailingListRecipientDTO } from '@/lib/dtos/mailing_list_recipient_dto'
import { MailingListRecipientDTOValidator } from '@/lib/dtos/mailing_list_recipient_dto_validator'
import { createResponse } from '@/utils/http/create_response'
import { StatusCode } from '@/utils/http/status_code'
import { APIRoute } from '@/utils/next_types'
import { prisma } from '@/utils/prisma'

export const GET: APIRoute = async (_, { params }) => {
  const { user_id } = MailingListRecipientDTOValidator.pick({
    user_id: true,
  }).parse(await params)

  const mailingListRecipient = await prisma.mailingListRecipient.findUnique({
    where: {
      user_id,
    },
  })

  if (!mailingListRecipient) {
    return createResponse({
      status: StatusCode.NotFound,
      error: 'Mailing list recipient not found',
    })
  }

  return createResponse({
    status: StatusCode.OK,
    data: getMailingListRecipientDTO(mailingListRecipient),
  })
}

export const POST: APIRoute = async (_, { params }) => {
  const { user_id } = MailingListRecipientDTOValidator.pick({
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
    data: getMailingListRecipientDTO(mailingListRecipient),
  })
}

export const DELETE: APIRoute = async (_, { params }) => {
  const { user_id } = MailingListRecipientDTOValidator.pick({
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
