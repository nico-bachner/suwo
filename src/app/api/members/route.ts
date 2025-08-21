import z from 'zod'

import { ProfileValidator } from '@/lib/validators/profile_validator'
import { createResponse } from '@/utils/http/create_response'
import { StatusCode } from '@/utils/http/status_code'
import { APIRoute } from '@/utils/next_types'
import { prisma } from '@/utils/prisma'

export const GET: APIRoute = async () => {
  const profiles = await prisma.profile.findMany({
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

  const data = z.array(ProfileValidator).parse(
    profiles.map((profile) => ({
      ...profile,
      events: profile.user.EventAttendee.map(({ event_id }) => event_id),
      instruments: profile.user.UserInstrument.map(
        ({ instrument_id }) => instrument_id,
      ),
      created_at: profile.created_at.toISOString(),
      updated_at: profile.updated_at.toISOString(),
    })),
  )

  return createResponse({
    status: StatusCode.OK,
    data,
  })
}
