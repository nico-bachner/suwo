import { API_INDENT_SIZE } from '@/config'
import { getMailingList } from '@/lib/db/members/get_mailing_list'

export const GET = async () => {
  const emails = await getMailingList()

  const json = JSON.stringify(emails, null, API_INDENT_SIZE)

  return new Response(json)
}
