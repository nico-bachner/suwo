import * as z from 'zod/v4'

export const MailingListPreferenceValidator = z.boolean().default(true)
