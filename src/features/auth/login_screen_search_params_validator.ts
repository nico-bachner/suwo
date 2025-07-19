import z from 'zod'

export const LoginScreenSearchParamsValidator = z.object({
  method: z.enum(['MAGIC_LINK', 'PASSWORD']).optional(),
})

export type LoginScreenSearchParams = z.infer<
  typeof LoginScreenSearchParamsValidator
>
