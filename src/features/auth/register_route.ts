import { z } from 'zod'

import { createSession } from '@/lib/auth/session/create_session'
import prisma from '@/lib/prisma'
import { createResponse } from '@/utils/http/create_response'

import { RegisterValidator } from './register_validator'

export const POST = async (request: Request) => {
  const { data, error, success } = RegisterValidator.safeParse(
    await request.json(),
  )

  if (!success) {
    return createResponse({
      status: 400,
      body: { error: z.prettifyError(error) },
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
      body: {
        error: `Email ${existingUser.email} already in use. Please try again with another email address.\n\nIf you are sure this email belongs to you, try logging in instead.`,
      },
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
    id: user.id,
  })

  return createResponse({
    status: 200,
    body: { data },
  })
}
