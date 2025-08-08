import z from 'zod'

import { UsuNumberValidator } from '@/lib/validators/usu_number_validator'

export const RegisterFormInputValidator = z.object({
  given_name: z.string().min(1, 'Given name is required'),
  family_name: z.string().optional(),
  email: z.email(),
  usu_number: UsuNumberValidator.optional(),
  instrument_ids: z.array(z.uuid()),
  mailing_list_preference: z.boolean().optional(),
})

export type RegisterFormInput = z.infer<typeof RegisterFormInputValidator>
