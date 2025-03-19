import { getQueryBuilder } from '@/lib/db/query'
import { Member, Table } from '@/lib/db/types'

export const getMailingList = async () => {
  const sql = getQueryBuilder()

  const entries = await sql`
    SELECT email
    FROM members
    WHERE mailing_list = TRUE
    ORDER BY email
  `

  const members = entries as Table<Pick<Member, 'email'>>

  return members.map(({ email }) => email) as Member['email'][]
}
