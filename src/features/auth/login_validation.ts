import * as z from 'zod/v4'

import { Email } from '@/lib/validations/email'
import { Password } from '@/lib/validations/password'

export const LoginDetails = z.object({
  email: Email,
  password: Password,
})
