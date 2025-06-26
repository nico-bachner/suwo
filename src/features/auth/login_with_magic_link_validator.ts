import * as z from 'zod/v4'

import { EmailValidator } from '@/lib/validators/email'

export const LoginWithMagicLinkValidator = z.object({
  email: EmailValidator,
})
