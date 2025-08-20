import z from 'zod'

export const EventAttendeesValidator = z.object({
  user_id: z.uuid(),
  event_id: z.uuid(),
  created_at: z.iso.datetime(),
  updated_at: z.iso.datetime(),
})

export type EventAttendees = z.infer<typeof EventAttendeesValidator>
