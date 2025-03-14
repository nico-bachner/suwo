import { hash } from 'argon2'
import { redirect } from 'next/navigation'

import { getQueryBuilder } from '@/lib/db/query'
import { Member } from '@/lib/db/types'

import { createSession } from '../../auth/session'

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

  const data = await sql`
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
    RETURNING id
  `

  const user = data[0] as Member

  if (!user) {
    throw new Error('An error occurred while creating an account.')
  }

  await createSession(user.id)

  redirect(`/members/${user.id}`)
}
