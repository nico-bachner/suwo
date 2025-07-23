import { createResponse } from '@/utils/http/create_response'
import { StatusCode } from '@/utils/http/status_code'
import { prisma } from '@/utils/prisma'

export const GET = async () => {
  const mailingListRecipients = await prisma.mailingListRecipient.findMany()

  return createResponse({
    status: StatusCode.OK,
    data: mailingListRecipients.map(({ email }) => email),
  })
}
