import { hash } from 'argon2'
import { z } from 'zod'

import { getSession } from '@/lib/auth/session/get_session'
import prisma from '@/lib/prisma'
import { createResponse } from '@/utils/http/create_response'

import { UpdatePasswordValidator } from './update_password_validator'

export const POST = async (request: Request) => {
  const { id } = await getSession()

  if (!id) {
    return createResponse({
      status: 401,
      body: { error: 'Unauthorized' },
    })
  }

  const user = await prisma.user.findUnique({
    where: {
      id,
    },
  })

  if (!user) {
    return createResponse({
      status: 400,
      body: { error: `Invalid cookie` },
    })
  }

  const { data, error, success } = UpdatePasswordValidator.safeParse(
    await request.json(),
  )

  if (!success) {
    return createResponse({
      status: 400,
      body: { error: z.prettifyError(error) },
    })
  }

  const updatedUser = await prisma.user.update({
    where: {
      id: user.id,
    },
    data: {
      password: await hash(data.password),
    },
  })

  return createResponse({
    status: 200,
    body: { data: updatedUser },
  })
}
