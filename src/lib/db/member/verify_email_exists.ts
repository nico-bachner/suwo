import { getQueryBuilder } from '../query'

export const verifyEmailExists = async (email: string) => {
  const sql = getQueryBuilder()

  const members = await sql`
    SELECT id
    FROM members
    WHERE email = ${email}
  `

  if (members.length > 0) {
    return true
  }

  return false
}
