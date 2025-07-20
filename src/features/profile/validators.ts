import z from 'zod'

export const ProfileValidator = z.object({
  user_id: z.uuid(),
  handle: z.string(),
  given_name: z.string(),
  family_name: z.string().nullable(),
  display_name: z.string().nullable(),
  instrument_name: z.string().nullable(),
  bio: z.string().nullable(),
})
