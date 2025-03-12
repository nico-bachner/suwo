import { hash } from 'argon2'

import { getQueryBuilder } from '@/lib/db/query'
import { Member } from '@/lib/db/types'

export const createMember = async ({
  given_name,
  family_name,
  email,
  password,
  usu,
  instrument,
  mailing_list,
}: Omit<Member, 'id'>) => {
  const sql = getQueryBuilder()

  const hashedPassword = await hash(password)

  await sql`
    INSERT INTO members (
      given_name,
      family_name,
      email,
      password,
      usu,
      instrument,
      mailing_list
    ) 
    VALUES (
      ${given_name},
      ${family_name},
      ${email},
      ${hashedPassword},
      ${usu},
      ${instrument},
      ${mailing_list}
    )
  `
}
