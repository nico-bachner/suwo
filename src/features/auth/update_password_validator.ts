import * as z from 'zod/v4'

import { PasswordValidator } from '@/lib/validators/password'

export const UpdatePasswordValidator = z.object({
  password: PasswordValidator,
})
