import z from 'zod'

import { ProfileQueryResult } from '@/lib/queries/profile_query'
import { createResponse } from '@/utils/http/create_response'
import { StatusCode } from '@/utils/http/status_code'
import { APIRoute } from '@/utils/next_types'
import { prisma } from '@/utils/prisma'

export const GET: APIRoute = async (_, { params }) => {
  const {
    data: paramsData,
    error,
    success,
  } = z
    .object({
      user_id: z.uuid(),
    })
    .safeParse(await params)

  if (!success) {
    return createResponse({
      status: StatusCode.BadRequest,
      error: z.prettifyError(error),
    })
  }

  const [profile, roles] = await Promise.all([
    prisma.profile.findUnique({
      where: {
        user_id: paramsData.user_id,
      },
    }),
    prisma.role.findMany({
      where: {
        UserRole: {
          some: {
            user_id: paramsData.user_id,
          },
        },
      },
    }),
  ])

  if (!profile) {
    return createResponse({
      status: StatusCode.NotFound,
      error: 'Profile not found',
    })
  }

  const data: ProfileQueryResult = {
    ...profile,
    instruments: await prisma.userInstrument
      .findMany({
        where: {
          user_id: paramsData.user_id,
        },
        select: {
          instrument: {
            select: {
              id: true,
              name: true,
            },
          },
        },
      })
      .then((userInstruments) =>
        userInstruments.map(({ instrument }) => instrument.name),
      ),
    roles: roles.map(({ name }) => name),
  }

  return createResponse({
    status: StatusCode.OK,
    data,
  })
}
