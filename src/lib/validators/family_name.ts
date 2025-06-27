import * as z from 'zod/v4'

const MAX_LENGTH = 128

export const FamilyNameValidator = z.string().max(MAX_LENGTH, {
  message: `Family Name must be at most ${MAX_LENGTH} characters long`,
})
