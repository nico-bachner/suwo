import z from 'zod'

export const UpdatePasswordFormInputValidator = z.object({
  password: z.string(),
})

export type UpdatePasswordFormInput = z.infer<
  typeof UpdatePasswordFormInputValidator
>
