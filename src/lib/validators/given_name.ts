import z from 'zod'

const MIN_LENGTH = 2
const MAX_LENGTH = 128

export const GivenNameValidator = z
  .string()
  .min(MIN_LENGTH, {
    message: `Given Name must be at least ${MIN_LENGTH} characters long`,
  })
  .max(MAX_LENGTH, {
    message: `Given Name must be at most ${MAX_LENGTH} characters long`,
  })
