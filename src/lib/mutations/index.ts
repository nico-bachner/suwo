import { deleteSessionMutation } from './delete_session_mutation'
import { logWeeklyAttendanceMutation } from './log_attendance_mutation'
import { mailingListRecipientMutation } from './mailing_list_recipient_mutation'
import { userInstrumentsMutation } from './user_instruments_mutation'

export const mutations = {
  DELETE_SESSION: deleteSessionMutation,
  LOG_WEEKLY_ATTENDANCE: logWeeklyAttendanceMutation,
  MAILING_LIST_RECIPIENT: mailingListRecipientMutation,
  USER_INSTRUMENTS: userInstrumentsMutation,
}
