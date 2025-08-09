import z from 'zod'

import { EmailValidator } from '../email_validator'

export const LoginWithPasswordFormInputValidator = z.object({
  email: EmailValidator.min(1, {
    message: 'Email is required',
  }),
  password: z.string().min(1, {
    message: 'Password is required',
  }),
})

export type LoginWithPasswordFormInput = z.infer<
  typeof LoginWithPasswordFormInputValidator
>
