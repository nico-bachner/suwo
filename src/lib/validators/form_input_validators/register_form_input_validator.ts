import z from 'zod'

import { UserDTOValidator } from '@/lib/dtos/user_dto_validator'
import { UsuNumberValidator } from '@/lib/validators/usu_number_validator'

/**
 * This will be progressively replaced by the `UserDTOValidator` as we migrate
 * the profile and usu tables into the user table.
 */
export const RegisterFormInputValidator = z.object({
  ...UserDTOValidator.omit({
    id: true,
    created_at: true,
    updated_at: true,
  }).shape,
  given_name: z.string().min(1, 'Given name is required'),
  family_name: z.string(),
  usu_number: z.union([UsuNumberValidator, z.literal('')]), // Allow empty string for optional field
  instrument_ids: z.array(z.uuid()),
})

export type RegisterFormInput = z.infer<typeof RegisterFormInputValidator>
