import { EventValidator } from '@/lib/validators/event_validator'
import { createResponse } from '@/utils/http/create_response'
import { StatusCode } from '@/utils/http/status_code'
import { APIRoute } from '@/utils/next_types'
import { prisma } from '@/utils/prisma'

export const GET: APIRoute = async (_, { params }) => {
  const { id } = EventValidator.pick({ id: true }).parse(await params)

  const event = await prisma.event.findUnique({
    where: {
      id,
    },
  })

  if (!event) {
    return createResponse({
      status: StatusCode.NotFound,
      error: 'Event not found',
    })
  }

  const eventDTO = EventValidator.parse({
    ...event,
    starts_at: event.starts_at.toISOString(),
    ends_at: event.ends_at ? event.ends_at.toISOString() : null,
    created_at: event.created_at.toISOString(),
    updated_at: event.updated_at.toISOString(),
  })

  return createResponse({
    status: StatusCode.OK,
    data: eventDTO,
  })
}
