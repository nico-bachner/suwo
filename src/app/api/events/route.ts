import { Temporal } from '@js-temporal/polyfill'
import z from 'zod'

import { EventValidator } from '@/lib/validators/event_validator'
import { createResponse } from '@/utils/http/create_response'
import { StatusCode } from '@/utils/http/status_code'
import { APIRoute } from '@/utils/next_types'
import { prisma } from '@/utils/prisma'

export const GET: APIRoute = async () => {
  const events = await prisma.event.findMany({
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

  const startsAt = new Date(
    Temporal.PlainDateTime.from(data.starts_at).toZonedDateTime(
      'Australia/Sydney',
    ).epochMilliseconds,
  )
  const endsAt = data.ends_at
    ? new Date(
        Temporal.PlainDateTime.from(data.ends_at).toZonedDateTime(
          'Australia/Sydney',
        ).epochMilliseconds,
      )
    : undefined

  const existingEvents = await prisma.event.findMany({
    where: {
      name: data.name,
      starts_at: {
        gte: startsAt,
        lte: endsAt,
      },
    },
  })

  if (existingEvents.length > 0) {
    return createResponse({
      status: StatusCode.Conflict,
      error: `Existing event with name "${data.name}" already exists at the same time.`,
    })
  }

  const event = await prisma.event.create({
    data: {
      ...data,
      starts_at: startsAt,
      ends_at: endsAt,
    },
  })

  return createResponse({
    status: StatusCode.Created,
    data: event,
  })
}
