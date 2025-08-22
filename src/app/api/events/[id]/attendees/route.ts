import z from 'zod'

import { EventAttendeeValidator } from '@/lib/validators/event_attendee_validator'
import { EventValidator } from '@/lib/validators/event_validator'
import { createResponse } from '@/utils/http/create_response'
import { StatusCode } from '@/utils/http/status_code'
import { APIRoute } from '@/utils/next_types'
import { prisma } from '@/utils/prisma'

export const GET: APIRoute = async (_, { params }) => {
  const { id } = EventValidator.pick({ id: true }).parse(await params)

  const eventAttendees = await prisma.eventAttendee.findMany({
    where: {
      event_id: id,
    },
  })

  return createResponse({
    status: StatusCode.OK,
    data: eventAttendees.map(({ user_id }) => user_id),
  })
}

export const PATCH: APIRoute = async (req, { params }) => {
  const { id } = EventValidator.pick({ id: true }).parse(await params)

  const { data, error, success } =
    EventAttendeeValidator.shape.user_id.safeParse(await req.json())

  if (!success) {
    return createResponse({
      status: StatusCode.BadRequest,
      error: z.prettifyError(error),
    })
  }

  const existingAttendee = await prisma.eventAttendee.findFirst({
    where: {
      event_id: id,
      user_id: data,
    },
  })

  if (existingAttendee) {
    return createResponse({
      status: StatusCode.Conflict,
      error: 'User is already an attendee of this event',
    })
  }

  const eventAttendee = await prisma.eventAttendee.create({
    data: {
      event_id: id,
      user_id: data,
    },
  })

  return createResponse({
    status: StatusCode.Created,
    data: eventAttendee.user_id,
  })
}
