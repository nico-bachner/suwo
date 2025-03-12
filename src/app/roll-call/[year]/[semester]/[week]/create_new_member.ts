'use server'

import { revalidatePath } from 'next/cache'
import { z } from 'zod'

import { getQueryBuilder } from '@/db/query'
import { getInstruments } from '@/lib/get_instruments'
import { getMemberByEmail } from '@/lib/get_member'

export const createNewMember = async (
  previousState: unknown,
  formData: FormData,
) => {
  const instruments = await getInstruments()

  const schema = z.object({
    given_name: z
      .string()
      .min(1, {
        message: 'Given name must be at least 1 character long',
      })
      .max(30, {
        message: 'Given name must be at most 30 characters long',
      })
      .trim(),
    family_name: z.nullable(
      z
        .string()
        .max(30, {
          message: 'Family name must be at most 30 characters long',
        })
        .trim(),
    ),
    email: z.string().email(),
    usu: z.nullable(
      z
        .string()
        .regex(/^\d+$/, {
          message: 'USU number, if provided, must contain only digits',
        })
        .length(7, {
          message: 'USU number, if provided, must be 7 digits',
        }),
    ),
    instrument: z.nullable(
      z
        .string()
        .min(1)
        .max(30)
        .refine(
          (value) =>
            instruments.some((instrument) => instrument.name === value),
          {
            message: 'Not a known instrument',
          },
        ),
    ),
    mailing_list: z.boolean(),
  })

  const { data, success, error } = await schema.safeParseAsync({
    given_name: formData.get('given-name'),
    family_name:
      formData.get('family-name') == '' ? null : formData.get('family-name'),
    email: formData.get('email'),
    usu: formData.get('usu') == '' ? null : formData.get('usu'),
    instrument:
      formData.get('instrument') == '' ? null : formData.get('instrument'),
    mailing_list: formData.get('mailing-list') == 'on',
  })

  if (!success) {
    return {
      errors: error.flatten(),
    }
  }

  const member = await getMemberByEmail(data.email)
  const sql = getQueryBuilder()

  if (member) {
    await sql`
      UPDATE members
      SET
        given_name = ${data.given_name},
        family_name = ${data.family_name},
        usu = ${data.usu},
        instrument = ${data.instrument},
        mailing_list = ${data.mailing_list}
      WHERE email = ${data.email}
    `
  } else {
    await sql`
      INSERT INTO members (given_name, family_name, email, usu, instrument, mailing_list) 
      VALUES (${data.given_name}, ${data.family_name}, ${data.email}, ${data.usu}, ${data.instrument}, ${data.mailing_list})
    `
  }

  revalidatePath('/roll-call')
}
