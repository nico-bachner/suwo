import { UserRoleValidator } from '@/lib/validators/user_role_validator'
import { createResponse } from '@/utils/http/create_response'
import { StatusCode } from '@/utils/http/status_code'
import { APIRoute } from '@/utils/next_types'
import { prisma } from '@/utils/prisma'

export const GET: APIRoute = async (_, { params }) => {
  const { user_id } = UserRoleValidator.pick({ user_id: true }).parse(params)

  const userRoles = await prisma.role.findMany({
    where: {
      UserRole: {
        some: { user_id },
      },
    },
  })

  return createResponse({
    status: StatusCode.OK,
    data: userRoles,
  })
}
