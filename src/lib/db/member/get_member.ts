import { getQueryBuilder } from '@/lib/db/query'
import { Member } from '@/lib/db/types'

import { getSession } from '../../auth/session'

export const getMember = async () => {
  const { id } = await getSession()
  const sql = getQueryBuilder()

  if (!id) {
    throw new Error('No session ID')
  }

  const members = await sql`
    SELECT *
    FROM members
    WHERE id = ${id}
  `

  return members[0] as Member
}
