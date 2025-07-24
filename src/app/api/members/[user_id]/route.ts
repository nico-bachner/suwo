import z from 'zod'

import { createResponse } from '@/utils/http/create_response'
import { StatusCode } from '@/utils/http/status_code'
import { APIRoute } from '@/utils/next_types'
import { prisma } from '@/utils/prisma'

export const GET: APIRoute = async (_, { params }) => {
  const { data, error, success } = z
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

  const profile = await prisma.profile.findUnique({
    where: data,
  })

  if (!profile) {
    return createResponse({
      status: StatusCode.NotFound,
      error: 'Profile not found',
    })
  }

  return createResponse({
    status: StatusCode.OK,
    data: profile,
  })
}
