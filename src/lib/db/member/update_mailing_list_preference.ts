import { Member } from '@/lib/db/types'

import { getSession } from '../../auth/session'
import { getQueryBuilder } from '../query'

export const updateMailingListPreference = async (
  mailingListPreference: Member['mailing_list'],
) => {
  const { id } = await getSession()

  const sql = getQueryBuilder()

  await sql`
    UPDATE members
    SET mailing_list = ${mailingListPreference}
    WHERE id = ${id}
  `
}
