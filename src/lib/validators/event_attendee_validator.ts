import z from 'zod'

export const EventAttendeeValidator = z.object({
  user_id: z.uuid(),
  event_id: z.uuid(),
  created_at: z.iso.datetime(),
  updated_at: z.iso.datetime(),
})

export type EventAttendee = z.infer<typeof EventAttendeeValidator>
