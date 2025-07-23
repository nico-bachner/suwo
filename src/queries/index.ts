import { profileQuery } from './profile_query'
import { profilesQuery } from './profiles_query'
import { sessionQuery } from './session_query'
import { weeklyAttendancesQuery } from './weekly_attendances_query'

export const queries = {
  PROFILES: profilesQuery,
  PROFILE: profileQuery,
  SESSION: sessionQuery,
  WEEKLY_ATTENDANCES: weeklyAttendancesQuery,
}
