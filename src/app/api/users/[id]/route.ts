import { NextRequest } from 'next/server'
import z from 'zod'

import { getSession } from '@/features/auth/session/get_current_session'
import { getUserDTO, updateUser } from '@/lib/dtos/user_dto'
import { UserInputValidator } from '@/lib/dtos/user_dto_validator'
import { createResponse } from '@/utils/http/create_response'
import { StatusCode } from '@/utils/http/status_code'
import { prisma } from '@/utils/prisma'

export const GET = async (
  _: NextRequest,
  { params }: RouteContext<'/api/users/[id]'>,
) => {
  const { id } = await params

  const [user, events] = await Promise.all([
    prisma.user.findUnique({
      where: {
        id,
      },
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

  if (!user) {
    return createResponse({
      status: StatusCode.NotFound,
      error: 'User not found',
    })
  }

  return createResponse({
    status: StatusCode.OK,
    data: getUserDTO(user, events),
  })
}

export const PATCH = async (
  request: NextRequest,
  { params }: RouteContext<'/api/users/[id]'>,
) => {
  const { id } = await params

  const session = await getSession()

  /** The user must be authenticated to update their information. */
  if (!session) {
    return createResponse({
      status: StatusCode.Unauthorized,
      error: 'Unauthorized',
    })
  }

  /** Users can only update their own information. */
  if (session.user_id !== id) {
    return createResponse({
      status: StatusCode.Forbidden,
      error: 'Forbidden',
    })
  }

  const { data, error, success } = UserInputValidator.partial().safeParse(
    await request.json(),
  )

  if (!success) {
    return createResponse({
      status: StatusCode.BadRequest,
      error: z.prettifyError(error),
    })
  }

  const dbUser = await updateUser(data)

  const [user, events] = await Promise.all([
    prisma.user.update({
      where: {
        id,
      },
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

  return createResponse({
    status: StatusCode.OK,
    data: getUserDTO(user, events),
  })
}

export const DELETE = async (
  _: NextRequest,
  { params }: RouteContext<'/api/users/[id]'>,
) => {
  const { id } = await params

  const session = await getSession()

  /** The user must be authenticated to delete their account. */
  if (!session) {
    return createResponse({
      status: StatusCode.Unauthorized,
      error: 'Unauthorized',
    })
  }

  /** Users can only delete their own account. */
  if (session.user_id !== id) {
    return createResponse({
      status: StatusCode.Forbidden,
      error: 'Forbidden',
    })
  }

  await prisma.user.delete({
    where: {
      id,
    },
  })

  return createResponse({
    status: StatusCode.NoContent,
  })
}
