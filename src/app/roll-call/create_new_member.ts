'use server'

import { revalidatePath } from 'next/cache'
import { z } from 'zod'

import { getQueryBuilder } from '@/db/query'

const schema = z.object({
  family_name: z.string().max(30),
  given_name: z.string().min(1).max(30),
  instrument: z.string().min(1).max(30),
  usu: z
    .number({ coerce: true })
    .int()
    .refine((id) => `${id}`.length == 7, {
      message: 'USU number must be 7 digits',
    }),
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
    usu: formData.get('usu'),
    email: formData.get('email'),
    mailing_list: formData.get('mailing-list') == 'on',
  })

  if (!success) {
    return {
      errors: error.flatten(),
    }
  }

  const sql = getQueryBuilder()

  await sql`
    INSERT INTO members (family_name, given_name, instrument, usu, email, mailing_list) 
    VALUES (${data.family_name}, ${data.given_name}, ${data.instrument}, ${data.usu}, ${data.email}, ${data.mailing_list})
  `

  revalidatePath('/roll-call')
}
