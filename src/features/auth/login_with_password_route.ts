import { verify } from 'argon2'
import { z } from 'zod/v4'

import { createSession } from '@/lib/auth/session/create_session'
import prisma from '@/lib/prisma'
import { createResponse } from '@/utils/http/create_response'

import { LoginWithPasswordValidator } from './login_with_password_validator'

export const POST = async (request: Request) => {
  const { data, error, success } = LoginWithPasswordValidator.safeParse(
    await request.json(),
  )

  if (!success) {
    return createResponse({
      status: 400,
      body: { error: z.prettifyError(error) },
    })
  }

  const user = await prisma.user.findUnique({
    where: {
      email: data.email,
    },
  })

  if (!user) {
    return createResponse({
      status: 400,
      body: { error: `Email ${data.email} not in use` },
    })
  }

  if (!user.password) {
    return createResponse({
      status: 400,
      body: {
        error: `Password not set for user ${user.email}.\n\nPlease login using magic link instead`,
      },
    })
  }

  const passwordMatch = await verify(user.password, data.password)

  if (!passwordMatch) {
    return createResponse({
      status: 401,
      body: { error: 'Incorrect password' },
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
