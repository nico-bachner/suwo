import { currentWeekQuery } from './current_week_query'
import { equipmentQuery } from './equipment_query'
import {
  eventAttendeesQuery,
  eventAttendeesQueryKey,
} from './event_attendees_query'
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
  // Event
  EVENTS: eventsQueryKey,
  EVENT: eventQueryKey,
  EVENT_ATTENDEES: eventAttendeesQueryKey,

  // Instrument
  INSTRUMENTS: instrumentsQueryKey,

  // Mailing List
  MAILING_LIST_RECIPIENTS: mailingListRecipientsQueryKey,
  MAILING_LIST_RECIPIENT: mailingListRecipientQueryKey,

  // Profile
  PROFILES: profilesQueryKey,
  PROFILE: profileQueryKey,

  // Session
  SESSION: sessionQueryKey,

  // User
  USER_INSTRUMENTS: userInstrumentsQueryKey,
  USER_ROLES: userRolesQueryKey,
}

export const queries = {
  // Equipment
  EQUIPMENT: equipmentQuery,

  // Event
  EVENTS: eventsQuery,
  EVENT: eventQuery,
  EVENT_ATTENDEES: eventAttendeesQuery,

  // Instrument
  INSTRUMENTS: instrumentsQuery,

  // Mailing List
  MAILING_LIST_RECIPIENTS: mailingListRecipientsQuery,
  MAILING_LIST_RECIPIENT: mailingListRecipientQuery,

  // Profile
  PROFILES: profilesQuery,
  PROFILE: profileQuery,

  // Session
  SESSION: sessionQuery,

  // User
  USER_INSTRUMENTS: userInstrumentsQuery,
  USER_ROLES: userRolesQuery,

  /** @deprecated */
  WEEKLY_ATTENDANCES: weeklyAttendancesQuery,
  /** @deprecated */
  CURRENT_WEEK: currentWeekQuery,
}
