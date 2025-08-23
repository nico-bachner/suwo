import { getProfileDTO } from '@/lib/dtos/profile_dto'
import { createResponse } from '@/utils/http/create_response'
import { StatusCode } from '@/utils/http/status_code'
import { APIRoute } from '@/utils/next_types'
import { prisma } from '@/utils/prisma'

export const GET: APIRoute = async () => {
  const [profiles, events] = await Promise.all([
    prisma.profile.findMany({
      orderBy: [
        {
          given_name: 'asc',
        },
        {
          family_name: 'asc',
        },
      ],
      include: {
        user: {
          select: {
            created_at: true,
            UserInstrument: {
              select: {
                instrument_id: true,
              },
            },
            EventAttendee: {
              select: {
                event_id: true,
              },
            },
          },
        },
      },
    }),
    prisma.event.findMany({
      orderBy: {
        starts_at: 'asc',
      },
    }),
  ])

  return createResponse({
    status: StatusCode.OK,
    data: profiles.map((profile) => getProfileDTO(profile, events)),
  })
}
