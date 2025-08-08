import z from 'zod'

import { LoginMethod } from './login_method'

export const LoginScreenSearchParamsValidator = z.object({
  method: z.enum(LoginMethod).optional(),
})

export type LoginScreenSearchParams = z.infer<
  typeof LoginScreenSearchParamsValidator
>
