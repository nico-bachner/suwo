import z from 'zod'

export const LoginWithPasswordFormInputValidator = z.object({
  email: z.email().trim(),
  password: z.string().min(1, {
    message: 'Password is required',
  }),
})

export type LoginWithPasswordFormInput = z.infer<
  typeof LoginWithPasswordFormInputValidator
>
