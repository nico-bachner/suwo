import { ProfilesQueryResult } from '@/lib/queries/profiles_query'
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
              instrument: {
                select: {
                  id: true,
                  name: true,
                },
              },
            },
          },
          UserRole: {
            select: {
              role: {
                select: {
                  id: true,
                  name: true,
                },
              },
            },
          },
        },
      },
    },
  })

  const data: ProfilesQueryResult = profiles.map((profile) => ({
    user_id: profile.user_id,
    given_name: profile.given_name,
    family_name: profile.family_name,
    display_name: profile.display_name,
    instruments: profile.user.UserInstrument.map(
      ({ instrument }) => instrument.name,
    ),
    roles: profile.user.UserRole.map(({ role }) => role.name),
  }))

  return createResponse({
    status: StatusCode.OK,
    data,
  })
}
