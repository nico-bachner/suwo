import { getQueryBuilder } from '@/lib/db/query'
import { Member } from '@/lib/db/types'

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
    WHERE email = ${email}
  `
}
