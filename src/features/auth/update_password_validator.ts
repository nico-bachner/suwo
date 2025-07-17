import { z } from 'zod'

import { PasswordValidator } from '@/lib/validators/password'

export const UpdatePasswordValidator = z.object({
  password: PasswordValidator,
})
