import z from 'zod'

import { EmailValidator } from '@/validators/email'
import { PasswordValidator } from '@/validators/password'

export const LoginWithPasswordValidator = z.object({
  email: EmailValidator,
  password: PasswordValidator,
})
