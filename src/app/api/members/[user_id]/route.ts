import { ProfileValidator } from '@/lib/validators/profile_validator'
import { createResponse } from '@/utils/http/create_response'
import { StatusCode } from '@/utils/http/status_code'
import { APIRoute } from '@/utils/next_types'
import { prisma } from '@/utils/prisma'

export const GET: APIRoute = async (_, { params }) => {
  const { user_id } = ProfileValidator.pick({ user_id: true }).parse(
    await params,
  )

  const profile = await prisma.profile.findUnique({
    where: {
      user_id,
    },
    include: {
      user: {
        select: {
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
  })

  if (!profile) {
    return createResponse({
      status: StatusCode.NotFound,
      error: 'Profile not found',
    })
  }

  const data = ProfileValidator.parse({
    ...profile,
    events: profile.user.EventAttendee.map(({ event_id }) => event_id),
    instruments: profile.user.UserInstrument.map(
      ({ instrument_id }) => instrument_id,
    ),
    created_at: profile.created_at.toISOString(),
    updated_at: profile.updated_at.toISOString(),
  })

  return createResponse({
    status: StatusCode.OK,
    data,
  })
}
