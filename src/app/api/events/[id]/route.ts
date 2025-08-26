import { NextRequest } from 'next/server'
import z from 'zod'

import { getEventDTO, updateEvent } from '@/lib/dtos/event_dto'
import { EventInputValidator } from '@/lib/dtos/event_dto_validator'
import { createResponse } from '@/utils/http/create_response'
import { StatusCode } from '@/utils/http/status_code'
import { prisma } from '@/utils/prisma'

export const GET = async (
  _: NextRequest,
  { params }: RouteContext<'/api/events/[id]'>,
) => {
  const { id } = await params

  const event = await prisma.event.findUnique({
    where: {
      id,
    },
    include: {
      attendees: true,
    },
  })

  if (!event) {
    return createResponse({
      status: StatusCode.NotFound,
      error: 'Event not found',
    })
  }

  return createResponse({
    status: StatusCode.OK,
    data: getEventDTO(event),
  })
}

export const PATCH = async (
  request: NextRequest,
  { params }: RouteContext<'/api/events/[id]'>,
) => {
  const { id } = await params

  const { data, error, success } = EventInputValidator.partial().safeParse(
    await request.json(),
  )

  if (!success) {
    return createResponse({
      status: StatusCode.BadRequest,
      error: z.prettifyError(error),
    })
  }

  const event = await prisma.event.update({
    where: {
      id,
    },
    data: updateEvent(data),
    include: {
      attendees: true,
    },
  })

  return createResponse({
    status: StatusCode.OK,
    data: getEventDTO(event),
  })
}
