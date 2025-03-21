import { hash } from 'argon2'

import { getQueryBuilder } from '@/lib/db/query'
import { Member } from '@/lib/db/types'

import { getSession } from '../../auth/session'

export const updateMemberPassword = async (password: Member['password']) => {
  const { id } = await getSession()
  const hashedPassword = await hash(password)

  const sql = getQueryBuilder()

  await sql`
    UPDATE members
    SET
      password = ${hashedPassword}
    WHERE
      id = ${id}
  `
}
