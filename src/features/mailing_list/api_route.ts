import { API_INDENT_SIZE } from '@/config'
import prisma from '@/lib/prisma'

export const GET = async () => {
  const mailingListRecipients = await prisma.mailingListRecipient.findMany()
  const emails = mailingListRecipients.map(({ email }) => email)

  return new Response(JSON.stringify(emails, null, API_INDENT_SIZE), {
    status: 200,
    headers: {
      'Content-Type': 'application/json',
    },
  })
}
