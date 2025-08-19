import z from 'zod'

export enum EventType {
  Rehearsal = 'rehearsal',
  Performance = 'performance',
  Social = 'social',
}

export const EventValidator = z.object({
  id: z.uuid(),
  name: z.string().trim().min(1, {
    message: 'Instrument name is required',
  }),
  starts_at: z.iso.datetime({ local: true }),
  ends_at: z.iso.datetime({ local: true }).optional(),
  location: z.string().optional(),
  notes: z.string().optional(),
  type: z.enum(EventType).optional(),
  created_at: z.iso.datetime(),
  updated_at: z.iso.datetime(),
})

export type Event = z.infer<typeof EventValidator>
