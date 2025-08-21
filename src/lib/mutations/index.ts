import { deleteSessionMutation } from './delete_session_mutation'
import { eventAttendeesMutation } from './event_attendees_mutation'
import { logWeeklyAttendanceMutation } from './log_attendance_mutation'
import { mailingListRecipientMutation } from './mailing_list_recipient_mutation'
import { userInstrumentsMutation } from './user_instruments_mutation'

export const mutations = {
  // Event
  EVENT_ATTENDEES: eventAttendeesMutation,

  // Mailing List
  MAILING_LIST_RECIPIENT: mailingListRecipientMutation,

  // Session
  DELETE_SESSION: deleteSessionMutation,

  // User
  USER_INSTRUMENTS: userInstrumentsMutation,

  LOG_WEEKLY_ATTENDANCE: logWeeklyAttendanceMutation,
}
