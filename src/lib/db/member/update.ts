import { getQueryBuilder } from '@/lib/db/query'
import { Member } from '@/lib/db/types'

import { getSession } from '../session'

export const updateMemberByEmail = async ({
  given_name,
  family_name,
  email,
  usu,
  instrument,
  mailing_list,
}: Omit<Member, 'id'>) => {
  const sql = getQueryBuilder()

  await sql`
    UPDATE members
    SET
      given_name = ${given_name},
      family_name = ${family_name},
      usu = ${usu},
      instrument = ${instrument},
      mailing_list = ${mailing_list}
    WHERE 
      email = ${email}
  `
}

export const updateMemberInstument = async (
  instrument: Member['instrument'],
) => {
  const session = await getSession()

  if (!session.isAuth) {
    throw new Error('Unauthorized')
  }

  const sql = getQueryBuilder()

  console.log('session.id', session.id)
  console.log('instrument', instrument)

  await sql`
    UPDATE members
    SET
      instrument = ${instrument}
    WHERE
      id = ${session.id}
  `
}
