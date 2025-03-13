import { getQueryBuilder } from '@/lib/db/query'
import { Member } from '@/lib/db/types'

export const createMember = async ({
  given_name,
  family_name,
  email,
  usu,
  instrument,
  mailing_list,
}: Omit<Member, 'id'>) => {
  const sql = getQueryBuilder()

  await sql`
    INSERT INTO members (
      given_name,
      family_name,
      email,
      usu,
      instrument,
      mailing_list
    ) 
    VALUES (
      ${given_name},
      ${family_name},
      ${email},
      ${usu},
      ${instrument},
      ${mailing_list}
    )
  `
}
