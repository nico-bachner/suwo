import { prettifyError } from 'zod'

import { RegisterValidator } from '@/features/auth/register_validator'
import { createSession } from '@/features/auth/session/create_session'
import { createResponse } from '@/utils/http/create_response'
import { StatusCode } from '@/utils/http/status_code'
import { prisma } from '@/utils/prisma'

export const POST = async (request: Request) => {
  const { data, error, success } = RegisterValidator.safeParse(
    await request.json(),
  )

  if (!success) {
    return createResponse({
      status: StatusCode.BadRequest,
      error: prettifyError(error),
    })
  }

  const existingUser = await prisma.user.findUnique({
    where: {
      email: data.email,
    },
  })

  if (existingUser) {
    return createResponse({
      status: 400,
      error: `Email ${existingUser.email} already in use. Please try again with another email address.\n\nIf you are sure this email belongs to you, try logging in instead.`,
    })
  }

  const user = await prisma.user.create({
    data: {
      email: data.email,
      Profile: {
        create: {
          given_name: data.given_name,
          family_name: data.family_name,
          instrument_name: data.instrument_name,
        },
      },
      MailingListRecipient: {
        create: {
          email: data.email,
        },
      },
    },
  })

  if (data.usu_number) {
    await prisma.usuMembership.create({
      data: {
        user_id: user.id,
        number: data.usu_number,
      },
    })
  }

  await createSession({
    user_id: user.id,
  })

  return createResponse({
    status: StatusCode.OK,
    data,
  })
}
