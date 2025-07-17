import { z } from 'zod'

export const MailingListPreferenceValidator = z.boolean().default(true)
