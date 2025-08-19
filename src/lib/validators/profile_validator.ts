import z from 'zod'

export const ProfileValidator = z.object({
  user_id: z.uuid(),
  given_name: z.string().trim().min(1, {
    message: 'Given name is required',
  }),
  family_name: z.string().nullable(),
  instruments: z.array(z.string()),
  roles: z.array(z.string()),
  attendances: z.array(
    z.object({
      year: z.number().int(),
      semester: z.number().int(),
      week: z.number().int(),
    }),
  ),
})

export type Profile = z.infer<typeof ProfileValidator>
