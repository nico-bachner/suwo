import { verify } from 'argon2'
import { z } from 'zod/v4'

import { createSession } from '@/lib/auth/session/create_session'
import prisma from '@/lib/prisma'
import { createResponse } from '@/utils/http/create_response'

import { LoginDetails } from '../login_validation'

export const POST = async (request: Request) => {
  const { data, error, success } = LoginDetails.safeParse(await request.json())

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
      body: { error: 'Email not in use' },
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
