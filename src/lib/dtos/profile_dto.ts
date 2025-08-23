import { getAttendanceRate } from '@/features/profile/get_attendance_rate'
import { Event, EventAttendee, Instrument, User } from '@/generated/prisma'

import { ProfileDTO } from './profile_dto_validator'

export const getProfileDTO = (
  user: Pick<
    User,
    'id' | 'given_name' | 'family_name' | 'created_at' | 'updated_at'
  > & {
    EventAttendee: Pick<EventAttendee, 'event_id'>[]
    instruments: Pick<Instrument, 'id'>[]
  },
  events: Event[],
): ProfileDTO => ({
  user_id: user.id,
  given_name: user.given_name,
  family_name: user.family_name,
  attendance_rate: getAttendanceRate(
    events.map((event) => ({
      id: event.id,
      starts_at: event.starts_at.toISOString(),
    })),
    user.EventAttendee.map(({ event_id }) => event_id),
    user.created_at.toISOString(),
  ),
  events: user.EventAttendee.map(({ event_id }) => event_id),
  instruments: user.instruments.map((instrument) => instrument.id),

  created_at: user.created_at.toISOString(),
  updated_at: user.updated_at.toISOString(),
})
