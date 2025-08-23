import { getProfileDTO } from '@/lib/dtos/profile_dto'
import { ProfileDTOValidator } from '@/lib/dtos/profile_dto_validator'
import { createResponse } from '@/utils/http/create_response'
import { StatusCode } from '@/utils/http/status_code'
import { APIRoute } from '@/utils/next_types'
import { prisma } from '@/utils/prisma'

export const GET: APIRoute = async (_, { params }) => {
  const { user_id } = ProfileDTOValidator.pick({ user_id: true }).parse(
    await params,
  )

  const [profile, events] = await Promise.all([
    prisma.user.findUnique({
      where: {
        id: user_id,
      },
      include: {
        instruments: true,
        EventAttendee: {
          select: {
            event_id: true,
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

  if (!profile) {
    return createResponse({
      status: StatusCode.NotFound,
      error: 'Profile not found',
    })
  }

  return createResponse({
    status: StatusCode.OK,
    data: getProfileDTO(profile, events),
  })
}
