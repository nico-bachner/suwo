import z from 'zod'

import { EmailValidator } from '@/lib/validators/email'

export const LoginWithMagicLinkValidator = z.object({
  email: EmailValidator,
})
