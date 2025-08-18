import z from 'zod'

export const EventValidator = z.object({
  id: z.uuid(),
  name: z.string(),
  starts_at: z.iso.datetime(),
  ends_at: z.iso.datetime().nullable(),
  location: z.string().nullable(),
  notes: z.string().nullable(),
  type: z.enum(['rehearsal', 'performance', 'social']).nullable(),
  created_at: z.iso.datetime(),
  updated_at: z.iso.datetime(),
})

export type Event = z.infer<typeof EventValidator>
