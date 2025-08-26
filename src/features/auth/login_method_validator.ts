import z from 'zod'

export const LoginMethodValidator = z
  .enum(['magic_link', 'password'])
  .optional()

export type LoginMethod = z.infer<typeof LoginMethodValidator>
