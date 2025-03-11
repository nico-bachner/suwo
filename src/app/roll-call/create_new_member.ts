'use server'

import { revalidatePath } from 'next/cache'
import { z } from 'zod'

import { getQueryBuilder } from '@/db/query'
import { Member } from '@/db/types'

const schema = z.object({
  family_name: z.string().max(30),
  given_name: z.string().min(1).max(30),
  instrument: z.string().min(1).max(30),
  usu: z.nullable(
    z
      .string()
      .regex(/^\d+$/, {
        message: 'USU number must contain only digits',
      })
      .length(7, {
        message: 'USU number, if provided, must be 7 digits',
      }),
  ),
  email: z.string().email(),
  mailing_list: z.boolean(),
})

export const createNewMember = async (
  previousState: unknown,
  formData: FormData,
) => {
  const { data, success, error } = await schema.safeParseAsync({
    family_name: formData.get('family-name'),
    given_name: formData.get('given-name'),
    instrument: formData.get('instrument'),
    usu: formData.get('usu') == '' ? null : formData.get('usu'),
    email: formData.get('email'),
    mailing_list: formData.get('mailing-list') == 'on',
  })

  console.log(data, success, error)

  if (!success) {
    return {
      errors: error.flatten(),
    }
  }

  const sql = getQueryBuilder()

  const members: Member[] =
    await sql`SELECT * FROM members WHERE email = ${data.email}`
  if (members.length > 1) {
    console.log('Something has gone very wrong')
  } else if (members.length == 1) {
    await sql`
      UPDATE members set family_name = ${data.family_name}, given_name = ${data.given_name}, instrument = ${data.instrument}, usu = ${data.usu}, mailing_list = ${data.mailing_list} WHERE email = ${data.email}
    `
  } else {
    await sql`
    INSERT INTO members (family_name, given_name, instrument, usu, email, mailing_list) 
    VALUES (${data.family_name}, ${data.given_name}, ${data.instrument}, ${data.usu}, ${data.email}, ${data.mailing_list})
  `
  }

  revalidatePath('/roll-call')
}
