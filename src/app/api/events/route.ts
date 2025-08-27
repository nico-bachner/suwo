import { NextRequest } from 'next/server'
import z from 'zod'

import { fetchEvents } from '@/lib/data/fetch_events'
import { createEvent, getEventDTO } from '@/lib/dtos/event_dto'
import { EventInputValidator } from '@/lib/dtos/event_dto_validator'
import { createResponse } from '@/utils/http/create_response'
import { StatusCode } from '@/utils/http/status_code'
import { prisma } from '@/utils/prisma'

export const GET = async () => {
  const events = await fetchEvents()

  return createResponse({
    status: StatusCode.OK,
    data: events,
  })
}

export const POST = async (request: NextRequest) => {
  const { data, error, success } = EventInputValidator.safeParse(
    await request.json(),
  )

  if (!success) {
    return createResponse({
      status: StatusCode.BadRequest,
      error: z.prettifyError(error),
    })
  }

  const dbEvent = createEvent(data)

  const existingEvents = await prisma.event.findMany({
    where: {
      name: dbEvent.name,
      starts_at: {
        gte: dbEvent.starts_at,
        lte: dbEvent.ends_at ?? undefined,
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
    data: dbEvent,
    include: {
      attendees: true,
    },
  })

  return createResponse({
    status: StatusCode.Created,
    data: getEventDTO(event),
  })
}
