import z from 'zod'

const LENGTH = 7

export const UsuNumberValidator = z
  .string()
  .regex(/^\d+$/u, {
    message: 'USU number must contain only digits',
  })
  .length(LENGTH, {
    message: `USU number must be exactly ${LENGTH} characters long`,
  })
