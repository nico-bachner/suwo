'use server'

import { revalidatePath } from 'next/cache'
import { z } from 'zod'

import { create_new_member } from '@/db/create_new_member'

const schema = z.object({
  family_name: z.string().max(30),
  given_name: z.string().min(1).max(30),
  usu: z
    .number({ coerce: true })
    .int()
    .refine((id) => `${id}`.length == 7),
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
    usu: formData.get('usu'),
    email: formData.get('email'),
    mailing_list: formData.get('mailing-list') == 'on',
  })

  if (!success) {
    return {
      errors: error.issues,
    }
  }

  await create_new_member(data)

  revalidatePath('/roll-call')
}
