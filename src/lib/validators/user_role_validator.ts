import z from 'zod'

export const UserRoleValidator = z.object({
  user_id: z.uuid(),
  role_id: z.uuid(),

  created_at: z.iso.datetime(),
  updated_at: z.iso.datetime(),
})

export type UserRole = z.infer<typeof UserRoleValidator>
