import { getQueryBuilder } from '@/lib/db/query'
import { Member, Profile } from '@/lib/db/types'

import { getSession } from '../session'

export const getMemberByID = async (id: number): Promise<Member | Profile> => {
  const session = await getSession()
  const sql = getQueryBuilder()

  if (session.isAuth && session.id === id) {
    const members = await sql`
      SELECT 
        id,
        given_name,
        family_name,
        email,
        password,
        usu,
        instrument,
        mailing_list
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

export const getMemberByEmail = async (email: string) => {
  const sql = getQueryBuilder()

  const members = await sql`
    SELECT *
    FROM members
    WHERE email = ${email}
  `

  if (members.length > 0) {
    return members[0] as Member | Profile
  }
}
