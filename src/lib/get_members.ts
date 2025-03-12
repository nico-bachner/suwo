import { getQueryBuilder } from '@/db/query'
import { Member, Table } from '@/db/types'

export const getMembers = async () => {
  const sql = getQueryBuilder()

  const members = await sql`
    SELECT id, given_name, family_name, instrument
    FROM members
    ORDER BY given_name, family_name
  `

  return members as Table<
    Pick<Member, 'id' | 'given_name' | 'family_name' | 'instrument'>
  >
}
