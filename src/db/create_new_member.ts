import { getQueryBuilder } from './query'
import { Member } from './types'

export const create_new_member = async ({
  family_name,
  given_name,
  usu,
  email,
  mailing_list,
}: Member) => {
  const sql = getQueryBuilder()

  await sql`
    INSERT INTO members (family_name, given_name, usu, email, mailing_list) 
    VALUES (${family_name}, ${given_name}, ${usu}, ${email}, ${mailing_list})
  `
}
