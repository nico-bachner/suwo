import z from 'zod'

export type SessionDTO = z.infer<typeof SessionDTOValidator>

export const SessionDTOValidator = z.object({
  // ID
  id: z.uuid(),

  // Relations
  user_id: z.uuid(),

  // Metadata
  created_at: z.iso.datetime(),
  updated_at: z.iso.datetime(),
})
