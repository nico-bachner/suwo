import { verify } from 'argon2'

import { Member } from '@/lib/db/types'

import { getQueryBuilder } from '../query'

export const verifyPassword = async ({
  email,
  password,
}: Pick<Member, 'email' | 'password'>) => {
  const sql = getQueryBuilder()

  const members = await sql`
    SELECT password
    FROM members
    WHERE email = ${email}
  `

  const { password: hashedPassword } = members[0] as Member

  if (!hashedPassword) {
    return false
  }

  return verify(hashedPassword  , password)
}
