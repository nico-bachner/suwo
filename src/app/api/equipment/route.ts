import { getSession } from '@/features/auth/get_current_session'
import { createResponse } from '@/utils/http/create_response'
import { StatusCode } from '@/utils/http/status_code'
import { APIRoute } from '@/utils/next'
import { prisma } from '@/utils/prisma'

export const GET: APIRoute<'/api/equipment'> = async () => {
  const session = await getSession()

  if (!session) {
    return createResponse({
      status: StatusCode.Unauthorized,
      error: 'Unauthorized',
    })
  }

  return createResponse({
    status: StatusCode.OK,
    data: await prisma.equipment.findMany(),
  })
}
