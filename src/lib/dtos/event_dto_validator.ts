import z from 'zod'

export type EventDTO = z.infer<typeof EventDTOValidator>
export type EventInput = z.infer<typeof EventInputValidator>

export const EventDTOValidator = z.object({
  // ID
  id: z.uuid(),

  // Required Attributes
  name: z.string(),
  starts_at: z.iso.datetime(),

  // Optional Attributes
  ends_at: z.iso.datetime().nullable(),
  location: z.string().nullable(),
  notes: z.string().nullable(),
  type: z.string().nullable(),

  // Relations
  attendees: z.array(z.uuid()),

  // Metadata
  created_at: z.iso.datetime(),
  updated_at: z.iso.datetime(),
})

export const EventInputValidator = z.object({
  // Required Attributes
  name: z.string().trim().min(1, 'Event name is required'),
  starts_at: z.iso.datetime({ local: true }),

  // Optional Attributes
  ends_at: z
    .union([
      z.literal('').transform(() => null),
      z.iso.datetime({ local: true }),
    ])
    .optional(),
  location: z
    .string()
    .trim()
    .transform((val) => (val === '' ? null : val))
    .optional(),
  notes: z
    .string()
    .trim()
    .transform((val) => (val === '' ? null : val))
    .optional(),
  type: z
    .string()
    .trim()
    .toUpperCase()
    .transform((val) => (val === '' ? null : val))
    .optional(),
  // Relations
  attendees: z.array(z.uuid()).optional(),
})
