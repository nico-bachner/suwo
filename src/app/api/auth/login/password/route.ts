import { verify } from 'argon2'
import z from 'zod'

import { createSession } from '@/features/auth/session/create_session'
import { LoginWithPasswordFormInputValidator } from '@/lib/validators/form_input_validators/login_with_password_form_input_validator'
import { createResponse } from '@/utils/http/create_response'
import { StatusCode } from '@/utils/http/status_code'
import { prisma } from '@/utils/prisma'

export const POST = async (request: Request) => {
  const { data, error, success } =
    LoginWithPasswordFormInputValidator.safeParse(await request.json())

  if (!success) {
    return createResponse({
      status: StatusCode.BadRequest,
      error: z.prettifyError(error),
    })
  }

  const user = await prisma.user.findUnique({
    where: {
      email: data.email,
    },
  })

  if (!user) {
    return createResponse({
      status: StatusCode.BadRequest,
      error: `Email ${data.email} not in use`,
    })
  }

  if (!user.password) {
    return createResponse({
      status: StatusCode.BadRequest,
      error: `Password not set for user ${user.email}.\n\nPlease login using magic link instead`,
    })
  }

  const passwordMatch = await verify(user.password, data.password)

  if (!passwordMatch) {
    return createResponse({
      status: StatusCode.Unauthorized,
      error: 'Incorrect password',
    })
  }

  await createSession({
    user_id: user.id,
  })

  return createResponse({
    status: 200,
    data,
  })
}
