import { getQueryBuilder } from '@/lib/db/query'
import { Member } from '@/lib/db/types'

import { getSession } from '../../auth/session'

export const updateMemberInstument = async (
  instrument: Member['instrument'],
) => {
  const session = await getSession()

  if (!session.isAuth) {
    throw new Error('Unauthorized')
  }

  const sql = getQueryBuilder()

  await sql`
    UPDATE members
    SET
      instrument = ${instrument}
    WHERE
      id = ${session.id}
  `
}
