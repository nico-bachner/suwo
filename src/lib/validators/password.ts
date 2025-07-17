import { z } from 'zod'

const MAX_LENGTH = 128

export const PasswordValidator = z.string().max(MAX_LENGTH, {
  message: `Password must be at most ${MAX_LENGTH} characters long`,
})
