import z from 'zod'

export const UserDTOValidator = z.object({
  id: z.uuid(),

  email: z.email().trim().toLowerCase().min(1, 'Email is required'),
  mailing_list_preference: z.boolean(),

  created_at: z.iso.datetime(),
  updated_at: z.iso.datetime(),
})

export type UserDTO = z.infer<typeof UserDTOValidator>
