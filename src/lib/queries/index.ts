import { currentWeekQuery } from './current_week_query'
import { equipmentQuery } from './equipment_query'
import { instrumentsQuery } from './instruments_query'
import { mailingListPreferenceQuery } from './mailing_list_preference_query'
import { profileQuery } from './profile_query'
import { profilesQuery } from './profiles_query'
import { sessionQuery } from './session_query'
import { weeklyAttendancesQuery } from './weekly_attendances_query'

export const queries = {
  CURRENT_WEEK: currentWeekQuery,
  EQUIPMENT: equipmentQuery,
  INSTRUMENTS: instrumentsQuery,
  MAILING_LIST_PREFERENCE: mailingListPreferenceQuery,
  PROFILES: profilesQuery,
  PROFILE: profileQuery,
  SESSION: sessionQuery,
  WEEKLY_ATTENDANCES: weeklyAttendancesQuery,
}
