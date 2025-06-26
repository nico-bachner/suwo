import { z } from 'zod/v4'

export const LoginScreenSearchParamsValidator = z.object({
  method: z.enum(['MAGIC_LINK', 'PASSWORD']).optional(),
})

export type LoginScreenSearchParams = z.infer<
  typeof LoginScreenSearchParamsValidator
>
