import * as z from 'zod/v4'

import { EmailValidator } from '@/lib/validators/email'
import { PasswordValidator } from '@/lib/validators/password'

export const LoginWithPasswordValidator = z.object({
  email: EmailValidator,
  password: PasswordValidator,
})
