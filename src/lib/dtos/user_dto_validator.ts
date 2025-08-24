import z from 'zod'

export const UserDTOValidator = z.object({
  // ID
  id: z.uuid(),

  // Required Attributes
  email: z.email().trim().toLowerCase().min(1, 'Email is required'),
  given_name: z.string().trim().min(1, {
    message: 'Given name is required',
  }),
  mailing_list_preference: z.boolean(),

  // Optional Attributes
  family_name: z.string().nullable(),
  usu_number: z
    .string()
    .trim()
    .regex(/^\d+$/u, 'USU number must contain only digits')
    .length(7, `USU number must be exactly 7 characters long`)
    .nullable(),

  // Relations
  events: z.array(z.uuid()),
  instruments: z.array(z.uuid()),

  // Metadata
  attendance_rate: z.int().min(0).max(100),
  created_at: z.iso.datetime(),
  updated_at: z.iso.datetime(),
})

export type UserDTO = z.infer<typeof UserDTOValidator>
