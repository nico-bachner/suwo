import z from 'zod'

import { EmailValidator } from '../email_validator'

export const LoginWithMagicLinkFormInputValidator = z.object({
  email: EmailValidator.min(1, {
    message: 'Email is required',
  }),
})

export type LoginWithMagicLinkFormInput = z.infer<
  typeof LoginWithMagicLinkFormInputValidator
>
