import { getQueryBuilder } from '../query'
import { Member } from '../types'

export const getIDFromEmail = async (email: string) => {
  const sql = getQueryBuilder()

  const members = await sql`
    SELECT id
    FROM members
    WHERE email = ${email}
  `

  if (members.length > 0) {
    return members[0].id as Member['id']
  }
}
