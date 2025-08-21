import z from 'zod'

import { EventAttendeeValidator } from './event_attendee_validator'

export const ProfileValidator = z.object({
  user_id: z.uuid(),
  given_name: z.string().trim().min(1, {
    message: 'Given name is required',
  }),
  family_name: z.string().nullable(),
  created_at: z.iso.datetime(),
  updated_at: z.iso.datetime(),
  instruments: z.array(z.string()),
  roles: z.array(z.string()),
  attendances: z.array(
    z.object({
      year: z.number().int(),
      semester: z.number().int(),
      week: z.number().int(),
    }),
  ),
  events: z.array(EventAttendeeValidator.shape.event_id),
})

export type Profile = z.infer<typeof ProfileValidator>
