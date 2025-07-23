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
  })

  return createResponse({
    status: StatusCode.OK,
    data: profiles,
  })
}
