import z from 'zod'

import { EmailValidator } from '@/validators/email'

export const LoginWithMagicLinkValidator = z.object({
  email: EmailValidator,
})
