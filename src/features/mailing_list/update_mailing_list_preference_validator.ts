import { z } from 'zod'

import { MailingListPreferenceValidator } from '@/lib/validators/mailing_list_preference'

export const UpdateMailingListPreferenceValidator = z.object({
  mailing_list_preference: MailingListPreferenceValidator,
})
