import { hash } from 'argon2'
import z from 'zod'

import { getSession } from '@/features/auth/session/get_session'
import { UpdatePasswordFormInputValidator } from '@/lib/validators/form_input_validators/update_password_form_input_validator'
import { createResponse } from '@/utils/http/create_response'
import { StatusCode } from '@/utils/http/status_code'
import { prisma } from '@/utils/prisma'

export const POST = async (request: Request) => {
  const { data, error, success } = UpdatePasswordFormInputValidator.safeParse(
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

  return createResponse({
    status: StatusCode.OK,
    data: await prisma.user.update({
      where: {
        id: session.user_id,
      },
      data: {
        password: await hash(data.password),
      },
    }),
  })
}
