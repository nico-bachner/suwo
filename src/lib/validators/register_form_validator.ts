import z from 'zod'

import { EmailValidator } from '@/lib/validators/email'
import { FamilyNameValidator } from '@/lib/validators/family_name'
import { GivenNameValidator } from '@/lib/validators/given_name'
import { MailingListPreferenceValidator } from '@/lib/validators/mailing_list_preference'
import { UsuNumberValidator } from '@/lib/validators/usu_number'

export const RegisterFormValidator = z.object({
  given_name: GivenNameValidator,
  family_name: FamilyNameValidator.optional(),
  email: EmailValidator,
  usu_number: UsuNumberValidator.optional(),
  instrument_ids: z.array(z.uuid()),
  mailing_list_preference: MailingListPreferenceValidator.optional(),
})
