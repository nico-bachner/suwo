'use server'

import { revalidatePath } from 'next/cache'
import { z } from 'zod'

import { getInstruments } from '@/lib/db/instruments/get'
import { createMember } from '@/lib/db/member/create'
import { getMemberByEmail } from '@/lib/db/member/get'
import { updateMemberByEmail } from '@/lib/db/member/update'

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

  if (member) {
    await updateMemberByEmail({
      ...data,
      usu: data.usu ? parseInt(data.usu) : null,
    })
  } else {
    await createMember({
      ...data,
      usu: data.usu ? parseInt(data.usu) : null,
    })
  }

  revalidatePath('/roll-call')
}
