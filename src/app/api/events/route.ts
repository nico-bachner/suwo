import z from 'zod'

import { Event, EventValidator } from '@/lib/validators/event_validator'
import { createResponse } from '@/utils/http/create_response'
import { StatusCode } from '@/utils/http/status_code'
import { APIRoute } from '@/utils/next_types'
import { prisma } from '@/utils/prisma'

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
    data,
  })

  const response: Event = EventValidator.parse({
    id: event.id,
    name: event.name,
    starts_at: event.starts_at.toISOString(),
    ends_at: event.ends_at?.toISOString() ?? null,
    location: event.location,
    notes: event.notes,
    type: event.type,
    created_at: event.created_at.toISOString(),
    updated_at: event.updated_at.toISOString(),
  })

  return createResponse({
    status: StatusCode.Created,
    data: response,
  })
}
