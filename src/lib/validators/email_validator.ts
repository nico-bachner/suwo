import z from 'zod'

export const EmailValidator = z.email().trim().toLowerCase()

export type Email = z.infer<typeof EmailValidator>
