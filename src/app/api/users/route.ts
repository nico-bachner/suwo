import { NextRequest } from 'next/server'
import z from 'zod'

import { createSession } from '@/features/auth/create_session'
import { fetchUsers } from '@/lib/data/fetch_users'
import { createUser, getUserDTO } from '@/lib/dtos/user_dto'
import { UserInputValidator } from '@/lib/dtos/user_dto_validator'
import { createResponse } from '@/utils/http/create_response'
import { StatusCode } from '@/utils/http/status_code'
import { prisma } from '@/utils/prisma'

export const GET = async () => {
  const users = await fetchUsers()

  return createResponse({
    status: StatusCode.OK,
    data: users,
  })
}

export const POST = async (request: NextRequest) => {
  const { data, error, success } = UserInputValidator.safeParse(
    await request.json(),
  )

  if (!success) {
    return createResponse({
      status: StatusCode.BadRequest,
      error: z.prettifyError(error),
    })
  }

  const dbUser = await createUser(data)

  const existingUser = await prisma.user.findUnique({
    where: {
      email: dbUser.email,
    },
  })

  if (existingUser) {
    return createResponse({
      status: StatusCode.Conflict,
      error: `Email ${existingUser.email} already in use. Please try again with another email address.\n\nIf you are sure the email is correct, try logging in instead.`,
    })
  }

  const [user, events] = await Promise.all([
    prisma.user.create({
      data: dbUser,
      include: {
        events: true,
        instruments: true,
      },
    }),
    prisma.event.findMany({
      where: {
        starts_at: {
          lt: new Date(),
        },
      },
    }),
  ])

  await createSession({
    user_id: user.id,
  })

  return createResponse({
    status: StatusCode.Created,
    data: getUserDTO(user, events),
  })
}
