import z from 'zod'

const MAX_LENGTH = 128

export const EmailValidator = z.email().max(MAX_LENGTH, {
  message: `Email must be at most ${MAX_LENGTH} characters long`,
})
