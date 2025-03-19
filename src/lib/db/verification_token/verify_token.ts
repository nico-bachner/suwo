import { getQueryBuilder } from '@/lib/db/query'
import { VerificationToken } from '@/lib/db/types'

export const verifyToken = async ({
  member,
  token,
}: Pick<VerificationToken, 'member' | 'token'>) => {
  const sql = getQueryBuilder()

  const data = await sql`
    SELECT * FROM verification_tokens
    WHERE member = ${member}
    WHERE token = ${token}
    WHERE created_at > NOW() - INTERVAL '1 day'
  `

  if (data.length > 0) {
    return true
  }

  return false
}
