import { currentWeekQuery } from './current_week_query'
import { equipmentQuery } from './equipment_query'
import { eventQuery, eventQueryKey } from './event_query'
import { eventsQuery, eventsQueryKey } from './events_query'
import { instrumentsQuery, instrumentsQueryKey } from './instruments_query'
import {
  mailingListRecipientQuery,
  mailingListRecipientQueryKey,
} from './mailing_list_recipient_query'
import {
  mailingListRecipientsQuery,
  mailingListRecipientsQueryKey,
} from './mailing_list_recipients_query'
import { profileQuery, profileQueryKey } from './profile_query'
import { profilesQuery, profilesQueryKey } from './profiles_query'
import { sessionQuery, sessionQueryKey } from './session_query'
import {
  userInstrumentsQuery,
  userInstrumentsQueryKey,
} from './user_instruments_query'
import { userRolesQuery, userRolesQueryKey } from './user_roles_query'
import { weeklyAttendancesQuery } from './weekly_attendances_query'

export const queryKeys = {
  EVENTS: eventsQueryKey,
  EVENT: eventQueryKey,
  INSTRUMENTS: instrumentsQueryKey,
  MAILING_LIST_RECIPIENTS: mailingListRecipientsQueryKey,
  MAILING_LIST_RECIPIENT: mailingListRecipientQueryKey,
  PROFILES: profilesQueryKey,
  PROFILE: profileQueryKey,
  SESSION: sessionQueryKey,
  USER_INSTRUMENTS: userInstrumentsQueryKey,
  USER_ROLES: userRolesQueryKey,
}

export const queries = {
  CURRENT_WEEK: currentWeekQuery,
  EQUIPMENT: equipmentQuery,
  EVENTS: eventsQuery,
  EVENT: eventQuery,
  INSTRUMENTS: instrumentsQuery,
  MAILING_LIST_RECIPIENTS: mailingListRecipientsQuery,
  MAILING_LIST_RECIPIENT: mailingListRecipientQuery,
  PROFILES: profilesQuery,
  PROFILE: profileQuery,
  SESSION: sessionQuery,
  USER_INSTRUMENTS: userInstrumentsQuery,
  USER_ROLES: userRolesQuery,
  WEEKLY_ATTENDANCES: weeklyAttendancesQuery,
}
