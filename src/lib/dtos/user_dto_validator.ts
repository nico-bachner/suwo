import z from 'zod'

export const UserDTOValidator = z.object({
  id: z.uuid(),

  email: z.email().trim().toLowerCase().min(1, 'Email is required'),
  usu_number: z
    .string()
    .trim()
    .regex(/^\d+$/u, 'USU number must contain only digits')
    .length(7, `USU number must be exactly 7 characters long`)
    .nullable(),

  mailing_list_preference: z.boolean(),

  created_at: z.iso.datetime(),
  updated_at: z.iso.datetime(),
})

export type UserDTO = z.infer<typeof UserDTOValidator>
