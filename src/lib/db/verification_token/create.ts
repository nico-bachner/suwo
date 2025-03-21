import { randomBytes } from 'crypto'

import { getQueryBuilder } from '@/lib/db/query'
import { Member, VerificationToken } from '@/lib/db/types'

export const createVerificationToken = async (id: Member['id']) => {
  const token = randomBytes(32).toString('hex')

  const sql = getQueryBuilder()

  const data = await sql`
    INSERT INTO verification_tokens (
      member, 
      token
    )
    VALUES (
      ${id},
      ${token}
    )
    RETURNING *
  `

  const verificationToken = data[0] as VerificationToken | undefined

  if (!verificationToken) {
    throw new Error('An error occurred while creating a verification token.')
  }

  return verificationToken
}
