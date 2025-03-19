import { getMailingList } from '@/lib/db/members/get_mailing_list'

export const GET = async () => {
  const emails = await getMailingList()

  const json = JSON.stringify(emails, null, 2)

  return new Response(json)
}
