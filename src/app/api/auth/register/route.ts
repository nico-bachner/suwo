import z from 'zod'

import { createSession } from '@/features/auth/session/create_session'
import { RegisterFormValidator } from '@/lib/validators/register_form_validator'
import { createResponse } from '@/utils/http/create_response'
import { StatusCode } from '@/utils/http/status_code'
import { prisma } from '@/utils/prisma'

export const POST = async (request: Request) => {
  const { data, error, success } = RegisterFormValidator.safeParse(
    await request.json(),
  )

  if (!success) {
    return createResponse({
      status: StatusCode.BadRequest,
      error: z.prettifyError(error),
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
      email: data.email.toLowerCase(),
      Profile: {
        create: {
          given_name: data.given_name,
          family_name: data.family_name,
        },
      },
      MailingListRecipient: {
        create: {
          email: data.email.toLowerCase(),
        },
      },
      UsuMembership: {
        create: data.usu_number
          ? {
              number: data.usu_number,
            }
          : undefined,
      },
      UserInstrument: {
        create: data.instrument_ids.map((instrument_id) => ({
          instrument_id,
        })),
      },
    },
  })

  await createSession({
    user_id: user.id,
  })

  return createResponse({
    status: StatusCode.OK,
    data,
  })
}
