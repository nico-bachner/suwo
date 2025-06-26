import * as z from 'zod/v4'

import { Email } from '@/lib/validations/email'

export const MagicLinkDetails = z.object({
  email: Email,
})
