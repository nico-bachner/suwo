import { EventValidator } from '@/lib/validators/event_validator'
import { createResponse } from '@/utils/http/create_response'
import { StatusCode } from '@/utils/http/status_code'
import { APIRoute } from '@/utils/next_types'
import { prisma } from '@/utils/prisma'

export const GET: APIRoute = async (_, { params }) => {
  const { id } = EventValidator.pick({ id: true }).parse(await params)

  const profiles = await prisma.profile.findMany({
    where: {
      user: {
        EventAttendee: {
          some: {
            event_id: id,
          },
        },
      },
    },
  })

  return createResponse({
    status: StatusCode.OK,
    data: profiles,
  })
}
