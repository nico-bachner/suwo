import z from 'zod'

import { EmailValidator } from '@/validators/email'
import { FamilyNameValidator } from '@/validators/family_name'
import { GivenNameValidator } from '@/validators/given_name'
import { InstrumentNameValidator } from '@/validators/instrument_name'
import { MailingListPreferenceValidator } from '@/validators/mailing_list_preference'
import { UsuNumberValidator } from '@/validators/usu_number'

export const RegisterValidator = z.object({
  given_name: GivenNameValidator,
  family_name: FamilyNameValidator.optional(),
  email: EmailValidator,
  usu_number: UsuNumberValidator.optional(),
  instrument_name: InstrumentNameValidator.optional(),
  mailing_list_preference: MailingListPreferenceValidator.optional(),
})
