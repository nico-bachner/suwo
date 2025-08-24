import { NextRequest } from 'next/server'

import { getEventDTO } from '@/lib/dtos/event_dto'
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
