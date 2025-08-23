import z from 'zod'

import { EventAttendeeValidator } from './event_attendee_validator'
import { UserInstrumentValidator } from './user_instrument_validator'

export const ProfileDTOValidator = z.object({
  user_id: z.uuid(),
  given_name: z.string().trim().min(1, {
    message: 'Given name is required',
  }),
  family_name: z.string().nullable(),
  attendance_rate: z.int().min(0).max(100),
  events: z.array(EventAttendeeValidator.shape.event_id),
  instruments: z.array(UserInstrumentValidator.shape.instrument_id),
  created_at: z.iso.datetime(),
  updated_at: z.iso.datetime(),
})

export type ProfileDTO = z.infer<typeof ProfileDTOValidator>
