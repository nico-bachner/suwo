import { getQueryBuilder } from '@/lib/db/query'
import { Member, Profile } from '@/lib/db/types'

import { getSession } from '../../auth/session'

export const getMemberByID = async (id: number) => {
  const session = await getSession()
  const sql = getQueryBuilder()

  if (session.isAuth && session.id === id) {
    const members = await sql`
      SELECT *
      FROM members
      WHERE id = ${id}
    `

    return members[0] as Member
  }

  const members = await sql`
    SELECT 
      id,
      given_name,
      family_name,
      instrument
    FROM members
    WHERE id = ${id}
  `

  return members[0] as Profile
}
