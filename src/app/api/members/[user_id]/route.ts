import { Profile, ProfileValidator } from '@/lib/validators/profile_validator'
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

  if (!profile) {
    return createResponse({
      status: StatusCode.NotFound,
      error: 'Profile not found',
    })
  }

  const data: Profile = {
    ...profile,
    instruments: profile.user.UserInstrument.map(
      ({ instrument }) => instrument.name,
    ).toSorted((a, b) => a.localeCompare(b)),
    roles: profile.user.UserRole.map(({ role }) => role.name),
    attendances: profile.user.Attendances,
  }

  return createResponse({
    status: StatusCode.OK,
    data,
  })
}
