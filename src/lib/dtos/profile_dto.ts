import { getAttendanceRate } from '@/features/profile/get_attendance_rate'
import {
  Event,
  EventAttendee,
  Profile,
  User,
  UserInstrument,
} from '@/generated/prisma'

import { ProfileDTO } from './profile_dto_validator'

export const getProfileDTO = (
  profile: Profile & {
    user: Pick<User, 'created_at'> & {
      EventAttendee: Pick<EventAttendee, 'event_id'>[]
      UserInstrument: Pick<UserInstrument, 'instrument_id'>[]
    }
  },
  events: Event[],
): ProfileDTO => ({
  user_id: profile.user_id,
  given_name: profile.given_name,
  family_name: profile.family_name,
  attendance_rate: getAttendanceRate(
    events.map((event) => ({
      id: event.id,
      starts_at: event.starts_at.toISOString(),
    })),
    profile.user.EventAttendee.map(({ event_id }) => event_id),
    profile.user.created_at.toISOString(),
  ),
  events: profile.user.EventAttendee.map(({ event_id }) => event_id),
  instruments: profile.user.UserInstrument.map(
    ({ instrument_id }) => instrument_id,
  ),
  created_at: profile.user.created_at.toISOString(),
  updated_at: profile.updated_at.toISOString(),
})
