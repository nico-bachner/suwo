import { getSession } from '@/features/auth/session/get_session'
import { createResponse } from '@/utils/http/create_response'
import { StatusCode } from '@/utils/http/status_code'
import { prisma } from '@/utils/prisma'

export const GET = async () => {
  const session = await getSession()

  if (!session) {
    return createResponse({
      status: StatusCode.Unauthorized,
      error: 'Unauthorized',
    })
  }

  const mailingListRecipients = await prisma.mailingListRecipient.findMany()

  return createResponse({
    status: StatusCode.OK,
    data: mailingListRecipients,
  })
}
