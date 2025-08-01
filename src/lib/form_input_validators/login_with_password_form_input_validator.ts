import z from 'zod'

export const LoginWithPasswordFormInputValidator = z.object({
  email: z.email(),
  password: z.string(),
})

export type LoginWithPasswordFormInput = z.infer<
  typeof LoginWithPasswordFormInputValidator
>
