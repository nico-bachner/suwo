import z from 'zod'

const LENGTH = 7

export const UsuNumberValidator = z
  .string()
  .trim()
  .regex(/^\d+$/u, 'USU number must contain only digits')
  .length(LENGTH, `USU number must be exactly ${LENGTH} characters long`)

export type UsuNumber = z.infer<typeof UsuNumberValidator>
