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
          Attendances: {
            select: {
              year: true,
              semester: true,
              week: true,
            },
          },
        },
      },
    },
  })

  return createResponse({
    status: StatusCode.OK,
    data: profiles.map((profile) => ({
      ...profile,
      instruments: profile.user.UserInstrument.map(
        ({ instrument }) => instrument.name,
      ).toSorted((a, b) => a.localeCompare(b)),
      roles: profile.user.UserRole.map(({ role }) => role.name),
      attendances: profile.user.Attendances,
    })),
  })
}
