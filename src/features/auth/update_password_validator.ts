import z from 'zod'

import { PasswordValidator } from '@/validators/password'

export const UpdatePasswordValidator = z.object({
  password: PasswordValidator,
})
