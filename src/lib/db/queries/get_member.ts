import { getQueryBuilder } from '@/lib/db/query'
import { Member } from '@/lib/db/types'

export const getMemberByID = async (id: number) => {
  const sql = getQueryBuilder()

  const members = await sql`
    SELECT *
    FROM members
    WHERE id = ${id}
  `

  return members[0] as Member
}

export const getMemberByEmail = async (email: string) => {
  const sql = getQueryBuilder()

  const members = await sql`
    SELECT *
    FROM members
    WHERE email = ${email}
  `

  if (members.length > 0) {
    return members[0] as Member
  }
}
