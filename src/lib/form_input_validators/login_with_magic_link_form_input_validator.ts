import z from 'zod'

export const LoginWithMagicLinkFormInputValidator = z.object({
  email: z.email(),
})

export type LoginWithMagicLinkFormInput = z.infer<
  typeof LoginWithMagicLinkFormInputValidator
>
