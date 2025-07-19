import z from 'zod'

import { MailingListPreferenceValidator } from '@/validators/mailing_list_preference'

export const UpdateMailingListPreferenceValidator = z.object({
  mailing_list_preference: MailingListPreferenceValidator,
})
