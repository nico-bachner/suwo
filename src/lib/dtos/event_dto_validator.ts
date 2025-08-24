import z from 'zod'

export const EventDTOValidator = z.object({
  // ID
  id: z.uuid(),

  // Required Attributes
  name: z.string().trim().min(1, 'Event name is required'),
  starts_at: z.iso.datetime({ local: true }),

  // Optional Attributes
  ends_at: z.iso.datetime({ local: true }).nullable(),
  location: z.string().nullable(),
  notes: z.string().nullable(),
  type: z.string().nullable(),

  // Relations
  attendees: z.array(z.uuid()),

  // Metadata
  created_at: z.iso.datetime(),
  updated_at: z.iso.datetime(),
})

export type EventDTO = z.infer<typeof EventDTOValidator>
