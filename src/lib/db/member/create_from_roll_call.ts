import { getQueryBuilder } from '@/lib/db/query'
import { Member } from '@/lib/db/types'

export const createMemberFromRollCall = async ({
  given_name,
  family_name,
  email,
  usu,
  instrument,
  mailing_list,
}: Omit<Member, 'id' | 'password'>) => {
  const sql = getQueryBuilder()

  const data = await sql`
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
    RETURNING id
  `

  const user = data[0] as Member

  if (!user) {
    throw new Error('An error occurred while creating an account.')
  }

  return user
}
