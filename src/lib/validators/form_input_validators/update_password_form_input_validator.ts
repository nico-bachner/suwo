import z from 'zod'

export const UpdatePasswordFormInputValidator = z.object({
  password: z.string().min(1, {
    message: 'Password is required',
  }),
})

export type UpdatePasswordFormInput = z.infer<
  typeof UpdatePasswordFormInputValidator
>
