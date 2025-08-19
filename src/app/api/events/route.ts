import z from 'zod'

import { EventValidator } from '@/lib/validators/event_validator'
import { createResponse } from '@/utils/http/create_response'
import { StatusCode } from '@/utils/http/status_code'
import { APIRoute } from '@/utils/next_types'
import { prisma } from '@/utils/prisma'

export const GET: APIRoute = async () => {
  const events = await prisma.event.findMany({
    where: {
      starts_at: {
        gte: new Date(),
      },
    },
    orderBy: {
      starts_at: 'asc',
    },
  })

  return createResponse({
    status: StatusCode.OK,
    data: events,
  })
}

export const POST: APIRoute = async (request) => {
  const { data, error, success } = EventValidator.omit({
    id: true,
    created_at: true,
    updated_at: true,
  }).safeParse(await request.json())

  if (!success) {
    return createResponse({
      status: StatusCode.BadRequest,
      error: z.prettifyError(error),
    })
  }

  const event = await prisma.event.create({
    data: {
      ...data,
      starts_at: z.coerce.date().parse(data.starts_at),
      ends_at: z.coerce.date().optional().parse(data.ends_at),
    },
  })

  return createResponse({
    status: StatusCode.Created,
    data: event,
  })
}
