import z from 'zod'

import { createSession } from '@/features/auth/session/create_session'
import { getSession } from '@/features/auth/session/get_session'
import { getUserDTO } from '@/lib/dtos/user_dto'
import { RegisterFormInputValidator } from '@/lib/validators/form_input_validators/register_form_input_validator'
import { createResponse } from '@/utils/http/create_response'
import { StatusCode } from '@/utils/http/status_code'
import { APIRoute } from '@/utils/next_types'
import { prisma } from '@/utils/prisma'

export const GET: APIRoute = async () => {
  const session = await getSession()

  if (!session) {
    return createResponse({
      status: StatusCode.Unauthorized,
      error: 'Unauthorized',
    })
  }

  const users = await prisma.user.findMany()

  return createResponse({
    status: StatusCode.OK,
    data: users.map(getUserDTO),
  })
}

export const POST: APIRoute = async (request) => {
  // Const { data, error, success } = UserDTOValidator.omit({
  //   Id: true,
  //   Created_at: true,
  //   Updated_at: true,
  // }).safeParse(await request.json())

  // To be replaced with the above dto
  const { data, error, success } = RegisterFormInputValidator.safeParse(
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
      status: StatusCode.Conflict,
      error: `Email ${existingUser.email} already in use. Please try again with another email address.\n\nIf you are sure the email is correct, try logging in instead.`,
    })
  }

  const user = await prisma.user.create({
    data: {
      email: data.email,
      usu_number: data.usu_number,
      mailing_list_preference: data.mailing_list_preference,
      Profile: {
        create: {
          given_name: data.given_name,
          family_name: data.family_name,
        },
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
    status: StatusCode.Created,
    data: getUserDTO(user),
  })
}
